// https://ota-meshi.github.io/eslint-plugin-astro/

import eslintPluginAstro from 'eslint-plugin-astro';

const otherConfigs = eslintPluginAstro.configs['jsx-a11y-recommended'].filter(
    cfg => cfg.name !== 'astro/base/typescript'
);
const tsConfig = eslintPluginAstro.configs['jsx-a11y-recommended'].find(
    cfg => cfg.name === 'astro/base/typescript'
);

export default [
    ...otherConfigs,
    // Original has files set to [ '**/*.astro/*.ts', '*.astro/*.ts' ]
    // I have no idea why.
    // We patch that here:
    { ...tsConfig, files: ['**/*.ts'] },
    {
        ignores: ['**/node_modules/**', '**/dist/**', '**/.astro/**'],
        rules: {
            'import/no-unresolved': 'off',
            'no-empty': 'off',
            'no-unused-vars': 'warn',
        },
    },
];
