import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  code,
  eyebrow,
  title,
  description,
}: {
  code?: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>
        {code && <span className="text-cyan">{code}</span>}
        {eyebrow}
      </Eyebrow>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
