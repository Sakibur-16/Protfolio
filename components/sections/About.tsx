import { ArrowUpRight, Camera } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  const [shortBio, ...restBio] = profile.bio;
  const longBio = restBio.join(" ");

  return (
    <section id="about" className="bg-bg px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
        <Reveal>
          <h2 className="font-display text-6xl font-medium leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">
            Hey!
          </h2>
        </Reveal>

        {/*
          Bio portrait placeholder — swap for a real <Image> (e.g.
          /public/images/portrait-bio.jpg) once available. On hover this
          reveals a red-lit version via a CSS filter + gradient overlay
          transition, per the design spec.
        */}
        <Reveal delay={0.05} className="group mx-auto">
          <div className="relative h-56 w-44 overflow-hidden rounded-3xl bg-bg-alt ring-1 ring-line sm:h-72 sm:w-56">
            <div className="flex h-full w-full items-center justify-center grayscale brightness-75 transition-[filter] duration-500 ease-out group-hover:grayscale-0 group-hover:brightness-100">
              <Camera className="h-10 w-10 text-muted" strokeWidth={1.25} aria-hidden="true" />
            </div>
            <div
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-color transition-opacity duration-500 ease-out group-hover:opacity-70"
              style={{
                background: "radial-gradient(120% 120% at 50% 100%, var(--red) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <p className="text-lg leading-relaxed text-ink sm:text-xl">{shortBio}</p>
          <a
            href="#contact"
            data-cursor="interactive"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            Get started
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>

      {longBio ? (
        <Reveal delay={0.15} className="mx-auto mt-16 w-full max-w-6xl lg:mt-24">
          <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg lg:ml-auto lg:text-right">
            {longBio}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
