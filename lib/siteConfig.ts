/**
 * Global site configuration.
 * Social links are only rendered as active links once their env var is set.
 */
/**
 * Public site URL, used for canonical links, the sitemap, structured data and llms.txt. Set NEXT_PUBLIC_SITE_URL to the
 * live domain. If it is not set, the Vercel production domain is used on Vercel, and localhost when running locally.
 */
function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const raw = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return raw.replace(/\/$/, "");
}

export const siteConfig = {
  name: "SaraiOS",
  shortName: "Sarai",
  category: "AI-Native Guest Experience Platform",
  tagline: "AI that understands hospitality.",
  description:
    "SaraiOS helps hotels deliver smarter guest experiences with AI-powered concierge, messaging, guest requests and hospitality automation.",
  url: siteUrl(),
  productLoginUrl: "https://login.saraios.com/",
  demoEmail: process.env.NEXT_PUBLIC_DEMO_EMAIL || "",
  footerNote: "AI-native guest experience for modern hospitality.",
  footerTagline: "Beyond Arrivals",
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
} as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
