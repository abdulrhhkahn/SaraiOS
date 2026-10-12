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
        text: "Guests have grown used to instant answers everywhere else in their lives. When they arrive at a hotel, that expectation comes with them, before arrival, during the stay and after they leave.",
      },
      {
        type: "paragraph",
        text: "A booking confirmation used to be the last thing a guest heard from a hotel until they walked through the door. Today the stay starts days earlier, with a question about parking, a note about an anniversary or a request to arrive before noon.",
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
        type: "paragraph",
        text: "The trouble is that these messages arrive in different places and land with different people. A question sent at 11pm may be answered at 9am, if it is answered at all. Guests do not see that as a staffing problem. They see it as the hotel not paying attention.",
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
        src: "/images/blog/guest-journey-inline.jpg",
        alt: "A hotel lobby bar and lounge with warm lighting",
        caption: "Conversation, understanding, action, confirmation.",
      },
      { type: "heading", text: "What changes for the team" },
      {
        type: "paragraph",
        text: "When routine questions are answered instantly and requests arrive already sorted, the front desk stops acting as a switchboard. Housekeeping sees the room and the request in one place. Managers can see what is open, what is late and what guests are asking about most.",
      },
      {
        type: "list",
        items: [
          "Fewer repeated questions at the desk and on the phone",
          "Requests reach the right department the first time",
          "Clear status on every open task",
          "A record of what guests actually ask for",
        ],
      },
      { type: "heading", text: "Where to start" },
      {
        type: "paragraph",
        text: "You do not need to automate the whole journey on day one. Pick the moments where guests ask the same thing again and again, such as arrival details, Wi-Fi, breakfast and checkout, and make those instant. Then move on to requests that need a team to act.",
      },
      {
        type: "paragraph",
        text: "Done well, guests feel looked after and teams spend less time relaying messages, and more time on hospitality.",
      },
    ],
  },
  {
    slug: "why-hotel-guest-messaging-needs-an-intelligent-layer",
    title: "Why hotel guest messaging needs an intelligent layer",
    excerpt: "More channels created more conversations, not better ones. Here's what an intelligent layer adds.",
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
      {
        type: "paragraph",
        text: "A typical property now hears from guests through WhatsApp, SMS, email, the booking platform and the front desk phone. Each channel works on its own. None of them knows what the others have said.",
      },
      { type: "heading", text: "Inboxes don't understand" },
      {
        type: "paragraph",
        text: "An inbox stores messages. It doesn't know that 'can we get the room cleaned after 2' is a housekeeping request tied to a specific room, or that the same guest asked about late checkout an hour ago.",
      },
      { type: "quote", text: "Guests don't think in departments. The system behind the conversation should." },
      {
        type: "image",
        src: "/images/blog/messaging-layer-inline.jpg",
        alt: "A bright hotel lounge with seating areas and plants",
        caption: "One conversation per guest, whichever channel they use.",
      },
      { type: "heading", text: "What an intelligent layer adds" },
      {
        type: "list",
        items: [
          "Understanding of intent across conversations",
          "Hotel context such as stay dates, room and policies",
          "Routing to the right team",
          "A clear owner and status for every thread",
        ],
      },
      {
        type: "paragraph",
        text: "None of this replaces your existing channels. The layer sits on top of them, so guests keep using whatever they prefer while your team works from a single, organised view.",
      },
      { type: "heading", text: "The cost of doing nothing" },
      {
        type: "paragraph",
        text: "Lost requests rarely show up as a line in a report. They show up as a lower review score, a complaint at checkout or a guest who does not come back. Teams also pay in time, because every forwarded message is a small interruption for someone else.",
      },
      { type: "heading", text: "Questions to ask before you choose a tool" },
      {
        type: "list",
        items: [
          "Does it understand what the guest wants, or only store the message?",
          "Can it use information your hotel has approved?",
          "Does it hand over to a person smoothly when it should?",
          "Can managers see response times and open requests?",
        ],
      },
      {
        type: "paragraph",
        text: "If the answer to those is yes, messaging stops being a pile of inboxes and becomes part of how the hotel runs.",
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
      {
        type: "paragraph",
        text: "The best human concierges remember preferences, read the mood of a request and know which restaurant is worth the walk on a rainy evening. That is hard to scale, and it is only available during a shift.",
      },
      { type: "heading", text: "Knowledge, grounded in the property" },
      {
        type: "paragraph",
        text: "A useful AI concierge answers from information the hotel has approved, not from guesswork. Opening hours, menus, room types, policies and local recommendations all come from the property itself, so the answer a guest gets is the answer the team would give.",
      },
      {
        type: "image",
        src: "/images/blog/digital-concierge-inline.jpg",
        alt: "A hotel reception area with decorative stonework and plants",
        caption: "The concierge desk, available at any hour.",
      },
      { type: "quote", text: "A digital concierge should know when to help, and when to hand over to a person." },
      { type: "heading", text: "What it should handle" },
      {
        type: "list",
        items: [
          "Everyday questions about the hotel and the neighbourhood",
          "Requests that need a team, such as towels or late checkout",
          "Recommendations that fit the guest's stay",
          "Information in the guest's own language",
        ],
      },
      { type: "heading", text: "What it should leave to people" },
      {
        type: "paragraph",
        text: "Complaints, sensitive situations and anything that calls for judgement belong with your team. A good digital concierge recognises these moments early and passes the whole conversation across, so the guest never has to repeat themselves.",
      },
      { type: "heading", text: "Looking ahead" },
      {
        type: "paragraph",
        text: "Over time the concierge will do more than answer. It will notice patterns, such as the questions that come up before every arrival, and help the hotel answer them before they are asked.",
      },
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
      {
        type: "paragraph",
        text: "It works on a quiet day. On a busy Friday, with a shift change in the middle, it is where requests go missing.",
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
      {
        type: "image",
        src: "/images/blog/request-workflows-inline.jpg",
        alt: "A long quiet hotel corridor with guest room doors",
        caption: "Every door in the corridor is a request waiting to be closed.",
      },
      { type: "heading", text: "Give every request an owner" },
      {
        type: "paragraph",
        text: "A request without an owner is a request that waits. Assigning each one to a department, and ideally to a person, means everyone can see what is theirs and what is done. It also makes handovers between shifts far easier.",
      },
      { type: "quote", text: "The guest should never have to ask twice." },
      { type: "heading", text: "Measure what matters" },
      {
        type: "paragraph",
        text: "Once requests are structured, you can see how long they take. Which ones are slow, which team is overloaded and which hours are busiest all become visible. That turns operations from a feeling into something you can improve.",
      },
      {
        type: "list",
        items: [
          "Time from request to first response",
          "Time from request to completion",
          "Open requests by department",
          "Most common request types",
        ],
      },
      {
        type: "paragraph",
        text: "Start with one or two request types, such as housekeeping and maintenance, get them running smoothly and then add the rest.",
      },
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
        text: "Hospitality is a human business. The question isn't whether to use AI, it's where it helps and where a person should step in.",
      },
      {
        type: "paragraph",
        text: "Guests remember how a stay made them feel. A warm welcome, a thoughtful detail and a problem fixed quickly matter far more than the technology behind them.",
      },
      { type: "heading", text: "Let AI take the repetition" },
      {
        type: "paragraph",
        text: "Repetitive questions and simple requests are where AI shines. That frees your team for the conversations that matter most.",
      },
      {
        type: "image",
        src: "/images/blog/human-touch-inline.jpg",
        alt: "An elegant hotel hallway with a chandelier and armchair",
        caption: "More time for the details guests notice.",
      },
      { type: "quote", text: "Bring AI into the guest journey without taking the hospitality out of it." },
      { type: "heading", text: "Design the handoff" },
      {
        type: "paragraph",
        text: "A clear, graceful handoff to a person, with the full conversation in view, is what keeps the human touch intact. The guest should feel they are being passed to someone who already knows the situation.",
      },
      { type: "heading", text: "Guidelines that work" },
      {
        type: "list",
        items: [
          "Be open that guests are talking to an AI concierge",
          "Let guests reach a person at any point",
          "Keep your hotel's tone of voice in every reply",
          "Review conversations regularly and improve the answers",
        ],
      },
      { type: "heading", text: "Measure the human side too" },
      {
        type: "paragraph",
        text: "Faster replies are easy to count. Also look at guest feedback, repeat stays and how your team feels about their day. If the technology is working, staff should have more time for guests, not less.",
      },
      {
        type: "paragraph",
        text: "The goal is a hotel that feels more attentive, not more automated.",
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
