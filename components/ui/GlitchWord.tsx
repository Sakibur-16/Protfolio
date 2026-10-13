"use client";

import { useEffect, useState } from "react";
import { GlitchText } from "@/components/ui/GlitchText";

/**
 * A word or short phrase that glitches when the pointer enters it and, if
 * `everyMs` is set, now and then on its own. The timer pauses while the tab is
 * hidden, and GlitchText itself does nothing for reduced-motion visitors.
 */
export function GlitchWord({
  text,
  everyMs,
  className,
}: {
  text: string;
  /** [min, max] milliseconds between automatic glitches. Omit for hover only. */
  everyMs?: [number, number];
  className?: string;
}) {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (!everyMs) return;
    const [min, max] = everyMs;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      timer = setTimeout(() => {
        if (document.visibilityState === "visible") setTrigger((n) => n + 1);
        schedule();
      }, min + Math.random() * (max - min));
    };
    schedule();

    return () => clearTimeout(timer);
  }, [everyMs]);

  return (
    <span
      onMouseEnter={() => setTrigger((n) => n + 1)}
      className="relative inline-block whitespace-nowrap"
    >
      <GlitchText text={text} trigger={trigger} className={className} lock />
    </span>
  );
}
