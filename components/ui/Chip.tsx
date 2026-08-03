import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Rounded skill/tech tag. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-bg-raised/50 px-3.5 py-1.5",
        "text-sm text-ink-dim transition-colors duration-300 hover:border-line-strong hover:text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
