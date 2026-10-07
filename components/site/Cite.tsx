"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Source } from "@/data/sources";

const PANEL_WIDTH = 320;
const GUTTER = 16;
const PANEL_HEIGHT = 190;

interface Position {
  top: number;
  left: number;
  width: number;
  /** Horizontal transform origin, so the panel grows out of its marker. */
  originX: number;
  /** True when opened from the keyboard, which should not animate. */
  instant: boolean;
}

/**
 * A footnote marker like [1]. Activating it opens the project, role or paper
 * behind the claim next to the marker. Closes on Escape, outside press,
 * scroll and resize, so the fixed panel never drifts from its marker.
 */
export function Cite({ source, hero = false }: { source: Source; hero?: boolean }) {
  const [position, setPosition] = useState<Position | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLSpanElement>(null);
  const panelId = useId();
  const open = position !== null;

  useEffect(() => {
    if (!open) return;
    const close = () => setPosition(null);
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      button.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panel.current?.contains(target) || button.current?.contains(target)) return;
      close();
    };
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("resize", close);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    if (open) {
      setPosition(null);
      return;
    }
    const rect = button.current?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.min(PANEL_WIDTH, window.innerWidth - GUTTER * 2);
    const left = Math.min(Math.max(GUTTER, rect.left), window.innerWidth - width - GUTTER);
    // Open below the paragraph or heading holding the marker so the claim stays
    // readable, but never so low that the panel falls off the screen.
    const block = button.current?.closest("p, h1, h2, h3, li")?.getBoundingClientRect();
    const top = Math.min(
      Math.max(rect.bottom, block?.bottom ?? 0) + 8,
      Math.max(rect.bottom + 8, window.innerHeight - PANEL_HEIGHT),
    );
    const originX = rect.left + rect.width / 2 - left;
    // A keyboard-initiated click reports detail 0.
    setPosition({ top, left, width, originX, instant: event.detail === 0 });
  }

  return (
    <>
      <button
        ref={button}
        type="button"
        className={hero ? "cite cite--hero" : "cite"}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`Source ${source.n}: ${source.title}`}
        onClick={toggle}
      >
        [{source.n}]
      </button>
      {open && position ? (
        <span
          ref={panel}
          id={panelId}
          role="note"
          className="cite-pop"
          data-instant={position.instant}
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
            transformOrigin: `${position.originX}px 0`,
          }}
        >
          <span className="meta block">Source {source.n}</span>
          <span className="display mt-1 block text-lg">{source.title}</span>
          <span className="meta mt-2 block">{source.detail}</span>
          <a
            className="link mt-3 inline-block text-sm"
            href={source.href}
            {...(source.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => setPosition(null)}
          >
            {source.linkLabel}
            {source.external ? " ↗" : " ↓"}
          </a>
        </span>
      ) : null}
    </>
  );
}
