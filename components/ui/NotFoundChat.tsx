"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeOut } from "@/components/animations/variants";

const bubble = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: easeOut },
});

export function NotFoundChat() {
  return (
    <div className="mx-auto w-full max-w-md rounded-[1.5rem] bg-[#fbfaf8] p-5 text-left shadow-[var(--shadow-frame)] ring-1 ring-black/[0.07]">
      <div className="space-y-3">
        <motion.p {...bubble(0.3)} className="ml-auto w-fit rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-linen">
          Where did this page go?
        </motion.p>
        <motion.p
          {...bubble(0.9)}
          className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 ring-1 ring-line"
        >
          <span className="block text-[0.65rem] font-bold tracking-[0.12em] text-iris-ink uppercase">Sarai</span>I
          couldn&apos;t find that page. Let me point you somewhere useful.
        </motion.p>
        <motion.div {...bubble(1.4)} className="flex flex-wrap gap-2 pt-1">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-iris-soft px-4 text-sm font-semibold text-iris-ink"
          >
            Go Home <ArrowRight className="size-3.5" aria-hidden />
          </Link>
          <Link
            href="/features"
            className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-sm font-semibold ring-1 ring-line"
          >
            Features
          </Link>
          <Link
            href="/faq"
            className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-sm font-semibold ring-1 ring-line"
          >
            FAQ
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
