module.exports = {
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:effector/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: ".",
    ecmaFeatures: {
      jsx: true,
    },
    createDefaultProgram: true,
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
    "effector",
  ],
  overrides: [
    {
      files: ["**/*.stories.*"],
    },
  ],
  rules: {
    "effector/no-watch": "off",
    "import/no-anonymous-default-export": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/unbound-method": "off",
    "no-console": "warn",
    "prettier/prettier": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
};
