/*
 * Semantic pass for unknown BMD_ function calls.
 *
 * This pass only validates call tokens and known BMD function names.
 * It excludes constructor/member validation, which is handled in
 * runtime-validation-object-methods.js.
 */
function runUnknownBmdFunctionValidationPass(context) {
  const {
    vscode,
    lines,
    knownBmdFunctions,
    diagnostics,
    createCodedDiagnostic,
    isCallToken
  } = context;

  const bmdRe = /\bBMD_[A-Za-z0-9_]+\b/gi;
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    bmdRe.lastIndex = 0;
    let m;
    while ((m = bmdRe.exec(lines[lineIdx])) !== null) {
      const fn = m[0].toLowerCase();
      const startIdx = m.index;
      const endIdx = startIdx + m[0].length;
      const prevChar = startIdx > 0 ? lines[lineIdx][startIdx - 1] : '';
      const nextChar = endIdx < lines[lineIdx].length ? lines[lineIdx][endIdx] : '';
      if (fn.startsWith('bmd_mca_') || fn.startsWith('bmd_mcu_') || fn.startsWith('bmd_mcv_')) {
        continue;
      }
      if (prevChar === '.' || nextChar === '.') {
        continue;
      }
      if (!isCallToken(lines[lineIdx], endIdx)) {
        continue;
      }
      if (!knownBmdFunctions.has(fn)) {
        diagnostics.push(createCodedDiagnostic(
          new vscode.Range(lineIdx, startIdx, lineIdx, endIdx),
          `Unknown BMD function: '${m[0]}'`,
          vscode.DiagnosticSeverity.Error,
          'semantic.unknown_bmd_function'
        ));
      }
    }
  }
}

module.exports = {
  runUnknownBmdFunctionValidationPass
};
