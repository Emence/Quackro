/*
 * Semantic pass for numeric/string comparison guidance.
 *
 * Enforces project conventions for equality/inequality vs relational operators
 * by analyzing if/while condition ranges from runtime-validation-ranges.js.
 */
const { getConditionRanges } = require('./runtime-validation-ranges');

function runComparisonValidationPass(context) {
  const {
    vscode,
    document,
    rawText,
    cleanText,
    diagnostics,
    hasAssignmentBeforeOffset,
    createCodedDiagnostic
  } = context;

  const conditionRanges = getConditionRanges(cleanText);
  for (const range of conditionRanges) {
    let condText = cleanText.slice(range.start, range.end);
    let rawCondText = rawText.slice(range.start, range.end);
    let baseOffset = range.start;

    if (range.isParenthesized && condText[0] === '(') {
      condText = condText.slice(1, -1);
      rawCondText = rawCondText.slice(1, -1);
      baseOffset = range.start + 1;
    }

    const numPatterns = [
      /(?<![<>!=:])([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(\d+\.?\d*)\b/g,
      /\b(\d+\.?\d*)\s*=(?![=<>])\s*([A-Za-z_][A-Za-z0-9_]*)\b/g,
      /([A-Za-z_][A-Za-z0-9_]*)\s*<>\s*(\d+\.?\d*)\b/g,
      /\b(\d+\.?\d*)\s*<>\s*([A-Za-z_][A-Za-z0-9_]*)\b/g
    ];

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
        if (flagged.has(absOffset)) {
          continue;
        }
        flagged.add(absOffset);

        const startPos = document.positionAt(absOffset);
        const endPos = document.positionAt(absOffset + numStr.length);
        diagnostics.push(createCodedDiagnostic(
          new vscode.Range(startPos, endPos),
          `Prefer string literal '${numStr}' over number in equality/inequality comparison. ` +
          `In macros, values are typically strings; '${numStr}' also handles NULL returns correctly. ` +
          `Use relational operators (<, >, <=, >=) if numeric ordering is intended.`,
          vscode.DiagnosticSeverity.Warning,
          'semantic.numeric_literal_equality_comparison'
        ));
      }
    }

    const relationalStringPatterns = [
      /(?:<=|>=|<|>)\s*('(?:\d+\.?\d*)')/g,
      /('(?:\d+\.?\d*)')\s*(?:<=|>=|<|>)/g
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
        diagnostics.push(createCodedDiagnostic(
          new vscode.Range(startPos, endPos),
          `Relational comparisons must use numbers, not strings. Use ${quotedNum.slice(1, -1)} instead of ${quotedNum}.`,
          vscode.DiagnosticSeverity.Warning,
          'semantic.string_literal_relational_comparison'
        ));
      }
    }
  }
}

module.exports = {
  runComparisonValidationPass
};
