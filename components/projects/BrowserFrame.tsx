import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A quiet browser window around a web project's screenshot: a title bar with
 * three grey dots and the project name, then the page itself.
 */
export function BrowserFrame({
  title,
  children,
  compact = false,
  className,
  bodyClassName,
}: {
  title: string;
  children: ReactNode;
  compact?: boolean;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden border border-line-strong bg-bg-raised shadow-xl",
        compact ? "rounded-xl" : "rounded-2xl",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-1.5 border-b border-line bg-surface",
          compact ? "h-6 px-3" : "h-9 px-4"
        )}
        aria-hidden="true"
      >
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className={cn("rounded-full bg-ink/20", compact ? "h-1.5 w-1.5" : "h-2.5 w-2.5")}
          />
        ))}
        <span
          className={cn(
            "ml-2 truncate font-medium text-muted",
            compact ? "text-[0.6rem]" : "text-xs"
          )}
        >
          {title}
        </span>
      </div>
      <div className={cn("relative min-h-0 flex-1", bodyClassName)}>{children}</div>
    </div>
  );
}
