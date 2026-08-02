import { allProjects, projectCategoryLabels } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Rotating placeholder gradient fills for project thumbnails until real
 * screenshots are available. Swap the <div> below for a real
 * <Image src="/images/projects/<slug>.jpg" .../> once screenshots exist —
 * see the comment at the thumbnail markup.
 */
const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #f3d9e6 0%, #e9c7f0 50%, #cdd8f5 100%)",
  "linear-gradient(135deg, #cfe0f7 0%, #b9d3ef 50%, #dfe6f2 100%)",
  "linear-gradient(135deg, #f6e7cf 0%, #f0d9c7 50%, #f5e9df 100%)",
  "linear-gradient(135deg, #d8e8dc 0%, #c9dfd0 50%, #e3ede6 100%)",
];

export function SelectedWork() {
  return (
    <section id="work" className="bg-bg-alt px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal blur>
          <h2 className="font-display text-5xl font-medium tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Projects
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-10">
          {allProjects.map((project, i) => {
            const link = project.links.external ?? project.links.repository ?? project.links.store;
            return (
              <Reveal key={project.slug} delay={(i % 2) * 0.08}>
                <a
                  href={link ?? "#work"}
                  className="group block"
                  target={link ? "_blank" : undefined}
                  rel={link ? "noreferrer" : undefined}
                >
                  {/*
                    Project thumbnail placeholder — swap this gradient div for
                    a real <Image src="/images/projects/{project.slug}.jpg" />
                    once screenshots exist.
                  */}
                  <div
                    className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-sm ring-1 ring-line transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:shadow-md"
                    style={{ background: PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length] }}
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                      {project.title}
                    </h3>
                    <span className="whitespace-nowrap text-sm uppercase tracking-wide text-muted">
                      {projectCategoryLabels[project.category]}
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
