const path = require('node:path')

const project = path.join(__dirname, 'tsconfig.json')

/** @type {import("eslint").Linter.RulesRecord} */
const generalRules = {
  'no-empty': ['error', { allowEmptyCatch: true }],
  camelcase: ['error', { ignoreImports: false }],
  eqeqeq: 'warn',
  'no-throw-literal': 'error',
  'require-await': 'warn',
  'no-unused-expressions': 'error',
}

/** @type {import("eslint").Linter.RulesRecord} */
const generalRulesForTypeScript = {
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
    },
  ],
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/array-type': ['error', { default: 'array' }],
  '@typescript-eslint/consistent-generic-constructors': [
    'error',
    'constructor',
  ],
  '@typescript-eslint/consistent-indexed-object-style': ['warn', 'record'],
  '@typescript-eslint/method-signature-style': ['error', 'property'],
  '@typescript-eslint/no-duplicate-type-constituents': 'error',
  '@typescript-eslint/no-dynamic-delete': 'warn',
  '@typescript-eslint/no-import-type-side-effects': 'error',
  '@typescript-eslint/no-meaningless-void-operator': 'warn',
  '@typescript-eslint/no-redundant-type-constituents': 'warn',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  '@typescript-eslint/no-unnecessary-condition': 'warn',
  '@typescript-eslint/no-unnecessary-qualifier': 'error',
  '@typescript-eslint/no-unnecessary-type-arguments': 'error',
  '@typescript-eslint/no-unsafe-declaration-merging': 'error',
  '@typescript-eslint/no-unsafe-enum-comparison': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/prefer-ts-expect-error': 'error',
  '@typescript-eslint/require-array-sort-compare': 'warn',
  '@typescript-eslint/switch-exhaustiveness-check': 'warn',
  '@typescript-eslint/unified-signatures': 'warn',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'interface',
      format: ['PascalCase'],
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
  ],
}

/** @type {import("eslint").Linter.RulesRecord} */
const typeCheckingRules = {
  '@typescript-eslint/no-unsafe-member-access': 'warn',
  '@typescript-eslint/ban-ts-comment': 'off',
}

/** @type {import("eslint").Linter.RulesRecord} */
const unicornRules = {
  'unicorn/error-message': 'error',
  'unicorn/filename-case': [
    'error',
    {
      case: 'camelCase',
    },
  ],
  'unicorn/no-unnecessary-await': 'warn',
  'unicorn/prefer-node-protocol': 'error',
  'unicorn/throw-new-error': 'error',
  'unicorn/no-lonely-if': 'error',
}

/** @type {import("eslint").Linter.RulesRecord} */
const spellRules = {
  'spellcheck/spell-checker': [
    'warn',
    {
      comments: true,
      strings: true,
      identifiers: true,
      templates: true,
      lang: 'en_US',
      skipWords: [
        'cjs',
        'esm',
        'rimraf',
        'fs',
        'npx',
        'tsc',
        'tsconfig',
        'utf8',
        'typeof',
        'stdout',
        'stderr',
        'oldjs',
        'deno',
        'undef',
        'javascript',
        'cscript',
      ],
    },
  ],
}

/** @type {import("eslint").Linter.RulesRecord} */
const jsdocRules = {
  'jsdoc/check-alignment': 'error',
  'jsdoc/check-indentation': 'error',
  'jsdoc/check-tag-names': 'error',
  'jsdoc/match-description': [
    'error',
    { matchDescription: '^\n?([A-Z`\\d_][\\s\\S]*\\.)\\s*$' },
  ],
  'jsdoc/no-bad-blocks': ['error', { preventAllMultiAsteriskBlocks: true }],
  'jsdoc/no-blank-block-descriptions': 'error',
  'jsdoc/no-blank-blocks': 'error',
  'jsdoc/no-multi-asterisks': 'error',
  'jsdoc/require-asterisk-prefix': 'error',
  'jsdoc/require-hyphen-before-param-description': 'warn',
  'jsdoc/require-param-description': 'error',
  'jsdoc/require-param-name': 'error',
  'jsdoc/require-throws': 'error',
  'jsdoc/require-jsdoc': 'off',
}

const plugins = ['@typescript-eslint', 'unicorn', 'spellcheck', 'jsdoc']

const extendsFrom = [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
]

/** @type {import("eslint").Linter.Config} */
const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['*.ts'],
      parserOptions: {
        project,
      },
      rules: typeCheckingRules,
    },
    {
      files: ['src/**'],
      rules: jsdocRules,
    },
    {
      files: ['scripts/**', 'test/**'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['.eslintrc.cjs'],
      rules: {
        'spellcheck/spell-checker': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    project,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {},
  plugins,
  extends: extendsFrom,
  rules: {
    ...generalRules,
    ...generalRulesForTypeScript,
    ...unicornRules,
    ...spellRules,
  },
}

module.exports = config
