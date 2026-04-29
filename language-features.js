const vscode = require('vscode');
const runtime = require('./runtime');

function buildDocumentSymbols(document) {
  const definitions = Array.from(runtime.extractProcedureDefinitions(document).values())
    .sort((left, right) => left.line - right.line);

  const symbols = [];
  const lastLineIndex = Math.max(0, document.lineCount - 1);
  const lastLineChar = document.lineAt(lastLineIndex).text.length;

  for (let index = 0; index < definitions.length; index++) {
    const def = definitions[index];
    const headerLine = def.line;
    const headerText = document.lineAt(headerLine).text;
    const headerMatch = headerText.match(/^\s*(procedure|function)\s+([A-Za-z_][A-Za-z0-9_]*)/i);
    const symbolKind = headerMatch && headerMatch[1].toLowerCase() === 'function'
      ? vscode.SymbolKind.Function
      : vscode.SymbolKind.Method;
    const symbolName = headerMatch ? headerMatch[2] : def.name;
    const symbolStartChar = Math.max(0, headerText.toLowerCase().indexOf(symbolName.toLowerCase()));

    const nextDef = definitions[index + 1];
    const rangeEndLine = nextDef ? Math.max(headerLine, nextDef.line - 1) : lastLineIndex;
    const rangeEndChar = document.lineAt(rangeEndLine).text.length;
    const range = new vscode.Range(headerLine, 0, rangeEndLine, rangeEndChar);
    const selectionRange = new vscode.Range(
      headerLine,
      symbolStartChar,
      headerLine,
      symbolStartChar + symbolName.length
    );
    const detail = def.params.length > 0 ? `(${def.params.join(', ')})` : '()';

    symbols.push(new vscode.DocumentSymbol(symbolName, detail, symbolKind, range, selectionRange));
  }

  const mainLine = findMainSectionLine(document);
  if (mainLine !== -1) {
    const mainRange = new vscode.Range(mainLine, 0, lastLineIndex, lastLineChar);
    const mainSelection = new vscode.Range(mainLine, 0, mainLine, document.lineAt(mainLine).text.length);
    symbols.push(new vscode.DocumentSymbol('MAIN', '', vscode.SymbolKind.Namespace, mainRange, mainSelection));
  }

  return symbols.sort((left, right) => {
    if (left.range.start.line !== right.range.start.line) {
      return left.range.start.line - right.range.start.line;
    }
    return left.range.start.character - right.range.start.character;
  });
}

function findMainSectionLine(document) {
  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
    if (/^\s*\/\/\s*MAIN\s*$/i.test(document.lineAt(lineIndex).text)) {
      return lineIndex;
    }
  }

  return -1;
}

function getDocumentWords(document, typedPrefix) {
  const words = new Set();
  const text = document.getText();

  const assignRegex = /\b([A-Za-z_][A-Za-z0-9_]*)\s*:=/g;
  let match;
  while ((match = assignRegex.exec(text)) !== null) {
    words.add(match[1]);
  }

  const paramRegex = /(?:procedure|function)\s+[A-Za-z_][A-Za-z0-9_]*\s*\(([^)]+)\)/gi;
  while ((match = paramRegex.exec(text)) !== null) {
    const params = match[1].split(',');
    for (const param of params) {
      const paramName = param.trim();
      if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(paramName)) {
        words.add(paramName);
      }
    }
  }

  const forRegex = /\bfor\s+([A-Za-z_][A-Za-z0-9_]*)\s*:=/gi;
  while ((match = forRegex.exec(text)) !== null) {
    words.add(match[1]);
  }

  const constBlockRegex = /\bconst\b([\s\S]*?)(?=\bvar\b|\bfunction\b|\bprocedure\b|\bmain\b)/gi;
  while ((match = constBlockRegex.exec(text)) !== null) {
    const constBody = match[1];
    const constLineRegex = /\b([A-Za-z_][A-Za-z0-9_]*)\s*=/g;
    let constMatch;
    while ((constMatch = constLineRegex.exec(constBody)) !== null) {
      words.add(constMatch[1]);
    }
  }

  const varBlockRegex = /\bvar\b([\s\S]*?)(?=\bconst\b|\bfunction\b|\bprocedure\b|\bmain\b)/gi;
  while ((match = varBlockRegex.exec(text)) !== null) {
    const varBody = match[1];
    const varLineRegex = /^\s*([A-Za-z_][A-Za-z0-9_]*)/gm;
    let varMatch;
    while ((varMatch = varLineRegex.exec(varBody)) !== null) {
      words.add(varMatch[1]);
    }
  }

  const result = Array.from(words)
    .filter(w => w.toLowerCase().startsWith(typedPrefix) && w.toLowerCase() !== typedPrefix);

  return result.map(word => {
    const item = new vscode.CompletionItem(word, vscode.CompletionItemKind.Variable);
    item.sortText = `zz_${word.toLowerCase()}`;
    item.detail = '[var] document variable';
    return item;
  });
}

function registerLanguageFeatures() {
  const provider = runtime.ENABLE_COMPLETION_PROVIDER
    ? vscode.languages.registerCompletionItemProvider(
        { language: 'bmdmacro' },
        {
          provideCompletionItems(document, position) {
            const lineText = document.lineAt(position).text;
            const textBefore = lineText.substring(0, position.character);

            const dotMatch = textBefore.match(/([A-Za-z_][A-Za-z0-9_]*)\.$/);
            if (dotMatch) {
              const varName = dotMatch[1].toLowerCase();
              const typeName = runtime.getVariableTypeAtPosition(document, varName, position);
              if (!typeName || !runtime.completionItemsByType[typeName]) {
                return undefined;
              }

              const typeItems = runtime.completionItemsByType[typeName];
              if (typeName === 'MacroQuery') {
                const paramsItem = runtime.buildMissingSetParamCompletion(document, position, dotMatch[1]);
                if (paramsItem) {
                  return [paramsItem, ...typeItems];
                }
              }

              return typeItems;
            }

            const createMacroModelContext = runtime.getCreateMacroModelContext(textBefore);
            if (createMacroModelContext) {
              const modelNameItems = runtime.buildMacroModelNameCompletionItems(
                createMacroModelContext.typedPrefix,
                createMacroModelContext.insideQuote
              );
              if (modelNameItems.length > 0) {
                if (createMacroModelContext.insideQuote && typeof createMacroModelContext.replaceStartCharacter === 'number') {
                  const replaceEndCharacter = typeof createMacroModelContext.replaceEndCharacter === 'number'
                    ? createMacroModelContext.replaceEndCharacter
                    : position.character;
                  const replaceRange = new vscode.Range(
                    position.line,
                    createMacroModelContext.replaceStartCharacter,
                    position.line,
                    replaceEndCharacter
                  );
                  for (const item of modelNameItems) {
                    item.range = replaceRange;
                  }
                }
                return new vscode.CompletionList(modelNameItems, true);
              }              
            }

            // [WER979] 29.04.2026 10:29:  BMD Function-Argument-Hilfe
            const functionArgumentItems = runtime.buildFunctionArgumentCompletionItems(document, position);
            if (functionArgumentItems.length > 0) {
              return new vscode.CompletionList(functionArgumentItems, true);
            }

            if (runtime.isInsideSetSqlTextBlock(document, position) && /\+\s*$/.test(textBefore)) {
              const { baseIndent, fragmentIndent } = runtime.getSetSqlTextIndentation(document, position);
              const lineBreakAfterPlus = new vscode.CompletionItem('sql continue with bmd_lineBreak()', vscode.CompletionItemKind.Snippet);
              lineBreakAfterPlus.insertText = new vscode.SnippetString(` bmd_lineBreak() +\n${fragmentIndent}'$1'`);
              lineBreakAfterPlus.detail = '[sql] line break helper';
              lineBreakAfterPlus.documentation = new vscode.MarkdownString('Use SQL text style concatenation with `bmd_lineBreak()` and keep current indentation.');
              lineBreakAfterPlus.sortText = '00_sql_01_plus_linebreak';

              const closeOwnLine = new vscode.CompletionItem('sql close on own line', vscode.CompletionItemKind.Snippet);
              closeOwnLine.insertText = new vscode.SnippetString(`\n${baseIndent}');`);
              closeOwnLine.detail = '[sql] close string';
              closeOwnLine.documentation = new vscode.MarkdownString("Close SQL text on its own line as `');`.");
              closeOwnLine.sortText = '00_sql_02_close_ownline';

              const closeSameLine = new vscode.CompletionItem('sql close same line', vscode.CompletionItemKind.Snippet);
              closeSameLine.insertText = new vscode.SnippetString("');");
              closeSameLine.detail = '[sql] close string';
              closeSameLine.documentation = new vscode.MarkdownString('Close SQL text directly at end of current SQL fragment.');
              closeSameLine.sortText = '00_sql_03_close_sameline';

              return [lineBreakAfterPlus, closeOwnLine, closeSameLine];
            }

            const wordMatch = textBefore.match(/([A-Za-z_][A-Za-z0-9_]*)$/);
            if (!wordMatch) {
              return undefined;
            }

            const typedPrefix = wordMatch[1].toLowerCase();
            const isBmdTrigger = typedPrefix.startsWith('bmd_');
            const wordItems = getDocumentWords(document, typedPrefix);

            if (runtime.isInsideSetSqlTextBlock(document, position) && isBmdTrigger) {
              const { fragmentIndent } = runtime.getSetSqlTextIndentation(document, position);
              const lineBreakItem = new vscode.CompletionItem('bmd_lineBreak sql', vscode.CompletionItemKind.Snippet);
              lineBreakItem.insertText = new vscode.SnippetString(`bmd_lineBreak() +\n${fragmentIndent}'$1'`);
              lineBreakItem.detail = '[sql] line break helper';
              lineBreakItem.documentation = new vscode.MarkdownString('Insert SQL style line break concatenation inside `setSQLText(...)` and keep current indentation.');
              lineBreakItem.sortText = '00_sql_linebreak';
              return [lineBreakItem];
            }

            if (isBmdTrigger) {
              const items = runtime.filterCompletionsByPrefix(runtime.bmdCompletionItems, typedPrefix);
              return new vscode.CompletionList([...items], true);
            }

            const userRoutineItems = runtime.buildUserRoutineCompletionItems(document, typedPrefix);
            if (userRoutineItems.length > 0) {
              return [...userRoutineItems, ...wordItems];
            }

            if (typedPrefix.startsWith('setparam') || typedPrefix.startsWith('params')) {
              const paramsItem = runtime.buildMissingSetParamCompletion(document, position);
              if (paramsItem) {
                return [paramsItem];
              }
            }

            if (typedPrefix.startsWith('log') || 'log'.startsWith(typedPrefix)) {
              if (!runtime.hasProcedureLog(document)) {
                const logItem = new vscode.CompletionItem('log', vscode.CompletionItemKind.Snippet);
                logItem.insertText = new vscode.SnippetString("BMD_WRITETOLOGFILE(cMakroLog,'$1');");
                logItem.detail = '[log] direct logfile write';
                logItem.documentation = new vscode.MarkdownString('Suggested only when no `procedure log(...)` exists in this macro.');
                logItem.sortText = '00_log_fallback';
                return [logItem];
              }
              return wordItems.length > 0 ? wordItems : undefined;
            }

            const objectSnippetItems = runtime.filterCompletionsByPrefix(runtime.objectSnippetItems, typedPrefix);
            if (objectSnippetItems.length > 0) {
              return new vscode.CompletionList(objectSnippetItems, true);
            }

            const endsWithAliasSuffix = /(?:mgr|file|list|query|model|reader|call|val|tool)$/i.test(typedPrefix);
            if (!endsWithAliasSuffix) {
              return wordItems.length > 0 ? wordItems : undefined;
            }

            const strictAliases = runtime.filterAliasesByPrefix(runtime.constructorAliasItems, typedPrefix);

            if (/\b[A-Za-z_][A-Za-z0-9_]*\s*:=\s*[A-Za-z0-9_]*$/i.test(textBefore)) {
              return [...strictAliases, ...runtime.filterCompletionsByPrefix(runtime.assignmentCompletionItems, typedPrefix)];
            }

            return strictAliases;
          }
        },
        '.',
        '_',
        '+',
        '(',
        "'",
        ","
      )
    : { dispose() {} };

  const formatter = vscode.languages.registerDocumentFormattingEditProvider(
    { language: 'bmdmacro' },
    {
      provideDocumentFormattingEdits(document) {
        const fullText = document.getText();
        const formattedText = runtime.formatDocument(fullText);

        if (fullText === formattedText) {
          return [];
        }

        const lastLine = document.lineCount - 1;
        const lastChar = document.lineAt(lastLine).text.length;
        const fullRange = new vscode.Range(
          new vscode.Position(0, 0),
          new vscode.Position(lastLine, lastChar)
        );

        return [vscode.TextEdit.replace(fullRange, formattedText)];
      }
    }
  );

  const documentSymbolProvider = vscode.languages.registerDocumentSymbolProvider(
    { language: 'bmdmacro' },
    {
      provideDocumentSymbols(document) {
        return buildDocumentSymbols(document);
      }
    }
  );

  const hoverProvider = vscode.languages.registerHoverProvider(
    { language: 'bmdmacro' },
    {
      provideHover(document, position) {
        const procName = runtime.findProcedureAtPosition(document, position);
        if (!procName) {
          return undefined;
        }

        const definitions = runtime.extractProcedureDefinitions(document);
        const def = definitions.get(procName.toLowerCase());
        if (!def) {
          return undefined;
        }

        const signature = `${def.name}(${def.params.join(', ')})`;
        return new vscode.Hover(signature);
      }
    }
  );

  const signatureHelpProvider = vscode.languages.registerSignatureHelpProvider(
    { language: 'bmdmacro' },
    {
      provideSignatureHelp(document, position) {
        const line = document.lineAt(position.line).text;
        const textBefore = line.substring(0, position.character);

        let parenPos = -1;
        let parenCount = 0;
        for (let i = textBefore.length - 1; i >= 0; i--) {
          if (textBefore[i] === ')') {
            parenCount++;
          } else if (textBefore[i] === '(') {
            if (parenCount === 0) {
              parenPos = i;
              break;
            }
            parenCount--;
          }
        }

        if (parenPos === -1) {
          return undefined;
        }

        let start = parenPos - 1;
        while (start >= 0 && /\s/.test(line[start])) {
          start--;
        }
        const nameEnd = start + 1;
        while (start >= 0 && /[A-Za-z0-9_]/.test(line[start])) {
          start--;
        }
        start++;

        if (start >= nameEnd) {
          return undefined;
        }

        const procName = line.substring(start, nameEnd);
        const definitions = runtime.extractProcedureDefinitions(document);
        const def = definitions.get(procName.toLowerCase());
        if (!def) {
          return undefined;
        }

        const signatureInfo = new vscode.SignatureInformation(
          `${def.name}(${def.params.join(', ')})`,
          `Procedure: ${def.name}`
        );

        signatureInfo.parameters = def.params.map(param => new vscode.ParameterInformation(param));

        let activeParam = 0;
        let commaCount = 0;
        for (let i = parenPos + 1; i < position.character; i++) {
          if (line[i] === ',') {
            commaCount++;
          }
        }
        activeParam = commaCount;

        const sigHelp = new vscode.SignatureHelp();
        sigHelp.signatures = [signatureInfo];
        sigHelp.activeSignature = 0;
        sigHelp.activeParameter = activeParam;

        return sigHelp;
      }
    },
    '(',
    ','
  );

  return [provider, hoverProvider, signatureHelpProvider, formatter, documentSymbolProvider];
}

module.exports = {
  registerLanguageFeatures
};
