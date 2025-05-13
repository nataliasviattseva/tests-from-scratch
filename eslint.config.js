// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
];
