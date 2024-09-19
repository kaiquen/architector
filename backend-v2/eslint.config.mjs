import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.ts"],
        languageOptions: {
        parser: tsParser,
        parserOptions: {
            project: "./tsconfig.json",
        },
        },
        plugins: {
        "@typescript-eslint": tsPlugin,
        },
        rules: {
            "no-unused-vars": "warn",
            "no-extra-semi": "error",
            ...tsPlugin.configs.recommended.rules,
        },
    },
];


