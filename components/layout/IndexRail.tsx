"use client";

import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

export function IndexRail() {
  const pathname = usePathname();
  const active = useActiveSection(navigation.map((n) => n.id));

  if (pathname !== "/") return null;

  return (
    <nav
      aria-label="Section index"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-4 lg:flex"
    >
      {navigation.map((link) => {
        const isActive = active === link.id;
        return (
          <a
            key={link.id}
            href={link.href}
            data-cursor="interactive"
            className="group flex items-center gap-3"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={cn(
                "h-px w-4 bg-line-strong transition-all duration-300",
                isActive && "w-8 accent-bar"
              )}
            />
            <span
              className={cn(
                "font-mono text-[0.65rem] tracking-[0.2em] text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                isActive && "text-warm opacity-100"
              )}
            >
              {link.code} — {link.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
