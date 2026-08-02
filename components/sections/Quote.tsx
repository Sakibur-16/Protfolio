"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// NOTE: This sentence is new copy written for the redesign — it did not
// exist in data/profile.ts. It was derived from profile.ts (roleTitle,
// bio) and data/skills.ts (skillDomains) rather than invented from nothing,
// but as new copy it should be reviewed by the site owner before shipping.
const QUOTE =
  "I work in the space between a research idea and a product someone can actually use — building the models, retrieval, and reasoning underneath, so the AI holds up once it ships.";

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
  const color = useTransform(progress, [start, end], ["rgb(196, 193, 184)", "rgb(10, 10, 10)"]);

  return (
    <motion.span style={{ color }} className="inline-block">
      {word}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

export function Quote() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = QUOTE.split(" ");

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
