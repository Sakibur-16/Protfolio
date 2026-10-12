"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const SCRAMBLE_CHARS = "01/\\<>_#%&*+=?";
const SCRAMBLE_MS = 520;

/**
 * Text whose letters scramble and settle whenever `trigger` changes. A trigger
 * of 0 means "not yet", so nothing plays on first render. The `.is-glitching`
 * class adds the orange and blue fringe from globals.css. Screen readers get
 * the real text, never the scrambled letters.
 */
export function GlitchText({
  text,
  trigger,
  className,
}: {
  text: string;
  trigger: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (trigger === 0 || reduced) return;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / SCRAMBLE_MS, 1);
      setGlitching(progress < 1);
      // Letters settle left to right as progress grows.
      const settled = Math.floor(progress * text.length * 1.15);
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            char === " " || i < settled
              ? char
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          )
          .join("")
      );
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      setDisplay(text);
      setGlitching(false);
    };
  }, [trigger, text, reduced]);

  return (
    <>
      <span
        aria-hidden="true"
        className={cn("select-none", glitching && "is-glitching", className)}
      >
        {display}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
