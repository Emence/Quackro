/*
 * Semantic pass for setSQLText placeholder case consistency.
 *
 * Ensures a placeholder key keeps one letter casing within a single
 * setSQLText block to prevent subtle parameter mismatches.
 */
function runSqlPlaceholderValidationPass(context) {
  const {
    vscode,
    rawText,
    rawLines,
    diagnostics,
    createCodedDiagnostic
  } = context;

  const effectiveRawLines = Array.isArray(rawLines) ? rawLines : rawText.split('\n');

  for (let lineIdx = 0; lineIdx < effectiveRawLines.length; lineIdx++) {
    const line = effectiveRawLines[lineIdx];
    if (!/\bsetSQLText\s*\(/i.test(line)) {
      continue;
    }

    const seen = new Map();
    let endLine = Math.min(effectiveRawLines.length - 1, lineIdx + 500);
    for (let i = lineIdx; i <= endLine; i++) {
      const currentLine = effectiveRawLines[i];
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
          diagnostics.push(createCodedDiagnostic(
            new vscode.Range(i, m.index + 1, i, m.index + 1 + actual.length),
            `Placeholder case mismatch for ':${key}' in setSQLText: first ':${firstCase}', here ':${actual}'`,
            vscode.DiagnosticSeverity.Warning,
            'semantic.sql_placeholder_case_mismatch'
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

module.exports = {
  runSqlPlaceholderValidationPass
};
