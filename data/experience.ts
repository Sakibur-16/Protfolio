import type { ExperienceEntry } from "@/types/portfolio";

// Source: the owner's CV. Dates and wording follow it.
export const experienceIntro =
  "Led AI development on 15+ live and production-ready applications across healthcare, education, wellness and consumer tech.";

export const experience: ExperienceEntry[] = [
  {
    id: "ai-developer",
    organization: "Sparktech Agency",
    role: "AI Developer",
    dates: "Jul 2026 – Present",
    summary:
      "Owns the design and delivery of production RAG and Agentic RAG pipelines for client-facing conversational AI, combining LLM reasoning with grounded retrieval to reduce hallucinations and improve accuracy.",
    note: "Spark of the Quarter",
  },
  {
    id: "junior-ai-developer",
    organization: "Sparktech Agency",
    role: "Junior AI Developer",
    dates: "Jan 2026 – Jun 2026",
    summary:
      "Contributed to the design and testing of RAG-based retrieval systems and LLM integration workflows, then took ownership of features within larger AI systems.",
  },
  {
    id: "trainee-ai-developer",
    organization: "Sparktech Agency",
    role: "Trainee AI Developer",
    dates: "Oct 2025 – Dec 2025",
    summary:
      "Learned production RAG architecture, LLM prompt design and NLP fundamentals in a live commercial environment.",
  },
  {
    id: "acote-associate",
    organization: "Acote Group",
    role: "Associate",
    dates: "Nov 2024 – May 2025",
    summary:
      "Annotated, cleaned and preprocessed large ML datasets, and fine-tuned and benchmarked models against baseline metrics. Contract at first, then full-time from January 2025.",
  },
];

export const education = {
  dates: "Oct 2021 – Sep 2025",
  title: "BSc, Computer Science and Engineering, East West University",
  detail: "CGPA 3.56 / 4.00 · Dhaka",
} as const;
