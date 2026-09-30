"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { BookOpen, Pencil, Plus, Send, Smartphone, Trash2, UserCheck } from "lucide-react";
import { ButtonLink, Container, DemoTag } from "@/components/ui/primitives";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/cn";

/**
 * Sequence (plays once when the mockup scrolls into view):
 * 0 guest asks · 1 concierge looks it up · 2 answer arrives and the saved FAQ it came from lights up
 */
const LAST_STAGE = 2;
const DELAYS = [600, 1500];

/* ---------- Phone: the guest hub chat from the Sarai app ---------- */

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 px-1 py-1" aria-hidden>
      <span className="typing-dot size-1.5 rounded-full bg-stone/50" />
      <span className="typing-dot size-1.5 rounded-full bg-stone/50" />
      <span className="typing-dot size-1.5 rounded-full bg-stone/50" />
    </span>
  );
}

function PhoneChat({ stage }: { stage: number }) {
  const answered = stage >= LAST_STAGE;
  return (
    <div className="w-[15.5rem] shrink-0 rounded-[2.4rem] bg-ink p-2 shadow-[0_30px_60px_-20px_rgba(0,40,42,0.55)]">
      <div className="relative flex h-[32rem] flex-col overflow-hidden rounded-[1.9rem] bg-white">
        <span aria-hidden className="absolute top-2 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />

        {/* Guest hub header */}
        <div className="flex items-center gap-2.5 px-4 pt-9">
          <span aria-hidden className="size-8 rounded-lg bg-cta" />
          <div className="leading-tight">
            <p className="font-serif text-[0.95rem] text-ink">Demo Hotel</p>
            <p className="text-[0.65rem] text-stone/60">Guest hub</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-4 mt-3 grid grid-cols-3 rounded-lg bg-black/[0.05] p-0.5 text-center text-[0.68rem] font-medium text-stone/70">
          <span className="py-1">Info</span>
          <span className="py-1">Guidebook</span>
          <span className="rounded-md bg-white py-1 text-ink shadow-sm">Chat</span>
        </div>

        {/* Status */}
        <p className="mx-4 mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-cta/10 px-2.5 py-1 text-[0.65rem] font-medium text-cta">
          <span className="size-1.5 rounded-full bg-cta" aria-hidden />
          {answered ? "Answered by AI concierge" : "Concierge is looking that up…"}
        </p>

        {/* Messages */}
        <div className="mt-3 min-h-0 flex-1 space-y-2.5 overflow-hidden px-4 text-[0.75rem] leading-snug">
          <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-cta px-3 py-2 text-white">
            What&apos;s the Wi-Fi password?
          </p>
          <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-[#f1f0ec] px-3 py-2 text-ink">
            <p className="mb-0.5 text-[0.62rem] font-semibold text-cta">AI concierge</p>
            Connect to DemoHotel-Guest. The password is printed on your key card.
          </div>
          <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-cta px-3 py-2 text-white">
            What time is breakfast?
          </p>
          <div className="relative min-h-[4.5rem]">
            <div
              className={cn(
                "w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-[#f1f0ec] px-3 py-2 text-ink transition-opacity duration-500",
                answered ? "opacity-100" : "opacity-0",
              )}
            >
              <p className="mb-0.5 text-[0.62rem] font-semibold text-cta">AI concierge</p>
              Breakfast is served in the courtyard from 8–10am.
            </div>
            <div
              className={cn(
                "absolute top-0 left-0 w-fit rounded-2xl rounded-bl-md bg-[#f1f0ec] px-2 py-1 transition-opacity duration-300",
                stage === 1 ? "opacity-100" : "opacity-0",
              )}
            >
              <TypingDots />
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-black/[0.06] px-3 py-3">
          <span className="flex-1 rounded-full bg-black/[0.04] px-3 py-2 text-[0.7rem] text-stone/50">
            Type a message…
          </span>
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-cta text-white">
            <Send className="size-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Knowledge base: saved questions and answers ---------- */

type Faq = { category: string; question: string; answer: string; used?: boolean };

const faqs: Faq[] = [
  {
    category: "Breakfast",
    question: "What time is breakfast?",
    answer: "Served in the courtyard from 8–10am.",
    used: true,
  },
  {
    category: "Wifi",
    question: "What's the Wi-Fi password?",
    answer: "Connect to DemoHotel-Guest. The password is printed on your key card.",
  },
  {
    category: "Check-out",
    question: "What time is check-out?",
    answer: "Check-out is at 11:00. Late check-out can be requested in the chat.",
  },
];

function KnowledgeCard({ stage }: { stage: number }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_18px_40px_-20px_rgba(0,60,62,0.35)] ring-1 ring-black/[0.05] sm:p-5 md:pl-[5.25rem]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-serif text-[1.05rem] text-ink">Knowledge base</p>
            <DemoTag>Demo data</DemoTag>
          </div>
          <p className="mt-1 max-w-[30ch] text-[0.7rem] leading-snug text-stone/60">
            Powers the AI concierge that answers guest questions.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-cta px-2.5 py-1.5 text-[0.68rem] font-semibold text-white">
          <Plus className="size-3" aria-hidden /> Add FAQ
        </span>
      </div>

      <div className="mt-4 space-y-3.5">
        {faqs.map((f) => {
          const lit = f.used && stage >= LAST_STAGE;
          return (
            <div key={f.category}>
              <p className="mb-1.5 text-[0.62rem] font-medium tracking-wider text-stone/55 uppercase">{f.category}</p>
              <div
                className={cn(
                  "rounded-xl border p-3 transition-[background-color,box-shadow,border-color] duration-500",
                  lit
                    ? "border-cta/40 bg-cta/[0.05] shadow-[0_0_0_3px_rgba(0,120,125,0.12)]"
                    : "border-black/[0.08] bg-white",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[0.78rem] font-medium text-ink">{f.question}</p>
                    <p className="mt-0.5 text-[0.72rem] leading-snug text-stone/65">{f.answer}</p>
                  </div>
                  <span className="flex shrink-0 gap-2 text-stone/40" aria-hidden>
                    <Pencil className="size-3.5" />
                    <Trash2 className="size-3.5" />
                  </span>
                </div>
                {f.used && (
                  <p
                    className={cn(
                      "mt-2 w-fit rounded-full bg-cta px-2 py-0.5 text-[0.62rem] font-semibold text-white transition-opacity duration-500",
                      lit ? "opacity-100" : "opacity-0",
                    )}
                  >
                    Used for this answer
                  </p>
                )}
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
  {
    icon: BookOpen,
    title: "Saved questions and answers",
    text: "Your team adds each question and answer once and groups them by topic, like Wi-Fi or Breakfast.",
  },
  {
    icon: Smartphone,
    title: "Chat on the guest's phone",
    text: "Guests open the guest hub on their phone and ask in the chat, with no login.",
  },
  {
    icon: UserCheck,
    title: "Handover to your team",
    text: "When a question is not covered, the conversation is handed to your team to answer.",
  },
];

export function ConciergeKnowledge() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const [step, setStep] = useState(0);
  const stage = reduce ? LAST_STAGE : step;

  useEffect(() => {
    if (reduce || !inView || step >= LAST_STAGE) return;
    const id = setTimeout(() => setStep((s) => s + 1), DELAYS[step]);
    return () => clearTimeout(id);
  }, [reduce, inView, step]);

  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <p className="font-mono text-[0.8125rem] tracking-[0.08em] text-cta uppercase">AI concierge</p>
            <h2 className="mt-5 max-w-[18ch] heading-section text-balance text-subheading">
              An AI concierge that knows your hotel.
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg text-pretty text-stone">
              Your team saves each question and answer once. Sarai uses them to reply to guests in the chat on their
              phone, and hands over to your team when needed.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <ButtonLink href="/pricing" size="sm" arrow>
                Start your free trial
              </ButtonLink>
              <ButtonLink href={primaryCta.href} size="sm" variant="secondary">
                {primaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>

          {/* Mockup frame: phone chat on the left, the saved FAQs it answers from on the right */}
          <Reveal delay={0.1}>
            <div ref={ref} className="rounded-[1.75rem] bg-black/[0.03] p-2.5 ring-1 ring-black/[0.05] sm:p-3">
              <div
                aria-hidden
                className="relative isolate flex flex-col gap-8 overflow-hidden rounded-[1.25rem] bg-[linear-gradient(165deg,#f7f4ec_0%,#f0eee5_55%,#e3eee9_100%)] px-4 py-8 md:block md:h-[38rem] md:p-0"
              >
                <div className="pointer-events-none absolute top-1/3 left-1/4 -z-10 h-56 w-2/3 rounded-full bg-cta/20 blur-3xl" />
                <div className="order-2 md:absolute md:inset-y-0 md:right-0 md:w-[68%] md:pt-10 md:pr-6">
                  <KnowledgeCard stage={stage} />
                </div>
                <div className="order-1 flex justify-center md:absolute md:top-12 md:left-[5%] md:block">
                  <PhoneChat stage={stage} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-3 md:gap-8">
          {points.map((p) => (
            <RevealItem key={p.title}>
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-line">
                <p.icon className="size-5 text-cta" aria-hidden />
              </span>
              <h3 className="mt-5 heading-sub text-xl text-subheading">{p.title}</h3>
              <p className="mt-2 max-w-[38ch] text-[0.95rem] text-pretty text-ink/60">{p.text}</p>
            </RevealItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
