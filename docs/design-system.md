# Design direction update (2026-10-07): "framed hybrid"

Supersedes the serif/hairline notes below where they conflict. Inspired by the structure of an agency site the owner liked (rounded hero frame, pill buttons, floating header, device tiles); nothing copied, and no stat counters, logo strips or fake social proof.

- Page: light paper by default (opens light whatever the OS says), navy dark mode on toggle.
- Hero: rounded always-dark frame (28px) with the headline, CTAs and the Quranity phones rising from the bottom edge; contents as pills below.
- Header: floating dark pill with local Dhaka time.
- Type: Geist only (bold, tight, -0.035em), Geist italic for emphasis, Geist Mono for metadata. Newsreader removed.
- Shape: soft. Frames 28px, tiles 24px, buttons and chips pill, popover 14px.
- Buttons: pill with an arrow chip that slides on hover; press scales to 0.97.
- Tiles: fixed colour plates (blue, navy, sand, mist) for project entries; real product imagery only where it exists.
- Motion: word-by-word headline reveal, drawn underline, IntersectionObserver scroll reveals, drawn rules, scroll-progress bar, active-section nav. Reduced motion keeps soft fades.

# Design system — "research notebook" (PROPOSAL, awaiting approval)

Status: draft. No site code has been changed. Colour contrast below was computed (WCAG 2.x), not eyeballed.
Note: the `taste-skill` was not available in this session, so this is my own proposal following the handoff brief. Re-run it through the skill if you install it.

## Principles
1. The site cites itself. Claims carry `[n]` markers that expand inline to the paper, project or role behind them.
2. One accent colour, used for links, markers and focus only. Everything else is paper and ink.
3. Structure comes from hairline rules and whitespace, not cards, shadows or gradients.
4. Narrow reading column; wide only for architecture diagrams.
5. Banned: purple gradients, glow blobs, glassmorphism, emoji icons, Inter, placeholder text, invented numbers.

## Colour tokens
| Token | Light | Dark | Use |
|---|---|---|---|
**Revision (build):** the accent changed from rust to pen-ink blue. The design skill flags warm paper + rust/clay as the most common generic palette; blue ink on warm paper keeps the notebook feel and is more distinctive. Dark mode uses a cool near-black. Values below are what ships in `app/globals.css`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F2F0E9` | `#0F1013` | page |
| `--surface` | `#E9E6DC` | `#181A20` | footnote popover |
| `--ink` | `#13141A` | `#ECEAE3` | body and headings |
| `--muted` | `#575A63` | `#9EA1AA` | metadata, captions |
| `--rule` | `#D3D0C4` | `#2B2E36` | 1px hairlines (decorative, no text) |
| `--accent` | `#2A3FD6` | `#8FA3FF` | links, `[n]` markers, focus ring, primary button |

Contrast (text tokens must be ≥ 4.5:1):

| Pair | Light | Dark |
|---|---|---|
| ink on bg | 16.1 | 15.8 |
| muted on bg | 6.0 | 7.4 |
| muted on surface | 5.5 | 6.7 |
| accent on bg | 6.6 | 8.0 |
| accent on surface | 6.1 | 7.3 |

axe-core (WCAG 2.0/2.1/2.2 A and AA plus best-practice) reports zero violations at 1440px and 390px in both themes.

Dark mode: follows `prefers-color-scheme` by default, with a manual toggle stored in localStorage (the existing ThemeProvider already stamps `data-theme` before paint; keep that mechanism).

## Typography
- Display / headings: **Newsreader** (variable, opsz axis), weights 400 and 500. Alternative: Instrument Serif (single weight, more dramatic). Default to Newsreader because it also works for long body-adjacent text.
- Body / UI: **Geist** (already installed via `@fontsource-variable/geist`).
- Metadata, footnote markers, dates, stack lists: **Geist Mono** (already installed).
- Add `@fontsource-variable/newsreader`. Latin subset only.

Type scale (fluid, `clamp`), ratio about 1.25:

| Role | Size | Line height | Font |
|---|---|---|---|
| Hero | `clamp(2.5rem, 1.6rem + 4vw, 4.5rem)` | 1.05 | Newsreader 400, tracking -0.02em |
| H2 (section) | `clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)` | 1.15 | Newsreader 400 |
| H3 (case-study step) | 1.25rem | 1.3 | Newsreader 500 |
| Body | 1.0625rem (17px) | 1.65 | Geist 400 |
| Small / caption | 0.875rem | 1.5 | Geist 400, muted |
| Meta | 0.75rem, uppercase, +0.06em | 1.4 | Geist Mono, muted |

Reading column: `max-width: 62ch` for prose, 72rem page max, diagrams may span the full 72rem.

## Spacing, grid, radii
- 4px base. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144.
- Section gap: 96px mobile, 144px desktop. Gutter: 16px at 390px, 32px at 1440px.
- 12-column grid at 1440. Prose in columns 4–9; metadata (dates, role, `[n]` notes) in a left margin column 1–3 that collapses inline under 768px.
- Hairlines: `1px solid var(--rule)` between sections and list rows.
- Radii: 0 for layout, 2px for buttons/inputs/popovers. No pill shapes, no large rounded cards.
- Elevation: none. The footnote popover gets a 1px rule border and `--surface`, no shadow.

## Components
- **Cite marker** `[1]`: Geist Mono 0.75em superscript, accent, keyboard-focusable button. Expands inline (below the paragraph) to a source line: title, venue/role, year, link. Ghost underline on hover. Content comes only from `docs/content.md`.
- **Case-study block**, fixed order: Problem, My role, How it works (diagram), The hard part, Result, Stack. Metadata rail on the left: year, role, status.
- **Diagram**: inline SVG, 1.5px strokes in `--ink`, labels in Geist Mono, one accent stroke for the grounding/retrieval path. Light and dark through tokens.
- **Link**: accent text, 1px underline offset 3px; focus ring `2px solid var(--accent)`, offset 2px.
- **Button**: rectangular, 1px ink border, 2px radius; primary is ink-filled.
- **Experience**: a compact ruled table (dates in mono, role, org). No timeline graphic.

## Motion (from the brief)
- Animate only `transform` and `opacity`.
- Entrances: ease-out (`cubic-bezier(0.23, 1, 0.32, 1)`), start at `scale(0.95)` + `opacity: 0`, 200–280ms, no ease-in on UI.
- Buttons: `:active { transform: scale(0.97) }`, 120ms.
- Footnote expand: opacity + 4px translate, 160ms. No animation on theme toggle, nav, or other frequent actions.
- `@media (prefers-reduced-motion: reduce)`: remove all transforms; keep opacity-only or none.

## Removals from the current codebase (for when you approve)
Components: `TrustStrip` (stat counters / at a glance), `Expertise` (8 service cards), the marquee, `ProjectCarousel`, `Preloader`, `CursorFX`, `GrainOverlay`, `GlowBlob`, `IndexRail`, `ScrollProgress`, and the three.js hero (`components/three/*`, plus the `three`, `@react-three/fiber` and probably `gsap` deps). The unfinished projects (Everidog, Aura, BYOJ) come out of the list. Dropping three.js and GSAP will also help the Lighthouse target.

## Accessibility and QA targets
No horizontal scroll at 390px; Lighthouse above 90; text contrast at least 4.5:1 in both themes (table above); visible focus rings; everything reachable by keyboard; skip link (already present); no placeholder text.
