"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { MessageSquareText, Sparkles } from "lucide-react";
import { AppShell, Pill, RoomTag, type PillTone } from "../kit";

const columns = ["New", "Assigned", "In progress", "Completed"] as const;
type Column = (typeof columns)[number];

const tone: Record<Column, PillTone> = {
  New: "ai",
  Assigned: "neutral",
  "In progress": "warning",
  Completed: "success",
};

const staticCards: { id: string; title: string; room: string; team: string; col: Column }[] = [
  { id: "a", title: "Late checkout · 2:00 PM", room: "412", team: "Front Desk", col: "Completed" },
  { id: "b", title: "Airport transfer · Fri AM", room: "105", team: "Concierge", col: "Assigned" },
  { id: "c", title: "Dinner for two · 8:00 PM", room: "318", team: "Restaurant", col: "In progress" },
  { id: "d", title: "Crib for room", room: "221", team: "Housekeeping", col: "New" },
  { id: "e", title: "Spa · massage request", room: "509", team: "Spa", col: "Completed" },
];

export function RequestsMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotionSafe();
  const [stage, setStage] = useState(0);
  const pillowCol: Column = columns[reduce ? 3 : stage];

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setStage((s) => (s + 1) % 4), 1600);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="h-full">
      <AppShell
        active="requests"
        title="Guest Requests"
        actions={
          <Pill tone="ai">
            <Sparkles className="size-3" /> Created from conversation
          </Pill>
        }
      >
        <LayoutGroup>
          <div className="grid h-full grid-cols-4 gap-4 p-5">
            {columns.map((col) => (
              <div key={col} className="flex flex-col rounded-xl bg-[#f3f2ee] p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="font-semibold">{col}</span>
                  <Pill tone={tone[col]}>
                    {staticCards.filter((c) => c.col === col).length + (pillowCol === col ? 1 : 0)}
                  </Pill>
                </div>
                <div className="space-y-2.5">
                  {pillowCol === col && (
                    <motion.div
                      layoutId="pillow-card"
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      className="rounded-lg bg-white p-3 shadow-[0_0_0_1.5px_var(--iris),0_10px_24px_-12px_rgba(79,76,214,0.5)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Two extra pillows</span>
                        <RoomTag room="207" />
                      </div>
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-stone">
                        <MessageSquareText className="size-3" /> “Can I get two extra pillows?”
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] text-stone">Housekeeping</span>
                        <Pill tone={tone[col]}>{col}</Pill>
                      </div>
                    </motion.div>
                  )}
                  {staticCards
                    .filter((c) => c.col === col)
                    .map((c) => (
                      <motion.div layout key={c.id} className="rounded-lg bg-white p-3 shadow-[0_0_0_1px_var(--line)]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate font-semibold">{c.title}</span>
                          <RoomTag room={c.room} />
                        </div>
                        <p className="mt-2 text-[11px] text-stone">{c.team}</p>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </LayoutGroup>
      </AppShell>
    </div>
  );
}
