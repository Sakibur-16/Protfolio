import type { CSSProperties, ReactNode } from "react";
import { Cite } from "@/components/site/Cite";
import { sources } from "@/data/sources";
import {
  eqi30,
  malaria,
  quranity,
  quranityFallback,
  quranitySteps,
  rise,
  type CaseStudy,
} from "@/data/work";

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
      <figcaption className="mt-8 flex gap-4 border-l-2 border-accent pl-4 text-[0.9375rem]">
        <span className="meta shrink-0 pt-0.5 text-accent">Step 3</span>
        <span>{quranityFallback}</span>
      </figcaption>
    </figure>
  );
}

/** 01: the lead study. Sticky title rail on the left, long form on the right. */
function LeadStudy() {
  const s = quranity;
  return (
    <article id={s.id} className="grid gap-10 border-t border-ink py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <p className="display text-[clamp(4.5rem,3rem+6vw,8rem)] italic leading-none text-accent">{s.number}</p>
          <h3 className="display mt-4 text-3xl">{s.title}</h3>
          <div className="mt-5">
            <MetaList study={s} />
          </div>
          {s.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link mt-4 inline-block text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} ↗
            </a>
          ))}
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
    </article>
  );
}

/** 02 and 03: two studies side by side, divided by a hairline. */
function PairedStudy({ study }: { study: CaseStudy }) {
  const sections: { title: string; body: string }[] = [
    { title: "Problem", body: study.problem },
    { title: "How it works", body: study.how },
    ...(study.hard ? [{ title: "The hard part", body: study.hard }] : []),
    { title: "Result", body: study.result },
  ];
  return (
    <article
      id={study.id}
      className="reveal border-t border-ink py-12 lg:px-10 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-l-rule"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="display text-6xl italic leading-none text-accent">{study.number}</p>
        <MetaList study={study} />
      </div>
      <h3 className="display mt-6 text-3xl">{study.title}</h3>
      <p className="display mt-3 max-w-[26ch] text-xl text-muted">{study.lede}</p>
      <div className="mt-8 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="display mb-1 text-lg italic">{section.title}</h4>
            <p className="prose-col text-[0.9375rem] leading-relaxed">{section.body}</p>
          </div>
        ))}
        <div>
          <h4 className="display mb-2 text-lg italic">Stack</h4>
          <Stack items={study.stack} />
        </div>
      </div>
    </article>
  );
}

/** 04: the research study. The question is the headline, three short columns follow. */
function ResearchStudy() {
  const s = malaria;
  return (
    <article id={s.id} className="border-t border-ink py-16 lg:py-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <p className="display text-6xl italic leading-none text-accent">{s.number}</p>
        <p className="meta">
          {s.title} · {s.year} · {s.role}
        </p>
      </div>
      <p className="display reveal mt-8 max-w-[22ch] text-[clamp(2rem,1.2rem+3.4vw,4.25rem)]">{s.lede}</p>
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
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto w-full max-w-[1280px] px-4 pt-24 sm:px-8 lg:pt-32">
      <h2 className="display text-[clamp(2rem,1.3rem+2.6vw,3.5rem)]">Selected work</h2>
      <div className="mt-10">
        <LeadStudy />
        <div className="grid lg:grid-cols-2">
          <PairedStudy study={eqi30} />
          <PairedStudy study={rise} />
        </div>
        <ResearchStudy />
      </div>
    </section>
  );
}
