import { contact } from "@/data/site";

const elsewhere = [
  { label: "LinkedIn", href: contact.linkedin },
  { label: "GitHub", href: contact.github },
  { label: "Google Scholar", href: contact.scholar },
] as const;

/** The closing band. `band` swaps the colour tokens, so this block is inverted in both themes. */
export function Contact() {
  return (
    <section id="contact" className="band mt-24 lg:mt-32">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-8 lg:py-28">
        <h2 className="display reveal max-w-[20ch] text-[clamp(2.25rem,1.3rem+3.4vw,4.5rem)]">
          Building something that needs answers you can trace?
        </h2>
        <a
          href={`mailto:${contact.email}`}
          className="display reveal mt-10 inline-block text-[clamp(1.35rem,0.4rem+4.4vw,4rem)] italic text-accent underline decoration-2 underline-offset-[0.12em] [overflow-wrap:anywhere] hover:decoration-4"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {contact.email}
        </a>
        <p className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted" style={{ "--i": 2 } as React.CSSProperties}>
          {elsewhere.map((item) => (
            <a key={item.label} className="link" href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label} ↗
            </a>
          ))}
          <span>Based in {contact.location}</span>
        </p>
      </div>
    </section>
  );
}
