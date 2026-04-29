
/**
 * Format a BMD macro document: re-indent based on begin/end nesting only.
 * Keywords like 'then', 'do', 'repeat', 'else' don't introduce new blocks
 * since they're always used with 'begin'.
 */
function formatDocument(text) {
  const lines = text.split('\n');
  const result = [];
  let indent = 0;
  const indentStr = '    '; // 4 spaces per indent level

  for (const rawLine of lines) {
    let line = rawLine.trimStart();
    if (!line) {
      // Preserve blank lines
      result.push('');
      continue;
    }

    // Check if this line starts with 'end' or 'until' — decrease indent for printing
    const startsWithEnd = /^\b(end|until)\b/i.test(line);
    let lineIndent = indent;
    if (startsWithEnd && indent > 0) {
      lineIndent--;
    }

    // Apply current indentation
    result.push(indentStr.repeat(lineIndent) + line);

    // Count ONLY 'begin' increases and 'end'/'until' decreases (NOT then/do/repeat/else)
    const beginCount = (line.match(/\bbegin\b/gi) || []).length;
    let endCount = (line.match(/\b(end|until)\b/gi) || []).length;

    // If line starts with end/until, we already applied it above, so don't count it again
    if (startsWithEnd) {
      endCount--;
    }

    indent = Math.max(0, lineIndent + beginCount - endCount);
  }

  return result.join('\n');
}


module.exports = {
    formatDocument
};    