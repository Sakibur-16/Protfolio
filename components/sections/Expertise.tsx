import { skillDomains } from "@/data/skills";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { GlowBlob } from "@/components/ui/GlowBlob";

/** Capability cards, one per technical domain. */
export function Expertise() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-bg-alt px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      <GlowBlob tone="warm" size="38rem" className="-left-40 top-1/4" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <Badge>What I do</Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            The <span className="text-gradient">AI layer</span>, end to end.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {skillDomains.map((skill, i) => (
            <Reveal key={skill.id} delay={Math.min(i, 5) * 0.05}>
              <article className="gradient-border group h-full rounded-3xl border border-line bg-bg-raised p-6 transition-transform duration-500 ease-[var(--ease-editorial)] hover:-translate-y-1.5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-4 font-display text-xl font-medium leading-snug tracking-tight text-ink">
                  {skill.domain}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">{skill.description}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-bg px-2.5 py-1 font-mono text-[0.6rem] tracking-wide text-ink-dim"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
