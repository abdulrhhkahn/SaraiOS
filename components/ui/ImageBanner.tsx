"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { easeOut } from "@/components/animations/variants";
import { cn } from "@/lib/cn";

/**
 * Page banner: a rounded photo card (1392 x 469 on desktop) with the page title centred on it. The site's
 * fixed header floats over the top of the card. The photo fills the whole card; use `imageClassName` with an
 * object-position class to choose which part of it shows. A light white haze at the top blends the header
 * into the image. Only the image scale and the title position animate, never the image opacity.
 */
export function ImageBanner({
  src,
  title,
  alt = "",
  imageClassName,
}: {
  src: string;
  title: string;
  alt?: string;
  /** Object-position class (e.g. `object-[50%_36%]`) to choose which part of the photo shows. */
  imageClassName?: string;
}) {
  return (
    <section className="px-3 sm:px-5 lg:px-6">
      <div className="relative isolate mx-auto flex h-[26rem] max-w-[1392px] items-center justify-center overflow-hidden rounded-3xl bg-night pt-16 sm:h-[28rem] lg:h-[469px]">
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: easeOut }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            quality={80}
            sizes="100vw"
            className={cn("object-cover", imageClassName)}
          />
        </motion.div>

        <div aria-hidden className="absolute inset-0 -z-10 bg-black/25" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.42),rgba(255,255,255,0.12)_22%,transparent_40%)]"
        />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
          className="heading-sub text-[40px] leading-[1.05] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.4)] sm:text-[64px]"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
