import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allProjects } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCarousel } from "@/components/projects/ProjectCarousel";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Badge } from "@/components/ui/Badge";

/**
 * Work section. Every project sits in the auto-cycling deck, and "View all
 * projects" opens the full list on its own page.
 */
export function SelectedWork() {
  return (
    <section id="work" className="relative overflow-hidden bg-bg px-5 py-20 sm:px-10 sm:py-32 lg:px-16">
      <GlowBlob tone="dual" size="46rem" className="left-1/2 top-0 -translate-x-1/2" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <Badge>Selected work</Badge>
        </Reveal>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Shipped AI, <span className="text-gradient">not slideware</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href="/projects"
              data-cursor="interactive"
              className="btn-ghost group inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
            >
              View all projects
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {allProjects.length} projects across LLM products, retrieval, computer vision and
            speech. Drag, swipe or click a side card to move through them.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-14 block sm:mt-16">
          <ProjectCarousel projects={allProjects} />
        </Reveal>
      </div>
    </section>
  );
}
