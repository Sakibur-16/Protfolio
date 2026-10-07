import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Cite } from "@/components/site/Cite";
import { sources } from "@/data/sources";
import {
  alsoBuilt,
  eqi30,
  malaria,
  miniProjects,
  moreProjectsNumber,
  quranity,
  quranityFallback,
  quranitySteps,
  studyNumber,
  type CaseStudy,
} from "@/data/work";

const tones = ["tile-blue", "tile-navy", "tile-sand", "tile-mist"] as const;

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="reveal border-t border-rule py-6 md:grid md:grid-cols-[8.5rem_1fr] md:gap-8">
      <h4 className="display mb-2 text-xl italic md:mb-0">{title}</h4>
      <div className="prose-col">{children}</div>
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1">
      {items.map((item) => (
        <li key={item} className="meta text-ink">
          {item}
        </li>
      ))}
    </ul>
  );
}

function MetaList({ study }: { study: CaseStudy }) {
  return (
    <dl className="meta grid grid-cols-[4rem_1fr] gap-x-3 gap-y-1">
      <dt>Year</dt>
      <dd className="text-ink">{study.year}</dd>
      <dt>Role</dt>
      <dd className="text-ink">{study.role}</dd>
      {study.status ? (
        <>
          <dt>Status</dt>
          <dd className="text-ink">{study.status}</dd>
        </>
      ) : null}
    </dl>
  );
}

/** Qalam's answer path as an ordered list: horizontal from lg, vertical below. */
function AnswerPath() {
  return (
    <figure className="reveal">
      <ol className="grid gap-0 lg:grid-cols-5">
        {quranitySteps.map((step, index) => {
          const accent = "accent" in step && step.accent;
          return (
            <li
              key={step.title}
              className="relative border-l border-rule pb-7 pl-6 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-5 lg:pt-6"
              style={{ "--i": index } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] top-1.5 size-[9px] rounded-full lg:-top-[5px] lg:left-0 ${
                  accent ? "bg-accent" : "bg-ink"
                }`}
              />
              <p className={`display text-xl ${accent ? "text-accent" : ""}`}>
                <span className="meta mr-2">{index + 1}</span>
                {step.title}
              </p>
              <p className="mt-1 text-[0.9375rem] leading-snug text-muted">{step.text}</p>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-8 flex gap-4 rounded-2xl bg-surface p-5 text-[0.9375rem]">
        <span className="meta shrink-0 pt-0.5 text-accent">Step 3</span>
        <span>{quranityFallback}</span>
      </figcaption>
    </figure>
  );
}

/** 01: the lead study. A large product tile, then a sticky title rail beside the long form. */
function LeadStudy() {
  const s = quranity;
  return (
    <article id={s.id} className="pt-4">
      <figure className="on-dark reveal overflow-hidden rounded-[var(--radius-frame)]">
        <Image
          src="/work/quranity-screens.jpg"
          alt="Five Quranity app screens: home with prayer times, the Qalam AI assistant, video stories, a story player, and a story feed."
          width={1295}
          height={535}
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="h-auto w-full"
        />
        <figcaption className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8">
          <div>
            <h3 className="display text-3xl">{s.title}</h3>
            <p className="meta mt-1">
              {s.role} · {s.year} · {s.status}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {s.links?.map((link) => (
              <li key={link.href}>
                <a className="btn btn-sm" href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <span className="btn-chip" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>

      <div className="grid gap-10 pt-16 lg:grid-cols-12 lg:gap-12 lg:pt-24">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="display text-[clamp(4.5rem,3rem+6vw,8rem)] italic leading-none text-accent">
              {studyNumber(s.id)}
            </p>
            <div className="mt-5">
              <MetaList study={s} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <p className="display reveal max-w-[24ch] text-[clamp(1.75rem,1.2rem+2vw,3rem)]">{s.lede}</p>
          <div className="mt-12">
            <Block title="Problem">
              <p>{s.problem}</p>
            </Block>
            {s.myRole ? (
              <Block title="My role">
                <p>{s.myRole}</p>
              </Block>
            ) : null}
            <div className="reveal border-t border-rule py-6">
              <h4 className="display mb-3 text-xl italic">How it works</h4>
              <p className="prose-col mb-10">{s.how}</p>
              <AnswerPath />
            </div>
            {s.hard ? (
              <Block title="The hard part">
                <p>{s.hard}</p>
              </Block>
            ) : null}
            <Block title="Result">
              <p>{s.result}</p>
            </Block>
            <Block title="Stack">
              <Stack items={s.stack} />
            </Block>
          </div>
        </div>
      </div>
    </article>
  );
}

/** A four-cell matrix for a study with a problem, how, hard part and result. Not shown while unpublished. */
function MatrixStudy({ study }: { study: CaseStudy }) {
  const cells: { title: string; body: string }[] = [
    { title: "Problem", body: study.problem },
    { title: "How it works", body: study.how },
    ...(study.hard ? [{ title: "The hard part", body: study.hard }] : []),
    { title: "Result", body: study.result },
  ];
  return (
    <article id={study.id} className="draw-top py-16 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="display text-[clamp(4rem,3rem+4vw,6rem)] italic leading-none text-accent">
            {studyNumber(study.id)}
          </p>
          <h3 className="display mt-4 text-3xl">{study.title}</h3>
          <div className="mt-5">
            <MetaList study={study} />
          </div>
        </div>
        <p className="display reveal max-w-[22ch] self-end text-[clamp(1.75rem,1.2rem+2vw,3rem)] lg:col-span-8">
          {study.lede}
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {cells.map((cell, index) => (
          <div
            key={cell.title}
            className="reveal rounded-3xl bg-surface p-6 md:p-8"
            style={{ "--i": index } as CSSProperties}
          >
            <h4 className="display mb-2 text-xl italic">{cell.title}</h4>
            <p className="prose-col text-[0.9375rem] leading-relaxed">{cell.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Stack items={study.stack} />
      </div>
    </article>
  );
}

/** The research study: the question is the headline, three short columns follow, all on a soft card. */
function ResearchStudy() {
  const s = malaria;
  return (
    <article id={s.id} className="mt-16 lg:mt-24">
      <div className="rounded-[var(--radius-frame)] bg-surface p-6 sm:p-10 lg:p-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="display text-6xl italic leading-none text-accent">{studyNumber(s.id)}</p>
          <p className="meta">
            {s.title} · {s.year} · {s.role}
          </p>
        </div>
        <p className="display reveal mt-8 max-w-[20ch] text-[clamp(2rem,1.2rem+3.4vw,4.25rem)]">{s.lede}</p>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div className="reveal" style={{ "--i": 0 } as CSSProperties}>
            <h4 className="display mb-2 text-xl italic">Problem</h4>
            <p className="text-[0.9375rem] leading-relaxed">{s.problem}</p>
          </div>
          <div className="reveal" style={{ "--i": 1 } as CSSProperties}>
            <h4 className="display mb-2 text-xl italic">How it works</h4>
            <p className="text-[0.9375rem] leading-relaxed">{s.how}</p>
          </div>
          <div className="reveal" style={{ "--i": 2 } as CSSProperties}>
            <h4 className="display mb-2 text-xl italic">Result</h4>
            <p className="text-[0.9375rem] leading-relaxed">
              {s.result}
              {s.resultCite ? <Cite source={sources[s.resultCite]} /> : null}
            </p>
            <div className="mt-5">
              <Stack items={s.stack} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Shorter project entries as a grid of colour tiles. */
function MoreProjects() {
  return (
    <article id="more-projects" className="pt-16 lg:pt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <p className="display text-6xl italic leading-none text-accent">{moreProjectsNumber}</p>
        <h3 className="display text-3xl">More projects</h3>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {miniProjects.map((project, index) => (
          <li
            key={project.name}
            className={`reveal ${tones[index % tones.length]} flex min-h-[22rem] flex-col justify-between gap-10 rounded-[var(--radius-tile)] p-7 sm:p-9`}
            style={{ "--i": index % 2 } as CSSProperties}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="display text-[clamp(2rem,1.4rem+1.8vw,3.25rem)]">{project.name}</p>
              <span className="meta shrink-0 rounded-full border border-rule px-3 py-1">{project.year}</span>
            </div>
            <div>
              <p className="meta mb-3">{project.role}</p>
              <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed">{project.description}</p>
              <div className="mt-5 border-t border-rule pt-4">
                <Stack items={project.stack} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="prose-col mt-8 text-muted">{alsoBuilt}</p>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto w-full max-w-[1280px] px-4 pt-24 sm:px-8 lg:pt-32">
      <h2 className="display text-[clamp(2.25rem,1.3rem+3vw,4rem)]">Selected work</h2>
      <div className="mt-10">
        <LeadStudy />
        {eqi30.published ? <MatrixStudy study={eqi30} /> : null}
        <ResearchStudy />
        <MoreProjects />
      </div>
    </section>
  );
}
