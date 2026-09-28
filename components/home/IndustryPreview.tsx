import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/industries";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { IndustryIcon } from "@/components/industries/IndustryIcon";

export function IndustryPreview() {
  return (
    <Section className="bg-linen-2/60">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading eyebrow="Industries" title="Designed for every kind of hospitality." />
          </Reveal>
          <Reveal>
            <ButtonLink href="/industries" variant="secondary" arrow>
              Explore Industries
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <RevealItem key={ind.slug}>
              <Link
                href={`/industries#${ind.slug}`}
                className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl bg-card p-7 ring-1 ring-line transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-night hover:shadow-[var(--shadow-frame)] focus-visible:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-linen text-ink transition-colors duration-300 group-hover:bg-white/10 group-hover:text-brass">
                    <IndustryIcon icon={ind.icon} className="size-5" />
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-stone transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-linen"
                  />
                </div>
                <h3 className="mt-auto pt-10 text-2xl font-semibold tracking-[-0.03em] transition-colors duration-300 group-hover:text-linen">
                  {ind.name}
                </h3>
                <p className="mt-2 leading-relaxed text-stone transition-colors duration-300 group-hover:text-night-muted">
                  {ind.headline}
                </p>
                {/* Product glimpse revealed on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none mt-0 grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,margin] duration-300 ease-out group-hover:mt-5 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                >
                  <div className="overflow-hidden">
                    <div className="rounded-xl bg-white/[0.06] p-3 text-sm ring-1 ring-night-line">
                      <p className="text-linen">“{ind.sample.guest}”</p>
                      <p className="mt-1.5 text-xs font-semibold text-brass">{ind.sample.action}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
