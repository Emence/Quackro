const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const macroDebugger = require('./macro-debugger');
const runtime = require('./runtime');
const WebviewFunctions = require('./Webview-functions');

const CONTEXT_PARAMETER_DIAGNOSTIC_CODES = new Set([
  'semantic.unknown_argument_identifier',
  'semantic.unknown_identifier_expression',
  'semantic.unknown_identifier_control_expression',
  'semantic.context_parameter_needs_mapping'
]);

function findContextParameterInsertLine(document) {
  for (let line = 0; line < document.lineCount; line++) {
    if (/^\s*const\b/i.test(document.lineAt(line).text)) {
      return line;
    }
  }

  for (let line = 0; line < document.lineCount; line++) {
    const text = document.lineAt(line).text;
    if (/^\s*$/.test(text) || /^\s*\/\//.test(text)) {
      continue;
    }
    return line;
  }

  return document.lineCount;
}

function extractExistingContextParameterNames(document) {
  const names = new Set();
  const namedMarkerRe = /^\s*\/\/\s*@context-param(?:s)?\s*:?[ \t]+(.+)$/i;

  for (let line = 0; line < document.lineCount; line++) {
    const text = document.lineAt(line).text;
    const match = namedMarkerRe.exec(text);
    if (!match) {
      continue;
    }

    const identifiers = match[1]
      .split(/[\s,;]+/)
      .map(part => part.trim())
      .filter(part => /^[A-Za-z_][A-Za-z0-9_]*$/.test(part));

    for (const identifier of identifiers) {
      names.add(identifier.toLowerCase());
    }
  }

  return names;
}

function collectSelectionLineRanges(selections) {
  return selections.map(selection => ({
    startLine: Math.min(selection.start.line, selection.end.line),
    endLine: Math.max(selection.start.line, selection.end.line)
  }));
}

function rangeOverlapsSelectionLines(range, selectionRanges) {
  return selectionRanges.some(selectionRange =>
    range.end.line >= selectionRange.startLine && range.start.line <= selectionRange.endLine
  );
}

function registerCommands(context) {
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

      const runtimeConfig = runtime.getRuntimeConfig();

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
          () => runtime.uploadMacroToFormula(macroText)
        );

        const affectedRows = runtime.parseAffectedRows(rows);

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
      const useLogProcedure = runtime.hasProcedureLog(document);
      const selections = [...editor.selections].sort((a, b) => b.end.line - a.end.line);
      const edit = new vscode.WorkspaceEdit();
      let insertedGroups = 0;

      for (const selection of selections) {
        const startLine = Math.min(selection.start.line, selection.end.line);
        const endLine = Math.max(selection.start.line, selection.end.line);
        const variables = runtime.extractAssignedVariables(document, startLine, endLine);
        if (variables.length === 0) {
          continue;
        }

        // Find indentation of the last selected line with a variable assignment, fallback to endLine
        let indent = '';
        for (let line = endLine; line >= startLine; line--) {
          const text = document.lineAt(line).text;
          if (/^\s*[A-Za-z_][A-Za-z0-9_]*\s*:=/.test(text)) {
            indent = text.match(/^\s*/)[0];
            break;
          }
        }
        if (!indent && document.lineCount > endLine) {
          indent = document.lineAt(endLine).text.match(/^\s*/)[0];
        }

        let block = runtime.buildLogStatement(variables, useLogProcedure);
        // Indent all lines of the block
        block = block.split('\n').map(line => indent + line).join('\n') + '\n';
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

  const markContextParameterCommand = vscode.commands.registerCommand(
    'bmdmacro.markContextParameter',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'bmdmacro') {
        vscode.window.showErrorMessage('Open a BMD macro file before marking context parameters.');
        return;
      }

      const document = editor.document;
      const selectionRanges = collectSelectionLineRanges(editor.selections);
      const existingContextParameters = extractExistingContextParameterNames(document);

      const contextParametersToInsert = new Map();
      for (const diagnostic of vscode.languages.getDiagnostics(document.uri)) {
        const code = typeof diagnostic.code === 'string' ? diagnostic.code : String(diagnostic.code || '');
        if (!CONTEXT_PARAMETER_DIAGNOSTIC_CODES.has(code)) {
          continue;
        }
        if (!rangeOverlapsSelectionLines(diagnostic.range, selectionRanges)) {
          continue;
        }

        const identifier = document.getText(diagnostic.range).trim();
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(identifier)) {
          continue;
        }

        const lowerIdentifier = identifier.toLowerCase();
        if (existingContextParameters.has(lowerIdentifier) || contextParametersToInsert.has(lowerIdentifier)) {
          continue;
        }

        contextParametersToInsert.set(lowerIdentifier, identifier);
      }

      if (contextParametersToInsert.size === 0) {
        for (const selection of editor.selections) {
          const selectedText = document.getText(selection).trim();
          if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(selectedText)) {
            continue;
          }

          const lowerIdentifier = selectedText.toLowerCase();
          if (existingContextParameters.has(lowerIdentifier) || contextParametersToInsert.has(lowerIdentifier)) {
            continue;
          }

          contextParametersToInsert.set(lowerIdentifier, selectedText);
        }
      }

      const edit = new vscode.WorkspaceEdit();
      if (contextParametersToInsert.size === 0) {
        const message = existingContextParameters.size > 0
          ? 'No new context-parameter identifiers were found in the current selection.'
          : 'No context-parameter identifiers were found in the current selection.';
        vscode.window.showInformationMessage(message);
        return;
      }

      const insertLine = findContextParameterInsertLine(document);
      const markerLines = [...contextParametersToInsert.values()]
        .sort((left, right) => left.localeCompare(right))
        .map(identifier => `// @context-param ${identifier}`)
        .join('\n');

      edit.insert(document.uri, new vscode.Position(insertLine, 0), `${markerLines}\n`);
      await vscode.workspace.applyEdit(edit);
      vscode.window.showInformationMessage(`Inserted ${contextParametersToInsert.size} context-parameter marker line(s).`);
    }
  );

  const debugMacroCommand = vscode.commands.registerCommand(
    'bmdmacro.debugMacro',
    () => macroDebugger.run(context, {
      executeSqlQuery: runtime.executeDebugSql,
      sqlConfig: runtime.getDebugSqlConfig()
    })
  );

  const openSettingsCommand = vscode.commands.registerCommand(
    'bmdmacro.openSettingsUi',
    () => runtime.openSettingsWebview(context)
  );

  const buildVsixCommand = vscode.commands.registerCommand(
    'bmdmacro.buildVsix',
    () => {
      const scriptPath = path.join(context.extensionPath, 'build-vsix.ps1');
      if (!fs.existsSync(scriptPath)) {
        vscode.window.showErrorMessage(`build-vsix.ps1 not found: ${scriptPath}`);
        return;
      }

      const terminal = vscode.window.createTerminal({
        name: 'Quackro VSIX Build',
        cwd: context.extensionPath
      });

      terminal.show(true);
      terminal.sendText(`powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}"`, true);
    }
  );

  return [
    uploadMacroCommand,
    insertLogForSelectionCommand,
    markContextParameterCommand,
    debugMacroCommand,
    openSettingsCommand,
    buildVsixCommand
  ];
}

module.exports = {
  registerCommands
};