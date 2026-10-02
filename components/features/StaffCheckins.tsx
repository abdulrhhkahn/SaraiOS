"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ClipboardCheck, IdCard, Search, Timer } from "lucide-react";
import { Container, DemoTag } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { cn } from "@/lib/cn";

/* ---------- Staff dashboard "Check-ins" page, with dummy data ---------- */

type Status = "pending" | "verified" | "completed";

/** Same status colours as the Sarai app's staff dashboard. */
const statusColor: Record<Status, string> = {
  pending: "bg-amber-100 text-amber-900",
  verified: "bg-blue-100 text-blue-900",
  completed: "bg-emerald-100 text-emerald-900",
};

type Row = { guest: string; arrival: string; departure: string; ref: string; status: Status };

const groups: { label: string; rows: Row[] }[] = [
  {
    label: "Today",
    rows: [
      { guest: "Maya Chen", arrival: "Oct 2", departure: "Oct 5", ref: "BK-48213", status: "pending" },
      { guest: "Tom Walsh", arrival: "Oct 2", departure: "Oct 4", ref: "BK-48177", status: "verified" },
      { guest: "Ines Duarte", arrival: "Oct 2", departure: "Oct 6", ref: "—", status: "completed" },
    ],
  },
  {
    label: "Tomorrow",
    rows: [{ guest: "Kenji Mori", arrival: "Oct 3", departure: "Oct 7", ref: "BK-48302", status: "pending" }],
  },
];

const cols = "grid-cols-[1.5fr_1fr_1fr] sm:grid-cols-[1.45fr_0.8fr_0.85fr_1fr_0.9fr]";

function CheckinsPanel({ verified }: { verified: boolean }) {
  return (
    <div className="w-full rounded-2xl bg-white p-4 text-[0.7rem] shadow-[0_24px_60px_-24px_rgba(0,60,62,0.5)] ring-1 ring-black/[0.06] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-serif text-[1.3rem] leading-none text-ink">Check-ins</p>
            <DemoTag>Demo data</DemoTag>
          </div>
          <p className="mt-1.5 text-[0.65rem] text-ink/55">Review and verify guest arrivals.</p>
        </div>
        <div className="hidden rounded-lg bg-black/[0.05] p-0.5 text-[0.65rem] font-medium text-ink/60 sm:flex">
          <span className="rounded-md bg-white px-2 py-1 text-ink shadow-sm">All</span>
          <span className="px-2 py-1">Pending</span>
          <span className="px-2 py-1">Verified</span>
          <span className="px-2 py-1">Completed</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg px-2.5 py-2 text-ink/45 ring-1 ring-black/10">
        <Search className="size-3.5 shrink-0" />
        <span className="truncate">Search by guest name or booking ref…</span>
      </div>

      <div className="mt-3.5 space-y-3">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="mb-1.5 text-[0.65rem] text-ink/60">{g.label}</p>
            <div className="overflow-hidden rounded-xl ring-1 ring-black/[0.08]">
              <div className={cn("grid gap-2 border-b border-black/[0.07] px-3 py-1.5 text-ink/55", cols)}>
                <span>Guest</span>
                <span>Arrival</span>
                <span className="hidden sm:block">Departure</span>
                <span className="hidden sm:block">Booking ref</span>
                <span>Status</span>
              </div>
              {g.rows.map((r) => {
                const status: Status = r.guest === "Maya Chen" && verified ? "verified" : r.status;
                const lit = r.guest === "Maya Chen" && verified;
                return (
                  <div
                    key={r.guest}
                    className={cn(
                      "grid items-center gap-2 border-b border-black/[0.05] px-3 py-2 transition-colors duration-500 last:border-b-0",
                      cols,
                      lit && "bg-cta/[0.06]",
                    )}
                  >
                    <span className="truncate font-medium text-ink">{r.guest}</span>
                    <span className="text-ink/80">{r.arrival}</span>
                    <span className="hidden text-ink/80 sm:block">{r.departure}</span>
                    <span className="hidden truncate text-ink/80 sm:block">{r.ref}</span>
                    <span>
                      <span
                        className={cn(
                          "inline-block rounded-full px-2 py-0.5 text-[0.62rem] transition-colors duration-500",
                          statusColor[status],
                        )}
                      >
                        {status}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

const points = [
  { icon: ClipboardCheck, text: "Filter arrivals by status and search by guest name or booking reference" },
  { icon: IdCard, text: "Open a guest to see their details, ID document and signature" },
  { icon: Timer, text: "ID documents are deleted automatically 30 days after check-out" },
];

export function StaffCheckins() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const [flipped, setFlipped] = useState(false);
  const verified = reduce || flipped;

  // Plays once: the first pending arrival gets marked verified, like a staff member would.
  useEffect(() => {
    if (reduce || !inView) return;
    const id = setTimeout(() => setFlipped(true), 1400);
    return () => clearTimeout(id);
  }, [reduce, inView]);

  return (
    <section className="relative pt-24 pb-24 sm:pt-32 sm:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[600px_1fr]">
          {/* Visual: soft green-and-cream card with glass shapes and the staff page floating on it */}
          <Reveal>
            <div
              ref={ref}
              aria-hidden
              className="relative isolate flex h-[30rem] items-center justify-center overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#8ec9c5_0%,#b4dcd6_48%,#eaf0e6_100%)] px-4 sm:h-[31rem] sm:px-6"
            >
              <div className="absolute -top-16 left-[28%] -z-10 h-56 w-28 rotate-[14deg] bg-white/30 [clip-path:polygon(50%_0,100%_100%,0_72%)]" />
              <div className="absolute top-[34%] -left-10 -z-10 h-52 w-28 -rotate-[16deg] rounded-[60%_40%_55%_45%] bg-white/25 ring-1 ring-white/50" />
              <div className="absolute -right-8 bottom-8 -z-10 h-44 w-32 rotate-[26deg] rounded-[40%_60%_50%_50%] bg-white/30 ring-1 ring-white/50" />
              <div className="absolute right-[12%] -bottom-10 -z-10 h-44 w-72 rounded-full bg-cta/25 blur-3xl" />
              <CheckinsPanel verified={verified} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Guest check-ins</p>
            <h2 className="mt-5 max-w-[16ch] heading-section text-balance text-subheading">
              Every arrival, reviewed in one place.
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg text-pretty text-stone">
              Guests complete check-in on their phone. Your team sees each arrival in one list, checks the details and
              ID, and marks it verified or completed.
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
