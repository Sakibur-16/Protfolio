import { featuredProjects, otherProjects, allProjects } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCarousel } from "@/components/projects/ProjectCarousel";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Badge } from "@/components/ui/Badge";

/**
 * Work section, in two registers.
 *
 * The auto-cycling deck is the showpiece — layered, tilted cards for the lead
 * case studies. Beneath it, a plain responsive grid carries every project, so
 * a visitor scanning for something specific never has to wait for a carousel
 * to come round to it.
 */
const FEATURED_COUNT = featuredProjects.length;
const gridProjects = otherProjects;

export function SelectedWork() {
  return (
    <section id="work" className="relative overflow-hidden bg-bg px-5 py-20 sm:px-10 sm:py-32 lg:px-16">
      <GlowBlob tone="dual" size="46rem" className="left-1/2 top-0 -translate-x-1/2" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <Badge>Selected work</Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Shipped AI, <span className="text-gradient">not slideware</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {allProjects.length} projects across LLM products, retrieval systems, computer vision,
            and speech. The deck cycles automatically — drag, swipe, or use the arrow keys.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 block sm:mt-16">
          <ProjectCarousel projects={featuredProjects} />
        </Reveal>

        {gridProjects.length > 0 && (
          <div className="mt-24 sm:mt-32">
            <Reveal>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                More work — {gridProjects.length} projects
              </h3>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridProjects.map((project, i) => (
                <Reveal key={project.slug} delay={Math.min(i, 5) * 0.05}>
                  <ProjectCard project={project} index={i + FEATURED_COUNT} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
