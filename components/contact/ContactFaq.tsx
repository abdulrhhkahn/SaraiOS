import type { FaqItem } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { Accordion } from "@/components/faq/Accordion";
import { JsonLd } from "@/components/layout/JsonLd";

/** Contact questions. Answers repeat what the contact form, demo page and pricing page already say. */
const contactFaqs: FaqItem[] = [
  {
    id: "after-sending",
    question: "What happens after I send a message?",
    answer: "A member of the SaraiOS team will review your message and reply to your work email.",
  },
  {
    id: "what-to-include",
    question: "What should I include in my message?",
    answer:
      "Tell us a little about your property and what you'd like to discuss. The form also asks for your role and the number of properties you run, so we understand your setup from the start.",
  },
  {
    id: "see-product",
    question: "Can I see the product before I get in touch?",
    answer: "Yes. Book a guided demo tailored to your property from the demo page.",
  },
  {
    id: "pricing",
    question: "Where can I see pricing?",
    answer:
      "The pricing page lists the Essential, Growth and Pro plans with a monthly or yearly option. Essential is free to start, with an onboarding fee of PKR 5,000.",
  },
  {
    id: "who-for",
    question: "Does SaraiOS work for my kind of property?",
    answer:
      "SaraiOS is built for hotels, resorts, boutique and luxury properties, hotel management companies and multi-property groups.",
  },
  {
    id: "quick-answers",
    question: "Is there somewhere I can read answers first?",
    answer: "Yes. The FAQ page has answers about the platform, operations and pricing.",
  },
];

export function ContactFaq() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <JsonLd data={faqJsonLd(contactFaqs)} />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">FAQ</p>
          <h2 className="mt-5 max-w-[14ch] heading-section text-balance text-subheading">Before you get in touch.</h2>
          <ArrowButton href="/faq" size="sm" variant="secondary" className="mt-8">
            View All FAQs
          </ArrowButton>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={contactFaqs} defaultOpen={contactFaqs[0]?.id} />
        </Reveal>
      </Container>
    </section>
  );
}
