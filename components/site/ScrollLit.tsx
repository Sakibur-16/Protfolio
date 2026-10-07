"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * A large paragraph whose words brighten one after another as it scrolls
 * through the viewport. One scroll listener writes a single CSS variable;
 * the opacity of every word is computed in CSS, so React never re-renders.
 */
export function ScrollLit({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph's top reaches 85% down the screen, 1 when its bottom is near 40%.
      const progress = (vh * 0.85 - rect.top) / (rect.height + vh * 0.45);
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, progress))));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={ref} className={`scroll-lit ${className}`} style={{ "--n": words.length } as CSSProperties}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="lit-word" style={{ "--i": index } as CSSProperties}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
