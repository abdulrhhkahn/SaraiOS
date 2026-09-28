/**
 * Pricing is intentionally non-numeric. Update plan copy and the comparison
 * matrix here once packaging is confirmed.
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
