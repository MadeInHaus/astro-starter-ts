import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const { SITE_DOMAIN } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
    site: `https://${SITE_DOMAIN}`,
    build: { assets: '_static' },
    integrations: [sitemap()],
    devToolbar: { enabled: false },
});
