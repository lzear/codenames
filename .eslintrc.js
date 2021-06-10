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
    'plugin:prettier/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 2,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': [
      2,
      { allowExpressions: true },
    ],
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
  plugins: ['@typescript-eslint', 'prettier', 'react-app', 'react-hooks'],
};
