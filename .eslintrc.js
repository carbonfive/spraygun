module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
  plugins: ["jest", "prettier"],
  rules: {
    "no-console": "off",
    "no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-var": "error",
    "prettier/prettier": "error",
  },
  extends: ["eslint:recommended", "plugin:jest/recommended", "prettier"],
};
