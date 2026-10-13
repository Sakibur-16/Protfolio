import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Download, Mail, MapPin } from "lucide-react";
import { footerNavigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { findIcon } from "@/lib/iconFiles";
import { gmailComposeUrl } from "@/lib/mail";
import { cn } from "@/lib/utils";

const ICONS = [
  { id: "email", name: "Email", file: "gmail" },
  { id: "linkedin", name: "LinkedIn", file: "linkedin" },
  { id: "github", name: "GitHub", file: "github" },
  { id: "scholar", name: "Google Scholar", file: "scholar" },
] as const;

const labelClass = "font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted";
const linkClass = "text-sm text-ink-dim transition-colors hover:text-ink";

export function Footer() {
  const year = new Date().getFullYear();

  const icons = ICONS.map((entry) => ({
    ...entry,
    href: socialLinks.find((l) => l.id === entry.id)?.href ?? null,
    icon: findIcon(entry.file),
  })).filter((entry) => Boolean(entry.href));

  return (
    <footer className="border-t border-line px-6 pb-8 pt-14 sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
        {/* Who */}
        <div>
          <Link href="/#hero" data-cursor="interactive" className="inline-flex items-center gap-2.5">
            <span className="accent-bar inline-flex h-8 items-center justify-center rounded-lg px-2 font-display text-[0.65rem] font-bold tracking-tight text-accent-ink">
              SRN
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              {profile.fullName}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            AI developer building RAG and agent systems that ship to real users.
          </p>

          {/* Bare brand icons: quiet on purpose, not buttons. */}
          <ul className="mt-6 flex items-center gap-5">
            {icons.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href!}
                  aria-label={link.name}
                  title={link.name}
                  data-cursor="interactive"
                  {...(link.href!.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block opacity-60 transition-[opacity,transform] duration-200 hover:-translate-y-0.5 hover:opacity-100"
                >
                  {link.icon ? (
                    <Image
                      src={link.icon}
                      alt=""
                      width={22}
                      height={22}
                      className={cn("h-[1.35rem] w-[1.35rem] object-contain", link.file === "github" && "invert-on-dark")}
                    />
                  ) : (
                    <span className="font-mono text-xs text-muted">{link.name}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <p className={labelClass}>Explore</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {footerNavigation.map((link) => (
              <li key={link.id}>
                <Link href={`/${link.href}`} data-cursor="interactive" className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects" data-cursor="interactive" className={linkClass}>
                All projects
              </Link>
            </li>
          </ul>
        </nav>

        {/* Get in touch */}
        <div>
          <p className={labelClass}>Get in touch</p>
          <ul className="mt-5 flex flex-col gap-3">
            {profile.email && (
              <li>
                <a
                  href={gmailComposeUrl({ to: profile.email })}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="interactive"
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-ink transition-colors hover:text-warm"
                >
                  <Mail className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  {profile.email}
                </a>
              </li>
            )}
            <li className="inline-flex items-center gap-2.5 text-sm text-muted">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {profile.location.city}, {profile.location.country}
            </li>
            {profile.resumeUrl && (
              <li>
                <a
                  href={profile.resumeUrl}
                  download
                  data-cursor="interactive"
                  className="inline-flex items-center gap-2.5 text-sm text-ink-dim transition-colors hover:text-ink"
                >
                  <Download className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  Download CV (PDF)
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between gap-4 border-t border-line pt-6">
        <p className="font-mono text-[0.68rem] text-muted">
          © {year} {profile.fullName}. All rights reserved.
        </p>
        <Link
          href="/#hero"
          data-cursor="interactive"
          className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-muted transition-colors hover:text-ink"
        >
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          Back to top
        </Link>
      </div>
    </footer>
  );
}
