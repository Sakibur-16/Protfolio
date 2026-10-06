import { Cite } from "@/components/site/Cite";
import { contact } from "@/data/site";
import { sources } from "@/data/sources";

const contents = [
  { n: "01", label: "Quranity", note: "2024", href: "#quranity" },
  { n: "02", label: "EQi30", note: "2025", href: "#eqi30" },
  { n: "03", label: "Rise", note: "2025", href: "#rise" },
  { n: "04", label: "Malaria diagnosis", note: "2025", href: "#malaria" },
  { n: "05", label: "Research", note: "3 papers", href: "#research" },
  { n: "06", label: "Experience", note: "2024 on", href: "#experience" },
  { n: "07", label: "Contact", note: "", href: "#contact" },
] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[calc(100dvh-65px)] w-full max-w-[1280px] flex-col justify-between gap-16 px-4 pb-12 pt-12 sm:px-8 lg:pt-16"
    >
      <h1 className="display rise max-w-[16ch] text-[clamp(2.6rem,1rem+6.4vw,5.5rem)]" style={{ "--i": 0 } as React.CSSProperties}>
        AI answers that show their <em className="text-accent">sources.</em>
        <Cite source={sources.quranity} hero />
      </h1>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="rise lg:col-span-6" style={{ "--i": 2 } as React.CSSProperties}>
          <p className="prose-col text-lg">
            I’m Sakibur Rahman, an AI developer at Sparktech Agency.
            <Cite source={sources.sparktech} /> I build RAG and agentic systems with answers traceable to sources.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-primary">
              Read the work
            </a>
            <a href={`mailto:${contact.email}`} className="btn">
              Email me
            </a>
          </div>
        </div>

        <nav
          aria-label="Contents"
          className="rise lg:col-span-5 lg:col-start-8"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <p className="meta border-b border-ink pb-2">Contents</p>
          <ol>
            {contents.map((item) => (
              <li key={item.n}>
                <a
                  href={item.href}
                  className="group flex items-baseline gap-3 border-b border-rule py-2.5 hover:text-accent"
                >
                  <span className="meta w-6 shrink-0">{item.n}</span>
                  <span className="display text-xl">{item.label}</span>
                  <span aria-hidden="true" className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-rule" />
                  <span className="meta shrink-0">{item.note}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
