import Image from "next/image";
import { Download, FileDown, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { findIcon } from "@/lib/iconFiles";
import { cn } from "@/lib/utils";

const linkButton =
  "inline-flex h-11 items-center rounded-md border border-line-strong text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/[0.06]";

const ENTRIES = [
  { id: "email", name: "Email", label: "Email", short: "Em", file: "gmail" },
  { id: "linkedin", name: "LinkedIn", label: "LinkedIn", short: "in", file: "linkedin" },
  { id: "github", name: "GitHub", label: "GitHub", short: "Gh", file: "github" },
  { id: "scholar", name: "Google Scholar", label: "Scholar", short: "Sc", file: "scholar" },
  { id: "whatsapp", name: "WhatsApp", label: "WhatsApp", short: "WA", file: "whatsapp" },
] as const;

/**
 * Email, LinkedIn, GitHub and WhatsApp (plus Scholar in the tiles), and the CV, in two layouts:
 *
 * - default: a 2x2 grid of buttons with the "Download CV" card underneath.
 *   Used in the hero and on the projects page. `showLabels` puts each name
 *   beside its icon.
 * - `tiles`: one row of small rounded icon tiles (the five contacts and the CV).
 *   Used in the "Let's talk" section.
 *
 * Each button shows the icon file in /public/icons (the word until that file
 * exists).
 */
export function ContactGrid({
  showLabels = false,
  tiles = false,
  className,
}: {
  showLabels?: boolean;
  tiles?: boolean;
  className?: string;
}) {
  const links = ENTRIES.map((entry) => ({
    ...entry,
    href: socialLinks.find((l) => l.id === entry.id)?.href ?? null,
    icon: findIcon(entry.file),
  })).filter((entry) => Boolean(entry.href));
  // The 2x2 grid shows Email, LinkedIn, GitHub and WhatsApp. Scholar stays in the icon row below.
  const gridLinks = links.filter((link) => link.id !== "scholar");

  if (tiles) {
    const tileClass =
      "grid h-11 w-full place-items-center rounded-xl border border-line bg-bg-raised transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong";

    return (
      <ul className={cn("grid w-full grid-cols-6 gap-2.5", className)}>
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href!}
              aria-label={link.name}
              title={link.name}
              data-cursor="interactive"
              {...(link.href!.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={tileClass}
            >
              {link.icon ? (
                <Image
                  src={link.icon}
                  alt=""
                  width={20}
                  height={20}
                  className={cn("h-5 w-5 object-contain", link.file === "github" && "invert-on-dark")}
                />
              ) : (
                <span className="text-[0.65rem] font-semibold text-muted">{link.short}</span>
              )}
            </a>
          </li>
        ))}

        {/* The CV is the fifth icon: a document with a download arrow. */}
        {profile.resumeUrl && (
          <li>
            <a
              href={profile.resumeUrl}
              download
              aria-label="Download my CV (PDF)"
              title="Download CV"
              data-cursor="interactive"
              className={cn(tileClass, "group")}
            >
              <FileDown
                className="h-5 w-5 text-ink-dim transition-colors group-hover:text-ink"
                aria-hidden="true"
              />
            </a>
          </li>
        )}
      </ul>
    );
  }

  return (
    <ul className={cn("grid w-full grid-cols-2 gap-2", className)}>
      {gridLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.href!}
            aria-label={link.name}
            title={link.name}
            data-cursor="interactive"
            {...(link.href!.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={cn(
              linkButton,
              "w-full min-w-[5.5rem] text-sm font-medium",
              showLabels ? "justify-start gap-3 px-4" : "justify-center px-5"
            )}
          >
            {link.icon && (
              <Image
                src={link.icon}
                alt=""
                width={24}
                height={24}
                className={cn("h-6 w-6 shrink-0 object-contain", link.file === "github" && "invert-on-dark")}
              />
            )}
            {(showLabels || !link.icon) && <span className="truncate">{link.label}</span>}
          </a>
        </li>
      ))}

      {profile.resumeUrl && (
        <li className="col-span-2">
          <a
            href={profile.resumeUrl}
            download
            data-cursor="interactive"
            aria-label="Download my CV (PDF)"
            className="group flex items-center gap-3 rounded-md border border-line-strong px-3 py-2.5 transition-colors duration-200 hover:border-ink"
            style={{
              background:
                "linear-gradient(100deg, color-mix(in srgb, var(--accent-warm) 14%, transparent), color-mix(in srgb, var(--accent-cool) 14%, transparent))",
            }}
          >
            <span className="accent-bar grid h-9 w-9 shrink-0 place-items-center rounded-md text-white">
              <FileText className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-ink">Download CV</span>
              <span className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                PDF · Resume
              </span>
            </span>
            <span className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-bg transition-transform duration-300 group-hover:translate-y-0.5">
              <Download className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </li>
      )}
    </ul>
  );
}
