"use client";

import { useEffect, useRef, useState } from "react";

export function CursorFX() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // One-time client-side capability check (pointer type, reduced-motion) —
    // intentionally sets state once on mount rather than subscribing to a
    // changing external source.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("cursor-enabled");

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let raf = 0;

    function onMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
      }
    }

    function onOver(e: PointerEvent) {
      const el = (e.target as HTMLElement)?.closest('[data-cursor="interactive"]');
      ringRef.current?.classList.toggle("is-active", Boolean(el));
    }

    function tick() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        const size = ringRef.current.classList.contains("is-active") ? 28 : 16;
        ringRef.current.style.transform = `translate3d(${ringX - size}px, ${ringY - size}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-enabled");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
