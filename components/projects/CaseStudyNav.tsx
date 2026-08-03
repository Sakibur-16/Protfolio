"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky jump-to-section tab bar.
 *
 * Tracks the active section with an IntersectionObserver rather than scroll
 * math, and only receives sections that actually rendered — a project with no
 * challenge data never gets a "Challenges" tab pointing at nothing.
 */
export function CaseStudyNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

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

  if (sections.length < 2) return null;

  return (
    <div className="sticky top-20 z-30 mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
      <nav
        aria-label="Case study sections"
        className="liquid-glass is-scrolled -mx-1 flex gap-1 overflow-x-auto rounded-full p-1.5"
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            data-cursor="interactive"
            aria-current={active === section.id ? "true" : undefined}
            className={cn(
              "relative z-10 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-colors duration-300",
              active === section.id
                ? "bg-ink text-bg"
                : "text-muted hover:text-ink"
            )}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
