/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV || 'development';

export default getViteConfig({
    test: {
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['node_modules', 'dist', 'public', '.git', '.astro', '.vscode'],
        env: loadEnv(mode, process.cwd(), ''),
    },
});
