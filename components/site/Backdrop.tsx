"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * A full-bleed image that drifts slower than the page as you scroll, and
 * settles in with a slow zoom on load. The zoom (CSS) and the drift (JS) sit on
 * different elements, so their transforms never conflict.
 */
export function Backdrop({
  src,
  alt = "",
  priority = false,
  speed = 0.08,
  className = "",
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  speed?: number;
  className?: string;
}) {
  const drift = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = drift.current;
      const parent = el?.parentElement;
      if (!el || !parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      el.style.transform = `translate3d(0, ${(-rect.top * speed).toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div
      ref={drift}
      className="absolute -inset-y-[10%] inset-x-0 will-change-transform"
      aria-hidden={alt ? undefined : true}
    >
      <div className="kenburns relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          quality={80}
          className={`object-cover ${className}`}
        />
      </div>
    </div>
  );
}
