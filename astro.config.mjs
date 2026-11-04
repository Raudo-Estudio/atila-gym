import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://example.com',
  // GitHub Pages serves the project under /atila-gym/; locally the site sits at the root.
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  integrations: [sitemap()],
});
