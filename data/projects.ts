import type { Project } from "@/types/portfolio";

// Accent colors are assigned by category, not by project, so color carries
// meaning: violet marks LLM/product-led work, cyan marks data- and vision-led
// work, ember marks speech/voice work. See globals.css for the token values.
const ACCENT = {
  violet: "#7C6CFF",
  cyan: "#46E0C4",
  ember: "#FF6A3D",
} as const;

// ---------------------------------------------------------------------------
// SELECTED WORK — prioritized case studies. Fields are only as detailed as
// the underlying facts support. Where a project has no confirmed detail
// beyond its name, challenge/approach/outcome are left null and status is
// "undisclosed" rather than guessed — the UI renders those honestly instead
// of hiding the project or inventing content for it.
// ---------------------------------------------------------------------------
export const selectedWork: Project[] = [
  {
    slug: "alfred-ai-dating-concierge",
    title: "Alfred",
    year: "2025",
    role: "AI Developer — AI service layer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "shipped",
    featured: true,
    shortDescription:
      "The AI service layer behind an AI dating concierge — conversational guidance grounded in live web search.",
    fullDescription:
      "Alfred is an AI dating concierge. This project scope covered the AI service layer only: a production-ready FastAPI backend built around a provider-agnostic LLM abstraction, so the underlying model can be swapped without touching the product around it, plus a live SerpAPI search integration for grounding advice in current, real-world information.",
    challenge:
      "A dating concierge needs to reason conversationally about a user's specific situation, not just recite generic advice — and static model knowledge alone can't keep answers current.",
    approach:
      "Built a provider-agnostic LLM abstraction so the concierge isn't locked to a single model vendor, and integrated SerpAPI so responses can draw on live search results. A full pytest suite covers the service layer.",
    outcome:
      "Delivered as a handoff-ready AI layer with test coverage in place, for a separate backend team to integrate into the product.",
    technologies: ["Python", "FastAPI", "Provider-agnostic LLM abstraction", "SerpAPI", "pytest"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2025",
    deliverables: "FastAPI service · Provider-agnostic LLM layer · Test suite",
    domainLabel: "Consumer dating",
    architecture: [
      {
        title: "FastAPI service layer",
        description: "The integration surface handed to the product's backend team.",
      },
      {
        title: "Provider-agnostic LLM abstraction",
        description:
          "A single internal interface over the model vendor, so the underlying model can be swapped without touching the product around it.",
      },
      {
        title: "Live search grounding",
        description:
          "SerpAPI integration so advice can draw on current, real-world information rather than static model knowledge.",
      },
    ],
    decisions: [
      {
        title: "Never bind the product to one model vendor",
        description:
          "Model quality and pricing move quickly. The abstraction means a vendor change is a config change, not a rewrite.",
      },
      {
        title: "Ground advice in live search",
        description:
          "Static model knowledge goes stale. Live retrieval keeps guidance anchored to what is actually true now.",
      },
    ],
    stackGroups: [
      { label: "Service", items: ["Python", "FastAPI"] },
      { label: "AI", items: ["Provider-agnostic LLM abstraction", "SerpAPI"] },
      { label: "Quality", items: ["pytest"] },
    ],
    features: [
      "Conversational dating guidance grounded in live web search",
      "Swappable model provider behind one interface",
      "Full pytest coverage across the service layer",
    ],
    challenges: [
      {
        problem:
          "A concierge has to reason about a user's specific situation, not recite generic advice — and static model knowledge cannot keep answers current.",
        solution:
          "Paired a conversational LLM layer with live SerpAPI retrieval, so responses combine reasoning with current information.",
      },
    ],
  },
  {
    slug: "eqi30-emotional-intelligence-platform",
    title: "EQi30",
    year: "2025",
    role: "AI Developer — AI service layer",
    category: "llm-application",
    domains: ["llm", "product", "education"],
    status: "shipped",
    featured: true,
    shortDescription:
      "A 12-engine AI system powering assessment, coaching, and microlearning for an emotional-intelligence platform.",
    fullDescription:
      "EQi30 is an emotional-intelligence platform. The AI service layer spans 12 engines covering assessment, coaching, microlearning, and adaptive scheduling, built in Python and FastAPI. A significant part of the work was data engineering: 28 separately authored microskill documents (docx and xlsx) had to be parsed and reconciled into one consistent structure the engines could run on.",
    challenge:
      "Translating a large body of emotional-intelligence content, authored across 28 separate documents with inconsistencies between them, into a structure a product could actually run coaching and scheduling logic on.",
    approach:
      "Built 12 AI engines spanning assessment, coaching, microlearning, and adaptive scheduling, and ran a dedicated content-mapping pass to resolve inconsistencies across the source documents.",
    outcome:
      "Mapped the source content into 40 abilities across 6 competencies, with 30 of those abilities now carrying complete day-by-day programs for the coaching engines to run on.",
    technologies: ["Python", "FastAPI", "Content data engineering"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
  },
  {
    slug: "rise-life-coaching-app",
    title: "Rise",
    year: "2025",
    role: "AI Developer — AI service layer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "shipped",
    featured: true,
    shortDescription:
      "The AI layer for a mobile life-coaching app: eleven endpoints, five coaching personalities, and streamed responses.",
    fullDescription:
      "Rise is a mobile life-coaching app. Its AI layer exposes 11 FastAPI endpoints built around a five-personality tone system, so coaching responses feel distinct depending on the personality selected. Responses stream to the client over server-sent events as structured JSON, rather than arriving as a single blocking reply.",
    challenge:
      "Coaching needed to feel personal and immediate in a mobile client — five distinct personalities, delivered as a smooth stream rather than a delayed wall of text.",
    approach:
      "Designed 11 endpoints around a five-personality tone system, with server-sent-event streaming and structured JSON outputs the mobile app could render as it arrived.",
    outcome:
      "Delivered as a standalone AI service layer, ready for the mobile app's backend team to integrate.",
    technologies: ["Python", "FastAPI", "Server-Sent Events", "Structured JSON outputs"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
  },
  {
    slug: "medical-imaging-diagnostics",
    title: "Medical Imaging Diagnostics",
    year: "2025",
    role: "Researcher",
    category: "computer-vision",
    domains: ["computer-vision", "healthcare"],
    status: "research",
    featured: true,
    shortDescription:
      "CNN-based image classification for malaria diagnosis from blood-smear images, evaluated for generalization across datasets.",
    fullDescription:
      "Diagnostic imaging models often score well on the dataset they were trained on and degrade on a different one collected under different conditions. This research trained and evaluated CNN-based image classification models across multiple blood-smear datasets, with the evaluation specifically designed around generalization rather than single-benchmark accuracy.",
    challenge:
      "Blood-smear datasets vary in staining, imaging equipment, and collection conditions — a model that performs well on one can fail on another, which matters a great deal for a diagnostic tool.",
    approach:
      "Trained CNN-based classification models in TensorFlow and Keras and assessed how performance generalized across datasets rather than optimizing for one.",
    outcome:
      "The findings were peer-reviewed and presented at ICDMIS 2025 (Springer) — see the Research section below.",
    technologies: ["Python", "TensorFlow", "Keras", "CNNs", "Image classification"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
  },
  {
    slug: "jobassist-ai",
    title: "JobAssist AI",
    year: "2024",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "product"],
    status: "in-development",
    featured: true,
    shortDescription:
      "An AI job-search platform for the French market — CV building, cover letters, application emails, and role matching.",
    fullDescription:
      "A job-search platform aimed at applicants in France, built around four AI surfaces: a CV builder, a cover-letter generator, an application-email generator, and AI-driven job matching and recommendations. Each surface has to produce output a candidate can actually send without rewriting it.",
    challenge:
      "Generated application material fails the moment it reads as generic — it has to reflect the specific candidate and the specific posting, in the conventions the French hiring market expects.",
    approach:
      "Built the AI layer as a set of focused generators — CV, cover letter, application email — alongside a matching and recommendation system, rather than one general-purpose prompt doing everything.",
    outcome: null,
    technologies: ["Python", "LLM integration", "Prompt engineering"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    timeline: "2024",
    deliverables: "AI generation layer · Job matching",
    domainLabel: "Careers · France",
    architecture: [
      {
        title: "Focused generators",
        description:
          "Separate CV, cover-letter, and application-email generators rather than one general-purpose prompt serving every surface.",
      },
      {
        title: "Matching & recommendation",
        description: "Ranks openings against a candidate's profile to surface roles worth applying to.",
      },
    ],
    decisions: [
      {
        title: "One generator per artefact",
        description:
          "A CV, a cover letter, and an outreach email have different conventions and constraints. Splitting them made each output usable without a rewrite.",
      },
    ],
    stackGroups: [
      { label: "AI", items: ["Python", "LLM integration", "Prompt engineering"] },
    ],
    features: [
      "AI CV builder",
      "AI cover-letter generator",
      "AI application-email generator",
      "AI job matching and recommendations",
    ],
    challenges: [
      {
        problem:
          "Generated application material fails the moment it reads as generic — it has to reflect the specific candidate, the specific posting, and French hiring conventions.",
        solution:
          "Built each artefact as its own generator with its own constraints, instead of one prompt trying to cover every case.",
      },
    ],
    todo: "Confirm launch status, live URL, and measurable outcome once available.",
  },
];

// ---------------------------------------------------------------------------
// ADDITIONAL PROJECTS — compact archive presentation, lighter on detail by
// design. See components/sections/AdditionalProjects.tsx.
// ---------------------------------------------------------------------------
export const additionalProjects: Project[] = [
  {
    slug: "quranity",
    title: "Quranity",
    year: "2024",
    role: "AI Developer, PM & QA",
    category: "rag-search",
    domains: ["rag", "nlp", "education"],
    status: "shipped",
    featured: false,
    shortDescription:
      "A live Qur'an app with Qalam, an AI assistant whose answers are grounded in Qur'an and Hadith retrieval.",
    fullDescription:
      "A Qur'anic study app shipped on Google Play. Its centrepiece is Qalam, an AI assistant that answers questions by retrieving from Qur'an and Hadith sources rather than generating from model memory. The app also carries cinematic Qur'an stories and prayer times. Underneath sits a Python service exposing tajweed colour-coded Arabic text, word-by-word translation, grammatical breakdown, and tafsir, with full-text search over the corpus.",
    challenge:
      "Religious answers are exactly where a model must not improvise. Every response has to trace back to a real source, which makes this a retrieval problem before it is a generation one.",
    approach:
      "Built the assistant as a retrieval-grounded system over structured Qur'an and Hadith data, with a full-text search layer beneath it, and carried the work through product management and QA as well as the AI layer.",
    outcome: "Live on Google Play with the Qalam assistant, Qur'an stories, and prayer times in production.",
    technologies: ["Python", "Flutter", "Dart", "RAG", "Full-text search"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    timeline: "2024",
    deliverables: "Android app · Retrieval-grounded AI assistant · Content API",
    domainLabel: "Islamic education",
    architecture: [
      {
        title: "Structured Qur'an & Hadith corpus",
        description:
          "Tajweed colour-coded Arabic text, word-by-word translation, grammatical breakdown, and tafsir, normalised into one queryable structure.",
      },
      {
        title: "Retrieval layer",
        description:
          "Full-text search over the corpus, so a question resolves to specific passages before any model is asked to phrase an answer.",
      },
      {
        title: "Qalam assistant",
        description:
          "The response layer. It answers only from what retrieval returned, which is what keeps religious answers attributable.",
      },
    ],
    decisions: [
      {
        title: "Retrieval before generation",
        description:
          "Religious answers are exactly where a model must not improvise. Treating this as a search problem first made every answer traceable to a source.",
      },
      {
        title: "One corpus, many surfaces",
        description:
          "The same structured data powers the assistant, the reading view, and search — rather than maintaining separate content pipelines per feature.",
      },
    ],
    stackGroups: [
      { label: "Application", items: ["Flutter", "Dart"] },
      { label: "AI & retrieval", items: ["Python", "RAG", "Full-text search"] },
    ],
    features: [
      "Qalam — an AI assistant grounded in Qur'an and Hadith retrieval",
      "Cinematic Qur'an stories",
      "Prayer times",
      "Tajweed colour-coded Arabic with word-by-word translation",
    ],
    challenges: [
      {
        problem:
          "A general-purpose model will confidently produce religious claims it cannot support, which is unacceptable in this domain.",
        solution:
          "Constrained the assistant to answer from retrieved passages only, so the failure mode becomes \"no answer found\" rather than a fabricated one.",
      },
    ],
    todo: "Add the Google Play store URL to links.store — the listing is live but the URL was not supplied.",
  },
  {
    slug: "frazzl-kid",
    title: "Frazzl Kid",
    year: "2025",
    role: "Deployment & DevOps Support",
    category: "education",
    domains: ["education", "product"],
    status: "shipped",
    featured: false,
    shortDescription: "Production deployment support for a FastAPI backend behind a children's educational app.",
    fullDescription:
      "Guided a first-time production deployment of the Frazzl Kid API to a Hostinger VPS, including SSH access, systemd service configuration, and firewall setup.",
    challenge: null,
    approach: "Configured SSH, systemd, and firewall rules for a first-time VPS deployment.",
    outcome: "The API was moved from local development to a running production deployment.",
    technologies: ["Python", "FastAPI", "Hostinger VPS", "systemd"],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    timeline: "2025",
    deliverables: "Production deployment · Service configuration",
    domainLabel: "Children's education",
    architecture: [
      {
        title: "Hostinger VPS",
        description: "The target environment for the first production deployment.",
      },
      {
        title: "systemd service",
        description: "Keeps the FastAPI backend running and restarting reliably as a managed service.",
      },
      {
        title: "SSH & firewall",
        description: "Access and network rules configured for a first-time production environment.",
      },
    ],
    stackGroups: [
      { label: "Application", items: ["Python", "FastAPI"] },
      { label: "Infrastructure", items: ["Hostinger VPS", "systemd", "Linux"] },
    ],
  },
  {
    slug: "wondertales",
    title: "Wondertales",
    year: "2024",
    role: "AI Developer",
    category: "llm-application",
    domains: ["llm", "education"],
    status: "undisclosed",
    featured: false,
    shortDescription: "An AI-powered storytelling product for children.",
    fullDescription: "Full case-study detail for this project is being finalized.",
    challenge: null,
    approach: null,
    outcome: null,
    technologies: [],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    todo: "Add confirmed detail once available.",
  },
  {
    slug: "hairlync",
    title: "Hairlync",
    year: "2024",
    role: "AI Developer",
    category: "product-platform",
    domains: ["product"],
    status: "undisclosed",
    featured: false,
    shortDescription: "An AI-supported product in the hair and beauty-care space.",
    fullDescription: "Full case-study detail for this project is being finalized.",
    challenge: null,
    approach: null,
    outcome: null,
    technologies: [],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    todo: "Add confirmed detail once available.",
  },
  {
    slug: "everidog",
    title: "Everidog",
    year: "2024",
    role: "AI Developer",
    category: "product-platform",
    domains: ["product"],
    status: "undisclosed",
    featured: false,
    shortDescription: "A product for dog owners.",
    fullDescription: "Full case-study detail for this project is being finalized.",
    challenge: null,
    approach: null,
    outcome: null,
    technologies: [],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    todo: "Add confirmed detail once available.",
  },
  {
    slug: "aura",
    title: "Aura",
    year: "2024",
    role: "AI Developer",
    category: "product-platform",
    domains: ["product"],
    status: "undisclosed",
    featured: false,
    shortDescription: "Case study details for this project are being finalized.",
    fullDescription: "Full case-study detail for this project is being finalized.",
    challenge: null,
    approach: null,
    outcome: null,
    technologies: [],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.violet,
    todo: "Add confirmed detail once available.",
  },
  {
    slug: "byoj",
    title: "BYOJ",
    year: "2024",
    role: "AI Developer",
    category: "tooling",
    domains: ["product"],
    status: "undisclosed",
    featured: false,
    shortDescription: "Case study details for this project are being finalized.",
    fullDescription: "Full case-study detail for this project is being finalized.",
    challenge: null,
    approach: null,
    outcome: null,
    technologies: [],
    image: null,
    gallery: [],
    links: { external: null, repository: null, store: null },
    accentColor: ACCENT.cyan,
    todo: "Add confirmed detail once available.",
  },
];

export const allProjects: Project[] = [...selectedWork, ...additionalProjects];

/**
 * The six projects that lead the work section, in the order they should
 * appear. Kept as an explicit slug list so the running order is a deliberate
 * editorial decision rather than a side effect of array position.
 */
const FEATURED_SLUGS = [
  "quranity",
  "hairlync",
  "jobassist-ai",
  "wondertales",
  "alfred-ai-dating-concierge",
  "frazzl-kid",
] as const;

export const featuredProjects: Project[] = FEATURED_SLUGS.map((slug) => {
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Featured project "${slug}" is missing from the project data.`);
  return project;
});

export const otherProjects: Project[] = allProjects.filter(
  (project) => !FEATURED_SLUGS.includes(project.slug as (typeof FEATURED_SLUGS)[number])
);

/** Previous/next neighbours for the case-study pager, wrapping at both ends. */
export function projectNeighbours(slug: string): { previous: Project; next: Project } | null {
  const ordered = [...featuredProjects, ...otherProjects];
  const index = ordered.findIndex((p) => p.slug === slug);
  if (index === -1 || ordered.length < 2) return null;
  return {
    previous: ordered[(index - 1 + ordered.length) % ordered.length],
    next: ordered[(index + 1) % ordered.length],
  };
}

export const projectCategoryLabels: Record<Project["category"], string> = {
  "llm-application": "LLM Application",
  "rag-search": "RAG & Search",
  nlp: "NLP",
  "computer-vision": "Computer Vision",
  "speech-ai": "Speech AI",
  education: "Education",
  healthcare: "Healthcare",
  "product-platform": "Product Platform",
  tooling: "Tooling",
};
