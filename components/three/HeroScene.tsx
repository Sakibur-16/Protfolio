"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { supportsWebGL } from "@/lib/webgl";
import { HeroField } from "./HeroField";
import { SceneFallback } from "./SceneFallback";
import { detectQuality, readScenePalette, type SceneQuality } from "./sceneConfig";

/**
 * Canvas host for the hero lattice.
 *
 * Owns everything the scene itself should not care about: capability
 * detection, quality tiering, DPR caps, theme colour resolution, and — most
 * importantly — deciding when *not* to render. The frame loop is suspended
 * whenever the hero scrolls out of view or the tab is hidden, so the scene
 * costs nothing once the visitor is reading the rest of the page.
 */
export default function HeroScene() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Capability probe results land as a single state object so mounting costs
  // one render rather than three cascading ones.
  const [env, setEnv] = useState<{ ready: boolean; webglOk: boolean; quality: SceneQuality | null }>(
    { ready: false, webglOk: true, quality: null }
  );
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot client probe; cannot run during render (needs window/WebGL)
    setEnv({ ready: true, webglOk: supportsWebGL(), quality: detectQuality() });
  }, []);

  const { ready, webglOk, quality } = env;

  // Pause when the hero leaves the viewport.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pause when the tab is backgrounded.
  useEffect(() => {
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Re-read the palette from CSS whenever the theme flips, so materials track
  // the token values rather than holding a stale colour.
  const palette = useMemo(() => readScenePalette(theme), [theme]);

  if (!ready || !webglOk || !quality) {
    return <SceneFallback />;
  }

  // With reduced motion we still draw the composition, but on demand only —
  // one render, no ongoing loop.
  const active = inView && tabVisible;
  const frameloop = prefersReducedMotion ? "demand" : active ? "always" : "never";

  return (
    <div ref={wrapperRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={frameloop}
        dpr={quality.dpr}
        camera={{ position: [0, 0, 14], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ pointerEvents: "none" }}
      >
        <HeroField
          palette={palette}
          quality={quality}
          reducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  );
}
