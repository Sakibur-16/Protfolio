"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page. Elements marked .reveal fade and rise into
 * place, and .draw-top rules draw across, the first time they scroll into
 * view. IntersectionObserver works in every current browser, unlike
 * CSS scroll-driven animations.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal, .draw-top");

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
