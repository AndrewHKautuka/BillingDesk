import css from "@eslint/css"
import js from "@eslint/js"
import json from "@eslint/json"
import markdown from "@eslint/markdown"
import pluginReact from "eslint-plugin-react"
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
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
  // React rules - scoped to JS/TS files only to prevent crashing on JSON/CSS/MD
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    extends: [
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat["jsx-runtime"], // React 17+ new JSX transform: disables react/react-in-jsx-scope
      reactHooks.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": "off", // TypeScript handles this
    },
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
  // CSS
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
])
