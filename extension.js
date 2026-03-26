const vscode = require('vscode');
const runtime = require('./runtime');
const diagnostics = require('./diagnostics');
const { registerCommands } = require('./commands');
const { registerLanguageFeatures } = require('./language-features');

exports.activate = function (context) {
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('bmdmacro');

  if (runtime.ENABLE_DIAGNOSTICS) {
    for (const doc of vscode.workspace.textDocuments) {
      runtime.ensureMandatoryHeaderForNewMacro(doc);
      if (runtime.isMacroDocument(doc)) {
        diagnostics.requestValidation(doc, diagnosticCollection);
      }
    }
  } else {
    for (const doc of vscode.workspace.textDocuments) {
      runtime.ensureMandatoryHeaderForNewMacro(doc);
    }
  }

  context.subscriptions.push(...registerLanguageFeatures());
  context.subscriptions.push(...registerCommands(context));
  context.subscriptions.push(diagnosticCollection);

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(doc => {
      runtime.ensureMandatoryHeaderForNewMacro(doc);
      if (runtime.ENABLE_DIAGNOSTICS && runtime.isMacroDocument(doc)) {
        diagnostics.requestValidation(doc, diagnosticCollection);
      }
    }),
    vscode.workspace.onDidSaveTextDocument(doc => {
      if (runtime.ENABLE_DIAGNOSTICS && runtime.isMacroDocument(doc)) {
        diagnostics.requestValidation(doc, diagnosticCollection);
      }
    }),
    ...(!runtime.ENABLE_DIAGNOSTICS ? [] : [
      vscode.workspace.onDidChangeTextDocument(event => {
        if (runtime.isMacroDocument(event.document) && !runtime.getRuntimeConfig().validateOnSave) {
          diagnostics.scheduleValidation(event.document, diagnosticCollection);
        }
      })
    ]),
    ...(!runtime.ENABLE_COMPLETION_PROVIDER ? [] : [
      vscode.workspace.onDidChangeTextDocument(event => {
        if (!runtime.isMacroDocument(event.document)) {
          return;
        }

        if (runtime.shouldRetriggerModelNameSuggest(event)) {
          vscode.commands.executeCommand('editor.action.triggerSuggest');
        }
      })
    ]),
    vscode.workspace.onDidCloseTextDocument(doc => {
      diagnostics.clearDocumentState(doc);
      diagnosticCollection.delete(doc.uri);
    })
  );
};

exports.deactivate = function () {};