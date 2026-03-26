/*
 * Semantic pass for constructor and object method validation.
 *
 * Covers:
 * - unknown namespace constructors (e.g. MacroObject.CreateX)
 * - unknown receiver methods based on inferred variable type
 * - MacroModel field naming conventions for GetValue/SetValue
 *
 * Unknown plain BMD_ function calls are handled in
 * runtime-validation-bmd-functions.js.
 */
function runObjectMethodValidationPass(context) {
  const {
    vscode,
    document,
    rawText,
    rawLines,
    cleanText,
    lines,
    diagnostics,
    constructorNamespaces,
    constructorToType,
    knownMethodsByType,
    getDocumentTypeIndex,
    getProcedureFunctionParamTypes,
    getVariableTypeAtPosition,
    createCodedDiagnostic
  } = context;

  const effectiveRawLines = Array.isArray(rawLines) ? rawLines : rawText.split('\n');
  const typeIndex = getDocumentTypeIndex(document);
  const paramTypeIndex = getProcedureFunctionParamTypes(cleanText, typeIndex);
  const callRe = /\b([A-Za-z_][A-Za-z0-9_]*)\.([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    callRe.lastIndex = 0;
    let m;
    while ((m = callRe.exec(lines[lineIdx])) !== null) {
      const receiverLower = m[1].toLowerCase();
      const memberLower = m[2].toLowerCase();

      if (constructorNamespaces.has(receiverLower)) {
        const fullKey = `${receiverLower}.${memberLower}`;
        if (!constructorToType[fullKey]) {
          diagnostics.push(createCodedDiagnostic(
            new vscode.Range(lineIdx, m.index, lineIdx, m.index + m[1].length + 1 + m[2].length),
            `Unknown constructor: '${m[1]}.${m[2]}'`,
            vscode.DiagnosticSeverity.Error,
            'semantic.unknown_constructor'
          ));
        }
        continue;
      }

      const receiverPosition = new vscode.Position(lineIdx, m.index);
      const typeName = getVariableTypeAtPosition(document, m[1], receiverPosition, false) || paramTypeIndex.get(receiverLower);
      if (!typeName) {
        if (paramTypeIndex.has(receiverLower)) {
          continue;
        }
        const colStart = m.index + m[1].length + 1;
        diagnostics.push(createCodedDiagnostic(
          new vscode.Range(lineIdx, m.index, lineIdx, colStart + m[2].length),
          `'${m[1]}' has no known type — assign it via a recognized constructor to enable method validation`,
          vscode.DiagnosticSeverity.Information,
          /^bmd_/i.test(m[1]) ? 'semantic.unknown_identifier.bmd_prefixed' : 'semantic.unknown_receiver_type'
        ));
        continue;
      }

      const knownMethods = knownMethodsByType[typeName];
      if (knownMethods && !knownMethods.has(memberLower)) {
        if (memberLower === 'free') {
          continue;
        }
        const colStart = m.index + m[1].length + 1;
        diagnostics.push(createCodedDiagnostic(
          new vscode.Range(lineIdx, colStart, lineIdx, colStart + m[2].length),
          `'${m[2]}' is not a known method of ${typeName}`,
          vscode.DiagnosticSeverity.Warning,
          'semantic.unknown_method'
        ));
      }

      if (typeName === 'MacroModel' && (memberLower === 'getvalue' || memberLower === 'setvalue')) {
        const rawLine = effectiveRawLines[lineIdx];
        const openParenOffset = m.index + m[1].length + 1 + m[2].length;
        const afterParen = rawLine.slice(openParenOffset + 1);
        const argMatch = afterParen.match(/^\s*'([^']*)'/);
        if (argMatch) {
          const fieldName = argMatch[1];
          if (!/^(MCA|MCU|MCV)/.test(fieldName)) {
            const quoteOffset = afterParen.indexOf("'");
            const argStart = openParenOffset + 1 + quoteOffset + 1;
            diagnostics.push(createCodedDiagnostic(
              new vscode.Range(lineIdx, argStart, lineIdx, argStart + fieldName.length),
              `Model field '${fieldName}' must start with MCA, MCU or MCV`,
              vscode.DiagnosticSeverity.Error,
              'semantic.invalid_model_field_prefix'
            ));
          }
        }
      }
    }
  }
}

module.exports = {
  runObjectMethodValidationPass
};
