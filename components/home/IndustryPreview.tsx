import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/industries";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { IndustryIcon } from "@/components/industries/IndustryIcon";

export function IndustryPreview() {
  return (
    <section className="relative">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="font-mono text-[0.8125rem] tracking-[0.08em] text-cta uppercase">Solutions</p>
            <h2 className="mt-5 max-w-[22ch] heading-section text-balance text-subheading">
              Designed for every kind of hospitality.
            </h2>
          </Reveal>
          <Reveal>
            <ButtonLink href="/industries" size="sm" variant="secondary" arrow>
              Explore Solutions
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
          {industries.map((ind) => (
            <RevealItem key={ind.slug} className="h-full">
              <Link
                href={`/industries#${ind.slug}`}
                className="on-night group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-black/[0.08] transition-[transform,box-shadow,background-color,--tw-ring-color] duration-300 ease-out hover:-translate-y-1 hover:bg-cta hover:shadow-[0_28px_50px_-30px_rgba(0,120,125,0.75)] hover:ring-cta focus-visible:-translate-y-1 focus-visible:bg-cta sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white text-cta shadow-sm ring-1 ring-line transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white group-hover:ring-white/25 group-focus-visible:bg-white/15 group-focus-visible:text-white">
                    <IndustryIcon icon={ind.icon} className="size-5" />
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-ink/40 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white group-focus-visible:text-white"
                  />
                </div>
                <h3 className="mt-auto pt-10 heading-sub text-xl text-subheading transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                  {ind.name}
                </h3>
                <p className="mt-2 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60 transition-colors duration-300 group-hover:text-white/85 group-focus-visible:text-white/85">
                  {ind.headline}
                </p>
                {/* Product glimpse revealed on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none mt-0 grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,margin] duration-300 ease-out group-hover:mt-5 group-hover:grid-rows-[1fr] group-hover:opacity-100"
                >
                  <div className="overflow-hidden">
                    <div className="rounded-xl bg-white/15 p-3 text-sm ring-1 ring-white/25">
                      <p className="text-white">“{ind.sample.guest}”</p>
                      <p className="mt-1.5 text-xs font-semibold text-white">{ind.sample.action}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
