// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettier = require("eslint-plugin-prettier");

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ["dist/*"],
        rules: {
            eqeqeq: "off",
            "react-hooks/exhaustive-deps": "off",
            "react/display-name": "off",
            "react-hooks/rules-of-hooks": "off",
            "prettier/prettier": ["error", {}, { usePrettierrc: true }],
        },
        plugins: {
            prettier,
        },
    },
]);
