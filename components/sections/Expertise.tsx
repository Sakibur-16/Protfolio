import { services } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { GlowBlob } from "@/components/ui/GlowBlob";

/** What I take on: one row per service, with three concrete points each. */
export function Expertise() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-bg-alt px-5 py-20 sm:px-10 sm:py-32 lg:px-16"
    >
      <GlowBlob tone="warm" size="38rem" className="-left-40 top-1/4" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <Badge>What I do</Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            From data to a <span className="text-gradient">deployed service</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Here is what I can build for you.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-line sm:mt-14">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={Math.min(i, 4) * 0.04}>
              <article className="grid grid-cols-1 gap-x-12 gap-y-5 border-b border-line py-8 sm:py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {service.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-3 lg:pt-1.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-ink-dim sm:text-base">
                      <span
                        aria-hidden="true"
                        className="accent-bar mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-base text-muted">
            Not sure which fits?{" "}
            <a
              href="#contact"
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              Describe your project
            </a>{" "}
            and I&rsquo;ll suggest the right scope.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
