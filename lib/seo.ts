import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./siteConfig";
import { seoPages, type SeoPageKey } from "./pages";
import { pricingPlans } from "./pricing";

type PageMetaInput = {
  title: string;
  description?: string;
  path: string;
  /** Set true when title already contains the brand and should not be templated. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
  /** Social share image (path or absolute URL). Defaults to the site-wide card at /opengraph-image. */
  image?: string;
};

/** Metadata for a page registered in lib/pages.ts. */
export function seoMetadata(key: SeoPageKey) {
  const { path, title, description } = seoPages[key];
  return pageMetadata({ title, description, path });
}

export function pageMetadata({
  title,
  description = siteConfig.description,
  path,
  absoluteTitle = true,
  type = "website",
  noindex,
  image = "/opengraph-image",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const images = [image.startsWith("http") ? image : absoluteUrl(image)];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: siteConfig.name, type, locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description, images },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ---------- Structured data (JSON-LD). No review/rating schema by design. ---------- */

const ORG_ID = () => `${siteConfig.url}/#organization`;
const SITE_ID = () => `${siteConfig.url}/#website`;
const SOFTWARE_ID = () => `${siteConfig.url}/#software`;

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID(),
  name: siteConfig.name,
  url: siteConfig.url,
  logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png"), width: 512, height: 512 },
  description: siteConfig.description,
  sameAs: Object.values(siteConfig.social).filter(Boolean),
  ...(siteConfig.demoEmail
    ? { contactPoint: { "@type": "ContactPoint", contactType: "sales", email: siteConfig.demoEmail } }
    : {}),
});

/** Home page only. Tells search engines the name of the site and who publishes it. */
export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID(),
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": ORG_ID() },
});

/**
 * The SaraiOS product. Pass `withOffers` on the pricing page to include the three plans (monthly price in PKR).
 * Both pages use the same @id, so search engines read them as one product. No ratings or reviews on purpose.
 */
export const softwareJsonLd = ({ withOffers = false }: { withOffers?: boolean } = {}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID(),
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: siteConfig.category,
  operatingSystem: "Web (cloud based)",
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { "@id": ORG_ID() },
  featureList: [
    "Contactless digital check-in",
    "AI concierge",
    "Guest messaging",
    "Guest requests assigned to departments",
    "Guest profiles",
    "Analytics",
  ],
  ...(withOffers
    ? {
        offers: pricingPlans.map((p) => ({
          "@type": "Offer",
          name: `${p.name} plan`,
          price: p.monthly ?? 0,
          priceCurrency: p.currency,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.monthly ?? 0,
            priceCurrency: p.currency,
            billingDuration: "P1M",
            unitText: "month",
          },
          url: absoluteUrl("/pricing"),
          availability: "https://schema.org/InStock",
        })),
      }
    : {}),
});

export const faqJsonLd = (items: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.question,
    acceptedAnswer: { "@type": "Answer", text: i.answer },
  })),
});

export const breadcrumbJsonLd = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

/**
 * Page-level structured data for a page registered in lib/pages.ts: the page itself (WebPage, CollectionPage,
 * ContactPage) plus its breadcrumb trail. Pages with visible FAQs add faqJsonLd separately.
 */
export const pageJsonLd = (key: SeoPageKey, extra: Record<string, unknown> = {}) => {
  const page = seoPages[key];
  const url = absoluteUrl(page.path);
  const crumbs =
    page.path === "/"
      ? [{ name: "Home", path: "/" }]
      : [
          { name: "Home", path: "/" },
          { name: page.name, path: page.path },
        ];
  return [
    {
      "@context": "https://schema.org",
      // the FAQ page is a plain WebPage here; its questions are marked up by faqJsonLd
      "@type": page.schema === "FAQPage" ? "WebPage" : page.schema,
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: "en",
      isPartOf: { "@id": SITE_ID() },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...extra,
    },
    { ...breadcrumbJsonLd(crumbs), "@id": `${url}#breadcrumb` },
  ];
};

/** Blog index: a CollectionPage that lists the articles. */
export const blogIndexJsonLd = (posts: { slug: string; title: string }[]) =>
  pageJsonLd("blog", {
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/blog/${p.slug}`),
        name: p.title,
      })),
    },
  });
