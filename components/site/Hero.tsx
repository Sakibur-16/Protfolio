import type { CSSProperties } from "react";
import { Backdrop } from "@/components/site/Backdrop";
import { Cite } from "@/components/site/Cite";
import { Marquee } from "@/components/site/Marquee";
import { publications } from "@/data/publications";
import { contact } from "@/data/site";
import { sources } from "@/data/sources";
import { studies } from "@/data/work";

const pad = (n: number) => String(n).padStart(2, "0");

const studyRows = studies.map((study, index) => ({
  n: pad(index + 1),
  label: study.short ?? study.title,
  href: `#${study.id}`,
}));

const restRows = [
  { label: "More projects", href: "#more-projects" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
].map((row, index) => ({ ...row, n: pad(studyRows.length + index + 1) }));

const contents = [...studyRows, ...restRows];

// The headline is split into words so each can rise out of its own mask.
const headlineWords = ["AI/ML", "systems", "that", "show", "their"];

// Both figures come from the CV and the paper list.
const facts = [
  { value: "15+", label: "live and production-ready applications led" },
  { value: String(publications.length), label: "peer-reviewed papers" },
] as const;

export function Hero() {
  return (
    <section id="top" className="px-3 sm:px-4">
      <div className="on-dark relative isolate mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1480px] flex-col overflow-hidden rounded-[var(--radius-frame)]">
        <Backdrop src="/work/hero-sheets.jpg" priority className="object-[70%_50%]" />
        {/* Keeps the headline legible over the image, and lets the bottom row sit on a calm edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-0 bg-gradient-to-r from-[#0b101e] via-[#0b101e]/75 to-[#0b101e]/0 lg:via-[#0b101e]/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-0 bg-gradient-to-t from-[#0b101e]/90 via-transparent to-[#0b101e]/30"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center gap-10 px-6 pb-8 pt-32 sm:px-10">
          <h1 className="display max-w-[13ch] text-[clamp(2.75rem,1rem+5.6vw,5.75rem)]">
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
            <p className="text-lg text-ink/90">
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

        <div
          className="rise relative z-10 mx-auto flex w-full max-w-[1280px] items-end justify-between gap-6 px-6 pb-7 sm:px-10"
          style={{ "--i": 3 } as CSSProperties}
        >
          <dl className="flex flex-wrap items-end gap-x-8 gap-y-3">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`flex items-center gap-3 ${index > 0 ? "sm:border-l sm:border-white/20 sm:pl-8" : ""}`}
              >
                <dt className="display text-3xl sm:text-4xl">{fact.value}</dt>
                <dd className="meta max-w-[11rem] leading-snug">{fact.label}</dd>
              </div>
            ))}
          </dl>
          <a href="#work" className="meta hidden items-center gap-2 sm:flex" aria-label="Scroll to the work">
            Scroll
            <span className="bob inline-block" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>

      <Marquee />

      <nav
        aria-label="Contents"
        className="mx-auto mt-10 flex max-w-[1480px] flex-wrap items-center gap-2 px-1 md:hidden"
      >
        <span className="meta mr-2">Jump to</span>
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
