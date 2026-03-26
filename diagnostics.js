const vscode = require('vscode');
const runtime = require('./runtime');

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
  runtime.clearCachedTypeIndex(document);
}

function scheduleValidation(document, diagnosticCollection) {
  const key = document.uri.toString();
  const existing = validationTimers.get(key);
  if (existing) {
    clearTimeout(existing);
  }

  const timer = setTimeout(() => {
    validationTimers.delete(key);
    requestValidation(document, diagnosticCollection);
  }, 800);

  validationTimers.set(key, timer);
}

function requestValidation(document, diagnosticCollection) {
  if (!runtime.isMacroDocument(document)) {
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
          await runtime.validateDocument(document, diagnosticCollection);
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

module.exports = {
  clearDocumentState,
  scheduleValidation,
  requestValidation
};