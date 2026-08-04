import { cn } from "@/lib/utils";

/**
 * Per-letter vertical roll on hover.
 *
 * Each character is a clipped box containing the glyph twice: the first copy
 * in normal flow (which is what gives the box its height), the second absolutely
 * positioned exactly one box below via `translate-y-full`. On hover the pair
 * swaps places.
 *
 * Deriving the height from the glyph itself — rather than a hardcoded `em`
 * value — is the important part: the earlier version fixed the box at 1.1em,
 * which did not match the rendered line box, so both copies showed at once and
 * the label appeared doubled.
 *
 * Triggered by `.group` on the parent, so the whole button drives it. The text
 * stays real and selectable; `aria-label` carries the word so assistive tech
 * never hears it letter-by-letter.
 */
export function RollingText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("inline-flex leading-none", className)} aria-label={text}>
      {text.split("").map((char, i) => {
        const glyph = char === " " ? " " : char;
        const delay = `${i * 24}ms`;

        return (
          <span
            key={`${char}-${i}`}
            aria-hidden="true"
            className="relative inline-block overflow-hidden align-bottom leading-none"
          >
            <span
              className="block transition-transform duration-[420ms] ease-[var(--ease-editorial)] group-hover:-translate-y-full"
              style={{ transitionDelay: delay }}
            >
              {glyph}
            </span>
            <span
              className="absolute left-0 top-0 block translate-y-full transition-transform duration-[420ms] ease-[var(--ease-editorial)] group-hover:translate-y-0"
              style={{ transitionDelay: delay }}
            >
              {glyph}
            </span>
          </span>
        );
      })}
    </span>
  );
}
