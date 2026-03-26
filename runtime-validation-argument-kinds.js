/*
 * Argument kind resolver factory used by signature/type checks.
 *
 * Builds a scoped index of scalar assignment kinds and returns
 * getArgumentKindAtOffset(argumentText, offset) for semantic passes.
 */
function createArgumentKindResolver(context) {
  const {
    rawLines,
    lines,
    lineOffsets,
    classifyArgumentKind,
    getScopeIdAtOffset
  } = context;

  const scalarAssignmentKindsByVar = new Map();
  const assignmentValueRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*(.+)$/;

  for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
    const cleanLine = lines[lineIdx] || '';
    const rawLine = rawLines[lineIdx] || '';
    const cleanMatch = assignmentValueRe.exec(cleanLine);
    const rawMatch = assignmentValueRe.exec(rawLine);
    if (!cleanMatch || !rawMatch) {
      continue;
    }

    const kind = classifyArgumentKind(rawMatch[2]);
    if (!kind) {
      continue;
    }

    const lowerVar = cleanMatch[1].toLowerCase();
    if (!scalarAssignmentKindsByVar.has(lowerVar)) {
      scalarAssignmentKindsByVar.set(lowerVar, []);
    }

    scalarAssignmentKindsByVar.get(lowerVar).push({
      offset: lineOffsets[lineIdx] + cleanMatch.index,
      kind
    });
  }

  function getScalarAssignmentKindBeforeOffset(lowerVar, offset) {
    const entries = scalarAssignmentKindsByVar.get(lowerVar);
    if (!entries || entries.length === 0) {
      return null;
    }

    const targetScope = getScopeIdAtOffset(offset);
    let currentKind = null;
    for (const entry of entries) {
      if (getScopeIdAtOffset(entry.offset) !== targetScope) {
        continue;
      }
      if (entry.offset < offset) {
        currentKind = entry.kind;
        continue;
      }
      break;
    }
    return currentKind;
  }

  return function getArgumentKindAtOffset(argumentText, offset) {
    const inlineKind = classifyArgumentKind(argumentText);
    if (inlineKind) {
      return inlineKind;
    }

    const trimmed = typeof argumentText === 'string' ? argumentText.trim() : '';
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(trimmed)) {
      return null;
    }

    return getScalarAssignmentKindBeforeOffset(trimmed.toLowerCase(), offset);
  };
}

module.exports = {
  createArgumentKindResolver
};
