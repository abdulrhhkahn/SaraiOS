import type { FaqItem } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { Accordion } from "@/components/faq/Accordion";
import { JsonLd } from "@/components/layout/JsonLd";

/** Demo questions. Answers repeat what the demo, contact and pricing pages already say. */
const demoFaqs: FaqItem[] = [
  {
    id: "what-happens",
    question: "What happens in the demo?",
    answer:
      "We walk you through the guest and team experience, show how requests are created and assigned to your departments and how SaraiOS fits alongside your systems, and finish with next steps and a tailored proposal.",
  },
  {
    id: "after-request",
    question: "What happens after I request a demo?",
    answer: "A member of the SaraiOS team will be in touch shortly to find a time that works for your team.",
  },
  {
    id: "install",
    question: "Do I need to install anything?",
    answer:
      "No. SaraiOS is cloud based and runs in a web browser. Guests open the guest hub from a link on their own phone, with no app store download.",
  },
  {
    id: "tailored",
    question: "Will the demo be tailored to my property?",
    answer:
      "Yes. The demo is tailored to your property's guests, workflows and systems. The form asks about your role and the number of properties you run, so we can prepare for your setup.",
  },
  {
    id: "sample-data",
    question: "Are the screens on the website real guest data?",
    answer: "No. The sample screens on this site use demo data and a demo hotel, never real guest information.",
  },
  {
    id: "pricing",
    question: "Can I see pricing before I book?",
    answer:
      "Yes. The pricing page lists the Essential, Growth and Pro plans with a monthly or yearly option. Essential is free to start, with an onboarding fee of PKR 5,000.",
  },
];

export function DemoFaq() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <JsonLd data={faqJsonLd(demoFaqs)} />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">FAQ</p>
          <h2 className="mt-5 max-w-[14ch] heading-section text-balance text-subheading">Before you book a demo.</h2>
          <ArrowButton href="/faq" size="sm" variant="secondary" className="mt-8">
            View All FAQs
          </ArrowButton>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={demoFaqs} defaultOpen={demoFaqs[0]?.id} />
        </Reveal>
      </Container>
    </section>
  );
}
