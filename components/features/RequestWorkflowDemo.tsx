"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { BedDouble, Check, ConciergeBell, RotateCcw, Sparkles, UserRound } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { easeOut } from "@/components/animations/variants";
import { cn } from "@/lib/cn";

const steps = [
  { label: "Request created", detail: "Two extra pillows · Room 207", icon: ConciergeBell },
  { label: "Assigned", detail: "Housekeeping", icon: UserRound },
  { label: "In progress", detail: "On the way to Room 207", icon: BedDouble },
  { label: "Completed", detail: "Guest notified", icon: Check },
];

export function RequestWorkflowDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotionSafe();
  const [stage, setStage] = useState(-1);
  const [run, setRun] = useState(0);
  const shown = reduce ? steps.length - 1 : stage;

  useEffect(() => {
    if (!inView || reduce) return;
    if (stage >= steps.length - 1) return;
    const id = setTimeout(() => setStage((s) => s + 1), stage < 0 ? 600 : 1300);
    return () => clearTimeout(id);
  }, [inView, reduce, stage, run]);

  const replay = () => {
    setStage(-1);
    setRun((r) => r + 1);
  };

  return (
    <Section className="bg-linen-2/60">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="From conversation to completion"
            title="Watch a request move through your hotel."
            body="A guest asks once. Sarai creates the request, your team picks it up, and the guest hears back when it's done."
          />
        </Reveal>

        <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col justify-between gap-6 rounded-[1.75rem] bg-card p-6 ring-1 ring-line sm:p-8">
            <div className="space-y-3">
              <p className="ml-auto w-fit rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-linen">
                Can I get two extra pillows?
              </p>
              <AnimatePresence>
                {shown >= 0 && (
                  <motion.p
                    key="created"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-linen px-4 py-2.5 ring-1 ring-line"
                  >
                    <span className="block text-[0.65rem] font-bold tracking-[0.12em] text-iris-ink uppercase">
                      Sarai
                    </span>
                    Of course — I&apos;ve asked housekeeping to bring two extra pillows to Room 207.
                  </motion.p>
                )}
                {shown >= 3 && (
                  <motion.p
                    key="delivered"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-linen px-4 py-2.5 ring-1 ring-line"
                  >
                    <span className="block text-[0.65rem] font-bold tracking-[0.12em] text-iris-ink uppercase">
                      Sarai
                    </span>
                    Your pillows have been delivered. Anything else I can help with?
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={replay}
              className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold text-stone ring-1 ring-line transition-colors hover:text-ink"
            >
              <RotateCcw className="size-4" aria-hidden /> Replay
            </button>
          </div>

          <ol className="space-y-3" aria-live="polite">
            {steps.map((s, i) => {
              const done = i <= shown;
              const current = i === shown;
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.label}
                  initial={false}
                  animate={{ opacity: done ? 1 : 0.45, x: done ? 0 : 8 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl p-5 ring-1 transition-colors duration-500",
                    current ? "bg-night text-linen ring-night" : "bg-card ring-line",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-500",
                      current
                        ? "bg-white/10 text-brass"
                        : done
                          ? "bg-success-soft text-success"
                          : "bg-linen text-stone",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold">{s.label}</p>
                    <p className={cn("text-sm", current ? "text-night-muted" : "text-stone")}>{s.detail}</p>
                  </div>
                  {i === 0 && (
                    <span
                      className={cn(
                        "hidden items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex",
                        current ? "bg-white/10 text-linen" : "bg-iris-soft text-iris-ink",
                      )}
                    >
                      <Sparkles className="size-3" aria-hidden /> By Sarai
                    </span>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
