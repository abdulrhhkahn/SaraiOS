import { guestJourney } from "@/lib/content";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";

/** A five-step timeline: the guest's stay, told stage by stage. */
export function GuestJourney() {
  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading
            title="The guest journey"
            body="Sarai is there at every stage of the stay — and so is the context from every conversation before it."
          />
        </Reveal>
        <Stagger as="ol" className="relative mt-16 grid gap-8 md:grid-cols-5 md:gap-6" stagger={0.1}>
          <span
            aria-hidden
            className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-transparent via-black/15 to-transparent md:block"
          />
          {guestJourney.map((s, i) => (
            <RevealItem
              as="li"
              key={s.stage}
              className="relative flex gap-4 md:flex-col md:items-start md:px-2 md:text-left"
            >
              <span
                aria-hidden
                className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-lg font-semibold text-linen ring-4 ring-page"
              >
                {i + 1}
              </span>
              <div className="md:mt-5">
                <p className="inline-flex rounded-full bg-linen-2 px-3 py-1 text-xs font-semibold tracking-[0.1em] text-brass-ink uppercase">
                  {s.stage}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-subheading">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
