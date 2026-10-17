import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  FolderGit2,
} from "lucide-react";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { allProjects, projectCategoryLabels, projectNeighbours } from "@/data/projects";
import { iconKeyForTech } from "@/data/techStack";
import { projectMetadata } from "@/lib/metadata";
import { socialLinks } from "@/data/socialLinks";
import { TechIcon } from "@/components/ui/TechIcon";
import { Button } from "@/components/ui/Button";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyNav } from "@/components/projects/CaseStudyNav";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { BrowserFrame } from "@/components/projects/BrowserFrame";

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
  research: "Research",
  prototype: "Working prototype",
  undisclosed: "Details on request",
};

/** Accent is set per project, so each page picks up its own colour. */
const ACCENT = "var(--project-accent)";

function TechChip({ name }: { name: string }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-raised px-3.5 py-1.5 text-sm text-ink-dim">
      <TechIcon iconKey={iconKeyForTech(name)} colored className="h-3.5 w-3.5" />
      {name}
    </li>
  );
}

/** Section shell: a small coloured label over a plain heading. No numbering. */
function Block({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-40 py-14 sm:py-20">
      <Reveal>
        <p
          className="font-mono text-[0.68rem] uppercase tracking-[0.18em]"
          style={{ color: ACCENT }}
        >
          {label}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        <div className="mt-9">{children}</div>
      </Reveal>
    </section>
  );
}

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

  const neighbours = projectNeighbours(project.slug);
  const linkButtons = [
    { label: "Visit website", href: project.links.external },
    { label: "Google Play", href: project.links.store },
    { label: "App Store", href: project.links.appStore ?? null },
    { label: "Source code", href: project.links.repository },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  // Only sections with real content are built, and the sticky nav comes from
  // the same list, so it never points at a heading that is not there.
  const sections: { id: string; label: string }[] = [
    { id: "brief", label: "Brief" },
    ...(project.architecture?.length ? [{ id: "system", label: "System" }] : []),
    ...(project.decisions?.length ? [{ id: "choices", label: "Choices" }] : []),
    ...(project.features?.length ? [{ id: "capabilities", label: "Capabilities" }] : []),
    ...(project.challenges?.length ? [{ id: "problems", label: "Problems" }] : []),
    ...(project.stackGroups?.length || project.technologies.length
      ? [{ id: "stack", label: "Stack" }]
      : []),
    ...(project.stories?.length ? [{ id: "story", label: "Story" }] : []),
    ...(project.outcome ? [{ id: "result", label: "Result" }] : []),
  ];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline ?? project.year },
    { label: "Status", value: STATUS_LABEL[project.status] ?? project.status },
    { label: "Domain", value: project.domainLabel ?? projectCategoryLabels[project.category] },
  ];

  const stackGroups = project.stackGroups ?? [
    { label: "Technologies", items: project.technologies },
  ];

  return (
    <div className="relative" style={{ "--project-accent": project.accentColor } as CSSProperties}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-10 pt-32 sm:px-10 sm:pt-40 lg:px-16">
        <GlowBlob tone="dual" size="46rem" className="-left-32 -top-24" />

        <div className="relative mx-auto w-full max-w-6xl">
          <Link
            href="/projects"
            data-cursor="interactive"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All projects
          </Link>

          <p
            className="mt-10 font-mono text-xs uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            {projectCategoryLabels[project.category]} · {project.year}
          </p>

          <h1 className="mt-4 font-display text-6xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">
            {project.title}
          </h1>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl font-display text-xl leading-snug text-ink-dim sm:text-2xl">
              {project.shortDescription}
            </p>
            {linkButtons.length > 0 && (
              <div className="flex shrink-0 flex-wrap items-center gap-3 self-start lg:self-auto">
                {linkButtons.map((link, i) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    variant={i === 0 ? "primary" : "ghost"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-12">
            <ProjectVisual project={project} />
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 lg:grid-cols-4">
            {meta.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                  {row.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-ink sm:text-base">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CaseStudyNav sections={sections} />

      <div className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10 lg:px-16">
        {/* Brief: the description, with the problem and the approach beside it. */}
        <Block id="brief" label="The brief" title="What it is and why it was hard">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <p className="text-lg leading-relaxed text-ink-dim sm:text-xl">
              {project.fullDescription}
            </p>

            {project.challenge && (
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-2xl border border-line bg-bg-raised p-6"
                  style={{ borderLeft: `3px solid ${project.accentColor}` }}
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                    The problem
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim sm:text-base">
                    {project.challenge}
                  </p>
                </div>
                {project.approach && (
                  <div className="rounded-2xl border border-line bg-bg-raised p-6">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                      What I did
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-dim sm:text-base">
                      {project.approach}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Block>

        {/* System: a left-to-right flow instead of a numbered list. */}
        {project.architecture?.length ? (
          <Block id="system" label="The system" title="How the pieces fit together">
            <ol className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
              {project.architecture.map((layer, i) => (
                <li key={layer.title} className="flex flex-col gap-3 lg:flex-1 lg:flex-row lg:gap-0">
                  <div className="flex-1 rounded-2xl border border-line bg-bg-raised p-6">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs"
                      style={{ border: `1px solid ${project.accentColor}`, color: ACCENT }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
                      {layer.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{layer.description}</p>
                  </div>
                  {i < (project.architecture?.length ?? 0) - 1 && (
                    <span
                      aria-hidden="true"
                      className="flex items-center justify-center py-1 lg:px-3 lg:py-0"
                      style={{ color: ACCENT }}
                    >
                      <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Block>
        ) : null}

        {/* Choices: decisions as a card grid. */}
        {project.decisions?.length ? (
          <Block id="choices" label="Choices" title="Decisions that shaped it">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.decisions.map((decision) => (
                <article
                  key={decision.title}
                  className="rounded-2xl border border-line bg-bg-raised p-6 sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="block h-0.5 w-10 rounded-full"
                    style={{ background: project.accentColor }}
                  />
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                    {decision.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {decision.description}
                  </p>
                </article>
              ))}
            </div>
          </Block>
        ) : null}

        {/* Capabilities: a tick grid. */}
        {project.features?.length ? (
          <Block id="capabilities" label="Capabilities" title="What it does">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-line px-5 py-4 text-sm text-ink-dim sm:text-base"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: ACCENT }}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {/* Problems: problem on the left, fix on the right, joined by an arrow. */}
        {project.challenges?.length ? (
          <Block id="problems" label="Problems" title="What went wrong, and what fixed it">
            <div className="flex flex-col gap-4">
              {project.challenges.map((challenge) => (
                <article
                  key={challenge.problem}
                  className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]"
                >
                  <div className="rounded-2xl border border-line p-6">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                      Problem
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-dim sm:text-base">
                      {challenge.problem}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center"
                    style={{ color: ACCENT }}
                  >
                    <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
                  </span>
                  <div
                    className="rounded-2xl border border-line bg-bg-raised p-6"
                    style={{ borderTop: `3px solid ${project.accentColor}` }}
                  >
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                      Fix
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-dim sm:text-base">
                      {challenge.solution}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Block>
        ) : null}

        {/* Stack */}
        {project.stackGroups?.length || project.technologies.length ? (
          <Block id="stack" label="Stack" title="What it is built with">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {stackGroups.map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                    {group.label}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <TechChip key={item} name={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>
        ) : null}

        {/* Story: personal notes in my own words. */}
        {project.stories?.length ? (
          <Block id="story" label="In my words" title="The story behind it">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.stories.map((story) => (
                <article
                  key={story.label}
                  className="rounded-2xl border border-line bg-bg-raised p-6 sm:p-7"
                  style={{ borderTop: `3px solid ${project.accentColor}` }}
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {story.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim sm:text-base">
                    {story.text}
                  </p>
                </article>
              ))}
            </div>
          </Block>
        ) : null}

        {/* Result: one big statement. */}
        {project.outcome ? (
          <section id="result" className="scroll-mt-40 py-14 sm:py-20">
            <Reveal>
              <div
                className="relative overflow-hidden rounded-3xl border border-line bg-bg-alt p-8 sm:p-14"
                style={{ borderTop: `3px solid ${project.accentColor}` }}
              >
                <p
                  className="font-mono text-[0.68rem] uppercase tracking-[0.18em]"
                  style={{ color: ACCENT }}
                >
                  The result
                </p>
                <p className="mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-4xl">
                  {project.outcome}
                </p>
              </div>
            </Reveal>
          </section>
        ) : null}

        {/* Next project: one big link, with a preview of what comes next. */}
        {neighbours && (
          <Link
            href={`/projects/${neighbours.next.slug}`}
            data-cursor="interactive"
            className="group mt-10 grid items-center gap-8 border-t border-line pt-10 md:grid-cols-[1.1fr_1fr] md:gap-12"
          >
            <div>
              <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                Next project
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </p>
              <p className="mt-4 font-display text-5xl font-semibold leading-none tracking-tight text-ink transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-2 sm:text-6xl">
                {neighbours.next.title}
              </p>
              <p className="mt-4 text-base text-muted">
                {projectCategoryLabels[neighbours.next.category]}
              </p>
            </div>

            {neighbours.next.image && (
              <BrowserFrame
                title={neighbours.next.title}
                compact
                className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-y-1"
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: neighbours.next.imageRatio ?? 1.6 }}
                >
                  <Image
                    src={neighbours.next.image}
                    alt={`${neighbours.next.title} preview`}
                    fill
                    quality={95}
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </BrowserFrame>
            )}
          </Link>
        )}

        <section className="mt-16 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Have something like this to build?
            </h2>
            <p className="mt-2 max-w-lg text-base text-muted">
              I work on the AI layer: retrieval, reasoning and the code underneath. I hand it over
              ready to integrate.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/#contact">
              Get in touch
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/projects" variant="ghost">
              All projects
            </Button>
          </div>
        </section>
      </div>

      <footer className="border-t border-line px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Md. Sakibur Rahman
          </p>
          <ul className="flex items-center gap-2">
            {socialLinks
              .filter((link) => link.href)
              .map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="interactive"
                    aria-label={link.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
                  >
                    {link.icon === "github" ? (
                      <FolderGit2 className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    )}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
