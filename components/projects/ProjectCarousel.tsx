"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/portfolio";
import { projectCategoryLabels } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Circular, auto-advancing project deck.
 *
 * The loop has no seam and no cloned nodes. Each card's position is derived
 * from its *modular signed distance* to the active index — the shortest way
 * round the ring — so card 0 sits one step to the right of the last card as
 * naturally as card 5 sits beside card 4. Advancing past the end wraps to the
 * start with no jump, because nothing is ever repositioned; only the offset
 * each card resolves to changes.
 *
 * Built in the DOM rather than WebGL on purpose: the titles, descriptions and
 * case-study links have to stay selectable, crawlable and screen-reader
 * navigable. The depth is CSS 3D.
 */

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #ff6b2c33 0%, #2c6bff33 100%)",
  "linear-gradient(135deg, #2c6bff33 0%, #ff6b2c2b 100%)",
  "linear-gradient(160deg, #ff6b2c2b 0%, #ffffff0d 55%, #2c6bff33 100%)",
  "linear-gradient(200deg, #2c6bff2b 0%, #ffffff0d 50%, #ff6b2c33 100%)",
  "linear-gradient(120deg, #ff6b2c26 0%, #2c6bff26 100%)",
];

const DRAG_THRESHOLD = 55;
const AUTOPLAY_MS = 2000;
/** Cards further round the ring than this are not rendered at all. */
const VISIBLE_RANGE = 3;

/** Shortest signed distance from `active` to `i` around a ring of `total`. */
function ringOffset(i: number, active: number, total: number): number {
  const raw = ((i - active) % total + total) % total;
  return raw > total / 2 ? raw - total : raw;
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const total = projects.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setActive(((index % total) + total) % total);
  }, [total]);

  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  // Only run while the deck is actually on screen — an off-screen carousel
  // ticking a timer is pure waste.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pause when the tab is hidden so the deck does not silently race ahead.
  useEffect(() => {
    const onVisibility = () => setPaused(document.visibilityState !== "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const autoplayActive =
    inView && !paused && !userPaused && !prefersReducedMotion && total > 1;

  useEffect(() => {
    if (!autoplayActive) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplayActive, total]);

  // Drag resolves on the window so a gesture that leaves the element still ends.
  useEffect(() => {
    const onUp = (event: PointerEvent) => {
      if (dragStartX.current === null) return;
      const delta = event.clientX - dragStartX.current;
      dragStartX.current = null;
      setPaused(false);
      if (Math.abs(delta) > DRAG_THRESHOLD) {
        if (delta < 0) next();
        else prev();
      }
    };
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [next, prev]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  return (
    <div ref={rootRef} className="w-full">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          dragStartX.current = e.clientX;
          setPaused(true);
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative h-[25rem] cursor-grab touch-pan-y select-none active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:h-[30rem]"
        style={{ perspective: "1700px", perspectiveOrigin: "50% 45%" }}
      >
        {projects.map((project, i) => {
          const offset = ringOffset(i, active, total);
          const distance = Math.abs(offset);

          // Cards outside the window stay MOUNTED but invisible. Unmounting
          // them would drop two-thirds of the project links out of the served
          // HTML, costing crawlability and in-page search for no real gain —
          // an opacity-0 node costs nothing to keep around.
          const offscreen = distance > VISIBLE_RANGE;
          const isActive = offset === 0;
          const opacity = offscreen
            ? 0
            : distance === 0
              ? 1
              : distance === 1
                ? 0.5
                : distance === 2
                  ? 0.18
                  : 0;

          return (
            <motion.article
              key={project.slug}
              className="absolute left-1/2 top-0 w-[16.5rem] sm:w-[22rem]"
              // z-index MUST live on this element: these are the siblings that
              // stack against each other. Putting it on an inner node did
              // nothing and let later cards paint over the focused one.
              style={{
                transformStyle: "preserve-3d",
                zIndex: 50 - distance,
                // Keeps the invisible ring out of hit-testing entirely.
                pointerEvents: isActive ? "auto" : "none",
              }}
              animate={{
                x: `calc(-50% + ${offset * 46}%)`,
                z: -distance * 175,
                rotateY: offset * -19,
                scale: 1 - Math.min(distance, 4) * 0.085,
                opacity,
                // Depth blur doubles as the fix for side-card text bleeding
                // through the focused card.
                filter: `blur(${Math.min(distance, 3) * 1.6}px)`,
              }}
              transition={
                prefersReducedMotion || offscreen
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 290, damping: 30, mass: 0.75 }
              }
              aria-hidden={!isActive}
              // Non-focused cards must not take focus or swallow clicks.
              inert={!isActive}
            >
              <div
                className={cn(
                  // `relative` + `group` anchor the full-card link overlay below.
                  "group relative overflow-hidden rounded-3xl bg-bg-raised ring-1 transition-shadow duration-500",
                  isActive ? "shadow-2xl ring-line-strong" : "shadow-lg ring-line"
                )}
              >
                {/*
                  Thumbnail placeholder — swap for
                  <Image src={`/images/projects/${project.slug}.jpg`} fill />
                  once real screenshots exist.
                */}
                <div
                  className="relative aspect-[16/10] w-full"
                  style={{ background: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length] }}
                >
                  <span className="absolute left-4 top-4 rounded-full bg-bg/75 border border-line px-2.5 py-1 font-mono text-[0.65rem] text-ink backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-bg/75 border border-line px-2.5 py-1 font-mono text-[0.65rem] text-ink backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 p-5 sm:p-6">
                  <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full accent-bar" aria-hidden="true" />
                    {projectCategoryLabels[project.category]}
                  </div>

                  {/*
                    The title is the link, and its ::after overlay stretches
                    across the whole card — so clicking anywhere navigates,
                    while the accessible name stays the project title rather
                    than a bare "arrow".
                  */}
                  <h3 className="font-display text-xl font-medium leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-warm sm:text-2xl">
                    <Link
                      href={`/projects/${project.slug}`}
                      data-cursor="interactive"
                      className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                    {project.shortDescription}
                  </p>

                  <div className="mt-1.5 flex items-center justify-between gap-4 border-t border-line pt-3.5">
                    <span className="truncate text-sm font-medium text-ink">{project.role}</span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-[transform,background-color,color] duration-300 ease-[var(--ease-editorial)] group-hover:-translate-y-0.5 group-hover:bg-ink group-hover:text-bg"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}

        {/* Click targets for the two flanking cards, outside the inert subtree. */}
        <button
          type="button"
          onClick={prev}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[22%] cursor-pointer"
        />
        <button
          type="button"
          onClick={next}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-[22%] cursor-pointer"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            data-cursor="interactive"
            aria-label="Previous project"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-[background-color,color] duration-300 hover:bg-ink hover:text-bg"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            data-cursor="interactive"
            aria-label="Next project"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-[background-color,color] duration-300 hover:bg-ink hover:text-bg"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Auto-advancing content needs an explicit stop (WCAG 2.2.2). */}
          {!prefersReducedMotion && total > 1 && (
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              data-cursor="interactive"
              aria-pressed={userPaused}
              aria-label={userPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-[background-color,color] duration-300 hover:bg-ink hover:text-bg"
            >
              {userPaused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        <p
          // Silent while it advances on its own; announced when the visitor drives it.
          aria-live={autoplayActive ? "off" : "polite"}
          className="font-mono text-xs text-muted"
        >
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          <span className="sr-only"> — {projects[active]?.title}</span>
        </p>

        <div className="flex flex-1 items-center justify-end gap-1.5">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => goTo(i)}
              data-cursor="interactive"
              aria-label={`Go to ${project.title}`}
              aria-current={i === active ? "true" : undefined}
              className={cn(
                "h-1 rounded-full transition-all duration-500 ease-[var(--ease-editorial)]",
                i === active ? "w-7 bg-ink" : "w-2.5 bg-line-strong hover:bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
