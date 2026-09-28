import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./siteConfig";

type PageMetaInput = {
  title: string;
  description?: string;
  path: string;
  /** Set true when title already contains the brand and should not be templated. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
};

export function pageMetadata({
  title,
  description = siteConfig.description,
  path,
  absoluteTitle = true,
  type = "website",
  noindex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: siteConfig.name, type, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ---------- Structured data (JSON-LD). No review/rating schema by design. ---------- */

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: Object.values(siteConfig.social).filter(Boolean),
});

export const softwareJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: siteConfig.category,
  operatingSystem: "Web",
  url: siteConfig.url,
  description: siteConfig.description,
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
