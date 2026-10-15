import { getAllPosts } from "@/lib/blog";
import { allFaqs } from "@/lib/faq";
import { seoPages } from "@/lib/pages";
import { pricingPlans } from "@/lib/pricing";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";

/**
 * /llms.txt: a plain-text summary of the site for AI assistants and search tools (format from llmstxt.org).
 * Page names and descriptions come from lib/pages.ts, plans from lib/pricing.ts and articles from lib/blog.ts, so the
 * file is rebuilt with the rest of the site on every deploy and stays in step with it.
 */
export const dynamic = "force-static";

const link = (title: string, path: string, note: string) => `- [${title}](${absoluteUrl(path)}): ${note}`;
const fmt = (n: number) => n.toLocaleString("en-US");

export function GET() {
  const plans = pricingPlans.map((p) =>
    p.monthly === null
      ? `- ${p.name}: free to start (onboarding fee ${p.currency} 5,000). ${p.tagline}`
      : `- ${p.name}: ${p.currency} ${fmt(p.monthly)} per month, or 10% off when billed yearly. ${p.tagline}`,
  );

  const pages = [
    seoPages.platform,
    seoPages.solutions,
    seoPages.pricing,
    seoPages.demo,
    seoPages.contact,
    seoPages.faq,
  ].map((p) => link(p.name, p.path, p.description));

  const posts = getAllPosts().map((p) => link(p.title, `/blog/${p.slug}`, p.excerpt));

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "SaraiOS (also called Sarai) is a standalone, cloud-based guest experience platform for hotels, resorts and hospitality groups. Teams open it in a browser, so there is nothing to install. It does not connect to other hotel systems through API integrations.",
    "",
    "What it does:",
    "",
    "- Contactless digital check-in, with staff review and verification of guests",
    "- An AI concierge that answers guest questions from information the property provides and approves, and suggests or sends replies depending on the plan",
    "- A shared inbox for guest conversations, with a human handoff to staff at any point",
    "- Guest requests that are created from conversations and assigned by staff to departments (requests are not routed automatically)",
    "- Guest profiles and stored guest details, a dedicated hotel guest surface, offline capabilities and a lightweight data load",
    "- Analytics and a staff activity view on the Growth and Pro plans",
    "",
    "## Key pages",
    "",
    ...pages,
    "",
    "## Plans and pricing",
    "",
    ...plans,
    "",
    `Full plan details: ${absoluteUrl("/pricing")}`,
    "",
    "## Articles",
    "",
    ...posts,
    "",
    "## Optional",
    "",
    link("Home", "/", seoPages.home.description),
    link("Blog", "/blog", seoPages.blog.description),
    link("Terms of Service", "/terms", seoPages.terms.description),
    link("Privacy Policy", "/privacy", seoPages.privacy.description),
    `- [Sitemap](${absoluteUrl("/sitemap.xml")}): every public page and article`,
    "",
    `There are ${allFaqs.length} frequently asked questions answered at ${absoluteUrl("/faq")}.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
