/**
 * FAQ content. Answers describe capabilities only — confirm specifics
 * (languages, integrations, compliance) with the SaraiOS team before adding them.
 */
export type FaqItem = { id: string; question: string; answer: string; featured?: boolean };
export type FaqCategory = { id: string; title: string; items: FaqItem[] };

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        id: "what-is-saraios",
        featured: true,
        question: "What is SaraiOS?",
        answer:
          "SaraiOS is an AI-native guest experience platform for hotels, resorts and hospitality groups. It gives guests an AI concierge and gives hotel teams an intelligent layer that connects conversations to requests and workflows.",
      },
      {
        id: "is-it-a-chatbot",
        featured: true,
        question: "Is SaraiOS a chatbot?",
        answer:
          "No. A chatbot answers questions. SaraiOS understands what the guest needs, uses your hotel's context, creates structured requests for the right team and keeps the guest informed until the request is complete.",
      },
      {
        id: "who-is-it-for",
        question: "Who is SaraiOS designed for?",
        answer:
          "Independent hotels, resorts, boutique and luxury properties, hotel management companies and multi-property groups — and the guest experience, front desk, concierge and operations teams inside them.",
      },
    ],
  },
  {
    id: "ai-concierge",
    title: "AI Concierge",
    items: [
      {
        id: "how-does-concierge-work",
        featured: true,
        question: "How does the AI concierge work?",
        answer:
          "Sarai answers guest questions using information your property provides and approves. When a guest asks for something that needs action, Sarai captures the details, creates a request and routes it to the right team.",
      },
      {
        id: "multiple-languages",
        question: "Does SaraiOS support multiple languages?",
        answer:
          "SaraiOS is designed for international guests. Language support for your deployment is confirmed during onboarding — ask us about the languages your guests use most.",
      },
      {
        id: "tone",
        question: "Can Sarai match our property's tone of voice?",
        answer:
          "Yes. Tone, approved answers and escalation rules are configured per property so conversations feel like your hotel.",
      },
    ],
  },
  {
    id: "guest-experience",
    title: "Guest Experience",
    items: [
      {
        id: "speak-to-human",
        featured: true,
        question: "Can guests speak to a human?",
        answer:
          "Yes. Human handoff is part of the platform. Your team can take over any conversation, and Sarai can hand off when a request needs a person.",
      },
      {
        id: "guest-channels",
        question: "Where do guests talk to Sarai?",
        answer:
          "Channel availability depends on your setup. We'll walk through the channels your guests already use during your demo.",
      },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    items: [
      {
        id: "handle-requests",
        featured: true,
        question: "Can SaraiOS handle guest requests?",
        answer:
          "Yes. Requests such as late checkout, housekeeping items, dining or spa bookings can be captured from conversation, routed to the right team and tracked through to completion.",
      },
      {
        id: "implementation",
        question: "How does implementation work?",
        answer:
          "We start with a discovery session to understand your property, workflows and systems. We then configure Sarai's knowledge, tone and routing with your team before going live.",
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    items: [
      {
        id: "integrate-systems",
        question: "Can SaraiOS integrate with hotel systems?",
        answer:
          "SaraiOS is designed to connect with hotel systems such as PMS, CRM and operational tools. Specific integration availability is confirmed for your property during discovery.",
      },
      {
        id: "multi-property",
        question: "Can SaraiOS support multiple properties?",
        answer:
          "Yes. SaraiOS is built for single properties and multi-property groups, with property-level configuration.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Privacy",
    items: [
      {
        id: "guest-data",
        question: "How is guest data handled?",
        answer:
          "Guest data is handled according to our privacy policy and your agreement with SaraiOS. We're happy to walk your team through our data handling practices in detail during the sales process.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    items: [
      {
        id: "how-pricing-works",
        question: "How does pricing work?",
        answer:
          "Pricing is tailored to your operation — the number of properties, the workflows you need and the systems you connect. Book a demo and we'll put together a proposal.",
      },
    ],
  },
];

export const allFaqs = faqCategories.flatMap((c) => c.items);
export const featuredFaqs = allFaqs.filter((f) => f.featured).slice(0, 5);
