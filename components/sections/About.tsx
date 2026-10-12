import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/Reveal";

const highlights = [
  "AI Developer at Sparktech Agency, Dhaka",
  "RAG and agentic RAG pipelines, LLM integrations, NLP",
  "Led the AI work on 15+ live and production-ready apps",
  "Published at Springer and IEEE conferences",
  "BSc in CSE, East West University (CGPA 3.56)",
];

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-line bg-bg px-5 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">About</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl">
              Building AI from data to production
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 border-t border-line">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-line py-3.5 text-sm text-ink-dim"
                >
                  <span aria-hidden="true" className="accent-bar mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5">
          {profile.bio.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delay={0.05 + i * 0.04}>
              <p
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-ink"
                    : "text-base leading-relaxed text-ink-dim"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
