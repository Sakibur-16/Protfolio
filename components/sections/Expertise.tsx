import { skillDomains } from "@/data/skills";
import { Reveal } from "@/components/motion/Reveal";

export function Expertise() {
  return (
    <section id="services" className="bg-bg px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal blur>
          <h2 className="font-display text-5xl font-medium tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Services
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-t border-line">
          {skillDomains.map((skill, i) => (
            <Reveal key={skill.id} delay={i * 0.04}>
              <div className="group flex flex-col gap-3 rounded-2xl px-4 py-8 transition-colors duration-300 hover:bg-bg-alt sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  {skill.domain}
                </h3>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted sm:justify-end sm:text-right">
                  {skill.items.map((item, idx) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      {item}
                      {idx < skill.items.length - 1 ? (
                        <span aria-hidden="true" className="text-line-strong">
                          &middot;
                        </span>
                      ) : null}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
