import { ArrowUpRight } from "lucide-react";
import { publications } from "@/data/publications";
import { education } from "@/data/education";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Peer-reviewed work, plus education as a supporting column.
 *
 * Link buttons only render when a DOI or paper URL actually exists — an
 * entry with no link stays a plain citation rather than a dead affordance.
 */
export function Research() {
  const [degree, ...earlierEducation] = education;

  return (
    <section id="research" className="bg-bg-alt px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal blur>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Research
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {publications.length} peer-reviewed publications across medical image diagnostics,
            source-code understanding, and brain–computer interfaces.
          </p>
        </Reveal>

        <ol className="mt-12 border-t border-line sm:mt-16">
          {publications.map((paper, i) => {
            const link = paper.doiUrl ?? paper.paperUrl;
            return (
              <Reveal as="li" key={paper.id} delay={i * 0.05}>
                <article className="grid grid-cols-1 gap-3 border-b border-line py-8 lg:grid-cols-[4rem_1fr_auto] lg:gap-8">
                  <p className="font-mono text-xs tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>

                  <div>
                    <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-ink sm:text-xl">
                      {paper.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {paper.venue} · {paper.affiliation}
                    </p>
                  </div>

                  <div className="flex items-start gap-4 lg:justify-end">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">
                      {paper.authorRole}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-muted">{paper.year}</span>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="interactive"
                        aria-label={`Read: ${paper.title}`}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-[transform,background-color,color] duration-300 ease-[var(--ease-editorial)] hover:-translate-y-0.5 hover:bg-ink hover:text-bg"
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>

        {degree && (
          <Reveal delay={0.1}>
            <div className="mt-16 grid grid-cols-1 gap-6 border-t border-line pt-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Education</h3>

              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4 className="font-display text-xl font-medium tracking-tight text-ink">
                      {degree.institution}
                    </h4>
                    <p className="font-mono text-xs tabular-nums text-muted">
                      {degree.startDate} — {degree.endDate}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {degree.credential}
                    {degree.gpa ? ` · GPA ${degree.gpa}` : ""}
                  </p>

                  {degree.coreAreas.length > 0 && (
                    <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted">
                      {degree.coreAreas.map((area, idx) => (
                        <span key={area}>
                          {area}
                          {idx < degree.coreAreas.length - 1 && (
                            <span aria-hidden="true" className="ml-2 text-line-strong">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  )}

                  {degree.activities && degree.activities.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-1.5">
                      {degree.activities.map((activity) => (
                        <li key={activity} className="flex gap-3 text-sm text-muted">
                          <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {earlierEducation.length > 0 && (
                  <ul className="flex flex-col gap-3 border-t border-line pt-6">
                    {earlierEducation.map((entry) => (
                      <li
                        key={entry.id}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                      >
                        <span className="text-sm text-ink">{entry.institution}</span>
                        <span className="text-sm text-muted">{entry.credential}</span>
                        <span className="font-mono text-xs tabular-nums text-muted">
                          {entry.startDate} — {entry.endDate}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
