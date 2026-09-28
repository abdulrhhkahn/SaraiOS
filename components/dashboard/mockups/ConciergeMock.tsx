"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { CalendarCheck, Check, Clock, Sparkles } from "lucide-react";
import { AppShell, Avatar, Bubble, KeyValue, Panel, Pill, RoomTag } from "../kit";

const threads = [
  { name: "Maya Chen", room: "412", preview: "Late checkout tomorrow?", active: true },
  { name: "Tom Walsh", room: "207", preview: "Extra towels please", active: false },
  { name: "Ines Duarte", room: "318", preview: "Spa hours on Sunday", active: false },
  { name: "Kenji Mori", room: "105", preview: "Airport transfer Friday", active: false },
];

/** Steps: 0 guest q, 1 sarai answer, 2 suggested action, 3 guest yes, 4 confirmation */
const STEPS = 5;

export function ConciergeMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotionSafe();
  const [step, setStep] = useState(0);
  const shown = reduce ? STEPS : step;

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setStep((s) => (s >= STEPS ? s : s + 1)), 1100);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const item = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

  return (
    <div ref={ref} className="h-full">
      <AppShell active="concierge" title="AI Concierge">
        <div className="grid h-full grid-cols-[250px_1fr_280px]">
          <ul className="space-y-1 border-r border-line p-3">
            {threads.map((t) => (
              <li
                key={t.name}
                className={`rounded-lg p-2.5 ${t.active ? "bg-white shadow-[0_0_0_1px_var(--line)]" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-[11px] text-stone">Rm {t.room}</span>
                </div>
                <p className="mt-0.5 truncate text-stone">{t.preview}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 p-6">
            <div className="flex items-center gap-2 pb-2">
              <Avatar name="Maya Chen" />
              <div>
                <p className="font-semibold">Maya Chen</p>
                <p className="text-[11px] text-stone">Room 412 · Checking out tomorrow</p>
              </div>
              <Pill tone="ai" className="ml-auto">
                <Sparkles className="size-3" /> Sarai handling
              </Pill>
            </div>
            <AnimatePresence>
              {shown >= 0 && (
                <motion.div key="q" {...item}>
                  <Bubble from="guest">Can I get a late checkout tomorrow?</Bubble>
                </motion.div>
              )}
              {shown >= 1 && (
                <motion.div key="a" {...item}>
                  <Bubble from="sarai">
                    Absolutely. I can check availability for your room. Would you like me to check?
                  </Bubble>
                </motion.div>
              )}
              {shown >= 2 && (
                <motion.div key="s" {...item} className="ml-1 flex items-center gap-2 text-[12px] text-iris-ink">
                  <span className="rounded-full border border-dashed border-iris/60 bg-iris-soft/60 px-3 py-1 font-semibold">
                    Suggested action · Check late checkout availability
                  </span>
                </motion.div>
              )}
              {shown >= 3 && (
                <motion.div key="y" {...item}>
                  <Bubble from="guest">Yes.</Bubble>
                </motion.div>
              )}
              {shown >= 4 && (
                <motion.div key="c" {...item}>
                  <Bubble from="sarai">
                    Late checkout until 2:00 PM is available. I&apos;ve added it to your stay.
                  </Bubble>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-3 border-l border-line p-4">
            <Panel title="Stay">
              <KeyValue k="Room" v={<RoomTag room="412" />} />
              <KeyValue k="Check-out" v="Tomorrow, 11:00" />
              <KeyValue k="Guests" v="2" />
            </Panel>
            <Panel
              title="Action"
              aside={
                shown >= 4 ? (
                  <Pill tone="success">
                    <Check className="size-3" /> Confirmed
                  </Pill>
                ) : (
                  <Pill tone="warning">
                    <Clock className="size-3" /> Pending
                  </Pill>
                )
              }
            >
              <div className="flex items-center gap-2">
                <CalendarCheck className="size-4 text-iris-ink" />
                <span className="font-semibold">Late checkout</span>
              </div>
              <KeyValue k="New time" v={shown >= 4 ? "2:00 PM" : "—"} />
              <KeyValue k="Team" v="Front Desk" />
            </Panel>
          </div>
        </div>
      </AppShell>
    </div>
  );
}
