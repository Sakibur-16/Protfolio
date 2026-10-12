import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects } from "@/data/projects";
import { generalSection, projectSection } from "@/data/intakeQuestions";
import { IntakeForm } from "@/components/intake/IntakeForm";

export const metadata: Metadata = {
  title: "Project info form",
  robots: { index: false, follow: false },
};

/** Local helper page. It does not exist in a production build. */
export default function IntakePage() {
  if (process.env.NODE_ENV === "production") notFound();

  // Projects that still have questions come first; the rest only take screenshots.
  const projectSections = allProjects.map((project) => projectSection(project.slug, project.title));
  const sections = [
    generalSection,
    ...projectSections.filter((s) => s.fields.length > 0),
    ...projectSections.filter((s) => s.fields.length === 0),
  ];

  return (
    <section className="px-5 pb-24 pt-32 sm:px-10 sm:pt-40 lg:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Local only</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Project info
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Only what is still missing is asked now. Answer what you can and skip the rest. Each
          section saves on its own. Every project also has an upload box for real screenshots.
        </p>

        <IntakeForm sections={sections} />
      </div>
    </section>
  );
}
