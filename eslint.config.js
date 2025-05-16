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
        ...Object.fromEntries(
          Object.entries(globals.browser).filter(([key]) => !key.includes(' '))
        ),
      },
    },
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
];
