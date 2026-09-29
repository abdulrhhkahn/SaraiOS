import { faqCategories } from "@/lib/faq";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { PlanCards } from "@/components/pricing/PlanCards";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { Accordion } from "@/components/faq/Accordion";
import { JsonLd } from "@/components/layout/JsonLd";

export const metadata = pageMetadata({
  title: "SaraiOS Pricing",
  description:
    "SaraiOS pricing is tailored to your property. Custom plans for individual hotels and growing groups, and Enterprise for multi-property organizations.",
  path: "/pricing",
});

const pricingFaqs = [
  ...(faqCategories.find((c) => c.id === "pricing")?.items ?? []),
  ...(faqCategories.find((c) => c.id === "operations")?.items.filter((i) => i.id === "implementation") ?? []),
  ...(faqCategories.find((c) => c.id === "integrations")?.items ?? []),
];

const steps = [
  { title: "Discovery", body: "We learn about your property, guests, team and systems." },
  { title: "Proposal", body: "A deployment and pricing proposal shaped around your operation." },
  { title: "Configuration", body: "Knowledge, tone, routing and handoff rules set up with your team." },
  { title: "Go live", body: "Launch with support, then refine as you learn from guest conversations." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaqs)} />
      <PageHero
        eyebrow="Pricing"
        title="A guest experience platform built around your operation."
        body="Every hotel has different requirements, workflows and technology. Let's build the right SaraiOS deployment for your property."
      />
      <Container className="pb-8">
        <h2 className="sr-only">Plans</h2>
        <PlanCards />
      </Container>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Compare"
              title="What's in each deployment."
              body="Final scope is confirmed with you during discovery."
            />
          </Reveal>
          <Reveal className="mt-12">
            <ComparisonTable />
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-linen-2/60">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="From first call to go-live." />
          </Reveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="rounded-3xl bg-card p-6 ring-1 ring-line">
                <p className="text-sm font-semibold text-brass-ink">Step {i + 1}</p>
                <h3 className="mt-3 heading-sub text-2xl">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Pricing FAQ" title="Good questions to ask." />
          </Reveal>
          <Reveal>
            <Accordion items={pricingFaqs} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
