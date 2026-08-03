import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { HeroSceneMount } from "@/components/three/HeroSceneMount";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlowBlob } from "@/components/ui/GlowBlob";

/**
 * Full-bleed hero.
 *
 * Layering, back to front: ambient glow blobs -> diagonal light streaks ->
 * the WebGL particle field -> a readability wash -> content. Everything
 * behind the content is decorative and pointer-transparent.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:px-16"
    >
      {/* Ambient cinematic glow */}
      <GlowBlob tone="warm" size="40rem" className="-left-40 -top-32 opacity-90" />
      <GlowBlob tone="cool" size="44rem" className="-right-48 top-1/3 opacity-90" />

      {/* Diagonal light streaks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="light-streak left-[-10%] top-[12%] h-[26rem] w-[38rem]" />
        <span className="light-streak right-[-14%] bottom-[6%] h-[22rem] w-[34rem]" />
      </div>

      {/* WebGL field */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroSceneMount />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 40% at 42% 50%, color-mix(in srgb, var(--bg) 82%, transparent) 0%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col items-start">
          <Badge pulse>{profile.availability.label}</Badge>

          <h1 className="mt-7 max-w-2xl font-display text-[2.9rem] font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            I build AI that{" "}
            <span className="text-gradient">reasons, retrieves, and acts</span>.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg">
            {profile.roleTitle} in {profile.location.city}. Production RAG and agentic systems,
            NLP, and applied research — built to be reliable and explainable, not just
            impressive in a demo.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#contact">
              Book a call
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button href="#work" variant="ghost">
              View work
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {profile.taglines.map((tagline) => (
              <li key={tagline} className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                {tagline}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column intentionally left to the 3D field on desktop —
            the scene is the visual, so nothing competes with it here. */}
        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </section>
  );
}
