/*
 * Semantic pass for identifier-centric validation.
 *
 * Covers:
 * - unknown identifiers in call args, assignment expressions, and control expressions
 * - argument count/type checks for known signatures and user routines
 * - const/var/routine parameter scoping details for this pass
 *
 * Shared helpers:
 * - keyword source: language-keywords.js
 * - control/condition ranges: runtime-validation-ranges.js
 */
const { BMD_KEYWORDS } = require('./language-keywords');
const { getControlExpressionRanges } = require('./runtime-validation-ranges');

function runIdentifierValidationPass(context) {
  const {
    vscode,
    document,
    rawLines,
    cleanText,
    lines,
    lineOffsets,
    diagnostics,
    topLevelVarNames,
    constructorNamespaces,
    functionSignaturesByName,
    methodSignaturesByType,
    getDocumentTypeIndex,
    getProcedureFunctionParamTypes,
    getVariableTypeAtPosition,
    getArgumentKindAtOffset,
    describeExpectedArgument,
    hasAssignmentBeforeOffset,
    isContextParameter,
    addContextParameterMappingWarning,
    isBmdFunctionLikeCallToken,
    isKnownFunctionCallToken,
    createCodedDiagnostic
  } = context;

  const knownIdentifiers = new Set(['true', 'false', 'nil', 'result']);

    {
    const constKeywordRe = /^\s*const\b/i;
    const blankOrCommentRe = /^\s*(\/\/.*)?$/;
    const newConstDeclRe = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/i;
    let inConstBlock = false;
    let pendingConstName = null;

    for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
      const line = rawLines[lineIdx].replace(/\r$/, '');
      const trimmedLine = line.trim();

      if (constKeywordRe.test(line)) {
        inConstBlock = true;
        if (pendingConstName) {
          knownIdentifiers.add(pendingConstName.toLowerCase());
        }
        pendingConstName = null;

        const rest = trimmedLine.replace(/^\s*const\s*/i, '').trim();
        const inlineMatch = newConstDeclRe.exec(rest);
        if (inlineMatch) {
          pendingConstName = inlineMatch[1];
          if (rest.includes(';')) {
            knownIdentifiers.add(pendingConstName.toLowerCase());
            pendingConstName = null;
          }
        }
        continue;
      }

      if (blankOrCommentRe.test(line)) {
        continue;
      }

      if (!inConstBlock) {
        continue;
      }

      if (/^(var|procedure|function|begin)\b/i.test(trimmedLine)) {
        if (pendingConstName) {
          knownIdentifiers.add(pendingConstName.toLowerCase());
          pendingConstName = null;
        }
        inConstBlock = false;
        continue;
      }

      const newDeclMatch = newConstDeclRe.exec(trimmedLine);
      if (newDeclMatch) {
        if (pendingConstName) {
          knownIdentifiers.add(pendingConstName.toLowerCase());
        }
        pendingConstName = newDeclMatch[1];
        if (trimmedLine.includes(';')) {
          knownIdentifiers.add(pendingConstName.toLowerCase());
          pendingConstName = null;
        }
        continue;
      }

      if (pendingConstName && trimmedLine.includes(';')) {
        knownIdentifiers.add(pendingConstName.toLowerCase());
        pendingConstName = null;
      }
    }

    if (pendingConstName) {
      knownIdentifiers.add(pendingConstName.toLowerCase());
    }
  }

  {
    const varKeywordRe = /^\s*var\b/i;
    const varDeclLineRe = /^\s*([A-Za-z_][A-Za-z0-9_]*(?:\s*,\s*[A-Za-z_][A-Za-z0-9_]*)*)\s*(?::(?!=)\s*[^;]+)?\s*;?\s*$/;
    const routineStartRe = /^\s*(procedure|function)\b/i;
    let inVarBlock = false;

    for (const line of rawLines) {
      const trimmedLine = line.replace(/\r$/, '');
      const content = trimmedLine.replace(/\/\/.*$/, '').trim();

      if (!content) {
        continue;
      }

      if (routineStartRe.test(content)) {
        inVarBlock = false;
        continue;
      }

      if (varKeywordRe.test(content)) {
        inVarBlock = true;
        const inline = content.replace(/^\s*var\s*/i, '').trim();
        if (inline) {
          const inlineMatch = varDeclLineRe.exec(inline);
          if (inlineMatch) {
            for (const name of inlineMatch[1].split(',')) {
              const lower = name.trim().toLowerCase();
              if (!lower) {
                continue;
              }
              topLevelVarNames.add(lower);
              knownIdentifiers.add(lower);
            }
          }
        }
        continue;
      }

      if (!inVarBlock) {
        continue;
      }

      const varDeclMatch = varDeclLineRe.exec(content);
      if (!varDeclMatch) {
        inVarBlock = false;
        continue;
      }

      for (const name of varDeclMatch[1].split(',')) {
        const lower = name.trim().toLowerCase();
        if (!lower) {
          continue;
        }
        topLevelVarNames.add(lower);
        knownIdentifiers.add(lower);
      }
    }
  }

  const defRe = /\b(?:procedure|function)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)/gi;
  const userRoutineParamCount = new Map();
  let defMatch;
  while ((defMatch = defRe.exec(cleanText)) !== null) {
    const routineNameLower = defMatch[1].toLowerCase();
    knownIdentifiers.add(routineNameLower);
    const paramCount = defMatch[2]
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0).length;
    userRoutineParamCount.set(routineNameLower, paramCount);
  }

  const parameterScopes = [];
  const routineHeaderRe = /\b(procedure|function)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)/i;
  const blockTokenRe = /\b(begin|end)\b/gi;
  let pendingParams = null;
  let currentParams = null;
  let currentStartOffset = -1;
  let routineDepth = 0;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const cleanLine = lines[lineIdx] || '';

    const headerMatch = routineHeaderRe.exec(cleanLine);
    if (headerMatch) {
      pendingParams = headerMatch[3]
        .split(',')
        .map(p => p.trim().split(/\s*:\s*/)[0].trim())
        .filter(p => /^[A-Za-z_][A-Za-z0-9_]*$/.test(p))
        .map(p => p.toLowerCase());
    }

    blockTokenRe.lastIndex = 0;
    let tm;
    while ((tm = blockTokenRe.exec(cleanLine)) !== null) {
      const token = tm[1].toLowerCase();
      if (token === 'begin') {
        if (!currentParams && pendingParams) {
          currentParams = pendingParams;
          pendingParams = null;
          currentStartOffset = lineOffsets[lineIdx];
          routineDepth = 1;
        } else if (currentParams) {
          routineDepth++;
        }
      } else if (token === 'end' && currentParams) {
        routineDepth--;
        if (routineDepth <= 0) {
          parameterScopes.push({
            startOffset: currentStartOffset,
            endOffset: lineOffsets[lineIdx] + cleanLine.length,
            params: new Set(currentParams)
          });
          currentParams = null;
          currentStartOffset = -1;
          routineDepth = 0;
        }
      }
    }
  }

  function isParameterInScope(lowerIdentifier, absOffset) {
    for (const scope of parameterScopes) {
      if (absOffset < scope.startOffset || absOffset > scope.endOffset) {
        continue;
      }
      if (scope.params.has(lowerIdentifier)) {
        return true;
      }
    }
    return false;
  }

  const lineAssignedRe = /\b([A-Za-z_][A-Za-z0-9_]*)\b\s*:=/gi;
  const unknownArgOffsets = new Set();
  const typeIndex = getDocumentTypeIndex(document);
  const paramTypeIndex = getProcedureFunctionParamTypes(cleanText, typeIndex);

  function splitArgsWithPositions(argsText) {
    const parts = [];
    let start = 0;
    let depth = 0;
    let inString = false;

    for (let i = 0; i < argsText.length; i++) {
      const ch = argsText[i];

      if (inString) {
        if (ch === "'") {
          if (i + 1 < argsText.length && argsText[i + 1] === "'") {
            i++;
          } else {
            inString = false;
          }
        }
        continue;
      }

      if (ch === "'") {
        inString = true;
        continue;
      }
      if (ch === '(') {
        depth++;
        continue;
      }
      if (ch === ')') {
        if (depth > 0) {
          depth--;
        }
        continue;
      }
      if (ch === ',' && depth === 0) {
        parts.push({ text: argsText.slice(start, i), start, end: i });
        start = i + 1;
      }
    }

    parts.push({ text: argsText.slice(start), start, end: argsText.length });
    return parts;
  }

  function findCallMatches(lineText) {
    const matches = [];
    const callStartRe = /\b([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)?)\s*\(/g;
    let m;

    while ((m = callStartRe.exec(lineText)) !== null) {
      const callee = m[1];
      const calleeStart = m.index;
      const openParenOffset = lineText.indexOf('(', calleeStart + callee.length);
      if (openParenOffset === -1) {
        continue;
      }

      let depth = 1;
      let inString = false;
      let closeParenOffset = -1;

      for (let i = openParenOffset + 1; i < lineText.length; i++) {
        const ch = lineText[i];
        if (inString) {
          if (ch === "'") {
            if (i + 1 < lineText.length && lineText[i + 1] === "'") {
              i++;
            } else {
              inString = false;
            }
          }
          continue;
        }

        if (ch === "'") {
          inString = true;
          continue;
        }
        if (ch === '(') {
          depth++;
          continue;
        }
        if (ch === ')') {
          depth--;
          if (depth === 0) {
            closeParenOffset = i;
            break;
          }
        }
      }

      if (closeParenOffset === -1) {
        continue;
      }

      matches.push({
        callee,
        calleeStart,
        openParenOffset,
        closeParenOffset
      });
    }

    return matches;
  }

  for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
    const cleanLine = lines[lineIdx] || '';
    const rawLine = rawLines[lineIdx] || '';
    const lineCalls = findCallMatches(cleanLine);

    for (const callMatch of lineCalls) {
      const callee = callMatch.callee;
      const calleeLower = callee.toLowerCase();
      const calleeStart = callMatch.calleeStart;
      const beforeCall = cleanLine.slice(0, calleeStart).toLowerCase();

      if (/\b(if|while|for)\s*$/.test(beforeCall)) {
        continue;
      }
      if (/\b(procedure|function)\s*$/.test(beforeCall)) {
        continue;
      }

      const openParenOffset = callMatch.openParenOffset;
      const argsText = rawLine.slice(openParenOffset + 1, callMatch.closeParenOffset);
      const args = splitArgsWithPositions(argsText);
      const providedArgCount = args.reduce((count, part) => {
        return part.text.trim().length > 0 ? count + 1 : count;
      }, 0);

      let callSignature = null;
      if (callee.includes('.')) {
        const dotIndex = callee.indexOf('.');
        const receiver = callee.slice(0, dotIndex);
        const receiverLower = receiver.toLowerCase();
        const memberLower = callee.slice(dotIndex + 1).toLowerCase();

        if (!constructorNamespaces.has(receiverLower)) {
          const receiverPosition = new vscode.Position(lineIdx, calleeStart);
          const typeName = getVariableTypeAtPosition(document, receiver, receiverPosition, false) || paramTypeIndex.get(receiverLower);
          if (typeName && methodSignaturesByType[typeName]) {
            callSignature = methodSignaturesByType[typeName].get(memberLower) || null;
          }
        }
      } else if (calleeLower.startsWith('bmd_')) {
        callSignature = functionSignaturesByName.get(calleeLower) || null;
      }

      if (callSignature) {
        const missingRequiredArg = callSignature.params
          .slice(0, callSignature.requiredCount)
          .some((_, idx) => !args[idx] || args[idx].text.trim().length === 0);

        if (missingRequiredArg || providedArgCount < callSignature.requiredCount) {
          diagnostics.push(createCodedDiagnostic(
            new vscode.Range(lineIdx, calleeStart, lineIdx, calleeStart + callee.length),
            `'${callee}' expects at least ${callSignature.requiredCount} argument(s); got ${providedArgCount}.`,
            vscode.DiagnosticSeverity.Warning,
            'semantic.argument_count_min'
          ));
        } else if (providedArgCount > callSignature.totalCount) {
          diagnostics.push(createCodedDiagnostic(
            new vscode.Range(lineIdx, calleeStart, lineIdx, calleeStart + callee.length),
            `'${callee}' expects at most ${callSignature.totalCount} argument(s); got ${providedArgCount}.`,
            vscode.DiagnosticSeverity.Warning,
            'semantic.argument_count_max'
          ));
        }

        for (let argIndex = 0; argIndex < Math.min(args.length, callSignature.params.length); argIndex++) {
          const param = callSignature.params[argIndex];
          if (!param || param.kind === 'any') {
            continue;
          }

          const rawArg = args[argIndex].text;
          const trimmed = rawArg.trim();
          if (!trimmed) {
            continue;
          }

          const leadingWhitespace = rawArg.match(/^\s*/);
          const argColStart = openParenOffset + 1 + args[argIndex].start + (leadingWhitespace ? leadingWhitespace[0].length : 0);
          const absArgOffset = lineOffsets[lineIdx] + argColStart;
          const actualKind = getArgumentKindAtOffset(trimmed, absArgOffset);

          if (!actualKind || actualKind === param.kind) {
            continue;
          }

          diagnostics.push(createCodedDiagnostic(
            new vscode.Range(lineIdx, argColStart, lineIdx, argColStart + trimmed.length),
            `Argument ${argIndex + 1} of '${callee}' expects ${describeExpectedArgument(param)}, but the supplied value looks like a ${actualKind}.`,
            vscode.DiagnosticSeverity.Warning,
            'semantic.argument_type_mismatch'
          ));
        }
      }

      if (!calleeLower.startsWith('bmd_')) {
        const expectedArgCount = userRoutineParamCount.get(calleeLower);
        if (typeof expectedArgCount === 'number' && providedArgCount !== expectedArgCount) {
          diagnostics.push(createCodedDiagnostic(
            new vscode.Range(lineIdx, calleeStart, lineIdx, calleeStart + callee.length),
            `Parameter count mismatch for '${callee}': expected ${expectedArgCount}, got ${providedArgCount}.`,
            vscode.DiagnosticSeverity.Error,
            'semantic.user_routine_argument_count_mismatch'
          ));
        }
      }

      for (const arg of args) {
        const rawArg = arg.text;
        const trimmed = rawArg.trim();
        if (!trimmed) {
          continue;
        }

        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(trimmed)) {
          continue;
        }

        const leadingWhitespace = rawArg.match(/^\s*/);
        const argColStart = openParenOffset + 1 + arg.start + (leadingWhitespace ? leadingWhitespace[0].length : 0);

        const lowerArg = trimmed.toLowerCase();
        const absArgOffset = lineOffsets[lineIdx] + argColStart;
        if (knownIdentifiers.has(lowerArg) || isParameterInScope(lowerArg, absArgOffset) || hasAssignmentBeforeOffset(lowerArg, absArgOffset)) {
          continue;
        }

        if (lowerArg === calleeLower) {
          continue;
        }

        if (isContextParameter(lowerArg)) {
          addContextParameterMappingWarning(trimmed, absArgOffset);
          unknownArgOffsets.add(absArgOffset);
          continue;
        }

        diagnostics.push(createCodedDiagnostic(
          new vscode.Range(lineIdx, argColStart, lineIdx, argColStart + trimmed.length),
          `Unknown argument identifier '${trimmed}'. It must be assigned before use.`,
          vscode.DiagnosticSeverity.Error,
          /^bmd_/i.test(trimmed) ? 'semantic.unknown_identifier.bmd_prefixed' : 'semantic.unknown_argument_identifier'
        ));
        unknownArgOffsets.add(absArgOffset);
      }
    }

    lineAssignedRe.lastIndex = 0;
    let assignMatchForRhs;
    while ((assignMatchForRhs = lineAssignedRe.exec(cleanLine)) !== null) {
      const leftVar = assignMatchForRhs[1];
      const assignPos = assignMatchForRhs.index + leftVar.length;
      const colonEqIndex = cleanLine.indexOf(':=', assignPos);

      if (colonEqIndex === -1) {
        continue;
      }

      let rhsEnd = cleanLine.indexOf(';', colonEqIndex);
      if (rhsEnd === -1) {
        rhsEnd = cleanLine.length;
      }

      const rhsStart = colonEqIndex + 2;
      const rhs = cleanLine.substring(rhsStart, rhsEnd).trim();
      const rhsOffsetInLine = cleanLine.indexOf(rhs, rhsStart);

      if (rhs && rhsOffsetInLine !== -1) {
        const tokenRe = /\b([A-Za-z_][A-Za-z0-9_]*)\b/g;
        let tokenMatch;
        while ((tokenMatch = tokenRe.exec(rhs)) !== null) {
          const token = tokenMatch[1];
          const lower = token.toLowerCase();

          const startInRhs = tokenMatch.index;
          const endInRhs = startInRhs + token.length;
          const prevChar = startInRhs > 0 ? rhs[startInRhs - 1] : '';
          const nextChar = endInRhs < rhs.length ? rhs[endInRhs] : '';
          if (prevChar === '.' || nextChar === '.') {
            continue;
          }

          const startCol = rhsOffsetInLine + startInRhs;
          const absTokenOffset = lineOffsets[lineIdx] + startCol;

          if (unknownArgOffsets.has(absTokenOffset)) {
            continue;
          }

          if (knownIdentifiers.has(lower) || BMD_KEYWORDS.has(lower) || isParameterInScope(lower, absTokenOffset) || hasAssignmentBeforeOffset(lower, absTokenOffset)) {
            continue;
          }
          if (isBmdFunctionLikeCallToken(rhs, startInRhs, endInRhs, lower)) {
            continue;
          }
          if (isKnownFunctionCallToken(rhs, startInRhs, endInRhs, lower)) {
            continue;
          }

          if (isContextParameter(lower)) {
            addContextParameterMappingWarning(token, absTokenOffset);
            continue;
          }

          const message = lower === leftVar.toLowerCase()
            ? `Variable '${token}' is used in its own assignment before it has been assigned a value.`
            : `Unknown identifier '${token}' in expression. It must be assigned before use.`;

          diagnostics.push(createCodedDiagnostic(
            new vscode.Range(lineIdx, startCol, lineIdx, startCol + token.length),
            message,
            vscode.DiagnosticSeverity.Error,
            /^bmd_/i.test(token)
              ? 'semantic.unknown_identifier.bmd_prefixed'
              : lower === leftVar.toLowerCase()
              ? 'semantic.self_reference_before_assignment'
              : 'semantic.unknown_identifier_expression'
          ));
        }
      }
    }
  }

  const controlRanges = getControlExpressionRanges(cleanText);
  for (const range of controlRanges) {
    const exprText = cleanText.slice(range.start, range.end);
    const tokenRe = /\b([A-Za-z_][A-Za-z0-9_]*)\b/g;
    let tokenMatch;
    while ((tokenMatch = tokenRe.exec(exprText)) !== null) {
      const token = tokenMatch[1];
      const lower = token.toLowerCase();
      const startInExpr = tokenMatch.index;
      const endInExpr = startInExpr + token.length;
      const absOffset = range.start + startInExpr;

      if (knownIdentifiers.has(lower) || BMD_KEYWORDS.has(lower) || isParameterInScope(lower, absOffset)) {
        continue;
      }
      if (isBmdFunctionLikeCallToken(exprText, startInExpr, endInExpr, lower)) {
        continue;
      }
      if (isKnownFunctionCallToken(exprText, startInExpr, endInExpr, lower)) {
        continue;
      }

      const prevChar = startInExpr > 0 ? exprText[startInExpr - 1] : '';
      const nextChar = endInExpr < exprText.length ? exprText[endInExpr] : '';
      if (prevChar === '.' || nextChar === '.') {
        continue;
      }

      if (hasAssignmentBeforeOffset(lower, absOffset)) {
        continue;
      }

      if (isContextParameter(lower)) {
        addContextParameterMappingWarning(token, absOffset);
        continue;
      }

      const startPos = document.positionAt(absOffset);
      const endPos = document.positionAt(absOffset + token.length);
      diagnostics.push(createCodedDiagnostic(
        new vscode.Range(startPos, endPos),
        `Unknown identifier '${token}' in control expression. It must be assigned before use.`,
        vscode.DiagnosticSeverity.Error,
        /^bmd_/i.test(token) ? 'semantic.unknown_identifier.bmd_prefixed' : 'semantic.unknown_identifier_control_expression'
      ));
    }
  }
}

module.exports = {
  runIdentifierValidationPass
};
