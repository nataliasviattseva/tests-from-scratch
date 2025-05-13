import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    env: {
      node: true,
      jest: true
    },
    rules: {
    }
  }
];
