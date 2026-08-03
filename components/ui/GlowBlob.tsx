import { cn } from "@/lib/utils";

/**
 * Blurred ambient gradient blob sitting behind a section.
 *
 * Purely decorative and always `pointer-events-none`. Rendered as a plain
 * blurred radial gradient rather than an image so it costs nothing to ship
 * and re-tints automatically with the theme.
 */
export function GlowBlob({
  tone = "warm",
  className,
  size = "34rem",
}: {
  tone?: "warm" | "cool" | "dual";
  className?: string;
  size?: string;
}) {
  const background =
    tone === "dual"
      ? "radial-gradient(circle at 30% 40%, var(--glow-a), transparent 60%), radial-gradient(circle at 70% 60%, var(--glow-b), transparent 60%)"
      : tone === "warm"
        ? "radial-gradient(circle, var(--glow-a), transparent 68%)"
        : "radial-gradient(circle, var(--glow-b), transparent 68%)";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10 rounded-full blur-3xl", className)}
      style={{ width: size, height: size, background }}
    />
  );
}
