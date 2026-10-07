"use client";

import { useEffect, useState } from "react";

const nav = [
  { label: "Work", id: "work" },
  { label: "Research", id: "research" },
  { label: "Experience", id: "experience" },
] as const;

/** Primary links; the one for the section currently in view gets an underline that slides in. */
export function HeaderNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // A section counts as current while it crosses the band just under the header.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((current) => (current === entry.target.id ? null : current));
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
      {nav.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="nav-link text-sm text-muted hover:text-ink"
          aria-current={active === item.id ? "true" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
