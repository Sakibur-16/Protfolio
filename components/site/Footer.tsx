import { contact, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="meta">
          © {new Date().getFullYear()} {siteConfig.name} · {contact.location}
        </p>
        <a href={contact.linkedin} className="meta hover:text-accent" target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
      </div>
    </footer>
  );
}
