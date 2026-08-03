import * as icons from "simple-icons";
import { cn } from "@/lib/utils";

type IconKey = keyof typeof icons;

function isSimpleIcon(value: unknown): value is { path: string; hex: string; title: string } {
  return typeof value === "object" && value !== null && "path" in value && "hex" in value;
}

/**
 * Brand mark from simple-icons.
 *
 * `colored` paints the official brand hex; otherwise it inherits currentColor
 * so marks can sit monochrome inside dense UI. Logos are decorative here — the
 * technology name is always present as real text beside them — so the SVG is
 * aria-hidden rather than given a redundant label.
 */
export function TechIcon({
  iconKey,
  className,
  colored = false,
}: {
  iconKey: IconKey | null;
  className?: string;
  colored?: boolean;
}) {
  if (!iconKey) return null;
  const icon = icons[iconKey];
  if (!isSimpleIcon(icon)) return null;

  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 shrink-0", className)}
      fill={colored ? `#${icon.hex}` : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}
