const { BMD_KEYWORDS: KEYWORDS } = require('./language-keywords');

const INVALID_KEYWORD_RULES = [
  { keyword: 'switch', message: "'switch' is invalid in BMD macros. Use 'case ... of' instead." },
  { keyword: 'default', message: "'default' is invalid in BMD macros. Use 'else' in a 'case' block instead." },
  { keyword: 'catch', message: "'catch' is invalid in BMD macros. Use 'except' instead." },
  { keyword: 'finally', message: "'finally' is invalid in BMD macros." },
  { keyword: 'throw', message: "'throw' is invalid in BMD macros." },
  { keyword: 'let', message: "'let' is invalid in BMD macros. Variables are introduced by assignment." },
  { keyword: 'async', message: "'async' is invalid in BMD macros." },
  { keyword: 'await', message: "'await' is invalid in BMD macros." },
  { keyword: 'import', message: "'import' is invalid in BMD macros." },
  { keyword: 'export', message: "'export' is invalid in BMD macros." },
  { keyword: 'class', message: "'class' is invalid in BMD macros." },
  { keyword: 'interface', message: "'interface' is invalid in BMD macros." },
  { keyword: 'extends', message: "'extends' is invalid in BMD macros." },
  { keyword: 'implements', message: "'implements' is invalid in BMD macros." },
  { keyword: 'null', message: "'null' is invalid in BMD macros. Use 'nil' instead." },
  { keyword: 'undefined', message: "'undefined' is invalid in BMD macros." }
];

const SIMPLE_TERMINATOR_KEYWORDS = new Set(['then', 'do', 'of', 'else', 'except', 'until']);

const BINARY_PRECEDENCE = new Map([
  ['or', 1],
  ['and', 2],
  ['=', 3],
  ['<>', 3],
  ['<', 3],
  ['>', 3],
  ['<=', 3],
  ['>=', 3],
  ['+', 4],
  ['-', 4],
  ['*', 5],
  ['/', 5]
]);

function isIdentifierStart(char) {
  return /[A-Za-z_]/.test(char);
}

function isIdentifierPart(char) {
  return /[A-Za-z0-9_]/.test(char);
}

function isDigit(char) {
  return /[0-9]/.test(char);
}

function createDiagnostic(startOffset, endOffset, message, severity, code = 'syntax.unknown') {
  return {
    start: startOffset,
    end: endOffset,
    message,
    severity,
    code
  };
}

function stripStringsAndComments(text) {
  const out = Array.from(text);
  const len = out.length;
  let index = 0;
  let inString = false;
  let inLineComment = false;
  let blockCommentEnd = null;

  while (index < len) {
    const char = out[index];

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false;
      } else {
        out[index] = ' ';
      }
      index++;
      continue;
    }

    if (blockCommentEnd) {
      if (blockCommentEnd === '}' && char === '}') {
        blockCommentEnd = null;
        out[index] = ' ';
        index++;
        continue;
      }
      if (blockCommentEnd === '*)' && char === '*' && index + 1 < len && out[index + 1] === ')') {
        blockCommentEnd = null;
        out[index] = ' ';
        out[index + 1] = ' ';
        index += 2;
        continue;
      }
      if (char !== '\n') {
        out[index] = ' ';
      }
      index++;
      continue;
    }

    if (inString) {
      if (char === "'") {
        if (index + 1 < len && out[index + 1] === "'") {
          out[index] = ' ';
          out[index + 1] = ' ';
          index += 2;
        } else {
          inString = false;
          out[index] = ' ';
          index++;
        }
      } else {
        out[index] = ' ';
        index++;
      }
      continue;
    }

    if (char === '/' && index + 1 < len && out[index + 1] === '/') {
      inLineComment = true;
      out[index] = ' ';
      out[index + 1] = ' ';
      index += 2;
      continue;
    }

    if (char === '{') {
      blockCommentEnd = '}';
      out[index] = ' ';
      index++;
      continue;
    }

    if (char === '(' && index + 1 < len && out[index + 1] === '*') {
      blockCommentEnd = '*)';
      out[index] = ' ';
      out[index + 1] = ' ';
      index += 2;
      continue;
    }

    if (char === "'") {
      inString = true;
      out[index] = ' ';
      index++;
      continue;
    }

    index++;
  }

  return out.join('');
}

function buildLineOffsets(lines) {
  const lineOffsets = [];
  let runningOffset = 0;

  for (let index = 0; index < lines.length; index++) {
    lineOffsets.push(runningOffset);
    runningOffset += lines[index].length + 1;
  }

  return lineOffsets;
}

function buildScopeIdResolver(lines, lineOffsets) {
  const routineScopes = [];
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
    let match;
    while ((match = blockTokenRe.exec(cleanLine)) !== null) {
      const token = match[1].toLowerCase();
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

  return function getScopeIdAtOffset(offset) {
    for (let index = 0; index < routineScopes.length; index++) {
      const scope = routineScopes[index];
      if (offset >= scope.startOffset && offset <= scope.endOffset) {
        return `routine:${index}`;
      }
    }
    return 'main';
  };
}

function tokenizeLine(rawLine, lineOffset) {
  const tokens = [];
  let index = 0;

  while (index < rawLine.length) {
    const char = rawLine[index];

    if (char === '/' && index + 1 < rawLine.length && rawLine[index + 1] === '/') {
      break;
    }

    if (/\s/.test(char)) {
      index++;
      continue;
    }

    if (char === '{') {
      index++;
      continue;
    }

    if (char === '}') {
      index++;
      continue;
    }

    if (char === "'") {
      const start = index;
      index++;
      while (index < rawLine.length) {
        if (rawLine[index] === "'") {
          if (index + 1 < rawLine.length && rawLine[index + 1] === "'") {
            index += 2;
            continue;
          }
          index++;
          break;
        }
        index++;
      }

      tokens.push({
        kind: 'string',
        text: rawLine.slice(start, index),
        start: start + lineOffset,
        end: index + lineOffset
      });
      continue;
    }
    if (char === '#') {
      const start = index;
      index++; // '#'

      if (index >= rawLine.length || !isDigit(rawLine[index])) {
        tokens.push({
          kind: 'invalid',
          text: '#',
          message: "Expected digits after '#'.",
          code: 'syntax.invalidcharliteral',
          start: start + lineOffset,
          end: start + 1 + lineOffset
        });
        continue;
      }

      while (index < rawLine.length && isDigit(rawLine[index])) {
        index++;
      }

      tokens.push({
        kind: 'char',
        text: rawLine.slice(start, index),
        start: start + lineOffset,
        end: index + lineOffset
      });
      continue;
    }
    if (isIdentifierStart(char)) {
      const start = index;
      index++;
      while (index < rawLine.length && isIdentifierPart(rawLine[index])) {
        index++;
      }

      const text = rawLine.slice(start, index);
      const lower = text.toLowerCase();
      tokens.push({
        kind: KEYWORDS.has(lower) ? 'keyword' : 'identifier',
        text,
        lower,
        start: start + lineOffset,
        end: index + lineOffset
      });
      continue;
    }

    if (isDigit(char)) {
      const start = index;
      index++;
      while (index < rawLine.length && /[0-9.]/.test(rawLine[index])) {
        index++;
      }

      tokens.push({
        kind: 'number',
        text: rawLine.slice(start, index),
        start: start + lineOffset,
        end: index + lineOffset
      });
      continue;
    }

    const fourChar = rawLine.slice(index, index + 4);
    if (fourChar === '!==') {
      tokens.push({
        kind: 'invalid',
        text: fourChar,
        message: "'!==' is invalid in BMD macros. Use '<>' for inequality.",
        code: 'syntax.invalid_operator_strict_not_equal',
        start: index + lineOffset,
        end: index + 4 + lineOffset
      });
      index += 4;
      continue;
    }

    const threeChar = rawLine.slice(index, index + 3);
    if (threeChar === '===') {
      tokens.push({
        kind: 'invalid',
        text: threeChar,
        message: "'===' is invalid in BMD macros. Use '=' for comparison.",
        code: 'syntax.invalid_operator_strict_equal',
        start: index + lineOffset,
        end: index + 3 + lineOffset
      });
      index += 3;
      continue;
    }

    const twoChar = rawLine.slice(index, index + 2);
    if (twoChar === '!=') {
      tokens.push({
        kind: 'invalid',
        text: twoChar,
        message: "'!=' is invalid in BMD macros. Use '<>' for inequality.",
        code: 'syntax.invalid_operator_not_equal',
        start: index + lineOffset,
        end: index + 2 + lineOffset
      });
      index += 2;
      continue;
    }

    if (twoChar === '==') {
      tokens.push({
        kind: 'invalid',
        text: twoChar,
        message: "'==' is invalid in BMD macros. Use '=' for comparison and ':=' for assignment.",
        code: 'syntax.invalid_operator_equal_equal',
        start: index + lineOffset,
        end: index + 2 + lineOffset
      });
      index += 2;
      continue;
    }

    if (twoChar === '&&') {
      tokens.push({
        kind: 'invalid',
        text: twoChar,
        message: "'&&' is invalid in BMD macros. Use 'and'.",
        code: 'syntax.invalid_operator_and_and',
        start: index + lineOffset,
        end: index + 2 + lineOffset
      });
      index += 2;
      continue;
    }

    if (twoChar === '||') {
      tokens.push({
        kind: 'invalid',
        text: twoChar,
        message: "'||' is invalid in BMD macros. Use 'or'.",
        code: 'syntax.invalid_operator_or_or',
        start: index + lineOffset,
        end: index + 2 + lineOffset
      });
      index += 2;
      continue;
    }

    if (twoChar === '++') {
      tokens.push({
        kind: 'invalid',
        text: twoChar,
        message: "'++' is invalid in BMD macros. Use ':=' with '+ 1' instead.",
        code: 'syntax.invalid_operator_increment',
        start: index + lineOffset,
        end: index + 2 + lineOffset
      });
      index += 2;
      continue;
    }

    if (twoChar === '--') {
      tokens.push({
        kind: 'invalid',
        text: twoChar,
        message: "'--' is invalid in BMD macros. Use ':=' with '- 1' instead.",
        code: 'syntax.invalid_operator_decrement',
        start: index + lineOffset,
        end: index + 2 + lineOffset
      });
      index += 2;
      continue;
    }

    if (twoChar === '??') {
      tokens.push({
        kind: 'invalid',
        text: twoChar,
        message: "'??' is invalid in BMD macros. Use explicit if/then logic instead.",
        code: 'syntax.invalid_operator_nullish',
        start: index + lineOffset,
        end: index + 2 + lineOffset
      });
      index += 2;
      continue;
    }

    if (twoChar === '=>') {
      tokens.push({
        kind: 'invalid',
        text: twoChar,
        message: "'=>' is invalid in BMD macros.",
        code: 'syntax.invalid_operator_arrow',
        start: index + lineOffset,
        end: index + 2 + lineOffset
      });
      index += 2;
      continue;
    }

    if ([':=', '<=', '>=', '<>'].includes(twoChar)) {
      tokens.push({
        kind: 'symbol',
        text: twoChar,
        start: index + lineOffset,
        end: index + 2 + lineOffset
      });
      index += 2;
      continue;
    }

    if ('()[],;.+-*/=<>:'.includes(char)) {
      tokens.push({
        kind: 'symbol',
        text: char,
        start: index + lineOffset,
        end: index + 1 + lineOffset
      });
      index++;
      continue;
    }

    if (char === '!' && rawLine[index + 1] !== '=') {
      tokens.push({
        kind: 'invalid',
        text: char,
        message: "'!' is invalid in BMD macros. Use 'not'.",
        code: 'syntax.invalid_operator_bang',
        start: index + lineOffset,
        end: index + 1 + lineOffset
      });
      index++;
      continue;
    }

    if (char === '?') {
      tokens.push({
        kind: 'invalid',
        text: char,
        message: "Ternary '?:' is invalid in BMD macros. Use if ... then ... else instead.",
        code: 'syntax.invalid_operator_ternary',
        start: index + lineOffset,
        end: index + 1 + lineOffset
      });
      index++;
      continue;
    }

    tokens.push({
      kind: 'unknown',
      text: char,
      start: index + lineOffset,
      end: index + 1 + lineOffset
    });
    index++;
  }

  return tokens;
}

function isCaseLabelToken(token) {
  if (!token) {
    return false;
  }

  return token.kind === 'string' || token.kind === 'number' || token.kind === 'identifier' || token.kind === 'char';
}

function looksLikeCaseLabelLine(tokens) {
  if (!Array.isArray(tokens) || tokens.length < 2) {
    return false;
  }

  let index = 0;
  if (!isCaseLabelToken(tokens[index])) {
    return false;
  }

  index++;
  while (index < tokens.length) {
    const token = tokens[index];
    if (token.kind === 'symbol' && token.text === ',') {
      index++;
      if (!isCaseLabelToken(tokens[index])) {
        return false;
      }
      index++;
      continue;
    }

    return token.kind === 'symbol' && token.text === ':';
  }

  return false;
}

class LineParser {
  constructor(tokens) {
    this.tokens = tokens;
    this.index = 0;
  }

  current() {
    return this.tokens[this.index] || null;
  }

  lookahead(offset = 1) {
    return this.tokens[this.index + offset] || null;
  }

  advance() {
    const token = this.current();
    if (token) {
      this.index++;
    }
    return token;
  }

  atEnd() {
    return this.index >= this.tokens.length;
  }

  matchSymbol(symbol) {
    const token = this.current();
    if (token && token.kind === 'symbol' && token.text === symbol) {
      this.index++;
      return true;
    }
    return false;
  }

  matchKeyword(keyword) {
    const token = this.current();
    if (token && token.kind === 'keyword' && token.lower === keyword) {
      this.index++;
      return true;
    }
    return false;
  }

  expectIdentifier(message) {
    const token = this.current();
    if (token && token.kind === 'identifier') {
      this.index++;
      return token;
    }

    throw this.errorAtCurrent(message || 'Expected identifier.', 'syntax.expected_identifier');
  }

  errorAtCurrent(message, code = 'syntax.unexpected_token') {
    const token = this.current() || this.tokens[this.tokens.length - 1] || { start: 0, end: 1, text: '' };
    return {
      message,
      start: token.start,
      end: token.end,
      code
    };
  }

  parseStatementList() {
    let lastStatement = null;

    while (!this.atEnd()) {
      const statement = this.parseStatement();
      lastStatement = statement;

      if (this.matchSymbol(';')) {
        lastStatement.hasTerminator = true;
        continue;
      }

      break;
    }

    return lastStatement;
  }

  parseStatement() {
    const token = this.current();
    if (!token) {
      throw this.errorAtCurrent('Expected statement.');
    }

    if (token.kind === 'invalid') {
      throw this.errorAtCurrent(token.message || `Unexpected token '${token.text}'.`, token.code || 'syntax.unexpected_token');
    }

    if (token.kind === 'unknown') {
      throw this.errorAtCurrent(`Unexpected token '${token.text}'.`, 'syntax.unexpected_token');
    }

    if (token.kind === 'keyword') {
      switch (token.lower) {
        case 'if':
          return this.parseIf();
        case 'while':
          return this.parseWhile();
        case 'for':
          return this.parseFor();
        case 'case':
          return this.parseCase();
        case 'begin':
          return this.parseBegin();
        case 'end':
          this.advance();
          return { kind: 'end', requiresSemicolon: false, hasTerminator: false };
        case 'else':
          return this.parseElse();
        case 'repeat':
          this.advance();
          return { kind: 'repeat', requiresSemicolon: false, hasTerminator: false };
        case 'until':
          return this.parseUntil();
        case 'try':
          return this.parseTry();
        case 'except':
          return this.parseExcept();
        case 'procedure':
        case 'function':
          return this.parseRoutineHeader();
        case 'return':
          return this.parseReturn();
        case 'break':
        case 'continue':
        case 'exit':
          this.advance();
          return { kind: token.lower, requiresSemicolon: false, hasTerminator: false };
        case 'const':
          return this.parseConstHeaderOrInline();
        case 'var':
          return this.parseVarHeaderOrInline();
        default:
          throw this.errorAtCurrent(`Unexpected token '${token.text}'.`, 'syntax.unexpected_token');
      }
    }

    if (token.kind === 'identifier') {
      return this.parseIdentifierLedStatement();
    }

    throw this.errorAtCurrent(`Unexpected token '${token.text}'.`, 'syntax.unexpected_token');
  }

  parseIf() {
    this.advance();
    this.parseExpression(new Set(['then']));

    const token = this.current();
    if (token && token.kind === 'symbol' && token.text === ':=') {
      throw {
        message: "Use '=' for comparison in if conditions; ':=' is only valid for assignment",
        start: token.start,
        end: token.end,
        code: 'syntax.if_assignment_operator_in_condition'
      };
    }

    if (token && token.kind === 'keyword' && token.lower === 'do') {
      throw {
        message: "Use 'then' with 'if'; 'do' is only valid for 'while' and 'for'",
        start: token.start,
        end: token.end,
        code: 'syntax.if_used_do'
      };
    }

    if (!this.matchKeyword('then')) {
      throw this.errorAtCurrent("Expected 'then' after if condition.", 'syntax.if_expected_then');
    }

    if (!this.atEnd()) {
      this.parseStatement();
    }

    if (this.matchKeyword('else') && !this.atEnd()) {
      this.parseStatement();
    }

    return { kind: 'if', requiresSemicolon: false, hasTerminator: false };
  }

  parseWhile() {
    this.advance();
    this.parseExpression(new Set(['do']));

    const token = this.current();
    if (token && token.kind === 'keyword' && token.lower === 'then') {
      throw {
        message: "Use 'do' with 'while'/'for'; 'then' is only valid for 'if'",
        start: token.start,
        end: token.end,
        code: 'syntax.loop_used_then'
      };
    }

    if (!this.matchKeyword('do')) {
      throw this.errorAtCurrent("Expected 'do' after while condition.", 'syntax.while_expected_do');
    }

    if (!this.atEnd()) {
      this.parseStatement();
    }

    return { kind: 'while', requiresSemicolon: false, hasTerminator: false };
  }

  parseFor() {
    this.advance();
    this.expectIdentifier("Expected loop variable after 'for'.");
    if (!this.matchSymbol(':=')) {
      throw this.errorAtCurrent("Expected ':=' after for-loop variable.", 'syntax.for_expected_assignment_operator');
    }

    this.parseExpression(new Set(['to', 'downto']));
    if (!(this.matchKeyword('to') || this.matchKeyword('downto'))) {
      throw this.errorAtCurrent("Expected 'to' or 'downto' in for loop.", 'syntax.for_expected_to_or_downto');
    }

    this.parseExpression(new Set(['do']));

    const token = this.current();
    if (token && token.kind === 'keyword' && token.lower === 'then') {
      throw {
        message: "Use 'do' with 'while'/'for'; 'then' is only valid for 'if'",
        start: token.start,
        end: token.end,
        code: 'syntax.loop_used_then'
      };
    }

    if (!this.matchKeyword('do')) {
      throw this.errorAtCurrent("Expected 'do' after for loop range.", 'syntax.for_expected_do');
    }

    if (!this.atEnd()) {
      this.parseStatement();
    }

    return { kind: 'for', requiresSemicolon: false, hasTerminator: false };
  }

  parseCase() {
    this.advance();
    this.parseExpression(new Set(['of']));
    if (!this.matchKeyword('of')) {
      throw this.errorAtCurrent("Expected 'of' after case expression.", 'syntax.case_expected_of');
    }
    return { kind: 'case', requiresSemicolon: false, hasTerminator: false };
  }

  parseBegin() {
    this.advance();

    if (!this.atEnd()) {
      this.parseStatementList();
    }

    return { kind: 'begin', requiresSemicolon: false, hasTerminator: false };
  }

  parseElse() {
    this.advance();
    if (!this.atEnd()) {
      this.parseStatement();
    }
    return { kind: 'else', requiresSemicolon: false, hasTerminator: false };
  }

  parseUntil() {
    this.advance();
    this.parseExpression(new Set());
    return { kind: 'until', requiresSemicolon: false, hasTerminator: false };
  }

  parseTry() {
    this.advance();
    if (!this.atEnd()) {
      this.parseStatementList();
    }
    return { kind: 'try', requiresSemicolon: false, hasTerminator: false };
  }

  parseExcept() {
    this.advance();
    if (!this.atEnd()) {
      this.parseStatementList();
    }
    return { kind: 'except', requiresSemicolon: false, hasTerminator: false };
  }

  parseRoutineHeader() {
    const kind = this.advance();
    this.expectIdentifier(`Expected routine name after '${kind.text}'.`);
    if (this.matchSymbol('(')) {
      // Routine signatures may include parameter type annotations (e.g. aText : String)
      // and are validated loosely here to avoid false positives on declaration lines.
      let parenDepth = 1;
      while (!this.atEnd() && parenDepth > 0) {
        if (this.matchSymbol('(')) {
          parenDepth++;
          continue;
        }
        if (this.matchSymbol(')')) {
          parenDepth--;
          continue;
        }
        this.advance();
      }

      if (parenDepth !== 0) {
        throw this.errorAtCurrent("Expected ')' to close parameter list.", 'syntax.expected_closing_parenthesis');
      }
    }

    // Allow compact routine style: procedure Foo(a) begin
    this.matchKeyword('begin');

    return { kind: kind.lower, requiresSemicolon: false, hasTerminator: false };
  }

  parseReturn() {
    this.advance();
    if (!this.atEnd() && !this.peekKeywordBoundary()) {
      this.parseExpression(new Set());
    }
    return { kind: 'return', requiresSemicolon: true, hasTerminator: false };
  }

  parseConstHeaderOrInline() {
    this.advance();
    if (!this.atEnd()) {
      this.parseConstDeclarationBody();
      return { kind: 'const-decl', requiresSemicolon: true, hasTerminator: false };
    }
    return { kind: 'const-header', requiresSemicolon: false, hasTerminator: false };
  }

  parseVarHeaderOrInline() {
    this.advance();
    if (!this.atEnd()) {
      this.parseVarDeclarationBody();
      return { kind: 'var-decl', requiresSemicolon: false, hasTerminator: false };
    }
    return { kind: 'var-header', requiresSemicolon: false, hasTerminator: false };
  }

  parseConstDeclarationBody() {
    this.expectIdentifier('Expected constant name.');
    if (!this.matchSymbol('=')) {
      throw this.errorAtCurrent("Expected '=' in const declaration.", 'syntax.const_expected_equals');
    }
    this.parseExpression(new Set());
  }

  parseVarDeclarationBody() {
    this.expectIdentifier('Expected variable name.');
    while (this.matchSymbol(',')) {
      this.expectIdentifier('Expected variable name after comma.');
    }

    if (this.matchSymbol(':')) {
      if (this.atEnd()) {
        throw this.errorAtCurrent('Expected type name after colon in var declaration.', 'syntax.var_expected_type');
      }

      while (!this.atEnd() && !this.peekSymbol(';')) {
        const token = this.current();
        if (token.kind === 'unknown') {
          throw this.errorAtCurrent(`Unexpected token '${token.text}'.`, 'syntax.unexpected_token');
        }
        this.advance();
      }
    }
  }

  parseIdentifierLedStatement() {
    const first = this.advance();

    if (this.peekSymbol('=')) {
      throw {
        message: `Invalid assignment '${first.text} = ...'. Use ':=' outside const blocks.`,
        start: first.start,
        end: first.end,
        code: 'syntax.assignment_expected_colon_equals'
      };
    }

    this.parsePostfixChain();

    if (this.matchSymbol(':=')) {
      this.parseExpression(new Set());
      return { kind: 'assignment', requiresSemicolon: true, hasTerminator: false };
    }

    if (this.lastConsumedWasCall) {
      return { kind: 'call', requiresSemicolon: true, hasTerminator: false };
    }

    throw {
      message: `Unexpected token '${first.text}'.`,
      start: first.start,
      end: first.end,
      code: 'syntax.unexpected_token'
    };
  }

  parsePostfixChain() {
    this.lastConsumedWasCall = false;
    while (true) {
      if (this.matchSymbol('.')) {
        this.expectIdentifier("Expected member name after '.'.");
        continue;
      }

      if (this.matchSymbol('(')) {
        this.parseArgumentList(')');
        if (!this.matchSymbol(')')) {
          throw this.errorAtCurrent("Expected ')' to close argument list.", 'syntax.expected_closing_parenthesis');
        }
        this.lastConsumedWasCall = true;
        continue;
      }

      break;
    }
  }

  parseArgumentList(terminator) {
    if (this.peekSymbol(terminator)) {
      return;
    }

    while (!this.atEnd()) {
      this.parseExpression(new Set([',', terminator]));
      if (!this.matchSymbol(',')) {
        break;
      }
    }
  }

  parseExpression(stopKeywords) {
    this.parseBinaryExpression(0, stopKeywords);
  }

  parseBinaryExpression(minPrecedence, stopKeywords) {
    this.parseUnaryExpression(stopKeywords);

    while (!this.atEnd()) {
      const token = this.current();
      if (this.isExpressionStop(token, stopKeywords)) {
        return;
      }

      const operator = this.getBinaryOperator(token);
      if (!operator) {
        return;
      }

      const precedence = BINARY_PRECEDENCE.get(operator);
      if (precedence < minPrecedence) {
        return;
      }

      this.advance();
      this.parseBinaryExpression(precedence + 1, stopKeywords);
    }
  }

  parseUnaryExpression(stopKeywords) {
    const token = this.current();
    if (!token || this.isExpressionStop(token, stopKeywords)) {
      throw this.errorAtCurrent('Expected expression.', 'syntax.expected_expression');
    }

    if (token.kind === 'keyword' && token.lower === 'not') {
      this.advance();
      this.parseUnaryExpression(stopKeywords);
      return;
    }

    if (token.kind === 'symbol' && (token.text === '+' || token.text === '-')) {
      this.advance();
      this.parseUnaryExpression(stopKeywords);
      return;
    }

    this.parsePrimary(stopKeywords);
  }

  parsePrimary(stopKeywords) {
    const token = this.current();
    if (!token || this.isExpressionStop(token, stopKeywords)) {
      throw this.errorAtCurrent('Expected expression.', 'syntax.expected_expression');
    }

    if (token.kind === 'number' || token.kind === 'string' || token.kind === 'char'){
      this.advance();
      return;
    }

    if (token.kind === 'keyword' && token.lower === 'nil') {
      this.advance();
      return;
    }

    if (token.kind === 'identifier') {
      this.advance();
      this.parsePostfixChain();
      return;
    }

    if (token.kind === 'symbol' && token.text === '(') {
      this.advance();
      this.parseExpression(new Set([')']));
      if (!this.matchSymbol(')')) {
        throw this.errorAtCurrent("Expected ')' to close expression.", 'syntax.expected_closing_parenthesis');
      }
      this.parsePostfixChain();
      return;
    }

    throw this.errorAtCurrent(`Unexpected token '${token.text}'.`, 'syntax.unexpected_token');
  }

  isExpressionStop(token, stopKeywords) {
    if (!token) {
      return true;
    }
    if (token.kind === 'symbol' && (token.text === ';' || token.text === ',' || token.text === ')')) {
      return true;
    }
    if (token.kind === 'keyword' && (stopKeywords.has(token.lower) || SIMPLE_TERMINATOR_KEYWORDS.has(token.lower))) {
      return true;
    }
    return false;
  }

  getBinaryOperator(token) {
    if (!token) {
      return null;
    }
    if (token.kind === 'symbol' && BINARY_PRECEDENCE.has(token.text)) {
      return token.text;
    }
    if (token.kind === 'keyword' && BINARY_PRECEDENCE.has(token.lower)) {
      return token.lower;
    }
    return null;
  }

  peekSymbol(symbol) {
    const token = this.current();
    return !!token && token.kind === 'symbol' && token.text === symbol;
  }

  peekKeywordBoundary() {
    const token = this.current();
    return !!token && token.kind === 'keyword' && SIMPLE_TERMINATOR_KEYWORDS.has(token.lower);
  }
}

function computeDeclarationInfo(rawLines, lines, lineOffsets, getScopeIdAtOffset) {
  const constDeclLineIdx = new Set();
  const routineDeclLineIdx = new Set();
  const validTopLevelVarLineIdx = new Set();
  const varDeclLineIdx = new Set();
  let inConstBlock = false;
  let inRoutineDeclaration = false;
  let declarationAreaOpen = true;
  let inTopLevelConstBlock = false;
  let inTopLevelVarBlock = false;

  for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
    const rawLine = rawLines[lineIdx].replace(/\r$/, '');
    const cleanLine = lines[lineIdx] || '';

    if (/^\s*(procedure|function)\b/i.test(cleanLine)) {
      inRoutineDeclaration = true;
      routineDeclLineIdx.add(lineIdx);
    } else if (inRoutineDeclaration) {
      routineDeclLineIdx.add(lineIdx);
    }

    if (inRoutineDeclaration && /\bbegin\b/i.test(cleanLine)) {
      inRoutineDeclaration = false;
    }

    if (/^\s*const\b/i.test(rawLine)) {
      inConstBlock = true;
      inTopLevelConstBlock = true;
      const inlinePart = rawLine.replace(/^\s*const\s*/i, '');
      if (/^\s*[A-Za-z_][A-Za-z0-9_]*\s*=(?!=|>|:)/.test(inlinePart)) {
        constDeclLineIdx.add(lineIdx);
      }
      continue;
    }

    if (/^\s*(\/\/.*)?$/.test(rawLine) || cleanLine.trim() === '') {
      continue;
    }

    if (inConstBlock) {
      if (/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=(?!=|>|:)/.test(rawLine)) {
        constDeclLineIdx.add(lineIdx);
      } else {
        inConstBlock = false;
      }
    }

    if (/^\s*(\/\/.*)?$/.test(rawLine) || cleanLine.trim() === '') {
      continue;
    }

    const lineOffset = lineOffsets[lineIdx];
    const inRoutineBody = getScopeIdAtOffset(lineOffset) !== 'main';
    if (routineDeclLineIdx.has(lineIdx) || inRoutineBody) {
      declarationAreaOpen = false;
      inTopLevelConstBlock = false;
      inTopLevelVarBlock = false;
      continue;
    }

    if (!declarationAreaOpen) {
      continue;
    }

    if (inTopLevelConstBlock) {
      if (/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=(?!=|>|:)/.test(rawLine)) {
        continue;
      }
      inTopLevelConstBlock = false;
    }

    if (inTopLevelVarBlock) {
      if (/^\s*[A-Za-z_][A-Za-z0-9_]*(?:\s*,\s*[A-Za-z_][A-Za-z0-9_]*)*(?:\s*:(?!=)\s*[^;]+)?\s*;?\s*$/.test(rawLine)) {
        varDeclLineIdx.add(lineIdx);
        continue;
      }
      inTopLevelVarBlock = false;
    }

    if (/^\s*const\b/i.test(rawLine)) {
      inTopLevelConstBlock = true;
      continue;
    }

    if (/^\s*var\b/i.test(rawLine)) {
      validTopLevelVarLineIdx.add(lineIdx);
      inTopLevelVarBlock = true;
      continue;
    }

    if (/^\s*(procedure|function)\b/i.test(cleanLine)) {
      declarationAreaOpen = false;
      continue;
    }

    declarationAreaOpen = false;
  }

  return {
    constDeclLineIdx,
    routineDeclLineIdx,
    validTopLevelVarLineIdx,
    varDeclLineIdx
  };
}

function collectDocumentStructureDiagnosticData(rawText, cleanText, lines, lineOffsets) {
  const diagnostics = [];

  // begin/case/end balance
  {
    const blockStack = [];
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const tokenRe = /\b(begin|case|end)\b/gi;
      let match;
      while ((match = tokenRe.exec(lines[lineIdx])) !== null) {
        const token = match[1].toLowerCase();
        if (token === 'begin' || token === 'case') {
          blockStack.push(token);
        } else if (blockStack.length === 0) {
          diagnostics.push(createDiagnostic(
            lineOffsets[lineIdx] + match.index,
            lineOffsets[lineIdx] + match.index + 3,
            "'end' without matching 'begin' or 'case'",
            'warning',
            'syntax.unmatched_end'
          ));
        } else {
          blockStack.pop();
        }
      }
    }
  }

  // unclosed block comments ({...} and (*...*))
  {
    let inString = false;
    let inLineComment = false;
    let blockCommentEnd = null;
    let blockCommentStart = -1;
    for (let index = 0; index < rawText.length; index++) {
      const ch = rawText[index];

      if (inLineComment) {
        if (ch === '\n') {
          inLineComment = false;
        }
        continue;
      }

      if (blockCommentEnd) {
        if (blockCommentEnd === '}' && ch === '}') {
          blockCommentEnd = null;
          continue;
        }
        if (blockCommentEnd === '*)' && ch === '*' && index + 1 < rawText.length && rawText[index + 1] === ')') {
          blockCommentEnd = null;
          index++;
          continue;
        }
        continue;
      }

      if (inString) {
        if (ch === "'") {
          if (index + 1 < rawText.length && rawText[index + 1] === "'") {
            index++;
          } else {
            inString = false;
          }
        }
        continue;
      }

      if (ch === '/' && index + 1 < rawText.length && rawText[index + 1] === '/') {
        inLineComment = true;
        index++;
        continue;
      }

      if (ch === '{') {
        blockCommentEnd = '}';
        blockCommentStart = index;
        continue;
      }

      if (ch === '(' && index + 1 < rawText.length && rawText[index + 1] === '*') {
        blockCommentEnd = '*)';
        blockCommentStart = index;
        index++;
        continue;
      }

      if (ch === "'") {
        inString = true;
      }
    }

    if (blockCommentEnd) {
      diagnostics.push(createDiagnostic(
        blockCommentStart,
        Math.min(rawText.length, blockCommentStart + (blockCommentEnd === '}' ? 1 : 2)),
        blockCommentEnd === '}' ? "Unclosed block comment '{'" : "Unclosed block comment '(*'",
        'error',
        'syntax.unclosed_block_comment'
      ));
    }
  }

  // unbalanced parentheses
  {
    const openStack = [];
    for (let index = 0; index < cleanText.length; index++) {
      const ch = cleanText[index];
      if (ch === '(') {
        openStack.push(index);
      } else if (ch === ')') {
        if (openStack.length === 0) {
          diagnostics.push(createDiagnostic(
            index,
            index + 1,
            "Unmatched closing parenthesis ')'",
            'warning',
            'syntax.unmatched_closing_parenthesis'
          ));
        } else {
          openStack.pop();
        }
      }
    }

    if (openStack.length > 0) {
      const lastOpen = openStack[openStack.length - 1];
      diagnostics.push(createDiagnostic(
        lastOpen,
        lastOpen + 1,
        "Unmatched opening parenthesis '('",
        'warning',
        'syntax.unmatched_opening_parenthesis'
      ));
    }
  }

  return diagnostics;
}

function endsWithOpenExpression(tokens) {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    return false;
  }

  let parenDepth = 0;
  for (const token of tokens) {
    if (token.kind === 'symbol') {
      if (token.text === '(') {
        parenDepth++;
      } else if (token.text === ')') {
        parenDepth = Math.max(0, parenDepth - 1);
      }
    }
  }

  if (parenDepth > 0) {
    return true;
  }

  const lastToken = tokens[tokens.length - 1];
  if (!lastToken) {
    return false;
  }

  if (lastToken.kind === 'keyword' && (lastToken.lower === 'and' || lastToken.lower === 'or' || lastToken.lower === 'not')) {
    return true;
  }

  if (lastToken.kind === 'symbol' && ['+', '-', '*', '/', '=', '<>', '<', '>', '<=', '>=', '('].includes(lastToken.text)) {
    return true;
  }

  return false;
}

function hasTopLevelKeyword(tokens, keyword) {
  let parenDepth = 0;

  for (const token of tokens) {
    if (token.kind === 'symbol') {
      if (token.text === '(') {
        parenDepth++;
        continue;
      }

      if (token.text === ')') {
        parenDepth = Math.max(0, parenDepth - 1);
        continue;
      }
    }

    if (
      parenDepth === 0 &&
      token.kind === 'keyword' &&
      token.lower === keyword
    ) {
      return true;
    }
  }

  return false;
}



function collectStatementDiagnosticData(rawText, options = {}) {
  const safeRawText = typeof rawText === 'string' ? rawText : '';
  const cleanText =
    typeof options.cleanText === 'string'
      ? options.cleanText
      : stripStringsAndComments(safeRawText);

  const lines = String(cleanText).split('\n');
  const rawLines = String(safeRawText).split('\n');
  const maxLineCount = Math.max(lines.length, rawLines.length);

  while (lines.length < maxLineCount) lines.push('');
  while (rawLines.length < maxLineCount) rawLines.push('');

  const lineOffsets = Array.isArray(options.lineOffsets)
    ? options.lineOffsets
    : buildLineOffsets(lines);

  const getScopeIdAtOffset =
    typeof options.getScopeIdAtOffset === 'function'
      ? options.getScopeIdAtOffset
      : buildScopeIdResolver(lines, lineOffsets);

  const diagnostics = collectDocumentStructureDiagnosticData(
    safeRawText,
    cleanText,
    lines,
    lineOffsets
  );

  const {
    constDeclLineIdx,
    routineDeclLineIdx,
    validTopLevelVarLineIdx,
    varDeclLineIdx
  } = computeDeclarationInfo(rawLines, lines, lineOffsets, getScopeIdAtOffset);

  let inConstSection = false;
  let inVarSection = false;
  let inStringConcatenationContinuation = false;

  for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
    const rawLine = rawLines[lineIdx].replace(/\r$/, '');
    const cleanLine = lines[lineIdx];

    if (!rawLine.trim() || !cleanLine.trim()) {
      continue;
    }

    if (/^\s*\/\//.test(rawLine)) {
      continue;
    }

    if (/^\s*(end|else)\b/i.test(rawLine)) {
      continue;
    }

    for (const rule of INVALID_KEYWORD_RULES) {
      const invalidKeywordRe = new RegExp(`\\b${rule.keyword}\\b`, 'i');
      const match = invalidKeywordRe.exec(cleanLine);
      if (!match) {
        continue;
      }

      const prevChar = match.index > 0 ? cleanLine[match.index - 1] : '';
      if (prevChar === '.') {
        continue;
      }

      diagnostics.push(
        createDiagnostic(
          lineOffsets[lineIdx] + match.index,
          lineOffsets[lineIdx] + match.index + match[0].length,
          rule.message,
          'error',
          `syntax.invalidkeyword.${rule.keyword}`
        )
      );
    }

    const lineOffset = lineOffsets[lineIdx];
    const inRoutineBody = getScopeIdAtOffset(lineOffset) !== 'main';

    let tokens = tokenizeLine(rawLine, lineOffset);
    if (tokens.length === 0) {
      continue;
    }

    if (looksLikeCaseLabelLine(tokens)) {
      continue;
    }

    let firstToken = tokens[0];
    let hasStringLikeToken = tokens.some(
      token => token.kind === 'string' || token.kind === 'char'
    );
    let lastToken = tokens[tokens.length - 1];
    let lineEndsWithConcatOperator =
      !!lastToken && lastToken.kind === 'symbol' && lastToken.text === '+';

    if (inStringConcatenationContinuation) {
      inStringConcatenationContinuation = lineEndsWithConcatOperator;
      continue;
    }

    if (hasStringLikeToken && lineEndsWithConcatOperator) {
      inStringConcatenationContinuation = true;
      continue;
    }

    if (
      firstToken.kind === 'keyword' &&
      (firstToken.lower === 'if' ||
        firstToken.lower === 'while' ||
        firstToken.lower === 'for')
    ) {
      const terminator =
        firstToken.lower === 'if'
          ? 'then'
          : 'do';

      const shouldCollectMultilineHeader =
        !hasTopLevelKeyword(tokens, terminator) ||
        endsWithOpenExpression(tokens, terminator);

      if (shouldCollectMultilineHeader) {
        let lookaheadLineIdx = lineIdx;

        while (
          !hasTopLevelKeyword(tokens, terminator) &&
          lookaheadLineIdx + 1 < rawLines.length
        ) {
          lookaheadLineIdx++;
          const nextRawLine = rawLines[lookaheadLineIdx].replace(/\r$/, '');
          const nextCleanLine = lines[lookaheadLineIdx];

          if (!nextRawLine.trim() || !nextCleanLine.trim()) {
            continue;
          }

          if (/^\s*\/\//.test(nextRawLine)) {
            continue;
          }

          if (/^\s*(end|else)\b/i.test(nextRawLine)) {
            continue;
          }

          for (const rule of INVALID_KEYWORD_RULES) {
            const invalidKeywordRe = new RegExp(`\\b${rule.keyword}\\b`, 'i');
            const match = invalidKeywordRe.exec(nextCleanLine);
            if (!match) {
              continue;
            }

            const prevChar = match.index > 0 ? nextCleanLine[match.index - 1] : '';
            if (prevChar === '.') {
              continue;
            }

            diagnostics.push(
              createDiagnostic(
                lineOffsets[lookaheadLineIdx] + match.index,
                lineOffsets[lookaheadLineIdx] + match.index + match[0].length,
                rule.message,
                'error',
                `syntax.invalidkeyword.${rule.keyword}`
              )
            );
          }

          const nextTokens = tokenizeLine(nextRawLine, lineOffsets[lookaheadLineIdx]);
          if (nextTokens.length === 0) {
            continue;
          }

          tokens = tokens.concat(nextTokens);
          lineIdx = lookaheadLineIdx;
        }

        if (tokens.length === 0) {
          continue;
        }

        firstToken = tokens[0];
        hasStringLikeToken = tokens.some(
          token => token.kind === 'string' || token.kind === 'char'
        );
        lastToken = tokens[tokens.length - 1];
        lineEndsWithConcatOperator =
          !!lastToken && lastToken.kind === 'symbol' && lastToken.text === '+';
      }
    }

    if (firstToken.kind === 'keyword' && firstToken.lower === 'var') {
      if (routineDeclLineIdx.has(lineIdx) || inRoutineBody) {
        diagnostics.push(
          createDiagnostic(
            firstToken.start,
            firstToken.end,
            'var is only valid at macro top level, not inside functions or procedures.',
            'error',
            'syntax.invalidvarscope'
          )
        );
      } else if (!validTopLevelVarLineIdx.has(lineIdx)) {
        diagnostics.push(
          createDiagnostic(
            firstToken.start,
            firstToken.end,
            'var is only valid at the beginning of a macro or immediately after const blocks.',
            'error',
            'syntax.invalidvarposition'
          )
        );
      }
    }

    if (firstToken.kind === 'keyword' && firstToken.lower === 'const') {
      inConstSection = true;
      inVarSection = false;
    } else if (constDeclLineIdx.has(lineIdx)) {
      inConstSection = true;
    } else {
      inConstSection = false;
    }

    if (firstToken.kind === 'keyword' && firstToken.lower === 'var') {
      inVarSection = true;
    } else if (varDeclLineIdx.has(lineIdx)) {
      inVarSection = true;
    } else {
      inVarSection = false;
    }

    try {
      const parser = new LineParser(tokens);
      let statement = null;

      if (
        inConstSection &&
        !(firstToken.kind === 'keyword' && firstToken.lower === 'const')
      ) {
        parser.parseConstDeclarationBody();
        statement = {
          kind: 'const-decl',
          requiresSemicolon: true,
          hasTerminator: parser.matchSymbol(';')
        };
      } else if (
        inVarSection &&
        !(firstToken.kind === 'keyword' && firstToken.lower === 'var')
      ) {
        parser.parseVarDeclarationBody();
        statement = {
          kind: 'var-decl',
          requiresSemicolon: false,
          hasTerminator: parser.matchSymbol(';')
        };
      } else {
        statement = parser.parseStatementList();
      }

      if (!parser.atEnd()) {
        const trailing = parser.current();
        diagnostics.push(
          createDiagnostic(
            trailing.start,
            trailing.end,
            `Unexpected token ${trailing.text}.`,
            'error',
            'syntax.unexpectedtoken'
          )
        );
        continue;
      }

      if (statement && statement.requiresSemicolon && !statement.hasTerminator) {
        diagnostics.push(
          createDiagnostic(
            Math.max(lastToken.start, lastToken.end - 1),
            lastToken.end,
            'Statement should end with ; (optional, but recommended).',
            'warning',
            'syntax.semicolonrecommended'
          )
        );
      }
    } catch (error) {
      diagnostics.push(
        createDiagnostic(
          error.start,
          error.end,
          error.message,
          'error',
          error.code || 'syntax.parseerror'
        )
      );
    }
  }

  return diagnostics;
}

module.exports = {
  collectStatementDiagnosticData
};