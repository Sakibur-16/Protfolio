import type { SourceId } from "@/data/sources";

// Source of truth: docs/content.md. Text here comes from the owner's answers
// (Quranity), the owner's earlier project write-ups (EQi30, Rise, malaria), or
// published papers. Sections with no confirmed content are omitted, not filled.

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  year: string;
  role: string;
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
  year: "2024",
  role: "AI Developer, PM and QA",
  lede: "Qalam, an assistant whose answers come from the Qur’an and Hadith, with the source attached.",
  problem:
    "People ask Quranity real questions about daily life and faith. A fluent answer is not enough: it has to come from the Qur’an or Hadith, and the person asking should be able to see which.",
  myRole:
    "I was the AI developer for Qalam, and I also managed the project and ran QA on it.",
  how: "Qalam looks answers up in a Qur’an and Hadith database before it writes anything, then hands what it found, plus instructions, to the model.",
  hard: "Two things kept breaking. When the retrieved source did not match the question, the assistant fell back to a generic answer, every time. Separately, language detection was not working. I rebuilt the prompting and the instructions to fix both. When no source is a close match, Qalam now answers from the closest related sources instead of a generic reply.",
  result:
    "Quranity is live on Google Play and the App Store, with a landing page at quranity.app. It was tested several ways: by hand and by script, with people and with bots.",
  stack: ["Python", "FastAPI", "OpenAI API", "Qur’an and Hadith database"],
  links: [{ label: "quranity.app", href: "https://quranity.app/en" }],
};

// The five steps of Qalam's answer path, drawn from the owner's description.
export const quranitySteps = [
  { title: "Question", text: "A user asks in their own words and language." },
  { title: "Language", text: "The assistant works out which language to answer in." },
  { title: "Source lookup", text: "It searches the Qur’an and Hadith database.", accent: true },
  { title: "Prompt", text: "The matched sources and the instructions go to the model." },
  { title: "Answer", text: "The reply comes back tied to its source." },
] as const;

export const quranityFallback =
  "No close match? It uses the closest related sources, not a generic reply.";

export const eqi30: CaseStudy = {
  id: "eqi30",
  number: "02",
  title: "EQi30",
  year: "2025",
  role: "AI Developer, AI service layer",
  lede: "Twelve AI engines behind an emotional-intelligence platform.",
  problem:
    "The platform’s content was written across 28 separate documents that disagreed with each other. The product needed one structure it could run coaching and scheduling on.",
  how: "Twelve engines cover assessment, coaching, microlearning and adaptive scheduling, built in Python and FastAPI.",
  hard: "Reconciling the 28 source documents, which were a mix of docx and xlsx. I ran a dedicated content-mapping pass to resolve the inconsistencies between them.",
  result:
    "The content now maps to 40 abilities across 6 competencies, and 30 of those abilities have complete day-by-day programs for the coaching engines to run on.",
  stack: ["Python", "FastAPI"],
};

export const rise: CaseStudy = {
  id: "rise",
  number: "03",
  title: "Rise",
  year: "2025",
  role: "AI Developer, AI service layer",
  lede: "The AI layer for a mobile life-coaching app.",
  problem:
    "Coaching had to feel personal and immediate on a phone: five distinct personalities, delivered as a stream instead of a delayed wall of text.",
  how: "Eleven FastAPI endpoints are built around a five-personality tone system. Responses stream to the app over server-sent events as structured JSON, so the app can render them as they arrive.",
  result:
    "Delivered as a standalone AI service layer for the mobile app’s backend team to integrate.",
  stack: ["Python", "FastAPI", "Server-Sent Events", "Structured JSON"],
};

export const malaria: CaseStudy = {
  id: "malaria",
  number: "04",
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
