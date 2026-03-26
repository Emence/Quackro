/*
 * Semantic pass for routine return semantics.
 *
 * Covers:
 * - disallowing Result usage in procedures
 * - warning when functions do not assign/use Result
 */
function runRoutineResultValidationPass(context) {
  const {
    vscode,
    lines,
    diagnostics,
    createCodedDiagnostic
  } = context;

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
        diagnostics.push(createCodedDiagnostic(
          new vscode.Range(lineIdx, rm.index, lineIdx, rm.index + 6),
          "'result' cannot be used inside a procedure. Only functions have a return value.",
          vscode.DiagnosticSeverity.Warning,
          'semantic.result_in_procedure'
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
            diagnostics.push(createCodedDiagnostic(
              new vscode.Range(warningLine, warningCol, warningLine, warningCol + warningLen),
              `Function '${currentRoutineName || 'function'}' has no 'Result' usage. Functions should assign a return value via Result := ...`,
              vscode.DiagnosticSeverity.Warning,
              'semantic.function_missing_result'
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

module.exports = {
  runRoutineResultValidationPass
};
