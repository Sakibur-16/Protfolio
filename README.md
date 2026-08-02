# Md. Sakibur Rahman — Portfolio

A production-quality personal portfolio built with Next.js (App Router), TypeScript,
Tailwind CSS v4, React Three Fiber, GSAP, and Framer Motion. Every visible piece of
content is driven by the files in `/data` — components render data, they never contain
hardcoded portfolio copy.

## Tech stack

- **Next.js 16** (App Router, Turbopack, static generation wherever possible)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (token-based theme in `app/globals.css`)
- **React Three Fiber + drei** — the hero neural-field visual
- **GSAP** — hero headline reveal
- **Framer Motion** — scroll reveals, magnetic buttons, page/menu transitions
- **Self-hosted fonts** via `@fontsource-variable/*` (Fraunces, Inter) and
  `@fontsource/ibm-plex-mono` — no runtime dependency on Google Fonts
- **Lucide React** — icons

## Getting started

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL to your real domain
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

The build has been verified to compile, type-check, lint clean, and statically generate
every route (the homepage, all 14 project detail pages, `sitemap.xml`, and `robots.txt`).

## Deployment

Any platform that supports Next.js App Router works (Vercel is the simplest). Steps:

1. Push this repository to GitHub.
2. Import it into Vercel (or your platform of choice).
3. Set the `NEXT_PUBLIC_SITE_URL` environment variable to your production domain.
4. Deploy.

## How to update your portfolio

Everything you'll ever want to change lives in `/data`. You should not need to touch
component code to update content.

| File | Controls |
|---|---|
| `data/site.ts` | Site title, meta description, canonical URL, theme color, OG image path |
| `data/profile.ts` | Name, role title, hero headline, location, availability status, bio paragraphs, email, résumé URL |
| `data/navigation.ts` | Header nav links and the left index-rail codes/labels |
| `data/socialLinks.ts` | Email / LinkedIn / GitHub / Scholar / résumé links — any entry with `href: null` is hidden automatically |
| `data/credibility.ts` | The four stats in the strip under the hero |
| `data/projects.ts` | Every project — both `selectedWork` (featured case studies) and `additionalProjects` (compact archive). See field notes below. |
| `data/skills.ts` | The Expertise section's domain groups and the items/tags inside each |
| `data/experience.ts` | The Acote Group timeline entries |
| `data/publications.ts` | The Research section's three publications |
| `data/education.ts` | Degree, institution, GPA, core areas |
| `data/certifications.ts` | Certificates listed under Credentials |
| `data/languages.ts` | Language proficiency block |

### Editing a project

Open `data/projects.ts`. Every project is a plain object matching the `Project` type in
`types/portfolio.ts`. Useful conventions already in place:

- Set `image: "/projects/your-image.jpg"` (and drop the file in `public/projects/`) to
  replace the generated abstract panel with a real screenshot.
- Any of `links.external`, `links.repository`, `links.store` can be a real URL or `null`
  — buttons for `null` values simply don't render.
- `challenge` / `approach` / `outcome` can be `null` if you don't want to claim specifics
  yet — the case study will show "Full case-study detail available on request" instead
  of an empty section.
- `status: "undisclosed"` is used deliberately for projects where I didn't have
  confirmed detail to work from, rather than guessing. Change it once you supply real
  detail.
- Moving a project between `selectedWork` and `additionalProjects` changes whether it
  gets a full-bleed case-study spread or a compact archive row — no other code changes
  needed.

## Missing personal details to add

These were intentionally left as `null` / placeholders rather than invented. The UI
hides the related buttons/links gracefully until you fill them in:

- **Email** — `data/profile.ts` (`email`) and `data/socialLinks.ts` (`email` entry)
- **LinkedIn URL** — `data/socialLinks.ts`
- **GitHub URL** — `data/socialLinks.ts`
- **Google Scholar URL** — `data/socialLinks.ts`
- **Résumé PDF** — drop the file at `public/resume.pdf` and set `resumeUrl` in
  `data/profile.ts` and the `resume` entry in `data/socialLinks.ts`
- **Open Graph image** — add a real `public/og-image.png` (1200×630 recommended); the
  path is already wired up in `data/site.ts`
- **Earlier Acote Group role** — `data/experience.ts` has a placeholder entry
  (`acote-earlier-role`) with `role: "AI/ML Role"` and `startDate`/`endDate: "TBD"`.
  Update these three fields once you confirm the exact title and dates; the
  "Title pending confirmation" badge will disappear automatically once
  `isPlaceholder` is removed.
- **Project detail for the 8 undocumented projects** — JobAssist AI, Hairlync,
  Wondertales, Help Me Speak, StudyPal QLD, Aura, Everidog, and BYOJ currently have
  only a title, year, and a short, deliberately conservative one-line description.
  Add `challenge`/`approach`/`outcome`, `technologies`, real `role`, and a confirmed
  `status` in `data/projects.ts` once you have the details — everything else (layout,
  filtering, links) is already wired to use them.

One assumption made on your behalf: **"Quranity"** (from your brief) was mapped to the
Quranic REST API project I had context on (tajweed-coded Arabic text, word-by-word
translation, SQLite FTS5 search). Flag me if that's actually a different project.

## Project structure

```
app/                  Routes: homepage, /projects/[slug], sitemap.ts, robots.ts
components/
  layout/              Header, Footer, index rail, cursor, grain, scroll progress, preloader
  sections/            One file per homepage section
  projects/            Case-study spread + project visual, shared by the homepage and detail pages
  three/               The neural-field hero visual, its CSS fallback, and the lazy-loading canvas wrapper
  motion/              Reveal (scroll-in) and MagneticButton wrappers
  ui/                  Small presentational atoms (Button, Tag, Eyebrow, SectionHeading, SocialLinks)
data/                  All portfolio content — see table above
types/portfolio.ts     Shared TypeScript interfaces for every data model
lib/                   Metadata/JSON-LD builders, motion variants, small utilities
```

## Accessibility & performance notes

- The hero canvas is `aria-hidden`, pauses rendering when scrolled offscreen, reduces
  geometry complexity on narrow viewports, and falls back to a static/animated SVG when
  WebGL is unavailable or `prefers-reduced-motion` is set.
- The custom cursor and magnetic-button effects only activate on fine-pointer (mouse)
  devices and are skipped under `prefers-reduced-motion`.
- Every interactive element is reachable and operable by keyboard, with a visible focus
  ring and a "Skip to content" link.
- The Three.js bundle is lazy-loaded (`next/dynamic`, `ssr: false`) so it never blocks
  the initial page render.
