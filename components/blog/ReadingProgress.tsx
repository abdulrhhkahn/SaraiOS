"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-iris" style={{ scaleX }} />
  );
}
