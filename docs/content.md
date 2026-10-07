# Site content: source of truth (updated 2026-10-07)

Rule: the site renders only what is written here or in the owner's CV. Anything marked `TODO(owner)` is unanswered and is left out of the live page.

## Hero
- Headline: "AI/ML systems that show their sources." (draft by Claude, from the CV positioning; owner may reword)
- Sub-line: I'm Sakibur Rahman, an AI developer at Sparktech Agency. I build RAG, agentic and ML systems whose answers trace to sources.
- Contact: sakibursrrahman@gmail.com · LinkedIn /in/srnrahman · GitHub Sakibur-16 (CV spelling; owner typed "Sakibur16", confirm) · Google Scholar (user M7TDa2gAAAAJ)

## Footnote sources ([n] markers)
1 Quranity · 2 Sparktech AI Developer role · 3 Malaria paper (ICDMIS 2025, Springer) · 4 SPICSCON 2025 paper (IEEE) · 5 RAAICON 2024 paper (IEEE)

## 01 Quranity (lead)
- 2026 · Lead AI Developer & PM (CV; owner confirmed over the earlier "2024, AI Developer, PM & QA")
- Qalam: searches a Qur'an and Hadith database by meaning, then passes sources + instructions to the model. Answers in English, Arabic and Albanian; each answer shows its Qur'an or Hadith reference.
- Hard part: generic fallback whenever the retrieved source mismatched, plus language detection not working; fixed by rebuilding the prompting and instructions. Now answers from the closest related sources.
- Testing: manual and automated, people and bots.
- Live: Google Play (1K+ downloads, per the listing the owner supplied), App Store, quranity.app/en
- Image: crop of the owner's landing-page screenshot (`public/work/quranity-app.jpg`).
- Answer-path diagram confirmed by the owner ("yes").
- Stack shown: Python, FastAPI, OpenAI API, Flutter, RAG, semantic search, Qur'an and Hadith database. (Flutter, RAG, semantic search from the CV; FastAPI and OpenAI from old repo data.)

## EQi30 (HIDDEN on the site for now)
Set `published: true` on `eqi30` in `data/work.ts` to show it again; numbering updates automatically.
- 2025 · AI Developer, AI service layer · In production (owner)
- 12 engines (assessment, coaching, microlearning, adaptive scheduling); 28 source documents reconciled into 40 abilities across 6 competencies; 30 with complete day-by-day programs. These figures come from the owner's earlier write-up. TODO(owner): confirm they are still accurate and public.

## 02 Malaria diagnosis
- 2025 · CNN classification across datasets for generalization; ICDMIS 2025, Springer. Finding line added from the abstract the owner pasted: flags model robustness, dataset diversity and site-specific bias; proposes transfer and incremental learning.

## 03 More projects (short entries, from the CV)
Hairlync, JobAssist AI, Wondertales, Finance AI. A closing sentence mentions Frazzl Kid, Aura, Everidog, BYOJ and Alfred (AI dating concierge).

## Research
Three papers with DOI links; plus "Early medical-imaging research" (2023-2024, CV). One summary line per paper, from the abstracts the owner pasted (SPICSCON: T5, BERT and GPT-2 compared with BLEU, ROUGE, METEOR and human assessment; RAAICON: MUSE-headband EEG controlling a robotic car, 85% control accuracy, 300 ms average response).

## Experience (CV)
AI Developer (Spark of the Quarter), Junior AI Developer, Trainee AI Developer at Sparktech Agency; Associate at Acote Group (Nov 2024 to May 2025, contract then full-time). Intro line from the CV: led AI development on 15+ live and production-ready applications. Education: BSc CSE, East West University, CGPA 3.56/4.00.

## Removed
Rise (owner decision), stat counters, At a glance, marquee, 8 service cards, auto-cycling deck, Aura/Everidog/BYOJ as case studies.

## Not on the site (owner decisions)
Profile photo (owner will add), availability line, phone number.

## SEO and ops
Canonical/OG: https://www.sakibursr.me (apex redirects to www on Vercel). OG image is `app/opengraph-image.png`. Hosting: Vercel; set `NEXT_PUBLIC_SITE_URL=https://www.sakibursr.me` and enable Web Analytics in the Vercel project (the `<Analytics />` component is already in the layout).
