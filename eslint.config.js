// https://ota-meshi.github.io/eslint-plugin-astro/

import eslintPluginAstro from 'eslint-plugin-astro';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';

export default [
    ...eslintPluginAstro.configs['jsx-a11y-recommended'],
    {
        files: ['**/*.ts'],
        ignores: ['**/node_modules/**', '**/dist/**'],
        languageOptions: { parser: tsEslintParser },
    },
    {
        plugins: {
            '@typescript-eslint': tsEslint,
        },
        rules: {
            'no-empty': 'off',
            'import/no-unresolved': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                },
            ],
        },
    },
];
