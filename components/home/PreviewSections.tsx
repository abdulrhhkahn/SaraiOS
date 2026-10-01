import { featuredFaqs } from "@/lib/faq";
import { ButtonLink, Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { Accordion } from "@/components/faq/Accordion";

export function FaqPreview() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <p className="font-mono text-[0.8125rem] tracking-[0.08em] text-cta uppercase">FAQ</p>
          <h2 className="mt-5 heading-section text-balance text-subheading">Questions, answered.</h2>
          <ButtonLink href="/faq" size="sm" variant="secondary" arrow className="mt-8">
            View All FAQs
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={featuredFaqs} defaultOpen={featuredFaqs[0]?.id} />
        </Reveal>
      </Container>
    </Section>
  );
}
