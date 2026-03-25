'use strict';

/**
 * macro-debugger.js
 * Static analysis + interactive simulation panel for BMD macro files.
 * Registered in extension.js as command 'bmdmacro.debugMacro'.
 */

const vscode = require('vscode');

// ─── Static analysis ─────────────────────────────────────────────────────────

/**
 * Strip single-quoted strings, line comments (//), and block comments ({ })
 * while preserving newlines so line numbers stay correct.
 */
function stripStringsAndComments(text) {
  const out = Array.from(text);
  const len = out.length;
  let i = 0;
  let inString = false;
  let inLC = false;
  let inBC = false;

  while (i < len) {
    const ch = out[i];
    if (inLC) {
      if (ch === '\n') { inLC = false; }
      else { out[i] = ' '; }
      i++; continue;
    }
    if (inBC) {
      if (ch === '}') { inBC = false; out[i] = ' '; }
      else if (ch !== '\n') { out[i] = ' '; }
      i++; continue;
    }
    if (inString) {
      if (ch === "'") {
        if (i + 1 < len && out[i + 1] === "'") { out[i] = ' '; out[i + 1] = ' '; i += 2; }
        else { inString = false; out[i] = ' '; i++; }
      } else { out[i] = ' '; i++; }
      continue;
    }
    if (ch === '/' && i + 1 < len && out[i + 1] === '/') { inLC = true; out[i] = ' '; out[i + 1] = ' '; i += 2; continue; }
    if (ch === '{') { inBC = true; out[i] = ' '; i++; continue; }
    if (ch === "'") { inString = true; out[i] = ' '; i++; continue; }
    i++;
  }
  return out.join('');
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extract all `const name = 'value';` entries from the raw text.
 * Returns Map<lowerName, value>.
 */
function extractConstants(rawText) {
  const consts = new Map();
  // Match:  name = 'literal string value'
  const re = /\b([A-Za-z_][A-Za-z0-9_]*)\s*=\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(rawText)) !== null) {
    consts.set(m[1].toLowerCase(), m[2]);
  }
  // Also match numeric / boolean const values (unquoted)
  const reNum = /\b([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(true|false|\d[\d.]*)\b/gi;
  while ((m = reNum.exec(rawText)) !== null) {
    const key = m[1].toLowerCase();
    if (!consts.has(key)) {
      consts.set(key, m[2]);
    }
  }
  return consts;
}

/**
 * Identify BMD runtime variables: FIELD_* identifiers and BMD_USERNAME().
 * Returns array of { name, kind }
 *   kind: 'field_read' | 'field_write' | 'bmd_function'
 */
function extractRuntimeInputs(rawText, consts) {
  const found = new Map(); // name -> entry

  // FIELD_* identifiers
  const fieldRe = /\b(FIELD_[A-Z_]+)\b/g;
  let m;
  while ((m = fieldRe.exec(rawText)) !== null) {
    const name = m[0];
    if (!found.has(name)) {
      const isWrite = /FIELD_OUTPUT_VALUE\s*:=/.test(rawText) && name === 'FIELD_OUTPUT_VALUE';
      found.set(name, { name, kind: isWrite ? 'field_write' : 'field_read' });
    }
  }

  // BMD_USERNAME()
  if (/\bBMD_USERNAME\s*\(\s*\)/i.test(rawText)) {
    // Collect all const values that look like user IDs (short uppercase strings)
    const userIdConsts = [];
    for (const [k, v] of consts.entries()) {
      if (k.startsWith('cuserid') || k.includes('userid')) {
        userIdConsts.push({ constName: k, value: v });
      }
    }
    found.set('BMD_USERNAME()', { name: 'BMD_USERNAME()', kind: 'bmd_function', userIdConsts });
  }

  // BMD_ASKVALUELIST / BMD_ASKMULTIPLEVALUES / BMD_ASKNUMBER
  const askRe = /\b(BMD_ASKVALUELIST|BMD_ASKMULTIPLEVALUES|BMD_ASKNUMBER)\b/gi;
  while ((m = askRe.exec(rawText)) !== null) {
    const name = m[1].toUpperCase();
    if (!found.has(name)) {
      found.set(name, { name, kind: 'bmd_ask' });
    }
  }

  return Array.from(found.values());
}

/**
 * Parse the top-level if/else structure to enumerate distinct execution paths.
 * Returns array of path descriptors: { id, label, conditions: [{expr, forceTrue}] }
 *
 * Strategy: find every `if (...)` and `else` at the main body level (depth 0 relative
 * to the start of MAIN, i.e. after procedure/function definitions).
 */
function enumeratePaths(rawText) {
  // We work on the raw text with strings/comments stripped for bracket counting,
  // but keep original for expression extraction.
  const clean = stripStringsAndComments(rawText);

  // Find the main body start: after the last procedure/function end
  // Simple heuristic: look for the last `end;` that closes the last procedure block,
  // then everything after is MAIN. If no procedures, MAIN starts at offset 0.
  let mainStart = 0;
  const procRe = /\b(?:procedure|function)\s+\w+[^;]*\bbegin\b/gi;
  let pm;
  while ((pm = procRe.exec(clean)) !== null) {
    // find the matching end for this begin
    let depth = 0;
    let j = pm.index;
    const limit = clean.length;
    while (j < limit) {
      const tok = clean.slice(j).match(/^.*?\b(begin|case|end)\b/i);
      if (!tok) break;
      const word = tok[1].toLowerCase();
      j += tok[0].length;
      if (word === 'begin' || word === 'case') depth++;
      else if (word === 'end') {
        depth--;
        if (depth === 0) { mainStart = j; break; }
      }
    }
  }

  const mainClean = clean.slice(mainStart);
  const mainRaw  = rawText.slice(mainStart);

  // Collect top-level if-conditions
  const paths = [];
  const re = /\bif\s*\(([^)]*(?:\([^)]*\)[^)]*)*)\)\s*then\b/gi;
  let m;
  while ((m = re.exec(mainClean)) !== null) {
    const expr = mainRaw.slice(m.index, m.index + m[0].length)
      .replace(/\s+/g, ' ').trim();
    // Check if there's a matching else
    const blockAfter = mainClean.slice(m.index + m[0].length);
    const hasElse = /\belse\b/i.test(blockAfter.slice(0, 2000));
    paths.push({ expr, hasElse });
  }

  return paths;
}

function extractSqlPlaceholderNames(sqlText) {
  const names = [];
  const seen = new Set();
  const re = /:([A-Za-z_][A-Za-z0-9_]*)/g;
  let match;
  while ((match = re.exec(sqlText)) !== null) {
    const actual = match[1];
    const key = actual.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      names.push(actual);
    }
  }
  return names;
}

function suggestSqlParamValue(rawExpr, consts) {
  const expr = (rawExpr || '').trim();
  if (!expr) {
    return '';
  }

  const stringMatch = expr.match(/^'((?:''|[^'])*)'$/);
  if (stringMatch) {
    return stringMatch[1].replace(/''/g, "'");
  }

  const lower = expr.toLowerCase();
  if (consts.has(lower)) {
    return consts.get(lower);
  }

  return expr;
}

function extractSqlBlocks(rawText) {
  const lines = rawText.split('\n');
  const consts = extractConstants(rawText);
  const blocks = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const match = line.match(/\b([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*setSQLText\s*\(/i);
    if (!match) {
      continue;
    }

    const receiver = match[1];
    const sqlLines = [line];
    let endLine = lineIndex;
    for (let i = lineIndex + 1; i < Math.min(lines.length, lineIndex + 500); i++) {
      sqlLines.push(lines[i]);
      endLine = i;
      if (lines[i].includes(');')) {
        break;
      }
    }

    const blockText = sqlLines.join('\n');
    const fragmentRe = /'((?:''|[^'])*)'/g;
    const fragments = [];
    let fragmentMatch;
    while ((fragmentMatch = fragmentRe.exec(blockText)) !== null) {
      fragments.push(fragmentMatch[1].replace(/''/g, "'"));
    }

    const sqlText = fragments.join('');
    const keywordMatch = sqlText.match(/^\s*(select|update|insert|delete|with)\b/i);
    const params = [];
    const paramNamesSeen = new Set();

    for (let i = endLine + 1; i < Math.min(lines.length, endLine + 80); i++) {
      const nextLine = lines[i];
      const paramMatch = nextLine.match(new RegExp(`\\b${receiver}\\s*\\.\\s*setParamAsString\\s*\\(\\s*'([^']+)'\\s*,\\s*(.+?)\\s*\\)\\s*;?`, 'i'));
      if (paramMatch) {
        const name = paramMatch[1];
        const key = name.toLowerCase();
        if (!paramNamesSeen.has(key)) {
          paramNamesSeen.add(key);
          params.push({
            name,
            sourceExpr: paramMatch[2].trim(),
            defaultValue: suggestSqlParamValue(paramMatch[2], consts)
          });
        }
        continue;
      }

      const otherReceiverMethod = nextLine.match(/\b([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(/i);
      if (!otherReceiverMethod) {
        continue;
      }

      if (otherReceiverMethod[1].toLowerCase() !== receiver.toLowerCase()) {
        continue;
      }

      const methodName = otherReceiverMethod[2].toLowerCase();
      if (methodName !== 'setparamasstring') {
        break;
      }
    }

    for (const placeholderName of extractSqlPlaceholderNames(sqlText)) {
      const key = placeholderName.toLowerCase();
      if (!paramNamesSeen.has(key)) {
        paramNamesSeen.add(key);
        params.push({
          name: placeholderName,
          sourceExpr: '',
          defaultValue: ''
        });
      }
    }

    blocks.push({
      id: String(blocks.length),
      receiver,
      startLine: lineIndex + 1,
      endLine: endLine + 1,
      sqlText,
      kind: keywordMatch ? keywordMatch[1].toUpperCase() : 'SQL',
      params
    });

    lineIndex = endLine;
  }

  return blocks;
}

/**
 * Analyse a macro document and return a report object:
 * { consts, runtimeInputs, paths, sqlBlocks }
 */
function analyseDocument(document) {
  const rawText = document.getText();
  const consts = extractConstants(rawText);
  const runtimeInputs = extractRuntimeInputs(rawText, consts);
  const paths = enumeratePaths(rawText);
  const sqlBlocks = extractSqlBlocks(rawText);
  return { rawText, consts, runtimeInputs, paths, sqlBlocks };
}

function getMainStartOffset(rawText) {
  const clean = stripStringsAndComments(rawText);
  let mainStart = 0;
  const procRe = /\b(?:procedure|function)\s+\w+[^;]*\bbegin\b/gi;
  let pm;
  while ((pm = procRe.exec(clean)) !== null) {
    let depth = 0;
    let j = pm.index;
    const limit = clean.length;
    while (j < limit) {
      const tok = clean.slice(j).match(/^.*?\b(begin|case|end)\b/i);
      if (!tok) {
        break;
      }
      const word = tok[1].toLowerCase();
      j += tok[0].length;
      if (word === 'begin' || word === 'case') {
        depth++;
      } else if (word === 'end') {
        depth--;
        if (depth === 0) {
          mainStart = j;
          break;
        }
      }
    }
  }
  return mainStart;
}

function getLineOffsets(text) {
  const offsets = [0];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      offsets.push(i + 1);
    }
  }
  return offsets;
}

function offsetToLine(offset, lineOffsets) {
  for (let index = lineOffsets.length - 1; index >= 0; index--) {
    if (offset >= lineOffsets[index]) {
      return index + 1;
    }
  }
  return 1;
}

function findMatchingBlockEnd(cleanText, beginOffset) {
  const tokenRe = /\b(begin|case|end)\b/gi;
  tokenRe.lastIndex = beginOffset;
  let depth = 0;
  let match;
  while ((match = tokenRe.exec(cleanText)) !== null) {
    const token = match[1].toLowerCase();
    if (token === 'begin' || token === 'case') {
      depth++;
      continue;
    }
    depth--;
    if (depth === 0) {
      return tokenRe.lastIndex;
    }
  }
  return cleanText.length;
}

function extractCallableBlocks(rawText) {
  const clean = stripStringsAndComments(rawText);
  const lineOffsets = getLineOffsets(rawText);
  const defs = [];
  const defRe = /\b(procedure|function)\s+(\w+)\s*\(([^)]*)\)/gi;
  let match;
  while ((match = defRe.exec(clean)) !== null) {
    const kind = match[1].toLowerCase();
    const name = match[2];
    const params = match[3]
      .split(',')
      .map(value => value.trim())
      .filter(value => /^[A-Za-z_][A-Za-z0-9_]*$/.test(value));

    const beginRe = /\bbegin\b/gi;
    beginRe.lastIndex = defRe.lastIndex;
    const beginMatch = beginRe.exec(clean);
    if (!beginMatch) {
      continue;
    }

    const bodyStartOffset = beginMatch.index;
    const endOffset = findMatchingBlockEnd(clean, bodyStartOffset);
    defs.push({
      kind,
      name,
      params,
      startOffset: match.index,
      bodyStartOffset,
      endOffset,
      startLine: offsetToLine(match.index, lineOffsets),
      endLine: offsetToLine(endOffset, lineOffsets),
      text: rawText.slice(match.index, endOffset)
    });
  }
  return defs;
}

function splitTopLevel(text, delimiter) {
  const parts = [];
  let depth = 0;
  let inString = false;
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (ch === "'" && text[i + 1] === "'") {
        i++;
      } else if (ch === "'") {
        inString = false;
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
      continue;
    }
    if (ch === delimiter && depth === 0) {
      parts.push(text.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(text.slice(start));
  return parts;
}

function splitArguments(text) {
  return splitTopLevel(text, ',').map(part => part.trim()).filter(Boolean);
}

function stripOuterParens(text) {
  let current = text.trim();
  while (current.startsWith('(') && current.endsWith(')')) {
    const inner = current.slice(1, -1).trim();
    if (!inner) {
      break;
    }
    let depth = 0;
    let valid = true;
    for (let i = 0; i < current.length; i++) {
      const ch = current[i];
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (depth === 0 && i < current.length - 1) {
        valid = false;
        break;
      }
    }
    if (!valid) {
      break;
    }
    current = inner;
  }
  return current;
}

function parseDateValue(value) {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  const dmy = trimmed.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (dmy) {
    const date = new Date(Date.UTC(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1])));
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const iso = new Date(trimmed);
  return Number.isNaN(iso.getTime()) ? null : iso;
}

function formatDateValue(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return value == null ? '' : String(value);
  }
  const dd = String(value.getUTCDate()).padStart(2, '0');
  const mm = String(value.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = value.getUTCFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function addDays(dateValue, amount) {
  const date = parseDateValue(dateValue);
  if (!date) {
    return dateValue;
  }
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + Number(amount || 0));
  return next;
}

function diffDays(leftValue, rightValue) {
  const left = parseDateValue(leftValue);
  const right = parseDateValue(rightValue);
  if (!left || !right) {
    return 0;
  }
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((left.getTime() - right.getTime()) / msPerDay);
}

function nextWorkDayValue(value) {
  let date = parseDateValue(value);
  if (!date) {
    return value;
  }
  while (true) {
    const day = date.getUTCDay();
    if (day !== 0 && day !== 6) {
      return date;
    }
    date = addDays(date, 1);
  }
}

function stringifyValue(value) {
  if (value instanceof Date) {
    return formatDateValue(value);
  }
  if (value == null) {
    return '';
  }
  return String(value);
}

function getDatasetRow(env) {
  const directRow = env.get('__query_row');
  if (directRow && typeof directRow === 'object') {
    return directRow;
  }

  const dataset = env.get('__query_dataset');
  if (!Array.isArray(dataset) || dataset.length === 0) {
    return null;
  }

  const rowIndex = Number(env.get('__query_row_index') || 0);
  if (rowIndex >= 0 && rowIndex < dataset.length) {
    return dataset[rowIndex];
  }
  return dataset[0];
}

function getRowFieldValue(row, fieldName) {
  if (!row || typeof row !== 'object') {
    return '';
  }

  if (Object.prototype.hasOwnProperty.call(row, fieldName)) {
    return row[fieldName];
  }

  const lowerField = String(fieldName).toLowerCase();
  for (const key of Object.keys(row)) {
    if (key.toLowerCase() === lowerField) {
      return row[key];
    }
  }

  return '';
}

function evaluateMacroExpression(expr, env, entryReceiver) {
  const text = stripOuterParens((expr || '').trim());
  if (!text) {
    return '';
  }

  const stringMatch = text.match(/^'((?:''|[^'])*)'$/);
  if (stringMatch) {
    return stringMatch[1].replace(/''/g, "'");
  }

  if (/^-?\d+(\.\d+)?$/.test(text)) {
    return Number(text);
  }

  const multiplyParts = splitTopLevel(text, '*').map(part => part.trim()).filter(Boolean);
  if (multiplyParts.length > 1) {
    return multiplyParts.reduce((acc, part) => Number(acc) * Number(evaluateMacroExpression(part, env, entryReceiver)), 1);
  }

  const functionMatch = text.match(/^([A-Za-z_][A-Za-z0-9_.]*)\s*\((.*)\)$/);
  if (functionMatch) {
    const functionName = functionMatch[1].toLowerCase();
    const args = splitArguments(functionMatch[2]).map(arg => evaluateMacroExpression(arg, env, entryReceiver));
    if (functionName === 'bmd_datediff') {
      return diffDays(args[0], args[1]);
    }
    if (functionName === 'bmd_incday' || functionName === 'bmd_datesum') {
      return formatDateValue(addDays(args[0], Number(args[1] || 0)));
    }
    if (functionName === 'getnextworkday') {
      return formatDateValue(nextWorkDayValue(args[0]));
    }
    if (functionName === 'bmd_concat') {
      return stringifyValue(args[0]) + stringifyValue(args[1]);
    }
    if (functionName === 'bmd_linebreak') {
      return '\n';
    }
    if (functionName.endsWith('.getasstring')) {
      const row = getDatasetRow(env);
      const column = stringifyValue(args[0]);
      return getRowFieldValue(row, column);
    }
  }

  const lower = text.toLowerCase();
  if (env.has(lower)) {
    return env.get(lower);
  }

  return text;
}

function detectEntrySqlBlock(report, rawText) {
  const mainStartOffset = getMainStartOffset(rawText);
  const mainText = rawText.slice(mainStartOffset);
  const procedures = extractCallableBlocks(rawText);
  const mainBlocks = report.sqlBlocks.filter(block => !procedures.some(proc => block.startLine >= proc.startLine && block.endLine <= proc.endLine));
  if (mainBlocks.length === 0) {
    return null;
  }

  return [...mainBlocks]
    .map(block => {
      let score = 0;
      if (block.kind === 'SELECT' || block.kind === 'WITH') score += 50;
      if (new RegExp(`\\b${escapeRegExp(block.receiver)}\\s*\\.\\s*open\\s*\\(`, 'i').test(mainText)) score += 50;
      if (new RegExp(`\\bif\\s*\\(\\s*not\\s+${escapeRegExp(block.receiver)}\\s*\\.\\s*eof\\s*\\(\\s*\\)`, 'i').test(mainText)) score += 40;
      if (new RegExp(`\\bwhile\\s*\\(\\s*not\\s+${escapeRegExp(block.receiver)}\\s*\\.\\s*eof\\s*\\(\\s*\\)`, 'i').test(mainText)) score += 30;
      return { block, score };
    })
    .sort((left, right) => right.score - left.score || left.block.startLine - right.block.startLine)[0].block;
}

function extractWhileLoopBody(rawText, receiver) {
  const clean = stripStringsAndComments(rawText);
  const loopRe = new RegExp(`\\bwhile\\s*(?:\\(\\s*)?not\\s+${escapeRegExp(receiver)}\\s*\\.\\s*eof\\s*\\(\\s*\\)\\s*(?:\\)\\s*)?do\\s*begin`, 'i');
  const loopMatch = loopRe.exec(clean);
  if (!loopMatch) {
    return null;
  }

  const beginOffset = loopMatch.index + loopMatch[0].toLowerCase().lastIndexOf('begin');
  const endOffset = findMatchingBlockEnd(clean, beginOffset);
  return rawText.slice(beginOffset + 5, endOffset);
}

function detectChildSqlProcedures(report, rawText) {
  const mainStartOffset = getMainStartOffset(rawText);
  const mainText = rawText.slice(mainStartOffset);
  const procedures = extractCallableBlocks(rawText);
  return procedures.map(proc => {
    const procSqlBlocks = report.sqlBlocks.filter(block => block.startLine >= proc.startLine && block.endLine <= proc.endLine);
    if (procSqlBlocks.length === 0) {
      return null;
    }

    const sqlBlock = procSqlBlocks.find(block => new RegExp(`\\b${escapeRegExp(block.receiver)}\\s*\\.\\s*execSql\\s*\\(`, 'i').test(proc.text)) || procSqlBlocks[0];
    const callRe = new RegExp(`\\b${escapeRegExp(proc.name)}\\s*\\(([^)]*)\\)`, 'gi');
    const calls = [];
    let match;
    while ((match = callRe.exec(mainText)) !== null) {
      calls.push({ argsText: match[1] });
    }
    if (calls.length === 0) {
      return null;
    }

    return {
      name: proc.name,
      params: proc.params,
      sqlBlock,
      calls
    };
  }).filter(Boolean);
}

async function executeMacroFlow(document, deps, entryParams = {}, maxRows = '') {
  if (typeof deps.executeSqlQuery !== 'function') {
    throw new Error('No SQL executor is configured.');
  }

  const rawText = document.getText();
  const report = analyseDocument(document);
  const entryBlock = detectEntrySqlBlock(report, rawText);
  if (!entryBlock) {
    throw new Error('No entry SQL query could be detected.');
  }

  const childProcedures = detectChildSqlProcedures(report, rawText);
  const loopBody = extractWhileLoopBody(rawText, entryBlock.receiver);
  const flowTrace = [];
  const requestedMaxRows = Math.max(0, Number(maxRows || 0));

  flowTrace.push({ kind: 'flow', text: `Entry query: ${entryBlock.kind} via ${entryBlock.receiver}` });
  const entryResult = await deps.executeSqlQuery(entryBlock.sqlText, entryParams || {});
  if (entryResult.kind !== 'resultSet') {
    throw new Error('The detected entry SQL did not return a result set.');
  }

  const allRows = Array.isArray(entryResult.rows) ? entryResult.rows : [];
  const rows = requestedMaxRows > 0 ? allRows.slice(0, requestedMaxRows) : allRows;
  flowTrace.push({ kind: 'flow', text: `Entry query returned ${allRows.length} row(s).` });
  if (requestedMaxRows > 0 && requestedMaxRows < allRows.length) {
    flowTrace.push({ kind: 'flow', text: `Processing limited to first ${rows.length} row(s).` });
  }

  const childExecutions = [];
  if (rows.length === 0) {
    flowTrace.push({ kind: 'flow', text: 'No rows returned, so no downstream SQL was executed.' });
    return { entryBlock, entryResult, childProcedures, flowTrace, childExecutions };
  }

  if (!loopBody) {
    flowTrace.push({ kind: 'flow', text: 'No while-loop bound to the entry query was detected.' });
    return { entryBlock, entryResult, childProcedures, flowTrace, childExecutions };
  }

  const loopLines = loopBody.split('\n');
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const env = new Map(report.consts);
    env.set('__query_dataset', rows);
    env.set('__query_row_index', rowIndex);
    env.set('__query_row', row);
    flowTrace.push({ kind: 'flow', text: `Processing row ${rowIndex + 1} of ${rows.length}.` });

    for (const rawLine of loopLines) {
      const line = rawLine.trim();
      if (!line) {
        continue;
      }

      const getAsStringMatch = line.match(new RegExp(`^([A-Za-z_][A-Za-z0-9_]*)\\s*:=\\s*${escapeRegExp(entryBlock.receiver)}\\s*\\.\\s*getAsString\\s*\\(\\s*'([^']+)'\\s*\\)`, 'i'));
      if (getAsStringMatch) {
        const variableName = getAsStringMatch[1].toLowerCase();
        const columnName = getAsStringMatch[2];
        env.set(variableName, getRowFieldValue(row, columnName));
        continue;
      }

      const logMatch = line.match(/^log\s*\((.+)\)\s*;?$/i);
      if (logMatch) {
        flowTrace.push({ kind: 'log', text: resolveExpression(logMatch[1], env) });
        continue;
      }

      const assignMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*(.+?)\s*;?$/i);
      if (assignMatch) {
        env.set(assignMatch[1].toLowerCase(), evaluateMacroExpression(assignMatch[2], env, entryBlock.receiver));
        continue;
      }

      for (const childProcedure of childProcedures) {
        const callMatch = line.match(new RegExp(`^${escapeRegExp(childProcedure.name)}\\s*\\((.+)\\)`, 'i'));
        if (!callMatch) {
          continue;
        }

        const procEnv = new Map(env);
        const argExprs = splitArguments(callMatch[1]);
        childProcedure.params.forEach((paramName, index) => {
          procEnv.set(paramName.toLowerCase(), evaluateMacroExpression(argExprs[index] || '', env, entryBlock.receiver));
        });

        const sqlParams = {};
        for (const param of childProcedure.sqlBlock.params) {
          const resolved = param.sourceExpr
            ? evaluateMacroExpression(param.sourceExpr, procEnv, childProcedure.sqlBlock.receiver)
            : procEnv.get(param.name.toLowerCase());
          sqlParams[param.name] = stringifyValue(resolved);
        }

        flowTrace.push({ kind: 'sql', text: `${childProcedure.name} -> executing ${childProcedure.sqlBlock.kind}`, params: sqlParams });
        const sqlResult = await deps.executeSqlQuery(childProcedure.sqlBlock.sqlText, sqlParams);
        childExecutions.push({
          rowIndex,
          procedureName: childProcedure.name,
          sqlKind: childProcedure.sqlBlock.kind,
          params: sqlParams,
          result: sqlResult
        });
        if (sqlResult.kind === 'nonQuery') {
          flowTrace.push({ kind: 'flow', text: `${childProcedure.name} affected ${sqlResult.rowsAffected} row(s).` });
        }
      }
    }
  }

  return { entryBlock, entryResult, childProcedures, flowTrace, childExecutions };
}

// ─── Simulation ───────────────────────────────────────────────────────────────

/**
 * Given user-supplied values and a set of forced branch choices, walk the raw
 * macro text and produce a log trace.
 *
 * userValues: Map<lowerName, value>   (FIELD_OLD_VALUE, FIELD_INPUT_VALUE, bmd_username(), …)
 * branchForce: Map<ifIndex, 'true'|'false'>
 */
function simulate(rawText, userValues, branchForce, options = {}) {
  const trace = [];
  const consts  = extractConstants(rawText);

  // Merge: consts < userValues (user overrides const if needed)
  const env = new Map(consts);
  for (const [k, v] of userValues.entries()) {
    env.set(k.toLowerCase(), v);
  }

  const dataset = Array.isArray(options.queryDataset) ? options.queryDataset : [];
  if (dataset.length > 0) {
    env.set('__query_dataset', dataset);
    env.set('__query_row_index', 0);
    env.set('__query_row', dataset[0]);
  }

  // Helper: resolve a simple expression string to a value
  function resolve(expr) {
    const trimmed = expr.trim();
    // quoted string literal
    if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
      return trimmed.slice(1, -1);
    }
    // number
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return trimmed;
    // boolean
    if (trimmed.toLowerCase() === 'true') return 'true';
    if (trimmed.toLowerCase() === 'false') return 'false';
    // BMD_USERNAME()
    if (/^bmd_username\s*\(\s*\)$/i.test(trimmed)) {
      return env.get('bmd_username()') || env.get('bmd_username') || '?';
    }
    // bmd_concat(a, b) — concatenate
    const concatM = trimmed.match(/^bmd_concat\s*\((.+),\s*(.+)\)$/i);
    if (concatM) return resolve(concatM[1]) + resolve(concatM[2]);
    // bmd_lineBreak()
    if (/^bmd_linebreak\s*\(\s*\)$/i.test(trimmed)) return '\n';
    // plain identifier
    const lower = trimmed.toLowerCase();
    if (env.has(lower)) return env.get(lower);
    return `<${trimmed}>`;
  }

  // Evaluate a condition string to boolean (best-effort)
  function evalCondition(cond, ifIndex) {
    if (branchForce.has(ifIndex)) {
      return branchForce.get(ifIndex) === 'true';
    }
    const c = cond.trim();
    // a <> b
    const neqM = c.match(/^(.+?)\s*<>\s*(.+)$/);
    if (neqM) return resolve(neqM[1]) !== resolve(neqM[2]);
    // a = b
    const eqM = c.match(/^(.+?)\s*=\s*(.+)$/);
    if (eqM) return resolve(eqM[1]) === resolve(eqM[2]);
    // or-chain: (a = b) or (c = d) or ...
    if (/\bor\b/i.test(c)) {
      const parts = c.split(/\bor\b/i).map(p => p.trim().replace(/^\(|\)$/g, ''));
      return parts.some(p => evalCondition(p, ifIndex));
    }
    // and-chain
    if (/\band\b/i.test(c)) {
      const parts = c.split(/\band\b/i).map(p => p.trim().replace(/^\(|\)$/g, ''));
      return parts.every(p => evalCondition(p, ifIndex));
    }
    return null; // unknown
  }

  // Walk lines, interpreting log/bmd_showMessage/assignments/if-else
  const lines = rawText.split('\n');
  let depth = 0;          // block nesting
  let ifCount = 0;
  // Stack of { active: bool } for if/else branches
  const branchStack = [{ active: true }];

  function isActive() {
    return branchStack.every(b => b.active);
  }

  for (let li = 0; li < lines.length; li++) {
    const raw = lines[li];
    const clean = stripStringsAndComments(raw).toLowerCase();

    // Skip procedure/function definitions — only simulate MAIN
    // (simple: skip lines inside procedure/function bodies by tracking a flag)
    // We re-use depth for this; procedures end with standalone `end;`
    // For now we rely on the fact that log() calls inside procedures are
    // not guarded by MAIN conditions, so they won't produce confusing output.

    // Detect `if (cond) then`
    const ifM = raw.match(/\bif\s*\(([^)]*(?:\([^)]*\)[^)]*)*)\)\s*then\b/i);
    if (ifM && isActive()) {
      const cond = ifM[1];
      const result = evalCondition(cond, ifCount);
      ifCount++;
      branchStack.push({ active: result === null ? true : result, condResult: result, cond });
      continue;
    }

    // Detect `end else begin` or standalone `else`
    if (/\belse\b/i.test(clean)) {
      if (branchStack.length > 1) {
        const top = branchStack[branchStack.length - 1];
        // Flip: else is active when if was NOT active
        branchStack[branchStack.length - 1] = {
          active: top.condResult === null ? true : !top.condResult,
          condResult: top.condResult,
          cond: top.cond
        };
      }
      continue;
    }

    // Detect closing `end;` or `end.`
    if (/\bend\s*[;.]/.test(clean) && !/\bbmd_/.test(clean)) {
      if (branchStack.length > 1) {
        branchStack.pop();
      }
      continue;
    }

    if (!isActive()) continue;

    // log('...')  →  add to trace as [LOG]
    const logM = raw.match(/\blog\s*\((.+)\);?\s*$/i);
    if (logM) {
      const msg = resolveExpression(logM[1], env);
      trace.push({ kind: 'log', text: msg });
      continue;
    }

    // bmd_showMessage('...')  →  [SHOWMESSAGE]
    const showM = raw.match(/\bbmd_showmessage\s*\((.+)\)\s*;?\s*$/i);
    if (showM) {
      const msg = resolveExpression(showM[1], env);
      trace.push({ kind: 'showMessage', text: msg });
      continue;
    }

    // bmd_writeToLogFile(log, msg)
    const writeM = raw.match(/\bbmd_writetologfile\s*\(([^,]+),(.+)\)\s*;?\s*$/i);
    if (writeM) {
      const msg = resolveExpression(writeM[2].trim(), env);
      trace.push({ kind: 'log', text: msg });
      continue;
    }

    // FIELD_OUTPUT_VALUE := ...
    const fieldAssign = raw.match(/\b(FIELD_[A-Z_]+)\s*:=\s*(.+?)\s*;?\s*$/i);
    if (fieldAssign) {
      const val = resolveExpression(fieldAssign[2], env);
      trace.push({ kind: 'fieldSet', field: fieldAssign[1], value: val });
      env.set(fieldAssign[1].toLowerCase(), val);
      continue;
    }

    // lVar := bmd_username() or other assignments
    const assignM = raw.match(/\b([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*(.+?)\s*;?\s*$/i);
    if (assignM) {
      const val = resolveExpression(assignM[2], env);
      env.set(assignM[1].toLowerCase(), val);
      continue;
    }

    const nextM = raw.match(/\b([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*next\s*\(\s*\)\s*;?\s*$/i);
    if (nextM && dataset.length > 0) {
      const current = Number(env.get('__query_row_index') || 0);
      const nextIndex = Math.min(current + 1, dataset.length - 1);
      env.set('__query_row_index', nextIndex);
      env.set('__query_row', dataset[nextIndex]);
    }
  }

  return trace;
}

/**
 * Resolve a composite expression (string concatenation, function calls, identifiers)
 * against an env map. Returns a string.
 */
function resolveExpression(expr, env) {
  // Split on ' + ' while respecting parentheses
  const parts = splitOnPlus(expr);
  return parts.map(p => resolveAtom(p.trim(), env)).join('');
}

function splitOnPlus(expr) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === '+' && depth === 0) {
      parts.push(expr.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(expr.slice(start));
  return parts;
}

function resolveAtom(atom, env) {
  const t = atom.trim();
  if (!t) return '';
  if (t.startsWith("'") && t.endsWith("'")) return t.slice(1, -1);
  if (/^-?\d+(\.\d+)?$/.test(t)) return t;
  if (t.toLowerCase() === 'true') return 'true';
  if (t.toLowerCase() === 'false') return 'false';
  if (/^bmd_username\s*\(\s*\)$/i.test(t)) return env.get('bmd_username()') || env.get('bmd_username') || '?';
  if (/^bmd_linebreak\s*\(\s*\)$/i.test(t)) return '\n';
  if (/^bmd_getguid\s*\(\s*\)$/i.test(t)) return '<GUID>';
  const getAsStringM = t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*getAsString\s*\(\s*'([^']+)'\s*\)$/i);
  if (getAsStringM) {
    const row = getDatasetRow(env);
    return getRowFieldValue(row, getAsStringM[2]);
  }
  const concatM = t.match(/^bmd_concat\s*\((.+),\s*(.+)\)$/i);
  if (concatM) return resolveAtom(concatM[1].trim(), env) + resolveAtom(concatM[2].trim(), env);
  const lower = t.toLowerCase();
  if (env.has(lower)) return env.get(lower);
  return `<${t}>`;
}

// ─── Webview panel ────────────────────────────────────────────────────────────

let panel = null;

function run(context, deps = {}) {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== 'bmdmacro') {
    vscode.window.showErrorMessage('Open a BMD macro file before running the debugger.');
    return;
  }

  const document = editor.document;
  const report   = analyseDocument(document);

  if (panel) {
    panel.reveal(vscode.ViewColumn.Beside);
  } else {
    panel = vscode.window.createWebviewPanel(
      'bmdMacroDebugger',
      'BMD Macro Debugger',
      vscode.ViewColumn.Beside,
      { enableScripts: true }
    );
    panel.onDidDispose(() => { panel = null; });
  }

  panel.webview.html = buildWebviewHtml(report, document.fileName, deps.sqlConfig);

  // Handle messages from the webview (simulate button click)
  panel.webview.onDidReceiveMessage(async msg => {
    if (msg.command === 'simulate') {
      const userValues = new Map(Object.entries(msg.values || {}).map(([k, v]) => [k.toLowerCase(), v]));
      const branchForce = new Map(Object.entries(msg.branches || {}).map(([k, v]) => [Number(k), v]));
      const rawText = document.getText();
      const simulationOptions = {};

      if (typeof deps.executeSqlQuery === 'function') {
        try {
          const liveReport = analyseDocument(document);
          const entryBlock = detectEntrySqlBlock(liveReport, rawText);
          if (entryBlock) {
            const requestedMaxRows = Math.max(0, Number(msg.maxRows || 0));
            const entryResult = await deps.executeSqlQuery(entryBlock.sqlText, msg.entryParams || {});
            if (entryResult && entryResult.kind === 'resultSet') {
              const rows = Array.isArray(entryResult.rows) ? entryResult.rows : [];
              simulationOptions.queryDataset = requestedMaxRows > 0 ? rows.slice(0, requestedMaxRows) : rows;
            }
          }
        }
        catch (error) {
          simulationOptions.queryError = error && error.message ? error.message : String(error);
        }
      }

      const trace = simulate(rawText, userValues, branchForce, simulationOptions);
      if (simulationOptions.queryError) {
        trace.unshift({ kind: 'flow', text: `Simulate DB dataset failed: ${simulationOptions.queryError}` });
      }
      else if (Array.isArray(simulationOptions.queryDataset)) {
        trace.unshift({ kind: 'flow', text: `Simulate loaded ${simulationOptions.queryDataset.length} DB row(s).` });
      }

      panel.webview.postMessage({ command: 'traceResult', trace });
      return;
    }

    if (msg.command === 'runMacroFlow') {
      if (typeof deps.executeSqlQuery !== 'function') {
        panel.webview.postMessage({
          command: 'flowResult',
          ok: false,
          error: 'No SQL executor is configured.'
        });
        return;
      }

      try {
        const result = await executeMacroFlow(document, deps, msg.entryParams || {}, msg.maxRows || '');
        panel.webview.postMessage({
          command: 'flowResult',
          ok: true,
          result
        });
      }
      catch (error) {
        panel.webview.postMessage({
          command: 'flowResult',
          ok: false,
          error: error && error.message ? error.message : String(error)
        });
      }
    }
  });
}

// ─── HTML builder ─────────────────────────────────────────────────────────────

function buildWebviewHtml(report, fileName, sqlConfig) {
  const { rawText, consts, runtimeInputs, paths } = report;
  const shortName = fileName.split(/[\\/]/).pop();
  const entryBlock = rawText ? detectEntrySqlBlock(report, rawText) : null;
  const childProcedures = rawText ? detectChildSqlProcedures(report, rawText) : [];

  const inputRows = runtimeInputs.map(inp => {
    if (inp.kind === 'bmd_function' && inp.userIdConsts && inp.userIdConsts.length > 0) {
      const options = inp.userIdConsts
        .map((u, i) => `<option value="${esc(u.value)}"${i === 0 ? ' selected' : ''}>${esc(u.constName.toUpperCase())} = "${esc(u.value)}"</option>`)
        .join('');
      const customOption = `<option value="__custom__">Custom…</option>`;
      return `
        <tr>
          <td class="label">${esc(inp.name)}</td>
          <td>
            <select id="inp_${esc(inp.name)}" onchange="handleUserDropdown(this)">
              ${options}
              ${customOption}
            </select>
            <input type="text" id="inp_${esc(inp.name)}_custom" placeholder="custom user ID" style="display:none;margin-top:4px" />
          </td>
        </tr>`;
    }
    if (inp.name === 'FIELD_INPUT_VALUE') {
      return `
        <tr>
          <td class="label">${esc(inp.name)}</td>
          <td><input type="text" id="inp_${esc(inp.name)}" value="NEW_VALUE" /></td>
        </tr>`;
    }
    if (inp.name === 'FIELD_OLD_VALUE') {
      return `
        <tr>
          <td class="label">${esc(inp.name)}</td>
          <td><input type="text" id="inp_${esc(inp.name)}" value="" /></td>
        </tr>`;
    }
    if (inp.kind === 'field_write') {
      return `<tr><td class="label">${esc(inp.name)}</td><td class="note">write-back (set by macro)</td></tr>`;
    }
    return `
      <tr>
        <td class="label">${esc(inp.name)}</td>
        <td><input type="text" id="inp_${esc(inp.name)}" value="" /></td>
      </tr>`;
  }).join('');

  const branchRows = paths.map((p, i) => {
    const label = p.expr.length > 80 ? p.expr.slice(0, 77) + '…' : p.expr;
    if (!p.hasElse) {
      return `
        <tr>
          <td class="label">if #${i + 1}</td>
          <td class="code" title="${esc(p.expr)}">${esc(label)}</td>
          <td>
            <select id="branch_${i}">
              <option value="true" selected>Force TRUE (enter block)</option>
              <option value="auto">Auto (evaluate)</option>
              <option value="false">Force FALSE (skip)</option>
            </select>
          </td>
        </tr>`;
    }
    return `
      <tr>
        <td class="label">if #${i + 1}</td>
        <td class="code" title="${esc(p.expr)}">${esc(label)}</td>
        <td>
          <select id="branch_${i}">
            <option value="auto" selected>Auto (evaluate)</option>
            <option value="true">Force TRUE (if-branch)</option>
            <option value="false">Force FALSE (else-branch)</option>
          </select>
        </td>
      </tr>`;
  }).join('');

  const constRows = Array.from(consts.entries())
    .map(([k, v]) => `<tr><td class="label">${esc(k)}</td><td class="code">${esc(v)}</td></tr>`)
    .join('');

  const sqlConfigSummary = sqlConfig && sqlConfig.enabled
    ? `${sqlConfig.server} / ${sqlConfig.database} / ${sqlConfig.useIntegratedSecurity ? 'Integrated Security' : 'SQL Login'}`
    : 'disabled';
  const entrySummary = entryBlock
    ? `${entryBlock.kind} via ${entryBlock.receiver} [${entryBlock.startLine}-${entryBlock.endLine}]`
    : 'No entry query detected';
  const entryPreview = entryBlock ? esc(entryBlock.sqlText) : '';
  const entryParamsRows = buildSqlParamsRows(entryBlock ? entryBlock.params : [], 'entry');
  const childRows = childProcedures.map(proc => `
    <tr>
      <td class="label">${esc(proc.name)}</td>
      <td class="code">${esc(proc.sqlBlock.kind)} via ${esc(proc.sqlBlock.receiver)}</td>
      <td class="note">${proc.params.join(', ')}</td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>BMD Macro Debugger</title>
<style>
  body { font-family: var(--vscode-font-family, sans-serif); font-size: 13px; padding: 16px; color: var(--vscode-foreground); background: var(--vscode-editor-background); }
  h1 { font-size: 15px; margin-bottom: 4px; }
  h2 { font-size: 13px; margin: 14px 0 6px; text-transform: uppercase; letter-spacing: .05em; opacity: .7; }
  table { border-collapse: collapse; width: 100%; margin-bottom: 8px; }
  td, th { padding: 3px 8px 3px 0; vertical-align: top; }
  td.label { color: var(--vscode-symbolIcon-variableForeground, #9cdcfe); white-space: nowrap; width: 220px; font-family: monospace; }
  td.code { font-family: monospace; font-size: 12px; opacity: .8; }
  td.note { font-style: italic; opacity: .6; }
  input[type=text], select { background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border, #555); padding: 2px 6px; border-radius: 2px; width: 320px; }
  button { margin-top: 12px; padding: 5px 18px; background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; border-radius: 2px; cursor: pointer; font-size: 13px; }
  button:hover { background: var(--vscode-button-hoverBackground); }
  .separator { border: none; border-top: 1px solid var(--vscode-widget-border, #444); margin: 14px 0; }
  #trace { margin-top: 14px; }
  .trace-entry { padding: 4px 8px; margin: 2px 0; border-radius: 3px; font-family: monospace; font-size: 12px; white-space: pre-wrap; }
  .trace-log { background: var(--vscode-terminal-background, #1e1e1e); border-left: 3px solid #4ec9b0; }
  .trace-show { background: #2d2000; border-left: 3px solid #ffd700; color: #ffd700; }
  .trace-field { background: #001e2d; border-left: 3px solid #569cd6; color: #9cdcfe; }
  .trace-flow { background: #1f1f1f; border-left: 3px solid #d7ba7d; }
  .trace-sql { background: #132a13; border-left: 3px solid #89d185; }
  .trace-label { font-size: 10px; text-transform: uppercase; opacity: .6; display: block; }
  details summary { cursor: pointer; opacity: .7; font-size: 12px; margin-top: 8px; }
  textarea { width: 100%; min-height: 140px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border, #555); padding: 8px; border-radius: 2px; font-family: monospace; font-size: 12px; resize: vertical; }
  .button-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; flex-wrap: wrap; }
  .pill { display: inline-block; padding: 3px 8px; border-radius: 999px; background: var(--vscode-badge-background, #333); color: var(--vscode-badge-foreground, #fff); font-size: 11px; }
  .sql-status-error { color: #f48771; }
  .sql-status-ok { color: #89d185; }
</style>
</head>
<body>
<h1>🔍 BMD Macro Debugger — ${esc(shortName)}</h1>

<h2>Runtime Inputs</h2>
<table>${inputRows || '<tr><td colspan="2" class="note">None detected</td></tr>'}</table>

<h2>Branch Control</h2>
<table>
  <thead><tr><th style="text-align:left;padding-right:8px">Branch</th><th style="text-align:left;padding-right:8px">Condition</th><th style="text-align:left">Action</th></tr></thead>
  <tbody>${branchRows || '<tr><td colspan="3" class="note">No branches detected</td></tr>'}</tbody>
</table>

<div class="button-row">
  <button onclick="runSimulation()">▶ Simulate</button>
</div>

<div id="trace"></div>

<hr class="separator" />
<h2>Database Flow</h2>
<div class="button-row">
  <span class="pill">DB: ${esc(sqlConfigSummary)}</span>
  <span class="pill">Entry: ${esc(entrySummary)}</span>
</div>
<table>
  <tr>
    <td class="label">Row Limit</td>
    <td><input type="text" id="flow_max_rows" value="20" /></td>
  </tr>
</table>
<textarea id="entry_sql_preview" spellcheck="false">${entryPreview}</textarea>
<h2>Entry Parameters</h2>
<table id="entry_params_table">${entryParamsRows || '<tr><td class="note">No parameters detected for the entry query.</td></tr>'}</table>
<h2>Downstream SQL</h2>
<table>${childRows || '<tr><td class="note">No downstream procedure SQL detected.</td></tr>'}</table>
<div class="button-row">
  <button onclick="runMacroFlow()" ${!entryBlock || !sqlConfig || !sqlConfig.enabled ? 'disabled' : ''}>Run Macro Flow Against DB</button>
  <span class="note">Executes the detected entry query first, then only downstream SQL reached by the returned rows.</span>
</div>
<div id="flow_result"></div>

<hr class="separator" />
<details>
  <summary>Constants (${consts.size})</summary>
  <table style="margin-top:6px">${constRows || '<tr><td class="note">None</td></tr>'}</table>
</details>

<script>
  const vscode = acquireVsCodeApi();

  function handleUserDropdown(sel) {
    const customInput = document.getElementById(sel.id + '_custom');
    if (customInput) {
      customInput.style.display = sel.value === '__custom__' ? 'inline-block' : 'none';
    }
  }

  function runSimulation() {
    const values = {};
    document.querySelectorAll('input[id^="inp_"], select[id^="inp_"]').forEach(el => {
      if (el.id.endsWith('_custom')) return;
      let val = el.value;
      if (val === '__custom__') {
        const custom = document.getElementById(el.id + '_custom');
        val = custom ? custom.value : '';
      }
      const key = el.id.replace(/^inp_/, '');
      values[key] = val;
    });

    const branches = {};
    document.querySelectorAll('select[id^="branch_"]').forEach(el => {
      const idx = el.id.replace('branch_', '');
      if (el.value !== 'auto') {
        branches[idx] = el.value;
      }
    });

    const entryParams = {};
    document.querySelectorAll('input[data-entry-param-name]').forEach(input => {
      entryParams[input.dataset.entryParamName] = input.value;
    });
    const maxRows = document.getElementById('flow_max_rows').value;

    vscode.postMessage({ command: 'simulate', values, branches, entryParams, maxRows });
  }

  function runMacroFlow() {
    const entryParams = {};
    document.querySelectorAll('input[data-entry-param-name]').forEach(input => {
      entryParams[input.dataset.entryParamName] = input.value;
    });
    const maxRows = document.getElementById('flow_max_rows').value;
    const result = document.getElementById('flow_result');
    result.innerHTML = '<p class="note">Running entry query and downstream flow...</p>';
    vscode.postMessage({ command: 'runMacroFlow', entryParams, maxRows });
  }

  window.addEventListener('message', event => {
    const msg = event.data;
    if (msg.command === 'traceResult') {
      renderTrace(msg.trace);
      return;
    }
    if (msg.command === 'flowResult') {
      renderFlowResult(msg);
    }
  });

  function renderTrace(trace) {
    const container = document.getElementById('trace');
    if (!trace || trace.length === 0) {
      container.innerHTML = '<p style="opacity:.6;font-style:italic">No output produced.</p>';
      return;
    }
    container.innerHTML = '<h2>Execution Trace</h2>' + trace.map(entry => {
      if (entry.kind === 'log') {
        return '<div class="trace-entry trace-log"><span class="trace-label">log</span>' + escHtml(entry.text) + '</div>';
      }
      if (entry.kind === 'showMessage') {
        return '<div class="trace-entry trace-show"><span class="trace-label">bmd_showMessage</span>' + escHtml(entry.text) + '</div>';
      }
      if (entry.kind === 'fieldSet') {
        return '<div class="trace-entry trace-field"><span class="trace-label">field write-back</span>' + escHtml(entry.field) + ' := ' + escHtml(entry.value) + '</div>';
      }
      if (entry.kind === 'flow') {
        return '<div class="trace-entry trace-flow"><span class="trace-label">flow</span>' + escHtml(entry.text) + '</div>';
      }
      return '';
    }).join('');
  }

  function renderFlowResult(msg) {
    const container = document.getElementById('flow_result');
    if (!msg.ok) {
      container.innerHTML = '<p class="sql-status-error">' + escHtml(msg.error || 'Unknown flow error') + '</p>';
      return;
    }

    const result = msg.result || {};
    const trace = Array.isArray(result.flowTrace) ? result.flowTrace : [];
    const childExecutions = Array.isArray(result.childExecutions) ? result.childExecutions : [];
    const entryRowCount = result.entryResult && typeof result.entryResult.rowCount === 'number' ? result.entryResult.rowCount : 0;
    const traceHtml = trace.map(entry => {
      if (entry.kind === 'log') {
        return '<div class="trace-entry trace-log"><span class="trace-label">log</span>' + escHtml(entry.text) + '</div>';
      }
      if (entry.kind === 'sql') {
        const params = entry.params ? '<br><span class="trace-label">params</span>' + escHtml(JSON.stringify(entry.params)) : '';
        return '<div class="trace-entry trace-sql"><span class="trace-label">sql</span>' + escHtml(entry.text) + params + '</div>';
      }
      return '<div class="trace-entry trace-flow"><span class="trace-label">flow</span>' + escHtml(entry.text) + '</div>';
    }).join('');

    const childHtml = childExecutions.length === 0
      ? '<p class="note">No downstream SQL was executed.</p>'
      : '<table><thead><tr><th style="text-align:left">Row</th><th style="text-align:left">Procedure</th><th style="text-align:left">Result</th></tr></thead><tbody>' + childExecutions.map(exec => {
          const resultText = exec.result && exec.result.kind === 'nonQuery'
            ? 'Rows affected: ' + String(exec.result.rowsAffected)
            : 'Result set';
          return '<tr><td>' + escHtml(String(exec.rowIndex + 1)) + '</td><td>' + escHtml(exec.procedureName) + '</td><td>' + escHtml(resultText) + '</td></tr>';
        }).join('') + '</tbody></table>';

    container.innerHTML =
      '<p class="sql-status-ok">Entry query returned ' + escHtml(String(entryRowCount)) + ' row(s).</p>' +
      traceHtml +
      '<h2>Downstream Executions</h2>' + childHtml;
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
</script>
</body>
</html>`;
}

function buildSqlParamsRows(params, mode = 'entry') {
  if (!params || params.length === 0) {
    return '';
  }

  return params.map(param => `
    <tr>
      <td class="label">:${esc(param.name)}</td>
      <td><input type="text" ${mode === 'entry' ? `data-entry-param-name="${esc(param.name)}"` : `data-sql-param-name="${esc(param.name)}"`} value="${esc(param.defaultValue || '')}" /></td>
      <td>${param.sourceExpr ? `<span class="note">from ${esc(param.sourceExpr)}</span>` : ''}</td>
    </tr>`).join('');
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Exports ──────────────────────────────────────────────────────────────────

module.exports = { run };
