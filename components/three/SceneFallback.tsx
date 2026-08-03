/**
 * Non-WebGL / pre-hydration stand-in for the hero lattice.
 *
 * Uses the same aperture composition as the real scene — concentric rings with
 * an empty centre — built from theme-aware CSS so it holds the same visual
 * identity, occupies the same space (no layout shift when the canvas swaps in),
 * and never leaves a blank rectangle while the scene chunk loads.
 */
export function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 aspect-square w-[min(140vw,64rem)] -translate-x-1/2 -translate-y-1/2">
        {[0.52, 0.68, 0.84, 1].map((scale, i) => (
          <div
            key={scale}
            className="absolute left-1/2 top-1/2 rounded-full border border-line"
            style={{
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              transform: "translate(-50%, -50%)",
              opacity: 0.35 - i * 0.05,
            }}
          />
        ))}
        {/* Radial scrim keeps the centre clear so headline contrast is unaffected. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--bg) 0%, var(--bg) 34%, transparent 62%)",
          }}
        />
      </div>
    </div>
  );
}
