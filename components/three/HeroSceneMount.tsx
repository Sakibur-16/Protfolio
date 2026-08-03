"use client";

import dynamic from "next/dynamic";
import { SceneFallback } from "./SceneFallback";

/**
 * Client boundary for the hero canvas.
 *
 * `next/dynamic` with `ssr: false` is only legal inside a Client Component, and
 * Hero is a Server Component — this thin wrapper is what lets the three.js
 * chunk stay out of the server render *and* out of the initial bundle, while
 * the fallback holds the same space so nothing shifts when the scene arrives.
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

export function HeroSceneMount() {
  return <HeroScene />;
}
