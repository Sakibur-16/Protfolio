import { FolderGit2, Briefcase, Mail, GraduationCap, FileText } from "lucide-react";
import type { SocialLink } from "@/types/portfolio";
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
}: {
  links: SocialLink[];
  className?: string;
}) {
  const active = links.filter((link) => Boolean(link.href));

  if (active.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-4", className)}>
      {active.map((link) => {
        const Icon = ICONS[link.icon];
        return (
          <li key={link.id}>
            <a
              href={link.href!}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="interactive"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted transition-colors hover:text-warm"
            >
              <Icon size={15} aria-hidden />
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
