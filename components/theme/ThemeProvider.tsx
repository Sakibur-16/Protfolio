"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";

type ThemeContextValue = {
  theme: Theme;
  /** True until the client has read the persisted/system value, so UI can avoid asserting a state it doesn't know yet. */
  ready: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Inline script executed before first paint to stamp `data-theme` on <html>.
 * Without this the page renders in the default theme for one frame and then
 * snaps — the classic dark-mode flash. Kept as a string so it can run in
 * <head> ahead of hydration.
 */
export const themeInitScript = `(function(){try{var k="${STORAGE_KEY}";var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="light"||s==="dark"?s:"dark";void m;document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Adopt whatever the pre-paint script already put on <html> so React state
  // matches the DOM instead of fighting it.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    const initial: Theme =
      attr === "dark" || attr === "light"
        ? attr
        : readStoredTheme() ??
          "dark";

    // eslint-disable-next-line react-hooks/set-state-in-effect -- adopting the pre-paint DOM value; needs localStorage/matchMedia so it cannot run during render
    setThemeState(initial);
    setReady(true);
    applyTheme(initial);
  }, []);

  // Follow the OS only while the user has not made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) return;
      const next: Theme = event.matches ? "dark" : "light";
      setThemeState(next);
      applyTheme(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  /** Adds the crossfade class for exactly one transition window. */
  const runWithCrossfade = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    applyTheme(next);
    setThemeState(next);

    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 500);
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private-mode / blocked storage: the theme still applies for this session.
      }
      runWithCrossfade(next);
    },
    [runWithCrossfade]
  );

  /**
   * Toggle with a circular View Transition expanding from the control.
   * Falls back to the plain crossfade when the API is unavailable or the
   * user prefers reduced motion.
   */
  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const startViewTransition = (
        document as Document & {
          startViewTransition?: (cb: () => void) => { finished: Promise<void> };
        }
      ).startViewTransition;

      if (!startViewTransition || prefersReduced || !origin) {
        setTheme(next);
        return;
      }

      // Radius must reach the furthest corner from the origin so the reveal
      // covers the viewport regardless of where the toggle sits.
      const dx = Math.max(origin.x, window.innerWidth - origin.x);
      const dy = Math.max(origin.y, window.innerHeight - origin.y);
      const radius = Math.hypot(dx, dy);

      root.style.setProperty("--vt-x", `${origin.x}px`);
      root.style.setProperty("--vt-y", `${origin.y}px`);
      root.style.setProperty("--vt-r", `${radius}px`);
      root.classList.add("vt-theme-active");

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }

      const transition = startViewTransition.call(document, () => {
        applyTheme(next);
        setThemeState(next);
      });

      transition.finished
        .catch(() => undefined)
        .finally(() => {
          root.classList.remove("vt-theme-active");
        });
    },
    [theme, setTheme]
  );

  const value = useMemo(
    () => ({ theme, ready, setTheme, toggleTheme }),
    [theme, ready, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within <ThemeProvider>");
  return context;
}
