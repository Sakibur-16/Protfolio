"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Magnetic CTA.
 *
 * The button leans toward the cursor as it approaches and springs back on
 * exit, and a specular highlight tracks the pointer across its surface. Both
 * are written straight to style from the pointer handler — no React state per
 * move, so this costs nothing per frame.
 *
 * Disabled entirely under reduced-motion, where it degrades to a plain link.
 */
export function MagneticLink({
  href,
  children,
  className,
  strength = 0.32,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  function handleMove(event: React.PointerEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;
    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  function handleLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "";
  }

  return (
    <a
      ref={ref}
      href={href}
      data-cursor="interactive"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("magnetic", className)}
    >
      {children}
    </a>
  );
}
