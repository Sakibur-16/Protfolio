import { publications } from "@/data/publications";
import { contact } from "@/data/site";
import { paperSources } from "@/data/sources";
import { earlierResearch } from "@/data/work";

const byId = new Map(publications.map((p) => [p.id, p]));
const ids = ["malaria-diagnosis-generalization", "transformer-code-summarization", "neural-command-bci"] as const;

/** A reference list, typeset like one: hanging numbers, title first, venue in mono. */
export function Research() {
  return (
    <section id="research" className="mx-auto w-full max-w-[1280px] px-4 pt-24 sm:px-8 lg:pt-32">
      <h2 className="display text-[clamp(2rem,1.3rem+2.6vw,3.5rem)]">Research</h2>
      <p className="prose-col mt-4 text-muted">
        Three peer-reviewed papers: medical imaging, code understanding, and brain-computer interfaces.{" "}
        <a className="link" href={contact.scholar} target="_blank" rel="noopener noreferrer">
          Google Scholar ↗
        </a>
      </p>
      <ol className="mt-10 border-t border-ink">
        {ids.map((id, index) => {
          const paper = byId.get(id);
          const source = paperSources[index];
          if (!paper || !paper.doiUrl) return null;
          return (
            <li
              key={id}
              id={`paper-${source.n}`}
              className="reveal grid gap-x-8 gap-y-2 border-b border-rule py-8 md:grid-cols-[5rem_1fr_19rem]"
            >
              <span className="display text-4xl italic leading-none text-accent">[{source.n}]</span>
              <h3 className="display max-w-[34ch] text-[clamp(1.35rem,1.1rem+0.8vw,1.85rem)]">
                <a
                  href={paper.doiUrl}
                  className="underline decoration-rule decoration-1 underline-offset-[0.2em] hover:decoration-accent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {paper.title}
                </a>
              </h3>
              <p className="meta md:text-right">
                {paper.authorRole}
                <br />
                {paper.venue}
                <br />
                {paper.affiliation} · {paper.year}
              </p>
            </li>
          );
        })}
        <li className="reveal grid gap-x-8 gap-y-2 border-b border-rule py-8 md:grid-cols-[5rem_1fr_19rem]">
          <span className="meta pt-2">{earlierResearch.years}</span>
          <div>
            <h3 className="display text-[clamp(1.2rem,1rem+0.6vw,1.5rem)]">{earlierResearch.title}</h3>
            <p className="prose-col mt-2 text-[0.9375rem] text-muted">{earlierResearch.text}</p>
          </div>
          <p className="meta md:text-right">{earlierResearch.stack.join(" · ")}</p>
        </li>
      </ol>
    </section>
  );
}
