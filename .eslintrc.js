// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: { browser: true, node: true, es6: true },
  settings: { react: { version: 'detect' } },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  extends: [
    'airbnb-typescript',

    // "next/core-web-vitals",
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-function-return-type': [
      2,
      { allowExpressions: true },
    ],
    'import/order': 2,
    'jsx-quotes': 2,
    'object-shorthand': 2,
    'prettier/prettier': 2,
    'react/jsx-curly-brace-presence': [2, 'never'],
    'react/prop-types': 0,
    'react/self-closing-comp': 2,
    'unicorn/no-null': 0,
  },

  overrides: [
    { files: ['**/*.test.tsx'], env: { jest: true } },
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
  plugins: ['@typescript-eslint', 'prettier', 'react-hooks'],
}
