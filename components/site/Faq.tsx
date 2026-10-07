import { faq, faqIntro } from "@/data/faq";
import { contact } from "@/data/site";

export function Faq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-[1280px] px-4 pt-24 sm:px-8 lg:pt-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="display text-[clamp(2.25rem,1.3rem+3vw,4rem)]">{faqIntro.title}</h2>
            <p className="prose-col mt-5 text-muted">{faqIntro.text}</p>
            <a href={`mailto:${contact.email}`} className="link mt-6 inline-block">
              Ask me something else →
            </a>
          </div>
        </div>
        <div className="draw-top lg:col-span-7">
          {faq.map((item) => (
            <details key={item.q} className="faq-item reveal border-b border-rule">
              <summary className="flex items-center justify-between gap-6 py-6 text-lg font-medium">
                {item.q}
                <span
                  className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border border-rule text-xl leading-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="faq-body prose-col pb-7 pr-12 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
