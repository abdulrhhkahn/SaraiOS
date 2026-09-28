/** Smaller content blocks used across the home page and elsewhere. */

export const guestJourney = [
  {
    stage: "Before arrival",
    title: "Questions answered",
    body: "Parking, arrival times and special requests handled before the guest reaches the lobby.",
  },
  {
    stage: "Arrival",
    title: "A smoother welcome",
    body: "Access information and first-night recommendations, ready when the guest needs them.",
  },
  {
    stage: "In stay",
    title: "Requests, routed",
    body: "Towels, dining, spa and transport requests reach the right team with context attached.",
  },
  {
    stage: "Departure",
    title: "An easy goodbye",
    body: "Late checkout, luggage and transfers arranged in the same conversation.",
  },
  {
    stage: "After stay",
    title: "Insight that lasts",
    body: "Understand what guests asked for, so the next stay is better.",
  },
];

export const integrationCategories = [
  { name: "PMS", status: "integration" },
  { name: "CRM", status: "integration" },
  { name: "Booking Engine", status: "integration" },
  { name: "POS", status: "planned" },
  { name: "Housekeeping", status: "integration" },
  { name: "Messaging", status: "integration" },
  { name: "Payments", status: "planned" },
  { name: "Spa", status: "planned" },
  { name: "Activities", status: "planned" },
] as const;

/**
 * Status labels are deliberately generic. Replace with named, verified
 * integrations once confirmed by the SaraiOS team.
 */
export const integrationStatusLabel = {
  integration: "Integration",
  planned: "Coming soon",
} as const;
