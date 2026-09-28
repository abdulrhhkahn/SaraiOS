"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/faq";
import { cn } from "@/lib/cn";

/** Accessible disclosure list. Height animates with the grid-rows technique (no layout JS). */
export function Accordion({ items, defaultOpen }: { items: FaqItem[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const base = useId();

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${base}-${item.id}-btn`;
        const panelId = `${base}-${item.id}-panel`;
        return (
          <li key={item.id}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-semibold tracking-[-0.01em] text-ink"
              >
                {item.question}
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition-[transform,background-color,color] duration-300 ease-out",
                    isOpen ? "rotate-45 bg-ink text-linen" : "bg-card",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-[68ch] pb-6 leading-relaxed text-stone">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
