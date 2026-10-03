import type { FaqItem } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { Accordion } from "@/components/faq/Accordion";
import { JsonLd } from "@/components/layout/JsonLd";

/** Solutions questions. Answers only repeat what the solution panels above already say. */
const solutionsFaqs: FaqItem[] = [
  {
    id: "who-is-it-for",
    question: "Which kinds of properties is SaraiOS built for?",
    answer:
      "Hotels, resorts, boutique and luxury properties, hotel management companies and multi-property groups. SaraiOS adapts to your guests, your team and your way of working.",
  },
  {
    id: "small-property",
    question: "Does it suit a small boutique property?",
    answer:
      "Yes. Sarai covers late-night questions and routine requests in your property's own voice, so only the conversations that need a person reach your team.",
  },
  {
    id: "resorts",
    question: "How does it work for a resort?",
    answer:
      "Sarai surfaces the right experience at the right moment, such as activities, spa and dining, and routes bookings to the teams that run them as structured requests.",
  },
  {
    id: "luxury",
    question: "Can it support high-touch luxury service?",
    answer:
      "Yes. Sarai uses stay context and recorded preferences so guests don't repeat themselves, and hands off to your butler or concierge with the full conversation in view.",
  },
  {
    id: "own-tone",
    question: "Can each property keep its own knowledge and tone?",
    answer:
      "Yes. Each hotel keeps its own knowledge, tone and workflows, while management companies and groups set shared guidance and a consistent service standard.",
  },
  {
    id: "portfolio-view",
    question: "Can we see what is happening across several properties?",
    answer:
      "Management companies and groups can see demand and conversation trends across the portfolio, so insight is central while action stays local.",
  },
];

export function SolutionsFaq() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <JsonLd data={faqJsonLd(solutionsFaqs)} />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">FAQ</p>
          <h2 className="mt-5 max-w-[14ch] heading-section text-balance text-subheading">
            Questions about our solutions.
          </h2>
          <ArrowButton href="/faq" size="sm" variant="secondary" className="mt-8">
            View All FAQs
          </ArrowButton>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={solutionsFaqs} defaultOpen={solutionsFaqs[0]?.id} />
        </Reveal>
      </Container>
    </section>
  );
}
