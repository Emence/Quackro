/*
 * Runtime entry and orchestration for the BMD macro extension.
 *
 * Responsibilities:
 * - VS Code integration wiring (config UI, upload/debug helpers, completion plumbing)
 * - Validation orchestration and pass scheduling
 * - Shared runtime utilities used across features
 *
 * Validation rule implementations live in runtime-validation-*.js files.
 */
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const util = require('util');
const parser = require('./parser');
const { runIdentifierValidationPass } = require('./runtime-validation-identifiers');
const { runRoutineResultValidationPass } = require('./runtime-validation-routine-result');
const { runComparisonValidationPass } = require('./runtime-validation-comparisons');
const { runSqlPlaceholderValidationPass } = require('./runtime-validation-sql-placeholders');
const { runUnknownBmdFunctionValidationPass } = require('./runtime-validation-bmd-functions');
const { runObjectMethodValidationPass } = require('./runtime-validation-object-methods');
const { createArgumentKindResolver } = require('./runtime-validation-argument-kinds');
const { createValidationScopeContext } = require('./runtime-validation-scope-context');

const execFile = util.promisify(childProcess.execFile);
const EXTENSION_CONFIG_SECTION = 'bmdmacro';
const DEFAULT_SQL_SERVER = 'NB-wer979\\BMD';
const DEFAULT_SQL_DATABASE = 'BMD';
const DEFAULT_SQL_FORMULA_ID = '115251133561722';
const BMD_EXECUTABLE = 'D:\\Programme\\BMDSoftware\\BMDExec.exe';
const DEBUG_SQL_ENABLED = true;
const DEBUG_SQL_SERVER = DEFAULT_SQL_SERVER;
const DEBUG_SQL_DATABASE = DEFAULT_SQL_DATABASE;
const DEBUG_SQL_USE_INTEGRATED_SECURITY = true;
const DEBUG_SQL_USERNAME = '';
const DEBUG_SQL_PASSWORD = '';
const DEBUG_SQL_TRUST_SERVER_CERTIFICATE = true;
const DEBUG_SQL_TIMEOUT_SECONDS = 30;
const DEBUG_SQL_MAX_ROWS = 200;
const VALIDATION_MAX_BYTES = 500000;
const DEFAULT_MACRO_USER_SHORT = 'VSC';
const DEFAULT_MACRO_USE_LOG_PROC = true;

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
//
// VALIDATE_ON_SAVE (default: true)
//   true  → Syntax diagnostics (begin/end balance, unknown BMD_ functions, etc.)
//           run only when the file is saved. This keeps the editor fast while
//           you type. Diagnostics from the previous save remain visible until
//           the next save.
//   false → Diagnostics also run while you type (debounced, 800 ms after the
//           last keystroke). Useful if you want live feedback, but may cause
//           slight delays in large files.
//
// ENABLE_COMPLETION_PROVIDER (default: true)
//   false → Disables all custom autocomplete logic. Use this to prove whether
//           the extension host lag is caused by this completion provider.
//
// ENABLE_DIAGNOSTICS (default: true)
//   false → Disables all syntax diagnostics and validation listeners. Useful
//           for isolating extension-host stalls from validation work.
//
const DEFAULT_VALIDATE_ON_SAVE = false;
const ENABLE_COMPLETION_PROVIDER = true;
const ENABLE_DIAGNOSTICS = true;
//
// ─────────────────────────────────────────────────────────────────────────────

//Infer Datatypes für Objekte
//Aus lModel := MacroObject.createMacroModel('Artikel'); würde der Eintrag lmodel -> MacroModel entstehen.
function getDocumentTypeIndex(document) {
  const key = `${document.uri.toString()}::${document.version}`;
  const cached = typeIndexCache.get(key);
  if (cached) {
    return cached;
  }

  const index = new Map();
  const text = document.getText();

  const constructorNames = Array.from(new Set(Object.keys(constructorToType)))
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);

  const assignRe = new RegExp(
    `\\b([A-Za-z_][A-Za-z0-9_]*)\\s*(?::=|=)\\s*([A-Za-z_][A-Za-z0-9_.]*)\\b`,
    'gi'
  );

  let match;
  while ((match = assignRe.exec(text)) !== null) {
    const varName = match[1];
    const ctorName = match[2].toLowerCase();

    const typeName = constructorToType[ctorName];
    if (typeName) {
      index.set(varName.toLowerCase(), typeName);
    }
  }

  typeIndexCache.set(key, index);
  return index;
}



function getExtensionConfig() {
  return vscode.workspace.getConfiguration(EXTENSION_CONFIG_SECTION);
}

function getRuntimeConfig() {
  const config = getExtensionConfig();
  const macroUserShort = String(config.get('macroUserShort', DEFAULT_MACRO_USER_SHORT) || '').trim();

  return {
    sqlServer: String(config.get('sqlServer', DEFAULT_SQL_SERVER) || '').trim() || DEFAULT_SQL_SERVER,
    sqlDatabase: String(config.get('sqlDatabase', DEFAULT_SQL_DATABASE) || '').trim() || DEFAULT_SQL_DATABASE,
    sqlFormulaId: String(config.get('sqlFormulaId', DEFAULT_SQL_FORMULA_ID) || '').trim() || DEFAULT_SQL_FORMULA_ID,
    macroUserShort: macroUserShort || DEFAULT_MACRO_USER_SHORT,
    macroUseLogProc: Boolean(config.get('macroUseLogProc', DEFAULT_MACRO_USE_LOG_PROC)),
    validateOnSave: Boolean(config.get('validateOnSave', DEFAULT_VALIDATE_ON_SAVE))
  };
}

// Load structured object data: type -> { constructors, methods }
const objectsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'snippets', 'objects.json'), 'utf8')
);

// Build reverse map: constructor name -> type name
// Handles both "CreateMacroModel" and "MacroObject.CreateMacroModel"
const constructorToType = {};
const constructorNamespaces = new Set();
for (const [typeName, typeData] of Object.entries(objectsData)) {
  for (const ctor of typeData.constructors) {
    constructorToType[ctor.toLowerCase()] = typeName;
    // Also map just the short name (after the last dot) for convenience
    const shortName = ctor.includes('.') ? ctor.split('.').pop() : null;
    if (shortName) constructorToType[shortName.toLowerCase()] = typeName;
    if (ctor.includes('.')) constructorNamespaces.add(ctor.split('.')[0].toLowerCase());
  }
}

// Load function snippets to build a set of known BMD_ function names
const functionsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'snippets', 'functions.json'), 'utf8')
);
// same for model names
const modelNamesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'snippets', 'model-names.json'), 'utf8')
);

function extractSnippetChoiceValues(snippetBody) {
  if (typeof snippetBody !== 'string') {
    return [];
  }

  const choiceMatch = snippetBody.match(/\$\{\d+\|([^}]*)\|\}/);
  if (!choiceMatch) {
    return [];
  }

  return choiceMatch[1]
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);
}

function extractMacroModelDefinitions(snippetData) {
  const definitions = [];
  const seen = new Set();

  for (const entry of Object.values(snippetData)) {
    if (!entry) {
      continue;
    }

    const body = normalizeSnippetBody(entry.body).trim();
    if (!body) {
      continue;
    }

    const category = typeof entry.category === 'string' ? entry.category.trim() : '';
    const description = typeof entry.description === 'string' ? entry.description : '';
    const choiceValues = extractSnippetChoiceValues(body);
    const modelNames = choiceValues.length > 0 ? choiceValues : [body];

    for (const modelName of modelNames.map(name => name.trim()).filter(Boolean)) {
      const lowerName = modelName.toLowerCase();
      if (seen.has(lowerName)) {
        continue;
      }

      seen.add(lowerName);
      definitions.push({
        name: modelName,
        category,
        description
      });
    }
  }

  return definitions.sort((left, right) => left.name.localeCompare(right.name));
}

const macroModelDefinitions = extractMacroModelDefinitions(modelNamesData);
const macroModelNameChoices = macroModelDefinitions.map(definition => definition.name);
const macroModelDefinitionByName = new Map(
  macroModelDefinitions.map(definition => [definition.name.toLowerCase(), definition])
);

const macroModelConstructorArgChoiceSnippet = macroModelNameChoices.length > 0
  ? `\${1|${macroModelNameChoices.join(',')}|}`
  : null;

const knownBmdFunctions = new Set();
const knownFunctionPrefixes = new Set();
for (const entry of Object.values(functionsData)) {
  if (!entry || !entry.prefix) {
    continue;
  }

  const prefixes = Array.isArray(entry.prefix) ? entry.prefix : [entry.prefix];
  for (const prefix of prefixes) {
    if (typeof prefix !== 'string') {
      continue;
    }

    const lower = prefix.toLowerCase();
    knownFunctionPrefixes.add(lower);
    if (lower.startsWith('bmd_')) {
      knownBmdFunctions.add(lower);
    }
  }
}

const constructorPrefixes = new Set(Object.keys(constructorToType));


function getFunctionCallContextAtPosition(document, position) {
  const text = document.getText();
  const offset = document.offsetAt(position);
  let depth = 0;
  let inString = false;
  let openParenOffset = -1;

  for (let i = offset - 1; i >= 0; i--) {
    const ch = text[i];

    if (inString) {
      if (ch === "'" && text[i - 1] !== "'") inString = false;
      continue;
    }

    if (ch === "'") {
      inString = true;
      continue;
    }

    if (ch === ')') {
      depth++;
      continue;
    }

    if (ch === '(') {
      if (depth === 0) {
        openParenOffset = i;
        break;
      }
      depth--;
    }
  }

  if (openParenOffset < 0) return null;

  let nameEnd = openParenOffset;
  let nameStart = nameEnd - 1;
  while (nameStart >= 0 && /[A-Za-z0-9_]/.test(text[nameStart])) {
    nameStart--;
  }
  nameStart++;

  const functionName = text.slice(nameStart, nameEnd).trim();
  if (!functionName) return null;

  const argsText = text.slice(openParenOffset + 1, offset);
  const args = splitArgumentsWithPositions(argsText);
  const currentArgIndex = args.length - 1;

  return {
    functionName,
    functionNameLower: functionName.toLowerCase(),
    currentArgIndex,
    args
  };
}

//[WER979] 29.04.2026 10:31: List der weiteren optionalen Parameter für autocomplete bei ergänzen von weiteren PArametern für Funktionen die schon im Code sind.
function buildFunctionArgumentCompletionItems(document, position) {
  const context = getFunctionCallContextAtPosition(document, position);
  if (!context) {
    return [];
  }

  const signature = functionSignaturesByName.get(context.functionNameLower);
  if (!signature || !Array.isArray(signature.params) || signature.params.length === 0) {
    return [];
  }

  const paramIndex = context.currentArgIndex;
  if (paramIndex < 0 || paramIndex >= signature.params.length) {
    return [];
  }

  const currentArg = context.args[paramIndex];
  const currentArgText = currentArg ? String(currentArg.text || '').trim() : '';
  if (currentArgText.length > 0) {
    return [];
  }

  const currentParam = signature.params[paramIndex];
  if (!currentParam) {
    return [];
  }

  const items = [];

  const primaryItem = new vscode.CompletionItem(
    `${currentParam.label}${currentParam.optional ? '(opt)' : ''}`,
    vscode.CompletionItemKind.Field
  );

  if (currentParam.kind === 'string') {
    primaryItem.insertText = new vscode.SnippetString(`'\${1:${currentParam.label}}'`);
  } else {
    primaryItem.insertText = new vscode.SnippetString(`\${1:${currentParam.label}}`);
  }

  primaryItem.detail = `${context.functionName} · Argument ${paramIndex + 1} von ${signature.totalCount}`;

  const signatureLabel = `${context.functionName}(${signature.params
    .map(param => param.raw || param.label)
    .join(', ')})`;

  primaryItem.documentation = new vscode.MarkdownString(
    `**${context.functionName}**\n\n` +
    `Aktuelles Argument: **${currentParam.label}**${currentParam.optional ? ' *(optional)*' : ''}\n\n` +
    `Signatur: \`${signatureLabel}\``
  );

  primaryItem.sortText = '00000';
  primaryItem.preselect = true;
  items.push(primaryItem);

  const nextParams = signature.params.slice(paramIndex + 1, paramIndex + 3);
  for (let i = 0; i < nextParams.length; i++) {
    const nextParam = nextParams[i];
    const hintItem = new vscode.CompletionItem(
      `Danach: ${nextParam.label}${nextParam.optional ? ' (opt)' : ''}`,
      vscode.CompletionItemKind.Text
    );
    hintItem.insertText = '';
    hintItem.detail = `${context.functionName} · Folgeargument`;
    hintItem.documentation = new vscode.MarkdownString(
      `Nächstes mögliches Argument: **${nextParam.label}**${nextParam.optional ? ' *(optional)*' : ''}`
    );
    hintItem.sortText = `0000${i + 1}`;
    items.push(hintItem);
  }

  return items;
}

//[WER979] 29.04.2026 10:02: Diese Funktion prüft, ob ein Komma eingegeben wurde, um die Argumentvorschläge für Funktionen erneut auszulösen. Sie überprüft, ob die Änderung ein einzelnes Komma ist und ob der Cursor sich in einem Funktionsaufruf befindet, für den Signaturen definiert sind. Wenn ja, wird die Vorschlagsliste erneut geöffnet.
function shouldRetriggerFunctionArgumentSuggest(event) {
  if (!event || !event.document || !Array.isArray(event.contentChanges) || event.contentChanges.length !== 1) {
    return false;
  }

  const change = event.contentChanges[0];
  if (!change || change.rangeLength !== 0 || typeof change.text !== 'string') {
    return false;
  }

  // Nicht nur exakt "," akzeptieren, sondern auch ", " oder ",\t"
  if (!change.text.includes(',')) {
    return false;
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.uri.toString() !== event.document.uri.toString()) {
    return false;
  }

  const fallbackPosition = change.range.start.translate(0, change.text.length);
  const positionAfterChange =
    editor.selection &&
    editor.selection.active &&
    editor.selection.active.line === fallbackPosition.line &&
    editor.selection.active.character >= change.range.start.character
      ? editor.selection.active
      : fallbackPosition;

  const context = getFunctionCallContextAtPosition(event.document, positionAfterChange);
  if (!context) {
    return false;
  }

  if (!functionSignaturesByName.has(context.functionNameLower)) {
    return false;
  }

  const currentArg = context.args[context.currentArgIndex];
  const currentArgText = currentArg ? String(currentArg.text || '').trim() : '';

  // Nur retriggern, wenn wir im neuen/leeren Argument stehen.
  return currentArgText.length === 0;
}

function normalizeSnippetBody(body) {
  if (Array.isArray(body)) {
    return body.join('\n');
  }
  return typeof body === 'string' ? body : '';
}

function isKnownFunctionCallToken(text, startIndex, endIndex, lowerToken) {
  if (!knownFunctionPrefixes.has(lowerToken)) {
    return false;
  }

  for (let i = endIndex; i < text.length; i++) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      continue;
    }
    return ch === '(';
  }

  return false;
}

function isCallToken(text, endIndex) {
  for (let i = endIndex; i < text.length; i++) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      continue;
    }
    return ch === '(';
  }

  return false;
}

function isBmdFunctionLikeCallToken(text, startIndex, endIndex, lowerToken) {
  if (!lowerToken || !lowerToken.startsWith('bmd_')) {
    return false;
  }

  return isCallToken(text, endIndex);
}

// Function um MacroModelNamen vorzuschlagen egal ob in quotes oder ohne
function normalizeCreateMacroModelSnippetBody(bodyText) {
  if (typeof bodyText !== 'string' || !/createmacromodel\s*\(/i.test(bodyText)) {
    return bodyText;
  }

  return bodyText
    .replace(/(CreateMacroModel\s*\(\s*')\$\{1:[^}]*\}(')/i, "$1${1:}$2")
    .replace(/(CreateMacroModel\s*\(\s*')\$1(')/i, "$1${1:}$2")
    .replace(/(CreateMacroModel\s*\(\s*)'[^']*'(\s*\))/i, "$1'${1:}'$2");
}

function splitArgumentsWithPositions(argsText) {
  const parts = [];
  let start = 0;
  let depth = 0;
  let inString = false;

  for (let i = 0; i < argsText.length; i++) {
    const ch = argsText[i];

    if (inString) {
      if (ch === "'") {
        if (i + 1 < argsText.length && argsText[i + 1] === "'") {
          i++;
        } else {
          inString = false;
        }
      }
      continue;
    }

    if (ch === "'") {
      inString = true;
      continue;
    }
    if (ch === '(') {
      depth++;
      continue;
    }
    if (ch === ')') {
      if (depth > 0) {
        depth--;
      }
      continue;
    }
    if (ch === ',' && depth === 0) {
      parts.push({ text: argsText.slice(start, i), start, end: i });
      start = i + 1;
    }
  }

  parts.push({ text: argsText.slice(start), start, end: argsText.length });
  return parts;
}

function stripSnippetPlaceholderSyntax(text) {
  if (typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/\$\{\d+:([^}]*)\}/g, '$1')
    .replace(/\$\{\d+\}/g, '')
    .replace(/\$\d+/g, '')
    .trim();
}

function extractCallArgumentText(text, calleeName) {
  if (typeof text !== 'string' || typeof calleeName !== 'string' || !calleeName) {
    return null;
  }

  const callStartRe = new RegExp(`${escapeRegExp(calleeName)}\\s*\\(`, 'i');
  const match = callStartRe.exec(text);
  if (!match) {
    return null;
  }

  const start = match.index + match[0].length;
  let depth = 1;
  let inString = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (ch === "'") {
        if (i + 1 < text.length && text[i + 1] === "'") {
          i++;
        } else {
          inString = false;
        }
      }
      continue;
    }

    if (ch === "'") {
      inString = true;
      continue;
    }
    if (ch === '(') {
      depth++;
      continue;
    }
    if (ch === ')') {
      depth--;
      if (depth === 0) {
        return text.slice(start, i);
      }
    }
  }

  return null;
}

function parseSignatureParameter(rawParameter) {
  const original = typeof rawParameter === 'string' ? rawParameter.trim() : '';
  if (!original) {
    return null;
  }

  const optional = /\(\s*opt\s*\)/i.test(original);
  let normalized = original.replace(/\(\s*opt\s*\)/ig, '').trim();
  let kind = 'any';

  if (normalized.startsWith("'") && normalized.endsWith("'")) {
    kind = 'string';
    normalized = normalized.slice(1, -1).trim();
  } else if (normalized.startsWith('<') && normalized.endsWith('>')) {
    kind = 'number';
    normalized = normalized.slice(1, -1).trim();
  }

  normalized = stripSnippetPlaceholderSyntax(normalized);

  return {
    label: normalized || 'arg',
    kind,
    optional,
    raw: original
  };
}

function buildCallSignature(name, descriptionText, bodyText) {
  const buildSignatureFromArgsText = (argsText) => {
    if (argsText === null) {
      return null;
    }

    const params = splitArgumentsWithPositions(argsText)
      .map(part => part.text.trim())
      .filter(part => part.length > 0)
      .map(parseSignatureParameter)
      .filter(Boolean);

    return {
      name,
      params,
      requiredCount: params.filter(param => !param.optional).length,
      totalCount: params.length
    };
  };

  const descriptionSignature = buildSignatureFromArgsText(extractCallArgumentText(descriptionText, name));
  const bodySignature = buildSignatureFromArgsText(extractCallArgumentText(bodyText, name));
  const signature = preferRicherSignature(descriptionSignature, bodySignature);

  if (!signature) {
    return null;
  }

  return signature;
}

function classifyArgumentKind(text) {
  if (typeof text !== 'string') {
    return null;
  }

  const trimmed = text.trim().replace(/,$/, '');
  if (!trimmed) {
    return null;
  }

  if (/^'([^']|'')*'$/.test(trimmed)) {
    return 'string';
  }

  if (/^(?:#\d+)+$/.test(trimmed)) {
    return 'string';
  }

  if (/^-?(?:\d+\.?\d*|\.\d+)$/.test(trimmed)) {
    return 'number';
  }

  return null;
}

function describeExpectedArgument(param) {
  if (!param || param.kind === 'any') {
    return 'a compatible value';
  }

  if (param.kind === 'string') {
    return `a string argument ('${param.label}')`;
  }

  return `a non-string argument (<${param.label}>)`;
}

function preferRicherSignature(existingSignature, candidateSignature) {
  if (!existingSignature) {
    return candidateSignature;
  }
  if (!candidateSignature) {
    return existingSignature;
  }

  // Prefer signatures that describe more parameters (typically non-fallback).
  if (candidateSignature.totalCount > existingSignature.totalCount) {
    return candidateSignature;
  }
  if (candidateSignature.totalCount < existingSignature.totalCount) {
    return existingSignature;
  }

  // With equal total count, prefer signatures that preserve optional metadata.
  // Example: description may include "(opt)" while snippet body does not.
  const existingOptionalCount = Math.max(0, existingSignature.totalCount - existingSignature.requiredCount);
  const candidateOptionalCount = Math.max(0, candidateSignature.totalCount - candidateSignature.requiredCount);
  if (candidateOptionalCount > existingOptionalCount) {
    return candidateSignature;
  }
  if (candidateOptionalCount < existingOptionalCount) {
    return existingSignature;
  }

  // If both describe the same optionality, prefer the one with more required params.
  if (candidateSignature.requiredCount > existingSignature.requiredCount) {
    return candidateSignature;
  }

  return existingSignature;
}

function snippetBodyHasTabstops(body) {
  return typeof body === 'string' && /\$\d|\$\{\d/.test(body);
}

function isNoArgCallBody(name, body) {
  if (typeof body !== 'string') {
    return false;
  }

  const re = new RegExp(`^${escapeRegExp(name)}\s*\(\s*\)$`, 'i');
  return re.test(body.trim());
}

function buildSnippetBodyFromSignature(name, signature) {
  if (!signature || !Array.isArray(signature.params) || signature.params.length === 0) {
    return `${name}()`;
  }

  const args = signature.params.map((param, index) => {
    const label = (param && typeof param.label === 'string' && param.label.trim()) ? param.label.trim() : `arg${index + 1}`;
    if (param && param.kind === 'string') {
      return `'\${${index + 1}:${label}}'`;
    }
    return `\${${index + 1}:${label}}`;
  });

  return `${name}(${args.join(', ')})`;
}

function signatureHasStringParams(signature) {
  return !!(signature && Array.isArray(signature.params) && signature.params.some(param => param && param.kind === 'string'));
}

const functionSignaturesByName = new Map();
for (const entry of Object.values(functionsData)) {
  if (!entry || !entry.prefix) {
    continue;
  }

  const prefixes = Array.isArray(entry.prefix) ? entry.prefix : [entry.prefix];
  const bodyText = normalizeCreateMacroModelSnippetBody(normalizeSnippetBody(entry.body));
  const descriptionText = typeof entry.description === 'string' ? entry.description : '';

  for (const prefix of prefixes) {
    if (typeof prefix !== 'string') {
      continue;
    }

    const signature = buildCallSignature(prefix, descriptionText, bodyText);
    if (signature) {
      const key = prefix.toLowerCase();
      functionSignaturesByName.set(
        key,
        preferRicherSignature(functionSignaturesByName.get(key), signature)
      );
    }
  }
}

function constructorPlaceholderForType(typeName) {
  const lower = typeName.toLowerCase();
  if (/(model|query|list|document|reader|call|mgr|tool|task|lead|frist|termin|absence)/i.test(typeName)) {
    return 'Name';
  }
  if (lower.includes('json') || lower.includes('api')) {
    return '';
  }
  return 'Name';
}

function preferredBaseVarName(typeName, aliasBase) {
  const byType = {
    macroquery: 'lQuery',
    macromodel: 'lModel',
    macrostringlist: 'lList'
  };
  const mapped = byType[typeName.toLowerCase()];
  if (mapped) {
    return mapped;
  }
  return `l${aliasBase}`;
}


function preferredConstructor(typeData) {
  const ctors = Array.isArray(typeData.constructors) ? typeData.constructors : [];
  const dotted = ctors.find(c => typeof c === 'string' && c.includes('.'));
  return dotted || ctors[0];
}

function constructorArgsTemplateFromSnippet(constructorBody) {
  if (typeof constructorBody !== 'string') {
    return null;
  }
  const open = constructorBody.indexOf('(');
  const close = constructorBody.lastIndexOf(')');
  if (open === -1 || close === -1 || close < open) {
    return null;
  }
  return constructorBody.slice(open + 1, close);
}

function shiftSnippetTabstops(text, offset) {
  if (typeof text !== 'string' || offset === 0) {
    return text || '';
  }

  return text.replace(/\$(\d+)|\$\{(\d+)(\|[^}]*\||:[^}]*)?\}/g, (match, simpleIndex, bracedIndex, placeholder) => {
    const index = Number(simpleIndex || bracedIndex);
    const shiftedIndex = index + offset;
    if (simpleIndex) {
      return `$${shiftedIndex}`;
    }
    return `\${${shiftedIndex}${placeholder || ''}}`;
  });
}

function macroModelConstructorArgs(tabstopOffset = 0) {
  const tabstopIndex = 1 + Math.max(0, tabstopOffset);
  return `'\${${tabstopIndex}:}'`;
}

function preferredConstructorArgs(typeName, argsFromSnippet, fallbackPlaceholder) {
  if (typeName.toLowerCase() === 'macromodel') {
    return macroModelConstructorArgs(1);
  }
  if (argsFromSnippet !== null) {
    return shiftSnippetTabstops(argsFromSnippet, 1);
  }
  return fallbackPlaceholder ? `\${2:${fallbackPlaceholder}}` : '';
}

function isGlobalCompletionPrefix(prefix) {
  if (typeof prefix !== 'string') {
    return false;
  }

  const lower = prefix.toLowerCase();
  return lower.startsWith('bmd_') || constructorPrefixes.has(lower) || lower === 'query' || lower === 'model';
}

const globalCompletionItems = [];
const globalConstructorCompletionItems = [];
const constructorBodyByPrefix = new Map();
for (const entry of Object.values(functionsData)) {
  if (!entry || !entry.prefix) {
    continue;
  }

  const prefixes = Array.isArray(entry.prefix) ? entry.prefix : [entry.prefix];
  const documentation = typeof entry.description === 'string' ? new vscode.MarkdownString(entry.description) : undefined;

  for (const prefix of prefixes) {
    const bodyText = normalizeCreateMacroModelSnippetBody(normalizeSnippetBody(entry.body));
    const lowerPrefix = typeof prefix === 'string' ? prefix.toLowerCase() : '';
    const isConstructorPrefix = lowerPrefix && constructorPrefixes.has(lowerPrefix);

    if (isConstructorPrefix) {
      constructorBodyByPrefix.set(lowerPrefix, bodyText);
    }

    if (!isGlobalCompletionPrefix(prefix)) {
      continue;
    }

    let insertBody = bodyText || prefix;
    const signature = functionSignaturesByName.get(lowerPrefix);
    if (signature && signature.totalCount > 0 && !snippetBodyHasTabstops(insertBody) && isNoArgCallBody(prefix, insertBody)) {
      insertBody = buildSnippetBodyFromSignature(prefix, signature);
    }

    const item = new vscode.CompletionItem(prefix, vscode.CompletionItemKind.Function);
    item.insertText = new vscode.SnippetString(insertBody);
    item.documentation = documentation;
    item.sortText = `00_${prefix.toLowerCase()}`;
    item.filterText = `${prefix} ${entry.body?.split('(')[0] || ''}`;
    item.preselect = true;
    globalCompletionItems.push(item);
    if (isConstructorPrefix || lowerPrefix === 'query' || lowerPrefix === 'model') {
      globalConstructorCompletionItems.push(item);
    }
  }
}

const constructorNewItems = [];
const constructorAliasItems = [];
for (const [typeName, typeData] of Object.entries(objectsData)) {
  const ctor = preferredConstructor(typeData);
  if (!ctor || typeof ctor !== 'string') {
    continue;
  }

  const lowerCtor = ctor.toLowerCase();
  const argsFromSnippet = constructorArgsTemplateFromSnippet(constructorBodyByPrefix.get(lowerCtor));
  const fallbackPlaceholder = constructorPlaceholderForType(typeName);
  const args = preferredConstructorArgs(typeName, argsFromSnippet, fallbackPlaceholder);
  const ctorCall = `${ctor}(${args})`;
  const hasNewMethod = Array.isArray(typeData.methods) && typeData.methods.some(m => {
    if (typeof m === 'string') return m.toLowerCase() === 'new';
    return m && typeof m.name === 'string' && m.name.toLowerCase() === 'new';
  });
  // Alias: use explicit override from JSON (e.g. "CSVMgr"), otherwise derive from constructor
  // e.g. CRMMacroObject.CreateFristMgr  -> "FristMgr" -> alias "fristmgr", var "lFristMgr"
  //      MacroObject.CreateMacroModel   -> strip Macro -> "Model" -> alias "model", var "lModel"
  const ctorShortName = ctor.split('.').pop().replace(/^Create/, '');
  const derivedBase = ctorShortName.startsWith('Macro') ? ctorShortName.slice(5) : ctorShortName;
  const aliasBase = (typeof typeData.alias === 'string' && typeData.alias) ? typeData.alias : derivedBase;
  const alias = aliasBase.toLowerCase();
  const baseVarName = preferredBaseVarName(typeName, aliasBase);

  const assignmentSnippet = hasNewMethod
    ? `\${1:${baseVarName}} := ${ctorCall};\n\${1}.New();\n\$0`
    : `\${1:${baseVarName}} := ${ctorCall};\n\$0`;

  const typedItem = new vscode.CompletionItem(`new ${typeName}`, vscode.CompletionItemKind.Snippet);
  typedItem.insertText = new vscode.SnippetString(assignmentSnippet);
  typedItem.detail = `[constructor] ${ctor}`;
  typedItem.documentation = new vscode.MarkdownString(`Instantiate ${typeName} using ${ctor}`);
  typedItem.sortText = `00_${typeName.toLowerCase()}`;
  constructorNewItems.push(typedItem);

  if (alias && alias.length >= 2) {
    const aliasTrigger = `l${alias}`;
    const aliasItem = new vscode.CompletionItem(aliasTrigger, vscode.CompletionItemKind.Snippet);
    aliasItem.insertText = new vscode.SnippetString(assignmentSnippet);
    aliasItem.detail = `[alias] ${typeName}`;
    aliasItem.documentation = new vscode.MarkdownString(`Quick constructor snippet for ${typeName}`);
    aliasItem.sortText = `00_${aliasTrigger}`;
    constructorAliasItems.push(aliasItem);
  }
}

const objectSnippetItems = [];
for (const [typeName, typeData] of Object.entries(objectsData)) {
  for (const snippet of (typeData.snippets || [])) {
    if (!snippet || typeof snippet !== 'object') {
      continue;
    }

    const label = snippet.name || `${typeName} snippet`;
    const body = normalizeSnippetBody(snippet.body);
    if (!body) {
      continue;
    }

    const prefixes = Array.isArray(snippet.prefix)
      ? snippet.prefix.filter(p => typeof p === 'string' && p.trim())
      : [snippet.prefix].filter(p => typeof p === 'string' && p.trim());

    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
    item.insertText = new vscode.SnippetString(body);
    item.detail = snippet.detail || `[pattern] ${typeName}`;
    item.documentation = new vscode.MarkdownString(
      snippet.description || `Snippet for ${typeName}`
    );
    item.sortText = snippet.sortText || `00_${typeName.toLowerCase()}_snippet_${label.toLowerCase().replace(/\s+/g, '_')}`;

    if (prefixes.length > 0) {
      item.filterText = prefixes.join(' ');
    }

    objectSnippetItems.push(item);
  }
}

const assignmentCompletionItems = [...constructorNewItems, ...globalConstructorCompletionItems];
//const bmdCompletionItems = globalCompletionItems.filter(item =>
//  getCompletionLabelText(item).toLowerCase().startsWith('bmd_')
//);

// besser neu bauen statt aus globalCompletionItems extrahieren
// damit sorttext nicht verloren geht, is anscheinend ein bekannter bug.
const bmdCompletionItems = [];
globalCompletionItems.forEach(item => {
  if (getCompletionLabelText(item).toLowerCase().startsWith('bmd_')) {
    const bmdItem = new vscode.CompletionItem(item.label, item.kind);
    bmdItem.insertText = item.insertText;
    bmdItem.documentation = item.documentation;
    bmdItem.sortText = `00_${item.label.toLowerCase()}`;  // ← FORCE!
    //item.sortText = `00_bmd_${prefix.padStart(30, '0')}`;  // ← 00_bmd_000...!    
    bmdItem.preselect = true;
    bmdCompletionItems.push(bmdItem);
  }
});

function getCompletionLabelText(item) {
  if (typeof item.label === 'string') {
    return item.label;
  }
  if (item.label && typeof item.label.label === 'string') {
    return item.label.label;
  }
  return '';
}

function filterCompletionsByPrefix(items, prefix) {
  if (!prefix) {
    return items;
  }

  const lowerPrefix = prefix.toLowerCase();
  const startsWith = [];
  const contains = [];

  for (const item of items) {
    const label = getCompletionLabelText(item).toLowerCase();
    const filterText = typeof item.filterText === 'string'
      ? item.filterText.toLowerCase()
      : '';

    const filterTokens = filterText.split(/\s+/).filter(Boolean);

    // PRIORITÄT 1: zuerst sichtbarer Name / label
    if (label.startsWith(lowerPrefix)) {
      startsWith.push(item);
      continue;
    }

    // PRIORITÄT 2: danach echte Trigger / Prefixe aus filterText
    if (filterTokens.some(token => token.startsWith(lowerPrefix))) {
      startsWith.push(item);
      continue;
    }

    // OPTIONAL: contains nur als Fallback
    if (lowerPrefix.length >= 3) {
      if (label.includes(lowerPrefix)) {
        contains.push(item);
        continue;
      }

      if (filterTokens.some(token => token.includes(lowerPrefix))) {
        contains.push(item);
        continue;
      }
    }
  }

  return [...startsWith, ...contains];
}
// Aliases only shown when the typed prefix is within 2 chars of the full alias length,
// preventing e.g. "frist" from triggering the "fristmgr" snippet.
function filterAliasesByPrefix(items, prefix) {
  if (!prefix || prefix.length < 2) return [];
  const result = [];
  for (const item of items) {
    const label = getCompletionLabelText(item).toLowerCase();
    if (label.startsWith(prefix) && prefix.length >= label.length - 2) {
      result.push(item);
    }
  }
  return result;
}

function getCreateMacroModelContext(textBefore) {
  const inQuotes = textBefore.match(/(?:^|[^A-Za-z0-9_.])(?:MacroObject\.)?CreateMacroModel\s*\(\s*'([^']*)$/i);
  if (inQuotes) {
    const typedPrefix = inQuotes[1];
    const replaceStartCharacter = textBefore.length - typedPrefix.length;
    return {
      typedPrefix,
      insideQuote: true,
      replaceStartCharacter,
      replaceEndCharacter: textBefore.length
    };
  }

  const closedQuotes = textBefore.match(/((?:^|[^A-Za-z0-9_.])(?:MacroObject\.)?CreateMacroModel\s*\(\s*')([^']*)('\s*\)?\s*;?\s*)$/i);
  if (closedQuotes) {
    const typedPrefix = closedQuotes[2] || '';
    const tail = closedQuotes[3] || '';
    const replaceStartCharacter = textBefore.length - typedPrefix.length - tail.length;
    const replaceEndCharacter = replaceStartCharacter + typedPrefix.length;
    return {
      typedPrefix,
      insideQuote: true,
      replaceStartCharacter,
      replaceEndCharacter
    };
  }

  const noQuotes = textBefore.match(/(?:^|[^A-Za-z0-9_.])(?:MacroObject\.)?CreateMacroModel\s*\(\s*([A-Za-z_*][A-Za-z0-9_*]*)?$/i);
  if (noQuotes) {
    return { typedPrefix: noQuotes[1] || '', insideQuote: false };
  }

  return null;
}

function shouldRetriggerModelNameSuggest(event) {
  if (!event || !event.document || event.contentChanges.length !== 1) {
    return false;
  }

  const change = event.contentChanges[0];
  // Only retrigger for single-character insertions while typing.
  if (!change || change.rangeLength !== 0 || !/^[A-Za-z0-9_]$/.test(change.text)) {
    return false;
  }

  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.uri.toString() !== event.document.uri.toString()) {
    return false;
  }

  const positionAfterChange = change.range.start.translate(0, change.text.length);
  const lineText = event.document.lineAt(positionAfterChange.line).text;
  const textBefore = lineText.substring(0, positionAfterChange.character);
  const context = getCreateMacroModelContext(textBefore);

  return !!(context && context.insideQuote);
}

function normalizeMacroModelSearchName(name) {
  return name
    .replace(/^TBMDMD/i, '')
    .replace(/Mgr$/i, '')
    .toLowerCase();
}

function tokenizeMacroModelSearchWords(text) {
  if (!text) {
    return [];
  }

  return String(text)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function hasAllQueryWordPrefixes(queryWords, candidateWords) {
  if (queryWords.length === 0) {
    return true;
  }

  return queryWords.every(queryWord =>
    candidateWords.some(candidateWord => candidateWord.startsWith(queryWord))
  );
}

//Vorschlag aller bekannten Modelnamen
//lModel := MacroObject.CreateMacroModel('1');<-- Name statt 1
function buildMacroModelNameCompletionItems(typedPrefix, insideQuote) {
  if (macroModelDefinitions.length === 0) {
    return [];
  }

  // Constructor snippets keep an empty quoted placeholder for model name,
  // so completion filtering inside quotes stays active.
  // Treat pure numeric placeholder text as empty query so completion still works.
  const effectivePrefix = /^\d+(?:\.\d+)?$/.test((typedPrefix || '').trim()) ? '' : typedPrefix;
  const queryWords = tokenizeMacroModelSearchWords(effectivePrefix);
  const hasQuery = queryWords.length > 0;

  return macroModelDefinitions
    .map(definition => {
      const name = definition.name;
      const normalizedName = normalizeMacroModelSearchName(name);
      const categoryName = definition.category || '';
      const searchableWords = [...new Set([
        ...tokenizeMacroModelSearchWords(name),
        ...tokenizeMacroModelSearchWords(normalizedName),
        ...tokenizeMacroModelSearchWords(categoryName)
      ])];
      const categoryWords = [...new Set(tokenizeMacroModelSearchWords(categoryName))];

      let rank = 99;
      if (!hasQuery) {
        rank = 0;
      } else if (hasAllQueryWordPrefixes(queryWords, categoryWords)) {
        rank = 1;
      } else if (hasAllQueryWordPrefixes(queryWords, searchableWords)) {
        rank = 2;
      }

      if (rank === 99) {
        return null;
      }

      const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Value);
      if (definition.category) {
        item.label = {
          label: name,
          description: `[${definition.category}]`
        };
      }
      item.insertText = insideQuote ? name : `'${name}'`;
      item.detail = definition.category ? `[${definition.category}] model name` : '[Model] model name';
      item.documentation = new vscode.MarkdownString(
        `${definition.description || `[Model] ${name}`}

Use as argument in \`CreateMacroModel(...)\`.`
      );
      item.filterText = `${name} ${normalizedName} ${definition.category || ''}`.trim();
      item.sortText = `00_modelname_${rank}_${normalizedName}`;
      return item;
    })
    .filter(Boolean);
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Cache parsed variable->type maps per document version to avoid full rescans on each '.'
const typeIndexCache = new Map();

function normalizeMethodEntry(typeName, methodEntry) {
  function normalizeFallbackBody(name, body) {
    if (typeof body !== 'string') {
      return `${name}()`;
    }

    // Convert old placeholder-only dummy signatures (e.g. Eof($1)) to Eof()
    // only when the description also indicates a no-arg method.
    const trimmed = body.trim();
    const placeholderOnly = new RegExp(`^${escapeRegExp(name)}\\(\\$\\{?1(?::[^}]*)?\\}?\\)$`, 'i');
    const descriptionShowsNoArgs = typeof description === 'string'
      ? new RegExp(`\\b${escapeRegExp(name)}\\s*\\(\\s*\\)`, 'i').test(description)
      : false;
    if (placeholderOnly.test(trimmed) && descriptionShowsNoArgs) {
      return `${name}()`;
    }
    return body;
  }

  if (typeof methodEntry === 'string') {
    return {
      name: methodEntry,
      body: `${methodEntry}()`,
      description: `[${typeName}] ${methodEntry}()`
    };
  }

  if (!methodEntry || typeof methodEntry !== 'object' || typeof methodEntry.name !== 'string') {
    return null;
  }

  const name = methodEntry.name;
  const description =
    typeof methodEntry.description === 'string'
      ? methodEntry.description
      : `[${typeName}] ${name}()`;

  let body = normalizeFallbackBody(name, methodEntry.body, description);
  const signature = buildCallSignature(name, description, body);
  if (signature && signature.totalCount > 0) {
    const shouldSynthesizeNoArgBody = !snippetBodyHasTabstops(body) && isNoArgCallBody(name, body);
    const shouldSynthesizeStringQuotedBody = snippetBodyHasTabstops(body) && signatureHasStringParams(signature) && !body.includes("'");

    if (shouldSynthesizeNoArgBody || shouldSynthesizeStringQuotedBody) {
      body = buildSnippetBodyFromSignature(name, signature);
    }
  }

  return {
    name,
    body,
    description
  };
}

// Prebuild completion items per type once, reused on every completion request
const completionItemsByType = {};
for (const [typeName, typeData] of Object.entries(objectsData)) {
  completionItemsByType[typeName] = (typeData.methods || [])
    .map(methodEntry => normalizeMethodEntry(typeName, methodEntry))
    .filter(Boolean)
    .map(method => {
      const item = new vscode.CompletionItem(method.name, vscode.CompletionItemKind.Method);
      item.insertText = new vscode.SnippetString(method.body);
      item.detail = `[${typeName}]`;
      item.documentation = new vscode.MarkdownString(method.description);
      return item;
    });
}

// Build set of known method names per type (lowercase) for method validation
const knownMethodsByType = {};
const methodSignaturesByType = {};
for (const [typeName, typeData] of Object.entries(objectsData)) {
  knownMethodsByType[typeName] = new Set(
    (typeData.methods || [])
      .map(m => normalizeMethodEntry(typeName, m))
      .filter(Boolean)
      .map(m => m.name.toLowerCase())
  );

  const methodSignatureMap = new Map();
  for (const method of (typeData.methods || [])
    .map(methodEntry => normalizeMethodEntry(typeName, methodEntry))
    .filter(Boolean)) {
    const signature = buildCallSignature(method.name, method.description, method.body);
    if (!signature) {
      continue;
    }

    const key = method.name.toLowerCase();
    methodSignatureMap.set(
      key,
      preferRicherSignature(methodSignatureMap.get(key), signature)
    );
  }
  methodSignaturesByType[typeName] = methodSignatureMap;
}

//TODO
//wer979 mit getInferredParamTypeAtPosition zusammenlegen
//Diese Funktion durchsucht bereinigten Code nach procedure- und function-Definitionen, liest deren formale Parameter aus und sucht anschließend nach Aufrufstellen derselben Routine. Für jede Parameterposition versucht sie dann, aus dem tatsächlich übergebenen Argument über den vorhandenen typeIndex einen Typ abzuleiten und speichert das Ergebnis in einer Map param-name -> type.
//
//Wichtig ist dabei: Die Funktion arbeitet globaler und gibt eine Sammlung zurück, nicht nur einen Einzelwert. Außerdem trägt sie für nicht auflösbare Parameter trotzdem einen Eintrag mit null ein, damit später erkennbar bleibt, dass der Parameter schon betrachtet wurde.
function getProcedureFunctionParamTypes(cleanText, typeIndex) {
  // Maps param-name (lowercase) -> inferred type, by examining each call site.
  const paramTypes = new Map();

  const defRe = /\b(?:procedure|function)\s+(\w+)\s*\(([^)]*)\)/gi;
  let defMatch;
  while ((defMatch = defRe.exec(cleanText)) !== null) {
    const funcName = defMatch[1];
    const rawParams = defMatch[2].split(',').map(p => p.trim()).filter(p => /^[A-Za-z_][A-Za-z0-9_]*$/.test(p));
    if (rawParams.length === 0) continue;

    // Find a call site: FuncName(arg1, arg2, ...)
    const callRe = new RegExp(`\\b${escapeRegExp(funcName)}\\s*\\(([^)]*)\\)`, 'gi');
    let callMatch;
    while ((callMatch = callRe.exec(cleanText)) !== null) {
      // Skip the definition line itself
      if (callMatch.index === defMatch.index) continue;
      const rawArgs = callMatch[1].split(',').map(a => a.trim());
      for (let i = 0; i < Math.min(rawParams.length, rawArgs.length); i++) {
        if (paramTypes.has(rawParams[i].toLowerCase())) continue; // already resolved
        const argType = typeIndex.get(rawArgs[i].toLowerCase());
        if (argType) {
          paramTypes.set(rawParams[i].toLowerCase(), argType);
        }
      }
    }

    // Any remaining params with no type still get a sentinel entry so we can skip them
    for (const p of rawParams) {
      if (!paramTypes.has(p.toLowerCase())) {
        paramTypes.set(p.toLowerCase(), null);
      }
    }
  }
  return paramTypes;
}

// TODO 
//wer979 mit getProcedureFunctionParamTypes zusammenlegen
//Diese Funktion ist feiner aufgelöst: Sie sammelt zuerst alle Routine-Definitionen, bestimmt dann, in welcher Definition sich die aktuelle Cursor-Position befindet, und prüft danach, ob der gesuchte Variablenname dort überhaupt ein Parameter ist. Erst wenn das zutrifft, durchsucht sie die Aufrufstellen genau dieser aktiven Routine und holt den Typ des Arguments an derselben Parameterposition.
//Das Ergebnis ist kein Mapping für alle Parameter, sondern genau ein Typ oder undefined für den konkreten Parameter an der aktuellen Stelle. Sie ist damit ideal für kontextabhängige Completion oder Validierung direkt am Cursor.
function getInferredParamTypeAtPosition(cleanText, variableNameLower, cursorOffset, typeIndex) {
  const defs = [];
  const defRe = /\b(?:procedure|function)\s+(\w+)\s*\(([^)]*)\)/gi;
  let m;
  while ((m = defRe.exec(cleanText)) !== null) {
    const params = m[2]
      .split(',')
      .map(p => p.trim())
      .filter(p => /^[A-Za-z_][A-Za-z0-9_]*$/.test(p));

    defs.push({
      name: m[1],
      params,
      index: m.index
    });
  }

  let activeDef;
  for (let i = 0; i < defs.length; i++) {
    const current = defs[i];
    const next = defs[i + 1];
    const end = next ? next.index : cleanText.length;
    if (cursorOffset >= current.index && cursorOffset < end) {
      activeDef = current;
      break;
    }
  }

  if (!activeDef) {
    return undefined;
  }

  const paramIndex = activeDef.params.findIndex(p => p.toLowerCase() === variableNameLower);
  if (paramIndex === -1) {
    return undefined;
  }

  const callRe = new RegExp(`\\b${escapeRegExp(activeDef.name)}\\s*\\(([^)]*)\\)`, 'gi');
  let callMatch;
  while ((callMatch = callRe.exec(cleanText)) !== null) {
    // Skip the definition header itself.
    if (callMatch.index === activeDef.index) {
      continue;
    }

    const args = callMatch[1].split(',').map(a => a.trim());
    if (paramIndex >= args.length) {
      continue;
    }

    const inferredType = typeIndex.get(args[paramIndex].toLowerCase());
    if (inferredType) {
      return inferredType;
    }
  }

  return undefined;
}

// Scans user-defined function bodies in cleanText and returns a Map:
// functionName (lowercase) -> typeName
// by detecting "Result := KnownConstructor(...)" inside each function body.
function buildFunctionReturnTypes(cleanText) {
  const returnTypes = new Map();
  const lines = cleanText.split('\n');
  const routineHeaderRe = /\b(procedure|function)\s+([A-Za-z_][A-Za-z0-9_]*)/gi;
  const blockTokenRe = /\b(begin|end)\b/gi;
  const resultAssignRe = /\bresult\s*:=\s*([\w.]+)\s*\(/gi;

  let pendingKind = null;
  let pendingName = null;
  let currentKind = null;
  let currentName = null;
  let depth = 0;

  for (const line of lines) {
    routineHeaderRe.lastIndex = 0;
    const headerMatch = routineHeaderRe.exec(line);
    if (headerMatch) {
      pendingKind = headerMatch[1].toLowerCase();
      pendingName = headerMatch[2].toLowerCase();
    }

    if (currentKind === 'function') {
      resultAssignRe.lastIndex = 0;
      let rm;
      while ((rm = resultAssignRe.exec(line)) !== null) {
        const ctor = rm[1].toLowerCase();
        const typeName = constructorToType[ctor];
        if (typeName && !returnTypes.has(currentName)) {
          returnTypes.set(currentName, typeName);
        }
      }
    }

    blockTokenRe.lastIndex = 0;
    let tm;
    while ((tm = blockTokenRe.exec(line)) !== null) {
      const tok = tm[1].toLowerCase();
      if (tok === 'begin') {
        if (!currentKind && pendingKind) {
          currentKind = pendingKind;
          currentName = pendingName;
          pendingKind = null;
          pendingName = null;
          depth = 1;
        } else if (currentKind) {
          depth++;
        }
      } else if (tok === 'end' && currentKind) {
        depth--;
        if (depth <= 0) {
          currentKind = null;
          currentName = null;
          depth = 0;
        }
      }
    }
  }

  return returnTypes;
}

//Namenssammlung für Completion, damit auch lokale Variablen vorgeschlagen werden. Baut einen Index aller Variablennamen im Dokument
//If your file contains lModel := CreateMacroModel('auftrag'), then later when you type lModel., the language server uses this index to know that lModel is of type MacroModel and can suggest its methods.
function getDocumentWords(document, typedPrefix) {
  const words = new Set();
  const text = document.getText();

  // QUELLE 1: LHS von := (lokale Variablen)
  const assignRegex = /\b([A-Za-z_][A-Za-z0-9_]*)\s*:=/g;
  let match;
  while ((match = assignRegex.exec(text)) !== null) {
    words.add(match[1]);
  }

  // QUELLE 2: Parameter in procedure/function Signaturen
  // procedure PROC_askList(aMultipleBool, aKeyValueList, ...)
  const paramRegex = /(?:procedure|function)\s+[A-Za-z_][A-Za-z0-9_]*\s*\(([^)]+)\)/gi;
  while ((match = paramRegex.exec(text)) !== null) {
    const params = match[1].split(',');
    for (const param of params) {
      const paramName = param.trim();
      if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(paramName)) {
        console.log('found func word');
        words.add(paramName);
      }
    }
  }

  // QUELLE 3: for-Schleifenvariablen (i, j, k etc.)
  const forRegex = /\bfor\s+([A-Za-z_][A-Za-z0-9_]*)\s*:=/gi;
  while ((match = forRegex.exec(text)) !== null) {
    words.add(match[1]);
  }

  // Filter + CompletionItems bauen
  return Array.from(words)
    .filter(w => w.toLowerCase().startsWith(typedPrefix) && w.toLowerCase() !== typedPrefix)
    .map(word => {
      const item = new vscode.CompletionItem(word, vscode.CompletionItemKind.Variable);
      item.sortText = `zz_${word.toLowerCase()}`;
      item.detail = '[var] document variable';
      return item;
    });
}

//Addition to getDocumentTypeIndex
// only searches local cursorpos - 200.000
// Die globale Fallback (getDocumentTypeIndex) greift nur ein, wenn lokal nichts gefunden wird, und deckt so auch Fälle ab, wo die Zuweisung weit oben steht. Zusätzlich kann getVariableTypeAtPosition noch Parameter-Typen aus Funktionsaufrufen ableiten (getInferredParamTypeAtPosition), was getDocumentTypeIndex gar nicht kann.
//wer979 TODO: nur getDocumentTypeIndex sollte reichen wenn infer Type noch eingebaut wird. bzw nur getVariableTypeAtPosition. Eines von beiden sollte reichen.
function getVariableTypeAtPosition(document, variableName, position, includeGlobalFallback = true) {
  // Fast path for autocomplete: search a bounded window before cursor first.
  const cursorOffset = document.offsetAt(position);
  const windowStartOffset = Math.max(0, cursorOffset - 200000);
  const windowStart = document.positionAt(windowStartOffset);
  const textBeforeCursor = document.getText(new vscode.Range(windowStart, position));
  const varPattern = escapeRegExp(variableName.toLowerCase());
  const assignmentPattern = new RegExp(`\\b${varPattern}\\b\\s*:=\\s*([\\w.]+)\\s*\\(`, 'gi');

  let lastTypeName;
  let match;
  while ((match = assignmentPattern.exec(textBeforeCursor)) !== null) {
    const ctor = match[1].toLowerCase();
    const typeName = constructorToType[ctor];
    if (typeName) {
      lastTypeName = typeName;
    }
  }

  // Also infer MacroQuery from: myVar := someModel.GetModelQuery()
  const getModelQueryPattern = new RegExp(`\\b${varPattern}\\b\\s*:=\\s*[A-Za-z_][A-Za-z0-9_]*\\.GetModelQuery\\s*\\(`, 'gi');
  if (getModelQueryPattern.test(textBeforeCursor)) {
    lastTypeName = 'MacroQuery';
  }

  if (lastTypeName) {
    return lastTypeName;
  }

  const typeIndex = getDocumentTypeIndex(document);
  if (includeGlobalFallback) {
    // Fallback for very old assignments located far above the cursor.
    const lowerVar = variableName.toLowerCase();
    const indexedType = typeIndex.get(lowerVar);
    if (indexedType) {
      return indexedType;
    }
  }

  // If this is a procedure/function parameter, infer type from its call site arguments.
  const cleanText = stripStringsAndComments(document.getText());
  const cursorOffsetInClean = document.offsetAt(position);
  return getInferredParamTypeAtPosition(cleanText, variableName.toLowerCase(), cursorOffsetInClean, typeIndex);
}

/**
 * Replace string content, single-quoted strings ('...', with '' escape),
 * line comments (// ...), and block comments ({ ... }) with spaces so that
 * all character offsets (line / column) are preserved for diagnostics.
 */
function stripStringsAndComments(text) {
  const out = Array.from(text);
  const len = out.length;
  let i = 0;
  let inString = false;
  let inLineComment = false;
  let blockCommentEnd = null;

  while (i < len) {
    const ch = out[i];

    if (inLineComment) {
      if (ch === '\n') { inLineComment = false; }
      else { out[i] = ' '; }
      i++;
      continue;
    }

    if (blockCommentEnd) {
      if (blockCommentEnd === '}' && ch === '}') {
        blockCommentEnd = null;
        out[i] = ' ';
        i++;
        continue;
      }
      if (blockCommentEnd === '*)' && ch === '*' && i + 1 < len && out[i + 1] === ')') {
        blockCommentEnd = null;
        out[i] = ' ';
        out[i + 1] = ' ';
        i += 2;
        continue;
      }
      if (ch !== '\n') {
        out[i] = ' ';
      }
      i++;
      continue;
    }

    if (inString) {
      if (ch === "'") {
        if (i + 1 < len && out[i + 1] === "'") {
          out[i] = ' '; out[i + 1] = ' '; i += 2; // '' escape
        } else {
          inString = false; out[i] = ' '; i++;
        }
      } else {
        out[i] = ' '; i++;
      }
      continue;
    }

    if (ch === '/' && i + 1 < len && out[i + 1] === '/') {
      inLineComment = true; out[i] = ' '; out[i + 1] = ' '; i += 2;
      continue;
    }
    if (ch === '{') {
      blockCommentEnd = '}'; out[i] = ' '; i++;
      continue;
    }
    if (ch === '(' && i + 1 < len && out[i + 1] === '*') {
      blockCommentEnd = '*)'; out[i] = ' '; out[i + 1] = ' '; i += 2;
      continue;
    }
    if (ch === "'") {
      inString = true; out[i] = ' '; i++;
      continue;
    }
    i++;
  }
  return out.join('');
}

function isMacroDocument(document) {
  if (!document) {
    return false;
  }
  if (document.languageId === 'bmdmacro') {
    return true;
  }
  return typeof document.fileName === 'string' && document.fileName.toLowerCase().endsWith('.mac');
}

function hasProcedureLog(document) {
  const text = stripStringsAndComments(document.getText());
  return /\bprocedure\s+log\s*\(/i.test(text);
}

function extractProcedureDefinitions(document) {
  // Returns a map: procedureName (lowercase) -> { name, params: [param1, param2, ...], line }
  const text = document.getText();
  const cleanText = stripStringsAndComments(text);
  const definitions = new Map();
  
  const defRe = /\b(?:procedure|function)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)/gi;
  let m;
  while ((m = defRe.exec(cleanText)) !== null) {
    const name = m[1];
    const paramsStr = m[2];
    const params = paramsStr
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);
    
    // Find line number by searching in original text
    const textBefore = cleanText.substring(0, m.index);
    const line = textBefore.split('\n').length - 1;
    
    definitions.set(name.toLowerCase(), {
      name,
      params,
      line,
      paramsStr
    });
  }
  
  return definitions;
}

function buildUserRoutineCompletionItems(document, typedPrefix) {
  const definitions = extractProcedureDefinitions(document);
  const items = [];

  for (const def of definitions.values()) {
    const lowerName = def.name.toLowerCase();
    if (!lowerName.startsWith(typedPrefix)) {
      continue;
    }

    const signature = `${def.name}(${def.params.join(', ')})`;
    const item = new vscode.CompletionItem(signature, vscode.CompletionItemKind.Function);

    const argsSnippet = def.params
      .map((param, idx) => `\${${idx + 1}:${param}}`)
      .join(', ');
    item.insertText = new vscode.SnippetString(`${def.name}(${argsSnippet})`);
    item.detail = '[macro] procedure/function';
    item.documentation = new vscode.MarkdownString(signature);
    item.sortText = `00_userproc_${lowerName}`;
    items.push(item);
  }

  return items;
}

//Sucht Functionsname für Autocompletion um innerhalb der Klammer Parameter oder Hilfe anzuzeigen die für diese Function relevant ist
function findProcedureAtPosition(document, position) {
  // Find the procedure/function name being called at the cursor position
  const line = document.lineAt(position.line).text;
  const character = position.character;
  
  // Look backwards from cursor for an identifier followed by (
  let start = character - 1;
  while (start >= 0 && /[A-Za-z0-9_]/.test(line[start])) {
    start--;
  }
  start++;
  
  // Look forward from start to find the identifier
  let end = start;
  while (end < line.length && /[A-Za-z0-9_]/.test(line[end])) {
    end++;
  }
  
  if (start >= end) {
    return null;
  }
  
  const name = line.substring(start, end);
  
  // Check if there's a ( after this identifier (allowing whitespace)
  let parenPos = end;
  while (parenPos < line.length && /\s/.test(line[parenPos])) {
    parenPos++;
  }
  
  if (parenPos < line.length && line[parenPos] === '(') {
    return name;
  }
  
  return null;
}

/***************************************************/
/* SQL FUNCTIONS - START
/***************************************************/
function isInsideSetSqlTextBlock(document, position) {
  const startLine = Math.max(0, position.line - 40);
  for (let line = position.line; line >= startLine; line--) {
    const text = document.lineAt(line).text.toLowerCase();
    if (line !== position.line && text.includes(');')) {
      return false;
    }
    if (text.includes('.setsqltext(') || text.includes('setsqltext(')) {
      return true;
    }
  }
  return false;
}

function getSetSqlTextIndentation(document, position) {
  const startLine = Math.max(0, position.line - 40);
  for (let line = position.line; line >= startLine; line--) {
    const text = document.lineAt(line).text;
    const lower = text.toLowerCase();
    if (line !== position.line && lower.includes(');')) {
      break;
    }
    const idx = lower.indexOf('setsqltext(');
    if (idx !== -1) {
      const baseIndent = (text.match(/^\s*/) || [''])[0];
      return {
        baseIndent,
        fragmentIndent: baseIndent
      };
    }
  }

  const currentLine = document.lineAt(position).text;
  const currentIndent = (currentLine.match(/^\s*/) || [''])[0];
  return {
    baseIndent: currentIndent,
    fragmentIndent: currentIndent
  };
}

function findNearestSetSqlTextContext(document, position, requestedQueryVar) {
  const maxLookback = 500;
  const minLine = Math.max(0, position.line - maxLookback);
  const requested = requestedQueryVar ? requestedQueryVar.toLowerCase() : null;

  for (let line = position.line; line >= minLine; line--) {
    const text = document.lineAt(line).text;
    const m = text.match(/\b([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*setSQLText\s*\(/i);
    if (!m) {
      continue;
    }

    const queryVar = m[1];
    if (requested && queryVar.toLowerCase() !== requested) {
      continue;
    }

    const sqlLines = [text];
    let endLine = line;
    for (let i = line + 1; i < Math.min(document.lineCount, line + 500); i++) {
      const nextLine = document.lineAt(i).text;
      sqlLines.push(nextLine);
      endLine = i;
      if (nextLine.includes(');')) {
        break;
      }
    }

    return {
      queryVar,
      startLine: line,
      endLine,
      sqlText: sqlLines.join('\n')
    };
  }

  return null;
}

function extractSqlPlaceholderNames(sqlText) {
  const names = [];
  const seen = new Set();
  const re = /:([A-Za-z_][A-Za-z0-9_]*)/g;
  let m;
  while ((m = re.exec(sqlText)) !== null) {
    const name = m[1];
    const key = name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      names.push(name);
    }
  }
  return names;
}

function extractExistingSetParamNames(document, queryVar) {
  const names = new Set();
  const escapedVar = escapeRegExp(queryVar);
  const re = new RegExp(`\\b${escapedVar}\\s*\\.\\s*setParamAsString\\s*\\(\\s*'([^']+)'`, 'ig');
  const fullText = document.getText();
  let m;
  while ((m = re.exec(fullText)) !== null) {
    names.add(m[1].toLowerCase());
  }
  return names;
}

function buildMissingSetParamCompletion(document, position, requestedQueryVar) {
  const context = findNearestSetSqlTextContext(document, position, requestedQueryVar);
  if (!context) {
    return null;
  }

  const placeholders = extractSqlPlaceholderNames(context.sqlText);
  if (placeholders.length === 0) {
    return null;
  }

  const existing = extractExistingSetParamNames(document, context.queryVar);
  const missing = placeholders.filter(name => !existing.has(name.toLowerCase()));
  if (missing.length === 0) {
    return null;
  }

  const isDotTriggered = !!requestedQueryVar;
  const snippetLines = missing.map((name, idx) => {
    const receiverPrefix = isDotTriggered && idx === 0 ? '' : `${context.queryVar}.`;
    return `${receiverPrefix}setParamAsString('${name}', \${${idx + 1}:${name}});`;
  });

  const item = new vscode.CompletionItem('setParamAsString placeholders', vscode.CompletionItemKind.Snippet);
  item.insertText = new vscode.SnippetString(snippetLines.join('\n'));
  item.detail = `[sql] ${context.queryVar}`;
  item.documentation = new vscode.MarkdownString(`Insert missing setParamAsString lines for placeholders: ${missing.map(n => `:${n}`).join(', ')}`);
  item.sortText = '00_sql_setparams';
  return item;
}

/***************************************************/
/* SQL FUNCTIONS - END
/***************************************************/

//F4 Shortcut Log Zeile generieren
function buildLogStatement(variableNames, useLogProcedure) {
  const prefix = useLogProcedure ? 'log(' : 'BMD_WRITETOLOGFILE(cMakroLog, ';
  // Find max length for alignment
  const maxVarLen = variableNames.reduce((max, v) => Math.max(max, v.length), 0);
  const parts = variableNames.map((variableName, index) => {
    // For all but the first line, pad so that the variable name starts at the same column
    let lead = '';
    if (index === 0) {
      lead = '';
    } else {
      // Find the position of the variable name in the first line
      // The first line is: 'varName: "' + ...
      // So, lead = spaces to align the quote before the variable name
      lead = ' '.repeat(prefix.length);
    }
    const paddedVar = variableName.padEnd(maxVarLen, ' ');
    const suffix = index === variableNames.length - 1 ? ');' : ' +';
    return `${lead}'${paddedVar}: "' + bmd_concat(${variableName},'"') + bmd_lineBreak()${suffix}`;
  });

  return `${prefix}${parts.join('\n')}`;
}

//LHS Alle Variablennamen als Set - wird in commands.json bei F4 aufgerufen um eine Logzeile für alle markierten Variablen zu erzeugen
function extractAssignedVariables(document, startLine, endLine) {
  const seen = new Set();
  const variables = [];

  for (let line = startLine; line <= endLine; line++) {
    const rawLine = document.lineAt(line).text;
    const cleanLine = stripStringsAndComments(rawLine);
    const match = cleanLine.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*/i);
    if (!match) {
      continue;
    }

    const variableName = match[1];
    const key = variableName.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    variables.push(variableName);
  }

  return variables;
}

function yieldToEventLoop() {
  return new Promise(resolve => setImmediate(resolve));
}

function mapParserSeverity(severity) {
  return severity === 'warning'
    ? vscode.DiagnosticSeverity.Warning
    : vscode.DiagnosticSeverity.Error;
}

function toVsCodeDiagnostics(document, parserDiagnostics) {
  return parserDiagnostics.map(diagnostic => {
    const vscodeDiagnostic = new vscode.Diagnostic(
      new vscode.Range(document.positionAt(diagnostic.start), document.positionAt(diagnostic.end)),
      diagnostic.message,
      mapParserSeverity(diagnostic.severity)
    );

    if (diagnostic.code) {
      vscodeDiagnostic.code = diagnostic.code;
    }

    return vscodeDiagnostic;
  });
}

function createCodedDiagnostic(range, message, severity, code) {
  const diagnostic = new vscode.Diagnostic(range, message, severity);
  if (code) {
    diagnostic.code = code;
  }
  return diagnostic;
}

function extractContextParameterNames(rawLines) {
  const contextParams = new Set();
  const taggedAssignmentRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:=.*\/\/\s*@context-param\b/i;
  const namedMarkerRe = /^\s*\/\/\s*@context-param(?:s)?\s*:?[ \t]+(.+)$/i;

  for (const rawLine of rawLines) {
    const line = (rawLine || '').replace(/\r$/, '');

    const taggedAssignmentMatch = taggedAssignmentRe.exec(line);
    if (taggedAssignmentMatch) {
      contextParams.add(taggedAssignmentMatch[1].toLowerCase());
    }

    const namedMarkerMatch = namedMarkerRe.exec(line);
    if (!namedMarkerMatch) {
      continue;
    }

    const identifiers = namedMarkerMatch[1]
      .split(/[\s,;]+/)
      .map(part => part.trim())
      .filter(part => /^[A-Za-z_][A-Za-z0-9_]*$/.test(part));

    for (const identifier of identifiers) {
      contextParams.add(identifier.toLowerCase());
    }
  }

  return contextParams;
}

async function validateDocument(document, diagnosticCollection) {
  if (!isMacroDocument(document)) {
    diagnosticCollection.delete(document.uri);
    return;
  }

  const startVersion = document.version;
  const rawText = document.getText();
  if (rawText.length > VALIDATION_MAX_BYTES) {
    diagnosticCollection.set(document.uri, []);
    return;
  }
  const cleanText = stripStringsAndComments(rawText);
  const lines = cleanText.split('\n');
  const rawLines = rawText.split('\n');
  const contextParameterNames = extractContextParameterNames(rawLines);
  const diagnostics = [];
  const contextParameterWarningOffsets = new Set();
  const lineOffsets = [];
  let runningOffset = 0;
  for (let i = 0; i < lines.length; i++) {
    lineOffsets.push(runningOffset);
    runningOffset += lines[i].length + 1;
  }

  const sharedTypeIndex = getDocumentTypeIndex(document);
  let sharedProcedureFunctionParamTypes;
  const variableTypeCache = new Map();

  function getSharedProcedureFunctionParamTypes(cleanTextArg, typeIndexArg) {
    if (!sharedProcedureFunctionParamTypes) {
      sharedProcedureFunctionParamTypes = getProcedureFunctionParamTypes(
        cleanTextArg || cleanText,
        typeIndexArg || sharedTypeIndex
      );
    }
    return sharedProcedureFunctionParamTypes;
  }

  function getCachedVariableTypeAtPosition(documentArg, variableName, position, includeGlobalFallback = true) {
    const key = `${String(variableName).toLowerCase()}@${position.line}:${position.character}:${includeGlobalFallback ? 1 : 0}`;
    if (variableTypeCache.has(key)) {
      return variableTypeCache.get(key);
    }

    const resolvedType = getVariableTypeAtPosition(documentArg, variableName, position, includeGlobalFallback);
    variableTypeCache.set(key, resolvedType);
    return resolvedType;
  }

  function isContextParameter(lowerIdentifier) {
    return contextParameterNames.has(lowerIdentifier);
  }

  function addContextParameterMappingWarning(identifier, absOffset) {
    if (contextParameterWarningOffsets.has(absOffset)) {
      return;
    }

    contextParameterWarningOffsets.add(absOffset);
    const startPos = document.positionAt(absOffset);
    const endPos = document.positionAt(absOffset + identifier.length);
    diagnostics.push(createCodedDiagnostic(
      new vscode.Range(startPos, endPos),
      `Context parameter '${identifier}' is used here. As a best practice, map context parameters to a global variable or constant before using them in macro logic.`,
      vscode.DiagnosticSeverity.Warning,
      'semantic.context_parameter_needs_mapping'
    ));
  }

  const {
    topLevelVarNames,
    getScopeIdAtOffset,
    hasAssignmentBeforeOffset
  } = createValidationScopeContext({
    lines,
    lineOffsets,
    cleanText
  });

  const getArgumentKindAtOffset = createArgumentKindResolver({
    rawLines,
    lines,
    lineOffsets,
    classifyArgumentKind,
    getScopeIdAtOffset
  });

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }


  // ── 5. SQL placeholder case consistency inside setSQLText blocks ───────
  runSqlPlaceholderValidationPass({
    vscode,
    rawText,
    rawLines,
    diagnostics,
    createCodedDiagnostic
  });

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 6. Unknown BMD_ functions ───────────────────────────────────────────
  runUnknownBmdFunctionValidationPass({
    vscode,
    lines,
    knownBmdFunctions,
    diagnostics,
    createCodedDiagnostic,
    isCallToken
  });

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 7. Unknown constructors and object methods ──────────────────────────
  runObjectMethodValidationPass({
    vscode,
    document,
    rawText,
    rawLines,
    cleanText,
    lines,
    diagnostics,
    constructorNamespaces,
    constructorToType,
    knownMethodsByType,
    getDocumentTypeIndex: () => sharedTypeIndex,
    getProcedureFunctionParamTypes: (cleanTextArg, typeIndexArg) => getSharedProcedureFunctionParamTypes(cleanTextArg, typeIndexArg),
    getVariableTypeAtPosition: (documentArg, variableName, position, includeGlobalFallback) =>
      getCachedVariableTypeAtPosition(documentArg, variableName, position, includeGlobalFallback),
    createCodedDiagnostic
  });

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 8. Bare identifier call arguments must be known identifiers ─────────
  runIdentifierValidationPass({
    vscode,
    document,
    rawLines,
    cleanText,
    lines,
    lineOffsets,
    diagnostics,
    topLevelVarNames,
    constructorNamespaces,
    functionSignaturesByName,
    methodSignaturesByType,
    getDocumentTypeIndex: () => sharedTypeIndex,
    getProcedureFunctionParamTypes: (cleanTextArg, typeIndexArg) => getSharedProcedureFunctionParamTypes(cleanTextArg, typeIndexArg),
    getVariableTypeAtPosition: (documentArg, variableName, position, includeGlobalFallback) =>
      getCachedVariableTypeAtPosition(documentArg, variableName, position, includeGlobalFallback),
    getArgumentKindAtOffset,
    describeExpectedArgument,
    hasAssignmentBeforeOffset,
    isContextParameter,
    addContextParameterMappingWarning,
    isBmdFunctionLikeCallToken,
    isKnownFunctionCallToken,
    createCodedDiagnostic
  });

  // ── 9. 'result' used inside a procedure body ─────────────────────────────
  runRoutineResultValidationPass({
    vscode,
    lines,
    diagnostics,
    createCodedDiagnostic
  });

  // ── 10. Prefer string literals over numbers in equality/inequality comparisons ─
  // In macros almost everything is a string. Using = or <> with a bare number
  // instead of a string literal may fail when the function returns NULL or a
  // string representation.  Relational operators (<, >, <=, >=) are fine with
  // numbers because they require numeric ordering semantics.
  runComparisonValidationPass({
    vscode,
    document,
    rawText,
    cleanText,
    diagnostics,
    hasAssignmentBeforeOffset,
    createCodedDiagnostic
  });

  diagnostics.push(...toVsCodeDiagnostics(
    document,
    parser.collectStatementDiagnosticData(rawText, {
      cleanText,
      lineOffsets,
      getScopeIdAtOffset
    })
  ));

  diagnosticCollection.set(document.uri, diagnostics);
}

function clearCachedTypeIndex(document) {
  const key = document.uri.toString();
  typeIndexCache.delete(key);
}

module.exports = {
  ENABLE_COMPLETION_PROVIDER,
  ENABLE_DIAGNOSTICS,
  getRuntimeConfig,
  completionItemsByType,
  constructorAliasItems,
  assignmentCompletionItems,
  bmdCompletionItems,
  objectSnippetItems,
  buildFunctionArgumentCompletionItems,
  getVariableTypeAtPosition,
  getCreateMacroModelContext,
  buildMacroModelNameCompletionItems,
  isInsideSetSqlTextBlock,
  getSetSqlTextIndentation,
  buildMissingSetParamCompletion,
  buildUserRoutineCompletionItems,
  filterCompletionsByPrefix,
  filterAliasesByPrefix,
  findProcedureAtPosition,
  extractProcedureDefinitions,
  shouldRetriggerModelNameSuggest,
  isMacroDocument,
  hasProcedureLog,
  extractAssignedVariables,
  buildLogStatement,
  validateDocument,
  clearCachedTypeIndex
};