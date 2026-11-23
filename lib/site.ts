/**
 * Public origin of the site. Used for canonical URLs, JSON-LD and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL on Vercel (e.g. https://www.ahs-enterprise.com).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ahs-enterprise.com"
).replace(/\/+$/, "");
