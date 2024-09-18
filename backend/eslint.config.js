import pluginJs from "@eslint/js";

export default [
  {
    rules: {
      "no-undef": "error",
      "no-var": "error",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      eqeqeq: ["error", "always"],
      "valid-typeof": "error",
      "no-implicit-coercion": [
        "error",
        { boolean: false, number: true, string: true },
      ],
      "no-inner-declarations": ["error", "functions"],
    },
  },
  pluginJs.configs.recommended,
];
