"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { BedDouble, CalendarDays, Heart, NotebookPen, Search } from "lucide-react";
import { Container, DemoTag } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { cn } from "@/lib/cn";

/* ---------- Staff dashboard "Guests" page, with dummy data ---------- */

const list = [
  { name: "Maya Chen", room: "412", active: true },
  { name: "Tom Walsh", room: "207", active: false },
  { name: "Ines Duarte", room: "318", active: false },
  { name: "Kenji Mori", room: "105", active: false },
];

const preferences = ["High floor", "Extra pillows", "Quiet room", "Oat milk", "Late riser"];

function GuestsPanel({ stage }: { stage: number }) {
  return (
    <div className="flex w-full overflow-hidden rounded-2xl bg-white text-[0.68rem] shadow-[0_24px_60px_-24px_rgba(0,60,62,0.5)] ring-1 ring-black/[0.06]">
      {/* List */}
      <div className="hidden w-[39%] shrink-0 border-r border-black/[0.07] sm:block">
        <div className="p-3.5">
          <p className="font-serif text-[1.15rem] leading-none text-ink">Guests</p>
          <p className="mt-1.5 text-[0.62rem] leading-snug text-ink/55">
            Guest details, preferences, and internal notes.
          </p>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-ink/45 ring-1 ring-black/10">
            <Search className="size-3 shrink-0" />
            <span className="truncate">Search by name or room…</span>
          </div>
        </div>
        <div className="border-t border-black/[0.06]">
          {list.map((g) => (
            <div
              key={g.name}
              className={cn("border-b border-black/[0.05] px-3.5 py-2.5 last:border-b-0", g.active && "bg-[#f3f1ec]")}
            >
              <p className="font-semibold text-ink">{g.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[0.62rem] text-ink/55">
                <BedDouble className="size-2.5" /> Room {g.room}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Guest details */}
      <div className="min-w-0 flex-1 p-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cta/10 text-[0.8rem] font-semibold text-cta">
            MC
          </span>
          <div className="min-w-0">
            <p className="text-[0.85rem] font-semibold text-ink">Maya Chen</p>
            <p className="text-[0.62rem] text-ink/55">Returning guest · 3rd stay</p>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5 text-[0.6rem] text-ink/65">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.05] px-2 py-0.5">
            <BedDouble className="size-2.5" /> Room 412
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.05] px-2 py-0.5">
            <CalendarDays className="size-2.5" /> Oct 2 → Oct 5
          </span>
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-[0.65rem] font-semibold text-ink">
          <Heart className="size-3 text-cta" /> Preferences
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {preferences.map((p) => (
            <span key={p} className="rounded-full bg-cta/10 px-2.5 py-1 text-[0.62rem] text-cta">
              {p}
            </span>
          ))}
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-[0.65rem] font-semibold text-ink">
          <NotebookPen className="size-3 text-cta" /> Internal notes
        </p>
        <div className="mt-2 space-y-2">
          <div className="rounded-lg bg-[#f7f6f2] px-3 py-2 leading-snug text-ink/80 ring-1 ring-black/[0.05]">
            Celebrating an anniversary on this stay.
            <span className="mt-1 block text-[0.58rem] text-ink/50">Front Desk</span>
          </div>
          <div
            className={cn(
              "rounded-lg bg-[#f7f6f2] px-3 py-2 leading-snug text-ink/80 ring-1 ring-black/[0.05] transition-[opacity,transform] duration-500",
              stage >= 1 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            Prefers messages over calls.
            <span className="mt-1 block text-[0.58rem] text-ink/50">Concierge</span>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <DemoTag>Demo data</DemoTag>
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

const points = [
  { icon: Search, text: "Find any guest by name or room" },
  { icon: Heart, text: "Save preferences, like room requests or dietary needs, on the guest" },
  { icon: NotebookPen, text: "Add internal notes that stay with your team" },
];

export function GuestsSection() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const [flipped, setFlipped] = useState(false);
  const stage = reduce || flipped ? 1 : 0;

  // Plays once: a second team note is added to the guest.
  useEffect(() => {
    if (reduce || !inView) return;
    const id = setTimeout(() => setFlipped(true), 1300);
    return () => clearTimeout(id);
  }, [reduce, inView]);

  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[1fr_600px]">
          <Reveal>
            <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Guests</p>
            <h2 className="mt-5 max-w-[16ch] heading-section text-balance text-subheading">
              Every guest&apos;s details, in one place.
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg text-pretty text-stone">
              Keep guest details, preferences and internal notes together, so anyone on your team can pick up where the
              last person left off.
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

          {/* Visual: same card size as the other sections, a fourth green and cream mix */}
          <Reveal delay={0.1}>
            <div
              ref={ref}
              aria-hidden
              className="relative isolate flex h-[30rem] items-center justify-center overflow-hidden rounded-3xl bg-[radial-gradient(120%_120%_at_100%_0%,#f3e8cd_0%,#cfe6dd_38%,#7fbeb9_100%)] px-4 sm:h-[31rem] sm:px-6"
            >
              <div className="absolute -top-20 -right-16 -z-10 size-60 rounded-full bg-white/20 ring-1 ring-white/50" />
              <div className="absolute bottom-6 left-[14%] -z-10 h-24 w-24 rotate-[12deg] bg-white/30 [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
              <div className="absolute top-[28%] -left-10 -z-10 h-52 w-28 -rotate-[18deg] rounded-[50%_50%_55%_45%] bg-white/25 ring-1 ring-white/50" />
              <div className="absolute -bottom-12 left-[26%] -z-10 h-44 w-72 rounded-full bg-cta/25 blur-3xl" />
              <GuestsPanel stage={stage} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
