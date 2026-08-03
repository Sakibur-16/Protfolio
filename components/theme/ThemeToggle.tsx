"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * Sun/moon switch for the pill navbar.
 *
 * The knob slides between two rest positions and the two glyphs counter-rotate
 * and crossfade, so the change reads as one continuous movement rather than an
 * icon swap. The page-level circular reveal is handled by the provider — this
 * component only supplies the origin point.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, ready, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isDark = theme === "dark";

  function handleClick() {
    const rect = buttonRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : undefined;
    toggleTheme(origin);
  }

  const spring = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 420, damping: 32, mass: 0.7 } as const);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      data-cursor="interactive"
      role="switch"
      aria-checked={ready ? isDark : undefined}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative inline-flex h-6 w-[2.6rem] shrink-0 items-center rounded-full border border-line-strong/60",
        "bg-ink/[0.06] px-0.5 transition-colors duration-300 hover:bg-ink/[0.1]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className
      )}
    >
      {/* Sliding knob */}
      <motion.span
        aria-hidden="true"
        className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-bg shadow-sm ring-1 ring-line"
        animate={{ x: isDark ? 17 : 0 }}
        transition={spring}
      >
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? -90 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <SunGlyph />
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <MoonGlyph />
        </motion.span>
      </motion.span>
    </button>
  );
}

function SunGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="1.8"
          x2="12"
          y2="4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}

function MoonGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink" fill="none" aria-hidden="true">
      <path
        d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
