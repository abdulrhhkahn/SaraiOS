/**
 * Blog content.
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
  | { type: "image"; src?: string; alt: string; caption?: string }
  | {
      type: "story";
      /** e.g. "Hotel example" or "Industry research". Always a third-party, linked source. */
      label: string;
      title: string;
      text: string;
      /** What it means for a hotel using SaraiOS. */
      takeaway: string;
      source: { name: string; url: string };
    };

export type BlogFaq = { question: string; answer: string };
export type BlogSource = { title: string; publisher: string; url: string };

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
  /** ISO date of the last substantive edit. */
  updated: string;
  /** Direct, self-contained answer to the title question (shown at the top, reused in structured data). */
  answer: string;
  keywords: string[];
  takeaways: string[];
  faqs: BlogFaq[];
  sources: BlogSource[];
  featured?: boolean;
  content: ContentBlock[];
};

const team = { name: "SaraiOS Team", role: "Editorial" };

const UPDATED = "2026-10-13";

export const posts: BlogPost[] = [
  {
    slug: "how-ai-is-changing-the-hotel-guest-journey",
    title: "How AI is changing the hotel guest journey",
    excerpt:
      "From the first pre-arrival question to the last checkout request, AI is reshaping how guests and hotels talk to each other.",
    answer:
      "AI is changing the hotel guest journey by answering routine questions instantly, helping staff turn guest messages into tasks assigned to the right team and confirming back to the guest. The result is faster responses before arrival, during the stay and at checkout, with less manual relaying for staff.",
    keywords: ["AI hotel guest journey", "hotel guest experience AI", "hotel guest messaging", "AI concierge for hotels"],
    category: "AI in Hospitality",
    date: "2026-09-10",
    updated: UPDATED,
    author: team,
    image: "/images/blog/guest-journey.jpg",
    readingMinutes: 7,
    featured: true,
    takeaways: [
      "The guest journey is mostly small questions and requests, and speed decides how a stay feels.",
      "Guests who already use their phones for other purchases are more likely to prefer mobile messaging with a hotel.",
      "AI works best when it starts a workflow, not just a reply: understand, create, assign, track and confirm.",
      "Start with the questions guests repeat most, then move on to requests that need a team to act.",
    ],
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
        type: "story",
        label: "Industry research",
        title: "Guests who shop on their phones expect to message the hotel there too",
        text: "Hotel service company ALICE surveyed more than 400 frequent travelers in the United States. It found that guests who use mobile devices for other purchases were 42.5% more likely to prefer mobile communication for food and beverage and pre-stay services. The same research found guests felt they could complain if staff had not replied to a text request in about 12 minutes.",
        takeaway:
          "For a hotel using SaraiOS, this is why the guest side of SaraiOS is a familiar chat on the phone: guests ask in plain language, and the request reaches your team as a tracked task instead of a message waiting in someone's inbox.",
        source: {
          name: "Hospitality Technology",
          url: "https://hospitalitytech.com/alice-hotel-guests-expect-staff-responses-text-requests-12-minutes",
        },
      },
      {
        type: "quote",
        text: "The opportunity isn't a smarter chatbot. It's closing the loop between what the guest asks and what the hotel does.",
      },
      { type: "heading", text: "From answers to actions" },
      {
        type: "paragraph",
        text: "An AI-native approach treats each conversation as the start of a workflow. The AI understands the request and checks the stay context, staff create and assign the task to the right team, and the guest gets a confirmation.",
      },
      {
        type: "image",
        src: "/images/blog/guest-journey-inline.jpg",
        alt: "A grand hotel lobby with a crystal chandelier and a marble front desk",
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
          "Requests are assigned to the right department the first time",
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
    faqs: [
      {
        question: "How is AI used in the hotel guest journey?",
        answer:
          "AI answers routine guest questions at any hour, understands requests sent in plain language, helps staff turn them into requests for the right department and confirms back to the guest. It is used before arrival (arrival details, special requests), during the stay (amenities, housekeeping, dining) and at departure (late checkout, transport).",
      },
      {
        question: "Does AI replace hotel front desk staff?",
        answer:
          "No. AI takes over repetitive questions and simple requests so staff can spend more time on conversations that need judgement and warmth. A good setup always lets the guest reach a person and passes the full conversation across when it does.",
      },
      {
        question: "How fast do hotel guests expect a reply?",
        answer:
          "In ALICE research of more than 400 frequent US travelers, guests said they felt they could complain if staff had not replied to a text request in about 12 minutes. Expectations for email were around 26 minutes. Treat these as benchmarks from one survey, not a universal rule.",
      },
      {
        question: "Where should a hotel start with AI guest messaging?",
        answer:
          "Start with the questions guests repeat most, such as arrival details, Wi-Fi, breakfast hours and checkout. Make those answers instant and accurate, then add requests that need a team to act, such as housekeeping and maintenance.",
      },
      {
        question: "How does SaraiOS support the guest journey?",
        answer:
          "SaraiOS is an AI guest experience platform for hotels. It combines an AI concierge, digital guest check-in, a conversations view for staff, guest requests that can be created and assigned to departments, and a staff activity view, so a guest message becomes a tracked task for the right team.",
      },
    ],
    sources: [
      {
        title: "ALICE: Hotel Guests Expect Staff Responses to Text Requests in 12 Minutes",
        publisher: "Hospitality Technology",
        url: "https://hospitalitytech.com/alice-hotel-guests-expect-staff-responses-text-requests-12-minutes",
      },
    ],
  },
  {
    slug: "why-hotel-guest-messaging-needs-an-intelligent-layer",
    title: "Why hotel guest messaging needs an intelligent layer",
    excerpt: "More channels created more conversations, not better ones. Here's what an intelligent layer adds.",
    answer:
      "Hotel guest messaging needs an intelligent layer because inboxes only store messages. An intelligent layer understands what the guest wants, adds stay context, makes it easy to create the request and assign it to the right team, and tracks it to completion, so nothing is lost between channels or shifts.",
    keywords: ["hotel guest messaging", "hotel messaging platform", "guest communication hotels", "unified inbox hotel"],
    category: "Guest Experience",
    date: "2026-08-27",
    updated: UPDATED,
    author: team,
    image: "/images/blog/messaging-layer.jpg",
    readingMinutes: 7,
    takeaways: [
      "Each messaging channel set its own expectation for speed, so a single inbox per channel is not enough.",
      "An inbox stores messages. It does not know a message is a housekeeping request tied to a room.",
      "An intelligent layer adds intent, hotel context, department assignment and a clear owner for every thread.",
      "It sits on top of the channels guests already use, so guests change nothing.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Hotels added messaging channels to meet guests where they are. The result is often more inboxes, more copy-paste and more requests lost between shifts.",
      },
      {
        type: "paragraph",
        text: "A typical property now hears from guests through WhatsApp, SMS, email, the booking platform and the front desk phone. Each channel works on its own. None of them knows what the others have said.",
      },
      { type: "heading", text: "Every channel sets a different clock" },
      {
        type: "story",
        label: "Industry research",
        title: "Guests expect different reply times on different channels",
        text: "In research commissioned by ALICE with more than 400 frequent US travelers, guests said they felt they could complain if staff had not replied to a text request in about 12 minutes. For email the figure was 26 minutes, and for social media 27 minutes or less. The survey date was not stated on the page we reviewed.",
        takeaway:
          "The lesson for a hotel is that speed is judged per channel. SaraiOS puts every guest conversation in one conversations view for staff, with a status on each thread, so a slow reply is visible before the guest notices.",
        source: {
          name: "Hospitality Technology",
          url: "https://hospitalitytech.com/alice-hotel-guests-expect-staff-responses-text-requests-12-minutes",
        },
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
        alt: "A silver service bell and guest paperwork on a hotel front desk",
        caption: "One conversation per guest, whichever channel they use.",
      },
      { type: "heading", text: "What an intelligent layer adds" },
      {
        type: "list",
        items: [
          "Understanding of intent across conversations",
          "Hotel context such as stay dates, room and policies",
          "Requests assigned to the right team",
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
    faqs: [
      {
        question: "What is an intelligent messaging layer for hotels?",
        answer:
          "It is software that sits on top of the channels guests already use. It understands the intent of each message, adds context such as the stay and room, lets staff create the request and assign it to the right team, and tracks its status, instead of just storing messages in an inbox.",
      },
      {
        question: "Why isn't a shared inbox enough for hotel guest messaging?",
        answer:
          "A shared inbox shows messages but does not know what they mean. Staff still have to read each one, work out the department, forward it and remember to close the loop. That manual relaying is where requests get lost between shifts.",
      },
      {
        question: "Does a hotel need to replace its existing messaging channels?",
        answer:
          "No. An intelligent layer works with the channels guests already use. Guests keep messaging the way they prefer while staff work from one organised view.",
      },
      {
        question: "What should hotels look for in a guest messaging platform?",
        answer:
          "Look for intent understanding, use of hotel-approved information, smooth handover to a person, requests that can be assigned to departments, and visibility for managers into response times and open requests.",
      },
      {
        question: "How does SaraiOS handle guest conversations?",
        answer:
          "SaraiOS gives staff a conversations view where each guest thread has a clear status and owner. Requests raised from a conversation are assigned to the right department by staff, and the AI concierge can answer routine questions from information the hotel has approved.",
      },
    ],
    sources: [
      {
        title: "ALICE: Hotel Guests Expect Staff Responses to Text Requests in 12 Minutes",
        publisher: "Hospitality Technology",
        url: "https://hospitalitytech.com/alice-hotel-guests-expect-staff-responses-text-requests-12-minutes",
      },
    ],
  },
  {
    slug: "the-future-of-the-digital-hotel-concierge",
    title: "The future of the digital hotel concierge",
    excerpt: "The concierge desk has always been about knowing the guest and knowing the place. AI can extend both.",
    answer:
      "A digital hotel concierge is an AI assistant that answers guest questions and handles simple requests using information the hotel has approved, and hands over to a person when judgement is needed. The best ones work around the clock and feel like a well-briefed member of the team.",
    keywords: ["digital hotel concierge", "AI concierge hotel", "virtual concierge", "hotel chatbot"],
    category: "AI in Hospitality",
    date: "2026-08-12",
    updated: UPDATED,
    author: team,
    image: "/images/blog/digital-concierge.jpg",
    readingMinutes: 8,
    takeaways: [
      "A digital concierge should answer from hotel-approved information, not guesswork.",
      "Hilton piloted a Watson-powered robot concierge named Connie at the Hilton McLean in 2016, and hotels could review a log of guest questions to improve service.",
      "Knowing when to hand over to a person matters as much as the answer itself.",
      "The long-term value is learning from what guests ask, so the hotel can answer before they have to.",
    ],
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
        alt: "A hotel lounge with leather sofas, a living plant wall and wooden slat ceiling",
        caption: "The concierge desk, available at any hour.",
      },
      {
        type: "story",
        label: "Hotel example",
        title: "Hilton and IBM's Connie at the Hilton McLean",
        text: "In spring 2016, Hilton and IBM began piloting Connie, a Watson-powered robot concierge, at the Hilton McLean in McLean, Virginia. Connie greeted guests, answered questions about amenities, services and hours, and suggested dining and nearby attractions using travel data from WayBlazer. The hotel could review a log of guests' questions and Connie's answers to improve the experience before, during and after stays. The coverage reported no usage or satisfaction figures, and noted that robots like Connie were not expected to replace human concierges.",
        takeaway:
          "Two ideas carry over to any hotel. First, the questions guests ask are valuable data. Second, the concierge works best next to people. SaraiOS follows the same approach: the AI concierge answers from hotel-approved information, and staff see the conversations and can step in.",
        source: {
          name: "Speech Technology Magazine",
          url: "https://www.speechtechmag.com/Articles/Editorial/FYI/IBM-and-Hilton-Field-Test-a-Robot-Concierge-111718.aspx",
        },
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
    faqs: [
      {
        question: "What is a digital hotel concierge?",
        answer:
          "A digital hotel concierge is an AI assistant that answers guest questions and handles simple requests, such as amenities, hours, directions and local recommendations. It uses information the hotel has approved and hands over to a person when a situation needs judgement.",
      },
      {
        question: "Can an AI concierge replace a human concierge?",
        answer:
          "Not fully. Early pilots such as Hilton's Connie were described as working alongside people rather than replacing them. An AI concierge covers routine questions at any hour, while human staff handle complaints, sensitive situations and personal touches.",
      },
      {
        question: "How does an AI concierge know the right answers?",
        answer:
          "A well-built one answers only from content the hotel has provided and approved, such as opening hours, menus, policies and local recommendations. That keeps replies consistent with what your team would say and avoids guesswork.",
      },
      {
        question: "What should a hotel AI concierge hand over to staff?",
        answer:
          "Complaints, safety or health concerns, billing disputes and anything the guest asks a person for. The handover should include the full conversation so the guest does not need to repeat themselves.",
      },
      {
        question: "How does the SaraiOS AI concierge work?",
        answer:
          "The SaraiOS AI concierge answers guests from hotel-approved knowledge, and staff turn requests into tasks assigned to the right team. Staff see every conversation in one place and can take over at any point.",
      },
    ],
    sources: [
      {
        title: "IBM and Hilton Field Test a Robot Concierge",
        publisher: "Speech Technology Magazine",
        url: "https://www.speechtechmag.com/Articles/Editorial/FYI/IBM-and-Hilton-Field-Test-a-Robot-Concierge-111718.aspx",
      },
    ],
  },
  {
    slug: "turning-guest-requests-into-operational-workflows",
    title: "Turning guest requests into operational workflows",
    excerpt: "A request is only as good as the workflow behind it. How to go from message to completed task.",
    answer:
      "To turn guest requests into operational workflows, capture each request with the room and guest attached, assign it to the team that owns it, track its status until it is done and confirm back to the guest. Hotels that moved from paper and radios to mobile request tracking have reported faster response times.",
    keywords: ["hotel guest request management", "hotel operations workflow", "hotel task management", "housekeeping request tracking"],
    category: "Operations",
    date: "2026-07-30",
    updated: UPDATED,
    author: team,
    image: "/images/blog/request-workflows.jpg",
    readingMinutes: 8,
    takeaways: [
      "A forwarded message has no owner, no status and no deadline. A workflow has all three.",
      "Celebration Suites in Kissimmee, Florida reported a 45% drop in average response time after replacing paper logs with a mobile request app.",
      "At ibis London Blackfriars, an assistant general manager reported maintenance response times cut by up to 50% during a pilot.",
      "Start with one or two request types, then expand once they run smoothly.",
    ],
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
          "Assign it to the team that owns it",
          "Track status through to completion",
          "Confirm back to the guest",
        ],
      },
      {
        type: "image",
        src: "/images/blog/request-workflows-inline.jpg",
        alt: "A calm hotel guest room with a made bed and a view of the garden",
        caption: "Behind every room number is a request waiting to be closed.",
      },
      { type: "heading", text: "What hotels have reported" },
      {
        type: "story",
        label: "Hotel example",
        title: "Celebration Suites, Kissimmee, Florida",
        text: "Celebration Suites, a 550-suite limited-service property, ran on a paper-based system, and staff activity logs were often incomplete or overlooked. In summer 2016 it moved to a mobile request app on staff devices. Reported in March 2017, average response time fell by 45%, 67% of issues received a response in under 11 minutes, and completion time on outstanding issues fell by 32%. The article did not state the measurement period.",
        takeaway:
          "The change was not smarter staff, it was visibility: every request had an owner and a status. That is the idea behind the SaraiOS requests and staff activity views.",
        source: {
          name: "Hotel Management",
          url: "https://www.hotelmanagement.net/tech/lean-celebration-suites-improves-guest-request-management",
        },
      },
      {
        type: "story",
        label: "Hotel example",
        title: "ibis London Blackfriars (Accor)",
        text: "An Accor pilot of the Connect Staff mobile app, built by Monscierge, let hotel teams communicate and track and prioritise tasks across departments. ibis operates a 15 Minute Guarantee, under which guests are refunded if a request is not delivered or resolved within 15 minutes. After a six-month pilot, Assistant General Manager Frederic Le Bras said the system had helped reduce the time to respond to maintenance requests by up to 50%. Training took under an hour per hotel.",
        takeaway:
          "Clear accountability between departments matters most when a service promise is on the line. Structured assignment is how a hotel can keep that promise on a busy day.",
        source: {
          name: "Hospitality Net",
          url: "https://www.hospitalitynet.org/news/4075807.html",
        },
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
    faqs: [
      {
        question: "What is guest request management in a hotel?",
        answer:
          "It is the process of capturing each guest request, assigning it to the right department, tracking it until it is complete and confirming back to the guest. Software replaces paper logs, radios and phone calls with a shared, real-time view.",
      },
      {
        question: "How can hotels respond to guest requests faster?",
        answer:
          "Give every request an owner and a status, assign it to the department that handles it, and make open requests visible to managers. Hotels that moved from paper to mobile tools have reported faster responses, for example a 45% drop in average response time at Celebration Suites.",
      },
      {
        question: "What request types should a hotel start with?",
        answer:
          "Begin with one or two high-volume types, usually housekeeping and maintenance. Once those run smoothly, add concierge, food and beverage and front desk requests.",
      },
      {
        question: "Which metrics should hotels track for guest requests?",
        answer:
          "Time to first response, time to completion, open requests by department and the most common request types. Together they show where delays happen and which teams need support.",
      },
      {
        question: "How does SaraiOS turn guest messages into tasks?",
        answer:
          "With SaraiOS, staff create the request from a guest conversation with the room and guest attached, assign it to the right department and track its status. Managers see open and completed requests, and the guest gets a confirmation.",
      },
    ],
    sources: [
      {
        title: "Celebration Suites improves guest-request management",
        publisher: "Hotel Management",
        url: "https://www.hotelmanagement.net/tech/lean-celebration-suites-improves-guest-request-management",
      },
      {
        title: "Accor Hotels Eliminates Radios, Maintenance Logs With Mobile Request Management App",
        publisher: "Hospitality Net",
        url: "https://www.hospitalitynet.org/news/4075807.html",
      },
    ],
  },
  {
    slug: "how-hotels-can-use-ai-without-losing-the-human-touch",
    title: "How hotels can use AI without losing the human touch",
    excerpt: "AI should give your team more time for hospitality, not replace it. A practical perspective.",
    answer:
      "Hotels can use AI without losing the human touch by letting AI handle repetitive questions and simple requests, keeping people for sensitive and personal moments, and designing a clear handoff so the guest never repeats themselves. The goal is a hotel that feels more attentive, not more automated.",
    keywords: ["AI in hospitality", "human touch hotels", "hotel AI guidelines", "AI guest service hotels"],
    category: "Guest Experience",
    date: "2026-07-15",
    updated: UPDATED,
    author: team,
    image: "/images/blog/human-touch.jpg",
    readingMinutes: 8,
    takeaways: [
      "Let AI take repetition and keep people for judgement, warmth and recovery.",
      "In a 2025 Hotels.com survey of over 450 properties, 70% of hotels said guests prefer human interaction for check-in and front desk support.",
      "A graceful handoff with the full conversation in view protects the human touch.",
      "Be open that guests are talking to an AI, and always let them reach a person.",
    ],
    content: [
      {
        type: "paragraph",
        text: "Hospitality is a human business. The question isn't whether to use AI, it's where it helps and where a person should step in.",
      },
      {
        type: "paragraph",
        text: "Guests remember how a stay made them feel. A warm welcome, a thoughtful detail and a problem fixed quickly matter far more than the technology behind them.",
      },
      { type: "heading", text: "What hotels say guests want" },
      {
        type: "story",
        label: "Industry research",
        title: "Hotels.com Hotel Room Innsights, 2025",
        text: "Hotels.com surveyed more than 450 properties worldwide between July 1 and August 1, 2025. Seventy percent of the hotels said guests prefer human interaction for check-in and front desk support. This figure reflects hotels' views, not guests' own answers, and the survey was mainly about smart room technology.",
        takeaway:
          "It does not say guests reject technology. It says the moments that carry emotion, such as arrival and problems, are where people matter most. SaraiOS is built around that split: AI for the repetitive work, staff for the moments that count.",
        source: {
          name: "Travel Agent Central",
          url: "https://www.travelagentcentral.com/data-trends/hotelscom-survey-guests-prefer-human-interactions-over-tech-replacements",
        },
      },
      { type: "heading", text: "Let AI take the repetition" },
      {
        type: "paragraph",
        text: "Repetitive questions and simple requests are where AI shines. That frees your team for the conversations that matter most.",
      },
      {
        type: "image",
        src: "/images/blog/human-touch-inline.jpg",
        alt: "A hotel pool and palm trees at dusk",
        caption: "More time for the details guests notice.",
      },
      { type: "quote", text: "Bring AI into the guest journey without taking the hospitality out of it." },
      { type: "heading", text: "Side by side, not instead" },
      {
        type: "story",
        label: "Hotel example",
        title: "Hilton's Connie, 2016",
        text: "When Hilton piloted its Watson-powered robot concierge Connie at the Hilton McLean, coverage cited a Travelzoo study finding that consumers see robots and humans working side by side in customer-facing roles as the ideal situation. The same coverage noted robots like Connie were not expected to replace human concierges.",
        takeaway:
          "A hotel can adopt the same stance today: AI answers and assists, people welcome and resolve.",
        source: {
          name: "Speech Technology Magazine",
          url: "https://www.speechtechmag.com/Articles/Editorial/FYI/IBM-and-Hilton-Field-Test-a-Robot-Concierge-111718.aspx",
        },
      },
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
    faqs: [
      {
        question: "Will AI make hotel service feel impersonal?",
        answer:
          "It can if it replaces people in emotional moments. Used well, AI handles repetitive questions so staff have more time for welcome, recovery and personal touches. Keep humans in the moments that carry feeling, and make it easy for guests to reach a person.",
      },
      {
        question: "Do hotel guests prefer humans or technology?",
        answer:
          "It depends on the moment. In a 2025 Hotels.com survey of over 450 properties, 70% of hotels said guests prefer human interaction for check-in and front desk support. That reflects hotels' views, and guests also value fast, easy self-service for simple needs.",
      },
      {
        question: "When should an AI concierge hand over to a person?",
        answer:
          "When the guest asks for a person, when there is a complaint, a safety or health concern, a billing issue or anything that needs judgement. The handoff should carry the full conversation so the guest does not repeat themselves.",
      },
      {
        question: "Should hotels tell guests they are talking to AI?",
        answer:
          "Yes. Being open builds trust, and guests can then choose when to switch to a person. Keep the hotel's tone of voice consistent in every reply.",
      },
      {
        question: "How does SaraiOS keep the human touch?",
        answer:
          "SaraiOS gives staff one view of every conversation, so they can step in at any moment with full context. The AI concierge covers routine questions from hotel-approved information, which leaves your team more time for guests.",
      },
    ],
    sources: [
      {
        title: "Hotels.com Survey: Guests Prefer Human Interactions Over Tech Replacements",
        publisher: "Travel Agent Central",
        url: "https://www.travelagentcentral.com/data-trends/hotelscom-survey-guests-prefer-human-interactions-over-tech-replacements",
      },
      {
        title: "IBM and Hilton Field Test a Robot Concierge",
        publisher: "Speech Technology Magazine",
        url: "https://www.speechtechmag.com/Articles/Editorial/FYI/IBM-and-Hilton-Field-Test-a-Robot-Concierge-111718.aspx",
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
