module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:prettier/recommended',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {}, 
      },
    },
  };