const vscode = require('vscode');
const runtime = require('./runtime');
const diagnostics = require('./diagnostics');
const { registerCommands } = require('./commands');
const { registerLanguageFeatures } = require('./language-features');
const { ensureMandatoryHeaderForNewMacro } = require('./runtime-template');


exports.activate = function (context) {
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('bmdmacro');


  if (runtime.ENABLE_DIAGNOSTICS) {
    for (const doc of vscode.workspace.textDocuments) {
      ensureMandatoryHeaderForNewMacro(doc);
      if (runtime.isMacroDocument(doc)) {
        diagnostics.requestValidation(doc, diagnosticCollection);
      }
    }
  } else {
    for (const doc of vscode.workspace.textDocuments) {
      ensureMandatoryHeaderForNewMacro(doc);
    }
  }


  context.subscriptions.push(...registerLanguageFeatures());
  context.subscriptions.push(...registerCommands(context));
  context.subscriptions.push(diagnosticCollection);


  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(doc => {
      ensureMandatoryHeaderForNewMacro(doc);
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

        const shouldRetriggerSuggest =
          runtime.shouldRetriggerModelNameSuggest(event) ||
          (typeof runtime.shouldRetriggerFunctionArgumentSuggest === 'function' &&
            runtime.shouldRetriggerFunctionArgumentSuggest(event));

        if (!shouldRetriggerSuggest) {
          return;
        }

        setTimeout(() => {
          const editor = vscode.window.activeTextEditor;
          if (!editor || editor.document.uri.toString() !== event.document.uri.toString()) {
            return;
          }

          vscode.commands.executeCommand('editor.action.triggerSuggest');
        }, 0);
      })
    ]),
    vscode.workspace.onDidCloseTextDocument(doc => {
      diagnostics.clearDocumentState(doc);
      diagnosticCollection.delete(doc.uri);
    })
  );
};


exports.deactivate = function () {};