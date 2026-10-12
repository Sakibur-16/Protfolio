"use client";

import { useEffect, useState } from "react";
import { fireIntroGlitch } from "@/lib/introGlitch";

const SEEN_KEY = "intro-glitch-seen";
// The preloader runs about 1.6s and fades out over 0.4s on a first visit, so
// wait for it to clear before glitching the page underneath.
const AFTER_PRELOADER_MS = 2300;

/**
 * First visit only: after the preloader, glitch the page once to catch the
 * eye. Header and hero text scramble, and a short orange and blue flicker runs
 * across the screen. Skipped for reduced-motion visitors and on any later
 * visit in the same session.
 */
export function IntroGlitch() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage blocked: treat every load as a first visit.
    }
    if (seen) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          // Ignore.
        }
        fireIntroGlitch();
        setFlash(true);
        timers.push(setTimeout(() => setFlash(false), 700));
      }, AFTER_PRELOADER_MS)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!flash) return null;
  return <div aria-hidden="true" className="intro-glitch-flash" />;
}
