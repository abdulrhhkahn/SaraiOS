"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { Feature } from "@/lib/features";
import type { ScreenAvailability } from "@/lib/screenshots.server";
import { Container } from "@/components/ui/primitives";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";
import { cn } from "@/lib/cn";

/**
 * Five shades of the brand teal (#00787d), light to dark, one per card.
 * Text flips to navy on the two light tints and to white once the card is
 * dark enough — every pairing keeps at least a 4.5:1 contrast ratio.
 */
const shades = [
  { bg: "#b2d6d8", text: "#1d2a37", muted: "rgba(29,42,55,0.68)", chip: "rgba(29,42,55,0.08)" },
  { bg: "#66aeb1", text: "#1d2a37", muted: "rgba(29,42,55,0.72)", chip: "rgba(29,42,55,0.1)" },
  { bg: "#00787d", text: "#ffffff", muted: "rgba(255,255,255,0.75)", chip: "rgba(255,255,255,0.14)" },
  { bg: "#005458", text: "#ffffff", muted: "rgba(255,255,255,0.75)", chip: "rgba(255,255,255,0.14)" },
  { bg: "#003638", text: "#ffffff", muted: "rgba(255,255,255,0.75)", chip: "rgba(255,255,255,0.14)" },
] as const;

function FeatureCard({
  feature,
  src,
  shade,
  index,
  total,
}: {
  feature: Feature;
  src: string | null;
  shade: (typeof shades)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Cards behind the next one settle back slightly, echoing a real stack of cards.
  const scale = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, index === total - 1 ? 1 : 0.6]);

  return (
    <div ref={ref} className="sticky top-24 mb-6 sm:top-28" style={{ zIndex: index + 1 }}>
      <Container>
        <motion.div
          style={{ scale, opacity, backgroundColor: shade.bg, color: shade.text }}
          className="overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(0,40,42,0.45)] will-change-transform"
        >
          <div className="grid items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-2 md:gap-12">
            <div>
              <p
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase"
                style={{ backgroundColor: shade.chip }}
              >
                {feature.index} / {feature.eyebrow}
              </p>
              <h3 className="mt-5 heading-section text-balance" style={{ color: shade.text }}>
                {feature.title}
              </h3>
              <p className="mt-5 lead" style={{ color: shade.muted }}>
                {feature.summary}
              </p>
              <ul className="mt-6 space-y-2.5">
                {feature.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.97rem]">
                    <Check className="mt-1 size-4 shrink-0" aria-hidden style={{ color: shade.text }} />
                    <span style={{ color: shade.muted }}>{p}</span>
                  </li>
                ))}
              </ul>
              {feature.cta && (
                <Link
                  href={feature.cta.href}
                  className="group mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
                  style={{ color: shade.text }}
                >
                  {feature.cta.label}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              )}
            </div>
            <div>
              <ProductScreenshot screen={feature.screen} src={src} sizes="(min-width: 768px) 45vw, 100vw" />
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

/** The five core features (01–05), pinned and stacked as you scroll past them. */
export function StickyFeatureCards({ features, shots }: { features: Feature[]; shots: ScreenAvailability }) {
  return (
    <section aria-label="Core features" className={cn("relative", "pb-6")}>
      {features.map((feature, i) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          src={shots[feature.screen]}
          shade={shades[i % shades.length]}
          index={i}
          total={features.length}
        />
      ))}
    </section>
  );
}
