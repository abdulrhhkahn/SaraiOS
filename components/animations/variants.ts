import type { Transition, Variants } from "framer-motion";

/** Shared easing: a strong ease-out so entrances feel decisive, never floaty. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = { duration: 0.7, ease: easeOut };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeOut } },
};

export const slideIn = (direction: "left" | "right" = "left", distance = 40): Variants => ({
  hidden: { opacity: 0, x: direction === "left" ? -distance : distance },
  visible: { opacity: 1, x: 0, transition: baseTransition },
});

/** Clip-path reveal — used for editorial images. */
export const reveal: Variants = {
  hidden: { clipPath: "inset(12% 8% 12% 8% round 24px)", opacity: 0.4 },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 24px)",
    opacity: 1,
    transition: { duration: 1.1, ease: easeOut },
  },
};

export const staggerChildren = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const viewportOnce = { once: true, amount: 0.25 } as const;
