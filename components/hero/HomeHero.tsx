"use client";

import { motion } from "framer-motion";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { BannerGlow } from "@/components/ui/BannerGlow";
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
    <section className="relative isolate overflow-hidden pt-36 pb-28 sm:pt-48 sm:pb-40 lg:pt-56 lg:pb-48">
      {/* Background: animated banner swirl, faded out behind the text */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
      >
        <BannerGlow />
        <div className="grain absolute inset-0 opacity-60" />
      </motion.div>

      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[980px] text-center"
        >
          <motion.div variants={item}>
            <Eyebrow>AI-Native Guest Experience Platform</Eyebrow>
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
    </section>
  );
}
