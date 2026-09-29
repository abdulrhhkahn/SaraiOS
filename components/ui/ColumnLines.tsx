"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easeOut } from "@/components/animations/variants";
import { cn } from "@/lib/cn";

type ColumnLinesProps = {
  children: ReactNode;
  className?: string;
  /** Width of each column in px. */
  columnWidth?: number;
  /** Number of columns, centred behind the content. */
  columnCount?: number;
  /** % of the radius where the lines start to fade out. */
  radialFadeStart?: number;
  /** % of the radius where the lines are fully gone. */
  radialFadeEnd?: number;
};

/**
 * Section wrapper that draws faint vertical column lines behind its content.
 * The lines grow down from the top once on load, starting at the centre, and fade out
 * radially so they never end in a hard edge. Place content in a `relative z-10` child.
 */
export function ColumnLines({
  children,
  className,
  columnWidth = 80,
  columnCount = 14,
  radialFadeStart = 30,
  radialFadeEnd = 70,
}: ColumnLinesProps) {
  const mask = `radial-gradient(ellipse at center, #000 ${radialFadeStart}%, transparent ${radialFadeEnd}%)`;
  const middle = (columnCount - 1) / 2;

  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 flex -translate-x-1/2"
        style={{ width: columnWidth * columnCount + 1, maskImage: mask, WebkitMaskImage: mask }}
      >
        {Array.from({ length: columnCount + 1 }, (_, i) => (
          <motion.span
            key={i}
            className="h-full origin-top border-l border-line-strong"
            style={{ width: i === columnCount ? 1 : columnWidth }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.1, ease: easeOut, delay: 0.15 + Math.abs(i - middle) * 0.06 }}
          />
        ))}
      </div>
      {children}
    </section>
  );
}
