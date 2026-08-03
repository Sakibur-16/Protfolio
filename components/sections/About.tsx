import { ArrowUpRight, Camera } from "lucide-react";
import { profile } from "@/data/profile";
import { skillDomains } from "@/data/skills";
import { education } from "@/data/education";
import { iconKeyForTech } from "@/data/techStack";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { TechIcon } from "@/components/ui/TechIcon";

/**
 * Skills, grouped rather than dumped.
 *
 * The previous version flattened every skill into one long chip cloud, which
 * read as noise. Collapsing the eight domains into four labelled clusters
 * keeps the same information but gives it a scannable hierarchy — a reader
 * can find "what does he use for retrieval" without parsing forty chips.
 */
const SKILL_CLUSTERS: { label: string; domainIds: string[] }[] = [
  { label: "AI & retrieval", domainIds: ["rag-agentic", "llm-applications"] },
  { label: "Language & generation", domainIds: ["nlp", "generative-ai"] },
  { label: "Vision & signals", domainIds: ["computer-vision", "bci"] },
  { label: "Engineering", domainIds: ["ml-foundations", "engineering"] },
];

const clusters = SKILL_CLUSTERS.map((cluster) => ({
  label: cluster.label,
  items: Array.from(
    new Set(
      cluster.domainIds.flatMap(
        (id) => skillDomains.find((domain) => domain.id === id)?.items ?? []
      )
    )
  ),
})).filter((cluster) => cluster.items.length > 0);

const degree = education[0];

export function About() {
  const [leadBio, ...restBio] = profile.bio;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-bg px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      <GlowBlob tone="cool" size="36rem" className="-right-32 top-10" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            {/*
              Portrait placeholder — swap this block for a real
              <Image src="/images/portrait.jpg" fill /> once a photo exists.
            */}
            <Reveal>
              <div className="gradient-border group relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-bg-raised">
                <div className="flex h-full w-full items-center justify-center">
                  <Camera className="h-10 w-10 text-muted" strokeWidth={1.25} aria-hidden="true" />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 50% 100%, var(--glow-a), transparent 65%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </Reveal>

            {/* Quick facts, so the left column carries information rather than
                just an image. */}
            <Reveal delay={0.1}>
              <dl className="mt-8 max-w-sm border-t border-line">
                {[
                  { label: "Based in", value: `${profile.location.city}, ${profile.location.country}` },
                  { label: "Focus", value: "RAG · Agentic AI · NLP" },
                  degree
                    ? { label: "Education", value: `BSc CSE — ${degree.institution}` }
                    : null,
                  { label: "Availability", value: profile.availability.label },
                ]
                  .filter((row): row is { label: string; value: string } => Boolean(row))
                  .map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                    >
                      <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                        {row.label}
                      </dt>
                      <dd className="text-right text-sm text-ink-dim">{row.value}</dd>
                    </div>
                  ))}
              </dl>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <Badge>About</Badge>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Reliable AI, <span className="text-gradient">not just impressive demos</span>.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink-dim">{leadBio}</p>
            </Reveal>

            {restBio.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.15 + i * 0.05}>
                <p className="mt-5 text-base leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <a
                href="#contact"
                data-cursor="interactive"
                className="btn-ghost group mt-9 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
              >
                Work with me
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Skill clusters — labelled columns instead of one flat chip cloud. */}
        <div className="mt-20 border-t border-line pt-12 sm:mt-24">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Toolkit
            </h3>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {clusters.map((cluster, i) => (
              <Reveal key={cluster.label} delay={Math.min(i, 3) * 0.05}>
                <div>
                  <p className="flex items-center gap-2.5 font-display text-base font-medium text-ink">
                    <span aria-hidden="true" className="accent-bar h-4 w-0.5 rounded-full" />
                    {cluster.label}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {cluster.items.map((item) => {
                      const iconKey = iconKeyForTech(item);
                      return (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                          {iconKey ? (
                            <TechIcon iconKey={iconKey} colored className="h-3.5 w-3.5" />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="h-1 w-1 shrink-0 rounded-full bg-line-strong"
                            />
                          )}
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
