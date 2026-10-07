import { contact, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="band">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        <div className="flex flex-col gap-3 border-t border-rule py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">
            © {new Date().getFullYear()} {siteConfig.name} · {contact.location}
          </p>
          <p className="meta flex gap-5">
            <a href={contact.linkedin} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href={contact.github} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={contact.scholar} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
              Scholar ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
