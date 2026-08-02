import type { Variants } from "framer-motion";

/** Standard scroll-reveal used by <Reveal>. One consistent motion language, not a novelty per section. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/**
 * Blur-to-sharp reveal, layered on top of the standard fade + slide-up.
 * Used for large section headings per the design spec (Services, Quote,
 * Contact) — <Reveal blur> switches to this variant.
 */
export const revealBlurVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;
