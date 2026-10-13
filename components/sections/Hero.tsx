import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { RollingText } from "@/components/ui/RollingText";
import { ContactGrid } from "@/components/ui/ContactGrid";
import { GlitchBlock } from "@/components/ui/GlitchBlock";
import { GlitchWord } from "@/components/ui/GlitchWord";
import { HeroSceneMount } from "@/components/three/HeroSceneMount";

/**
 * Intro and about in one screen: what I do, a short paragraph in my own voice,
 * two actions, a glance row, and a portrait. The particle field sits behind the
 * copy and stays pointer-transparent.
 */
/** "real users" glitches by itself every 6 to 9 seconds, as well as on hover. */
const AUTO_GLITCH_MS: [number, number] = [6000, 9000];

export function Hero() {
  const glance = [
    { label: "Currently", value: profile.roleTitle },
    { label: "Focus", value: "RAG, agents, NLP" },
    { label: "Based in", value: `${profile.location.city}, ${profile.location.country}` },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-16"
    >
      <GlowBlob tone="warm" size="40rem" className="-left-40 -top-32 opacity-90" />
      <GlowBlob tone="cool" size="44rem" className="-right-48 top-1/3 opacity-90" />

      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroSceneMount />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(56% 50% at 30% 50%, color-mix(in srgb, var(--bg) 88%, transparent) 0%, transparent 74%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            <span aria-hidden="true" className="h-px w-6 accent-bar" />
            AI Developer
          </p>

          <h1 className="mt-5 max-w-2xl font-display text-[2.5rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            I build RAG and agent systems that ship to{" "}
            <span className="text-gradient">
              <GlitchWord text="real users" everyMs={AUTO_GLITCH_MS} />
            </span>.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg">
            I&rsquo;m Sakibur, an AI developer at Sparktech Agency in Dhaka. I build RAG pipelines,
            agents and chat assistants for client apps, and I&rsquo;ve led the AI work on more than
            15 of them. I also publish research in medical imaging and brain-computer interfaces.
          </p>

          {/* Two stacked buttons | divider | 2x2 icon buttons with the CV bar below. */}
          <div className="mt-8 flex flex-col gap-5 sm:mt-10 lg:flex-row lg:items-stretch lg:gap-6">
            <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-start lg:justify-center">
              <Button href="#contact" className="group">
                <RollingText text="Contact me" />
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>
              <Button href="#work" variant="ghost" className="group">
                <RollingText text="See my work" />
              </Button>
            </div>

            <span aria-hidden="true" className="h-px w-full bg-line-strong lg:h-auto lg:w-px" />

            <ContactGrid className="max-w-[22rem] lg:w-auto lg:max-w-none" />
          </div>

          <dl className="mt-10 grid w-full max-w-xl grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
            {glance.map((row) => (
              <div key={row.label}>
                <GlitchBlock
                  as="dt"
                  className="block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted"
                  segments={[{ text: row.label }]}
                />
                <GlitchBlock
                  as="dd"
                  className="mt-1.5 block text-sm text-ink-dim"
                  segments={[{ text: row.value }]}
                />
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-bg-raised lg:mx-0 lg:justify-self-end">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/sakibur.jpg"
              alt="Portrait of Md. Sakibur Rahman"
              fill
              priority
              sizes="(min-width: 1024px) 384px, 90vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="border-t border-line p-5">
            <GlitchBlock
              as="p"
              className="font-display text-lg font-semibold tracking-tight text-ink"
              segments={[{ text: profile.fullName }]}
            />
            <GlitchBlock
              as="p"
              className="mt-1 text-sm text-muted"
              segments={[{ text: profile.roleTitle }]}
            />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
