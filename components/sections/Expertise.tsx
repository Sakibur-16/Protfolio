import { skillDomains } from "@/data/skills";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Capabilities as a numbered editorial index.
 *
 * This was a three-column card grid, which put it in the same visual register
 * as the projects grid two sections later and left the type cramped — a 20px
 * title over 14px body over 10px tags, all fighting inside one small box.
 *
 * As an index the hierarchy has room: an oversized ordinal, a large domain
 * title, and the description given its own column. Rows are wide and quiet,
 * so the section reads as a table of contents for the work rather than as
 * another deck of cards.
 */
export function Expertise() {
  return (
    <section id="services" className="bg-bg px-5 py-20 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              What I do
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-muted">
              {skillDomains.length} domains, from retrieval and reasoning down to the
              infrastructure that keeps them running.
            </p>
          </div>
        </Reveal>

        <ol>
          {skillDomains.map((skill, i) => (
            <Reveal key={skill.id} delay={Math.min(i, 5) * 0.04}>
              <li className="group grid grid-cols-1 gap-x-10 gap-y-4 border-b border-line py-8 transition-[background-color,padding] duration-500 ease-[var(--ease-editorial)] hover:bg-bg-alt hover:px-4 sm:py-10 lg:grid-cols-[4rem_minmax(0,20rem)_1fr]">
                <span className="font-mono text-sm tabular-nums text-muted transition-colors duration-300 group-hover:text-warm">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                  {skill.domain}
                </h3>

                <div>
                  <p className="max-w-2xl text-base leading-relaxed text-muted">
                    {skill.description}
                  </p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.72rem] text-ink-dim">
                    {skill.items.map((item, idx) => (
                      <span key={item} className="inline-flex items-center gap-3">
                        {item}
                        {idx < skill.items.length - 1 && (
                          <span aria-hidden="true" className="text-line-strong">
                            /
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
