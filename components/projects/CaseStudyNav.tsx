"use client";

import { useEffect, useRef, useState } from "react";
import { GlitchText } from "@/components/ui/GlitchText";
import { cn } from "@/lib/utils";

type Section = { id: string; label: string };
type Phase = "initial" | "bar" | "rail";


/**
 * Jump-to-section navigation with two forms.
 *
 * Near the top of the page it is a horizontal bar under the hero. A little
 * way into the content it becomes a vertical rail down the left edge, and it
 * turns back into the bar when you scroll near the top again. Every time it
 * switches, the labels glitch: the letters scramble and resolve, with an
 * orange and blue fringe. The panels themselves never slide or jitter.
 *
 * The rail only exists on wide screens (xl and up). Below that the bar stays
 * exactly where it is and its labels still glitch at the same scroll points.
 *
 * The active section comes from an IntersectionObserver, and only sections
 * that actually rendered are passed in, so a tab never points at nothing.
 */
const TO_RAIL = 150;
const TO_BAR = 60;

/**
 * The switch itself is a short digital glitch: the menu you are leaving tears
 * into slices and flickers out with an orange and blue split, and the one that
 * replaces it flickers in the same way before settling. Steps, not easing, so
 * it reads as a signal fault and not as an animation.
 */
const GLITCH_MS = 460;
const SPLIT = "drop-shadow(3px 0 0 rgba(255,107,44,0.85)) drop-shadow(-3px 0 0 rgba(44,107,255,0.85))";
const SPLIT_SOFT = "drop-shadow(1.5px 0 0 rgba(255,107,44,0.6)) drop-shadow(-1.5px 0 0 rgba(44,107,255,0.6))";
const CLEAN = "drop-shadow(0 0 0 transparent) drop-shadow(0 0 0 transparent)";

type Frame = { offset: number; opacity: number; x: number; clip: string; filter: string };

function playGlitch(el: HTMLElement, frames: Frame[], duration: number) {
  el.animate(
    frames.map((f) => ({
      offset: f.offset,
      opacity: f.opacity,
      transform: `translateX(${f.x}px)`,
      clipPath: f.clip,
      filter: f.filter,
      easing: "steps(1, end)",
    })),
    { duration }
  );
}

function glitchBetween(bar: HTMLElement | null, rail: HTMLElement | null, toRail: boolean) {
  if (!bar || !rail || window.innerWidth < 1280) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const incoming = toRail ? rail : bar;
  const outgoing = toRail ? bar : rail;

  playGlitch(
    outgoing,
    [
      { offset: 0, opacity: 1, x: 0, clip: "inset(0 0 0 0)", filter: CLEAN },
      { offset: 0.1, opacity: 1, x: 8, clip: "inset(0 0 55% 0)", filter: SPLIT },
      { offset: 0.25, opacity: 0.6, x: -10, clip: "inset(35% 0 0 0)", filter: SPLIT },
      { offset: 0.4, opacity: 1, x: 5, clip: "inset(10% 0 45% 0)", filter: SPLIT },
      { offset: 0.55, opacity: 0.3, x: -6, clip: "inset(0 0 70% 0)", filter: SPLIT },
      { offset: 0.7, opacity: 0.7, x: 3, clip: "inset(50% 0 0 0)", filter: SPLIT_SOFT },
      { offset: 0.85, opacity: 0, x: 0, clip: "inset(0 0 0 0)", filter: CLEAN },
    ],
    GLITCH_MS * 0.8
  );
  playGlitch(
    incoming,
    [
      { offset: 0, opacity: 0, x: 0, clip: "inset(0 0 0 0)", filter: CLEAN },
      { offset: 0.2, opacity: 1, x: -12, clip: "inset(0 0 65% 0)", filter: SPLIT },
      { offset: 0.32, opacity: 0.2, x: 9, clip: "inset(40% 0 0 0)", filter: SPLIT },
      { offset: 0.44, opacity: 1, x: -5, clip: "inset(20% 0 35% 0)", filter: SPLIT },
      { offset: 0.58, opacity: 0.5, x: 6, clip: "inset(0 0 25% 0)", filter: SPLIT },
      { offset: 0.74, opacity: 1, x: -2, clip: "inset(0 0 0 0)", filter: SPLIT_SOFT },
      { offset: 1, opacity: 1, x: 0, clip: "inset(0 0 0 0)", filter: CLEAN },
    ],
    GLITCH_MS
  );
}

export function CaseStudyNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [phase, setPhase] = useState<Phase>("initial");
  const [glitchKey, setGlitchKey] = useState(0);
  const sentinel = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("initial");
  const barRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );

    for (const section of sections) {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, [sections]);

  // Bar <-> rail, with a gap between the two thresholds so it never flickers
  // back and forth around a single scroll position.
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const depth = -node.getBoundingClientRect().top;
      const current = phaseRef.current;
      let next = current;
      if (depth > TO_RAIL) next = "rail";
      else if (depth < TO_BAR) next = current === "initial" ? "initial" : "bar";
      if (next === current) return;

      phaseRef.current = next;
      setPhase(next);
      // Every switch between bar and rail replays the label glitch.
      if (next !== "initial") {
        setGlitchKey((key) => key + 1);
        glitchBetween(barRef.current, railRef.current, next === "rail");
      }

    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (sections.length < 2) return null;

  const railActive = phase === "rail";

  return (
    <>
      <div ref={sentinel} aria-hidden="true" />

      {/* Horizontal bar. From xl up it hides while the rail is showing. */}
      <div className="sticky top-20 z-30 mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <nav
          ref={barRef}
          aria-label="Case study sections"
          data-hidden={railActive}
          className="liquid-glass is-scrolled -mx-1 flex gap-1 overflow-x-auto rounded-full p-1.5 transition-opacity duration-300 xl:data-[hidden=true]:pointer-events-none xl:data-[hidden=true]:opacity-0"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-cursor="interactive"
              aria-current={active === section.id ? "true" : undefined}
              className={cn(
                "relative z-10 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-colors duration-300",
                active === section.id ? "bg-ink text-bg" : "text-muted hover:text-ink"
              )}
            >
              <span className="relative inline-block">
                <GlitchText text={section.label} trigger={glitchKey} lock />
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Vertical rail (xl and up). The wrapper does the fixed positioning,
          because the glass style on the nav itself overrides `position`. */}
      <div className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
        <nav
          ref={railRef}
          aria-label="Case study sections (side)"
          data-hidden={!railActive}
          className="liquid-glass is-scrolled flex w-[6.75rem] flex-col gap-1 rounded-2xl p-1.5 transition-opacity duration-300 data-[hidden=true]:pointer-events-none data-[hidden=true]:opacity-0"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-cursor="interactive"
              aria-current={active === section.id ? "true" : undefined}
              tabIndex={railActive ? 0 : -1}
              className={cn(
                "relative z-10 rounded-xl px-2.5 py-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] transition-colors duration-300",
                active === section.id ? "bg-ink text-bg" : "text-muted hover:text-ink"
              )}
            >
              <span className="relative inline-block">
                <GlitchText text={section.label} trigger={glitchKey} lock />
              </span>
            </a>
          ))}
        </nav>
      </div>

    </>
  );
}
