"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { showcaseScreens } from "@/lib/features";
import type { ScreenAvailability } from "@/lib/screenshots.server";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";
import { useMediaQuery } from "@/components/animations/useMediaQuery";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";

/**
 * Scroll-linked horizontal product tour on large screens; a native
 * swipeable row (scroll-snap) on smaller screens or with reduced motion.
 */
export function HorizontalShowcase({ shots }: { shots: ScreenAvailability }) {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotionSafe();
  const pinned = isDesktop && !reduce;

  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -distance]);

  const heading = (
    <SectionHeading
      eyebrow="Product tour"
      title="The whole operation, in one calm interface."
      body="Scroll through the core views your team works in every day."
    />
  );

  if (!pinned) {
    return (
      <section ref={ref} className="py-24">
        <Container>{heading}</Container>
        <ul className="mt-12 flex snap-x snap-mandatory [scrollbar-width:thin] gap-5 overflow-x-auto px-5 pb-6 sm:px-8">
          {showcaseScreens.map((s) => (
            <li key={s.screen} className="w-[86vw] max-w-[760px] shrink-0 snap-center">
              <ProductScreenshot screen={s.screen} src={shots[s.screen]} sizes="86vw" />
              <p className="mt-4 font-semibold">{s.label}</p>
              <p className="text-sm text-stone">{s.caption}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ height: `${showcaseScreens.length * 70}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <Container>{heading}</Container>
        <div className="mt-12">
          <motion.ul
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-8 px-[max(2rem,calc((100vw-1240px)/2+2rem))]"
          >
            {showcaseScreens.map((s) => (
              <li key={s.screen} className="w-[min(56vw,calc((100vh-380px)*1.45))] max-w-[820px] shrink-0">
                <ProductScreenshot screen={s.screen} src={shots[s.screen]} sizes="56vw" />
                <div className="mt-4 flex items-baseline gap-3">
                  <p className="font-semibold">{s.label}</p>
                  <p className="text-sm text-stone">{s.caption}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
