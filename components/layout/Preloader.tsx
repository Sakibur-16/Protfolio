"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hasSeenPreloader, markPreloaderSeen } from "@/lib/utils";

const STEPS = ["Loading models", "Connecting context", "Initializing intelligence", "Ready"];
const STEP_DURATION_MS = 340;

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasSeenPreloader() || reducedMotion) {
      markPreloaderSeen();
      return;
    }

    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    // One-time mount trigger (not a subscription loop) — session flag is
    // checked above, so this effect runs its setState at most once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    markPreloaderSeen();

    STEPS.forEach((_, i) => {
      timeoutIds.push(setTimeout(() => setStepIndex(i), i * STEP_DURATION_MS));
    });
    timeoutIds.push(
      setTimeout(() => setVisible(false), STEPS.length * STEP_DURATION_MS + 250)
    );

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-bg"
          role="status"
          aria-live="polite"
        >
          <span className="font-display text-2xl text-ink">
            sakibur<span className="text-gradient">.</span>
          </span>
          <p className="font-mono text-xs tracking-[0.2em] text-warm">
            {STEPS[stepIndex]}
            {STEPS[stepIndex] !== "Ready" && "…"}
          </p>
          <div className="h-px w-40 overflow-hidden bg-line">
            <motion.div
              className="h-full bg-warm"
              initial={{ width: "0%" }}
              animate={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
