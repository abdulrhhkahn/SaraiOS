"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * Heading and paragraph of the closing call to action above the footer links.
 * Every page shows the default copy; a page listed in `pageCopy` shows its own.
 */
const defaultCopy = {
  lines: ["Give every guest a smarter stay."],
  body: "Bring AI into the guest journey without taking the hospitality out of it.",
  titleWidth: "max-w-[16ch]",
  bodyWidth: "max-w-[46ch]",
};

const pageCopy: Record<string, typeof defaultCopy> = {
  // Contact page: reuses the page banner's heading and paragraph
  "/contact": {
    lines: ["Let's build a better guest experience."],
    body: "Tell us about your property and what you'd like to improve. We'll get back to you.",
    titleWidth: "max-w-[22ch]",
    bodyWidth: "max-w-[52ch]",
  },
  // Pricing page: reuses the page banner's heading and paragraph
  "/pricing": {
    lines: ["A guest experience platform built around your operation."],
    body: "Every hotel has different requirements, workflows and technology. Let's build the right SaraiOS deployment for your property.",
    titleWidth: "max-w-[28ch]",
    bodyWidth: "max-w-[56ch]",
  },
  // Solutions page: reuses the page banner's heading and paragraph
  "/industries": {
    lines: ["AI guest experience for every kind of hospitality."],
    body: "Whether you run one boutique property or a portfolio of hotels, SaraiOS adapts to your guests, your team and your way of working.",
    titleWidth: "max-w-[26ch]",
    bodyWidth: "max-w-[56ch]",
  },
  // Book a demo page: reuses the page banner's heading and paragraph
  "/demo": {
    lines: ["See SaraiOS in action."],
    body: "A focused session built around your property. Tell us a little about your operation and we'll tailor the demo.",
    titleWidth: "max-w-[22ch]",
    bodyWidth: "max-w-[52ch]",
  },
  // FAQ page: reuses the page banner's heading and paragraph
  "/faq": {
    lines: ["Questions, answered."],
    body: "Everything you need to know about SaraiOS. Can't find an answer? Our team is happy to help.",
    titleWidth: "max-w-[22ch]",
    bodyWidth: "max-w-[52ch]",
  },
  // Platform page
  "/features": {
    lines: ["Less relaying.", "More hospitality."],
    body: "SaraiOS takes the repetition out of guest communication so every team can spend its time where guests feel it most.",
    titleWidth: "max-w-[20ch]",
    bodyWidth: "max-w-[52ch]",
  },
};

export function FooterCtaCopy() {
  const pathname = usePathname();
  const copy = pageCopy[pathname] ?? defaultCopy;

  return (
    <>
      <h2 id="footer-cta" className={cn("mx-auto mt-5 heading-section text-balance text-subheading", copy.titleWidth)}>
        {copy.lines.map((line, i) => (
          <span key={line}>
            {i > 0 && <br className="hidden sm:block" />}
            {i > 0 && " "}
            {line}
          </span>
        ))}
      </h2>
      <p className={cn("mx-auto mt-5 text-lg text-pretty text-stone", copy.bodyWidth)}>{copy.body}</p>
    </>
  );
}
