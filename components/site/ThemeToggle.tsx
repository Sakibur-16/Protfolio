"use client";

import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Plain text toggle. The label is switched with CSS (the dark: variant), so
 * the server HTML and the client agree no matter which theme the pre-paint
 * script chose.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked: the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="meta px-2 py-2 hover:text-ink"
      aria-label="Switch between light and dark theme"
    >
      <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span>
    </button>
  );
}
