# Site content — single source of truth

Rule: the site renders only what is written here. Anything marked `TODO(owner)` is unanswered and must be filled in or cut. Nothing is invented. "Pre-filled" means copied from the handoff or the current repo; confirm it.

## Hero
- One-line statement: TODO(owner) — the old line ("I build AI that reasons, retrieves, and acts") is retired. Owner to supply; I will not draft it from invented claims.
- Sub-line (pre-filled): AI developer at Sparktech Agency, Dhaka. Builds RAG and agentic systems whose answers trace back to real sources.
- Links: email TODO(owner), LinkedIn https://www.linkedin.com/in/srnrahman/

## Footnote sources (these power the `[n]` markers)
| n | Source | Venue / role | Year |
|---|---|---|---|
| 1 | Assessing Generalization Capabilities of AI Models for Malaria Diagnosis Using Blood Smear Images (author) | ICDMIS 2025, Springer | 2025 |
| 2 | Bridging Code and Comprehension: Transformer Models for Java Source Code Summarization (co-author) | IEEE SPICSCON 2025 | 2025 |
| 3 | Neural Command: Real-Time EEG-Based BCI for Assistive Robotic Control (author) | IEEE RAAICON 2024 | 2024 |
Paper links / DOIs: TODO(owner)

## Case study 1 — Quranity (lead)
Owner answers (2026-10-06), now live in `data/work.ts`:
- Year 2024. Role: AI Developer, PM and QA. Qalam is the AI guidance service.
- Grounding: Qur'an/Hadith database lookup.
- No good source: answers from the closest related sources.
- Testing: manual and automated, by people and by bots.
- Hard part: generic fallback whenever the retrieved source mismatched, and language detection not working; fixed by rebuilding the prompting and instructions.
- Live on Google Play and the App Store; landing page https://quranity.app/en
- Drawn from those answers, please confirm: the 5-step answer path (question, language, source lookup, prompt, answer) and its order.
- Stack shown: Python, FastAPI, OpenAI API, Qur'an and Hadith database (FastAPI and OpenAI come from the old repo data).
- TODO(owner): Google Play and App Store URLs (not on the landing page, so not linked). Any publicly shareable numbers (users, corpus size, test results).
- Note: the old repo data described a 2026 build with a Full-Stack and DevOps role. The site now follows the owner's 2024 / AI Developer, PM and QA answer.

## Case study 2 — EQi30
Pre-filled from repo: 2025, AI service layer, 12 engines (assessment, coaching, microlearning, adaptive scheduling), Python + FastAPI. 28 source documents (docx/xlsx) reconciled into 40 abilities across 6 competencies, 30 with complete day-by-day programs.
- Problem / my role / how it works / hard part / result / stack: TODO(owner) confirm and extend
- Is the platform live? Public link? TODO(owner)

## Case study 3 — Rise
Pre-filled from repo: 2025, AI layer for a mobile life-coaching app, 11 FastAPI endpoints, 5 coaching personalities, SSE streaming with structured JSON.
- Hard part / result / stack: TODO(owner)

## Case study 4 — Malaria diagnosis research
Pre-filled: CNN classification of blood-smear images, cross-dataset generalization, TensorFlow/Keras, ICDMIS 2025 (Springer), footnote [1].
- Datasets used, and the actual generalization gap found: TODO(owner)
- Hard part / result: TODO(owner)

## Research list
The three papers above. Per paper, one line on what it found: TODO(owner)

## Experience (compact)
| Dates | Role | Org |
|---|---|---|
| Jul 2026 – present | AI Developer | Sparktech Agency |
| Jan 2026 – Jun 2026 | Junior AI Developer | Sparktech Agency |
| Oct 2025 – Dec 2025 | Trainee | Sparktech Agency |
| Nov 2024 – May 2025 | Associate | Acote Group |
Education: BSc CSE, East West University, GPA 3.56/4.00.
One line of what you did at each role: TODO(owner)

## Contact
Email TODO(owner). LinkedIn above. GitHub: TODO(owner) include or not?

## Cut from the new site
Stat counters, At a glance, marquee, 8 service cards, auto-cycling deck, Everidog, Aura, BYOJ.
Undecided: Hairlync, JobAssist AI, Wondertales, Alfred, Frazzl Kid, NibblAI (in repo, not in handoff). See question 9.

## SEO
- Canonical / OG origin: https://sakibursr.me (cause: `data/site.ts` falls back to sakiburrahman.dev when `NEXT_PUBLIC_SITE_URL` is unset; set the env var on the host and change the fallback).
- OG image: `/og-image.png` is referenced but does not exist in `public/`. Needs a real one (1200x630). Design TBD after approval.
