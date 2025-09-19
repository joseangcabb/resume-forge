import globals from 'globals'
import js from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  // To ignore
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '**/*.d.ts', // Ignore generated TypeScript declaration files
    ],
  },

  // General language settings for the linter
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // ESLint recommended rules
  js.configs.recommended,

  // Javascript
  // {
  //   files: ['**/*.js'],
  //   rules: {
  //     'no-mixed-spaces-and-tabs': ['error'],
  //   },
  // },

  // Astro
  {
    files: ['**/*.astro'],
    plugins: { astro: eslintPluginAstro },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...eslintPluginAstro.configs.recommended.rules,
      ...eslintPluginAstro.configs['jsx-a11y-strict'].rules,
      'no-mixed-spaces-and-tabs': 'error',
    },
  },

  // TypeScript
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // JSX (React components)
  {
    files: ['**/*.jsx'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...jsxA11y.configs.strict.rules,
    },
  },

  // TypeScript JSX (React components)
  {
    files: ['**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...jsxA11y.configs.strict.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Prettier
  eslintPluginPrettierRecommended,
]
