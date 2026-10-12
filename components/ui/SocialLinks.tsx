"use client";

import { useState } from "react";
import { FolderGit2, Briefcase, Mail, GraduationCap, FileText } from "lucide-react";
import type { SocialLink } from "@/types/portfolio";
import { GlitchText } from "@/components/ui/GlitchText";
import { cn } from "@/lib/utils";

const ICONS = {
  github: FolderGit2,
  linkedin: Briefcase,
  mail: Mail,
  scholar: GraduationCap,
  file: FileText,
} as const;

export function SocialLinks({
  links,
  className,
  variant = "row",
}: {
  links: SocialLink[];
  className?: string;
  /** "row" is a plain wrapping row; "grid" is two columns of bordered cells. */
  variant?: "row" | "grid";
}) {
  // Per-link hover counters: entering a link replays a short glitch on its label.
  const [hovers, setHovers] = useState<Record<string, number>>({});
  const active = links.filter((link) => Boolean(link.href));

  if (active.length === 0) return null;

  return (
    <ul
      className={cn(
        variant === "grid"
          ? "grid grid-cols-1 gap-2 min-[420px]:w-max min-[420px]:grid-cols-[auto_auto]"
          : "flex flex-wrap items-center gap-4",
        className
      )}
    >
      {active.map((link) => {
        const Icon = ICONS[link.icon];
        return (
          <li key={link.id}>
            <a
              href={link.href!}
              {...(link.href!.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              data-cursor="interactive"
              onMouseEnter={() => setHovers((h) => ({ ...h, [link.id]: (h[link.id] ?? 0) + 1 }))}
              className={cn(
                "inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted transition-colors hover:text-warm",
                variant === "grid" &&
                  "w-full whitespace-nowrap rounded-lg border border-line px-3 py-2 hover:border-line-strong"
              )}
            >
              <Icon size={15} aria-hidden className={variant === "grid" ? "text-warm" : undefined} />
              <GlitchText text={link.label} trigger={hovers[link.id] ?? 0} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
