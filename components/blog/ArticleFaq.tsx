"use client";

import { Accordion } from "@/components/faq/Accordion";
import type { BlogFaq } from "@/lib/blog";

/** FAQ list for an article. The same questions are published as FAQPage structured data. */
export function ArticleFaq({ faqs }: { faqs: BlogFaq[] }) {
  return (
    <Accordion
      items={faqs.map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }))}
    />
  );
}
