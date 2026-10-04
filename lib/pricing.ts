/**
 * `pricingPlans` are the Essential, Growth and Pro plans shown on the pricing page (same plans and prices as the
 * Sarai app). The older `plans` and `comparison` below describe the earlier tailored Custom and Enterprise model.
 */
export type Plan = {
  id: string;
  name: string;
  audience: string;
  description: string;
  highlights: string[];
  cta: { label: string; href: string };
  emphasis?: boolean;
};

export const plans: Plan[] = [
  {
    id: "custom",
    name: "Custom",
    audience: "For individual properties and growing hotel groups.",
    description: "A SaraiOS deployment configured around your property, your team and your guests.",
    highlights: [
      "AI Concierge and guest messaging",
      "Guest requests and routing",
      "Property knowledge and tone setup",
      "Guided onboarding",
    ],
    cta: { label: "Book a Demo", href: "/demo" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "For multi-property hospitality organizations.",
    description: "One guest experience layer across your portfolio, with the controls larger organizations need.",
    highlights: [
      "Everything in Custom",
      "Multi-property configuration",
      "Portfolio-level analytics",
      "Admin controls and dedicated support",
    ],
    cta: { label: "Book a Demo", href: "/demo" },
    emphasis: true,
  },
];

/** "included" | "available" (scoped per deployment) | "discuss" (confirmed during discovery) */
export type Availability = "included" | "available" | "discuss";

export const comparison: { feature: string; custom: Availability; enterprise: Availability }[] = [
  { feature: "AI Concierge", custom: "included", enterprise: "included" },
  { feature: "Guest Messaging", custom: "included", enterprise: "included" },
  { feature: "Guest Requests", custom: "included", enterprise: "included" },
  { feature: "Digital Guest Journey", custom: "available", enterprise: "included" },
  { feature: "Analytics", custom: "included", enterprise: "included" },
  { feature: "Integrations", custom: "discuss", enterprise: "discuss" },
  { feature: "Multi-property support", custom: "available", enterprise: "included" },
  { feature: "Human handoff", custom: "included", enterprise: "included" },
  { feature: "Admin controls", custom: "available", enterprise: "included" },
  { feature: "Support", custom: "included", enterprise: "included" },
];

export const availabilityLabel: Record<Availability, string> = {
  included: "Included",
  available: "Available",
  discuss: "Scoped with you",
};

/** Share taken off the monthly price when a plan is billed yearly. */
export const YEARLY_DISCOUNT = 0.1;

export type PricingPlan = {
  id: string;
  name: string;
  /** Monthly price in PKR, or null when the plan is free. */
  monthly: number | null;
  currency: string;
  /** Small note under the price of a free plan, e.g. onboarding fees. */
  priceNote?: string;
  tagline: string;
  groups: { title: string; items: string[] }[];
  cta: { label: string; href: string };
  /** The recommended plan: filled in Sarai green. */
  featured?: boolean;
  badge?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    monthly: null,
    currency: "PKR",
    priceNote: "Onboarding fees PKR 5,000",
    tagline: "Get started with in app web chat and essential guest messaging.",
    groups: [
      {
        title: "Guest experience",
        items: [
          "Contactless digital check-in",
          "Contactless digital F&B menu/room service",
          "Contactless digital local tour/activities booking",
          "Dedicated hotel guest surface",
          "Review and verify guests",
        ],
      },
      {
        title: "AI and messaging",
        items: ["AI Concierge - Suggests replies", "Channel - In-app web chat", "Conversations - 50/month"],
      },
      {
        title: "Plan",
        items: [
          "Email seats - 2",
          "Single property",
          "Offline capabilities and lightweight data load",
          "24/7 chat support",
        ],
      },
    ],
    cta: { label: "Get early access", href: "/demo" },
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 12999,
    currency: "PKR",
    tagline: "Reach guests on every channel with smarter AI assistance.",
    groups: [
      {
        title: "Everything in Essential, plus",
        items: ["AI Concierge - Auto sends replies", "Channel - WhatsApp & SMS", "Conversations - Unlimited"],
      },
      {
        title: "Insights and team",
        items: ["Advanced analytics", "Weekly analytics report", "In-app staff activity tracker", "Email seats - 5"],
      },
    ],
    cta: { label: "Book a Demo", href: "/demo" },
    featured: true,
    badge: "Most popular",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 27999,
    currency: "PKR",
    tagline: "Full automation and multi-property control for growing portfolios.",
    groups: [
      {
        title: "Everything in Growth, plus",
        items: ["Email seats - Unlimited", "Multi-properties", "Cross property comparison"],
      },
    ],
    cta: { label: "Book a Demo", href: "/demo" },
  },
];
