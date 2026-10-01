"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { easeOut } from "@/components/animations/variants";
import { cn } from "@/lib/cn";

/**
 * Page banner: a rounded photo card with the page title centred on it. The site's fixed header floats over
 * the top of the card. Only the image scale and the title position animate, never the image opacity,
 * so the photo can still be the largest contentful paint.
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
  /** Use an object-position class (e.g. `object-[50%_32%]`) to choose which part of the photo shows. */
  imageClassName?: string;
}) {
  return (
    <section className="px-3 sm:px-5 lg:px-8">
      <div className="relative isolate flex h-[26rem] items-center justify-center overflow-hidden rounded-3xl bg-night pt-16 sm:h-[30rem] lg:h-[32rem]">
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
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/30" />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
          className="heading-sub text-[clamp(3.25rem,9vw,6.5rem)] leading-none text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.4)]"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
