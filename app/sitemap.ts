import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/siteConfig";

const staticRoutes = [
  "/",
  "/features",
  "/industries",
  "/pricing",
  "/contact",
  "/demo",
  "/blog",
  "/faq",
  "/terms",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : ["/terms", "/privacy"].includes(path) ? 0.3 : 0.8,
    })),
    ...getAllPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
