"use client";

import { createElement, useState } from "react";
import { GlitchText } from "@/components/ui/GlitchText";
import { cn } from "@/lib/utils";

type Segment = { text: string; className?: string };

/**
 * A block of text that glitches briefly whenever the pointer enters it. Segments let one element hold differently
 * styled pieces (for example a headline with a gradient word) that glitch
 * together.
 */
export function GlitchBlock({
  as = "span",
  segments,
  className,
}: {
  as?: "span" | "p" | "h1" | "h2" | "dd" | "dt" | "div";
  segments: Segment[];
  className?: string;
}) {
  const [hovers, setHovers] = useState(0);

  return createElement(
    as,
    {
      className: cn("relative", className),
      onMouseEnter: () => setHovers((count) => count + 1),
    },
    segments.map((segment, i) => (
      <span key={i} className={segment.className}>
        <GlitchText text={segment.text} trigger={hovers} lock />
      </span>
    ))
  );
}
