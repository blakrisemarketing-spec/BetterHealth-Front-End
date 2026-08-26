import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'hyperframes-project']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]|^motion$' }],
    },
  },
  {
    // Google Apps Script — deployed to Google's runtime, never bundled with the
    // site, so the browser environment doesn't describe it. SpreadsheetApp and
    // ContentService are platform globals, and doPost/doGet are entry points
    // the platform calls by name, which makes them look unused to a static
    // analyser. Linting it as browser ES modules produced six false positives.
    files: ['scripts/google-apps-script.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        SpreadsheetApp: 'readonly',
        ContentService: 'readonly',
        UrlFetchApp: 'readonly',
        Logger: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^(doPost|doGet)$' }],
    },
  },
])
