"use client";

import { useSyncExternalStore } from "react";

/**
 * One shared "first visit" glitch trigger. IntroGlitch (mounted once in the
 * layout) fires it, and the header and the hero read it and scramble their
 * text. A tiny external store keeps them in sync without prop drilling.
 */
let trigger = 0;
const listeners = new Set<() => void>();

export function fireIntroGlitch() {
  trigger += 1;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useIntroGlitch(): number {
  return useSyncExternalStore(
    subscribe,
    () => trigger,
    () => 0
  );
}
