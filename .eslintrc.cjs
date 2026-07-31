module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "solid", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:solid/typescript",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    quotes: ["error", "double", { avoidEscape: true }],
  },
};
