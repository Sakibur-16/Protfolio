"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { Project } from "@/types/portfolio";
import { projectCategoryLabels } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Editorial project index.
 *
 * Oversized titles on hairline rows. On desktop, hovering a row dims the rest
 * and a cover preview follows the cursor; on touch screens every row carries a
 * small thumbnail instead, since there is no hover to reveal one.
 */

function Cover({ project, className }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden", className)}>
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 320px, 96px"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={cn("relative flex aspect-[16/10] items-end overflow-hidden p-3", className)}
      style={{
        background: `linear-gradient(155deg, ${project.accentColor}33 0%, transparent 60%), var(--bg-raised)`,
      }}
    >
      <span className="font-display text-sm font-semibold" style={{ color: project.accentColor }}>
        {project.title}
      </span>
    </div>
  );
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<Project["category"] | "all">("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects]
  );
  const visible = category === "all" ? projects : projects.filter((p) => p.category === category);
  const hoveredProject = projects.find((p) => p.slug === hovered) ?? null;

  const onMove = (event: React.MouseEvent) => {
    x.set(event.clientX + 28);
    y.set(event.clientY - 90);
  };

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {(["all", ...categories] as const).map((value) => {
          const active = category === value;
          const count =
            value === "all" ? projects.length : projects.filter((p) => p.category === value).length;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              data-cursor="interactive"
              onClick={() => setCategory(value)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                active ? "border-ink bg-ink text-bg" : "border-line-strong text-muted hover:text-ink"
              )}
            >
              {value === "all" ? "All" : projectCategoryLabels[value]}
              <span className={cn("ml-2 text-xs tabular-nums", active ? "opacity-70" : "text-muted")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div
        onMouseMove={onMove}
        onMouseLeave={() => setHovered(null)}
        className="mt-10 border-t border-line sm:mt-12"
      >
        {visible.map((project, i) => {
          const isHovered = hovered === project.slug;
          const dimmed = hovered !== null && !isHovered;
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setHovered(project.slug)}
              onFocus={() => setHovered(project.slug)}
              onBlur={() => setHovered(null)}
              data-cursor="interactive"
              className={cn(
                "group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-line py-6 transition-opacity duration-300 sm:gap-x-8 sm:py-9",
                dimmed ? "opacity-35" : "opacity-100"
              )}
            >
              <span className="w-8 font-mono text-xs tabular-nums text-muted sm:w-12 sm:text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h2
                  className={cn(
                    "font-display text-3xl font-semibold leading-[1.05] tracking-tight transition-transform duration-500 ease-[var(--ease-editorial)] sm:text-5xl lg:text-6xl",
                    isHovered ? "text-gradient lg:translate-x-3" : "text-ink"
                  )}
                >
                  {project.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base lg:pr-8">
                  {project.shortDescription}
                </p>
                {project.technologies.length > 0 && (
                  <p className="mt-3 hidden font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted sm:block">
                    {project.technologies.slice(0, 5).join("  /  ")}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="hidden text-right sm:block">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-dim">
                    {projectCategoryLabels[project.category]}
                  </p>
                  <p className="mt-1 font-mono text-xs tabular-nums text-muted">{project.year}</p>
                </div>

                {/* Touch screens have no hover, so show the cover inline. */}
                <Cover
                  project={project}
                  className="w-20 rounded-md border border-line sm:w-24 lg:hidden"
                />

                <ArrowUpRight
                  className="hidden h-6 w-6 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink lg:block"
                  aria-hidden="true"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Floating preview that follows the cursor (desktop only). */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 hidden w-80 lg:block"
          style={{ x: sx, y: sy }}
          animate={{ opacity: hoveredProject ? 1 : 0, scale: hoveredProject ? 1 : 0.94 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {hoveredProject && (
            <div className="overflow-hidden rounded-2xl border border-line-strong bg-bg-raised shadow-2xl">
              <Cover project={hoveredProject} />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
