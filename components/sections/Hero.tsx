import { Camera } from "lucide-react";
import { profile } from "@/data/profile";

const currentYear = new Date().getFullYear();

/** Small 4-point star accent with an iridescent (purple -> blue -> silver) gradient stroke. */
function StarAccent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="iridescent-star" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--iridescent-1)" />
          <stop offset="50%" stopColor="var(--iridescent-2)" />
          <stop offset="100%" stopColor="var(--iridescent-3)" />
        </linearGradient>
      </defs>
      <path
        d="M24 2c1.2 8.8 3 15.6 5.4 18S37.2 22.8 46 24c-8.8 1.2-15.6 3-18 5.4S24.8 37.2 24 46c-1.2-8.8-3-15.6-5.4-18S10.8 25.2 2 24c8.8-1.2 15.6-3 18-5.4S23.2 10.8 24 2Z"
        stroke="url(#iridescent-star)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small lightning-bolt accent with an iridescent (purple -> blue -> silver) gradient stroke. */
function BoltAccent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="iridescent-bolt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--iridescent-1)" />
          <stop offset="50%" stopColor="var(--iridescent-2)" />
          <stop offset="100%" stopColor="var(--iridescent-3)" />
        </linearGradient>
      </defs>
      <path
        d="M20 2 4 27h10L12 46l16-25H18L20 2Z"
        stroke="url(#iridescent-bolt)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-bg px-6 pb-8 pt-32 sm:px-10 lg:px-16"
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center text-center">
        <StarAccent className="absolute -top-4 left-0 h-8 w-8 sm:h-10 sm:w-10 lg:left-8" />
        <BoltAccent className="absolute -bottom-6 right-0 h-10 w-7 sm:h-12 sm:w-8 lg:right-8" />

        <h1 className="font-display text-[13vw] font-medium leading-[0.92] tracking-tight text-ink sm:text-[9vw] lg:text-[6.5rem]">
          <span className="block">{profile.headline}</span>
          <span className="block text-muted">{profile.roleTitle}</span>
        </h1>

        {/*
          Portrait placeholder — swap this div for a real <Image> pointing at
          /public/images/portrait.jpg (or similar) once a photo is available.
          Keep the rounded-corner treatment and roughly this aspect ratio.
        */}
        <div className="relative z-10 mt-6 h-40 w-32 overflow-hidden rounded-2xl bg-bg-alt shadow-sm ring-1 ring-line sm:h-56 sm:w-44 lg:h-64 lg:w-52">
          <div className="flex h-full w-full items-center justify-center">
            <Camera className="h-8 w-8 text-muted sm:h-10 sm:w-10" strokeWidth={1.25} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex w-full items-end justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <span>&copy;{currentYear}</span>
        <span>{profile.taglines[0] ?? profile.roleTitle}</span>
      </div>
    </section>
  );
}
