"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Check, ConciergeBell, Sparkles } from "lucide-react";
import { valueFlow } from "@/lib/workflows";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

/**
 * Signature story: guest conversation ↔ hotel operations, joined by a thread
 * whose progress follows the reader's scroll.
 */
export function ValueFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(valueFlow.length - 1, Math.max(0, Math.floor(v * valueFlow.length))));
  });

  return (
    <Section className="bg-linen-2/60">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The intelligent layer"
            title="Your hotel team, amplified by AI."
            body="SaraiOS handles conversations and repetitive guest interactions while connecting the right requests to the right hotel workflows."
          />
        </Reveal>

        <div ref={ref} className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_minmax(260px,320px)_1fr] lg:gap-10">
          {/* Guest side */}
          <Reveal className="rounded-[2rem] bg-ink p-2.5 shadow-[var(--shadow-frame)] lg:mx-0">
            <div className="rounded-[1.6rem] bg-[#fbfaf8] p-5">
              <p className="text-center text-xs font-semibold text-stone">Guest · Room 318</p>
              <div className="mt-5 space-y-3 text-[0.92rem]">
                <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-linen">
                  Could you book us a table for dinner tonight? Two people, around 8.
                </p>
                <p
                  className={cn(
                    "w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 ring-1 ring-line transition-opacity duration-500",
                    active >= 1 ? "opacity-100" : "opacity-40",
                  )}
                >
                  <span className="block text-[0.65rem] font-bold tracking-[0.12em] text-iris-ink uppercase">
                    Sarai
                  </span>
                  Of course. I&apos;ve asked the restaurant for a table for two at 8:00 PM and will confirm shortly.
                </p>
                <p
                  className={cn(
                    "w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 ring-1 ring-line transition-opacity duration-500",
                    active >= 5 ? "opacity-100" : "opacity-30",
                  )}
                >
                  <span className="block text-[0.65rem] font-bold tracking-[0.12em] text-iris-ink uppercase">
                    Sarai
                  </span>
                  You&apos;re confirmed for 8:00 PM tonight. Enjoy your evening.
                </p>
              </div>
            </div>
          </Reveal>

          {/* The thread */}
          <ol
            className="relative mx-auto w-full max-w-sm space-y-3 lg:max-w-none"
            aria-label="From guest request to confirmation"
          >
            <span aria-hidden className="absolute top-4 bottom-4 left-[19px] w-px bg-black/10" />
            <motion.span
              aria-hidden
              className="absolute top-4 left-[19px] w-px origin-top bg-iris"
              style={{ scaleY: progress, bottom: "1rem" }}
            />
            {valueFlow.map((node, i) => (
              <li key={node.id} className="relative flex items-center gap-4">
                <span
                  className={cn(
                    "relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-[background-color,color,box-shadow] duration-500",
                    i <= active
                      ? "bg-ink text-linen shadow-[0_0_0_6px_rgba(124,124,255,0.18)]"
                      : "bg-card text-stone ring-1 ring-line",
                  )}
                >
                  {i + 1}
                </span>
                <div
                  className={cn(
                    "rounded-xl px-4 py-2.5 transition-colors duration-500",
                    i === active ? "bg-card ring-1 ring-line" : "",
                  )}
                >
                  <p className="font-semibold">{node.label}</p>
                  <p className="text-sm text-stone">{node.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Hotel side */}
          <Reveal className="space-y-3">
            <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-float)] ring-1 ring-line">
              <p className="flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.14em] text-iris-ink uppercase">
                <Sparkles className="size-3.5" aria-hidden /> Hotel context
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-stone">Guest</dt>
                  <dd className="font-semibold">Room 318 · 2 adults</dd>
                </div>
                <div>
                  <dt className="text-xs text-stone">Note</dt>
                  <dd className="font-semibold">Vegetarian</dd>
                </div>
              </dl>
            </div>
            <div
              className={cn(
                "rounded-2xl bg-night p-5 text-linen shadow-[var(--shadow-frame)] transition-opacity duration-500",
                active >= 3 ? "opacity-100" : "opacity-50",
              )}
            >
              <p className="flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.14em] text-brass uppercase">
                <ConciergeBell className="size-3.5" aria-hidden /> Restaurant · New request
              </p>
              <p className="mt-3 text-lg font-semibold">Table for two · 8:00 PM</p>
              <p className="text-sm text-night-muted">Room 318 · Vegetarian noted</p>
              <div className="mt-4 flex items-center justify-between border-t border-night-line pt-4 text-sm">
                <span className="text-night-muted">Assigned to Restaurant team</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-500",
                    active >= 5 ? "bg-[#1f3a2e] text-[#9fe0bf]" : "bg-white/10 text-night-muted",
                  )}
                >
                  {active >= 5 ? (
                    <>
                      <Check className="size-3" aria-hidden /> Confirmed
                    </>
                  ) : (
                    "In progress"
                  )}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
