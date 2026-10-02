import { Check, ListChecks, Sparkles, Workflow } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { Industry } from "@/lib/industries";
import { Container } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { scaleIn } from "@/components/animations/variants";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";
import { IndustryIcon } from "./IndustryIcon";
import { cn } from "@/lib/cn";

type Icon = ComponentType<{ className?: string }>;

/** White tile with a green icon, the same icon style as the Platform page. */
function IconTile({ icon: Icon, children, className }: { icon?: Icon; children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-line",
        className,
      )}
    >
      {Icon ? <Icon className="size-5 text-cta" aria-hidden /> : children}
    </span>
  );
}

/**
 * One solution as a large rounded panel: product visual on one side, heading and call to action on the other,
 * and use cases and benefits in three columns underneath. Panels alternate sides and tint.
 */
export function IndustrySection({ industry, src, flip }: { industry: Industry; src: string | null; flip?: boolean }) {
  const columns: { icon: Icon; title: string; body?: string; list?: string[] }[] = [
    { icon: ListChecks, title: "Use cases", list: industry.useCases },
    ...industry.benefits.map((b, i) => ({ icon: i === 0 ? Sparkles : Workflow, title: b.title, body: b.body })),
  ];

  return (
    <section id={industry.slug} aria-labelledby={`${industry.slug}-title`} className="scroll-mt-40">
      <Container>
        <div
          className={cn(
            "rounded-3xl p-6 sm:p-8 lg:p-10",
            // lighter Sarai green and cream, alternating
            flip ? "bg-[#f6f0e1]" : "bg-[#e4f1ee]",
          )}
        >
          <div
            className={cn(
              "grid items-center gap-10 lg:grid-cols-2 lg:gap-12",
              flip ? "xl:grid-cols-[1fr_600px]" : "xl:grid-cols-[600px_1fr]",
            )}
          >
            {/* Visual */}
            <Reveal variants={scaleIn} className={cn(flip && "lg:order-2")}>
              <div
                className={cn(
                  "relative isolate overflow-hidden rounded-3xl p-4 sm:p-6",
                  flip
                    ? "bg-[linear-gradient(200deg,#f0e7d4_0%,#d3e7de_42%,#7fbeb9_100%)]"
                    : "bg-[linear-gradient(135deg,#8ec9c5_0%,#b4dcd6_48%,#eaf0e6_100%)]",
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute -z-10 h-56 w-28 bg-white/30",
                    flip
                      ? "-top-16 right-[24%] -rotate-[14deg] [clip-path:polygon(50%_0,100%_72%,0_100%)]"
                      : "-top-16 left-[26%] rotate-[14deg] [clip-path:polygon(50%_0,100%_100%,0_72%)]",
                  )}
                />
                <div
                  aria-hidden
                  className={cn(
                    "absolute -z-10 h-48 w-28 rounded-[55%_45%_50%_50%] bg-white/25 ring-1 ring-white/50",
                    flip ? "-bottom-6 -left-10 -rotate-[22deg]" : "-right-10 bottom-8 rotate-[24deg]",
                  )}
                />
                <div
                  aria-hidden
                  className="absolute -bottom-12 left-[18%] -z-10 h-40 w-64 rounded-full bg-cta/25 blur-3xl"
                />

                <div className="mx-auto w-[92%]">
                  <ProductScreenshot
                    screen={industry.screen}
                    src={src}
                    sizes="(min-width: 1280px) 540px, (min-width: 1024px) 40vw, 90vw"
                  />
                </div>

                {/* Conversation glimpse specific to this solution */}
                <div className="relative z-10 mx-auto -mt-10 w-[88%] rounded-2xl bg-card p-4 shadow-[var(--shadow-float)] ring-1 ring-line sm:-mt-14 sm:mr-2 sm:ml-auto sm:w-[70%]">
                  <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2 text-sm text-linen">
                    {industry.sample.guest}
                  </p>
                  <p className="mt-2 w-fit max-w-[92%] rounded-2xl rounded-bl-md bg-linen px-3.5 py-2 text-sm ring-1 ring-line">
                    <span className="block text-[0.6rem] font-bold tracking-[0.12em] text-cta uppercase">Sarai</span>
                    {industry.sample.sarai}
                  </p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brass-ink">
                    <Sparkles className="size-3.5" aria-hidden /> {industry.sample.action}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Text */}
            <Reveal delay={0.1} className={cn(flip && "lg:order-1")}>
              <div className="flex items-center gap-3.5">
                <IconTile>
                  <IndustryIcon icon={industry.icon} className="size-5 text-cta" />
                </IconTile>
                <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">{industry.name}</p>
              </div>
              <h2
                id={`${industry.slug}-title`}
                className="mt-6 heading-sub text-[2rem] leading-[1.1] text-balance text-subheading sm:text-[2.35rem]"
              >
                {industry.headline}
              </h2>
              <p className="mt-5 max-w-[46ch] text-[1rem] leading-relaxed text-pretty text-ink/65">
                {industry.summary}
              </p>
              <div className="mt-8">
                <ArrowButton href="/pricing" size="sm">
                  Start your free trial
                </ArrowButton>
              </div>
            </Reveal>
          </div>

          {/* Use cases and benefits */}
          <div className="mt-12 grid gap-8 border-t border-black/[0.07] pt-10 md:grid-cols-3 lg:mt-14 lg:gap-10 lg:pt-12">
            {columns.map((c) => (
              <div key={c.title}>
                <IconTile icon={c.icon} />
                <h3 className="mt-5 heading-sub text-xl text-subheading">{c.title}</h3>
                {c.body && <p className="mt-2 max-w-[38ch] text-[0.95rem] text-pretty text-ink/60">{c.body}</p>}
                {c.list && (
                  <ul className="mt-3 space-y-2">
                    {c.list.map((u) => (
                      <li key={u} className="flex gap-2.5 text-[0.95rem] text-ink/70">
                        <Check className="mt-1 size-4 shrink-0 text-cta" aria-hidden />
                        {u}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
