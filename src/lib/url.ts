/** Prefixes a site-root path with the deploy base, e.g. /atila-gym on GitHub Pages and nothing locally. */
export const withBase = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
