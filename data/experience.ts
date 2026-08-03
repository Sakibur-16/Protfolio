import type { ExperienceEntry } from "@/types/portfolio";

// Source: the owner's LinkedIn profile.
//
// The current employer is intentionally unnamed at the owner's request —
// referred to by sector and location only.
//
// The current-employer progression is modelled as three separate entries rather than
// one nested record — the promotions are distinct roles with distinct scopes,
// and the shared `organization` is what groups them in the UI.
export const experience: ExperienceEntry[] = [
  {
    id: "current-ai-developer",
    organization: "Leading Technology Company",
    role: "AI Developer",
    startDate: "July 2026",
    endDate: "Present",
    location: "Dhaka, Bangladesh (On-site)",
    employmentType: "Full-time",
    responsibilities: [
      "Builds RAG and agentic RAG pipelines for production systems",
      "Combines LLM reasoning with grounded retrieval so answers trace back to real sources",
      "Develops NLP components and AI chat assistants",
      "Carries features from prototype through to production",
    ],
  },
  {
    id: "current-junior-ai-developer",
    organization: "Leading Technology Company",
    role: "Junior AI Developer",
    startDate: "January 2026",
    endDate: "June 2026",
    location: "Dhaka, Bangladesh (On-site)",
    employmentType: "Full-time",
    responsibilities: [
      "Built and refined RAG retrieval systems",
      "Implemented LLM integration workflows",
      "Developed NLP preprocessing pipelines",
      "Delivered features independently end to end",
    ],
  },
  {
    id: "current-trainee-ai-developer",
    organization: "Leading Technology Company",
    role: "Trainee AI Developer",
    startDate: "October 2025",
    endDate: "December 2025",
    location: "Dhaka, Bangladesh (On-site)",
    employmentType: "Full-time",
    responsibilities: [
      "Learned production RAG architecture",
      "Practised LLM prompt design",
      "Covered NLP fundamentals",
      "Ran model testing and evaluation",
    ],
  },
  {
    id: "acote-associate",
    organization: "Acote Group",
    role: "Associate",
    startDate: "November 2024",
    endDate: "May 2025",
    location: "Dhaka, Bangladesh (Hybrid)",
    employmentType: "Full-time / Contract",
    responsibilities: [
      "Delivered data annotation, cleaning, and preprocessing across large ML datasets",
      "Fine-tuned and benchmarked ML models against baseline metrics",
      "Owned parts of the end-to-end ML workflow, from data preparation to evaluation",
    ],
  },
];
