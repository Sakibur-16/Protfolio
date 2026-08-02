"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
