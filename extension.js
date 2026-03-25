const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const macroDebugger = require('./macro-debugger');
const childProcess = require('child_process');
const util = require('util');

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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildSettingsWebviewHtml(current) {
  const checked = flag => (flag ? 'checked' : '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BMD Macro Settings</title>
  <style>
    :root {
      --bg: #141617;
      --panel: #1c1f20;
      --border: #313638;
      --text: #f4f5f6;
      --muted: #a8b0b3;
      --accent: #1da57a;
      --accent-2: #15795a;
      --error: #ff6a6a;
    }

    body {
      margin: 0;
      padding: 16px;
      color: var(--text);
      background: radial-gradient(circle at top right, #21332d 0%, var(--bg) 45%);
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    .container {
      max-width: 760px;
      margin: 0 auto;
        const typeIndex = getDocumentTypeIndex(document);
        const paramTypeIndex = getProcedureFunctionParamTypes(cleanText, typeIndex);
      display: grid;
          return splitArgumentsWithPositions(argsText);
    }
      display: flex;
      align-items: center;
      gap: 8px;
      padding-top: 10px;
    }

    .check-row label {
      margin: 0;
      text-transform: none;
      color: var(--text);
      font-size: 13px;
      letter-spacing: 0;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    button {
      border: 1px solid var(--border);
      background: #252a2c;
      color: var(--text);
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
    }

    button.primary {
      background: var(--accent);
      border-color: var(--accent);
    }

    button.primary:hover {
      background: var(--accent-2);
    }

    .status {
      min-height: 20px;
      color: var(--muted);
      font-size: 12px;
    }

    .status.error {
      color: var(--error);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h2>Macro Config</h2>
      <div class="grid">
        <div>
          <label for="macroUserShort">MACRO_USER_SHORT</label>
          <input id="macroUserShort" type="text" value="${escapeHtml(current.macroUserShort)}" />
        </div>
      </div>
      <div class="check-row">
        <input id="macroUseLogProc" type="checkbox" ${checked(current.macroUseLogProc)} />
        <label for="macroUseLogProc">MACRO_USE_LOG_PROC</label>
      </div>
      <div class="check-row">
        <input id="validateOnSave" type="checkbox" ${checked(current.validateOnSave)} />
        <label for="validateOnSave">VALIDATE_ON_SAVE</label>
      </div>
    </div>

    <div class="card">
      <h2>SQL Config</h2>
      <div class="grid">
        <div>
          <label for="sqlServer">SQL_SERVER</label>
          <input id="sqlServer" type="text" value="${escapeHtml(current.sqlServer)}" />
        </div>
        <div>
          <label for="sqlDatabase">SQL_DATABASE</label>
          <input id="sqlDatabase" type="text" value="${escapeHtml(current.sqlDatabase)}" />
        </div>
        <div>
          <label for="sqlFormulaId">SQL_FORMULA_ID</label>
          <input id="sqlFormulaId" type="text" value="${escapeHtml(current.sqlFormulaId)}" />
        </div>
      </div>
    </div>

    <div class="actions">
      <button id="reset">Reset Defaults</button>
      <button id="save" class="primary">Save</button>
    </div>
    <div id="status" class="status"></div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    const status = document.getElementById('status');

    function setStatus(message, isError) {
      status.textContent = message || '';
      status.classList.toggle('error', !!isError);
    }

    function collect() {
      return {
        sqlServer: document.getElementById('sqlServer').value,
        sqlDatabase: document.getElementById('sqlDatabase').value,
        sqlFormulaId: document.getElementById('sqlFormulaId').value,
        macroUserShort: document.getElementById('macroUserShort').value,
        macroUseLogProc: document.getElementById('macroUseLogProc').checked,
        validateOnSave: document.getElementById('validateOnSave').checked
      };
    }

    document.getElementById('save').addEventListener('click', () => {
      setStatus('Saving...', false);
      vscode.postMessage({ type: 'save', payload: collect() });
    });

    document.getElementById('reset').addEventListener('click', () => {
      vscode.postMessage({ type: 'reset' });
    });

    window.addEventListener('message', event => {
      const message = event.data || {};
      if (message.type === 'saved') {
        setStatus('Saved to user settings.', false);
      } else if (message.type === 'error') {
        setStatus(message.payload || 'Failed to save settings.', true);
      }
    });
  </script>
</body>
</html>`;
}

function openSettingsWebview(context) {
  const panel = vscode.window.createWebviewPanel(
    'bmdmacroSettings',
    'BMD Macro Config',
    vscode.ViewColumn.Active,
    { enableScripts: true }
  );

  const render = () => {
    panel.webview.html = buildSettingsWebviewHtml(getRuntimeConfig());
  };

  render();

  panel.webview.onDidReceiveMessage(
    async message => {
      try {
        const config = getExtensionConfig();

        if (message.type === 'reset') {
          await config.update('sqlServer', DEFAULT_SQL_SERVER, vscode.ConfigurationTarget.Global);
          await config.update('sqlDatabase', DEFAULT_SQL_DATABASE, vscode.ConfigurationTarget.Global);
          await config.update('sqlFormulaId', DEFAULT_SQL_FORMULA_ID, vscode.ConfigurationTarget.Global);
          await config.update('macroUserShort', DEFAULT_MACRO_USER_SHORT, vscode.ConfigurationTarget.Global);
          await config.update('macroUseLogProc', DEFAULT_MACRO_USE_LOG_PROC, vscode.ConfigurationTarget.Global);
          await config.update('validateOnSave', DEFAULT_VALIDATE_ON_SAVE, vscode.ConfigurationTarget.Global);
          render();
          panel.webview.postMessage({ type: 'saved' });
          return;
        }

        if (message.type !== 'save' || !message.payload) {
          return;
        }

        const payload = message.payload;
        await config.update('sqlServer', String(payload.sqlServer || '').trim(), vscode.ConfigurationTarget.Global);
        await config.update('sqlDatabase', String(payload.sqlDatabase || '').trim(), vscode.ConfigurationTarget.Global);
        await config.update('sqlFormulaId', String(payload.sqlFormulaId || '').trim(), vscode.ConfigurationTarget.Global);
        await config.update('macroUserShort', String(payload.macroUserShort || '').trim(), vscode.ConfigurationTarget.Global);
        await config.update('macroUseLogProc', Boolean(payload.macroUseLogProc), vscode.ConfigurationTarget.Global);
        await config.update('validateOnSave', Boolean(payload.validateOnSave), vscode.ConfigurationTarget.Global);
        panel.webview.postMessage({ type: 'saved' });
      } catch (error) {
        const messageText = error && error.message ? error.message : String(error);
        panel.webview.postMessage({ type: 'error', payload: messageText });
      }
    },
    undefined,
    context.subscriptions
  );
}

// Load structured object data: type -> { constructors, methods }
const objectsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'snippets', 'objects-data.json'), 'utf8')
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
for (const entry of Object.values(functionsData)) {
  if (entry && typeof entry.prefix === 'string') {
    const lower = entry.prefix.toLowerCase();
    if (lower.startsWith('bmd_')) {
      knownBmdFunctions.add(lower);
    }
  }
}

const constructorPrefixes = new Set(Object.keys(constructorToType));

function normalizeSnippetBody(body) {
  if (Array.isArray(body)) {
    return body.join('\n');
  }
  return typeof body === 'string' ? body : '';
}

function normalizeCreateMacroModelSnippetBody(bodyText) {
  if (typeof bodyText !== 'string' || !/createmacromodel\s*\(/i.test(bodyText)) {
    return bodyText;
  }

  // Keep cursor inside quotes but avoid a numeric default that can suppress
  // completion filtering in snippet-placeholder mode.
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
  const argsText =
    extractCallArgumentText(descriptionText, name) ??
    extractCallArgumentText(bodyText, name);

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
}

function classifyArgumentKind(text) {
  if (typeof text !== 'string') {
    return null;
  }

  const trimmed = text.trim().replace(/;\s*$/, '');
  if (!trimmed) {
    return null;
  }

  if (/^'(?:''|[^'])*'$/.test(trimmed)) {
    return 'string';
  }

  if (/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(trimmed)) {
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

  // With equal count, prefer the one with more required params.
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
    item.sortText = `1_${prefix.toLowerCase()}`;
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

const assignmentCompletionItems = [...constructorNewItems, ...globalConstructorCompletionItems];
const bmdCompletionItems = globalCompletionItems.filter(item =>
  getCompletionLabelText(item).toLowerCase().startsWith('bmd_')
);

const lQuerySnippetItems = [];
{
  const macroQueryType = objectsData.MacroQuery;
  if (macroQueryType) {
    const macroQueryCtor = preferredConstructor(macroQueryType) || 'MacroObject.CreateMacroQuery';
    const ctorArgsTemplate = constructorArgsTemplateFromSnippet(
      constructorBodyByPrefix.get(macroQueryCtor.toLowerCase())
    );
    const queryCtorCall = `${macroQueryCtor}(${ctorArgsTemplate !== null ? ctorArgsTemplate : "'get_'+bmd_getGUID()"})`;

    const ctorOnly = new vscode.CompletionItem('lquery constructor', vscode.CompletionItemKind.Snippet);
    ctorOnly.insertText = new vscode.SnippetString(`\${1:lQuery} := ${queryCtorCall};\n\$0`);
    ctorOnly.detail = '[pattern] Query constructor';
    ctorOnly.documentation = new vscode.MarkdownString('Create only the query variable using naming convention `lQuery`.');
    ctorOnly.sortText = '00_lquery_1';
    lQuerySnippetItems.push(ctorOnly);

    const fullFlow = new vscode.CompletionItem('lquery full', vscode.CompletionItemKind.Snippet);
    fullFlow.insertText = new vscode.SnippetString(
      `\${1:lQuery} := ${queryCtorCall};\n` +
      `\${1}.SetSQLText(\${2:' SELECT ...'});\n` +
      `\${1}.Open();\n` +
      `while not \${1}.Eof() do begin\n` +
      `    \${3}\n` +
      `    \${1}.Next();\n` +
      `end;\n` +
      `\${1}.Close();\n` +
      `\${1}.Free();\n` +
      `\$0`
    );
    fullFlow.detail = '[pattern] Query lifecycle';
    fullFlow.documentation = new vscode.MarkdownString('Create, open, iterate with `while not ... Eof()`, close and free.');
    fullFlow.sortText = '00_lquery_2';
    lQuerySnippetItems.push(fullFlow);
  }
}

const lModelSnippetItems = [];
{
  const macroModelType = objectsData.MacroModel;
  if (macroModelType) {
    const macroModelCtor = preferredConstructor(macroModelType) || 'MacroObject.CreateMacroModel';
    const modelCtorCall = `${macroModelCtor}(${macroModelConstructorArgs(1)})`;

    const ctorOnly = new vscode.CompletionItem('lmodel constructor', vscode.CompletionItemKind.Snippet);
    ctorOnly.insertText = new vscode.SnippetString(`\${1:lModel} := ${modelCtorCall};\n\$0`);
    ctorOnly.detail = '[pattern] Model constructor';
    ctorOnly.documentation = new vscode.MarkdownString('Create only the model variable using naming convention `lModel`.');
    ctorOnly.filterText = 'lmodel';
    ctorOnly.preselect = true;
    ctorOnly.sortText = '00_lmodel_1';
    lModelSnippetItems.push(ctorOnly);

    const stateCheck = new vscode.CompletionItem('lmodel state', vscode.CompletionItemKind.Snippet);
    stateCheck.insertText = new vscode.SnippetString(
      `\${1:lModel} := ${modelCtorCall};\n\n` +
      `if (\${1}.getState() <> 'msUnknown') then begin\n` +
      `    \${2}\n` +
      `end;\n` +
      `\$0`
    );
    stateCheck.detail = '[pattern] Model state guard';
    stateCheck.documentation = new vscode.MarkdownString('Create `lModel` and guard usage with a `getState()` check.');
    stateCheck.filterText = 'lmodel';
    stateCheck.sortText = '00_lmodel_2';
    lModelSnippetItems.push(stateCheck);
  }
}

const lCsvMgrSnippetItems = [];
{
  const csvCtor = 'MacroObject.CreateMacroCSVFile';
  const csvCtorCall = `${csvCtor}(\${2:lFile})`;

  const ctorOnly = new vscode.CompletionItem('lcsvmgr constructor', vscode.CompletionItemKind.Snippet);
  ctorOnly.insertText = new vscode.SnippetString(
    `\${1:lCSVMgr} := ${csvCtorCall};\n` +
    `\${1}.SetCodepage('65001');\n` +
    `\${1}.SetQuoteChar('"');\n` +
    `\${1}.SetSeparator(',');\n` +
    `\$0`
  );
  ctorOnly.detail = '[pattern] CSV constructor setup';
  ctorOnly.documentation = new vscode.MarkdownString('Create and configure lCSVMgr with codepage, quote char and separator.');
  ctorOnly.sortText = '00_lcsvmgr_1';
  lCsvMgrSnippetItems.push(ctorOnly);

  const loopFlow = new vscode.CompletionItem('lcsvmgr loop', vscode.CompletionItemKind.Snippet);
  loopFlow.insertText = new vscode.SnippetString(
    `\${1:lCSVMgr} := ${csvCtorCall};\n` +
    `\${1}.SetCodepage('65001');\n` +
    `\${1}.SetQuoteChar('"');\n` +
    `\${1}.SetSeparator(',');\n\n` +
    `\${3:lNoOfLines} := \${1}.GetNoOfLines();\n` +
    `\${4:lNoOfCols} := \${1}.GetNoOfCols();\n\n` +
    `for \${5:i} := 0 to \${3}-1 do begin\n` +
    `    for \${6:j} := 0 to \${4}-1 do begin\n` +
    `        \${7:lWert} := \${1}.getValue(\${5},\${6});\n` +
    `        \${8}\n` +
    `    end;\n` +
    `end;\n` +
    `\$0`
  );
  loopFlow.detail = '[pattern] CSV read loop';
  loopFlow.documentation = new vscode.MarkdownString('Create/configure lCSVMgr and generate nested row/column loop with getValue(i,j).');
  loopFlow.sortText = '00_lcsvmgr_2';
  lCsvMgrSnippetItems.push(loopFlow);
}

const lWwsPpsModelSnippetItems = [];
{
  const wwsppsCtor = 'WwsPpsMacroClasses.CreateWwsPpsMacroModel';

  const ctorOnly = new vscode.CompletionItem('lwwsppsmodel constructor', vscode.CompletionItemKind.Snippet);
  ctorOnly.insertText = new vscode.SnippetString(
    `\${1:lModel} := ${wwsppsCtor}(\${2:3122250});\n\$0`
  );
  ctorOnly.detail = '[pattern] WwsPpsMacroModel constructor';
  ctorOnly.documentation = new vscode.MarkdownString('Create a WwsPpsMacroModel by numeric model ID.');
  ctorOnly.sortText = '00_lwwsppsmodel_1';
  lWwsPpsModelSnippetItems.push(ctorOnly);

  const fullFlow = new vscode.CompletionItem('lwwsppsmodel full', vscode.CompletionItemKind.Snippet);
  fullFlow.insertText = new vscode.SnippetString(
    `\${1:lModel} := ${wwsppsCtor}(\${2:3122250});\n` +
    `\${3:lQuery} := \${1}.GetModelQuery();\n` +
    `\${3}.SetSQLText(\${4:' SELECT ...'});\n` +
    `\${1}.Open();\n` +
    `while not \${1}.Eof() do begin\n` +
    `    \${1}.Edit();\n` +
    `    \${1}.SetValueByName(\${5:'FieldName'}, \${6:Value});\n` +
    `    \${1}.Save();\n` +
    `    \${1}.Next();\n` +
    `end;\n` +
    `\${1}.Close();\n` +
    `\${1}.Free();\n` +
    `\$0`
  );
  fullFlow.detail = '[pattern] WwsPpsMacroModel full lifecycle';
  fullFlow.documentation = new vscode.MarkdownString(
    'Instantiate model by ID (e.g. `3122250`), get query, open, iterate with Edit/SetValueByName/Save/Next, then Close and Free.'
  );
  fullFlow.sortText = '00_lwwsppsmodel_2';
  lWwsPpsModelSnippetItems.push(fullFlow);
}

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

  const compactPrefix = prefix.replace(/\s+/g, '');
  const startsWith = [];
  const contains = [];
  for (const item of items) {
    const label = getCompletionLabelText(item).toLowerCase();
    const compactLabel = label.replace(/\s+/g, '');
    if (label.startsWith(prefix) || compactLabel.startsWith(compactPrefix)) {
      startsWith.push(item);
    } else if (prefix.length >= 3 && (label.includes(prefix) || compactLabel.includes(compactPrefix))) {
      contains.push(item);
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

//If your file contains lModel := CreateMacroModel('auftrag'), then later when you type lModel., the language server uses this index to know that lModel is of type MacroModel and can suggest its methods.
function getDocumentTypeIndex(document) {
  const cacheKey = document.uri.toString();
  const cached = typeIndexCache.get(cacheKey);
  if (cached && cached.version === document.version) {
    return cached.index;
  }

  // Parse assignments like: myVar := CreateMacroModel(...)
  const assignmentPattern = /\b([A-Za-z_][A-Za-z0-9_]*)\b\s*:=\s*([\w.]+)\s*\(/gi;
  const documentText = document.getText();
  const cleanDocText = stripStringsAndComments(documentText);
  const index = new Map();
  let match;
  while ((match = assignmentPattern.exec(documentText)) !== null) {
    const varName = match[1].toLowerCase();
    const ctor = match[2].toLowerCase();
    const typeName = constructorToType[ctor];
    if (typeName) {
      // Keep latest assignment in file order.
      index.set(varName, typeName);
    }
  }

  // Also infer MacroQuery from: myVar := someModel.GetModelQuery()
  const getModelQueryPattern = /\b([A-Za-z_][A-Za-z0-9_]*)\b\s*:=\s*[A-Za-z_][A-Za-z0-9_]*\.GetModelQuery\s*\(/gi;
  while ((match = getModelQueryPattern.exec(documentText)) !== null) {
    const varName = match[1].toLowerCase();
    index.set(varName, 'MacroQuery');
  }

  // Also infer types from user-defined functions that return typed objects.
  // A function that does "Result := KnownConstructor(...)" has a known return type.
  const funcReturnTypes = buildFunctionReturnTypes(cleanDocText);
  if (funcReturnTypes.size > 0) {
    const funcAssignPattern = /\b([A-Za-z_][A-Za-z0-9_]*)\b\s*:=\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(/gi;
    while ((match = funcAssignPattern.exec(cleanDocText)) !== null) {
      const varName = match[1].toLowerCase();
      const callee = match[2].toLowerCase();
      if (!constructorToType[callee]) {
        const typeName = funcReturnTypes.get(callee);
        if (typeName) {
          index.set(varName, typeName);
        }
      }
    }
  }

  typeIndexCache.set(cacheKey, { version: document.version, index });
  return index;
}

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

async function uploadMacroToFormula(macroText) {
  const runtimeConfig = getRuntimeConfig();
  const macroBase64 = Buffer.from(macroText, 'utf8').toString('base64');
  const script = `
$macroText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${macroBase64}'))
$connectionString = 'Server=${runtimeConfig.sqlServer};Database=${runtimeConfig.sqlDatabase};Integrated Security=True;TrustServerCertificate=True;'
$connection = New-Object System.Data.SqlClient.SqlConnection $connectionString

try {
  $connection.Open()
  $command = $connection.CreateCommand()
  $command.CommandText = @'
UPDATE BMD.FOX_FORMELTEXT
SET FOX_FORMELTEXT = @bmdmacro
WHERE FOX_FORMELNR = @formulaNr
'@

  $null = $command.Parameters.Add('@bmdmacro', [System.Data.SqlDbType]::NVarChar, -1)
  $command.Parameters['@bmdmacro'].Value = $macroText
  $null = $command.Parameters.Add('@formulaNr', [System.Data.SqlDbType]::BigInt)
  $command.Parameters['@formulaNr'].Value = ${runtimeConfig.sqlFormulaId}

  $rows = $command.ExecuteNonQuery()
  Write-Output $rows
}
finally {
  if ($connection.State -ne [System.Data.ConnectionState]::Closed) {
    $connection.Close()
  }
  $connection.Dispose()
}
`;

  const encodedScript = Buffer.from(script, 'utf16le').toString('base64');
  const result = await execFile(
    'powershell.exe',
    ['-NoProfile', '-NonInteractive', '-EncodedCommand', encodedScript],
    { maxBuffer: 10 * 1024 * 1024 }
  );

  return (result.stdout || '').trim();
}

async function executeMacroForFormula(formulaNr) {
  const args = [
    '/PRODUCT=BMDNTCS',
    '/DBALIAS=NB-WER979\\BMD:BMD',
    '/USERID=vsc',
    '/PWD=vvsscc',
    '/FUNC=MCS_MACRO_EXECUTE',
    `/FOR_FORMELNR=${formulaNr}`,
    '/PARAM1=abc123',
    '/FINISH'
  ];

  await new Promise((resolve, reject) => {
    const child = childProcess.spawn(BMD_EXECUTABLE, args, {
      detached: true,
      stdio: 'ignore',
      windowsHide: false
    });

    child.once('error', reject);
    child.once('spawn', () => {
      child.unref();
      resolve();
    });
  });
}

function getDebugSqlConfig() {
  const runtimeConfig = getRuntimeConfig();
  return {
    enabled: DEBUG_SQL_ENABLED,
    server: runtimeConfig.sqlServer || DEBUG_SQL_SERVER,
    database: runtimeConfig.sqlDatabase || DEBUG_SQL_DATABASE,
    useIntegratedSecurity: DEBUG_SQL_USE_INTEGRATED_SECURITY,
    username: DEBUG_SQL_USERNAME,
    password: DEBUG_SQL_PASSWORD,
    trustServerCertificate: DEBUG_SQL_TRUST_SERVER_CERTIFICATE,
    timeoutSeconds: DEBUG_SQL_TIMEOUT_SECONDS,
    maxRows: DEBUG_SQL_MAX_ROWS
  };
}

async function executeDebugSql(sqlText, parameters = {}) {
  const config = getDebugSqlConfig();
  if (!config.enabled) {
    throw new Error('Debug SQL execution is disabled in extension.js');
  }

  const trimmedSql = typeof sqlText === 'string' ? sqlText.trim() : '';
  if (!trimmedSql) {
    throw new Error('SQL text is empty.');
  }

  const sqlBase64 = Buffer.from(trimmedSql, 'utf8').toString('base64');
  const paramsJsonBase64 = Buffer.from(JSON.stringify(parameters || {}), 'utf8').toString('base64');
  const script = `
  [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
  $OutputEncoding = [System.Text.UTF8Encoding]::new($false)
  $ProgressPreference = 'SilentlyContinue'
$sqlText = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${sqlBase64}'))
$paramsJson = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${paramsJsonBase64}'))
  $params = @{}
  if (-not [string]::IsNullOrWhiteSpace($paramsJson)) {
    $parsedParams = ConvertFrom-Json $paramsJson
    if ($parsedParams -is [System.Collections.IDictionary]) {
      foreach ($k in $parsedParams.Keys) {
        $params[[string]$k] = $parsedParams[$k]
      }
    }
    else {
      foreach ($p in $parsedParams.PSObject.Properties) {
        $params[[string]$p.Name] = $p.Value
      }
    }
  }
$useIntegratedSecurity = ${config.useIntegratedSecurity ? '$true' : '$false'}
$trustServerCertificate = ${config.trustServerCertificate ? '$true' : '$false'}
$timeoutSeconds = ${config.timeoutSeconds}
$maxRows = ${config.maxRows}

if ($useIntegratedSecurity) {
  $connectionString = 'Server=${config.server};Database=${config.database};Integrated Security=True;TrustServerCertificate=' + $trustServerCertificate + ';'
}
else {
  $connectionString = 'Server=${config.server};Database=${config.database};User ID=${config.username};Password=${config.password};TrustServerCertificate=' + $trustServerCertificate + ';'
}

$connection = New-Object System.Data.SqlClient.SqlConnection $connectionString
$result = $null

try {
  $connection.Open()
  $command = $connection.CreateCommand()
  $normalizedSql = [System.Text.RegularExpressions.Regex]::Replace($sqlText, ':([A-Za-z_][A-Za-z0-9_]*)', '@$1')
  $command.CommandText = $normalizedSql
  $command.CommandTimeout = $timeoutSeconds

  foreach ($entry in $params.GetEnumerator()) {
    $paramName = [string]$entry.Key
    if (-not $paramName.StartsWith('@')) {
      $paramName = '@' + $paramName
    }

    $parameter = $command.Parameters.Add($paramName, [System.Data.SqlDbType]::NVarChar, -1)
    if ($null -eq $entry.Value -or [string]::IsNullOrEmpty([string]$entry.Value)) {
      $parameter.Value = [System.DBNull]::Value
    }
    else {
      $parameter.Value = [string]$entry.Value
    }
  }

  $trimmed = $normalizedSql.TrimStart()
  $isReaderQuery = $trimmed.StartsWith('SELECT', [System.StringComparison]::OrdinalIgnoreCase) -or $trimmed.StartsWith('WITH', [System.StringComparison]::OrdinalIgnoreCase)

  if ($isReaderQuery) {
    $reader = $command.ExecuteReader()
    try {
      $columns = @()
      for ($i = 0; $i -lt $reader.FieldCount; $i++) {
        $columns += $reader.GetName($i)
      }

      $rows = @()
      $count = 0
      while ($reader.Read() -and $count -lt $maxRows) {
        $row = @{}
        foreach ($col in $columns) {
          $value = $reader[$col]
          if ($null -eq $value -or $value -is [System.DBNull]) {
            $row[$col] = $null
          }
          else {
            $row[$col] = [string]$value
          }
        }
        $rows += $row
        $count++
      }

      $result = @{
        kind = 'resultSet'
        sql = $normalizedSql
        columns = $columns
        rows = $rows
        rowCount = $rows.Count
        truncated = $reader.Read()
      }
    }
    finally {
      $reader.Close()
    }
  }
  else {
    $rowsAffected = $command.ExecuteNonQuery()
    $result = @{
      kind = 'nonQuery'
      sql = $normalizedSql
      rowsAffected = $rowsAffected
    }
  }

  $json = $result | ConvertTo-Json -Depth 10 -Compress
  Write-Output $json
}
finally {
  if ($connection.State -ne [System.Data.ConnectionState]::Closed) {
    $connection.Close()
  }
  $connection.Dispose()
}
`;

  const encodedScript = Buffer.from(script, 'utf16le').toString('base64');
  const result = await execFile(
    'powershell.exe',
    ['-NoProfile', '-NonInteractive', '-EncodedCommand', encodedScript],
    { maxBuffer: 20 * 1024 * 1024 }
  );

  const stdout = (result.stdout || '').trim();
  if (!stdout) {
    throw new Error('SQL command returned no output.');
  }

  return JSON.parse(stdout);
}

function parseAffectedRows(outputText) {
  if (!outputText) return 0;
  const match = outputText.match(/-?\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
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
  let inBlockComment = false;

  while (i < len) {
    const ch = out[i];

    if (inLineComment) {
      if (ch === '\n') { inLineComment = false; }
      else { out[i] = ' '; }
      i++;
      continue;
    }

    if (inBlockComment) {
      if (ch === '}') { inBlockComment = false; out[i] = ' '; }
      else if (ch !== '\n') { out[i] = ' '; }
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
      inBlockComment = true; out[i] = ' '; i++;
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

function pad2(value) {
  return String(value).padStart(2, '0');
}

function formatDateTime(now) {
  const dd = pad2(now.getDate());
  const mm = pad2(now.getMonth() + 1);
  const yyyy = now.getFullYear();
  const hh = pad2(now.getHours());
  const min = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  return `${dd}.${mm}.${yyyy} ${hh}:${min}:${ss}`;
}

function formatMacroId(now, macroUserShort) {
  const yyyy = now.getFullYear();
  const mm = pad2(now.getMonth() + 1);
  const dd = pad2(now.getDate());
  const hh = pad2(now.getHours());
  const min = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  return `${macroUserShort}_${yyyy}_${mm}_${dd}_${hh}_${min}_${ss}`;
}

function suggestedMakroLogName(macroUserShort) {
  return `_MAKRO_${macroUserShort}.log`;
}

function buildMandatoryMacroHeader() {
  const runtimeConfig = getRuntimeConfig();
  const now = new Date();
  const macroId = formatMacroId(now, runtimeConfig.macroUserShort);
  const createdAt = formatDateTime(now);
  const lines = [
    '//==============================================',
    `// MakroId : "${macroId}"`,
    '// Kundennummer :',
    '// MacroNo : -1',
    `// Erstelldatum : ${createdAt}`,
    `// Ersteller : ${runtimeConfig.macroUserShort}`,
    '// Eingerichtet von/am : ',
    '// Beschreibung : ',
    '//==============================================',
    '',
    '//==============================================',
    '// Constants',
    '//==============================================',
    'const',
    `    cMakroLog = '${suggestedMakroLogName(runtimeConfig.macroUserShort)}';`
  ];

  if (runtimeConfig.macroUseLogProc) {
    lines.push('    cWriteLogs = true;');
    lines.push('');
  } else {
    lines.push('');
  }

  lines.push('//==============================================');
  lines.push('// Global Variables');
  lines.push('//==============================================');
  lines.push('');
  lines.push('//==============================================');
  lines.push('// Functions / Procedures');
  lines.push('//==============================================');

  if (runtimeConfig.macroUseLogProc) {
    lines.push('//----------------------------------------------');
    lines.push('// Procedure: log// Schreibt den uebergebenen String in den Log der Konstante "cMakroLog", falls "cWriteLogs" true ist.');
    lines.push('//----------------------------------------------');
    lines.push('procedure log(aLogString)');
    lines.push('begin');
    lines.push('    if (cWriteLogs) then begin');
    lines.push('        bmd_writeToLogFile(cMakroLog, aLogString);');
    lines.push('    end;');
    lines.push('end;');
    lines.push('');
  }

  lines.push('//==============================================');
  lines.push('// MAIN');
  lines.push('//==============================================');

  if (runtimeConfig.macroUseLogProc) {
    lines.push(`log('Start Makro: "' + cMakroLog + '"==================================================');`);
  } else {
    lines.push(`BMD_WRITETOLOGFILE(cMakroLog, 'Start Makro: "' + cMakroLog + '"==================================================');`);
  }

  lines.push('Result:=true;');
  lines.push('');
  lines.push('');
  lines.push('');
  lines.push('');

  if (runtimeConfig.macroUseLogProc) {
    lines.push(`log('Ende Makro: "' + cMakroLog + '"==================================================');`);
  } else {
    lines.push(`BMD_WRITETOLOGFILE(cMakroLog, 'Ende Makro: "' + cMakroLog + '"==================================================');`);
  }

  lines.push('');
  return lines.join('\n');
}

async function ensureMandatoryHeaderForNewMacro(document) {
  if (!isMacroDocument(document)) {
    return;
  }

  if (document.getText().trim().length !== 0) {
    return;
  }

  const edit = new vscode.WorkspaceEdit();
  edit.insert(document.uri, new vscode.Position(0, 0), buildMandatoryMacroHeader());
  await vscode.workspace.applyEdit(edit);
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

function buildLogStatement(variableNames, useLogProcedure) {
  const prefix = useLogProcedure ? 'log(' : 'BMD_WRITETOLOGFILE(cMakroLog, ';
  const parts = variableNames.map((variableName, index) => {
    const lead = index === 0 ? '' : '    ';
    const suffix = index === variableNames.length - 1 ? ');' : ' +';
    return `${lead}'${variableName}: "' + bmd_concat(${variableName},'"') + bmd_lineBreak()${suffix}`;
  });

  return `${prefix}${parts.join('\n')}`;
}

// Per-document debounce timers for live validation
const validationTimers = new Map();
const validationInFlight = new Set();
const validationQueued = new Map();

function clearDocumentState(document) {
  const key = document.uri.toString();
  const timer = validationTimers.get(key);
  if (timer) {
    clearTimeout(timer);
    validationTimers.delete(key);
  }

  validationQueued.delete(key);
  validationInFlight.delete(key);
  typeIndexCache.delete(key);
}

function scheduleValidation(document, diagnosticCollection) {
  const key = document.uri.toString();
  const existing = validationTimers.get(key);
  if (existing) clearTimeout(existing);
  const timer = setTimeout(() => {
    validationTimers.delete(key);
    requestValidation(document, diagnosticCollection);
  }, 800);
  validationTimers.set(key, timer);
}

function requestValidation(document, diagnosticCollection) {
  if (!isMacroDocument(document)) {
    diagnosticCollection.delete(document.uri);
    return;
  }

  const key = document.uri.toString();
  validationQueued.set(key, document.version);

  if (validationInFlight.has(key)) {
    return;
  }

  validationInFlight.add(key);
  (async () => {
    try {
      while (validationQueued.has(key)) {
        validationQueued.delete(key);
        try {
          await validateDocument(document, diagnosticCollection);
        } catch (error) {
          const message = error && error.message ? error.message : String(error);
          console.error('[bmdmacro] validateDocument failed:', error);
          const fallbackRange = new vscode.Range(0, 0, 0, 1);
          diagnosticCollection.set(document.uri, [
            new vscode.Diagnostic(
              fallbackRange,
              `Validation failed: ${message}`,
              vscode.DiagnosticSeverity.Error
            )
          ]);
        }
      }
    } finally {
      validationInFlight.delete(key);
    }
  })();
}

function yieldToEventLoop() {
  return new Promise(resolve => setImmediate(resolve));
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
  const diagnostics = [];
  const lineOffsets = [];
  let runningOffset = 0;
  for (let i = 0; i < lines.length; i++) {
    lineOffsets.push(runningOffset);
    runningOffset += lines[i].length + 1;
  }

  // Routine body ranges (procedure/function begin..end) used for scope-aware checks.
  const routineScopes = [];
  {
    const routineHeaderRe = /\b(procedure|function)\s+[A-Za-z_][A-Za-z0-9_]*\s*\([^)]*\)/i;
    const blockTokenRe = /\b(begin|end)\b/gi;
    let pendingRoutine = false;
    let routineStartOffset = -1;
    let routineDepth = 0;

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const cleanLine = lines[lineIdx] || '';
      if (routineHeaderRe.test(cleanLine)) {
        pendingRoutine = true;
      }

      blockTokenRe.lastIndex = 0;
      let tm;
      while ((tm = blockTokenRe.exec(cleanLine)) !== null) {
        const token = tm[1].toLowerCase();
        if (token === 'begin') {
          if (pendingRoutine && routineDepth === 0) {
            routineStartOffset = lineOffsets[lineIdx];
            routineDepth = 1;
            pendingRoutine = false;
          } else if (routineDepth > 0) {
            routineDepth++;
          }
        } else if (token === 'end' && routineDepth > 0) {
          routineDepth--;
          if (routineDepth === 0) {
            routineScopes.push({
              startOffset: routineStartOffset,
              endOffset: lineOffsets[lineIdx] + cleanLine.length
            });
            routineStartOffset = -1;
          }
        }
      }
    }
  }

  function getScopeIdAtOffset(offset) {
    for (let i = 0; i < routineScopes.length; i++) {
      const scope = routineScopes[i];
      if (offset >= scope.startOffset && offset <= scope.endOffset) {
        return `routine:${i}`;
      }
    }
    return 'main';
  }

  // Build assignment offsets once for "assigned before use" checks.
  const assignmentOffsetsByVar = new Map();
  const assignmentOffsetRe = /\b([A-Za-z_][A-Za-z0-9_]*)\b\s*:=/gi;
  let assignmentOffsetMatch;
  while ((assignmentOffsetMatch = assignmentOffsetRe.exec(cleanText)) !== null) {
    const lowerVar = assignmentOffsetMatch[1].toLowerCase();
    if (!assignmentOffsetsByVar.has(lowerVar)) {
      assignmentOffsetsByVar.set(lowerVar, []);
    }
    assignmentOffsetsByVar.get(lowerVar).push(assignmentOffsetMatch.index);
  }

  function hasAssignmentBeforeOffset(lowerVar, offset) {
    const offsets = assignmentOffsetsByVar.get(lowerVar);
    if (!offsets || offsets.length === 0) {
      return false;
    }
    const targetScope = getScopeIdAtOffset(offset);
    for (const pos of offsets) {
      if (getScopeIdAtOffset(pos) !== targetScope) {
        continue;
      }
      if (pos < offset) {
        return true;
      }
      if (pos >= offset) {
        return false;
      }
    }
    return false;
  }

  const scalarAssignmentKindsByVar = new Map();
  const assignmentValueRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*(.+)$/;
  for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
    const cleanLine = lines[lineIdx] || '';
    const rawLine = rawLines[lineIdx] || '';
    const cleanMatch = assignmentValueRe.exec(cleanLine);
    const rawMatch = assignmentValueRe.exec(rawLine);
    if (!cleanMatch || !rawMatch) {
      continue;
    }

    const kind = classifyArgumentKind(rawMatch[2]);
    if (!kind) {
      continue;
    }

    const lowerVar = cleanMatch[1].toLowerCase();
    if (!scalarAssignmentKindsByVar.has(lowerVar)) {
      scalarAssignmentKindsByVar.set(lowerVar, []);
    }

    scalarAssignmentKindsByVar.get(lowerVar).push({
      offset: lineOffsets[lineIdx] + cleanMatch.index,
      kind
    });
  }

  function getScalarAssignmentKindBeforeOffset(lowerVar, offset) {
    const entries = scalarAssignmentKindsByVar.get(lowerVar);
    if (!entries || entries.length === 0) {
      return null;
    }

    const targetScope = getScopeIdAtOffset(offset);
    let currentKind = null;
    for (const entry of entries) {
      if (getScopeIdAtOffset(entry.offset) !== targetScope) {
        continue;
      }
      if (entry.offset < offset) {
        currentKind = entry.kind;
        continue;
      }
      break;
    }
    return currentKind;
  }

  function getArgumentKindAtOffset(argumentText, offset) {
    const inlineKind = classifyArgumentKind(argumentText);
    if (inlineKind) {
      return inlineKind;
    }

    const trimmed = typeof argumentText === 'string' ? argumentText.trim() : '';
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(trimmed)) {
      return null;
    }

    return getScalarAssignmentKindBeforeOffset(trimmed.toLowerCase(), offset);
  }

  // Extract complete condition spans for if/while, including chained parts like:
  // if (a < 1) and (b = 2) then
  // Also handles unparenthesized conditions: while a do
  function getConditionRanges(text) {
    const ranges = [];
    const startRe = /\b(if|while)\b/gi;
    let m;
    while ((m = startRe.exec(text)) !== null) {
      const kind = m[1].toLowerCase();
      const endKeyword = kind === 'if' ? 'then' : 'do';

      let cursor = startRe.lastIndex;
      while (cursor < text.length && /\s/.test(text[cursor])) {
        cursor++;
      }

      if (cursor >= text.length) {
        continue;
      }

      let conditionStart, conditionEnd = -1, isParenthesized;

      // Check if condition is parenthesized
      if (text[cursor] === '(') {
        // Parenthesized: while (cond) do
        isParenthesized = true;
        conditionStart = cursor;
        let depth = 1;

        for (let i = cursor + 1; i < text.length; i++) {
          const ch = text[i];
          if (ch === '(') {
            depth++;
          } else if (ch === ')') {
            depth--;
            if (depth === 0) {
              // Keep `end` exclusive for String.slice(start, end)
              conditionEnd = i + 1;
              break;
            }
          }
        }
      } else {
        // Unparenthesized: while cond do
        isParenthesized = false;
        conditionStart = cursor;

        // Find the end keyword (then/do) and backtrack to end of condition
        for (let i = cursor; i < text.length; i++) {
          if (i + endKeyword.length > text.length) {
            break;
          }
          const candidate = text.slice(i, i + endKeyword.length).toLowerCase();
          if (candidate === endKeyword) {
            const prev = i > 0 ? text[i - 1] : ' ';
            const next = i + endKeyword.length < text.length ? text[i + endKeyword.length] : ' ';
            if (!/[A-Za-z0-9_]/.test(prev) && !/[A-Za-z0-9_]/.test(next)) {
              conditionEnd = i;
              break;
            }
          }
        }
      }

      if (conditionEnd === -1) {
        continue;
      }

      ranges.push({ kind, start: conditionStart, end: conditionEnd, isParenthesized });
      // For parenthesized conditions, `conditionEnd` is right after ')' so continue there.
      // For unparenthesized conditions, `conditionEnd` points at then/do, so skip keyword.
      startRe.lastIndex = isParenthesized ? conditionEnd : conditionEnd + endKeyword.length;
    }

    return ranges;
  }

  function getControlExpressionRanges(text) {
    const ranges = [];

    function isWordBoundary(index, length) {
      const prev = index > 0 ? text[index - 1] : ' ';
      const next = index + length < text.length ? text[index + length] : ' ';
      return !/[A-Za-z0-9_]/.test(prev) && !/[A-Za-z0-9_]/.test(next);
    }

    function findKeywordAtDepth0(startIndex, keywords) {
      let depth = 0;
      for (let i = startIndex; i < text.length; i++) {
        const ch = text[i];
        if (ch === '(') {
          depth++;
          continue;
        }
        if (ch === ')' && depth > 0) {
          depth--;
          continue;
        }
        if (depth !== 0) {
          continue;
        }

        for (const kw of keywords) {
          if (i + kw.length > text.length) {
            continue;
          }
          if (text.slice(i, i + kw.length).toLowerCase() === kw && isWordBoundary(i, kw.length)) {
            return { index: i, keyword: kw };
          }
        }
      }
      return null;
    }

    // if/while expressions
    const conditionRanges = getConditionRanges(text);
    for (const range of conditionRanges) {
      if (range.isParenthesized && range.end - range.start >= 2) {
        ranges.push({ kind: range.kind, start: range.start + 1, end: range.end - 1 });
      } else {
        ranges.push({ kind: range.kind, start: range.start, end: range.end });
      }
    }

    // for-loop expressions: for i := startExpr to/downto endExpr do
    const forRe = /\bfor\b/gi;
    let forMatch;
    while ((forMatch = forRe.exec(text)) !== null) {
      let cursor = forRe.lastIndex;
      while (cursor < text.length && /\s/.test(text[cursor])) {
        cursor++;
      }

      const varMatch = /^[A-Za-z_][A-Za-z0-9_]*/.exec(text.slice(cursor));
      if (!varMatch) {
        continue;
      }
      cursor += varMatch[0].length;
      while (cursor < text.length && /\s/.test(text[cursor])) {
        cursor++;
      }
      if (text.slice(cursor, cursor + 2) !== ':=') {
        continue;
      }
      cursor += 2;
      while (cursor < text.length && /\s/.test(text[cursor])) {
        cursor++;
      }

      const startExprStart = cursor;
      const boundKw = findKeywordAtDepth0(startExprStart, ['downto', 'to']);
      if (!boundKw) {
        continue;
      }
      const startExprEnd = boundKw.index;

      cursor = boundKw.index + boundKw.keyword.length;
      while (cursor < text.length && /\s/.test(text[cursor])) {
        cursor++;
      }

      const endExprStart = cursor;
      const doKw = findKeywordAtDepth0(endExprStart, ['do']);
      if (!doKw) {
        continue;
      }
      const endExprEnd = doKw.index;

      if (startExprEnd > startExprStart) {
        ranges.push({ kind: 'for', start: startExprStart, end: startExprEnd });
      }
      if (endExprEnd > endExprStart) {
        ranges.push({ kind: 'for', start: endExprStart, end: endExprEnd });
      }

      forRe.lastIndex = doKw.index + 2;
    }

    // case expression: case expr of
    const caseRe = /\bcase\b/gi;
    let caseMatch;
    while ((caseMatch = caseRe.exec(text)) !== null) {
      let cursor = caseRe.lastIndex;
      while (cursor < text.length && /\s/.test(text[cursor])) {
        cursor++;
      }

      const exprStart = cursor;
      const ofKw = findKeywordAtDepth0(exprStart, ['of']);
      if (!ofKw) {
        continue;
      }
      const exprEnd = ofKw.index;
      if (exprEnd > exprStart) {
        ranges.push({ kind: 'case', start: exprStart, end: exprEnd });
      }

      caseRe.lastIndex = ofKw.index + 2;
    }

    return ranges;
  }

  // ── 1. begin/case / end balance ──────────────────────────────────────────
  // NOTE: begin/end blocks are best practice but optional for single-line code.
  // Validate only that each 'end' can close either 'begin' or 'case'.
  {
    const blockStack = [];
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const tokenRe = /\b(begin|case|end)\b/gi;
      let m;
      while ((m = tokenRe.exec(lines[lineIdx])) !== null) {
        const token = m[1].toLowerCase();
        if (token === 'begin' || token === 'case') {
          blockStack.push(token);
        } else {
          if (blockStack.length === 0) {
            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(lineIdx, m.index, lineIdx, m.index + 3),
              "'end' without matching 'begin' or 'case'",
              vscode.DiagnosticSeverity.Warning
            ));
          } else {
            blockStack.pop();
          }
        }
      }
    }
  }

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 2. Unclosed block comment { ────────────────────────────────────────
  {
    let inBC = false, inStr = false, inLC = false, bcStart = -1;
    for (let i = 0; i < rawText.length; i++) {
      const ch = rawText[i];
      if (inLC) { if (ch === '\n') inLC = false; continue; }
      if (inBC) { if (ch === '}') inBC = false; continue; }
      if (inStr) {
        if (ch === "'") {
          if (i + 1 < rawText.length && rawText[i + 1] === "'") { i++; }
          else { inStr = false; }
        }
        continue;
      }
      if (ch === '/' && i + 1 < rawText.length && rawText[i + 1] === '/') { inLC = true; i++; continue; }
      if (ch === '{') { inBC = true; bcStart = i; continue; }
      if (ch === "'") { inStr = true; continue; }
    }
    if (inBC) {
      const pos = document.positionAt(bcStart);
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(pos, pos.translate(0, 1)),
        "Unclosed block comment '{'",
        vscode.DiagnosticSeverity.Error
      ));
    }
  }

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 3. Unbalanced parentheses (document-wide) ──────────────────────────
  {
    let depth = 0;
    for (let i = 0; i < cleanText.length; i++) {
      const ch = cleanText[i];
      if (ch === '(') {
        depth++;
      } else if (ch === ')') {
        depth--;
        if (depth < 0) {
          const pos = document.positionAt(i);
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(pos, pos.translate(0, 1)),
            "Unmatched closing parenthesis ')'",
            vscode.DiagnosticSeverity.Warning
          ));
          depth = 0;
        }
      }
    }
    if (depth > 0) {
      // point to the last still-open '('
      let count = 0, lastOpen = 0;
      for (let i = 0; i < cleanText.length; i++) {
        if (cleanText[i] === '(') { count++; lastOpen = i; }
        else if (cleanText[i] === ')') { count--; }
      }
      const pos = document.positionAt(lastOpen);
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(pos, pos.translate(0, 1)),
        "Unmatched opening parenthesis '('",
        vscode.DiagnosticSeverity.Warning
      ));
    }
  }

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 4. Reject := inside if(...) conditions ──────────────────────────────
  {
    const conditionRanges = getConditionRanges(cleanText);
    for (const range of conditionRanges) {
      if (range.kind !== 'if') {
        continue;
      }

      const conditionText = cleanText.slice(range.start, range.end);
      const assignmentRe = /:=/g;
      let assignmentMatch;
      while ((assignmentMatch = assignmentRe.exec(conditionText)) !== null) {
        const operatorOffset = range.start + assignmentMatch.index;
        const operatorStart = document.positionAt(operatorOffset);
        const operatorEnd = document.positionAt(operatorOffset + 2);
        diagnostics.push(new vscode.Diagnostic(
          new vscode.Range(operatorStart, operatorEnd),
          "Use '=' for comparison in if conditions; ':=' is only valid for assignment",
          vscode.DiagnosticSeverity.Error
        ));
      }
    }
  }

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 4b. Reject 'if (...) do' — use 'then' instead ──────────────────────
  {
    const ifDoRe = /\bif\s*\([^)]*\)\s+do\b/gi;
    let match;
    while ((match = ifDoRe.exec(cleanText)) !== null) {
      // Extract the closing ) position to find where the error is
      const openParenIdx = cleanText.indexOf('(', match.index);
      if (openParenIdx === -1) continue;

      let depth = 1;
      let closeParenIdx = -1;
      for (let i = openParenIdx + 1; i < cleanText.length; i++) {
        if (cleanText[i] === '(') depth++;
        else if (cleanText[i] === ')') {
          depth--;
          if (depth === 0) {
            closeParenIdx = i;
            break;
          }
        }
      }

      if (closeParenIdx === -1) continue;

      // Find the 'do' keyword after the closing paren
      let doIdx = closeParenIdx + 1;
      while (doIdx < cleanText.length && /\s/.test(cleanText[doIdx])) {
        doIdx++;
      }

      if (doIdx < cleanText.length && cleanText.substring(doIdx, doIdx + 2).toLowerCase() === 'do') {
        const start = document.positionAt(doIdx);
        const end = document.positionAt(doIdx + 2);
        diagnostics.push(new vscode.Diagnostic(
          new vscode.Range(start, end),
          "Use 'then' with 'if'; 'do' is only valid for 'while' and 'for'",
          vscode.DiagnosticSeverity.Error
        ));
      }
    }
  }

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 4c. Reject 'while/for ... then' — loops must use 'do' ─────────────
  {
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const lineText = lines[lineIdx];
      const loopRe = /\b(while|for)\b/gi;
      let loopMatch;

      while ((loopMatch = loopRe.exec(lineText)) !== null) {
        const afterLoop = lineText.slice(loopMatch.index + loopMatch[0].length);
        const nextKeywordRe = /\b(do|then)\b/i;
        const nextKeyword = nextKeywordRe.exec(afterLoop);
        if (!nextKeyword) {
          continue;
        }

        if (nextKeyword[1].toLowerCase() === 'then') {
          const thenStart = loopMatch.index + loopMatch[0].length + nextKeyword.index;
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineIdx, thenStart, lineIdx, thenStart + 4),
            "Use 'do' with 'while'/'for'; 'then' is only valid for 'if'",
            vscode.DiagnosticSeverity.Error
          ));
        }
      }
    }
  }

  // ── 4d. Reject '==' everywhere — only '=' is valid comparison operator ─
  {
    const eqeqRe = /==/g;
    let m;
    while ((m = eqeqRe.exec(cleanText)) !== null) {
      const start = document.positionAt(m.index);
      const end = document.positionAt(m.index + 2);
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(start, end),
        "'==' is invalid in BMD macros. Use '=' for comparison and ':=' for assignment.",
        vscode.DiagnosticSeverity.Error
      ));
    }
  }

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }


  // ── 5. SQL placeholder case consistency inside setSQLText blocks ───────
  {
    const rawLines = rawText.split('\n');

    for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
      const line = rawLines[lineIdx];
      if (!/\bsetSQLText\s*\(/i.test(line)) {
        continue;
      }

      const seen = new Map();
      let endLine = Math.min(rawLines.length - 1, lineIdx + 500);
      for (let i = lineIdx; i <= endLine; i++) {
        const currentLine = rawLines[i];
        const placeholderRe = /:([A-Za-z_][A-Za-z0-9_]*)/g;
        let m;
        while ((m = placeholderRe.exec(currentLine)) !== null) {
          const actual = m[1];
          const key = actual.toLowerCase();

          if (!seen.has(key)) {
            seen.set(key, actual);
            continue;
          }

          const firstCase = seen.get(key);
          if (firstCase !== actual) {
            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(i, m.index + 1, i, m.index + 1 + actual.length),
              `Placeholder case mismatch for ':${key}' in setSQLText: first ':${firstCase}', here ':${actual}'`,
              vscode.DiagnosticSeverity.Warning
            ));
          }
        }

        if (i > lineIdx && currentLine.includes(');')) {
          endLine = i;
          break;
        }
      }

      lineIdx = endLine;
    }
  }

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 6. Unknown BMD_ functions ───────────────────────────────────────────
  {
    const bmdRe = /\bBMD_[A-Za-z0-9_]+\b/gi;
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      bmdRe.lastIndex = 0;
      let m;
      while ((m = bmdRe.exec(lines[lineIdx])) !== null) {
        const fn = m[0].toLowerCase();
        if (fn.startsWith('bmd_mca_')) {
          continue;
        }
        if (!knownBmdFunctions.has(fn)) {
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineIdx, m.index, lineIdx, m.index + m[0].length),
            `Unknown BMD function: '${m[0]}'`,
            vscode.DiagnosticSeverity.Error
          ));
        }
      }
    }
  }

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 7. Unknown constructors and object methods ──────────────────────────
  {
    const rawLines = rawText.split('\n');
    const typeIndex = getDocumentTypeIndex(document);
    const paramTypeIndex = getProcedureFunctionParamTypes(cleanText, typeIndex);
    const callRe = /\b([A-Za-z_][A-Za-z0-9_]*)\.([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      callRe.lastIndex = 0;
      let m;
      while ((m = callRe.exec(lines[lineIdx])) !== null) {
        const receiverLower = m[1].toLowerCase();
        const memberLower  = m[2].toLowerCase();

        if (constructorNamespaces.has(receiverLower)) {
          const fullKey = `${receiverLower}.${memberLower}`;
          if (!constructorToType[fullKey]) {
            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(lineIdx, m.index, lineIdx, m.index + m[1].length + 1 + m[2].length),
              `Unknown constructor: '${m[1]}.${m[2]}'`,
              vscode.DiagnosticSeverity.Error
            ));
          }
          continue;
        }

        // Resolve the declared type of this variable (assignment or inferred from call site)
        const receiverPosition = new vscode.Position(lineIdx, m.index);
        const typeName = getVariableTypeAtPosition(document, m[1], receiverPosition, false) || paramTypeIndex.get(receiverLower);
        if (!typeName) {
          // null sentinel = known param but type couldn't be inferred — skip silently
          if (paramTypeIndex.has(receiverLower)) {
            continue;
          }
          // Variable was never assigned via a recognized constructor — can't validate
          const colStart = m.index + m[1].length + 1;
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineIdx, m.index, lineIdx, colStart + m[2].length),
            `'${m[1]}' has no known type — assign it via a recognized constructor to enable method validation`,
            vscode.DiagnosticSeverity.Information
          ));
          continue;
        }

        const knownMethods = knownMethodsByType[typeName];
        if (knownMethods && !knownMethods.has(memberLower)) {
          // .free() is always available on any object type
          if (memberLower === 'free') {
            continue;
          }
          const colStart = m.index + m[1].length + 1;
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineIdx, colStart, lineIdx, colStart + m[2].length),
            `'${m[2]}' is not a known method of ${typeName}`,
            vscode.DiagnosticSeverity.Warning
          ));
        }

        // MacroModel.GetValue / SetValue: field name must start with MCA, MCU, or MCV
        if (typeName === 'MacroModel' && (memberLower === 'getvalue' || memberLower === 'setvalue')) {
          const rawLine = rawLines[lineIdx];
          const openParenOffset = m.index + m[1].length + 1 + m[2].length;
          const afterParen = rawLine.slice(openParenOffset + 1);
          const argMatch = afterParen.match(/^\s*'([^']*)'/);  
          if (argMatch) {
            const fieldName = argMatch[1];
            if (!/^(MCA|MCU|MCV)/.test(fieldName)) {
              const quoteOffset = afterParen.indexOf("'");
              const argStart = openParenOffset + 1 + quoteOffset + 1;
              diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(lineIdx, argStart, lineIdx, argStart + fieldName.length),
                `Model field '${fieldName}' must start with MCA, MCU or MCV`,
                vscode.DiagnosticSeverity.Error
              ));
            }
          }
        }
      }
    }
  }

  await yieldToEventLoop();
  if (document.version !== startVersion) {
    return;
  }

  // ── 8. Bare identifier call arguments must be known identifiers ─────────
  {
    const knownIdentifiers = new Set(['true', 'false', 'nil', 'result']);

    // Parse const blocks using rawText so comment lines are unambiguously
    // recognisable. Rules:
    //   • Enter const mode on a line whose first non-whitespace token is "const".
    //   • Stay in const mode across blank lines and //-comment lines.
    //   • Inside const mode, a line matching /^\s*identifier\s*=(?!=|>|:)/ is a
    //     declaration — capture the name.
    //   • Any other non-blank, non-comment line exits const mode.
    //   • A new "const" keyword re-enters const mode (multiple disjoint blocks).
    //   • All captured names go into knownIdentifiers (global scope, no offset check).
    {
      const constDeclLineRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=(?!=|>|:)/;
      const constKeywordRe  = /^\s*const\b/i;
      // Matches blank lines or lines whose only content is a // line-comment.
      const blankOrCommentRe = /^\s*(\/\/.*)?$/;
      let inConstBlock = false;

      for (const line of rawText.split('\n')) {
        // Strip trailing \r so CRLF files work correctly.
        const trimmedLine = line.replace(/\r$/, '');

        if (constKeywordRe.test(trimmedLine)) {
          inConstBlock = true;
          // Handle inline form: "const a = 1"
          const rest = trimmedLine.replace(/^\s*const\s*/i, '');
          const inlineMatch = constDeclLineRe.exec(rest);
          if (inlineMatch) {
            knownIdentifiers.add(inlineMatch[1].toLowerCase());
          }
          continue;
        }

        if (blankOrCommentRe.test(trimmedLine)) {
          // Blank / comment lines never change const-block state.
          continue;
        }

        if (inConstBlock) {
          const declMatch = constDeclLineRe.exec(trimmedLine);
          if (declMatch) {
            knownIdentifiers.add(declMatch[1].toLowerCase());
          } else {
            inConstBlock = false; // first real non-declaration line ends this block
          }
        }
      }
    }

    const defRe = /\b(?:procedure|function)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)/gi;
    const userRoutineParamCount = new Map();
    let defMatch;
    while ((defMatch = defRe.exec(cleanText)) !== null) {
      const routineNameLower = defMatch[1].toLowerCase();
      knownIdentifiers.add(routineNameLower);
      const paramCount = defMatch[2]
        .split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0).length;
      userRoutineParamCount.set(routineNameLower, paramCount);
    }

    // Parameters are only known inside their own routine body.
    const parameterScopes = [];
    const routineHeaderRe = /\b(procedure|function)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)/i;
    const blockTokenRe = /\b(begin|end)\b/gi;
    let pendingParams = null;
    let currentParams = null;
    let currentStartOffset = -1;
    let routineDepth = 0;

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const cleanLine = lines[lineIdx] || '';

      const headerMatch = routineHeaderRe.exec(cleanLine);
      if (headerMatch) {
        pendingParams = headerMatch[3]
          .split(',')
          .map(p => p.trim())
          .filter(p => /^[A-Za-z_][A-Za-z0-9_]*$/.test(p))
          .map(p => p.toLowerCase());
      }

      blockTokenRe.lastIndex = 0;
      let tm;
      while ((tm = blockTokenRe.exec(cleanLine)) !== null) {
        const token = tm[1].toLowerCase();
        if (token === 'begin') {
          if (!currentParams && pendingParams) {
            currentParams = pendingParams;
            pendingParams = null;
            currentStartOffset = lineOffsets[lineIdx];
            routineDepth = 1;
          } else if (currentParams) {
            routineDepth++;
          }
        } else if (token === 'end' && currentParams) {
          routineDepth--;
          if (routineDepth <= 0) {
            parameterScopes.push({
              startOffset: currentStartOffset,
              endOffset: lineOffsets[lineIdx] + cleanLine.length,
              params: new Set(currentParams)
            });
            currentParams = null;
            currentStartOffset = -1;
            routineDepth = 0;
          }
        }
      }
    }

    function isParameterInScope(lowerIdentifier, absOffset) {
      for (const scope of parameterScopes) {
        if (absOffset < scope.startOffset || absOffset > scope.endOffset) {
          continue;
        }
        if (scope.params.has(lowerIdentifier)) {
          return true;
        }
      }
      return false;
    }

    const lineAssignedRe = /\b([A-Za-z_][A-Za-z0-9_]*)\b\s*:=/gi;
    const keywordSet = new Set([
      'if', 'then', 'else', 'while', 'for', 'do', 'begin', 'end', 'case', 'of',
      'repeat', 'until', 'and', 'or', 'not', 'to', 'downto', 'in'
    ]);
    const assignLineRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*(.+)$/;
    const tokenRe = /\b([A-Za-z_][A-Za-z0-9_]*)\b/g;

    function splitArgsWithPositions(argsText) {
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
          if (depth > 0) depth--;
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

    const rawLines = rawText.split('\n');

    function findCallMatches(lineText) {
      const matches = [];
      const callStartRe = /\b([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)?)\s*\(/g;
      let m;

      while ((m = callStartRe.exec(lineText)) !== null) {
        const callee = m[1];
        const calleeStart = m.index;
        const openParenOffset = lineText.indexOf('(', calleeStart + callee.length);
        if (openParenOffset === -1) {
          continue;
        }

        let depth = 1;
        let inString = false;
        let closeParenOffset = -1;

        for (let i = openParenOffset + 1; i < lineText.length; i++) {
          const ch = lineText[i];
          if (inString) {
            if (ch === "'") {
              if (i + 1 < lineText.length && lineText[i + 1] === "'") {
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
              closeParenOffset = i;
              break;
            }
          }
        }

        if (closeParenOffset === -1) {
          continue;
        }

        matches.push({
          callee,
          calleeStart,
          openParenOffset,
          closeParenOffset
        });
      }

      return matches;
    }

    for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
      const cleanLine = lines[lineIdx] || '';
      const rawLine = rawLines[lineIdx] || '';
      const lineCalls = findCallMatches(cleanLine);
      for (const callMatch of lineCalls) {
        const callee = callMatch.callee;
        const calleeLower = callee.toLowerCase();
        const calleeStart = callMatch.calleeStart;
        const beforeCall = cleanLine.slice(0, calleeStart).toLowerCase();

        // Skip control statements and routine definitions.
        if (/\b(if|while|for)\s*$/.test(beforeCall)) {
          continue;
        }
        if (/\b(procedure|function)\s*$/.test(beforeCall)) {
          continue;
        }

        const openParenOffset = callMatch.openParenOffset;
        const argsText = rawLine.slice(openParenOffset + 1, callMatch.closeParenOffset);
        const args = splitArgsWithPositions(argsText);
        const providedArgCount = args.reduce((count, part) => {
          return part.text.trim().length > 0 ? count + 1 : count;
        }, 0);

        let callSignature = null;
        if (calleeLower.startsWith('bmd_')) {
          callSignature = functionSignaturesByName.get(calleeLower) || null;
        } else if (callee.includes('.')) {
          const dotIndex = callee.indexOf('.');
          const receiver = callee.slice(0, dotIndex);
          const receiverLower = receiver.toLowerCase();
          const memberLower = callee.slice(dotIndex + 1).toLowerCase();

          if (!constructorNamespaces.has(receiverLower)) {
            const receiverPosition = new vscode.Position(lineIdx, calleeStart);
            const typeName = getVariableTypeAtPosition(document, receiver, receiverPosition, false) || paramTypeIndex.get(receiverLower);
            if (typeName && methodSignaturesByType[typeName]) {
              callSignature = methodSignaturesByType[typeName].get(memberLower) || null;
            }
          }
        }

        if (callSignature) {
          const missingRequiredArg = callSignature.params
            .slice(0, callSignature.requiredCount)
            .some((_, idx) => !args[idx] || args[idx].text.trim().length === 0);

          if (missingRequiredArg || providedArgCount < callSignature.requiredCount) {
            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(lineIdx, calleeStart, lineIdx, calleeStart + callee.length),
              `'${callee}' expects at least ${callSignature.requiredCount} argument(s); got ${providedArgCount}.`,
              vscode.DiagnosticSeverity.Warning
            ));
          } else if (providedArgCount > callSignature.totalCount) {
            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(lineIdx, calleeStart, lineIdx, calleeStart + callee.length),
              `'${callee}' expects at most ${callSignature.totalCount} argument(s); got ${providedArgCount}.`,
              vscode.DiagnosticSeverity.Warning
            ));
          }

          for (let argIndex = 0; argIndex < Math.min(args.length, callSignature.params.length); argIndex++) {
            const param = callSignature.params[argIndex];
            if (!param || param.kind === 'any') {
              continue;
            }

            const rawArg = args[argIndex].text;
            const trimmed = rawArg.trim();
            if (!trimmed) {
              continue;
            }

            const leadingWhitespace = rawArg.match(/^\s*/);
            const argColStart = openParenOffset + 1 + args[argIndex].start + (leadingWhitespace ? leadingWhitespace[0].length : 0);
            const absArgOffset = lineOffsets[lineIdx] + argColStart;
            const actualKind = getArgumentKindAtOffset(trimmed, absArgOffset);

            if (!actualKind || actualKind === param.kind) {
              continue;
            }

            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(lineIdx, argColStart, lineIdx, argColStart + trimmed.length),
              `Argument ${argIndex + 1} of '${callee}' expects ${describeExpectedArgument(param)}, but the supplied value looks like a ${actualKind}.`,
              vscode.DiagnosticSeverity.Warning
            ));
          }
        }

        // Validate argument count for user-defined routines only.
        // BMD_ functions may have optional parameters, so they are intentionally excluded.
        if (!calleeLower.startsWith('bmd_')) {
          const expectedArgCount = userRoutineParamCount.get(calleeLower);
          if (typeof expectedArgCount === 'number' && providedArgCount !== expectedArgCount) {
            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(lineIdx, calleeStart, lineIdx, calleeStart + callee.length),
              `Parameter count mismatch for '${callee}': expected ${expectedArgCount}, got ${providedArgCount}.`,
              vscode.DiagnosticSeverity.Error
            ));
          }
        }

        for (const arg of args) {
          const rawArg = arg.text;
          const trimmed = rawArg.trim();
          if (!trimmed) {
            continue;
          }

          // Only validate plain identifier args, e.g. lModelState.
          if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(trimmed)) {
            continue;
          }

          const leadingWhitespace = rawArg.match(/^\s*/);
          const argColStart = openParenOffset + 1 + arg.start + (leadingWhitespace ? leadingWhitespace[0].length : 0);

          const lowerArg = trimmed.toLowerCase();
          const absArgOffset = lineOffsets[lineIdx] + argColStart;
          if (knownIdentifiers.has(lowerArg) || isParameterInScope(lowerArg, absArgOffset) || hasAssignmentBeforeOffset(lowerArg, absArgOffset)) {
            continue;
          }

          // If the arg matches the callee name, it is likely recursive call context; skip.
          if (lowerArg === calleeLower) {
            continue;
          }

          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineIdx, argColStart, lineIdx, argColStart + trimmed.length),
            `Unknown argument identifier '${trimmed}'. It must be assigned before use.`,
            vscode.DiagnosticSeverity.Error
          ));
        }
      }

      // Also validate bare identifiers on assignment RHS in the same pass.
      // Use lineAssignedRe to find ALL assignments on the line (not just pure assignment lines).
      lineAssignedRe.lastIndex = 0;
      let assignMatchForRhs;
      while ((assignMatchForRhs = lineAssignedRe.exec(cleanLine)) !== null) {
        const leftVar = assignMatchForRhs[1];
        const assignPos = assignMatchForRhs.index + leftVar.length; // Position after variable
        const colonEqIndex = cleanLine.indexOf(':=', assignPos);
        
        if (colonEqIndex === -1) {
          continue; // Shouldn't happen, but be safe
        }
        
        // Extract RHS: from after := to ; or end of line
        let rhsEnd = cleanLine.indexOf(';', colonEqIndex);
        if (rhsEnd === -1) rhsEnd = cleanLine.length;
        
        const rhsStart = colonEqIndex + 2; // Position right after :=
        const rhs = cleanLine.substring(rhsStart, rhsEnd).trim();
        const rhsOffsetInLine = cleanLine.indexOf(rhs, rhsStart);
        
        if (rhs && rhsOffsetInLine !== -1) {
          tokenRe.lastIndex = 0;
          let tokenMatch;
          while ((tokenMatch = tokenRe.exec(rhs)) !== null) {
            const token = tokenMatch[1];
            const lower = token.toLowerCase();

            // Skip member names in obj.member or namespace.function patterns.
            const startInRhs = tokenMatch.index;
            const endInRhs = startInRhs + token.length;
            const prevChar = startInRhs > 0 ? rhs[startInRhs - 1] : '';
            const nextChar = endInRhs < rhs.length ? rhs[endInRhs] : '';
            if (prevChar === '.' || nextChar === '.') {
              continue;
            }

            const startCol = rhsOffsetInLine + startInRhs;
            const absTokenOffset = lineOffsets[lineIdx] + startCol;

            if (knownIdentifiers.has(lower) || keywordSet.has(lower) || isParameterInScope(lower, absTokenOffset) || hasAssignmentBeforeOffset(lower, absTokenOffset)) {
              continue;
            }
            if (lower.startsWith('bmd_')) {
              continue;
            }
            
            const message = lower === leftVar.toLowerCase()
              ? `Variable '${token}' is used in its own assignment before it has been assigned a value.`
              : `Unknown identifier '${token}' in expression. It must be assigned before use.`;

            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(lineIdx, startCol, lineIdx, startCol + token.length),
              message,
              vscode.DiagnosticSeverity.Error
            ));
          }
        }
      }

    }

    // Validate bare identifiers in control expressions (if/while/for/case).
    // Use absolute offsets so assignment-order checks remain accurate.
    const controlRanges = getControlExpressionRanges(cleanText);
    for (const range of controlRanges) {
      const exprText = cleanText.slice(range.start, range.end);
      tokenRe.lastIndex = 0;
      let tokenMatch;
      while ((tokenMatch = tokenRe.exec(exprText)) !== null) {
        const token = tokenMatch[1];
        const lower = token.toLowerCase();
        const startInExpr = tokenMatch.index;
        const endInExpr = startInExpr + token.length;
        const absOffset = range.start + startInExpr;

        if (knownIdentifiers.has(lower) || keywordSet.has(lower) || isParameterInScope(lower, absOffset)) {
          continue;
        }
        if (lower.startsWith('bmd_')) {
          continue;
        }

        const prevChar = startInExpr > 0 ? exprText[startInExpr - 1] : '';
        const nextChar = endInExpr < exprText.length ? exprText[endInExpr] : '';
        if (prevChar === '.' || nextChar === '.') {
          continue;
        }

        if (hasAssignmentBeforeOffset(lower, absOffset)) {
          continue;
        }

        const startPos = document.positionAt(absOffset);
        const endPos = document.positionAt(absOffset + token.length);
        diagnostics.push(new vscode.Diagnostic(
          new vscode.Range(startPos, endPos),
          `Unknown identifier '${token}' in control expression. It must be assigned before use.`,
          vscode.DiagnosticSeverity.Error
        ));
      }
    }
  }

  // ── 9. 'result' used inside a procedure body ─────────────────────────────
  {
    const routineHeaderRe = /\b(procedure|function)\s+([A-Za-z_][A-Za-z0-9_]*)/gi;
    const blockTokenRe = /\b(begin|end)\b/gi;
    const resultRe = /\bresult\b/gi;

    let pendingRoutineKind = null;
    let pendingRoutineName = null;
    let pendingRoutineLine = -1;
    let pendingRoutineCol = -1;
    let currentRoutineKind = null;
    let currentRoutineName = null;
    let currentRoutineLine = -1;
    let currentRoutineCol = -1;
    let currentFunctionHasResult = false;
    let routineBlockDepth = 0;

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const cleanLine = lines[lineIdx] || '';

      routineHeaderRe.lastIndex = 0;
      const headerMatch = routineHeaderRe.exec(cleanLine);
      if (headerMatch) {
        pendingRoutineKind = headerMatch[1].toLowerCase();
        pendingRoutineName = headerMatch[2];
        pendingRoutineLine = lineIdx;
        pendingRoutineCol = headerMatch.index + headerMatch[0].length - pendingRoutineName.length;
      }

      if (currentRoutineKind === 'procedure') {
        resultRe.lastIndex = 0;
        let rm;
        while ((rm = resultRe.exec(cleanLine)) !== null) {
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineIdx, rm.index, lineIdx, rm.index + 6),
            "'result' cannot be used inside a procedure. Only functions have a return value.",
            vscode.DiagnosticSeverity.Warning
          ));
        }
      } else if (currentRoutineKind === 'function') {
        resultRe.lastIndex = 0;
        if (resultRe.test(cleanLine)) {
          currentFunctionHasResult = true;
        }
      }

      blockTokenRe.lastIndex = 0;
      let tm;
      while ((tm = blockTokenRe.exec(cleanLine)) !== null) {
        const token = tm[1].toLowerCase();
        if (token === 'begin') {
          if (!currentRoutineKind && pendingRoutineKind) {
            currentRoutineKind = pendingRoutineKind;
            currentRoutineName = pendingRoutineName;
            currentRoutineLine = pendingRoutineLine;
            currentRoutineCol = pendingRoutineCol;
            currentFunctionHasResult = false;
            pendingRoutineKind = null;
            pendingRoutineName = null;
            pendingRoutineLine = -1;
            pendingRoutineCol = -1;
            routineBlockDepth = 1;
          } else if (currentRoutineKind) {
            routineBlockDepth++;
          }
        } else if (token === 'end' && currentRoutineKind) {
          routineBlockDepth--;
          if (routineBlockDepth <= 0) {
            if (currentRoutineKind === 'function' && !currentFunctionHasResult) {
              const warningLine = currentRoutineLine >= 0 ? currentRoutineLine : lineIdx;
              const warningCol = currentRoutineCol >= 0 ? currentRoutineCol : tm.index;
              const warningLen = currentRoutineName ? currentRoutineName.length : 8;
              diagnostics.push(new vscode.Diagnostic(
                new vscode.Range(warningLine, warningCol, warningLine, warningCol + warningLen),
                `Function '${currentRoutineName || 'function'}' has no 'Result' usage. Functions should assign a return value via Result := ...`,
                vscode.DiagnosticSeverity.Warning
              ));
            }
            currentRoutineKind = null;
            currentRoutineName = null;
            currentRoutineLine = -1;
            currentRoutineCol = -1;
            currentFunctionHasResult = false;
            routineBlockDepth = 0;
          }
        }
      }
    }
  }

  // ── 10. Prefer string literals over numbers in equality/inequality comparisons ─
  // In macros almost everything is a string. Using = or <> with a bare number
  // instead of a string literal may fail when the function returns NULL or a
  // string representation.  Relational operators (<, >, <=, >=) are fine with
  // numbers because they require numeric ordering semantics.
  {
    const conditionRanges = getConditionRanges(cleanText);
    for (const range of conditionRanges) {
      let condText = cleanText.slice(range.start, range.end);
      let rawCondText = rawText.slice(range.start, range.end);
      let baseOffset = range.start;

      // For parenthesized conditions, skip the outer ( and )
      if (range.isParenthesized && condText[0] === '(') {
        condText = condText.slice(1, -1);
        rawCondText = rawCondText.slice(1, -1);
        baseOffset = range.start + 1;
      }

      // Four patterns covering both operand sides for = and <>:
      //   1. "= NUM"  — equality, number on right  (≠ <=, >=, :=, !=, ==)
      //   2. "NUM ="  — equality, number on left   (= not followed by =, <, >)
      //   3. "<> NUM" — inequality, number on right
      //   4. "NUM <>" — inequality, number on left
      const numPatterns = [
        /(?<![<>!=:])([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(\d+\.?\d*)\b/g,
        /\b(\d+\.?\d*)\s*=(?![=<>])\s*([A-Za-z_][A-Za-z0-9_]*)\b/g,
        /([A-Za-z_][A-Za-z0-9_]*)\s*<>\s*(\d+\.?\d*)\b/g,
        /\b(\d+\.?\d*)\s*<>\s*([A-Za-z_][A-Za-z0-9_]*)\b/g,
      ];

      // Track already-flagged offsets to avoid double-reporting the same token.
      const flagged = new Set();

      for (const pat of numPatterns) {
        pat.lastIndex = 0;
        let m;
        while ((m = pat.exec(condText)) !== null) {
          const identifier = m[1].match(/^[A-Za-z_]/) ? m[1] : m[2];
          const numStr = m[1].match(/^[A-Za-z_]/) ? m[2] : m[1];
          const idOffsetInCondition = m.index + m[0].indexOf(identifier);
          const idAbsOffset = baseOffset + idOffsetInCondition;
          if (!hasAssignmentBeforeOffset(identifier.toLowerCase(), idAbsOffset)) {
            continue;
          }

          const numOffsetInCondition = m.index + m[0].indexOf(numStr);
          const absOffset = baseOffset + numOffsetInCondition;
          if (flagged.has(absOffset)) continue;
          flagged.add(absOffset);

          const startPos = document.positionAt(absOffset);
          const endPos = document.positionAt(absOffset + numStr.length);
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(startPos, endPos),
            `Prefer string literal '${numStr}' over number in equality/inequality comparison. ` +
            `In macros, values are typically strings; '${numStr}' also handles NULL returns correctly. ` +
            `Use relational operators (<, >, <=, >=) if numeric ordering is intended.`,
            vscode.DiagnosticSeverity.Warning
          ));
        }
      }

      // Relational operators are numeric operations, so string literals like
      // '1' should not be used with <, >, <=, >=.
      const relationalStringPatterns = [
        /(?:<=|>=|<|>)\s*('(?:\d+\.?\d*)')/g,
        /('(?:\d+\.?\d*)')\s*(?:<=|>=|<|>)/g,
      ];

      for (const pat of relationalStringPatterns) {
        pat.lastIndex = 0;
        let m;
        while ((m = pat.exec(rawCondText)) !== null) {
          const quotedNum = m[1];
          const tokenOffsetInCondition = m.index + m[0].indexOf(quotedNum);
          const absOffset = baseOffset + tokenOffsetInCondition;
          const startPos = document.positionAt(absOffset);
          const endPos = document.positionAt(absOffset + quotedNum.length);
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(startPos, endPos),
            `Relational comparisons must use numbers, not strings. Use ${quotedNum.slice(1, -1)} instead of ${quotedNum}.`,
            vscode.DiagnosticSeverity.Warning
          ));
        }
      }
    }
  }

  // ── 11. Statement-form and semicolon hygiene ────────────────────────────
  {
    const rawLines = rawText.split('\n');
    const constKeywordRe = /^\s*const\b/i;
    const constDeclRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=(?!=|>|:)/;
    const blankOrCommentRe = /^\s*(\/\/.*)?$/;
    const bareTokenRe = /^\s*([A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?)\s*(?:\/\/.*)?$/;
    const bareFragmentRe = /^\s*([A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?)(?:\s+([A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?))+\s*(?:\/\/.*)?$/;
    const endsWithSemicolonRe = /;\s*(?:\/\/.*)?$/;
    const startsWithControlRe = /^\s*(if|while|for|case|begin|end|else|repeat|until|procedure|function)\b/i;
    const controlKeywordSet = new Set(['if', 'while', 'for', 'case', 'begin', 'end', 'else', 'repeat', 'until', 'procedure', 'function']);

    const constDeclLineIdx = new Set();
    let inConstBlock = false;

    for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
      const rawLine = rawLines[lineIdx].replace(/\r$/, '');

      if (constKeywordRe.test(rawLine)) {
        inConstBlock = true;
        const inlinePart = rawLine.replace(/^\s*const\s*/i, '');
        if (constDeclRe.test(inlinePart)) {
          constDeclLineIdx.add(lineIdx);
        }
        continue;
      }

      if (blankOrCommentRe.test(rawLine)) {
        continue;
      }

      if (inConstBlock) {
        if (constDeclRe.test(rawLine)) {
          constDeclLineIdx.add(lineIdx);
        } else {
          inConstBlock = false;
        }
      }
    }

    for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
      const rawLine = rawLines[lineIdx].replace(/\r$/, '');
      if (blankOrCommentRe.test(rawLine)) {
        continue;
      }

      // A variable may only be assigned via '=' inside a const block declaration.
      if (!constDeclLineIdx.has(lineIdx) && !startsWithControlRe.test(rawLine)) {
        const invalidEq = constDeclRe.exec(rawLine);
        if (invalidEq) {
          const varName = invalidEq[1];
          const startCol = rawLine.indexOf(varName);
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineIdx, startCol, lineIdx, startCol + varName.length),
            `Invalid assignment '${varName} = ...'. Use ':=' outside const blocks.`,
            vscode.DiagnosticSeverity.Error
          ));
        }
      }

      // Trailing non-comment tokens after ';' are a syntax error.
      const lastSemi = rawLine.lastIndexOf(';');
      if (lastSemi !== -1) {
        const tail = rawLine.slice(lastSemi + 1);
        const tailTrimmed = tail.trim();
        if (tailTrimmed && !tailTrimmed.startsWith('//')) {
          const tokenStartInTail = tail.search(/\S/);
          const startCol = lastSemi + 1 + (tokenStartInTail === -1 ? 0 : tokenStartInTail);
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineIdx, startCol, lineIdx, startCol + tailTrimmed.length),
            `Unexpected token '${tailTrimmed}' after ';'.`,
            vscode.DiagnosticSeverity.Error
          ));
        }
      }

      // Standalone garbage tokens (for example: "d" on its own line) are invalid.
      // This mirrors the same intent as trailing-token validation after ';'.
      if (!constDeclLineIdx.has(lineIdx) && !startsWithControlRe.test(rawLine) && !constKeywordRe.test(rawLine)) {
        const bareTokenMatch = bareTokenRe.exec(rawLine);
        if (bareTokenMatch) {
          const token = bareTokenMatch[1];
          const tokenLower = token.toLowerCase();
          if (!controlKeywordSet.has(tokenLower)) {
            const startCol = rawLine.indexOf(token);
            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(lineIdx, startCol, lineIdx, startCol + token.length),
              `Unexpected token '${token}'.`,
              vscode.DiagnosticSeverity.Error
            ));
          }
        }

        const bareFragmentMatch = bareFragmentRe.exec(rawLine);
        if (bareFragmentMatch) {
          const fragment = bareFragmentMatch[0].trim().replace(/\s*\/\/.*$/, '').trim();
          const fragmentLower = fragment.toLowerCase();
          if (!controlKeywordSet.has(fragmentLower)) {
            const startCol = rawLine.indexOf(fragment);
            diagnostics.push(new vscode.Diagnostic(
              new vscode.Range(lineIdx, startCol, lineIdx, startCol + fragment.length),
              `Unexpected token sequence '${fragment}'.`,
              vscode.DiagnosticSeverity.Error
            ));
          }
        }
      }

      // Semicolon is optional, but warn when missing on common statement forms.
      const isConstDecl = constDeclLineIdx.has(lineIdx);
      const isAssignmentStmt = /^\s*[A-Za-z_][A-Za-z0-9_]*\s*:=/.test(rawLine);
      const isCallStmt = /^\s*[A-Za-z_][A-Za-z0-9_.]*\s*\([^)]*\)\s*$/.test(rawLine) && !startsWithControlRe.test(rawLine);
      if ((isConstDecl || isAssignmentStmt || isCallStmt) && !endsWithSemicolonRe.test(rawLine)) {
        const endCol = rawLine.length;
        diagnostics.push(new vscode.Diagnostic(
          new vscode.Range(lineIdx, Math.max(0, endCol - 1), lineIdx, endCol),
          "Statement should end with ';' (optional, but recommended).",
          vscode.DiagnosticSeverity.Warning
        ));
      }
    }
  }

  diagnosticCollection.set(document.uri, diagnostics);
}

/**
 * Format a BMD macro document: re-indent based on begin/end nesting only.
 * Keywords like 'then', 'do', 'repeat', 'else' don't introduce new blocks
 * since they're always used with 'begin'.
 */
function formatDocument(text) {
  const lines = text.split('\n');
  const result = [];
  let indent = 0;
  const indentStr = '    '; // 4 spaces per indent level

  for (const rawLine of lines) {
    let line = rawLine.trimStart();
    if (!line) {
      // Preserve blank lines
      result.push('');
      continue;
    }

    // Check if this line starts with 'end' or 'until' — decrease indent for printing
    const startsWithEnd = /^\b(end|until)\b/i.test(line);
    let lineIndent = indent;
    if (startsWithEnd && indent > 0) {
      lineIndent--;
    }

    // Apply current indentation
    result.push(indentStr.repeat(lineIndent) + line);

    // Count ONLY 'begin' increases and 'end'/'until' decreases (NOT then/do/repeat/else)
    const beginCount = (line.match(/\bbegin\b/gi) || []).length;
    let endCount = (line.match(/\b(end|until)\b/gi) || []).length;

    // If line starts with end/until, we already applied it above, so don't count it again
    if (startsWithEnd) {
      endCount--;
    }

    indent = Math.max(0, lineIndent + beginCount - endCount);
  }

  return result.join('\n');
}

exports.activate = function (context) {
  // ── Real-time syntax diagnostics ─────────────────────────────────────────
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('bmdmacro');

  // Validate files already open when the extension activates
  if (ENABLE_DIAGNOSTICS) {
    for (const doc of vscode.workspace.textDocuments) {
      ensureMandatoryHeaderForNewMacro(doc);
      if (doc.languageId === 'bmdmacro') {
        requestValidation(doc, diagnosticCollection);
      }
    }
  }
  else {
    for (const doc of vscode.workspace.textDocuments) {
      ensureMandatoryHeaderForNewMacro(doc);
    }
  }

  const provider = ENABLE_COMPLETION_PROVIDER
    ? vscode.languages.registerCompletionItemProvider(
        { language: 'bmdmacro' },
        {
          provideCompletionItems(document, position) {
            const lineText = document.lineAt(position).text;
            const textBefore = lineText.substring(0, position.character);

            const dotMatch = textBefore.match(/([A-Za-z_][A-Za-z0-9_]*)\.$/);
            if (dotMatch) {
              const varName = dotMatch[1].toLowerCase();
              const typeName = getVariableTypeAtPosition(document, varName, position);
              if (!typeName || !completionItemsByType[typeName]) {
                return undefined;
              }

              const typeItems = completionItemsByType[typeName];
              if (typeName === 'MacroQuery') {
                const paramsItem = buildMissingSetParamCompletion(document, position, dotMatch[1]);
                if (paramsItem) {
                  return [paramsItem, ...typeItems];
                }
              }

              return typeItems;
            }

            const createMacroModelContext = getCreateMacroModelContext(textBefore);
            if (createMacroModelContext) {
              const modelNameItems = buildMacroModelNameCompletionItems(
                createMacroModelContext.typedPrefix,
                createMacroModelContext.insideQuote
              );
              if (modelNameItems.length > 0) {
                if (createMacroModelContext.insideQuote && typeof createMacroModelContext.replaceStartCharacter === 'number') {
                  const replaceEndCharacter = typeof createMacroModelContext.replaceEndCharacter === 'number'
                    ? createMacroModelContext.replaceEndCharacter
                    : position.character;
                  const replaceRange = new vscode.Range(
                    position.line,
                    createMacroModelContext.replaceStartCharacter,
                    position.line,
                    replaceEndCharacter
                  );
                  for (const item of modelNameItems) {
                    item.range = replaceRange;
                  }
                }
                return new vscode.CompletionList(modelNameItems, true);
              }
            }

            if (isInsideSetSqlTextBlock(document, position) && /\+\s*$/.test(textBefore)) {
              const { baseIndent, fragmentIndent } = getSetSqlTextIndentation(document, position);
              const lineBreakAfterPlus = new vscode.CompletionItem('sql continue with bmd_lineBreak()', vscode.CompletionItemKind.Snippet);
              lineBreakAfterPlus.insertText = new vscode.SnippetString(` bmd_lineBreak() +\n${fragmentIndent}'$1'`);
              lineBreakAfterPlus.detail = '[sql] line break helper';
              lineBreakAfterPlus.documentation = new vscode.MarkdownString('Use SQL text style concatenation with `bmd_lineBreak()` and keep current indentation.');
              lineBreakAfterPlus.sortText = '00_sql_01_plus_linebreak';

              const closeOwnLine = new vscode.CompletionItem("sql close on own line", vscode.CompletionItemKind.Snippet);
              closeOwnLine.insertText = new vscode.SnippetString(`\n${baseIndent}');`);
              closeOwnLine.detail = "[sql] close string";
              closeOwnLine.documentation = new vscode.MarkdownString("Close SQL text on its own line as `');`.");
              closeOwnLine.sortText = '00_sql_02_close_ownline';

              const closeSameLine = new vscode.CompletionItem('sql close same line', vscode.CompletionItemKind.Snippet);
              closeSameLine.insertText = new vscode.SnippetString("');");
              closeSameLine.detail = '[sql] close string';
              closeSameLine.documentation = new vscode.MarkdownString("Close SQL text directly at end of current SQL fragment.");
              closeSameLine.sortText = '00_sql_03_close_sameline';

              return [lineBreakAfterPlus, closeOwnLine, closeSameLine];
            }

            const wordMatch = textBefore.match(/([A-Za-z_][A-Za-z0-9_]*)$/);
            if (!wordMatch) {
              return undefined;
            }

            const typedPrefix = wordMatch[1].toLowerCase();

            const userRoutineItems = buildUserRoutineCompletionItems(document, typedPrefix);
            if (userRoutineItems.length > 0) {
              return userRoutineItems;
            }

            if (typedPrefix.startsWith('setparam') || typedPrefix.startsWith('params')) {
              const paramsItem = buildMissingSetParamCompletion(document, position);
              if (paramsItem) {
                return [paramsItem];
              }
            }

            if (isInsideSetSqlTextBlock(document, position) && typedPrefix.startsWith('bmd')) {
              const { fragmentIndent } = getSetSqlTextIndentation(document, position);
              const lineBreakItem = new vscode.CompletionItem('bmd_lineBreak sql', vscode.CompletionItemKind.Snippet);
              lineBreakItem.insertText = new vscode.SnippetString(`bmd_lineBreak() +\n${fragmentIndent}'$1'`);
              lineBreakItem.detail = '[sql] line break helper';
              lineBreakItem.documentation = new vscode.MarkdownString('Insert SQL style line break concatenation inside `setSQLText(...)` and keep current indentation.');
              lineBreakItem.sortText = '00_sql_linebreak';
              return [lineBreakItem];
            }

            if (typedPrefix.startsWith('log') || 'log'.startsWith(typedPrefix)) {
              if (!hasProcedureLog(document)) {
                const logItem = new vscode.CompletionItem('log', vscode.CompletionItemKind.Snippet);
                logItem.insertText = new vscode.SnippetString("BMD_WRITETOLOGFILE(cMakroLog,'$1');");
                logItem.detail = '[log] direct logfile write';
                logItem.documentation = new vscode.MarkdownString('Suggested only when no `procedure log(...)` exists in this macro.');
                logItem.sortText = '00_log_fallback';
                return [logItem];
              }
              return undefined;
            }

            // Dedicated query patterns requested for `lquery` trigger.
            if (typedPrefix.startsWith('lquery') || 'lquery'.startsWith(typedPrefix)) {
              return filterCompletionsByPrefix(lQuerySnippetItems, typedPrefix);
            }

            if (typedPrefix.startsWith('lmodel') || 'lmodel'.startsWith(typedPrefix)) {
              return filterCompletionsByPrefix(lModelSnippetItems, typedPrefix);
            }

            if (typedPrefix.startsWith('lcsvmgr') || 'lcsvmgr'.startsWith(typedPrefix)) {
              return filterCompletionsByPrefix(lCsvMgrSnippetItems, typedPrefix);
            }

            if (typedPrefix.startsWith('lwwsppsmodel') || 'lwwsppsmodel'.startsWith(typedPrefix)) {
              return filterCompletionsByPrefix(lWwsPpsModelSnippetItems, typedPrefix);
            }

            // Only offer alias completions when triggered by '_' (BMD_ functions)
            // or when the typed word ends with a known alias suffix.
            // This avoids firing the expensive alias list on every letter.
            const endsWithAliasSuffix = /(?:mgr|file|list|query|model|reader|call|val|tool)$/i.test(typedPrefix);
            const isBmdTrigger = typedPrefix.startsWith('bmd_');

            if (!endsWithAliasSuffix && !isBmdTrigger) {
              // Not a recognised trigger context — suppress completions entirely
              // so VS Code's built-in word suggestions can work undisturbed.
              return undefined;
            }

            const strictAliases = filterAliasesByPrefix(constructorAliasItems, typedPrefix);

            // When user is writing an assignment, prioritize constructor snippets.
            if (/\b[A-Za-z_][A-Za-z0-9_]*\s*:=\s*[A-Za-z0-9_]*$/i.test(textBefore)) {
              return [...strictAliases, ...filterCompletionsByPrefix(assignmentCompletionItems, typedPrefix)];
            }

            if (isBmdTrigger) {
              return filterCompletionsByPrefix(bmdCompletionItems, typedPrefix);
            }

            // For alias suffix contexts, only return alias snippets.
            return strictAliases;
          }
        },
        '.',
        '_',
        '+',
        '(',
        "'"
      )
    : { dispose() {} };


  // ────────────────────────────────────────────────────────────────────────
  // Document formatter: right-click → Format Document
  const formatter = vscode.languages.registerDocumentFormattingEditProvider(
    { language: 'bmdmacro' },
    {
      provideDocumentFormattingEdits(document) {
        const fullText = document.getText();
        const formattedText = formatDocument(fullText);

        if (fullText === formattedText) {
          return []; // No changes
        }

        // Replace entire document
        const lastLine = document.lineCount - 1;
        const lastChar = document.lineAt(lastLine).text.length;
        const fullRange = new vscode.Range(
          new vscode.Position(0, 0),
          new vscode.Position(lastLine, lastChar)
        );

        return [vscode.TextEdit.replace(fullRange, formattedText)];
      }
    }
  );

  const uploadMacroCommand = vscode.commands.registerCommand(
    'bmdmacro.uploadMacroToFormula',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'bmdmacro') {
        vscode.window.showErrorMessage('Open a BMD macro file before uploading.');
        return;
      }

      const macroText = editor.document.getText();
      if (!macroText.trim()) {
        vscode.window.showErrorMessage('The active macro is empty.');
        return;
      }

      const runtimeConfig = getRuntimeConfig();

      const confirmation = await vscode.window.showWarningMessage(
        `Upload current macro to ${runtimeConfig.sqlServer}:${runtimeConfig.sqlDatabase} (FOX_FORMELNR ${runtimeConfig.sqlFormulaId})?`,
        { modal: true },
        'Upload'
      );

      if (confirmation !== 'Upload') {
        return;
      }

      try {
        const rows = await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: 'Uploading macro to BMD database',
            cancellable: false
          },
          () => uploadMacroToFormula(macroText)
        );

        const affectedRows = parseAffectedRows(rows);
        // if (affectedRows >= 1) {
        //   await vscode.window.withProgress(
        //     {
        //       location: vscode.ProgressLocation.Notification,
        //       title: 'Executing BMD macro function',
        //       cancellable: false
        //     },
        //       () => executeMacroForFormula(runtimeConfig.sqlFormulaId)
        //   );
        // }

        vscode.window.showInformationMessage(
            `Macro uploaded to FOX_FORMELNR ${runtimeConfig.sqlFormulaId}. Affected rows: ${affectedRows}`
        );
      }
      catch (error) {
        const message = error && error.message ? error.message : String(error);
        vscode.window.showErrorMessage(`BMD macro upload failed: ${message}`);
      }
    }
  );

  const insertLogForSelectionCommand = vscode.commands.registerCommand(
    'bmdmacro.insertLogForSelection',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'bmdmacro') {
        vscode.window.showErrorMessage('Open a BMD macro file before inserting logs.');
        return;
      }

      const document = editor.document;
      const useLogProcedure = hasProcedureLog(document);
      const selections = [...editor.selections].sort((a, b) => b.end.line - a.end.line);
      const edit = new vscode.WorkspaceEdit();
      let insertedGroups = 0;

      for (const selection of selections) {
        const startLine = Math.min(selection.start.line, selection.end.line);
        const endLine = Math.max(selection.start.line, selection.end.line);
        const variables = extractAssignedVariables(document, startLine, endLine);
        if (variables.length === 0) {
          continue;
        }

        const block = `${buildLogStatement(variables, useLogProcedure)}\n`;
        edit.insert(document.uri, new vscode.Position(endLine + 1, 0), block);
        insertedGroups++;
      }

      if (insertedGroups === 0) {
        vscode.window.showInformationMessage('No assignments found in the selected lines.');
        return;
      }

      await vscode.workspace.applyEdit(edit);
    }
  );

  const debugMacroCommand = vscode.commands.registerCommand(
    'bmdmacro.debugMacro',
    () => macroDebugger.run(context, {
      executeSqlQuery: executeDebugSql,
      sqlConfig: getDebugSqlConfig()
    })
  );

  const openSettingsCommand = vscode.commands.registerCommand(
    'bmdmacro.openSettingsUi',
    () => openSettingsWebview(context)
  );

  // Hover provider for showing procedure/function signatures
  const hoverProvider = vscode.languages.registerHoverProvider(
    { language: 'bmdmacro' },
    {
      provideHover(document, position) {
        const procName = findProcedureAtPosition(document, position);
        if (!procName) {
          return undefined;
        }

        const definitions = extractProcedureDefinitions(document);
        const def = definitions.get(procName.toLowerCase());
        if (!def) {
          return undefined;
        }

        const signature = `${def.name}(${def.params.join(', ')})`;
        return new vscode.Hover(signature);
      }
    }
  );

  // Signature help provider for showing parameters while typing
  const signatureHelpProvider = vscode.languages.registerSignatureHelpProvider(
    { language: 'bmdmacro' },
    {
      provideSignatureHelp(document, position) {
        const line = document.lineAt(position.line).text;
        const textBefore = line.substring(0, position.character);
        
        // Look for an open paren
        let parenPos = -1;
        let parenCount = 0;
        for (let i = textBefore.length - 1; i >= 0; i--) {
          if (textBefore[i] === ')') {
            parenCount++;
          } else if (textBefore[i] === '(') {
            if (parenCount === 0) {
              parenPos = i;
              break;
            }
            parenCount--;
          }
        }

        if (parenPos === -1) {
          return undefined;
        }

        // Extract the procedure/function name before the paren
        let start = parenPos - 1;
        while (start >= 0 && /\s/.test(line[start])) {
          start--;
        }
        let nameEnd = start + 1;
        while (start >= 0 && /[A-Za-z0-9_]/.test(line[start])) {
          start--;
        }
        start++;

        if (start >= nameEnd) {
          return undefined;
        }

        const procName = line.substring(start, nameEnd);
        const definitions = extractProcedureDefinitions(document);
        const def = definitions.get(procName.toLowerCase());
        if (!def) {
          return undefined;
        }

        const signatureInfo = new vscode.SignatureInformation(
          `${def.name}(${def.params.join(', ')})`,
          `Procedure: ${def.name}`
        );

        // Add parameter information
        signatureInfo.parameters = def.params.map(param => 
          new vscode.ParameterInformation(param)
        );

        // Determine active parameter based on comma count
        let activeParam = 0;
        let commaCount = 0;
        for (let i = parenPos + 1; i < position.character; i++) {
          if (line[i] === ',') {
            commaCount++;
          }
        }
        activeParam = commaCount;

        const sigHelp = new vscode.SignatureHelp();
        sigHelp.signatures = [signatureInfo];
        sigHelp.activeSignature = 0;
        sigHelp.activeParameter = activeParam;

        return sigHelp;
      }
    },
    '(',
    ','
  );

  context.subscriptions.push(provider);
  context.subscriptions.push(hoverProvider);
  context.subscriptions.push(signatureHelpProvider);
  context.subscriptions.push(uploadMacroCommand);
  context.subscriptions.push(insertLogForSelectionCommand);
  context.subscriptions.push(debugMacroCommand);
  context.subscriptions.push(openSettingsCommand);
  context.subscriptions.push(formatter);
  context.subscriptions.push(diagnosticCollection);

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(doc => {
      ensureMandatoryHeaderForNewMacro(doc);
      if (ENABLE_DIAGNOSTICS && isMacroDocument(doc)) {
        requestValidation(doc, diagnosticCollection);
      }
    }),
    vscode.workspace.onDidSaveTextDocument(doc => {
      if (ENABLE_DIAGNOSTICS && isMacroDocument(doc)) {
        requestValidation(doc, diagnosticCollection);
      }
    }),
    // Live validation while typing — only active when validateOnSave is false.
    ...(!ENABLE_DIAGNOSTICS ? [] : [
      vscode.workspace.onDidChangeTextDocument(event => {
        if (isMacroDocument(event.document) && !getRuntimeConfig().validateOnSave) {
          scheduleValidation(event.document, diagnosticCollection);
        }
      })
    ]),
    ...(!ENABLE_COMPLETION_PROVIDER ? [] : [
      vscode.workspace.onDidChangeTextDocument(event => {
        if (!isMacroDocument(event.document)) {
          return;
        }

        if (shouldRetriggerModelNameSuggest(event)) {
          vscode.commands.executeCommand('editor.action.triggerSuggest');
        }
      })
    ]),
    vscode.workspace.onDidCloseTextDocument(doc => {
      clearDocumentState(doc);
      diagnosticCollection.delete(doc.uri);
    })
  );
};

exports.deactivate = function () {};