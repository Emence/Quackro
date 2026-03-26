/*
 * Scope and assignment context for semantic validation.
 *
 * Responsibilities:
 * - Compute routine scopes (procedure/function begin..end ranges)
 * - Resolve scope id for an absolute offset
 * - Resolve whether an identifier has an assignment before an offset
 *
 * Notes:
 * - topLevelVarNames is intentionally mutable and filled by other passes
 *   (see runtime-validation-identifiers.js) to support MAIN-to-routine usage checks.
 */
function createValidationScopeContext(context) {
  const {
    lines,
    lineOffsets,
    cleanText
  } = context;

  const routineScopes = [];
  {
    const routineHeaderRe = /\b(procedure|function)\s+[A-Za-z_][A-Za-z0-9_]*(?:\s*\([^)]*\))?/i;
    const blockTokenRe = /\b(begin|end)\b/gi;
    let pendingRoutine = false;
    let routineStartOffset = -1;
    let routineDepth = 0;

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const cleanLine = lines[lineIdx] || '';
      if (routineHeaderRe.test(cleanLine)) {
        pendingRoutine = true;
      }

      blockTokenRe.lastIndex = 0;
      let tm;
      while ((tm = blockTokenRe.exec(cleanLine)) !== null) {
        const token = tm[1].toLowerCase();
        if (token === 'begin') {
          if (pendingRoutine && routineDepth === 0) {
            routineStartOffset = lineOffsets[lineIdx];
            routineDepth = 1;
            pendingRoutine = false;
          } else if (routineDepth > 0) {
            routineDepth++;
          }
        } else if (token === 'end' && routineDepth > 0) {
          routineDepth--;
          if (routineDepth === 0) {
            routineScopes.push({
              startOffset: routineStartOffset,
              endOffset: lineOffsets[lineIdx] + cleanLine.length
            });
            routineStartOffset = -1;
          }
        }
      }
    }
  }

  function getScopeIdAtOffset(offset) {
    for (let i = 0; i < routineScopes.length; i++) {
      const scope = routineScopes[i];
      if (offset >= scope.startOffset && offset <= scope.endOffset) {
        return `routine:${i}`;
      }
    }
    return 'main';
  }

  const assignmentOffsetsByVar = new Map();
  const assignmentOffsetRe = /\b([A-Za-z_][A-Za-z0-9_]*)\b\s*:=/gi;
  let assignmentOffsetMatch;
  while ((assignmentOffsetMatch = assignmentOffsetRe.exec(cleanText)) !== null) {
    const lowerVar = assignmentOffsetMatch[1].toLowerCase();
    if (!assignmentOffsetsByVar.has(lowerVar)) {
      assignmentOffsetsByVar.set(lowerVar, []);
    }
    assignmentOffsetsByVar.get(lowerVar).push(assignmentOffsetMatch.index);
  }

  const topLevelVarNames = new Set();

  function hasAssignmentBeforeOffset(lowerVar, offset) {
    const offsets = assignmentOffsetsByVar.get(lowerVar);
    if (!offsets || offsets.length === 0) {
      return false;
    }

    const targetScope = getScopeIdAtOffset(offset);
    let hasMainScopeAssignment = false;
    for (const pos of offsets) {
      const scopeId = getScopeIdAtOffset(pos);
      if (scopeId === 'main') {
        hasMainScopeAssignment = true;
      }
      if (scopeId !== targetScope) {
        continue;
      }
      if (pos < offset) {
        return true;
      }
      if (pos >= offset) {
        return false;
      }
    }

    if (targetScope !== 'main' && topLevelVarNames.has(lowerVar) && hasMainScopeAssignment) {
      return true;
    }
    return false;
  }

  return {
    topLevelVarNames,
    getScopeIdAtOffset,
    hasAssignmentBeforeOffset
  };
}

module.exports = {
  createValidationScopeContext
};
