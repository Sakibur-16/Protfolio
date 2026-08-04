import { allProjects } from "@/data/projects";
import { publications } from "@/data/publications";
import { skillDomains } from "@/data/skills";
import { techRowTop, techRowBottom, type TechItem } from "@/data/techStack";
import { TechIcon } from "@/components/ui/TechIcon";

/**
 * Trust strip: real counters plus two counter-scrolling walls of glass icon
 * tiles.
 *
 * The reference design called for client logos, a "99+ happy clients" counter
 * and a star rating. None of that exists here, and inventing it would put
 * fabricated social proof on a real person's site — so the wall carries the
 * technology stack instead, and every counter is derived from real data.
 */
const stats = [
  { value: String(allProjects.length), label: "AI projects delivered" },
  { value: String(publications.length), label: "Peer-reviewed papers" },
  { value: String(skillDomains.length), label: "Technical domains" },
  { value: "2024", label: "Building AI since" },
];

/**
 * Four copies, translated by −50% (= two copies). Two copies of the full stack
 * are always wider than any viewport, so the band never runs out of tiles and
 * leaves dead space before the loop wraps.
 */
const COPIES = [0, 1, 2, 3];

function LogoRow({ items, reverse = false }: { items: TechItem[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask relative overflow-hidden py-1">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {COPIES.map((copy) => (
          // Only the first copy is exposed to assistive tech — the rest are
          // duplicates that exist purely to make the loop seamless.
          <ul key={copy} className="flex" aria-hidden={copy > 0 ? "true" : undefined}>
            {items.map((tech) => (
              <li key={`${copy}-${tech.name}`} className="marquee-item">
                <span className="icon-tile" title={tech.name}>
                  <TechIcon iconKey={tech.iconKey} colored className="h-7 w-7 sm:h-8 sm:w-8" />
                  {/* The mark is decorative; the name carries the meaning. */}
                  <span className="sr-only">{tech.name}</span>
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function TrustStrip() {
  return (
    <section
      aria-label="Capabilities and track record"
      className="relative border-y border-line bg-bg-alt py-14 sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-5 sm:gap-8 sm:px-10 lg:grid-cols-4 lg:px-16">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3.5">
        <LogoRow items={techRowTop} />
        <LogoRow items={techRowBottom} reverse />
      </div>
    </section>
  );
}
