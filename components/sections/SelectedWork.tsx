import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  featuredProjects,
  otherProjects,
  allProjects,
  projectCategoryLabels,
  TOTAL_PROJECTS_DELIVERED,
} from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCarousel } from "@/components/projects/ProjectCarousel";
import { GlowBlob } from "@/components/ui/GlowBlob";

/**
 * Work in two deliberately different registers.
 *
 * The featured deck is visual and slow — layered cards you look at. The
 * archive beneath is an index: dense, typographic, scannable, closer to a
 * contents page than a gallery. Previously both were card grids, which made
 * the second half read as a weaker repeat of the first.
 */
export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-bg-alt px-5 py-20 sm:px-10 sm:py-32 lg:px-16"
    >
      <GlowBlob tone="dual" size="46rem" className="left-1/2 top-0 -translate-x-1/2" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Selected work
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-muted">
              {TOTAL_PROJECTS_DELIVERED} projects delivered since 2024, {allProjects.length}{" "}
              written up here. The deck cycles on its own — or drag it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 block sm:mt-16">
          <ProjectCarousel projects={featuredProjects} />
        </Reveal>

        {otherProjects.length > 0 && (
          <div className="mt-24 sm:mt-32">
            <Reveal>
              <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Archive</h3>
                <p className="font-mono text-xs tabular-nums text-muted">
                  {String(otherProjects.length).padStart(2, "0")} more
                </p>
              </div>
            </Reveal>

            {/* Index rows, not cards — a different reading mode to the deck. */}
            <ol>
              {otherProjects.map((project, i) => (
                <Reveal key={project.slug} delay={Math.min(i, 6) * 0.03}>
                  <li className="group relative border-b border-line transition-colors duration-300 hover:bg-bg">
                    <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-5 transition-[padding] duration-500 ease-[var(--ease-editorial)] group-hover:px-4 sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,13rem)_4.5rem_1.5rem] sm:gap-x-8 sm:py-6">
                      <span className="font-mono text-xs tabular-nums text-muted transition-colors duration-300 group-hover:text-warm">
                        {String(i + featuredProjects.length + 1).padStart(2, "0")}
                      </span>

                      <h4 className="font-display text-lg font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-warm sm:text-xl">
                        <Link
                          href={`/projects/${project.slug}`}
                          data-cursor="interactive"
                          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                        >
                          {project.title}
                        </Link>
                      </h4>

                      <p className="col-start-2 text-sm text-muted sm:col-start-auto">
                        {projectCategoryLabels[project.category]}
                      </p>

                      <span className="hidden font-mono text-xs tabular-nums text-muted sm:block">
                        {project.year}
                      </span>

                      <ArrowUpRight
                        aria-hidden="true"
                        className="hidden h-4 w-4 text-muted transition-[transform,color] duration-300 ease-[var(--ease-editorial)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block"
                      />
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
