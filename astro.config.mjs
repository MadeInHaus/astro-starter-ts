import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import vtbot from 'astro-vtbot';

// https://astro.build/config
export default defineConfig({
    site: 'https://astro-starter-ts.vercel.app',
    integrations: [sitemap(), vtbot({ loadingIndicator: false })],
});
