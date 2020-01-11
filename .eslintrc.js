module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: { browser: true, node: true, es6: true },
  settings: { react: { version: 'detect' } },
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
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
  overrides: [{ files: ['**/*.test.tsx'], env: { jest: true } }],
  plugins: ['@typescript-eslint', 'prettier', 'react-app', 'react-hooks'],
};
