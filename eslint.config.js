import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
 {
  languageOptions: {
   globals: globals.browser,
   ecmaVersion: 'latest',
  },
 },
 pluginJs.configs.recommended,

 {
  ignores: ['node_modules/'],
  rules: {
   indent: ['error', 1],
  },
 },
];
