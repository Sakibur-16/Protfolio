"use client";

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

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
