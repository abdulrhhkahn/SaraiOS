/**
 * Blog content — PLACEHOLDER / DEMO ARTICLES.
 * Replace with real editorial content before launch.
 *
 * Content is stored as typed blocks so it maps cleanly onto a headless CMS
 * (Sanity, Contentful, etc.) later: fetch posts, map them to `BlogPost`,
 * and keep the page components unchanged.
 */

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src?: string; alt: string; caption?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Guest Experience" | "Operations" | "AI in Hospitality" | "Product";
  date: string; // ISO
  author: { name: string; role: string };
  /** Optional cover in /public/images/blog. Missing files fall back to generated cover art. */
  image?: string;
  readingMinutes: number;
  featured?: boolean;
  placeholder: boolean;
  content: ContentBlock[];
};

const team = { name: "SaraiOS Team", role: "Editorial" };

export const posts: BlogPost[] = [
  {
    slug: "how-ai-is-changing-the-hotel-guest-journey",
    title: "How AI is changing the hotel guest journey",
    excerpt:
      "From the first pre-arrival question to the last checkout request, AI is reshaping how guests and hotels talk to each other.",
    category: "AI in Hospitality",
    date: "2026-09-10",
    author: team,
    image: "/images/blog/guest-journey.jpg",
    readingMinutes: 6,
    featured: true,
    placeholder: true,
    content: [
      {
        type: "paragraph",
        text: "Guests have grown used to instant answers everywhere else in their lives. When they arrive at a hotel, that expectation comes with them — before arrival, during the stay and after they leave.",
      },
      { type: "heading", text: "The journey is a conversation" },
      {
        type: "paragraph",
        text: "Most of the guest journey is made of small questions and small requests. What time is breakfast? Can I check in early? Could we get another pillow? Individually they are simple. Together, they shape how a stay feels.",
      },
      {
        type: "list",
        items: [
          "Before arrival: parking, arrival times, special requests",
          "In stay: amenities, dining, housekeeping",
          "Departure: late checkout, luggage, transport",
        ],
      },
      {
        type: "quote",
        text: "The opportunity isn't a smarter chatbot. It's closing the loop between what the guest asks and what the hotel does.",
      },
      { type: "heading", text: "From answers to actions" },
      {
        type: "paragraph",
        text: "An AI-native approach treats each conversation as the start of a workflow. The AI understands the request, checks the stay context, routes the task to the right team and confirms back to the guest.",
      },
      {
        type: "image",
        alt: "Illustration of a guest request moving from conversation to hotel team",
        caption: "Conversation → understanding → action → confirmation.",
      },
      {
        type: "paragraph",
        text: "Done well, guests feel looked after and teams spend less time relaying messages — and more time on hospitality.",
      },
    ],
  },
  {
    slug: "why-hotel-guest-messaging-needs-an-intelligent-layer",
    title: "Why hotel guest messaging needs an intelligent layer",
    excerpt: "More channels created more conversations — not better ones. Here's what an intelligent layer adds.",
    category: "Guest Experience",
    date: "2026-08-27",
    author: team,
    image: "/images/blog/messaging-layer.jpg",
    readingMinutes: 5,
    placeholder: true,
    content: [
      {
        type: "paragraph",
        text: "Hotels added messaging channels to meet guests where they are. The result is often more inboxes, more copy-paste and more requests lost between shifts.",
      },
      { type: "heading", text: "Inboxes don't understand" },
      {
        type: "paragraph",
        text: "An inbox stores messages. It doesn't know that 'can we get the room cleaned after 2' is a housekeeping request tied to a specific room.",
      },
      { type: "quote", text: "Guests don't think in departments. The system behind the conversation should." },
      { type: "heading", text: "What an intelligent layer adds" },
      {
        type: "list",
        items: [
          "Understanding of intent across conversations",
          "Hotel context — stay, room, policies",
          "Routing to the right team",
          "A clear owner and status for every thread",
        ],
      },
    ],
  },
  {
    slug: "the-future-of-the-digital-hotel-concierge",
    title: "The future of the digital hotel concierge",
    excerpt: "The concierge desk has always been about knowing the guest and knowing the place. AI can extend both.",
    category: "AI in Hospitality",
    date: "2026-08-12",
    author: team,
    image: "/images/blog/digital-concierge.jpg",
    readingMinutes: 7,
    placeholder: true,
    content: [
      {
        type: "paragraph",
        text: "Great concierges combine deep local knowledge with an understanding of each guest. A digital concierge should aim for the same standard.",
      },
      { type: "heading", text: "Knowledge, grounded in the property" },
      {
        type: "paragraph",
        text: "A useful AI concierge answers from information the hotel has approved — not from guesswork.",
      },
      { type: "quote", text: "A digital concierge should know when to help, and when to hand over to a person." },
      {
        type: "paragraph",
        text: "The best digital experiences will feel less like software and more like a well-briefed member of the team.",
      },
    ],
  },
  {
    slug: "turning-guest-requests-into-operational-workflows",
    title: "Turning guest requests into operational workflows",
    excerpt: "A request is only as good as the workflow behind it. How to go from message to completed task.",
    category: "Operations",
    date: "2026-07-30",
    author: team,
    image: "/images/blog/request-workflows.jpg",
    readingMinutes: 5,
    placeholder: true,
    content: [
      {
        type: "paragraph",
        text: "Every hotel has a version of the forwarded message: a guest asks the front desk, the front desk calls housekeeping, and nobody tells the guest what happened.",
      },
      { type: "heading", text: "Structure beats forwarding" },
      {
        type: "list",
        items: [
          "Capture the request with room and guest attached",
          "Route it to the team that owns it",
          "Track status through to completion",
          "Confirm back to the guest",
        ],
      },
      { type: "quote", text: "The guest should never have to ask twice." },
    ],
  },
  {
    slug: "how-hotels-can-use-ai-without-losing-the-human-touch",
    title: "How hotels can use AI without losing the human touch",
    excerpt: "AI should give your team more time for hospitality, not replace it. A practical perspective.",
    category: "Guest Experience",
    date: "2026-07-15",
    author: team,
    image: "/images/blog/human-touch.jpg",
    readingMinutes: 6,
    placeholder: true,
    content: [
      {
        type: "paragraph",
        text: "Hospitality is a human business. The question isn't whether to use AI — it's where it helps and where a person should step in.",
      },
      { type: "heading", text: "Let AI take the repetition" },
      {
        type: "paragraph",
        text: "Repetitive questions and simple requests are where AI shines. That frees your team for the conversations that matter most.",
      },
      { type: "quote", text: "Bring AI into the guest journey without taking the hospitality out of it." },
      { type: "heading", text: "Design the handoff" },
      {
        type: "paragraph",
        text: "A clear, graceful handoff to a person — with the full conversation in view — is what keeps the human touch intact.",
      },
    ],
  },
];

export const blogCategories = Array.from(new Set(posts.map((p) => p.category)));

export function getAllPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3) {
  const current = getPost(slug);
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current?.category);
  return [...sameCategory, ...others.filter((p) => p.category !== current?.category)].slice(0, count);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
