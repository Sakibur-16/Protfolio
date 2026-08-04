import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { allProjects } from "@/data/projects";
import { HeroSceneMount } from "@/components/three/HeroSceneMount";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { RollingText } from "@/components/ui/RollingText";

/**
 * Full-bleed hero.
 *
 * Layering, back to front: ambient glow blobs -> diagonal light streaks ->
 * the WebGL particle field -> a readability wash -> content. Everything
 * behind the content is decorative and pointer-transparent.
 *
 * The right column carries a "currently" spec card rather than being left to
 * the 3D field alone. An empty half looked unfinished at desktop widths, and
 * the card answers the three things a visitor actually wants in the first
 * five seconds — what he does now, where, and whether he's available — using
 * the same glance-card language as the case-study pages.
 */
export function Hero() {
  const glance = [
    { label: "Currently", value: profile.roleTitle },
    { label: "Based in", value: `${profile.location.city}, ${profile.location.country}` },
    { label: "Focus", value: "RAG · Agentic AI · NLP" },
  ];

  const counters = [
    { value: String(allProjects.length), label: "Projects" },
    { value: String(publications.length), label: "Papers" },
    { value: "2024", label: "Since" },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-16"
    >
      <GlowBlob tone="warm" size="40rem" className="-left-40 -top-32 opacity-90" />
      <GlowBlob tone="cool" size="44rem" className="-right-48 top-1/3 opacity-90" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="light-streak left-[-10%] top-[12%] h-[26rem] w-[38rem]" />
        <span className="light-streak bottom-[6%] right-[-14%] h-[22rem] w-[34rem]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroSceneMount />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 40% at 40% 50%, color-mix(in srgb, var(--bg) 84%, transparent) 0%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <Badge pulse>{profile.availability.label}</Badge>

          <h1 className="mt-6 max-w-2xl font-display text-[2.5rem] font-semibold leading-[1.02] tracking-tight text-ink sm:mt-7 sm:text-6xl lg:text-7xl">
            I build AI that{" "}
            <span className="text-gradient">reasons, retrieves, and acts</span>.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-dim sm:mt-6 sm:text-lg">
            Production RAG and agentic systems, NLP, and applied research — built to be reliable
            and explainable, not just impressive in a demo.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <Button href="#contact" className="group">
              <RollingText text="Contact me" />
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button href="#work" variant="ghost" className="group">
              <RollingText text="View work" />
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 sm:mt-12 sm:gap-x-8">
            {profile.taglines.map((tagline) => (
              <li
                key={tagline}
                className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted sm:text-[0.7rem]"
              >
                {tagline}
              </li>
            ))}
          </ul>
        </div>

        {/* Spec card — fills the right column with information, not decoration. */}
        <aside className="liquid-glass w-full rounded-3xl p-6 sm:p-7">
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                At a glance
              </p>
              <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-warm">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
                </span>
                Available
              </span>
            </div>

            <dl className="mt-6 flex flex-col">
              {glance.map((row) => (
                <div key={row.label} className="border-t border-line py-3.5 first:border-t-0 first:pt-0">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    {row.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
              {counters.map((counter) => (
                <div key={counter.label}>
                  <p className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {counter.value}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
                    {counter.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
