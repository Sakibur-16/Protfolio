import { contact } from "@/data/site";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const nav = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4 sm:px-8">
        <a href="#top" className="display text-xl italic">
          Sakibur Rahman
        </a>
        <div className="flex items-center gap-1 sm:gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-muted hover:text-accent">
                {item.label}
              </a>
            ))}
          </nav>
          <a href={`mailto:${contact.email}`} className="pressable text-sm font-medium text-accent hover:underline">
            Email me
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
