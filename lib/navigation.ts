import { siteConfig } from "./siteConfig";
import { industries } from "./industries";

export type NavLink = { label: string; href: string; external?: boolean };

/** Desktop header links. */
export const mainNav: NavLink[] = [
  { label: "Platform", href: "/features" },
  { label: "Solutions", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

/** Mobile menu links (Book a Demo is rendered as the menu's primary button). */
export const mobileNav: NavLink[] = [...mainNav, { label: "Blog", href: "/blog" }, { label: "FAQ", href: "/faq" }];

export const primaryCta: NavLink = { label: "Book a Demo", href: "/demo" };
export const secondaryCta: NavLink = { label: "Explore Platform", href: "/features" };

/** Button in the header and the mobile menu. Same destination as the demo button, different wording. */
export const headerCta: NavLink = { label: "Get early access", href: primaryCta.href };

export type FooterGroup = { title: string; links: (NavLink & { disabled?: boolean })[] };

export const footerNav: FooterGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a Demo", href: "/demo" },
    ],
  },
  {
    title: "Solutions",
    links: industries.map((ind) => ({ label: ind.name, href: `/industries#${ind.slug}` })),
  },
  {
    title: "Company",
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: siteConfig.social.linkedin, external: true, disabled: !siteConfig.social.linkedin },
      { label: "X", href: siteConfig.social.x, external: true, disabled: !siteConfig.social.x },
      { label: "Instagram", href: siteConfig.social.instagram, external: true, disabled: !siteConfig.social.instagram },
    ],
  },
];
