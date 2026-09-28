import type { ScreenKey } from "./screenshots";

export type Feature = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  screen: ScreenKey;
  cta?: { label: string; href: string };
};

/** Core product features. Order drives the Features page story and home rows. */
export const features: Feature[] = [
  {
    id: "ai-concierge",
    index: "01",
    eyebrow: "AI Concierge",
    title: "A concierge in every conversation.",
    summary:
      "SaraiOS helps guests get answers, recommendations and assistance whenever they need it — grounded in your property's own information.",
    points: [
      "Answers questions about your hotel, amenities and local area",
      "Suggests the next useful action, not just a reply",
      "Confirms what it did so guests are never left guessing",
    ],
    screen: "concierge",
    cta: { label: "Explore AI Concierge", href: "/features#ai-concierge" },
  },
  {
    id: "guest-messaging",
    index: "02",
    eyebrow: "Guest Messaging",
    title: "Every guest conversation, in one intelligent layer.",
    summary:
      "Conversations from different channels land in one place, with the guest, their room and the status of every thread in view.",
    points: [
      "See who is handling each conversation — Sarai or your team",
      "Assign threads to front desk, housekeeping or concierge",
      "Step in at any moment with a seamless human handoff",
    ],
    screen: "conversations",
  },
  {
    id: "guest-requests",
    index: "03",
    eyebrow: "Guest Requests",
    title: "Turn conversations into actions.",
    summary:
      "When a guest asks for something, SaraiOS creates a structured request, routes it to the right team and keeps the guest updated as it moves.",
    points: [
      "Requests created directly from conversation",
      "Routed to the right department automatically",
      "Status updates flow back to the guest",
    ],
    screen: "requests",
  },
  {
    id: "guest-profile",
    index: "04",
    eyebrow: "Guest Profile",
    title: "Know the guest without making them repeat themselves.",
    summary:
      "Stay details, preferences and previous interactions come together so every reply — from Sarai or your team — has context.",
    points: [
      "Stay information and current requests at a glance",
      "Preferences captured from past conversations",
      "Internal notes shared across your team",
    ],
    screen: "profile",
  },
  {
    id: "analytics",
    index: "05",
    eyebrow: "Analytics",
    title: "See what guests are asking for.",
    summary:
      "Understand conversation volume, popular questions and service demand so you can staff, train and improve with confidence.",
    points: [
      "Popular questions and emerging topics",
      "Service demand by department and time of day",
      "How conversations are resolved — by Sarai or your team",
    ],
    screen: "analytics",
  },
  {
    id: "integrations",
    index: "06",
    eyebrow: "Integrations",
    title: "Connect SaraiOS to your hospitality ecosystem.",
    summary:
      "SaraiOS is designed to sit alongside the systems you already run, so conversations can become real operational actions.",
    points: [
      "Designed to connect with core hotel systems",
      "Integration availability confirmed per property during onboarding",
      "One intelligent layer across your stack",
    ],
    screen: "integrations",
  },
];

/** Horizontal product showcase on the Features page. */
export const showcaseScreens: { screen: ScreenKey; label: string; caption: string }[] = [
  { screen: "overview", label: "Overview", caption: "Today's conversations, requests and arrivals in one view." },
  { screen: "conversations", label: "Inbox", caption: "Every guest thread with owner and status." },
  { screen: "requests", label: "Requests", caption: "Operational work, created from conversation." },
  { screen: "analytics", label: "Analytics", caption: "What guests ask for, and when." },
  { screen: "settings", label: "Settings", caption: "Tone, knowledge and handoff rules for your property." },
];
