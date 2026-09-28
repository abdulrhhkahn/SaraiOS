import type { ScreenKey } from "./screenshots";

export type IndustryIcon = "hotel" | "palm" | "key" | "gem" | "building" | "layers";

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  icon: IndustryIcon;
  headline: string;
  summary: string;
  useCases: string[];
  benefits: { title: string; body: string }[];
  screen: ScreenKey;
  /** Chat shown in the industry's product visual. */
  sample: { guest: string; sarai: string; action: string };
  /** Optional photo in /public/images/industries — falls back to product UI. */
  image?: string;
};

export const industries: Industry[] = [
  {
    slug: "hotels",
    name: "Hotels",
    shortName: "Hotels",
    icon: "hotel",
    headline: "Improve guest communication and automate repetitive requests.",
    summary:
      "Give every guest a fast, accurate answer and turn everyday requests into routed tasks — so your front desk can focus on the moments that need a person.",
    useCases: [
      "Pre-arrival questions",
      "Check-in and checkout requests",
      "Amenity and housekeeping requests",
      "Local recommendations",
    ],
    benefits: [
      {
        title: "Fewer repeat questions",
        body: "Sarai handles Wi-Fi, breakfast, parking and policy questions from your approved information.",
      },
      { title: "Cleaner handoffs", body: "Requests arrive with room, guest and context attached." },
    ],
    screen: "requests",
    sample: {
      guest: "Can I leave my bags after checkout?",
      sarai: "Of course. I've let the front desk know to hold your luggage.",
      action: "Luggage hold · Front desk",
    },
  },
  {
    slug: "resorts",
    name: "Resorts",
    shortName: "Resorts",
    icon: "palm",
    headline: "Help guests discover experiences, amenities and activities.",
    summary:
      "Resorts offer far more than guests can find on a PDF. Sarai surfaces the right experience at the right moment and routes bookings to the teams that run them.",
    useCases: [
      "Activity and excursion discovery",
      "Spa and dining requests",
      "Pool, beach and facility information",
      "Family and group questions",
    ],
    benefits: [
      { title: "Experiences, surfaced", body: "Recommendations tied to the guest's stay, not a generic list." },
      { title: "Teams in sync", body: "Spa, dining and activities receive structured requests." },
    ],
    screen: "concierge",
    sample: {
      guest: "What can the kids do tomorrow morning?",
      sarai: "There's a guided nature walk at 9:30. Would you like me to request two spots?",
      action: "Activity request · Recreation",
    },
  },
  {
    slug: "boutique-hotels",
    name: "Boutique Hotels",
    shortName: "Boutique",
    icon: "key",
    headline: "Give smaller teams an always-on digital concierge.",
    summary:
      "Small teams wear many hats. Sarai covers the late-night questions and routine requests in your property's own voice, so personal service scales without adding headcount pressure.",
    useCases: [
      "After-hours guest questions",
      "Neighbourhood recommendations",
      "Arrival and access information",
      "Simple request routing",
    ],
    benefits: [
      { title: "Your voice, always on", body: "Tone and answers configured to feel like your property." },
      { title: "Lean operations", body: "Only the conversations that need a person reach your team." },
    ],
    screen: "conversations",
    sample: {
      guest: "Any good coffee nearby?",
      sarai: "Our team's favourite is a four-minute walk away. I've added directions to your chat.",
      action: "Answered · No request needed",
    },
  },
  {
    slug: "luxury-hotels",
    name: "Luxury Hotels",
    shortName: "Luxury",
    icon: "gem",
    headline: "Deliver personalized, high-touch digital interactions.",
    summary:
      "Luxury guests expect to be known. Sarai uses stay context and recorded preferences to make every digital interaction feel considered — and hands off gracefully to your team.",
    useCases: [
      "Preference-aware recommendations",
      "Special occasion requests",
      "Seamless handoff to butler or concierge",
      "Discreet, context-rich service",
    ],
    benefits: [
      { title: "Remembered preferences", body: "Guests don't repeat themselves across the stay." },
      { title: "Graceful handoff", body: "Your team takes over with the full conversation in view." },
    ],
    screen: "profile",
    sample: {
      guest: "It's our anniversary tonight.",
      sarai: "Congratulations. I'll let our concierge know so they can help make the evening special.",
      action: "Occasion noted · Concierge",
    },
  },
  {
    slug: "management-companies",
    name: "Hotel Management Companies",
    shortName: "Management Cos.",
    icon: "building",
    headline: "Standardize guest experience across properties.",
    summary:
      "Set a consistent service standard across every property you manage, while each hotel keeps its own knowledge, tone and workflows.",
    useCases: [
      "Shared service standards",
      "Property-level configuration",
      "Portfolio visibility",
      "Consistent request handling",
    ],
    benefits: [
      { title: "One standard", body: "Shared guidance, adapted per property." },
      { title: "Clear visibility", body: "See demand and conversation trends across the portfolio." },
    ],
    screen: "analytics",
    sample: {
      guest: "Do you have parking on site?",
      sarai: "Yes — this property has on-site parking. Details are in your arrival guide.",
      action: "Answered · Property knowledge",
    },
  },
  {
    slug: "multi-property-groups",
    name: "Multi-Property Groups",
    shortName: "Multi-Property",
    icon: "layers",
    headline: "Create a scalable guest experience layer across the portfolio.",
    summary:
      "Roll out one intelligent guest experience layer across brands and locations, designed to grow with your portfolio.",
    useCases: [
      "Portfolio-wide rollout",
      "Brand-specific tone",
      "Central insight, local action",
      "Multi-property administration",
    ],
    benefits: [
      { title: "Built to scale", body: "Add properties without rebuilding workflows." },
      { title: "Central insight", body: "Understand guest demand across locations." },
    ],
    screen: "overview",
    sample: {
      guest: "Can I book the same room type at your other location?",
      sarai: "I'll pass this to our reservations team so they can check availability for you.",
      action: "Reservations request · Group",
    },
  },
];
