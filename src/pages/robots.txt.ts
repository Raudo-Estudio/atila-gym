import type { APIRoute } from 'astro';

// An endpoint instead of public/robots.txt so the sitemap URL follows PUBLIC_SITE_URL.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`);
