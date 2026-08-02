"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="flex items-center justify-between border-b border-line px-6 py-4 backdrop-blur-md sm:px-10">
        <a
          href="#hero"
          data-cursor="interactive"
          className="font-display text-lg tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          MSR<span className="text-cyan">.</span>
        </a>

        <div className="hidden items-center gap-2 font-mono text-xs text-muted md:flex">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              profile.availability.state === "open" && "bg-cyan",
              profile.availability.state === "selective" && "bg-ember",
              profile.availability.state === "unavailable" && "bg-muted"
            )}
            aria-hidden="true"
          />
          {profile.availability.label}
        </div>

        <button
          type="button"
          data-cursor="interactive"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center justify-center rounded-full border border-line-strong p-2 text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-6">
          {navigation.slice(1).map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-cursor="interactive"
              className="font-mono text-xs tracking-wide text-muted transition-colors hover:text-cyan"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-b border-line bg-bg px-6 pb-8 pt-4 md:hidden"
          >
            <nav aria-label="Primary mobile" className="flex flex-col gap-1">
              {navigation.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  data-cursor="interactive"
                  className="border-b border-line py-4 font-display text-2xl text-ink"
                >
                  <span className="mr-3 font-mono text-xs text-cyan">{link.code}</span>
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
