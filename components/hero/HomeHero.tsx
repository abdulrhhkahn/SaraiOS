"use client";

import { useRef } from "react";
import Image from "next/image";
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
      {/* Background photo-style gradient: covers the top of the hero and fades into the page colour */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1000px] sm:h-[1100px]">
        <Image
          src="/images/hero/home-bg.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(to_bottom,transparent,var(--page))]" />
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
