import type { SourceId } from "@/data/sources";

// Source of truth: docs/content.md. Text here comes from the owner's answers
// (Quranity), the owner's CV, earlier project write-ups (EQi30, malaria) or
// published papers. Sections with no confirmed content are omitted, not filled.

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  year: string;
  role: string;
  status?: string;
  lede: string;
  problem: string;
  myRole?: string;
  how: string;
  hard?: string;
  result: string;
  /** Marker shown after the result, pointing at the paper behind it. */
  resultCite?: SourceId;
  stack: string[];
  links?: { label: string; href: string }[];
}

export const quranity: CaseStudy = {
  id: "quranity",
  number: "01",
  title: "Quranity",
  year: "2026",
  role: "Lead AI Developer & PM",
  status: "Live",
  lede: "Qalam, an assistant whose answers come from the Qur’an and Hadith, with the source attached.",
  problem:
    "People ask Quranity real questions about daily life and faith. A fluent answer is not enough: it has to come from the Qur’an or Hadith, and the person asking should be able to see which.",
  myRole:
    "I led AI development for Qalam and managed the project from concept to launch.",
  how: "Qalam searches a Qur’an and Hadith database by meaning before it writes anything, then hands what it found, plus instructions, to the model. It answers in English, Arabic and Albanian, and each answer shows its Qur’an or Hadith reference.",
  hard: "Two things kept breaking. When the retrieved source did not match the question, the assistant fell back to a generic answer, every time. Separately, language detection was not working. I rebuilt the prompting and the instructions to fix both. When no source is a close match, Qalam now answers from the closest related sources instead of a generic reply.",
  result:
    "Quranity is live on Google Play, where it has 1K+ downloads, and on the App Store. It was tested several ways: by hand and by script, with people and with bots.",
  stack: ["Python", "FastAPI", "OpenAI API", "Flutter", "RAG", "Semantic search", "Qur’an and Hadith database"],
  links: [
    {
      label: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.quranityllc.quranity&hl=en",
    },
    { label: "App Store", href: "https://apps.apple.com/pl/app/quranity/id6764633566" },
    { label: "quranity.app", href: "https://quranity.app/en" },
  ],
};

// The five steps of Qalam's answer path, drawn from the owner's description.
export const quranitySteps = [
  { title: "Question", text: "A user asks in their own words and language." },
  { title: "Language", text: "The assistant works out which language to answer in." },
  { title: "Source lookup", text: "It searches the Qur’an and Hadith database by meaning.", accent: true },
  { title: "Prompt", text: "The matched sources and the instructions go to the model." },
  { title: "Answer", text: "The reply shows the Qur’an or Hadith reference it came from." },
] as const;

export const quranityFallback =
  "No close match? It uses the closest related sources, not a generic reply.";

export const eqi30: CaseStudy = {
  id: "eqi30",
  number: "02",
  title: "EQi30",
  year: "2025",
  role: "AI Developer, AI service layer",
  status: "In production",
  lede: "Twelve AI engines behind an emotional-intelligence platform.",
  problem:
    "The platform’s content was written across 28 separate documents that disagreed with each other. The product needed one structure it could run coaching and scheduling on.",
  how: "Twelve engines cover assessment, coaching, microlearning and adaptive scheduling, built in Python and FastAPI.",
  hard: "Reconciling the 28 source documents, which were a mix of docx and xlsx. I ran a dedicated content-mapping pass to resolve the inconsistencies between them.",
  result:
    "The content now maps to 40 abilities across 6 competencies, and 30 of those abilities have complete day-by-day programs for the coaching engines to run on.",
  stack: ["Python", "FastAPI"],
};

export const malaria: CaseStudy = {
  id: "malaria",
  number: "03",
  title: "Malaria diagnosis from blood smears",
  year: "2025",
  role: "Researcher, author",
  lede: "Does a malaria model that works on one dataset still work on another?",
  problem:
    "Blood-smear datasets differ in staining, imaging equipment and collection conditions. A model that scores well on one can fail on another, which matters for a diagnostic tool.",
  how: "I trained CNN classifiers in TensorFlow and Keras and evaluated them across several datasets, judging generalization instead of a single benchmark score.",
  result: "Peer-reviewed and presented at ICDMIS 2025, published by Springer.",
  resultCite: "malaria",
  stack: ["Python", "TensorFlow", "Keras", "CNNs"],
};

export interface MiniProject {
  name: string;
  year: string;
  role: string;
  description: string;
  stack: string[];
}

// From the owner's CV. Descriptions are condensed, not embellished.
export const miniProjects: MiniProject[] = [
  {
    name: "Hairlync",
    year: "2026",
    role: "Lead AI Developer & PM",
    description:
      "A hair diagnostics platform for barbers and specialists. It analyzes hair and scalp condition with computer vision and predictive analytics, and recommends tailored treatments, cuts and colors. Publication in progress.",
    stack: ["Computer vision", "CNNs", "Image classification"],
  },
  {
    name: "JobAssist AI",
    year: "2026",
    role: "AI Developer",
    description:
      "An AI career assistant that analyzes CVs, suggests improvements, writes tailored cover letters and application emails, and matches candidates to companies.",
    stack: ["LLM", "RAG", "OpenAI API", "CV parsing", "Semantic matching"],
  },
  {
    name: "Wondertales",
    year: "2026",
    role: "AI Developer",
    description:
      "An AI story-generation app that narrates personalized children’s stories, with voice cloning and a pre-built voice library.",
    stack: ["ElevenLabs", "LLM"],
  },
  {
    name: "Finance AI",
    year: "2026",
    role: "AI Developer",
    description:
      "A personal finance assistant connected to a client’s live financial database. It uses intent detection and deterministic calculations to answer spending, budgeting and cash-flow questions through a secure OpenAI-based conversational layer.",
    stack: ["FastAPI", "OpenAI API", "MySQL / MariaDB", "RAG"],
  },
];

export const alsoBuilt =
  "Also built in 2025–2026: Frazzl Kid, Aura, Everidog, BYOJ and Alfred, an AI dating concierge. The apps span children’s education, mental wellness, pet nutrition, generative design and habit formation.";

export const earlierResearch = {
  years: "2023–2024",
  title: "Early medical-imaging research",
  text: "Breast cancer detection and retinal key-sign identification using deep learning on medical images. I built and evaluated CNN-based classification pipelines.",
  stack: ["Python", "TensorFlow", "Keras", "CNNs", "Image processing"],
} as const;
