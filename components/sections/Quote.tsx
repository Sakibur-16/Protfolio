"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// His own words, taken from his LinkedIn summary — this replaces the
// placeholder copy that was written for the redesign.
const QUOTE =
  "Reliable, explainable, production-grade AI: grounding model outputs, testing edge cases, and understanding the retrieval and reasoning layers beneath the interface.";

/**
 * Splits the quote into words and, as the section scrolls through the
 * viewport, fills each word from light gray to solid black in sequence —
 * scroll-progress driven via framer-motion's useScroll/useTransform, the
 * same motion library already used by <Reveal> (components/motion/Reveal.tsx)
 * and lib/motion.ts, rather than introducing a parallel GSAP ScrollTrigger
 * system for a single effect.
 */
function ScrollFillWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  // Animates opacity rather than a literal colour: the span keeps
  // `color: var(--ink)` so it resolves correctly in both themes. Interpolating
  // between two hardcoded rgb() values would have pinned this to the light palette.
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block text-ink">
      {word}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

export function Quote() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = QUOTE.split(" ");

  // Reduced motion: render the finished state as plain text rather than
  // leaving the copy stuck at 18% opacity waiting for a scroll animation.
  if (prefersReducedMotion) {
    return (
      <section id="quote" ref={containerRef} className="bg-bg px-6 py-32 sm:px-10 sm:py-40 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-3xl font-medium leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {QUOTE}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="quote"
      ref={containerRef}
      className="bg-bg px-6 py-32 sm:px-10 sm:py-40 lg:px-16"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-display text-3xl font-medium leading-snug tracking-tight sm:text-4xl lg:text-5xl">
          {words.map((word, i) => (
            <ScrollFillWord key={`${word}-${i}`} word={word} index={i} total={words.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  );
}
