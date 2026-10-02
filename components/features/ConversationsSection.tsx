"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  Clock,
  FileText,
  History,
  MessagesSquare,
  Search,
  Send,
  Sparkles,
  X,
  CircleCheck,
  ChevronDown,
} from "lucide-react";
import { Container, DemoTag } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { cn } from "@/lib/cn";

/* ---------- Staff dashboard "Conversations" page, with dummy data ---------- */

const list = [
  { name: "Maya Chen", channel: "web chat", when: "2 minutes ago", active: true },
  { name: "Tom Walsh", channel: "WhatsApp", when: "about 1 hour ago", active: false },
  { name: "Ines Duarte", channel: "SMS", when: "yesterday", active: false },
];

function ConversationsPanel({ stage }: { stage: number }) {
  return (
    <div className="flex w-full overflow-hidden rounded-2xl bg-white text-[0.68rem] shadow-[0_24px_60px_-24px_rgba(0,60,62,0.5)] ring-1 ring-black/[0.06]">
      {/* List */}
      <div className="hidden w-[39%] shrink-0 border-r border-black/[0.07] sm:block">
        <div className="p-3.5">
          <p className="font-serif text-[1.15rem] leading-none text-ink">Conversations</p>
          <p className="mt-1.5 text-[0.62rem] text-ink/55">3 conversations</p>

          <div className="mt-3 grid grid-cols-[1.5fr_1fr] rounded-lg bg-black/[0.05] p-0.5 text-center text-[0.58rem] font-medium text-ink/60">
            <span className="py-1 whitespace-nowrap">Needs attention</span>
            <span className="rounded-md bg-white py-1 text-ink shadow-sm">All</span>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-ink/45 ring-1 ring-black/10">
            <Search className="size-3 shrink-0" />
            <span className="truncate">Search guest questions…</span>
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg px-2 py-1.5 text-ink/60 ring-1 ring-black/10">
            <span>Any status</span>
            <ChevronDown className="size-3" />
          </div>
        </div>

        <div className="mt-1 border-t border-black/[0.06]">
          {list.map((c) => (
            <div
              key={c.name}
              className={cn(
                "relative border-b border-black/[0.05] px-3.5 py-2.5 last:border-b-0",
                c.active && "bg-[#f3f1ec]",
              )}
            >
              <p className="font-semibold text-ink">{c.name}</p>
              <p className="mt-0.5 text-[0.62rem] text-ink/55">{c.channel}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[0.6rem] text-ink/50">
                <Clock className="size-2.5" /> {c.when}
              </p>
              {c.active && <X className="absolute top-2.5 right-3 size-3 text-ink/45" />}
            </div>
          ))}
        </div>
      </div>

      {/* Thread */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2 border-b border-black/[0.07] px-4 py-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <p className="text-[0.8rem] font-semibold whitespace-nowrap text-ink">Maya Chen</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-wide text-emerald-900 uppercase">
                <CircleCheck className="size-2.5" /> Resolved
              </span>
            </div>
            <p className="mt-0.5 text-[0.62rem] text-ink/55">web chat · marked handled 2 minutes ago</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5 text-[0.6rem] text-ink/65">
              <span className="rounded-full bg-black/[0.05] px-2 py-0.5">Oct 2 → Oct 5</span>
              <span className="rounded-full bg-black/[0.05] px-2 py-0.5">2 guests</span>
            </div>
          </div>
          <div className="ml-1 flex shrink-0 items-center gap-1.5 text-[0.62rem] font-medium text-ink">
            <span className="hidden rounded-md px-2 py-1 ring-1 ring-black/10 sm:inline-block">Reopen</span>
            <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 ring-1 ring-black/10">
              <History className="size-3" /> Audit
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-2 px-4 py-3 text-[0.68rem] leading-snug">
          <p className="w-fit max-w-[88%] rounded-2xl rounded-bl-md px-3 py-1.5 text-ink ring-1 ring-black/[0.12]">
            Can I check out 2 hours later? My flight is around that time.
          </p>
          <p className="w-fit rounded-2xl rounded-bl-md px-3 py-1.5 text-ink ring-1 ring-black/[0.12]">
            What time is breakfast?
          </p>

          <div className="space-y-2 pt-1">
            <p
              className={cn(
                "ml-auto w-fit max-w-[92%] rounded-2xl rounded-br-md bg-[#1d2a37] px-3 py-1.5 text-white transition-[opacity,transform] duration-500",
                stage >= 1 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
            >
              Happy to arrange a late check-out for you. Would 1pm work?{" "}
              <span className="text-[0.55rem] opacity-70">(edited)</span>
            </p>
            <p
              className={cn(
                "ml-auto w-fit max-w-[92%] rounded-2xl rounded-br-md bg-[#1d2a37] px-3 py-1.5 text-white transition-[opacity,transform] duration-500",
                stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
            >
              Breakfast is served in the courtyard from 8–10am, come down whenever suits you.
            </p>
          </div>
        </div>

        <div className="border-t border-black/[0.07] p-3">
          <div className="flex items-end gap-2">
            <div className="h-11 flex-1 rounded-lg px-2.5 py-2 text-ink/45 ring-1 ring-black/10">Type a reply…</div>
            <div className="flex flex-col gap-1.5 text-ink/65">
              <span className="inline-flex size-6 items-center justify-center rounded-md ring-1 ring-black/10">
                <FileText className="size-3" />
              </span>
              <span className="inline-flex size-6 items-center justify-center rounded-md ring-1 ring-black/10">
                <Sparkles className="size-3" />
              </span>
            </div>
            <span className="inline-flex size-6 items-center justify-center self-end rounded-md bg-black/20 text-white">
              <Send className="size-3" />
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[0.58rem] text-ink/45">
            <span>⌘/Ctrl + Enter to send.</span>
            <DemoTag>Demo data</DemoTag>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

const points = [
  { icon: MessagesSquare, text: "Filter conversations by status, date or channel and search what guests asked" },
  { icon: Sparkles, text: "Review AI suggested replies, edit them or write your own" },
  { icon: History, text: "Open the audit trail to see every action taken on a conversation" },
];

export function ConversationsSection() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const [step, setStep] = useState(0);
  const stage = reduce ? 2 : step;

  // Plays once: the two staff replies arrive one after the other.
  useEffect(() => {
    if (reduce || !inView || step >= 2) return;
    const id = setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 1100);
    return () => clearTimeout(id);
  }, [reduce, inView, step]);

  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[1fr_600px]">
          <Reveal className="lg:order-1">
            <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Conversations</p>
            <h2 className="mt-5 max-w-[16ch] heading-section text-balance text-subheading">
              Every guest conversation, handled together.
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg text-pretty text-stone">
              Chats from web, SMS and WhatsApp land in one list. Sarai drafts replies from your saved answers, and your
              team approves, edits or writes their own.
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

          {/* Visual: soft green-and-cream card, mirrored from the check-ins section, with the staff page floating on it */}
          <Reveal delay={0.1} className="lg:order-2">
            <div
              ref={ref}
              aria-hidden
              className="relative isolate flex h-[30rem] items-center justify-center overflow-hidden rounded-3xl bg-[linear-gradient(200deg,#f0e7d4_0%,#d3e7de_42%,#7fbeb9_100%)] px-4 sm:h-[31rem] sm:px-6"
            >
              <div className="absolute -top-24 -left-16 -z-10 size-64 rounded-full bg-white/20 ring-1 ring-white/50" />
              <div className="absolute top-8 right-8 -z-10 h-24 w-20 rotate-[18deg] bg-white/30 [clip-path:polygon(0_0,100%_30%,40%_100%)]" />
              <div className="absolute -right-10 bottom-10 -z-10 h-48 w-28 -rotate-[20deg] rounded-[50%_50%_40%_60%] bg-white/25 ring-1 ring-white/50" />
              <div className="absolute -top-10 right-[16%] -z-10 h-40 w-64 rounded-full bg-[#f3e3bd]/60 blur-3xl" />
              <div className="absolute -bottom-12 left-[8%] -z-10 h-44 w-72 rounded-full bg-cta/25 blur-3xl" />
              <ConversationsPanel stage={stage} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
