/**
 * Scene palette + adaptive quality.
 *
 * The palette is *read from CSS custom properties* rather than duplicated as
 * hex literals, so the canvas and the DOM can never drift apart: changing
 * --scene-node in globals.css changes the geometry colour too, in both themes.
 */
import type { Theme } from "@/components/theme/ThemeProvider";

export type ScenePalette = {
  warm: string;
  cool: string;
  opacity: number;
};

const FALLBACK_PALETTE: Record<Theme, ScenePalette> = {
  light: { warm: "#e2541a", cool: "#1d55e0", opacity: 0.5 },
  dark: { warm: "#ff6b2c", cool: "#2c6bff", opacity: 0.55 },
};

function readVar(styles: CSSStyleDeclaration, name: string): string {
  return styles.getPropertyValue(name).trim();
}

/** Resolves the active palette from the document's computed custom properties. */
export function readScenePalette(theme: Theme): ScenePalette {
  if (typeof window === "undefined") return FALLBACK_PALETTE[theme];
  try {
    const styles = getComputedStyle(document.documentElement);
    const fallback = FALLBACK_PALETTE[theme];
    const opacity = Number.parseFloat(readVar(styles, "--scene-node-opacity"));
    return {
      warm: readVar(styles, "--scene-warm") || fallback.warm,
      cool: readVar(styles, "--scene-cool") || fallback.cool,
      opacity: Number.isFinite(opacity) ? opacity : fallback.opacity,
    };
  } catch {
    return FALLBACK_PALETTE[theme];
  }
}

export type QualityTier = "high" | "medium" | "low";

export type SceneQuality = {
  tier: QualityTier;
  dpr: [number, number];
  /** Points in the hero field. One draw call regardless of count — this is a GPU-side budget. */
  particleCount: number;
  enablePointer: boolean;
  animationIntensity: number;
};

const QUALITY: Record<QualityTier, Omit<SceneQuality, "tier">> = {
  high: { dpr: [1, 1.75], particleCount: 9000, enablePointer: true, animationIntensity: 1 },
  medium: { dpr: [1, 1.4], particleCount: 4200, enablePointer: true, animationIntensity: 0.8 },
  low: { dpr: [1, 1], particleCount: 1500, enablePointer: false, animationIntensity: 0.5 },
};

/**
 * Picks a tier from real capability signals rather than viewport width alone —
 * a narrow window on a workstation should not be punished, and a high-DPR
 * phone should not be trusted just because its CSS width is large.
 */
export function detectQuality(): SceneQuality {
  if (typeof window === "undefined") return { tier: "low", ...QUALITY.low };

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  const saveData = nav.connection?.saveData === true;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const highDpr = window.devicePixelRatio > 2.5;

  if (saveData || cores <= 4 || memory <= 2 || (coarsePointer && narrow) || (narrow && highDpr)) {
    return { tier: "low", ...QUALITY.low };
  }
  if (cores <= 8 || memory <= 4 || coarsePointer || window.innerWidth < 1280) {
    return { tier: "medium", ...QUALITY.medium };
  }
  return { tier: "high", ...QUALITY.high };
}
