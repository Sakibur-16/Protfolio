"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/types/portfolio";
import { projectCategoryLabels } from "@/data/projects";

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #ff6b2c22 0%, #2c6bff22 100%)",
  "linear-gradient(135deg, #2c6bff22 0%, #ff6b2c22 100%)",
  "linear-gradient(160deg, #ff6b2c1f 0%, #ffffff08 60%, #2c6bff22 100%)",
  "linear-gradient(200deg, #2c6bff1f 0%, #ffffff08 55%, #ff6b2c22 100%)",
];

/**
 * Project card with pointer-tracked 3D tilt.
 *
 * The tilt is written straight to the element's transform from the pointer
 * handler — no React state per move — so dragging across a grid of cards does
 * not trigger a render storm. Only the hover flag is stateful.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = cardRef.current;
    if (!node || prefersReducedMotion) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(1000px) rotateX(${-py * 7}deg) rotateY(${px * 9}deg) translateY(-6px)`;
  }

  function reset() {
    setHovered(false);
    const node = cardRef.current;
    if (node) node.style.transform = "";
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={reset}
      className="gradient-border group relative rounded-3xl border border-line bg-bg-raised transition-[transform,box-shadow] duration-500 ease-[var(--ease-editorial)] hover:shadow-2xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="interactive"
        className="block h-full rounded-3xl p-2 focus-visible:outline-none"
      >
        {/*
          Thumbnail placeholder — swap for
          <Image src={`/images/projects/${project.slug}.jpg`} fill /> once real
          screenshots exist.
        */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] border border-line"
          style={{ background: PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length] }}
        >
          <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[0.62rem] text-ink-dim backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-4 top-4 rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[0.62rem] text-ink-dim backdrop-blur-sm">
            {project.year}
          </span>

          {/* Hover reveal */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-end p-4 transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-bg">
              View case study
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 p-5">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
            {projectCategoryLabels[project.category]}
          </p>
          <h3 className="font-display text-xl font-medium leading-tight tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {project.shortDescription}
          </p>
          <p className="mt-2 border-t border-line pt-3.5 text-sm text-ink-dim">{project.role}</p>
        </div>
      </Link>
    </div>
  );
}
