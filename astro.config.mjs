import { defineConfig } from 'astro/config';
import * as dotenv from 'dotenv';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

dotenv.config();

// https://astro.build/config
export default defineConfig({
    site: `https://${process.env.SITE_DOMAIN}`,
    build: { assets: '_static' },
    output: process.env.PREVIEW === 'true' ? 'server' : 'static',
    adapter: node({ mode: 'standalone' }),
    integrations: [sitemap()],
    devToolbar: { enabled: false },
    // image: {
    //     domains: ['example.com'],
    //     experimentalLayout: 'constrained',
    //     service: { entrypoint: 'astro/assets/services/sharp' },
    // },
    // experimental: {
    //     responsiveImages: true,
    // },
});
