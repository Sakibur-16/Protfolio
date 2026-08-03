import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Small pill label — used above the hero headline and as section eyebrows.
 * `pulse` adds a live status dot for availability-style badges.
 */
export function Badge({
  children,
  pulse = false,
  className,
}: {
  children: ReactNode;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-raised/60 px-3.5 py-1.5",
        "font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-dim backdrop-blur-sm",
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
        </span>
      )}
      {children}
    </span>
  );
}
