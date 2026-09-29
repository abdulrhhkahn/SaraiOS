"use client";

import { motion } from "framer-motion";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { ColumnLines } from "@/components/ui/ColumnLines";
import { easeOut } from "@/components/animations/variants";
import { primaryCta, secondaryCta } from "@/lib/navigation";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

/** Headline slides without fading so it paints immediately (keeps LCP fast). */
const headline = { hidden: { y: 28 }, visible: { y: 0, transition: { duration: 0.9, ease: easeOut } } };

export function HomeHero() {
  return (
    <ColumnLines columnWidth={80} columnCount={14} radialFadeStart={30} radialFadeEnd={70} className="bg-page">
      <Container className="relative z-10 flex min-h-[88svh] items-center justify-center pt-36 pb-24 sm:pt-44 lg:pt-48">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-[980px] flex-col items-center text-center"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-linen">
              <span aria-hidden className="size-2 rounded-full bg-iris" />
              AI-Native Guest Experience Platform
            </span>
          </motion.div>
          <motion.h1 variants={headline} className="mt-6 heading-hero text-balance">
            Hospitality, with an AI that never sleeps.
          </motion.h1>
          <motion.p variants={item} className="mx-auto mt-6 max-w-[58ch] lead text-pretty text-stone">
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
        </motion.div>
      </Container>
    </ColumnLines>
  );
}
