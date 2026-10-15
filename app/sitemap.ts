import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { seoPages } from "@/lib/pages";
import { absoluteUrl } from "@/lib/siteConfig";

/**
 * Built from the page list in lib/pages.ts and the posts in lib/blog.ts every time the site is built, so a new page
 * or a new blog post is in the sitemap as soon as that version is deployed. Blog posts carry their real "updated"
 * date. Other pages carry no date on purpose: a date that changes on every deploy would tell search engines that
 * everything changed each time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const legal = ["/terms", "/privacy"];
  return [
    ...Object.values(seoPages)
      .filter((p) => p.path !== "/blog")
      .map((p) => ({
        url: absoluteUrl(p.path),
        changeFrequency: "monthly" as const,
        priority: p.path === "/" ? 1 : legal.includes(p.path) ? 0.3 : 0.8,
      })),
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(Math.max(...getAllPosts().map((p) => new Date(p.updated).getTime()))),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...getAllPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updated),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
