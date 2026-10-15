"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { demoFields } from "@/lib/forms";
import { LeadForm } from "@/components/forms/LeadForm";
import { easeOut } from "@/components/animations/variants";

/** How long the success message stays up before the dialog closes by itself. */
const CLOSE_AFTER_MS = 2800;

function DemoDialog({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
      clearTimeout(closeTimer.current);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink/45 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-dialog-title"
        className="relative my-auto w-full max-w-[640px] rounded-3xl bg-card p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-line sm:p-9"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: easeOut }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-black/[0.05] hover:text-ink"
        >
          <X className="size-5" aria-hidden />
        </button>
        <h2 id="demo-dialog-title" className="pr-10 heading-sub text-3xl">
          Book a Demo
        </h2>
        <p className="mt-2 mb-7 pr-6 text-[0.95rem] text-stone">
          Tell us a little about your property and we&apos;ll set up a walkthrough.
        </p>
        <LeadForm
          formId="demo"
          floatingLabels
          bare
          fields={demoFields}
          submitLabel="Request a Demo"
          successTitle="Your demo request is in."
          successBody="Thanks. We'll be in touch shortly to find a time that works for your team."
          onSuccess={() => {
            closeTimer.current = setTimeout(onClose, CLOSE_AFTER_MS);
          }}
        />
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/** A text button that opens the Book a Demo form in a dialog, so the visitor stays on the page. */
export function BookDemoLink({ children, className }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  return (
    <>
      <button ref={trigger} type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <AnimatePresence>{open && <DemoDialog onClose={close} />}</AnimatePresence>
    </>
  );
}
