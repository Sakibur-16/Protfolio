import Image from "next/image";
import type { Project } from "@/types/portfolio";
import { projectCategoryLabels } from "@/data/projects";
import { BrowserFrame } from "./BrowserFrame";

export function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <BrowserFrame title={project.title}>
        <div className="relative w-full" style={{ aspectRatio: project.imageRatio ?? 1.6 }}>
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            quality={95}
            className="object-cover object-top"
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
        </div>
      </BrowserFrame>
    );
  }

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line"
      style={{
        background: `linear-gradient(155deg, ${project.accentColor}22 0%, transparent 55%), var(--surface)`,
      }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 300">
        <defs>
          <pattern id={`grid-${project.slug}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke={project.accentColor} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#grid-${project.slug})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-muted">
          {project.year}
        </span>
        <div>
          <p
            className="font-display text-2xl leading-tight sm:text-3xl"
            style={{ color: project.accentColor }}
          >
            {projectCategoryLabels[project.category]}
          </p>
          <p className="mt-1 font-mono text-xs text-muted">{project.title}</p>
        </div>
      </div>
    </div>
  );
}
