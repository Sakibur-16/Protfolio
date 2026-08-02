import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line-strong px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
