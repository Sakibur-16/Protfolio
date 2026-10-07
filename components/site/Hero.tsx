import Image from "next/image";
import type { CSSProperties } from "react";
import { Backdrop } from "@/components/site/Backdrop";
import { Cite } from "@/components/site/Cite";
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
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Q&A", href: "#faq" },
  { label: "Contact", href: "#contact" },
].map((row, index) => ({ ...row, n: pad(studyRows.length + index + 1) }));

const contents = [...studyRows, ...restRows];

// The headline is split into words so each can rise out of its own mask.
const headlineWords = ["AI/ML", "systems", "that", "show", "their"];

export function Hero() {
  return (
    <section id="top" className="px-3 sm:px-4">
      <div className="on-dark relative isolate mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1480px] flex-col items-center overflow-hidden rounded-[var(--radius-frame)] text-center">
        <Backdrop src="/work/hero-dusk.jpg" priority className="object-[50%_100%]" />
        {/* Darkens the sky behind the headline; the hills below stay visible. */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#070b14]/70 via-[#070b14]/20 to-transparent" />

        <div className="relative z-10 flex w-full flex-col items-center px-6 pt-32 sm:pt-36">
          <a href="#quranity" className="pill-link rise" style={{ "--i": 0 } as CSSProperties}>
            Quranity is live on Google Play and the App Store
            <span className="btn-chip" aria-hidden="true">
              →
            </span>
          </a>

          <h1 className="display mt-7 max-w-[17ch] text-[clamp(2.6rem,1rem+5.2vw,5.5rem)]">
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

          <div className="rise mt-7 max-w-[34rem]" style={{ "--i": 1 } as CSSProperties}>
            <p className="text-lg text-ink/90">
              I’m Sakibur Rahman, an AI developer at Sparktech Agency.
              <Cite source={sources.sparktech} /> I build RAG, agentic and ML systems whose answers trace to sources.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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

        {/* A product panel rising from the bottom edge, holding the real Quranity screens. */}
        <div className="phones relative z-10 mt-auto w-full max-w-[1000px] px-4 pt-14 sm:px-8">
          <div className="overflow-hidden rounded-t-[28px] border border-b-0 border-white/10 bg-[#0b111f]/85 shadow-[0_-30px_80px_-30px_rgb(0_0_0/0.7)] backdrop-blur-md">
            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="meta">Quranity · Qalam AI</span>
              <span className="meta flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Live on iPhone
              </span>
            </div>
            <Image
              src="/work/quranity-screens.jpg"
              alt="Five Quranity app screens: home with prayer times, the Qalam AI assistant, video stories, a story player, and a story feed."
              width={1295}
              height={535}
              sizes="(min-width: 1024px) 940px, 100vw"
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <nav aria-label="Contents" className="mx-auto mt-6 flex max-w-[1480px] flex-wrap items-center gap-2 px-1 md:hidden">
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
