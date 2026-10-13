import Image from "next/image";
import { Download, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { findIcon } from "@/lib/iconFiles";
import { cn } from "@/lib/utils";

const linkButton =
  "inline-flex h-11 items-center rounded-md border border-line-strong text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/[0.06]";

const ENTRIES = [
  { id: "email", name: "Email", label: "Email", file: "gmail" },
  { id: "linkedin", name: "LinkedIn", label: "LinkedIn", file: "linkedin" },
  { id: "github", name: "GitHub", label: "GitHub", file: "github" },
  { id: "scholar", name: "Google Scholar", label: "Scholar", file: "scholar" },
] as const;

/**
 * Email, LinkedIn, GitHub and Scholar as a 2x2 grid of equal buttons, with a
 * wide CV bar underneath: the document icon on the left, "CV" in the middle,
 * the download arrow on the right.
 *
 * Each button shows the icon file in /public/icons (the word until that file
 * exists). `showLabels` puts the name beside the icon; without it the buttons
 * are icon-only. `showAddress` makes the Email button show the address itself
 * on wide screens (it is too long to fit on narrow ones, where it says "Email").
 */
export function ContactGrid({
  showLabels = false,
  showAddress = false,
  className,
}: {
  showLabels?: boolean;
  showAddress?: boolean;
  className?: string;
}) {
  const links = ENTRIES.map((entry) => ({
    ...entry,
    href: socialLinks.find((l) => l.id === entry.id)?.href ?? null,
    icon: findIcon(entry.file),
  })).filter((entry) => Boolean(entry.href));

  return (
    <ul className={cn("grid w-full grid-cols-2 gap-2", className)}>
      {links.map((link) => {
        const address = showAddress && link.id === "email" ? profile.email : null;
        return (
          <li key={link.id}>
            <a
              href={link.href!}
              aria-label={address ? `Email ${address}` : link.name}
              title={address ?? link.name}
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
              {(showLabels || !link.icon) && (
                <span className="truncate">
                  {address ? (
                    <>
                      <span className="xl:hidden">{link.label}</span>
                      <span className="hidden xl:inline">{address}</span>
                    </>
                  ) : (
                    link.label
                  )}
                </span>
              )}
            </a>
          </li>
        );
      })}

      {profile.resumeUrl && (
        <li className="col-span-2">
          <a
            href={profile.resumeUrl}
            download
            data-cursor="interactive"
            aria-label="Download my CV (PDF)"
            className="group grid h-[3.25rem] grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-line-strong px-3 transition-colors duration-200 hover:border-ink"
            style={{
              background:
                "linear-gradient(100deg, color-mix(in srgb, var(--accent-warm) 14%, transparent), color-mix(in srgb, var(--accent-cool) 14%, transparent))",
            }}
          >
            <span className="accent-bar grid h-9 w-9 place-items-center rounded-md text-white">
              <FileText className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
            </span>
            <span className="text-center text-sm font-semibold tracking-wide text-ink">CV</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-bg transition-transform duration-300 group-hover:translate-y-0.5">
              <Download className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </li>
      )}
    </ul>
  );
}
