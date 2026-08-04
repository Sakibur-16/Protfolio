"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { cn } from "@/lib/utils";

/**
 * Career rail.
 *
 * A single vertical conductor runs the length of the section and *charges* as
 * you scroll: a gradient fill travels down it, and each role node lights up as
 * the charge reaches it. It reads like a signal propagating through a system,
 * which is a more honest metaphor for this person's work than a decorative arc
 * — and it means the section animates on scroll rather than needing to be
 * clicked through.
 *
 * The rail fill is one spring-smoothed scroll value driving a scaleY; node
 * activation is per-item `whileInView`. Nothing polls, nothing measures on
 * every frame.
 */

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** "October 2025" -> {y, m}; "Present" -> now. Returns null if unparseable. */
function parseMonthYear(value: string): { y: number; m: number } | null {
  if (value.toLowerCase() === "present") {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() };
  }
  const [monthName, yearText] = value.trim().split(/\s+/);
  const m = MONTHS.indexOf(monthName?.toLowerCase() ?? "");
  const y = Number.parseInt(yearText ?? "", 10);
  if (m === -1 || !Number.isFinite(y)) return null;
  return { y, m };
}

/** Inclusive month span, rendered as "1 yr 3 mos". */
function formatDuration(start: string, end: string): string | null {
  const a = parseMonthYear(start);
  const b = parseMonthYear(end);
  if (!a || !b) return null;
  const months = (b.y - a.y) * 12 + (b.m - a.m) + 1;
  if (months <= 0) return null;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest > 0) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
}

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.85"],
  });

  // Spring-smoothed so the fill glides instead of tracking every scroll tick.
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-bg-alt px-5 py-20 sm:px-10 sm:py-32 lg:px-16"
    >
      <GlowBlob tone="dual" size="42rem" className="left-1/2 top-10 -translate-x-1/2" />

      <div className="relative mx-auto w-full max-w-4xl">
        <Reveal>
          <Badge>Career path</Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Where I&rsquo;ve <span className="text-gradient">shipped</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Three promotions in under a year at Sparktech Agency, each one widening the scope
            from learning production RAG to owning it.
          </p>
        </Reveal>

        <div ref={railRef} className="relative mt-16 sm:mt-20">
          {/* The conductor: a static track with a gradient charge on top. */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[0.6875rem] top-0 w-px bg-line-strong sm:left-[0.9375rem]"
          />
          <motion.div
            aria-hidden="true"
            className="accent-bar absolute left-[0.6875rem] top-0 w-px origin-top sm:left-[0.9375rem]"
            style={{
              height: "100%",
              scaleY: prefersReducedMotion ? 1 : fill,
            }}
          />

          <ol className="flex flex-col gap-12 sm:gap-16">
            {experience.map((role, i) => {
              const isCurrent = role.endDate === "Present";
              const duration = formatDuration(role.startDate, role.endDate);

              return (
                <motion.li
                  key={role.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-10 sm:pl-14"
                >
                  {/* Node. The current role carries a live pulse. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border sm:h-8 sm:w-8",
                      isCurrent
                        ? "border-transparent bg-bg"
                        : "border-line-strong bg-bg"
                    )}
                  >
                    {isCurrent ? (
                      <>
                        <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-warm opacity-60" />
                        <span className="accent-bar relative inline-flex h-3 w-3 rounded-full" />
                      </>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-line-strong" />
                    )}
                  </span>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <p className="font-mono text-xs tabular-nums text-ink-dim">
                      {role.startDate} — {role.endDate}
                    </p>
                    {duration && (
                      <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.6rem] text-muted">
                        {duration}
                      </span>
                    )}
                    {isCurrent && (
                      <span className="rounded-full border border-transparent px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-warm">
                        Now
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {role.role}
                  </h3>

                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    <span className="font-medium text-warm">{role.organization}</span>
                    <span aria-hidden="true" className="text-line-strong">·</span>
                    <span className="text-muted">{role.location}</span>
                  </p>

                  <ul className="mt-5 flex flex-col gap-2">
                    {role.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-px w-3 shrink-0 bg-line-strong"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Step counter, so the progression reads as a ladder. */}
                  <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                    Step {String(experience.length - i).padStart(2, "0")} /{" "}
                    {String(experience.length).padStart(2, "0")}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
