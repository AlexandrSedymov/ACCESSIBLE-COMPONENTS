import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  // Global ignores - these files/folders will be completely ignored by ESLint
  {
    ignores: [
      'dist/**/*',
      'build/**/*',
      'node_modules/**/*',
      '.yarn/**/*',
      '.pnp.*',
      'coverage/**/*',
      '*.config.js',
      '*.config.ts',
      'vite.config.*',
      'vitest.config.*',
      '.github/**/*'
    ]
  },
  // Configuration for TypeScript/React files
  {
    files: ['src/**/*.{ts,tsx}', '*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    rules: {
      // Allow any types in test files and utilities (temporary)
      '@typescript-eslint/no-explicit-any': ['error', {
        ignoreRestArgs: true,
      }],
      // React hooks rules
      ...reactHooks.configs.recommended.rules,
      // React refresh rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // More lenient rules for test files
  {
    files: ['src/**/*.test.{ts,tsx}', 'src/**/__tests__/**/*.{ts,tsx}', 'src/test-setup.ts', 'src/utils/test-*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
])
