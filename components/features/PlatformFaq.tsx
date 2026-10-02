import type { FaqItem } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { Accordion } from "@/components/faq/Accordion";
import { JsonLd } from "@/components/layout/JsonLd";

/** Platform questions. Answers describe what the product does today; confirm specifics before adding more. */
const platformFaqs: FaqItem[] = [
  {
    id: "guest-check-in",
    question: "How do guests check in?",
    answer:
      "Guests scan a QR code or open a link on their phone, with no login. They add their details, can add an ID document, sign, and land in the guest hub. Your team then reviews each arrival on the Check-ins page.",
  },
  {
    id: "id-documents",
    question: "What happens to guest ID documents?",
    answer:
      "ID documents are stored securely and deleted automatically 30 days after check-out. Staff can open a guest to see their details, ID document and signature.",
  },
  {
    id: "team-and-ai",
    question: "Can my team step in when the AI answers a guest?",
    answer:
      "Yes. Conversations from web chat, SMS and WhatsApp arrive in one list. Sarai can suggest replies from your saved answers, and your team can approve them, edit them or write their own. Every conversation has an audit trail.",
  },
  {
    id: "ai-autonomy",
    question: "Can we control how much the AI does on its own?",
    answer:
      "Yes. You set the AI's level per topic, from suggesting replies to answering on its own, and every change to those levels is logged so you can see what changed and when.",
  },
  {
    id: "requests",
    question: "How do requests work?",
    answer:
      "Staff raise a structured request from within a conversation. The Requests page lists every request, and you can filter the list by department.",
  },
  {
    id: "analytics",
    question: "What do the analytics show?",
    answer:
      "Total replies, the AI-answered share and staff replies, average guest wait and time to staff response by property, the conversation that has waited longest, and guest satisfaction. You pick the date range and can download a summary.",
  },
  {
    id: "staff-activity",
    question: "Can we see who did what?",
    answer:
      "Yes. Staff activity lists the tasks each team member carried out, grouped by email, with daily, weekly, monthly and yearly views. History stays available to revisit anytime.",
  },
];

export function PlatformFaq() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <JsonLd data={faqJsonLd(platformFaqs)} />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">FAQ</p>
          <h2 className="mt-5 max-w-[14ch] heading-section text-balance text-subheading">
            Questions about the platform.
          </h2>
          <ArrowButton href="/faq" size="sm" variant="secondary" className="mt-8">
            View All FAQs
          </ArrowButton>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={platformFaqs} defaultOpen={platformFaqs[0]?.id} />
        </Reveal>
      </Container>
    </section>
  );
}
