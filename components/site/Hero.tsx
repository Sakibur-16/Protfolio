import type { CSSProperties } from "react";
import { Cite } from "@/components/site/Cite";
import { contact } from "@/data/site";
import { sources } from "@/data/sources";
import { miniProjects, studies } from "@/data/work";

const pad = (n: number) => String(n).padStart(2, "0");

const studyRows = studies.map((study, index) => ({
  n: pad(index + 1),
  label: study.short ?? study.title,
  note: study.year,
  href: `#${study.id}`,
}));

const restRows = [
  { label: "More projects", note: `${miniProjects.length}`, href: "#more-projects" },
  { label: "Research", note: "3 papers", href: "#research" },
  { label: "Experience", note: "2024 on", href: "#experience" },
  { label: "Contact", note: "", href: "#contact" },
].map((row, index) => ({ ...row, n: pad(studyRows.length + index + 1) }));

const contents = [...studyRows, ...restRows];

// The headline is split into words so each can rise out of its own mask.
const headlineWords = ["AI/ML", "systems", "that", "show", "their"];

export function Hero() {
  return (
    <div className="notebook">
      <section
        id="top"
        className="mx-auto flex min-h-[calc(100dvh-65px)] w-full max-w-[1280px] flex-col justify-between gap-16 px-4 pb-12 pt-12 sm:px-8 lg:pt-16"
      >
        <h1 className="display max-w-[16ch] text-[clamp(2.6rem,1rem+6.4vw,5.5rem)]">
          {headlineWords.map((word, index) => (
            <span key={word}>
              <span className="word">
                <span style={{ "--w": index } as CSSProperties}>{word}</span>
              </span>{" "}
            </span>
          ))}
          <span className="word">
            <span style={{ "--w": headlineWords.length } as CSSProperties}>
              <em className="sources text-accent">sources.</em>
            </span>
          </span>
          <Cite source={sources.quranity} hero />
        </h1>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="rise lg:col-span-6" style={{ "--i": 0 } as CSSProperties}>
            <p className="prose-col text-lg">
              I’m Sakibur Rahman, an AI developer at Sparktech Agency.
              <Cite source={sources.sparktech} /> I build RAG, agentic and ML systems whose answers trace to sources.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#work" className="btn btn-primary">
                Read the work
              </a>
              <a href={`mailto:${contact.email}`} className="btn">
                Email me
              </a>
            </div>
          </div>

          <nav aria-label="Contents" className="rise lg:col-span-5 lg:col-start-8" style={{ "--i": 1 } as CSSProperties}>
            <p className="meta border-b-2 border-ink pb-2">Contents</p>
            <ol>
              {contents.map((item) => (
                <li key={item.n}>
                  <a
                    href={item.href}
                    className="group flex items-baseline gap-3 border-b border-rule py-2.5 hover:text-accent"
                  >
                    <span className="meta w-6 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      {item.n}
                    </span>
                    <span className="display text-xl transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-muted/50" />
                    <span className="meta shrink-0">{item.note}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
    </div>
  );
}
