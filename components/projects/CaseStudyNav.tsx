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

export function CaseStudyNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [phase, setPhase] = useState<Phase>("initial");
  const [glitchKey, setGlitchKey] = useState(0);
  const sentinel = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("initial");

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
      if (next !== "initial") setGlitchKey((key) => key + 1);
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
              <GlitchText text={section.label} trigger={glitchKey} />
            </a>
          ))}
        </nav>
      </div>

      {/* Vertical rail (xl and up). The wrapper does the fixed positioning,
          because the glass style on the nav itself overrides `position`. */}
      <div className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
        <nav
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
              <GlitchText text={section.label} trigger={glitchKey} />
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
