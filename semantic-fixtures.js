const fs = require('fs');
const Module = require('module');
const path = require('path');

const EXPECTATIONS = new Map([
  ['invalid-assignment-before-use.mac', { expectedCodes: ['semantic.unknown_identifier_expression'] }],
  ['invalid-bmd-prefixed-identifier-typo.mac', { expectedCodes: ['semantic.unknown_identifier.bmd_prefixed'] }],
  ['invalid-function-missing-result.mac', { expectedCodes: ['semantic.function_missing_result'] }],
  ['invalid-result-in-procedure.mac', { expectedCodes: ['semantic.result_in_procedure'] }],
  ['invalid-unknown-bmd-function.mac', { expectedCodes: ['semantic.unknown_bmd_function'] }],
  ['invalid-unknown-method.mac', { expectedCodes: ['semantic.unknown_method'] }],
  ['invalid-user-routine-arg-count.mac', { expectedCodes: ['semantic.user_routine_argument_count_mismatch'] }],
  ['valid-bmd-prefixed-object-variable.mac', { expectedCodes: [] }]
]);

function createVscodeStub() {
  class Position {
    constructor(line, character) {
      this.line = line;
      this.character = character;
    }

    translate(lineDelta = 0, characterDelta = 0) {
      return new Position(this.line + lineDelta, this.character + characterDelta);
    }
  }

  class Range {
    constructor(startOrLine, startOrEnd, endLine, endCharacter) {
      if (startOrLine instanceof Position && startOrEnd instanceof Position) {
        this.start = startOrLine;
        this.end = startOrEnd;
        return;
      }

      this.start = new Position(startOrLine, startOrEnd);
      this.end = new Position(endLine, endCharacter);
    }
  }

  class Diagnostic {
    constructor(range, message, severity) {
      this.range = range;
      this.message = message;
      this.severity = severity;
      this.code = undefined;
    }
  }

  class CompletionItem {
    constructor(label, kind) {
      this.label = label;
      this.kind = kind;
    }
  }

  class SnippetString {
    constructor(value) {
      this.value = value;
    }
  }

  class MarkdownString {
    constructor(value) {
      this.value = value;
    }
  }

  return {
    Position,
    Range,
    Diagnostic,
    CompletionItem,
    SnippetString,
    MarkdownString,
    CompletionItemKind: {
      Function: 1,
      Snippet: 2,
      Method: 3,
      Value: 4
    },
    DiagnosticSeverity: {
      Error: 0,
      Warning: 1,
      Information: 2,
      Hint: 3
    },
    workspace: {
      getConfiguration() {
        return {
          get(_key, defaultValue) {
            return defaultValue;
          }
        };
      }
    },
    window: {}
  };
}

function loadRuntimeWithStubbedVscode() {
  const runtimePath = path.join(__dirname, 'runtime.js');
  const originalLoad = Module._load;
  const vscodeStub = createVscodeStub();

  delete require.cache[require.resolve(runtimePath)];

  Module._load = function patchedLoad(request, parent, isMain) {
    if (request === 'vscode') {
      return vscodeStub;
    }
    return originalLoad.call(this, request, parent, isMain);
  };

  try {
    return { runtime: require(runtimePath), vscode: vscodeStub };
  } finally {
    Module._load = originalLoad;
  }
}

function buildLineOffsets(rawText) {
  const offsets = [0];
  for (let index = 0; index < rawText.length; index++) {
    if (rawText[index] === '\n') {
      offsets.push(index + 1);
    }
  }
  return offsets;
}

function createFakeDocument(rawText, fileName, vscode) {
  const lineOffsets = buildLineOffsets(rawText);
  const lines = rawText.split('\n');

  function positionAt(offset) {
    const safeOffset = Math.max(0, Math.min(offset, rawText.length));
    let low = 0;
    let high = lineOffsets.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] <= safeOffset) {
        if (mid === lineOffsets.length - 1 || lineOffsets[mid + 1] > safeOffset) {
          return new vscode.Position(mid, safeOffset - lineOffsets[mid]);
        }
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return new vscode.Position(0, safeOffset);
  }

  function offsetAt(position) {
    const line = Math.max(0, Math.min(position.line, lines.length - 1));
    const character = Math.max(0, Math.min(position.character, (lines[line] || '').length));
    return lineOffsets[line] + character;
  }

  return {
    version: 1,
    languageId: 'bmdmacro',
    fileName,
    uri: {
      toString() {
        return fileName;
      }
    },
    lineCount: lines.length,
    getText(range) {
      if (!range) {
        return rawText;
      }
      return rawText.slice(offsetAt(range.start), offsetAt(range.end));
    },
    positionAt,
    offsetAt,
    lineAt(lineOrPosition) {
      const lineIndex = typeof lineOrPosition === 'number' ? lineOrPosition : lineOrPosition.line;
      return { text: lines[lineIndex] || '' };
    }
  };
}

async function collectDiagnostics(rawText, fileName) {
  const { runtime, vscode } = loadRuntimeWithStubbedVscode();
  const document = createFakeDocument(rawText, fileName, vscode);
  const collection = {
    diagnostics: [],
    set(_uri, diagnostics) {
      this.diagnostics = diagnostics;
    },
    delete() {
      this.diagnostics = [];
    }
  };

  await runtime.validateDocument(document, collection);
  return collection.diagnostics.filter(diagnostic => typeof diagnostic.code === 'string' && diagnostic.code.startsWith('semantic.'));
}

function resolveFixtureDir() {
  const candidates = [
    process.argv[2],
    process.env.BMDMACRO_FIXTURE_DIR,
    'D:\\vscode\\Testmakros\\syntax-fixtures',
    'd:\\vscode\\Testmakros\\syntax-fixtures'
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
  }

  return null;
}

async function main() {
  const fixtureDir = resolveFixtureDir();
  if (!fixtureDir) {
    console.error('Fixture directory not found. Pass it as the first argument or set BMDMACRO_FIXTURE_DIR.');
    process.exitCode = 1;
    return;
  }

  const files = fs.readdirSync(fixtureDir)
    .filter(name => name.toLowerCase().endsWith('.mac'))
    .sort((left, right) => left.localeCompare(right));

  const failures = [];
  const skipped = [];

  for (const fileName of files) {
    const expectation = EXPECTATIONS.get(fileName);
    if (!expectation) {
      skipped.push(`${fileName}: no semantic expectation registered`);
      continue;
    }

    const fullPath = path.join(fixtureDir, fileName);
    const rawText = fs.readFileSync(fullPath, 'utf8');
    const diagnostics = await collectDiagnostics(rawText, fullPath);
    const actualCodes = [...new Set(diagnostics.map(d => d.code))].sort();
    const expectedCodes = [...new Set(expectation.expectedCodes)].sort();

    const missingCodes = expectedCodes.filter(code => !actualCodes.includes(code));
    const unexpectedCodes = expectedCodes.length === 0
      ? actualCodes
      : actualCodes.filter(code => !expectedCodes.includes(code));

    if (missingCodes.length > 0 || unexpectedCodes.length > 0) {
      failures.push({
        fileName,
        expected: expectedCodes.length === 0 ? 'no semantic diagnostic codes' : expectedCodes,
        actual: diagnostics.length === 0
          ? 'no diagnostics'
          : diagnostics.map(d => `${d.code}: ${d.message}`),
        missingCodes,
        unexpectedCodes
      });
    }
  }

  console.log(`Fixture directory: ${fixtureDir}`);
  console.log(`Checked semantic fixtures: ${files.length - skipped.length}`);
  console.log(`Skipped fixtures: ${skipped.length}`);

  if (skipped.length > 0) {
    console.log('Skipped:');
    for (const item of skipped) {
      console.log(`  - ${item}`);
    }
  }

  if (failures.length > 0) {
    console.error(`Semantic fixture failures: ${failures.length}`);
    for (const failure of failures) {
      console.error(`\n${failure.fileName}`);
      if (Array.isArray(failure.expected)) {
        console.error(`  expected codes: ${failure.expected.join(', ')}`);
      } else {
        console.error(`  expected: ${failure.expected}`);
      }
      if (failure.missingCodes && failure.missingCodes.length > 0) {
        console.error(`  missing codes: ${failure.missingCodes.join(', ')}`);
      }
      if (failure.unexpectedCodes && failure.unexpectedCodes.length > 0) {
        console.error(`  unexpected codes: ${failure.unexpectedCodes.join(', ')}`);
      }
      if (Array.isArray(failure.actual)) {
        console.error('  actual diagnostics:');
        for (const line of failure.actual) {
          console.error(`    - ${line}`);
        }
      } else {
        console.error(`  actual: ${failure.actual}`);
      }
    }
    process.exitCode = 1;
    return;
  }

  console.log('All semantic fixture checks passed.');
}

main().catch(error => {
  const message = error && error.stack ? error.stack : String(error);
  console.error(message);
  process.exitCode = 1;
});
