"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";
import { useReducedMotionSafe } from "@/components/animations/useReducedMotionSafe";
import { easeOut } from "@/components/animations/variants";
import { primaryCta, secondaryCta } from "@/lib/navigation";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

/** Headline slides without fading so it paints immediately (keeps LCP fast). */
const headline = { hidden: { y: 28 }, visible: { y: 0, transition: { duration: 0.9, ease: easeOut } } };

/** Centred headline, two calls to action, then the product itself below the fold line. */
export function HomeHero({ src }: { src: string | null }) {
  const reduce = useReducedMotionSafe();
  const frameRef = useRef<HTMLDivElement>(null);

  // The screenshot starts slightly tilted back and lies flat as it scrolls into place.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start 95%", "start 35%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.94, 1]);

  return (
    <section className="relative isolate overflow-hidden bg-page pt-36 pb-16 sm:pt-44 sm:pb-24">
      {/* Cream backdrop: soft vertical pleats that fade out towards the middle, a touch of grain, and a fade into the page below */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-linen">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0)_0px,rgba(255,255,255,0.8)_80px,rgba(255,255,255,0)_160px,rgba(110,90,40,0.045)_240px,rgba(255,255,255,0)_320px)] [mask-image:linear-gradient(90deg,#000,rgba(0,0,0,0.2)_32%,rgba(0,0,0,0.2)_68%,#000)]" />
        <div className="absolute inset-0 bg-grain opacity-[0.045] mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(to_bottom,transparent,var(--page))]" />
      </div>

      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-[900px] flex-col items-center text-center"
        >
          <motion.h1 variants={headline} className="heading-hero text-balance">
            Hospitality, with an AI that never sleeps.
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-[46ch] text-lg text-pretty text-stone">
            Give every guest a personal AI concierge while giving your hotel team an intelligent layer that handles
            conversations, requests and workflows.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-3">
            <ArrowButton href={primaryCta.href} size="sm">
              {primaryCta.label}
            </ArrowButton>
            <ArrowButton href={secondaryCta.href} size="sm" variant="secondary">
              {secondaryCta.label}
            </ArrowButton>
          </motion.div>
          <motion.p variants={item} className="mt-4 text-[0.8125rem] text-stone">
            *Early birds get to use the SaraiOS Essential plan for free.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: easeOut }}
          className="relative mx-auto mt-14 [perspective:1400px] sm:mt-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -top-6 -bottom-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),transparent)] blur-2xl"
          />
          <motion.div ref={frameRef} style={{ rotateX, scale, transformOrigin: "50% 0%" }}>
            <div className="rounded-[1.75rem] bg-black/[0.03] p-2.5 ring-1 ring-black/[0.05] sm:p-3">
              <ProductScreenshot
                screen="concierge"
                src={src}
                chrome={false}
                priority
                sizes="(min-width: 1240px) 1150px, 100vw"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
