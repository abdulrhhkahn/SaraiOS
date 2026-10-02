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
  // Solutions page: reuses the page banner's heading and paragraph
  "/industries": {
    lines: ["AI guest experience for every kind of hospitality."],
    body: "Whether you run one boutique property or a portfolio of hotels, SaraiOS adapts to your guests, your team and your way of working.",
    titleWidth: "max-w-[26ch]",
    bodyWidth: "max-w-[56ch]",
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
