module.exports = {
  env: {
    webextensions: true,
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'standard',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    indent: 'off',
    semi: 'off',
    'no-array-constructor': 'off',
    'no-empty-function': 'off',
    'no-extra-semi': 'off',
    'no-unused-vars': 'off',
    'no-console': [
      2,
      {
        allow: ['warn', 'error', 'debug'],
      },
    ],
  },
};
