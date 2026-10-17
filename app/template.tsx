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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      // A leftover transform or filter would make this wrapper the containing
      // block for every `position: fixed` descendant (like the case-study side
      // rail), so the page enter animates opacity and position only, and the
      // transform is cleared when it ends.
      onAnimationComplete={() => {
        if (ref.current) ref.current.style.transform = "none";
      }}
    >
      {children}
    </motion.div>
  );
}
