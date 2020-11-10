module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'warn',
    'jest/no-identical-title': 'warn',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'warn',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn'
  },
  settings: {
    react: {
      version: 'latest'
    }
  }
}
