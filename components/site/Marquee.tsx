const affiliations = [
  "Springer",
  "IEEE",
  "Sparktech Agency",
  "Acote Group",
  "East West University",
  "Google Play",
  "App Store",
] as const;

function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className={`flex shrink-0 items-center ${duplicate ? "marquee-dup" : ""}`} aria-hidden={duplicate || undefined}>
      {affiliations.map((name) => (
        <li key={name} className="flex items-center">
          <span className="display whitespace-nowrap px-8 text-[clamp(1.4rem,1rem+1.4vw,2.25rem)] text-ink/90">
            {name}
          </span>
          <span aria-hidden="true" className="text-accent">
            /
          </span>
        </li>
      ))}
    </ul>
  );
}

/** A slow row of the places the work has been published, shipped and learned. Every name is a real affiliation. */
export function Marquee() {
  return (
    <section aria-label="Where the work has been published, shipped and learned" className="pt-14 lg:pt-20">
      <p className="meta mb-6 text-center">Published, shipped and trained at</p>
      <div className="marquee">
        <div className="marquee-track">
          <Row />
          <Row duplicate />
        </div>
      </div>
    </section>
  );
}
