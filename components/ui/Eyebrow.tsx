import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  dot = false,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2", className)}>
      {dot && <span aria-hidden className="h-1.5 w-1.5 rounded-full accent-bar" />}
      {children}
    </span>
  );
}
