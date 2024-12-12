import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(), {
    languageOptions: {
        globals: {
            IS_DEVELOPMENT: "readonly",
        },

        ecmaVersion: 2021,
        sourceType: "module",
    },

    rules: {
        "max-len": [1, {
            code: 100,
        }],

        // "prettier/prettier": [1, {
        //     printWidth: 100,
        // }],
    },
}];
