"use client";

import type { ComponentType, ReactNode } from "react";
import { motion } from "framer-motion";
import { History, Radio, ShieldCheck, Sparkles, Star, Tag, Users, MessageCircleQuestion } from "lucide-react";
import { Container, DemoTag } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { easeOut } from "@/components/animations/variants";
import { cn } from "@/lib/cn";

type Icon = ComponentType<{ className?: string }>;

/* ---------- Table cards (header band, rows, tags) ---------- */

type Tone = "high" | "mid" | "low";

/** Tag colours stay inside the Sarai palette: green tints for strong results, cream for the weakest. */
const toneClass: Record<Tone, string> = {
  high: "bg-[#d9eee6] text-[#1f5a4d]",
  mid: "bg-cta/10 text-cta",
  low: "bg-brass-soft text-brass-ink",
};

function TableCard({
  icon: Icon,
  title,
  rows,
  className,
  rowClass = "h-[2.85rem] items-center",
}: {
  icon: Icon;
  title: string;
  rows: ReactNode[];
  className?: string;
  rowClass?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.08]", className)}>
      <div className="flex items-center gap-2.5 bg-linen px-4 py-3.5 text-[0.95rem] font-medium text-ink">
        <Icon className="size-[1.05rem] text-cta" />
        {title}
      </div>
      <ul>
        {rows.map((row, i) => (
          <li
            key={i}
            className={cn(
              "flex border-t border-black/[0.06] px-4 text-[0.85rem] text-ink/80 first:border-t-0",
              rowClass,
            )}
          >
            {row}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tag_({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={cn("inline-block rounded px-2 py-0.5 text-[0.82rem]", toneClass[tone])}>{children}</span>;
}

const topics = ["Wi-Fi", "Breakfast", "Check-out", "Spa hours", "Parking"];
const questions = ["412", "386", "274", "198", "143"];
const containment: { value: string; tone: Tone }[] = [
  { value: "94%", tone: "high" },
  { value: "91%", tone: "high" },
  { value: "78%", tone: "mid" },
  { value: "64%", tone: "mid" },
  { value: "41%", tone: "low" },
];
const ratings = [
  { stars: "5 stars", pct: 68 },
  { stars: "4 stars", pct: 21 },
  { stars: "3 stars", pct: 7 },
  { stars: "2 stars", pct: 3 },
  { stars: "1 star", pct: 1 },
];

/* ---------- Mini charts inside the grey cards ---------- */

function GreyCard({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 flex min-h-[20rem] flex-1 items-center justify-center rounded-2xl bg-linen px-5 py-8 ring-1 ring-black/[0.04] sm:px-8">
      {children}
    </div>
  );
}

function ReplyMixCard() {
  return (
    <div className="flex h-[17.5rem] w-full max-w-[22.5rem] flex-col rounded-xl bg-white p-4 shadow-[0_14px_36px_-22px_rgba(0,60,62,0.45)] ring-1 ring-black/[0.06]">
      <div className="flex items-center justify-between">
        <p className="text-[0.8rem] font-semibold text-ink">Reply mix</p>
        <div className="flex gap-1 text-[0.65rem] font-medium text-ink/65">
          <span className="rounded-md px-1.5 py-0.5 ring-1 ring-black/10">7d</span>
          <span className="rounded-md bg-ink px-1.5 py-0.5 text-white">14d</span>
          <span className="rounded-md px-1.5 py-0.5 ring-1 ring-black/10">30d</span>
        </div>
      </div>
      <div className="mt-3 flex flex-1 flex-col justify-center rounded-lg px-3 ring-1 ring-black/[0.08]">
        <p className="text-[0.7rem] text-ink/55">Total replies</p>
        <p className="mt-0.5 font-serif text-[1.55rem] leading-none text-ink">1,248</p>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2.5 text-[0.78rem] ring-1 ring-black/[0.08]">
        <span className="font-semibold text-ink">AI-answered</span>
        <span className="font-medium text-cta">886 · 71%</span>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2.5 text-[0.78rem] ring-1 ring-black/[0.08]">
        <span className="font-semibold text-ink">Staff replies</span>
        <span className="text-ink/75">362 · 29%</span>
      </div>
      <div className="mt-3 flex justify-end">
        <DemoTag>Demo data</DemoTag>
      </div>
    </div>
  );
}

/** Seconds on a 0 to 4 minute scale. */
const waits = [
  { property: "Harbour Hotel", any: 48, staff: 140, label: "48s" },
  { property: "Palm Resort", any: 92, staff: 205, label: "1m 32s" },
  { property: "City Suites", any: 130, staff: 232, label: "2m 10s" },
];
const scale = 240;

function WaitTimesCard() {
  return (
    <div className="flex h-[17.5rem] w-full max-w-[22.5rem] flex-col rounded-xl bg-white p-4 shadow-[0_14px_36px_-22px_rgba(0,60,62,0.45)] ring-1 ring-black/[0.06]">
      <div className="flex items-center justify-between">
        <p className="text-[0.8rem] font-semibold text-ink">Wait times by property</p>
        <DemoTag>Demo data</DemoTag>
      </div>
      <div className="mt-3 flex flex-1 flex-col justify-around">
        {waits.map((w, i) => (
          <div key={w.property}>
            <div className="flex items-center justify-between text-[0.72rem]">
              <span className="text-ink">{w.property}</span>
              <span className="font-medium text-ink/70">{w.label}</span>
            </div>
            <div className="mt-1.5 space-y-1">
              <motion.span
                className="block h-2 origin-left rounded-full bg-cta"
                style={{ width: `${(w.any / scale) * 100}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: easeOut }}
              />
              <motion.span
                className="block h-2 origin-left rounded-full bg-brass"
                style={{ width: `${(w.staff / scale) * 100}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.1, ease: easeOut }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[0.62rem] text-ink/45">
        {["0", "1m", "2m", "3m", "4m"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-[0.65rem] text-ink/65">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-cta" /> Any reply
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-brass" /> Staff response
        </span>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

const strip: { icon: Icon; title: string; text: string }[] = [
  {
    icon: Radio,
    title: "Channel mix",
    text: "Threads and messages by channel, so you can see where messaging costs come from.",
  },
  {
    icon: ShieldCheck,
    title: "Trust configuration",
    text: "See which topics the AI suggests, asks approval for or answers on its own.",
  },
  { icon: History, title: "Autonomy changes", text: "A log of every change made to the AI's autonomy levels." },
  { icon: Users, title: "Staff replies by agent", text: "See which team members answered, and when." },
];

export function AnalyticsSection() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.08]">
          {/* 1. Intro and table cards */}
          <div className="px-6 pt-10 pb-12 sm:px-10 sm:pt-12 sm:pb-14">
            <Reveal>
              <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Analytics</p>
              <h2 className="mt-5 max-w-[24ch] heading-section text-balance text-subheading">
                See who answers guests, and how fast.
              </h2>
              <p className="mt-5 max-w-[56ch] text-lg text-pretty text-stone">
                Track reply mix, wait times and response speed for your Needs attention queue, and see how much the AI
                handles without staff.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
                <TableCard icon={Tag} title="Topic" rows={topics} className="lg:mt-14" />
                <TableCard icon={MessageCircleQuestion} title="Questions" rows={questions} className="lg:mt-14" />
                <TableCard
                  icon={Sparkles}
                  title="Handled by AI"
                  className="lg:mt-14"
                  rows={containment.map((c) => (
                    <Tag_ key={c.value + c.tone} tone={c.tone}>
                      {c.value}
                    </Tag_>
                  ))}
                />
                <TableCard
                  icon={Star}
                  title="Guest satisfaction"
                  rowClass="h-[4.25rem] flex-col justify-center gap-2"
                  rows={ratings.map((r, i) => (
                    <span key={r.stars} className="block w-full">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-ink">{r.stars}</span>
                        <span className="text-ink/60">{r.pct}% of ratings</span>
                      </span>
                      <span className="mt-2 block h-1.5 rounded-full bg-black/[0.06]">
                        <motion.span
                          className="block h-full origin-left rounded-full bg-cta"
                          style={{ width: `${Math.max(r.pct, 3)}%` }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: easeOut }}
                        />
                      </span>
                    </span>
                  ))}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <DemoTag>Demo data</DemoTag>
              </div>
            </Reveal>
          </div>

          {/* 2. Two charts */}
          <div className="grid border-t border-black/[0.07] md:grid-cols-2 md:divide-x md:divide-black/[0.07]">
            <Reveal className="flex flex-col px-6 py-10 sm:px-10 sm:py-12">
              <p className="inline-flex items-center gap-2 text-[0.85rem] text-ink/70">
                <Sparkles className="size-4 text-cta" aria-hidden /> Reply mix
              </p>
              <h3 className="mt-4 heading-sub text-[1.75rem] leading-tight text-subheading md:min-h-[4.4rem] lg:min-h-0">
                AI or staff, at a glance
              </h3>
              <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60 md:min-h-[7.2rem] lg:min-h-0">
                Total replies, the AI-answered share and staff replies for the dates you choose, with 7, 14 and 30 day
                shortcuts.
              </p>
              <GreyCard>
                <ReplyMixCard />
              </GreyCard>
            </Reveal>

            <Reveal
              delay={0.1}
              className="flex flex-col border-t border-black/[0.07] px-6 py-10 sm:px-10 sm:py-12 md:border-t-0"
            >
              <p className="inline-flex items-center gap-2 text-[0.85rem] text-ink/70">
                <Radio className="size-4 text-cta" aria-hidden /> Wait times
              </p>
              <h3 className="mt-4 heading-sub text-[1.75rem] leading-tight text-subheading md:min-h-[4.4rem] lg:min-h-0">
                Know how long guests wait
              </h3>
              <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60 md:min-h-[7.2rem] lg:min-h-0">
                Average guest wait and time to staff response for each property, plus the conversation that has been
                waiting longest.
              </p>
              <GreyCard>
                <WaitTimesCard />
              </GreyCard>
            </Reveal>
          </div>

          {/* 3. Feature strip */}
          <div className="grid border-t border-black/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {strip.map((s, i) => (
              <div
                key={s.title}
                className={cn(
                  "px-6 py-8 sm:px-8",
                  i > 0 && "border-t border-black/[0.07] sm:border-t-0",
                  i % 2 === 1 && "sm:border-l sm:border-black/[0.07]",
                  i >= 2 && "sm:border-t sm:border-black/[0.07] lg:border-t-0",
                  i > 0 && "lg:border-l lg:border-black/[0.07]",
                )}
              >
                <p className="flex items-center gap-2.5 text-[1.05rem] font-medium text-ink">
                  <s.icon className="size-[1.1rem] text-cta" aria-hidden /> {s.title}
                </p>
                <p className="mt-2.5 max-w-[32ch] text-[0.9rem] text-pretty text-ink/60">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
