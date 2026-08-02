import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True once, per browser session — used to skip the preloader on repeat visits. */
export function hasSeenPreloader(): boolean {
  if (typeof window === "undefined") return true;
  return window.sessionStorage.getItem("preloader-seen") === "1";
}

export function markPreloaderSeen() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("preloader-seen", "1");
}

/** Slugify a label into a stable DOM id / key. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
