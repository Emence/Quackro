/*
 * Canonical BMD language keyword source.
 *
 * Parser and semantic validation import this module to avoid drift.
 * Add or remove language keywords here, not in runtime or parser modules.
 */
const BMD_KEYWORD_LIST = [
  'and',
  'begin',
  'break',
  'case',
  'const',
  'continue',
  'do',
  'downto',
  'else',
  'end',
  'exit',
  'except',
  'for',
  'function',
  'if',
  'nil',
  'not',
  'of',
  'or',
  'procedure',
  'repeat',
  'return',
  'then',
  'to',
  'try',
  'until',
  'var',
  'while'
];

const BMD_KEYWORDS = new Set(BMD_KEYWORD_LIST);

module.exports = {
  BMD_KEYWORD_LIST,
  BMD_KEYWORDS
};
