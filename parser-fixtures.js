const fs = require('fs');
const path = require('path');
const parser = require('./parser');

const EXPECTATIONS = new Map([
  ['invalid-foreign-syntax.mac', { expectErrors: true }],
  ['invalid-js-operators.mac', { expectErrors: true }],
  ['invalid-keywords.mac', { expectErrors: true }],
  ['invalid-var-placement.mac', { expectErrors: true }],
  ['valid-bmd-operators.mac', { expectErrors: false }],
  ['valid-bmd-prefixed-object-variable.mac', { expectErrors: false }],
  ['valid-case-labels.mac', { expectErrors: false }],
  ['valid-if-else.mac', { expectErrors: false }]
]);

const SKIPPED_FIXTURES = new Map([
  ['invalid-bmd-prefixed-identifier-typo.mac', 'semantic fixture; validated by runtime semantic passes, not the handwritten syntax parser']
]);

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

function summarizeDiagnostics(diagnostics) {
  return diagnostics.map(diagnostic => {
    return `${diagnostic.severity.toUpperCase()}: ${diagnostic.message} [${diagnostic.start}-${diagnostic.end}]`;
  });
}

function main() {
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
    if (SKIPPED_FIXTURES.has(fileName)) {
      skipped.push(`${fileName}: ${SKIPPED_FIXTURES.get(fileName)}`);
      continue;
    }

    const expectation = EXPECTATIONS.get(fileName);
    if (!expectation) {
      skipped.push(`${fileName}: no parser expectation registered`);
      continue;
    }

    const fullPath = path.join(fixtureDir, fileName);
    const rawText = fs.readFileSync(fullPath, 'utf8');
    const diagnostics = parser.collectStatementDiagnosticData(rawText);
    const hasErrors = diagnostics.some(diagnostic => diagnostic.severity === 'error');

    if (expectation.expectErrors !== hasErrors) {
      failures.push({
        fileName,
        expected: expectation.expectErrors ? 'syntax errors' : 'no syntax errors',
        actual: diagnostics.length === 0 ? 'no diagnostics' : summarizeDiagnostics(diagnostics)
      });
    }
  }

  console.log(`Fixture directory: ${fixtureDir}`);
  console.log(`Checked fixtures: ${files.length - skipped.length}`);
  console.log(`Skipped fixtures: ${skipped.length}`);

  if (skipped.length > 0) {
    console.log('Skipped:');
    for (const item of skipped) {
      console.log(`  - ${item}`);
    }
  }

  if (failures.length > 0) {
    console.error(`Parser fixture failures: ${failures.length}`);
    for (const failure of failures) {
      console.error(`\n${failure.fileName}`);
      console.error(`  expected: ${failure.expected}`);
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

  console.log('All parser fixture checks passed.');
}

main();