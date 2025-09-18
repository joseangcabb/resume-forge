import globals from "globals";
import js from "@eslint/js";
import astroPlugin from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const PARSERS = { ts: tsParser, astro: astroParser };
const PLUGINS = {
  astro: astroPlugin,
  ts: tseslint,
  jsxA11y,
  prettier: prettierPlugin,
};

// Rules
const COMMON_RULES = { "no-mixed-spaces-and-tabs": ["error"] };

const TS_RULES = {
  ...tseslint.configs.recommended.rules,
  "@typescript-eslint/no-unused-vars": [
    "error",
    { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
  ],
  "@typescript-eslint/no-non-null-assertion": "off",
};

const JSX_A11Y_RULES = jsxA11y.configs.strict.rules;

export default [
  // Ignore generated folders/files
  {
    ignores: ["dist/**", "node_modules/**", "**/*.d.ts"],
  },

  // General Js
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: COMMON_RULES,
  },

  // Typescript
  {
    files: ["**/*.ts"],
    plugins: { ts: PLUGINS.ts },
    languageOptions: {
      parser: PARSERS.ts,
      parserOptions: { project: "./tsconfig.json" }, // Type-aware linting
    },
    rules: TS_RULES,
  },

  // TSX (TypeScript + JSX)
  {
    files: ["**/*.tsx"],
    plugins: { ts: PLUGINS.ts, "jsx-a11y": PLUGINS.jsxA11y },
    languageOptions: {
      parser: PARSERS.ts,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },
    rules: { ...TS_RULES, ...JSX_A11Y_RULES },
  },

  // JSX (React)
  {
    files: ["**/*.jsx"],
    plugins: { "jsx-a11y": PLUGINS.jsxA11y },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: JSX_A11Y_RULES,
  },

  // Astro
  {
    files: ["**/*.astro"],
    plugins: { astro: PLUGINS.astro },
    languageOptions: {
      parser: PARSERS.astro,
      parserOptions: {
        parser: PARSERS.ts,
        extraFileExtensions: [".astro"],
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...PLUGINS.astro.configs.recommended.rules,
      ...JSX_A11Y_RULES,
      ...COMMON_RULES,
    },
  },
];
