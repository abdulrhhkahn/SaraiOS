import { Check, Sparkles } from "lucide-react";
import type { Industry } from "@/lib/industries";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { scaleIn } from "@/components/animations/variants";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";
import { IndustryIcon } from "./IndustryIcon";
import { cn } from "@/lib/cn";

/** One industry: hero visual + product UI + use cases + benefits + CTA, alternating sides. */
export function IndustrySection({ industry, src, flip }: { industry: Industry; src: string | null; flip?: boolean }) {
  return (
    <section id={industry.slug} aria-labelledby={`${industry.slug}-title`} className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className={cn(flip && "lg:order-2")}>
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-ink text-brass">
                <IndustryIcon icon={industry.icon} className="size-5" />
              </span>
              <Eyebrow>{industry.name}</Eyebrow>
            </div>
            <h2 id={`${industry.slug}-title`} className="mt-6 heading-section text-balance">
              {industry.headline}
            </h2>
            <p className="mt-5 lead text-stone">{industry.summary}</p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold tracking-[0.14em] text-stone uppercase">Use cases</h3>
                <ul className="mt-3 space-y-2">
                  {industry.useCases.map((u) => (
                    <li key={u} className="flex gap-2.5">
                      <Check className="mt-1 size-4 shrink-0 text-iris-ink" aria-hidden />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-[0.14em] text-stone uppercase">Benefits</h3>
                {industry.benefits.map((b) => (
                  <div key={b.title}>
                    <p className="font-semibold">{b.title}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-stone">{b.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <ButtonLink href="/demo" className="mt-10" arrow>
              Book a Demo
            </ButtonLink>
          </Reveal>

          <Reveal variants={scaleIn} className={cn("relative", flip && "lg:order-1")}>
            <div className="relative rounded-[2rem] bg-linen-2 p-4 sm:p-8">
              <ProductScreenshot screen={industry.screen} src={src} sizes="(min-width: 1024px) 45vw, 100vw" />
              {/* Conversation glimpse specific to this industry */}
              <div className="relative z-10 mx-auto -mt-10 w-[88%] rounded-2xl bg-card p-4 shadow-[var(--shadow-float)] ring-1 ring-line sm:-mt-16 sm:mr-0 sm:ml-auto sm:w-[72%]">
                <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2 text-sm text-linen">
                  {industry.sample.guest}
                </p>
                <p className="mt-2 w-fit max-w-[92%] rounded-2xl rounded-bl-md bg-linen px-3.5 py-2 text-sm ring-1 ring-line">
                  <span className="block text-[0.6rem] font-bold tracking-[0.12em] text-iris-ink uppercase">Sarai</span>
                  {industry.sample.sarai}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brass-ink">
                  <Sparkles className="size-3.5" aria-hidden /> {industry.sample.action}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
