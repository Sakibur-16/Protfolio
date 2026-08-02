"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { revealVariants, revealBlurVariants } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  blur = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
  /**
   * Adds a blur-to-sharp transition on top of the standard fade + slide-up —
   * used for large section headings per the design spec (Services, Quote,
   * Contact).
   */
  blur?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      custom={delay}
      variants={blur ? revealBlurVariants : revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
