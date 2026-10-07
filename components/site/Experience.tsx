import { Cite } from "@/components/site/Cite";
import { education, experience, experienceIntro } from "@/data/experience";
import { sources } from "@/data/sources";

export function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-[1280px] px-4 pt-24 sm:px-8 lg:pt-32">
      <h2 className="display text-[clamp(2rem,1.3rem+2.6vw,3.5rem)]">Experience</h2>
      <p className="prose-col mt-4 text-muted">{experienceIntro}</p>
      <ul className="mt-10 border-t border-ink">
        {experience.map((entry, index) => (
          <li
            key={entry.id}
            className="reveal grid gap-x-8 gap-y-1 border-b border-rule py-5 md:grid-cols-[15rem_1fr]"
          >
            <p className="meta md:pt-1.5">{entry.dates}</p>
            <div>
              <p className="display text-2xl">
                {entry.role}, {entry.organization}
                {index === 0 ? <Cite source={sources.sparktech} /> : null}
              </p>
              <p className="prose-col mt-1 text-[0.9375rem] text-muted">{entry.summary}</p>
              {entry.note ? <p className="meta mt-2 text-accent">{entry.note}</p> : null}
            </div>
          </li>
        ))}
        <li className="reveal grid gap-x-8 gap-y-1 border-b border-rule py-5 md:grid-cols-[15rem_1fr]">
          <p className="meta md:pt-1.5">{education.dates}</p>
          <div>
            <p className="display text-2xl">{education.title}</p>
            <p className="mt-1 text-[0.9375rem] text-muted">{education.detail}</p>
          </div>
        </li>
      </ul>
    </section>
  );
}
