// https://ota-meshi.github.io/eslint-plugin-astro/

import eslintPluginAstro from 'eslint-plugin-astro';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';

export default [
    ...eslintPluginAstro.configs['jsx-a11y-recommended'],
    {
        files: ['**/*.ts'],
        languageOptions: { parser: tsEslintParser },
    },
    {
        ignores: ['**/.astro/**', '**/dist/**', '**/node_modules/**', '**/public/**'],
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
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                },
            ],
        },
    },
];
