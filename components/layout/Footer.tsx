import { footerNavigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socialLinks";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl text-ink">
            Md. Sakibur Rahman
          </p>
          <p className="mt-1 font-mono text-xs text-muted">
            {profile.roleTitle} — {profile.location.city}, {profile.location.country}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {footerNavigation.map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-cursor="interactive"
              className="font-mono text-xs tracking-wide text-muted transition-colors hover:text-warm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <SocialLinks links={socialLinks} />
      </div>

      <p className="mx-auto mt-8 max-w-6xl font-mono text-[0.65rem] text-muted">
        © {year} {profile.fullName}. All rights reserved.
      </p>
    </footer>
  );
}
