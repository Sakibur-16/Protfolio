import Image from "next/image";
import type { CSSProperties } from "react";
import { Cite } from "@/components/site/Cite";
import { contact } from "@/data/site";
import { sources } from "@/data/sources";
import { miniProjects, studies } from "@/data/work";

const pad = (n: number) => String(n).padStart(2, "0");

const studyRows = studies.map((study, index) => ({
  n: pad(index + 1),
  label: study.short ?? study.title,
  href: `#${study.id}`,
}));

const restRows = [
  { label: "More projects", href: "#more-projects", note: `${miniProjects.length}` },
  { label: "Research", href: "#research", note: "" },
  { label: "Experience", href: "#experience", note: "" },
  { label: "Contact", href: "#contact", note: "" },
].map((row, index) => ({ ...row, n: pad(studyRows.length + index + 1) }));

const contents = [...studyRows, ...restRows];

// The headline is split into words so each can rise out of its own mask.
const headlineWords = ["AI/ML", "systems", "that", "show", "their"];

export function Hero() {
  return (
    <section id="top" className="px-3 sm:px-4">
      <div className="on-dark relative isolate mx-auto flex min-h-[calc(100dvh-6.25rem)] max-w-[1480px] flex-col overflow-hidden rounded-[var(--radius-frame)]">
        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center gap-10 px-6 pb-10 pt-14 sm:px-10 lg:pb-16">
          <h1 className="display max-w-[13ch] text-[clamp(2.75rem,1rem+5.4vw,5.5rem)]">
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

          <div className="rise max-w-[34rem]" style={{ "--i": 0 } as CSSProperties}>
            <p className="text-lg text-ink/85">
              I’m Sakibur Rahman, an AI developer at Sparktech Agency.
              <Cite source={sources.sparktech} /> I build RAG, agentic and ML systems whose answers trace to sources.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn">
                Read the work
                <span className="btn-chip" aria-hidden="true">
                  →
                </span>
              </a>
              <a href={`mailto:${contact.email}`} className="btn btn-ghost">
                Email me
              </a>
            </div>
          </div>
        </div>

        <div className="phones fade-edges pointer-events-none relative z-0 -mt-4 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[56%]">
          <Image
            src="/work/quranity-app.jpg"
            alt="Quranity app screens on iPhone: video stories, the AI assistant, home with prayer times and the daily verse, and the Qur’an reader."
            width={955}
            height={555}
            sizes="(min-width: 1024px) 56vw, 100vw"
            priority
            className="h-auto w-full"
          />
        </div>
      </div>

      <nav aria-label="Contents" className="mx-auto mt-5 flex max-w-[1480px] flex-wrap items-center gap-2 px-1">
        <span className="meta mr-2">Contents</span>
        {contents.map((item) => (
          <a key={item.n} href={item.href} className="chip">
            <span className="meta">{item.n}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
