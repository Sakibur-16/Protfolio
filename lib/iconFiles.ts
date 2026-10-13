import { existsSync } from "node:fs";
import path from "node:path";

const EXTENSIONS = ["svg", "png", "webp", "jpg"];

/**
 * Looks for an icon you have placed in /public/icons, for example
 * `linkedin.svg` or `github.png`. Returns its public path, or null when there
 * is no file yet (the caller then falls back to a text label). Server only.
 */
export function findIcon(name: string): string | null {
  for (const ext of EXTENSIONS) {
    if (existsSync(path.join(process.cwd(), "public", "icons", `${name}.${ext}`))) {
      return `/icons/${name}.${ext}`;
    }
  }
  return null;
}
