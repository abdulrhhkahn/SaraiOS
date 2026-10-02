"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Building2, ChevronDown, ClipboardList, MessageSquarePlus, MessageSquareText } from "lucide-react";
import { Container, DemoTag } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { cn } from "@/lib/cn";

/* ---------- Staff dashboard "Requests" page, with dummy data ---------- */

type Status = "New" | "Assigned" | "In progress" | "Completed";

const statusColor: Record<Status, string> = {
  New: "bg-cta/10 text-cta",
  Assigned: "bg-black/[0.06] text-ink/70",
  "In progress": "bg-amber-100 text-amber-900",
  Completed: "bg-emerald-100 text-emerald-900",
};

const rows: { title: string; guest: string; room: string; dept: string; status: Status }[] = [
  { title: "Two extra pillows", guest: "Tom Walsh", room: "207", dept: "Housekeeping", status: "New" },
  { title: "Late checkout · 2:00 PM", guest: "Maya Chen", room: "412", dept: "Front Desk", status: "Completed" },
  { title: "Dinner for two · 8:00 PM", guest: "Ines Duarte", room: "318", dept: "Restaurant", status: "In progress" },
  { title: "Airport transfer · Fri AM", guest: "Kenji Mori", room: "105", dept: "Concierge", status: "Assigned" },
];

function RequestsPanel({ assigned }: { assigned: boolean }) {
  return (
    <div className="w-full rounded-2xl bg-white p-4 text-[0.7rem] shadow-[0_24px_60px_-24px_rgba(0,60,62,0.5)] ring-1 ring-black/[0.06] sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2.5">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-serif text-[1.3rem] leading-none text-ink">Requests</p>
            <DemoTag>Demo data</DemoTag>
          </div>
          <p className="mt-1.5 max-w-[26ch] text-[0.65rem] text-ink/55 sm:max-w-none">
            Structured guest requests raised from a conversation.
          </p>
        </div>
        <div className="inline-flex shrink-0 items-center gap-6 rounded-lg px-3 py-1.5 text-[0.7rem] text-ink ring-1 ring-cta/70">
          All departments <ChevronDown className="size-3 text-ink/50" />
        </div>
      </div>

      <div className="mt-3.5 overflow-hidden rounded-xl ring-1 ring-black/[0.08]">
        {rows.map((r, i) => {
          const status: Status = i === 0 && assigned ? "Assigned" : r.status;
          return (
            <div
              key={r.title}
              className={cn(
                "flex items-center justify-between gap-3 border-b border-black/[0.06] px-3.5 py-3 transition-colors duration-500 last:border-b-0",
                i === 0 && assigned && "bg-cta/[0.06]",
              )}
            >
              <div className="min-w-0">
                <p className="truncate text-[0.76rem] font-medium text-ink">{r.title}</p>
                <p className="mt-1 flex items-center gap-1 text-[0.62rem] text-ink/55">
                  <MessageSquareText className="size-2.5 shrink-0" /> {r.guest} · Room {r.room}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span className="text-[0.62rem] text-ink/60">{r.dept}</span>
                <span
                  className={cn(
                    "inline-block rounded-full px-2 py-0.5 text-[0.62rem] transition-colors duration-500",
                    statusColor[status],
                  )}
                >
                  {status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

const points = [
  { icon: MessageSquarePlus, text: "Create a request from within any guest conversation" },
  { icon: Building2, text: "Filter the list by department to see what each team has on its plate" },
  { icon: ClipboardList, text: "Keep every request linked to the conversation it was raised from" },
];

export function RequestsSection() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const [flipped, setFlipped] = useState(false);
  const assigned = reduce || flipped;

  // Plays once: the new request gets assigned to its team.
  useEffect(() => {
    if (reduce || !inView) return;
    const id = setTimeout(() => setFlipped(true), 1400);
    return () => clearTimeout(id);
  }, [reduce, inView]);

  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual: same card style as the other sections, with its own green and cream mix */}
          <Reveal>
            <div
              ref={ref}
              aria-hidden
              className="relative isolate flex h-[30rem] items-center justify-center overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#e3f0ea_0%,#a6d4cd_52%,#f1e8d5_100%)] px-4 sm:h-[31rem] sm:px-6"
            >
              <div className="absolute -bottom-20 -left-14 -z-10 size-60 rounded-full bg-white/20 ring-1 ring-white/50" />
              <div className="absolute top-6 left-[18%] -z-10 h-24 w-20 -rotate-[14deg] bg-white/30 [clip-path:polygon(0_40%,100%_0,60%_100%)]" />
              <div className="absolute top-[30%] -right-10 -z-10 h-52 w-28 rotate-[20deg] rounded-[45%_55%_60%_40%] bg-white/25 ring-1 ring-white/50" />
              <div className="absolute -top-10 right-[22%] -z-10 h-40 w-64 rounded-full bg-[#f3e3bd]/60 blur-3xl" />
              <div className="absolute right-[10%] -bottom-12 -z-10 h-44 w-72 rounded-full bg-cta/25 blur-3xl" />
              <RequestsPanel assigned={assigned} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Requests</p>
            <h2 className="mt-5 max-w-[16ch] heading-section text-balance text-subheading">
              From a message to a tracked request.
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg text-pretty text-stone">
              Raise a structured request from any conversation, send it to the right department, and see every request
              in one list.
            </p>
            <ul className="mt-8 space-y-4">
              {points.map((p) => (
                <li key={p.text} className="flex items-center gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-line">
                    <p.icon className="size-5 text-cta" aria-hidden />
                  </span>
                  <span className="text-[0.95rem] text-pretty text-ink/75">{p.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <ArrowButton href="/pricing" size="sm">
                Start your free trial
              </ArrowButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
