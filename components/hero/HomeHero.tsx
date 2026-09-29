"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { easeOut } from "@/components/animations/variants";
import { primaryCta, secondaryCta } from "@/lib/navigation";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

/** Headline slides without fading so it paints immediately (keeps LCP fast). */
const headline = { hidden: { y: 28 }, visible: { y: 0, transition: { duration: 0.9, ease: easeOut } } };

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night pt-28 pb-8 sm:pb-12 lg:items-center lg:pb-0">
      {/* Banner image. Only the scale animates (never the opacity), so it can still be the LCP element. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: easeOut }}
      >
        <Image
          src="/images/hero/home-banner.jpg"
          alt=""
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-[64%_45%] lg:object-center"
        />
      </motion.div>

      <Container>
        {/* Frosted glass panel: keeps the text readable over the busy painting. */}
        <div className="w-full max-w-[640px] rounded-[1.75rem] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_30px_80px_-30px_rgba(0,0,0,0.65)] backdrop-blur-xl backdrop-saturate-150 sm:rounded-[2rem] sm:p-10">
          <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-start">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-linen">
                <span aria-hidden className="size-2 rounded-full bg-iris" />
                AI-Native Guest Experience Platform
              </span>
            </motion.div>
            <motion.h1 variants={headline} className="mt-6 heading-hero text-balance">
              Hospitality, with an AI that never sleeps.
            </motion.h1>
            <motion.p variants={item} className="mt-6 max-w-[52ch] lead text-pretty text-stone">
              Give every guest a personal AI concierge while giving your hotel team an intelligent layer that handles
              conversations, requests and workflows.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={primaryCta.href} size="lg" arrow>
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} size="lg" variant="secondary">
                {secondaryCta.label}
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
