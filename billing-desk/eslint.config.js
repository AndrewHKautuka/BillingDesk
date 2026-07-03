// @ts-check
import js from "@eslint/js"
import json from "@eslint/json"
import markdown from "@eslint/markdown"
import prettierConfig from "eslint-config-prettier/flat"
import jsxA11y from "eslint-plugin-jsx-a11y"
import reactHooks from "eslint-plugin-react-hooks"
import { defineConfig } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  // Global ignores
  {
    ignores: [
      "node_modules",
      "build",
      ".react-router",
      "**/*.config.js",
      "**/*.config.ts",
      "pnpm-lock.yaml",
    ],
  },
  // Base JS + TS rules for all files
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  tseslint.configs.recommended,
  // React hooks + accessibility - scoped to JS/TS files only
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    extends: [
      reactHooks.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
  },
  // JSON
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  // Markdown
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
  // Prettier - must be last, disables ESLint rules that conflict with Prettier formatting
  prettierConfig,
])
