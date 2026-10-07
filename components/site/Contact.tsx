import type { CSSProperties } from "react";
import { Backdrop } from "@/components/site/Backdrop";
import { contact } from "@/data/site";

const elsewhere = [
  { label: "LinkedIn", href: contact.linkedin },
  { label: "GitHub", href: contact.github },
  { label: "Google Scholar", href: contact.scholar },
] as const;

/** The closing card. Always dark, with the email as the headline of the block. */
export function Contact() {
  return (
    <section id="contact" className="px-3 pb-3 pt-24 sm:px-4 lg:pt-32">
      <div className="on-dark relative isolate mx-auto max-w-[1480px] overflow-hidden rounded-[var(--radius-frame)]">
        <Backdrop src="/work/hero-sheets.jpg" speed={0.05} className="object-[80%_40%] opacity-70" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0b101e] via-[#0b101e]/80 to-[#0b101e]/25"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 lg:py-24">
          <h2 className="display reveal max-w-[18ch] text-[clamp(2.25rem,1.2rem+3.6vw,4.75rem)]">
            Building something that needs answers you can trace?
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="display reveal mt-10 inline-block text-[clamp(1.35rem,0.4rem+4.2vw,3.75rem)] italic text-accent underline decoration-2 underline-offset-[0.14em] [overflow-wrap:anywhere] hover:decoration-4"
            style={{ "--i": 1 } as CSSProperties}
          >
            {contact.email}
          </a>
          <div className="reveal mt-10 flex flex-wrap items-center gap-3" style={{ "--i": 2 } as CSSProperties}>
            {elsewhere.map((item) => (
              <a key={item.label} className="btn btn-ghost" href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label} ↗
              </a>
            ))}
          </div>
          <p className="meta mt-8">Based in {contact.location}</p>
        </div>
      </div>
    </section>
  );
}
