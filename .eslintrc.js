module.exports = {
    env: {
        webextensions: true,
        browser: true,
        es2020: true
    },
    extends: [
        'react-app',
        'plugin:react/recommended',
        'eslint:recommended',
        'standard'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        semi: [
            'error',
            'always'
        ],
        'no-new-func': 'error',
        indent: 'off'
    }
};
