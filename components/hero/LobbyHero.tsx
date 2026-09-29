"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ConciergeBell } from "lucide-react";
import { DemoTag } from "@/components/ui/primitives";
import { LobbyScene } from "@/components/hero/LobbyScene";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { easeOut } from "@/components/animations/variants";
import { workflows } from "@/lib/workflows";
import { cn } from "@/lib/cn";

/** Copy comes from the late-checkout workflow so the hero and the "AI takes action" section never drift apart. */
const flow = workflows.find((w) => w.id === "late-checkout")!;

/**
 * Sequence (plays once, then rests on the final frame):
 * 0 guest asks · 1 Sarai starts working, request reaches the front desk · 2 stay context checked · 3 confirmed
 */
const LAST_STAGE = 3;
const DELAYS = [900, 1100, 1300, 1400];

function Typing() {
  return (
    <span className="inline-flex items-center gap-1 px-1 py-1.5" aria-hidden>
      <span className="typing-dot size-1.5 rounded-full bg-stone" />
      <span className="typing-dot size-1.5 rounded-full bg-stone" />
      <span className="typing-dot size-1.5 rounded-full bg-stone" />
    </span>
  );
}

function Card({ show, className, children }: { show: boolean; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LobbyHero() {
  const reduce = useReducedMotionSafe();
  const [step, setStep] = useState(-1);
  const stage = reduce ? LAST_STAGE : step;

  useEffect(() => {
    if (reduce || step >= LAST_STAGE) return;
    const id = setTimeout(() => setStep((s) => s + 1), DELAYS[step + 1]);
    return () => clearTimeout(id);
  }, [reduce, step]);

  const doneSteps = Math.max(0, stage); // 0..3 checks ticked in the desk card
  const confirmed = stage >= LAST_STAGE;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: easeOut }}
      className="relative mx-auto mt-14 max-w-[1100px] sm:mt-16"
    >
      <figcaption className="sr-only">
        Illustration of a hotel lobby with a sample conversation. A guest asks about a late checkout, Sarai checks the
        stay and creates the request, and the front desk confirms it.
      </figcaption>

      <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-linen-2 shadow-[var(--shadow-frame)] ring-1 ring-line sm:rounded-[2rem] lg:aspect-[1200/560]">
        <LobbyScene screenLit={stage >= 1} pulse={stage === 1 || stage === 2} />
      </div>

      {/* Below the scene on small screens, floating over it from lg up. */}
      <div aria-hidden className="mt-4 grid gap-3 sm:grid-cols-2 lg:contents">
        {/* Guest conversation */}
        <Card
          show={stage >= 0}
          className="rounded-2xl bg-card p-4 shadow-[var(--shadow-float)] ring-1 ring-line lg:absolute lg:top-[7%] lg:left-[2.5%] lg:w-[300px]"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold whitespace-nowrap text-stone">Guest · Room 412</p>
            <DemoTag className="whitespace-nowrap">Sample</DemoTag>
          </div>
          <div className="mt-3 space-y-2.5 text-[0.9rem] leading-snug">
            <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2 text-linen">
              {flow.guest}
            </p>
            <div className="relative min-h-[4.5rem]">
              <p
                className={cn(
                  "w-fit max-w-[92%] rounded-2xl rounded-bl-md bg-linen px-3.5 py-2 ring-1 ring-line transition-opacity duration-500",
                  confirmed ? "opacity-100" : "opacity-0",
                )}
              >
                <span className="block text-[0.7rem] font-semibold text-iris-ink">Sarai</span>
                {flow.confirmation}
              </p>
              <p
                className={cn(
                  "absolute top-0 left-0 w-fit rounded-2xl rounded-bl-md bg-linen px-3.5 py-1.5 ring-1 ring-line transition-opacity duration-300",
                  stage === 1 || stage === 2 ? "opacity-100" : "opacity-0",
                )}
              >
                <Typing />
              </p>
            </div>
          </div>
        </Card>

        {/* Front desk request */}
        <Card
          show={stage >= 1}
          className="on-night rounded-2xl bg-night p-4 text-linen shadow-[var(--shadow-frame)] lg:absolute lg:top-[8%] lg:right-[2.5%] lg:w-[310px]"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs font-semibold text-brass">
              <ConciergeBell className="size-3.5" aria-hidden /> {flow.team}
            </p>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-500",
                confirmed ? "bg-[#1f3a2e] text-[#9fe0bf]" : "bg-white/10 text-night-muted",
              )}
            >
              {confirmed && <Check className="size-3" aria-hidden />}
              {confirmed ? "Confirmed" : "New request"}
            </span>
          </div>
          <p className="mt-3 text-lg font-semibold">Late checkout · 2:00 PM</p>
          <p className="text-sm text-night-muted">Room 412 · via Sarai</p>
          <ul className="mt-4 space-y-2 border-t border-night-line pt-4 text-sm">
            {flow.steps.map((s, i) => {
              const done = i < doneSteps;
              return (
                <li key={s.label} className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "inline-flex size-5 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                      done ? "bg-brass text-night" : "ring-1 ring-night-line",
                    )}
                  >
                    {done && <Check className="size-3" aria-hidden />}
                  </span>
                  <span className={cn("transition-colors duration-500", done ? "text-linen" : "text-night-muted")}>
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </motion.figure>
  );
}
