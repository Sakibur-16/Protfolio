"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/lib/useActiveSection";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { RollingText } from "@/components/ui/RollingText";
import { cn } from "@/lib/utils";

const NAV_IDS = navigation.map((n) => n.id);

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_IDS);
  const prefersReducedMotion = useReducedMotion();

  // Tightens the pill once the page leaves the hero. Passive listener +
  // a boolean guard so we only re-render on the threshold crossing, not
  // on every scroll frame.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on Escape and lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const enter = prefersReducedMotion
    ? { duration: 0 }
    : ({ duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-5">
      <motion.div
        initial={prefersReducedMotion ? false : { y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={enter}
        className="pointer-events-auto w-full max-w-fit"
      >
        {/* The pill — sized to its contents so it stays a compact capsule
            rather than a full-width bar. */}
        <div
          className={cn(
            "liquid-glass flex items-center gap-2 rounded-full sm:gap-3",
            scrolled ? "is-scrolled px-3 py-1.5 sm:px-3.5 sm:py-1.5" : "px-3.5 py-2 sm:px-4 sm:py-2"
          )}
        >
          <a
            href="#hero"
            data-cursor="interactive"
            onClick={() => setOpen(false)}
            className="group relative z-10 flex shrink-0 items-center gap-2 pr-1 transition-opacity duration-200 hover:opacity-80"
          >
            {/* Monogram badge + full name. The name hides on narrow viewports
                so the pill stays a compact capsule. */}
            <span className="accent-bar inline-flex h-7 items-center justify-center rounded-lg px-1.5 font-display text-[0.6rem] font-bold tracking-tight text-accent-ink">
              SRN
            </span>
            <span className="hidden font-display text-sm font-medium tracking-tight text-ink lg:inline">
              Md Sakibur Rahman
            </span>
          </a>

          {/* Desktop nav — active link gets a shared-layout pill behind it. */}
          <nav
            aria-label="Primary"
            className="relative z-10 hidden items-center gap-1 md:flex"
          >
            {navigation.slice(1).map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  data-cursor="interactive"
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-2.5 py-1 font-mono text-[0.65rem] tracking-wide transition-colors duration-300",
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-ink/[0.09]"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Availability reads as a status dot only — the label lives in the
                Contact section, and the pill stays compact. */}
            <span
              className={cn(
                "hidden h-1.5 w-1.5 rounded-full lg:block",
                profile.availability.state === "unavailable" ? "bg-muted" : "bg-warm"
              )}
              title={profile.availability.label}
              aria-hidden="true"
            />

            <ThemeToggle />

            <MagneticLink
              href="#contact"
              className="btn-glow group hidden items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium sm:inline-flex"
            >
              <RollingText text="Contact me" />
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </MagneticLink>

            <button
              type="button"
              data-cursor="interactive"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center rounded-full p-1.5 text-ink transition-colors duration-200 hover:bg-ink/[0.09] md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile sheet — a second glass pane so it reads as the same material. */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: [0.32, 0.72, 0, 1] }
              }
              className="liquid-glass is-scrolled mt-2 overflow-hidden rounded-3xl px-3 py-3 md:hidden"
            >
              <nav aria-label="Primary mobile" className="relative z-10 flex flex-col">
                {navigation.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    data-cursor="interactive"
                    className="flex items-baseline gap-3 rounded-2xl px-3 py-3 font-display text-xl text-ink transition-colors duration-200 hover:bg-ink/[0.06]"
                  >
                    <span className="font-mono text-[0.65rem] text-muted">{link.code}</span>
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
