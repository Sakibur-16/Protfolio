import { contact } from "@/data/site";
import { HeaderNav } from "@/components/site/HeaderNav";
import { LocalClock } from "@/components/site/LocalClock";
import { ThemeToggle } from "@/components/site/ThemeToggle";

/** A floating pill, always dark, centred over the page. */
export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <div className="on-dark header-in pointer-events-auto flex h-14 w-full max-w-[1100px] items-center justify-between gap-4 rounded-full bg-[#0b101e]/70 py-1 pl-6 pr-2 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.5)] ring-1 ring-white/15 backdrop-blur-xl">
        <a href="#top" className="text-[0.95rem] font-semibold tracking-tight">
          Sakibur Rahman
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          <HeaderNav />
          <LocalClock />
          <ThemeToggle />
          <a href={`mailto:${contact.email}`} className="btn btn-sm pressable">
            Email me
            <span className="btn-chip" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
