"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bath, BedDouble, Check, Clock, Flower2, Info, Plane, UsersRound, UtensilsCrossed } from "lucide-react";
import { workflows, type Workflow } from "@/lib/workflows";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { easeOut } from "@/components/animations/variants";
import { cn } from "@/lib/cn";

const icons: Record<Workflow["icon"], typeof Plane> = {
  plane: Plane,
  clock: Clock,
  bath: Bath,
  utensils: UtensilsCrossed,
  flower: Flower2,
  bed: BedDouble,
  info: Info,
};

const list = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } };
const step = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easeOut } },
};

export function AiTakesAction() {
  const [activeId, setActiveId] = useState(workflows[0].id);
  const wf = workflows.find((w) => w.id === activeId) ?? workflows[0];

  return (
    <section className="on-night relative overflow-hidden bg-night py-24 text-linen sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[820px] rounded-full bg-[radial-gradient(closest-side,rgba(124,124,255,0.18),transparent)]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            tone="night"
            eyebrow="AI takes action"
            title="Not another chatbot. An AI that gets things done."
            body="Sarai understands the request, checks the guest's stay, creates the task, notifies the right team — and tells the guest what happens next."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
          <div
            role="tablist"
            aria-label="Example workflows"
            aria-orientation="vertical"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          >
            {workflows.map((w) => {
              const Icon = icons[w.icon];
              const selected = w.id === activeId;
              return (
                <button
                  key={w.id}
                  role="tab"
                  id={`wf-${w.id}`}
                  aria-selected={selected}
                  aria-controls="workflow-panel"
                  onClick={() => setActiveId(w.id)}
                  className={cn(
                    "relative flex min-h-12 shrink-0 cursor-pointer items-center gap-3 rounded-xl px-4 text-left font-semibold transition-colors duration-200",
                    selected ? "text-ink" : "text-night-muted hover:bg-white/5 hover:text-linen",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="wf-active"
                      className="absolute inset-0 rounded-xl bg-linen"
                      transition={{ type: "spring", stiffness: 450, damping: 38 }}
                    />
                  )}
                  <Icon className="relative size-4" aria-hidden />
                  <span className="relative whitespace-nowrap">{w.label}</span>
                </button>
              );
            })}
          </div>

          <div
            id="workflow-panel"
            role="tabpanel"
            aria-labelledby={`wf-${wf.id}`}
            className="min-h-[520px] rounded-[1.75rem] bg-night-2 p-5 ring-1 ring-night-line sm:p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={wf.id}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={list}
              >
                <motion.p
                  variants={step}
                  className="text-xs font-semibold tracking-[0.14em] text-night-muted uppercase"
                >
                  Guest says
                </motion.p>
                <motion.p
                  variants={step}
                  className="mt-3 w-fit max-w-xl rounded-2xl rounded-bl-md bg-linen px-5 py-3.5 text-lg font-medium text-ink"
                >
                  “{wf.guest}”
                </motion.p>

                <ol className="relative mt-8 space-y-3 pl-8">
                  <span
                    aria-hidden
                    className="absolute top-2 bottom-2 left-[11px] w-px bg-gradient-to-b from-iris via-iris/60 to-brass"
                  />
                  {wf.steps.map((s) => (
                    <motion.li key={s.label} variants={step} className="relative">
                      <span
                        aria-hidden
                        className="absolute top-3.5 -left-[26px] size-2.5 rounded-full bg-iris ring-4 ring-night-2"
                      />
                      <div className="flex flex-col gap-1 rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-night-line sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                        <span className="font-semibold">{s.label}</span>
                        <span className="text-sm text-night-muted">{s.detail}</span>
                      </div>
                    </motion.li>
                  ))}
                  <motion.li variants={step} className="relative">
                    <span
                      aria-hidden
                      className="absolute top-3.5 -left-[26px] size-2.5 rounded-full bg-brass ring-4 ring-night-2"
                    />
                    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-night-line">
                      <span className="flex items-center gap-2 font-semibold">
                        <UsersRound className="size-4 text-brass" aria-hidden /> Team notified
                      </span>
                      <span className="text-sm text-night-muted">{wf.team}</span>
                    </div>
                  </motion.li>
                </ol>

                <motion.div variants={step} className="mt-8 rounded-2xl bg-linen p-5 text-ink">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-success uppercase">
                    <Check className="size-3.5" aria-hidden /> Guest receives confirmation
                  </p>
                  <p className="mt-2 text-[1.05rem] leading-relaxed">{wf.confirmation}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-6 text-sm text-night-muted">
          Illustrative workflows. Actual routing and confirmations are configured for each property.
        </p>
      </Container>
    </section>
  );
}
