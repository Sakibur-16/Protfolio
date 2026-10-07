import { contact } from "@/data/site";

const elsewhere = [
  { label: "LinkedIn", href: contact.linkedin },
  { label: "GitHub", href: contact.github },
  { label: "Google Scholar", href: contact.scholar },
] as const;

export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-[1280px] px-4 pb-24 pt-24 sm:px-8 lg:pb-32 lg:pt-32">
      <div className="border-t border-ink pt-12">
        <h2 className="display reveal max-w-[20ch] text-[clamp(2rem,1.3rem+2.6vw,3.5rem)]">
          Building something that needs answers you can trace?
        </h2>
        <a
          href={`mailto:${contact.email}`}
          className="display reveal mt-8 inline-block text-[clamp(1.35rem,0.4rem+4.4vw,4rem)] italic text-accent underline decoration-1 underline-offset-[0.12em] [overflow-wrap:anywhere] hover:decoration-2"
        >
          {contact.email}
        </a>
        <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
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
