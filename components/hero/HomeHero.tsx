"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ButtonLink, Container } from "@/components/ui/primitives";
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(80%_70%_at_50%_0%,var(--linen-2),transparent)]"
      />

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
          <motion.p variants={item} className="mt-6 max-w-[58ch] lead text-pretty text-stone">
            Give every guest a personal AI concierge while giving your hotel team an intelligent layer that handles
            conversations, requests and workflows.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} size="lg" variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </motion.div>
          <motion.p variants={item} className="mt-4 text-[0.8125rem] text-stone">
            *Early birds get to use the SaraiOS Essential plan for free.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: easeOut }}
          className="relative mx-auto mt-14 max-w-[1120px] [perspective:1400px] sm:mt-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -top-6 -bottom-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--linen-2),transparent)] blur-2xl"
          />
          <motion.div ref={frameRef} style={{ rotateX, scale, transformOrigin: "50% 0%" }}>
            <ProductScreenshot
              screen="concierge"
              src={src}
              priority
              sizes="(min-width: 1200px) 1120px, 100vw"
              className="shadow-[0_50px_100px_-40px_rgba(0,40,42,0.45)]"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
