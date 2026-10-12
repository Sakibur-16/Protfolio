"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition.
 *
 * `template.tsx` (rather than `layout.tsx`) remounts on every navigation,
 * which is what lets the enter animation replay when moving between project
 * pages. Enter-only by design — an exit animation would hold the old page on
 * screen and make navigation feel slower than it is.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      // Even `blur(0px)` makes this wrapper the containing block for every
      // `position: fixed` descendant, so fixed elements (like the case-study
      // side rail) would scroll with the page. Clear it once the enter
      // animation is done.
      onAnimationComplete={() => {
        if (ref.current) {
          ref.current.style.filter = "none";
          ref.current.style.transform = "none";
        }
      }}
    >
      {children}
    </motion.div>
  );
}
