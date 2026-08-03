import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, FolderGit2 } from "lucide-react";
import type { Metadata } from "next";
import { allProjects, projectCategoryLabels, projectNeighbours } from "@/data/projects";
import { iconKeyForTech } from "@/data/techStack";
import { projectMetadata } from "@/lib/metadata";
import { socialLinks } from "@/data/socialLinks";
import { TechIcon } from "@/components/ui/TechIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyNav } from "@/components/projects/CaseStudyNav";

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

/** Section eyebrow: zero-padded index + kicker — the page's repeating rhythm. */
function SectionLabel({ index, kicker }: { index: number; kicker: string }) {
  return (
    <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
      <span className="text-warm">{String(index).padStart(2, "0")}</span> / {kicker}
    </p>
  );
}

function TechChip({ name }: { name: string }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-raised px-3.5 py-1.5 text-sm text-ink-dim">
      <TechIcon iconKey={iconKeyForTech(name)} colored className="h-3.5 w-3.5" />
      {name}
    </li>
  );
}

/** Shared section shell: numbered eyebrow rail + content column. */
function Section({
  id,
  index,
  kicker,
  heading,
  children,
}: {
  id: string;
  index: number;
  kicker: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-40 border-t border-line py-16 first:border-t-0 sm:py-20">
      <Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-12">
          <SectionLabel index={index} kicker={kicker} />
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {heading}
            </h2>
            <div className="mt-7">{children}</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SubBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{label}</p>
      <span aria-hidden="true" className="accent-bar mt-2 block h-0.5 w-8 rounded-full" />
      <p className="mt-4 text-sm leading-relaxed text-muted">{children}</p>
    </div>
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
  const primaryLink =
    project.links.external ?? project.links.repository ?? project.links.store ?? null;

  // Only sections with real content are built — and the sticky nav is derived
  // from the same list, so it can never point at a heading that isn't there.
  const sections: { id: string; label: string }[] = [
    { id: "overview", label: "Overview" },
    ...(project.architecture?.length ? [{ id: "architecture", label: "Architecture" }] : []),
    ...(project.decisions?.length ? [{ id: "decisions", label: "Decisions" }] : []),
    ...(project.stackGroups?.length || project.technologies.length
      ? [{ id: "stack", label: "Stack" }]
      : []),
    ...(project.features?.length ? [{ id: "features", label: "Features" }] : []),
    ...(project.challenges?.length ? [{ id: "challenges", label: "Challenges" }] : []),
    ...(project.outcome ? [{ id: "outcome", label: "Outcome" }] : []),
  ];

  let sectionIndex = 0;
  const nextIndex = () => ++sectionIndex;

  const glanceRows = [
    { label: "My role", value: project.role },
    { label: "Timeline", value: project.timeline ?? project.year },
    { label: "Status", value: STATUS_LABEL[project.status] ?? project.status },
    { label: "Deliverables", value: project.deliverables },
    { label: "Domain", value: project.domainLabel },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-10 sm:pt-40 lg:px-16">
        <GlowBlob tone="dual" size="46rem" className="-left-32 -top-24" />

        <div className="mx-auto w-full max-w-6xl">
          <Link
            href="/#work"
            data-cursor="interactive"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All work
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{projectCategoryLabels[project.category]}</Badge>
                <span className="font-mono text-xs tabular-nums text-muted">{project.year}</span>
              </div>

              <h1 className="mt-7 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <p className="mt-3 font-display text-xl font-normal text-ink-dim sm:text-2xl">
                {project.shortDescription}
              </p>

              <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted">
                {project.fullDescription}
              </p>

              {project.technologies.length > 0 && (
                <>
                  <p className="mt-10 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                    Primary technologies
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <TechChip key={tech} name={tech} />
                    ))}
                  </ul>
                </>
              )}

              {primaryLink && (
                <Button href={primaryLink} className="mt-10">
                  View project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </div>

            <aside className="h-fit rounded-3xl border border-line bg-bg-raised p-7">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                At a glance
              </p>

              <dl className="mt-6 flex flex-col">
                {glanceRows.map((row) => (
                  <div
                    key={row.label}
                    className="border-t border-line py-4 first:border-t-0 first:pt-0"
                  >
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="mt-1.5 font-medium text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <CaseStudyNav sections={sections} />

      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:px-10 lg:px-16">
        <Section id="overview" index={nextIndex()} kicker="Context" heading="What this project is">
          <p className="text-lg leading-relaxed text-ink-dim">{project.fullDescription}</p>
          {project.challenge && (
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <SubBlock label="Engineering problem">{project.challenge}</SubBlock>
              {project.approach && <SubBlock label="Approach">{project.approach}</SubBlock>}
            </div>
          )}
        </Section>

        {project.architecture?.length ? (
          <Section
            id="architecture"
            index={nextIndex()}
            kicker="Architecture"
            heading="How the system is structured"
          >
            <div className="mt-2 rounded-3xl border border-line bg-bg-alt p-7 sm:p-10">
              <ol className="relative flex flex-col gap-9">
                {/* Connector runs behind the nodes. */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-[1.05rem] top-4 w-px bg-line-strong"
                />
                {project.architecture.map((layer, i) => (
                  <li key={layer.title} className="relative flex gap-5">
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-[0.68rem] text-warm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                        Layer {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1.5 font-display text-lg font-medium tracking-tight text-ink">
                        {layer.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{layer.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Section>
        ) : null}

        {project.decisions?.length ? (
          <Section
            id="decisions"
            index={nextIndex()}
            kicker="Engineering judgment"
            heading="Decisions that shaped it"
          >
            <ol className="mt-2 border-t border-line">
              {project.decisions.map((decision, i) => (
                <li key={decision.title} className="flex gap-6 border-b border-line py-7">
                  <span className="font-mono text-sm tabular-nums text-warm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                      {decision.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {decision.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        {project.stackGroups?.length || project.technologies.length ? (
          <Section id="stack" index={nextIndex()} kicker="Stack" heading="What it's built with">
            <div className="mt-2 border-t border-line">
              {(project.stackGroups ?? [{ label: "Technologies", items: project.technologies }]).map(
                (group) => (
                  <div
                    key={group.label}
                    className="grid grid-cols-1 gap-4 border-b border-line py-6 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-8"
                  >
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                      {group.label}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <TechChip key={item} name={item} />
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </Section>
        ) : null}

        {project.features?.length ? (
          <Section id="features" index={nextIndex()} kicker="Capabilities" heading="What it does">
            <ol className="mt-2 border-t border-line">
              {project.features.map((feature, i) => (
                <li key={feature} className="flex gap-6 border-b border-line py-5">
                  <span className="font-mono text-sm tabular-nums text-warm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base text-ink-dim">{feature}</p>
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        {project.challenges?.length ? (
          <Section
            id="challenges"
            index={nextIndex()}
            kicker="Challenges"
            heading="What was hard, and what fixed it"
          >
            <div className="mt-2 flex flex-col gap-5">
              {project.challenges.map((challenge, i) => (
                <article
                  key={challenge.problem}
                  className="rounded-3xl border border-line bg-bg-raised p-7 sm:p-8"
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-warm">
                    Challenge {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <SubBlock label="Problem">{challenge.problem}</SubBlock>
                    <SubBlock label="Solution">{challenge.solution}</SubBlock>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        ) : null}

        {project.outcome ? (
          <Section id="outcome" index={nextIndex()} kicker="Outcome" heading="What shipped">
            <p className="text-lg leading-relaxed text-ink-dim">{project.outcome}</p>
          </Section>
        ) : null}

        {neighbours && (
          <nav aria-label="More projects" className="mt-24 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { neighbour: neighbours.previous, direction: "previous" as const },
              { neighbour: neighbours.next, direction: "next" as const },
            ].map(({ neighbour, direction }) => (
              <Link
                key={`${direction}-${neighbour.slug}`}
                href={`/projects/${neighbour.slug}`}
                data-cursor="interactive"
                className="gradient-border group rounded-3xl border border-line bg-bg-raised p-6 transition-transform duration-500 ease-[var(--ease-editorial)] hover:-translate-y-1"
              >
                <p
                  className={`flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted ${
                    direction === "next" ? "sm:justify-end" : ""
                  }`}
                >
                  {direction === "previous" && <ArrowLeft className="h-3 w-3" aria-hidden="true" />}
                  {direction === "previous" ? "Previous project" : "Next project"}
                  {direction === "next" && <ArrowRight className="h-3 w-3" aria-hidden="true" />}
                </p>
                <p
                  className={`mt-3 font-display text-xl font-medium tracking-tight text-ink ${
                    direction === "next" ? "sm:text-right" : ""
                  }`}
                >
                  {neighbour.title}
                </p>
                <p
                  className={`mt-1 text-sm text-muted ${direction === "next" ? "sm:text-right" : ""}`}
                >
                  {projectCategoryLabels[neighbour.category]}
                </p>
              </Link>
            ))}
          </nav>
        )}

        <section className="relative mt-16 overflow-hidden rounded-3xl border border-line bg-bg-alt p-10 text-center sm:p-16">
          <GlowBlob tone="dual" size="34rem" className="left-1/2 top-0 -translate-x-1/2" />
          <p className="relative font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
            Next step
          </p>
          <h2 className="relative mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Have something like this
            <br />
            you need <span className="text-gradient">built properly</span>?
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted">
            I work on the AI layer — retrieval, reasoning, and the plumbing underneath — and hand it
            over ready to integrate.
          </p>
          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/#contact">
              Start a project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/#work" variant="ghost">
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
