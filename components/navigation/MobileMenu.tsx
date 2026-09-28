"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { mobileNav, primaryCta } from "@/lib/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { buttonClass } from "@/components/ui/primitives";
import { easeOut } from "@/components/animations/variants";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col bg-page px-5 pt-24 pb-8 md:hidden"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <nav aria-label="Mobile" className="flex-1">
            <motion.ul
              className="divide-y divide-line border-y border-line"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } } }}
            >
              {mobileNav.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-16 items-center justify-between text-[1.75rem] font-semibold tracking-[-0.03em] text-ink"
                  >
                    {item.label}
                    <ArrowUpRight aria-hidden className="size-5 text-stone" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.35 } }}
            className="space-y-4"
          >
            <Link href={primaryCta.href} onClick={onClose} className={buttonClass("primary", "lg") + " w-full"}>
              {primaryCta.label}
            </Link>
            <p className="text-center text-sm text-stone">{siteConfig.tagline}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
