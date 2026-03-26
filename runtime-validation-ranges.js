/*
 * Shared text range scanners for semantic passes.
 *
 * Exposes:
 * - getConditionRanges(text): if/while condition spans
 * - getControlExpressionRanges(text): condition/control expression spans
 *
 * Consumers: runtime-validation-identifiers.js and
 * runtime-validation-comparisons.js.
 */
function getConditionRanges(text) {
  const ranges = [];
  const startRe = /\b(if|while)\b/gi;
  let m;
  while ((m = startRe.exec(text)) !== null) {
    const kind = m[1].toLowerCase();
    const endKeyword = kind === 'if' ? 'then' : 'do';

    let cursor = startRe.lastIndex;
    while (cursor < text.length && /\s/.test(text[cursor])) {
      cursor++;
    }

    if (cursor >= text.length) {
      continue;
    }

    let conditionStart;
    let conditionEnd = -1;
    let isParenthesized;

    if (text[cursor] === '(') {
      isParenthesized = true;
      conditionStart = cursor;
      let depth = 1;

      for (let i = cursor + 1; i < text.length; i++) {
        const ch = text[i];
        if (ch === '(') {
          depth++;
        } else if (ch === ')') {
          depth--;
          if (depth === 0) {
            conditionEnd = i + 1;
            break;
          }
        }
      }
    } else {
      isParenthesized = false;
      conditionStart = cursor;

      for (let i = cursor; i < text.length; i++) {
        if (i + endKeyword.length > text.length) {
          break;
        }
        const candidate = text.slice(i, i + endKeyword.length).toLowerCase();
        if (candidate === endKeyword) {
          const prev = i > 0 ? text[i - 1] : ' ';
          const next = i + endKeyword.length < text.length ? text[i + endKeyword.length] : ' ';
          if (!/[A-Za-z0-9_]/.test(prev) && !/[A-Za-z0-9_]/.test(next)) {
            conditionEnd = i;
            break;
          }
        }
      }
    }

    if (conditionEnd === -1) {
      continue;
    }

    ranges.push({ kind, start: conditionStart, end: conditionEnd, isParenthesized });
    startRe.lastIndex = isParenthesized ? conditionEnd : conditionEnd + endKeyword.length;
  }

  return ranges;
}

function getControlExpressionRanges(text) {
  const ranges = [];

  function isWordBoundary(index, length) {
    const prev = index > 0 ? text[index - 1] : ' ';
    const next = index + length < text.length ? text[index + length] : ' ';
    return !/[A-Za-z0-9_]/.test(prev) && !/[A-Za-z0-9_]/.test(next);
  }

  function findKeywordAtDepth0(startIndex, keywords) {
    let depth = 0;
    for (let i = startIndex; i < text.length; i++) {
      const ch = text[i];
      if (ch === '(') {
        depth++;
        continue;
      }
      if (ch === ')' && depth > 0) {
        depth--;
        continue;
      }
      if (depth !== 0) {
        continue;
      }

      for (const kw of keywords) {
        if (i + kw.length > text.length) {
          continue;
        }
        if (text.slice(i, i + kw.length).toLowerCase() === kw && isWordBoundary(i, kw.length)) {
          return { index: i, keyword: kw };
        }
      }
    }
    return null;
  }

  const conditionRanges = getConditionRanges(text);
  for (const range of conditionRanges) {
    if (range.isParenthesized && range.end - range.start >= 2) {
      ranges.push({ kind: range.kind, start: range.start + 1, end: range.end - 1 });
    } else {
      ranges.push({ kind: range.kind, start: range.start, end: range.end });
    }
  }

  const forRe = /\bfor\b/gi;
  let forMatch;
  while ((forMatch = forRe.exec(text)) !== null) {
    let cursor = forRe.lastIndex;
    while (cursor < text.length && /\s/.test(text[cursor])) {
      cursor++;
    }

    const varMatch = /^[A-Za-z_][A-Za-z0-9_]*/.exec(text.slice(cursor));
    if (!varMatch) {
      continue;
    }
    cursor += varMatch[0].length;
    while (cursor < text.length && /\s/.test(text[cursor])) {
      cursor++;
    }
    if (text.slice(cursor, cursor + 2) !== ':=') {
      continue;
    }
    cursor += 2;
    while (cursor < text.length && /\s/.test(text[cursor])) {
      cursor++;
    }

    const startExprStart = cursor;
    const boundKw = findKeywordAtDepth0(startExprStart, ['downto', 'to']);
    if (!boundKw) {
      continue;
    }
    const startExprEnd = boundKw.index;

    cursor = boundKw.index + boundKw.keyword.length;
    while (cursor < text.length && /\s/.test(text[cursor])) {
      cursor++;
    }

    const endExprStart = cursor;
    const doKw = findKeywordAtDepth0(endExprStart, ['do']);
    if (!doKw) {
      continue;
    }
    const endExprEnd = doKw.index;

    if (startExprEnd > startExprStart) {
      ranges.push({ kind: 'for', start: startExprStart, end: startExprEnd });
    }
    if (endExprEnd > endExprStart) {
      ranges.push({ kind: 'for', start: endExprStart, end: endExprEnd });
    }

    forRe.lastIndex = doKw.index + 2;
  }

  const caseRe = /\bcase\b/gi;
  let caseMatch;
  while ((caseMatch = caseRe.exec(text)) !== null) {
    let cursor = caseRe.lastIndex;
    while (cursor < text.length && /\s/.test(text[cursor])) {
      cursor++;
    }

    const exprStart = cursor;
    const ofKw = findKeywordAtDepth0(exprStart, ['of']);
    if (!ofKw) {
      continue;
    }
    const exprEnd = ofKw.index;
    if (exprEnd > exprStart) {
      ranges.push({ kind: 'case', start: exprStart, end: exprEnd });
    }

    caseRe.lastIndex = ofKw.index + 2;
  }

  return ranges;
}

module.exports = {
  getConditionRanges,
  getControlExpressionRanges
};
