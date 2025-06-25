import { defineConfig } from 'astro/config';
import * as dotenv from 'dotenv';
import sitemap from '@astrojs/sitemap';

dotenv.config();

// https://astro.build/config
export default defineConfig({
    site: `https://${process.env.SITE_DOMAIN}`,
    build: { assets: '_static' },
    integrations: [sitemap()],
    devToolbar: { enabled: false },
});
