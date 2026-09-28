"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ScreenAvailability } from "@/lib/screenshots.server";
import type { ScreenKey } from "@/lib/screenshots";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";
import { cn } from "@/lib/cn";
import { easeOut } from "@/components/animations/variants";

const tabs: { key: ScreenKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "conversations", label: "Conversations" },
  { key: "requests", label: "Requests" },
  { key: "analytics", label: "Analytics" },
  { key: "settings", label: "Settings" },
];

export function DashboardShowcase({ shots }: { shots: ScreenAvailability }) {
  const [active, setActive] = useState<ScreenKey>("overview");

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The SaraiOS dashboard"
            title="One place for every conversation, request and insight."
            body="Your team sees what Sarai is handling, what needs a person and what guests are asking for — across the property."
          />
        </Reveal>

        <div
          role="tablist"
          aria-label="Dashboard views"
          className="mt-12 flex gap-1 overflow-x-auto rounded-full bg-card p-1 ring-1 ring-line sm:w-fit"
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={active === t.key}
              aria-controls="dashboard-panel"
              onClick={() => setActive(t.key)}
              className={cn(
                "relative min-h-10 shrink-0 cursor-pointer rounded-full px-4 text-sm font-semibold transition-colors duration-200",
                active === t.key ? "text-linen" : "text-stone hover:text-ink",
              )}
            >
              {active === t.key && (
                <motion.span
                  layoutId="dash-tab"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        <div id="dashboard-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              <ProductScreenshot screen={active} src={shots[active]} sizes="(min-width: 1280px) 1180px, 100vw" />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
