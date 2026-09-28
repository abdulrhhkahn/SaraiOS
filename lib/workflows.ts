/** "AI Takes Action" example workflows. Each step is illustrative, not a guarantee. */
export type WorkflowStep = { label: string; detail: string };

export type Workflow = {
  id: string;
  label: string;
  icon: "plane" | "clock" | "bath" | "utensils" | "flower" | "bed" | "info";
  guest: string;
  steps: WorkflowStep[];
  team: string;
  confirmation: string;
};

export const workflows: Workflow[] = [
  {
    id: "airport-transfer",
    label: "Airport transfer",
    icon: "plane",
    guest: "Can you arrange an airport transfer for Friday morning?",
    steps: [
      { label: "Sarai understands", detail: "Transfer request · Friday AM · departure" },
      { label: "Checks stay context", detail: "Checkout Friday · 2 guests · Room 412" },
      { label: "Creates request", detail: "Airport transfer · awaiting time confirmation" },
    ],
    team: "Concierge & transport",
    confirmation: "Your transfer request is with our concierge team. They'll confirm the pickup time shortly.",
  },
  {
    id: "late-checkout",
    label: "Late checkout",
    icon: "clock",
    guest: "Is a late checkout possible tomorrow?",
    steps: [
      { label: "Sarai understands", detail: "Late checkout · tomorrow" },
      { label: "Checks stay context", detail: "Room 412 · availability rules for your property" },
      { label: "Creates request", detail: "Late checkout · 2:00 PM" },
    ],
    team: "Front desk",
    confirmation: "Late checkout until 2:00 PM is confirmed. I've added it to your stay.",
  },
  {
    id: "extra-towels",
    label: "Extra towels",
    icon: "bath",
    guest: "Could we get some extra towels, please?",
    steps: [
      { label: "Sarai understands", detail: "Amenity request · towels" },
      { label: "Checks stay context", detail: "Room 207 · guest in room" },
      { label: "Creates request", detail: "Housekeeping · extra towels" },
    ],
    team: "Housekeeping",
    confirmation: "Housekeeping has your request and will bring extra towels to Room 207.",
  },
  {
    id: "restaurant",
    label: "Restaurant reservation",
    icon: "utensils",
    guest: "Can you book dinner for two at the restaurant tonight?",
    steps: [
      { label: "Sarai understands", detail: "Dining · tonight · 2 guests" },
      { label: "Checks stay context", detail: "Guest preferences · dietary notes" },
      { label: "Creates request", detail: "Table request · restaurant team" },
    ],
    team: "Restaurant",
    confirmation: "I've sent your request to the restaurant. They'll confirm a time for two tonight.",
  },
  {
    id: "spa",
    label: "Spa booking",
    icon: "flower",
    guest: "Are there any massage slots tomorrow afternoon?",
    steps: [
      { label: "Sarai understands", detail: "Spa · massage · tomorrow PM" },
      { label: "Checks stay context", detail: "Spa hours · guest schedule" },
      { label: "Creates request", detail: "Spa booking request" },
    ],
    team: "Spa",
    confirmation: "Your spa request is in. The spa team will reply with available times.",
  },
  {
    id: "upgrade",
    label: "Room upgrade",
    icon: "bed",
    guest: "Is there any chance of a room with a view?",
    steps: [
      { label: "Sarai understands", detail: "Upgrade interest · view preference" },
      { label: "Checks stay context", detail: "Current room · stay dates" },
      { label: "Creates request", detail: "Upgrade opportunity · front desk review" },
    ],
    team: "Front desk & revenue",
    confirmation: "I've passed this to the front desk — they'll let you know which upgrade options are available.",
  },
  {
    id: "info",
    label: "Hotel information",
    icon: "info",
    guest: "What time is breakfast, and what's the Wi-Fi?",
    steps: [
      { label: "Sarai understands", detail: "Information · breakfast, Wi-Fi" },
      { label: "Checks hotel knowledge", detail: "Your property's approved answers" },
      { label: "Answers directly", detail: "No request needed" },
    ],
    team: "Handled by Sarai",
    confirmation: "Breakfast is served from 7:00 to 10:30 AM. The Wi-Fi details are in your welcome message.",
  },
];

/** Core value-flow nodes (home value proposition). */
export const valueFlow = [
  { id: "guest", label: "Guest", detail: "Asks in their own words" },
  { id: "sarai", label: "Sarai", detail: "Understands intent" },
  { id: "context", label: "Hotel context", detail: "Stay, policies, availability" },
  { id: "action", label: "Action", detail: "Structured request created" },
  { id: "staff", label: "Staff", detail: "Right team, notified" },
  { id: "confirm", label: "Guest confirmation", detail: "Closed loop" },
] as const;
