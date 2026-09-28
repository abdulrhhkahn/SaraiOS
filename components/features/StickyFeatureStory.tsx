"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, CheckCircle2, Clock, Sparkles, UserRound } from "lucide-react";
import type { Feature } from "@/lib/features";
import type { ScreenAvailability } from "@/lib/screenshots.server";
import { Container, Eyebrow, TextLink } from "@/components/ui/primitives";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";
import { easeOut } from "@/components/animations/variants";
import { useMediaQuery } from "@/components/animations/useMediaQuery";
import { cn } from "@/lib/cn";

/** Floating overlay card shown over the sticky screenshot for each feature. */
function Overlay({ id }: { id: string }) {
  const base = "rounded-2xl bg-card/95 p-4 text-sm shadow-[var(--shadow-float)] ring-1 ring-line backdrop-blur";
  switch (id) {
    case "ai-concierge":
      return (
        <div className={base}>
          <p className="flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-iris-ink uppercase">
            <Sparkles className="size-3.5" aria-hidden /> Suggested action
          </p>
          <p className="mt-1.5 font-semibold">Offer late checkout · 2:00 PM</p>
        </div>
      );
    case "guest-messaging":
      return (
        <div className={base}>
          <p className="flex items-center gap-2 font-semibold">
            <UserRound className="size-4 text-brass-ink" aria-hidden /> Handed to Front Desk
          </p>
          <p className="mt-1 text-stone">Room 509 · Billing question</p>
        </div>
      );
    case "guest-requests":
      return (
        <div className={base}>
          <p className="text-xs text-stone">Housekeeping · Room 207</p>
          <p className="mt-1 flex items-center gap-1.5 font-semibold">
            <Clock className="size-4 text-warning" aria-hidden /> Two extra pillows · In progress
          </p>
        </div>
      );
    case "guest-profile":
      return (
        <div className={base}>
          <p className="text-xs text-stone">Remembered preference</p>
          <p className="mt-1 font-semibold">High floor · Extra pillows</p>
        </div>
      );
    case "analytics":
      return (
        <div className={base}>
          <p className="text-xs text-stone">Top question this week</p>
          <p className="mt-1 font-semibold">Breakfast times</p>
          <p className="mt-1 text-[0.7rem] font-semibold text-warning">Demo data</p>
        </div>
      );
    default:
      return (
        <div className={base}>
          <p className="flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="size-4 text-success" aria-hidden /> PMS · Integration
          </p>
          <p className="mt-1 text-stone">Spa · Coming soon</p>
        </div>
      );
  }
}

function StoryBlock({
  feature,
  index,
  onActive,
  src,
  inline,
}: {
  feature: Feature;
  index: number;
  onActive: (i: number) => void;
  src: string | null;
  inline: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55 });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} id={feature.id} className="flex scroll-mt-28 flex-col justify-center py-16 lg:min-h-[88vh] lg:py-0">
      <Eyebrow>{`${feature.index} / ${feature.eyebrow}`}</Eyebrow>
      <h2 className="mt-5 heading-section text-balance">{feature.title}</h2>
      <p className="mt-5 max-w-[48ch] lead text-stone">{feature.summary}</p>
      <ul className="mt-6 space-y-2.5">
        {feature.points.map((p) => (
          <li key={p} className="flex gap-3">
            <Check className="mt-1 size-4 shrink-0 text-iris-ink" aria-hidden />
            {p}
          </li>
        ))}
      </ul>
      {feature.cta && (
        <TextLink href="/demo" className="mt-6">
          {feature.cta.label}
        </TextLink>
      )}
      {/* Mobile / tablet: inline screenshot (desktop uses the sticky column instead) */}
      {inline && (
        <div className="mt-10 lg:hidden">
          <ProductScreenshot screen={feature.screen} src={src} sizes="100vw" />
        </div>
      )}
    </div>
  );
}

export function StickyFeatureStory({ features, shots }: { features: Feature[]; shots: ScreenAvailability }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const onActive = useCallback((i: number) => {
    setActive(i);
    setSeen((s) => Math.max(s, i));
  }, []);

  return (
    <section aria-label="SaraiOS features" className="relative">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          {features.map((f, i) => (
            <StoryBlock
              key={f.id}
              feature={f}
              index={i}
              onActive={onActive}
              src={shots[f.screen]}
              inline={!isDesktop}
            />
          ))}
        </div>

        {isDesktop && (
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-min(22vw,300px))]">
              {/* Progress rail */}
              <ol className="mb-5 flex gap-1.5" aria-hidden>
                {features.map((f, i) => (
                  <li key={f.id} className="h-1 flex-1 overflow-hidden rounded-full bg-black/10">
                    <motion.span
                      className="block h-full origin-left bg-ink"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: easeOut }}
                    />
                  </li>
                ))}
              </ol>
              <div className="relative">
                {/* All screens stay mounted and cross-fade — no remounts while scrolling fast. */}
                <div className="grid">
                  {features.map((f, i) => (
                    <motion.div
                      key={f.id}
                      className="[grid-area:1/1]"
                      initial={false}
                      animate={
                        i === active
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0, y: i < active ? -16 : 24, scale: 0.985 }
                      }
                      transition={{ duration: 0.6, ease: easeOut }}
                      style={{ pointerEvents: i === active ? "auto" : "none", zIndex: i === active ? 1 : 0 }}
                      aria-hidden={i !== active}
                    >
                      {/* Mount screens progressively: the current one and the next. */}
                      {i <= seen + 1 && (
                        <ProductScreenshot
                          screen={f.screen}
                          src={shots[f.screen]}
                          sizes="(min-width: 1024px) 60vw, 100vw"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
                {features.map((f, i) => (
                  <motion.div
                    key={f.id}
                    aria-hidden={i !== active}
                    className={cn("absolute -bottom-8 z-10 w-72", i % 2 ? "-left-10" : "-right-6")}
                    initial={false}
                    animate={
                      i === active
                        ? { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.5, ease: easeOut } }
                        : { opacity: 0, y: 8, transition: { duration: 0.15 } }
                    }
                    style={{ pointerEvents: "none" }}
                  >
                    <Overlay id={f.id} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
