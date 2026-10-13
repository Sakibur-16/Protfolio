import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { allProjects } from "@/data/projects";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { Button } from "@/components/ui/Button";
import { ContactGrid } from "@/components/ui/ContactGrid";
import { Badge } from "@/components/ui/Badge";
import { GlowBlob } from "@/components/ui/GlowBlob";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI projects I have built or contributed to: RAG assistants, LLM products, computer vision and speech.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <section className="relative overflow-hidden bg-bg px-5 pb-24 pt-32 sm:px-10 sm:pb-32 sm:pt-40 lg:px-16">
      <GlowBlob tone="dual" size="42rem" className="left-1/2 top-0 -translate-x-1/2" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        <div className="mt-8">
          <Badge>Projects</Badge>
        </div>

        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Projects I&rsquo;ve <span className="text-gradient">shipped</span>.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          {allProjects.length} projects across RAG assistants, LLM products and computer vision.
          Hover to preview, click to read the full case study.
        </p>

        <div className="mt-12 sm:mt-16">
          <ProjectIndex projects={allProjects} />
        </div>

        <div className="relative mt-16 overflow-hidden rounded-3xl border border-line bg-bg-raised p-6 sm:mt-24 sm:p-10 lg:p-12">
          <GlowBlob tone="dual" size="30rem" className="-right-32 -top-40 opacity-80" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                Let&rsquo;s talk
              </p>
              <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
                Want the full story behind any of these?
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                I&rsquo;m happy to walk you through the process, the decisions and the architecture,
                on a call or over email.
              </p>
              <Button href="/#contact" className="group mt-8">
                Get in touch
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>
            </div>

            <ContactGrid showLabels className="max-w-md lg:justify-self-end" />
          </div>
        </div>
      </div>
    </section>
  );
}
