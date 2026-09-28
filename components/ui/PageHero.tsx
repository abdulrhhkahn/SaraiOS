"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "./primitives";
import { BannerGlow } from "./BannerGlow";
import { easeOut } from "@/components/animations/variants";
import { cn } from "@/lib/cn";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

/** Headline slides without fading so it paints immediately (keeps LCP fast). */
const headline = { hidden: { y: 28 }, visible: { y: 0, transition: { duration: 0.9, ease: easeOut } } };

/** Hero used by inner pages. */
export function PageHero({
  eyebrow,
  title,
  body,
  actions,
  align = "center",
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20", className)}>
      <BannerGlow />
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className={cn("max-w-4xl", align === "center" && "mx-auto text-center")}
        >
          {eyebrow && (
            <motion.div variants={item}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1 variants={headline} className={cn("mt-6 heading-hero text-balance")}>
            {title}
          </motion.h1>
          {body && (
            <motion.p
              variants={item}
              className={cn("mt-6 max-w-[60ch] lead text-pretty text-stone", align === "center" && "mx-auto")}
            >
              {body}
            </motion.p>
          )}
          {actions && (
            <motion.div
              variants={item}
              className={cn("mt-9 flex flex-wrap gap-3", align === "center" && "justify-center")}
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
        {children}
      </Container>
    </section>
  );
}
