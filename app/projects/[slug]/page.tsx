import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FolderGit2, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { allProjects, projectCategoryLabels } from "@/data/projects";
import { projectMetadata } from "@/lib/metadata";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { ProjectVisual } from "@/components/projects/ProjectVisual";

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return projectMetadata(project);
}

const STATUS_LABEL: Record<string, string> = {
  shipped: "Shipped",
  "in-development": "In development",
  "client-confidential": "Client project",
  research: "Published research",
  undisclosed: "Details on request",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const hasDetail = Boolean(project.challenge || project.approach || project.outcome);
  const hasLinks = Boolean(
    project.links.external || project.links.repository || project.links.store
  );

  return (
    <article className="px-6 pb-24 pt-32 sm:px-10 sm:pt-40 lg:pl-28">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#work"
          data-cursor="interactive"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-cyan"
        >
          <ArrowLeft size={14} /> Back to selected work
        </Link>

        <Eyebrow className="mt-8">
          {projectCategoryLabels[project.category]} · {project.year} ·{" "}
          {STATUS_LABEL[project.status]}
        </Eyebrow>

        <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-3 font-mono text-sm text-violet">{project.role}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {project.fullDescription}
        </p>

        <div className="mt-10">
          <ProjectVisual project={project} />
        </div>

        {hasDetail && (
          <dl className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
            {project.challenge && (
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-cyan">
                  Challenge
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{project.challenge}</dd>
              </div>
            )}
            {project.approach && (
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-cyan">
                  Approach
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{project.approach}</dd>
              </div>
            )}
            {project.outcome && (
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-cyan">
                  Outcome
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{project.outcome}</dd>
              </div>
            )}
          </dl>
        )}

        {project.technologies.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-8">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        )}

        {hasLinks && (
          <div className="mt-8 flex flex-wrap gap-6">
            {project.links.external && (
              <a
                href={project.links.external}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-ink hover:text-cyan"
              >
                Visit <ArrowUpRight size={13} />
              </a>
            )}
            {project.links.repository && (
              <a
                href={project.links.repository}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-ink hover:text-cyan"
              >
                <FolderGit2 size={14} /> Repository
              </a>
            )}
            {project.links.store && (
              <a
                href={project.links.store}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-ink hover:text-cyan"
              >
                <ExternalLink size={13} /> Store listing
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
