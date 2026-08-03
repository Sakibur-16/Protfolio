/**
 * Cheap one-shot WebGL capability probe. The test canvas is discarded
 * immediately and the result memoized, so repeated calls cost nothing and we
 * never leak a context.
 */
let cached: boolean | null = null;

export function supportsWebGL(): boolean {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");

    cached = Boolean(gl);

    // Release the probe context rather than waiting for GC.
    if (gl && "getExtension" in gl) {
      (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    cached = false;
  }

  return cached;
}
