"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-snap carousel with arrow buttons and a progress line. The native
 * scroller does the work, so touch, trackpad and keyboard all behave as expected.
 */
export function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      const ratio = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
      if (thumb.current) {
        thumb.current.style.width = `${Math.min(1, ratio) * 100}%`;
        thumb.current.style.transform = `translateX(${el.clientWidth > 0 ? (el.scrollLeft / el.clientWidth) * 100 : 0}%)`;
      }
      setEdge({ start: el.scrollLeft <= 2, end: max <= 2 || el.scrollLeft >= max - 2 });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function step(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const amount = (card?.getBoundingClientRect().width ?? el.clientWidth * 0.8) + 16;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: amount * direction, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        tabIndex={0}
        className="carousel-track -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8"
      >
        {children}
      </ul>
      <div className="mt-8 flex items-center gap-5">
        <button
          type="button"
          className="carousel-btn"
          onClick={() => step(-1)}
          disabled={edge.start}
          aria-label="Previous project"
        >
          ←
        </button>
        <div className="relative h-px flex-1 bg-rule" aria-hidden="true">
          <div
            ref={thumb}
            className="absolute -top-px left-0 h-[3px] rounded-full bg-accent"
            style={{ width: "30%" }}
          />
        </div>
        <button
          type="button"
          className="carousel-btn"
          onClick={() => step(1)}
          disabled={edge.end}
          aria-label="Next project"
        >
          →
        </button>
      </div>
    </div>
  );
}
