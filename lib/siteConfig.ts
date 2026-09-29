/**
 * Global site configuration.
 * Social links are only rendered as active links once their env var is set.
 */
export const siteConfig = {
  name: "SaraiOS",
  shortName: "Sarai",
  category: "AI-Native Guest Experience Platform",
  tagline: "AI that understands hospitality.",
  description:
    "SaraiOS helps hotels deliver smarter guest experiences with AI-powered concierge, messaging, guest requests and hospitality automation.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  productLoginUrl: "https://login.saraios.com/",
  demoEmail: process.env.NEXT_PUBLIC_DEMO_EMAIL || "",
  footerNote: "AI-native guest experience for modern hospitality.",
  footerTagline: "Beyond Arrivals",
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    x: process.env.NEXT_PUBLIC_X_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
} as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
