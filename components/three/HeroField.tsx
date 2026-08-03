"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { ScenePalette, SceneQuality } from "./sceneConfig";

/**
 * "Latent Field" — the hero scene.
 *
 * A volumetric drift of points flowing through a noise field: the visual
 * language of an embedding space, which is the substrate this portfolio's
 * author actually works in. It is deliberately weightless and monochrome —
 * one colour, no lights, no models — so it reads as instrumentation rather
 * than decoration.
 *
 * Three things make it feel alive without costing anything:
 *  - the whole field is ONE draw call (a single Points object, GPU-animated)
 *  - scroll drives dispersion and a camera dolly, so the page "opens up"
 *  - an aperture is punched in SCREEN space inside the vertex shader, so the
 *    headline always sits in clean air no matter the viewport
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2  uPointer;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uAspect;
  uniform float uApertureInner;
  uniform float uApertureOuter;
  uniform float uIntensity;

  attribute float aSeed;
  attribute float aScale;

  varying float vAlpha;
  varying float vMix;

  // --- Ashima/Gustavson simplex noise (3D), the compact canonical form ------
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  // -------------------------------------------------------------------------

  void main() {
    vec3 pos = position;

    // Three decorrelated noise samples give a smooth, non-repeating drift
    // without the cost of a true curl (which needs nine).
    float t = uTime * 0.06;
    vec3 flow = vec3(
      snoise(pos * 0.085 + vec3(t, 0.0, 0.0)),
      snoise(pos * 0.085 + vec3(0.0, t + 31.4, 0.0)),
      snoise(pos * 0.085 + vec3(0.0, 0.0, t + 71.2))
    );
    pos += flow * 1.9 * uIntensity;

    // Scroll pushes the field outward and thins it, so leaving the hero feels
    // like the field opening rather than a section simply scrolling away.
    pos += normalize(pos + 0.0001) * uScroll * 7.0;

    // Pointer parallax scaled by depth for a real sense of volume.
    pos.xy += uPointer * (1.2 + aSeed * 1.6);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec4 projected = projectionMatrix * mv;
    gl_Position = projected;

    // --- screen-space aperture ---------------------------------------------
    // Fade points out as they approach the centre of the viewport, where the
    // headline lives. Doing it here (rather than with a DOM scrim) means the
    // exclusion follows the camera and viewport automatically.
    vec2 ndc = projected.xy / max(projected.w, 0.0001);
    float d = length(vec2(ndc.x * uAspect, ndc.y) / max(uAspect, 1.0));
    float aperture = smoothstep(uApertureInner, uApertureOuter, d);

    // Fade at the far edge too, so the field dissolves instead of clipping.
    float rim = 1.0 - smoothstep(0.72, 1.15, d);

    float depthFade = smoothstep(-38.0, -6.0, mv.z);
    vAlpha = aperture * rim * depthFade * (1.0 - uScroll * 0.85);

    // Gradient position per particle: depth + seed, so the field reads as
    // one warm-to-cool sweep instead of randomly speckled colour.
    vMix = clamp(aSeed * 0.55 + smoothstep(-26.0, 4.0, mv.z) * 0.45, 0.0, 1.0);

    gl_PointSize = uSize * aScale * uPixelRatio * (14.0 / max(-mv.z, 1.0));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3  uWarm;
  uniform vec3  uCool;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vMix;

  void main() {
    // Round, soft-edged point. Discarding outside the disc keeps the sprite
    // from showing its quad on overlap.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float mask = smoothstep(0.5, 0.05, d);
    float alpha = vAlpha * uOpacity * mask;
    if (alpha < 0.002) discard;
    gl_FragColor = vec4(mix(uWarm, uCool, vMix), alpha);
  }
`;

/** Deterministic hash — stable geometry across renders and StrictMode remounts. */
function hash(i: number, salt: number): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function HeroField({
  palette,
  quality,
  reducedMotion,
}: {
  palette: ScenePalette;
  quality: SceneQuality;
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();

  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scroll = useRef(0);

  const count = quality.particleCount;

  // A lens-shaped volume: spherical shell flattened on Z. Reads as a field
  // surrounding the content rather than a ball floating behind it.
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const u = hash(i, 1);
      const v = hash(i, 2);
      const w = hash(i, 3);

      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const radius = 6.5 + Math.pow(w, 0.65) * 12.5;

      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius * 0.72;
      positions[i * 3 + 2] = Math.cos(phi) * radius * 0.42;

      seeds[i] = hash(i, 4);
      scales[i] = 0.45 + hash(i, 5) * 1.15;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  // Narrow viewports carry more headline, so the clear centre grows.
  const aspect = viewport.width / Math.max(viewport.height, 0.001);
  const apertureInner = aspect < 0.85 ? 0.5 : aspect < 1.4 ? 0.42 : 0.34;

  // Initial uniform values only. Every later write goes through
  // `materialRef.current.uniforms` — the object three.js owns — so the frame
  // loop never mutates a value React is holding, and the material is never
  // rebuilt (which would recompile the shader program on every theme change).
  const initialUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 2.4 },
      uPixelRatio: { value: 1 },
      uAspect: { value: 1 },
      uApertureInner: { value: 0.34 },
      uApertureOuter: { value: 0.62 },
      uIntensity: { value: 1 },
      uWarm: { value: new THREE.Color("#ff6b2c") },
      uCool: { value: new THREE.Color("#2c6bff") },
      uOpacity: { value: 0.6 },
    }),
    []
  );

  // Everything that changes per *render* (theme, viewport, quality) is fed in
  // declaratively via R3F prop-piercing below, so React reconciles it and no
  // effect has to reach into the material. Only per-*frame* values (time,
  // pointer, scroll) are written imperatively, in useFrame.
  const warm = useMemo(() => new THREE.Color(palette.warm), [palette.warm]);
  const cool = useMemo(() => new THREE.Color(palette.cool), [palette.cool]);
  const opacity = palette.opacity + 0.2;
  const pixelRatio =
    typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio, quality.dpr[1]);
  const pointSize = size.width < 640 ? 1.9 : 2.4;

  // Scroll + pointer are read from refs in the frame loop; neither triggers a
  // React render.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const height = hero?.offsetHeight ?? window.innerHeight;
      scroll.current = Math.min(1, Math.max(0, window.scrollY / Math.max(height, 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!quality.enablePointer || reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [quality.enablePointer, reducedMotion]);

  useFrame((state, delta) => {
    const u = materialRef.current?.uniforms;
    if (!u) return;
    const dt = Math.min(delta, 0.05);

    if (!reducedMotion) {
      u.uTime.value = state.clock.elapsedTime;
      pointer.current.x += (pointer.current.tx - pointer.current.x) * 0.045;
      pointer.current.y += (pointer.current.ty - pointer.current.y) * 0.045;
      u.uPointer.value.set(pointer.current.x * 0.55, pointer.current.y * 0.4);

      if (pointsRef.current) {
        pointsRef.current.rotation.z += dt * 0.006;
      }
    }

    // Eased so a fast flick does not snap the field.
    u.uScroll.value += (scroll.current - u.uScroll.value) * 0.06;

    // Gentle dolly: the camera retreats as the hero scrolls away, which reads
    // as depth rather than the section merely translating.
    const cam = state.camera;
    cam.position.z += (14 + u.uScroll.value * 7 - cam.position.z) * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={initialUniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        uniforms-uWarm-value={warm}
        uniforms-uCool-value={cool}
        uniforms-uOpacity-value={opacity}
        uniforms-uAspect-value={Math.max(aspect, 0.0001)}
        uniforms-uApertureInner-value={apertureInner}
        uniforms-uApertureOuter-value={apertureInner + 0.3}
        uniforms-uIntensity-value={quality.animationIntensity}
        uniforms-uPixelRatio-value={pixelRatio}
        uniforms-uSize-value={pointSize}
      />
    </points>
  );
}
