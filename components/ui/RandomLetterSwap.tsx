"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Transition } from "framer-motion";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { cn } from "@/lib/cn";

function shuffled(length: number) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * Text that rolls letter by letter on hover or keyboard focus: every letter slides up and out while a copy slides
 * in from below, and the letters go in a new random order each time.
 *
 * It listens on its closest link or button, so the effect fires from the whole clickable area, not just the text.
 * Screen readers get the plain label; with reduced motion the text is shown as is.
 */
export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.025,
  transition = { type: "spring", duration: 0.6 },
}: {
  label: string;
  className?: string;
  /** Seconds between one letter and the next in the random order. */
  staggerDuration?: number;
  transition?: Transition;
}) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const chars = Array.from(label);
  const [active, setActive] = useState(false);
  const [order, setOrder] = useState<number[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const target = el.closest<HTMLElement>("a, button") ?? el;
    const count = Array.from(label).length;
    const enter = () => {
      setOrder(shuffled(count));
      setActive(true);
    };
    const leave = () => setActive(false);
    target.addEventListener("mouseenter", enter);
    target.addEventListener("mouseleave", leave);
    target.addEventListener("focusin", enter);
    target.addEventListener("focusout", leave);
    return () => {
      target.removeEventListener("mouseenter", enter);
      target.removeEventListener("mouseleave", leave);
      target.removeEventListener("focusin", enter);
      target.removeEventListener("focusout", leave);
    };
  }, [label, reduce]);

  if (reduce) return <span className={className}>{label}</span>;

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      <span className="sr-only">{label}</span>
      <span aria-hidden className="inline-flex">
        {chars.map((ch, i) => {
          const t: Transition = { ...transition, delay: (order[i] ?? i) * staggerDuration };
          const glyph = ch === " " ? "\u00A0" : ch;
          return (
            <span key={`${ch}-${i}`} className="relative -my-[0.12em] inline-block overflow-hidden py-[0.12em]">
              {/* Letters are drawn with CSS content, so the page text is the label once, not every letter twice. */}
              <motion.span
                data-char={glyph}
                className="inline-block before:content-[attr(data-char)]"
                animate={{ y: active ? "-135%" : "0%" }}
                transition={t}
              />
              <motion.span
                data-char={glyph}
                className="absolute inset-x-0 top-[0.12em] inline-block before:content-[attr(data-char)]"
                initial={false}
                animate={{ y: active ? "0%" : "135%" }}
                transition={t}
              />
            </span>
          );
        })}
      </span>
    </span>
  );
}
