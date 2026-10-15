/**
 * One place for every page's search title and description. The page files read from here for their metadata and
 * structured data, and /llms.txt reads from here too, so they cannot drift apart.
 *
 * Titles are written as full titles (no site suffix is added). Keep titles under about 60 characters and
 * descriptions between 120 and 160 so they are not cut off in search results.
 */
export type SeoPage = {
  path: string;
  /** Full <title>. */
  title: string;
  /** Meta description. */
  description: string;
  /** Short name used in breadcrumbs and in llms.txt. */
  name: string;
  /** schema.org type for the page itself. */
  schema: "WebPage" | "CollectionPage" | "ContactPage" | "FAQPage";
};

export const seoPages = {
  home: {
    path: "/",
    title: "SaraiOS | AI Guest Experience Platform for Hotels",
    description:
      "SaraiOS is a cloud-based guest experience platform for hotels: contactless check-in, an AI concierge, guest messaging and guest requests in one place.",
    name: "Home",
    schema: "WebPage",
  },
  platform: {
    path: "/features",
    title: "SaraiOS Platform | AI Concierge, Messaging & Requests",
    description:
      "Explore the SaraiOS platform: digital guest check-in, an AI concierge, a shared guest inbox, requests assigned to departments, guest profiles and analytics.",
    name: "Platform",
    schema: "WebPage",
  },
  solutions: {
    path: "/industries",
    title: "Hotel Guest Experience Software | SaraiOS Solutions",
    description:
      "See how SaraiOS fits hotels, resorts, boutique and luxury properties, hotel management companies and multi-property groups. Cloud based, nothing to install.",
    name: "Solutions",
    schema: "WebPage",
  },
  pricing: {
    path: "/pricing",
    title: "SaraiOS Pricing | Free Essential Plan, Growth and Pro",
    description:
      "SaraiOS plans for hotels: Essential is free to start, Growth is PKR 12,999 per month and Pro is PKR 27,999 per month, with 10% off when billed yearly.",
    name: "Pricing",
    schema: "WebPage",
  },
  contact: {
    path: "/contact",
    title: "Contact SaraiOS | Talk to Our Hospitality Team",
    description:
      "Get in touch with the SaraiOS team to book a demo, ask a question about the platform or get help with your account.",
    name: "Contact",
    schema: "ContactPage",
  },
  demo: {
    path: "/demo",
    title: "Book a Demo | See SaraiOS in Action",
    description:
      "Book a SaraiOS demo tailored to your property. We walk through digital check-in, the AI concierge, guest requests and how your team would use it.",
    name: "Book a Demo",
    schema: "WebPage",
  },
  faq: {
    path: "/faq",
    title: "SaraiOS FAQ | AI Concierge, Pricing, Security & Setup",
    description:
      "Answers about SaraiOS, the AI concierge, guest experience, operations, the cloud platform, privacy and pricing.",
    name: "FAQ",
    schema: "FAQPage",
  },
  blog: {
    path: "/blog",
    title: "SaraiOS Blog | AI & Guest Experience in Hospitality",
    description:
      "Practical articles on the AI concierge, guest messaging, guest request workflows and the future of the hotel guest experience.",
    name: "Blog",
    schema: "CollectionPage",
  },
  terms: {
    path: "/terms",
    title: "Terms of Service | SaraiOS",
    description: "The terms that apply when you use SaraiOS, the cloud-based guest experience platform for hotels.",
    name: "Terms of Service",
    schema: "WebPage",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | SaraiOS",
    description: "How SaraiOS collects, uses and protects personal information on this website and in the platform.",
    name: "Privacy Policy",
    schema: "WebPage",
  },
} as const satisfies Record<string, SeoPage>;

export type SeoPageKey = keyof typeof seoPages;
