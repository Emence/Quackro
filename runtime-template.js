const vscode = require('vscode');
const { isMacroDocument, getRuntimeConfig } = require('./runtime');

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

module.exports = {
  ensureMandatoryHeaderForNewMacro
};