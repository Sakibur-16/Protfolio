import { ScrollLit } from "@/components/site/ScrollLit";
import { publications } from "@/data/publications";

// Every claim here is from the owner's CV, the Quranity answers, or the paper list.
const text =
  "I build AI that can point to its sources. At Sparktech Agency I own production RAG and agentic RAG pipelines for client apps. Qalam, the assistant inside Quranity, answers from the Qur’an and Hadith with the reference attached. My research on malaria diagnosis, code summarization and brain-computer interfaces has been published at Springer and IEEE.";

const facts = [
  { value: "15+", label: "live and production-ready applications led" },
  { value: String(publications.length), label: "peer-reviewed papers" },
] as const;

export function Intro() {
  return (
    <section id="about" className="mx-auto w-full max-w-[1100px] px-4 pt-24 sm:px-8 lg:pt-36">
      <ScrollLit
        text={text}
        className="display text-[clamp(1.65rem,1rem+2.6vw,3.25rem)] !font-medium !leading-[1.18] !tracking-[-0.03em]"
      />
      <dl className="reveal mt-14 flex flex-wrap gap-x-14 gap-y-8 border-t border-rule pt-8">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-center gap-4">
            <dt className="display text-5xl text-accent">{fact.value}</dt>
            <dd className="meta max-w-[12rem] leading-snug">{fact.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
