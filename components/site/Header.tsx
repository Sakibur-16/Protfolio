import { contact } from "@/data/site";
import { HeaderNav } from "@/components/site/HeaderNav";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4 sm:px-8">
        <a href="#top" className="display text-xl italic">
          Sakibur Rahman
        </a>
        <div className="flex items-center gap-1 sm:gap-6">
          <HeaderNav />
          <a href={`mailto:${contact.email}`} className="pressable text-sm font-semibold text-accent hover:underline">
            Email me
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
