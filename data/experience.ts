import type { ExperienceEntry } from "@/types/portfolio";

// Source: the owner's CV.
export const experience: ExperienceEntry[] = [
  {
    id: "current-ai-developer",
    organization: "Sparktech Agency",
    role: "AI Developer",
    startDate: "July 2026",
    endDate: "Present",
    location: "Dhaka, Bangladesh (On-site)",
    employmentType: "Full-time",
    responsibilities: [
      "Spark of the Quarter award",
      "Design and deliver production RAG and agentic RAG pipelines for client-facing assistants, grounding LLM answers in retrieved sources to cut hallucinations",
      "Ship chat assistants and NLP components into live client apps using ElevenLabs, OpenAI, Anthropic Claude and SerpAPI",
    ],
  },
  {
    id: "current-junior-ai-developer",
    organization: "Sparktech Agency",
    role: "Junior AI Developer",
    startDate: "January 2026",
    endDate: "June 2026",
    location: "Dhaka, Bangladesh (On-site)",
    employmentType: "Full-time",
    responsibilities: [
      "Helped design and test RAG retrieval systems and LLM integrations under senior engineers",
      "Built NLP preprocessing pipelines to clean up input before it reached the language model",
      "Moved from supervised tasks to owning features end to end, which led to the promotion",
    ],
  },
  {
    id: "current-trainee-ai-developer",
    organization: "Sparktech Agency",
    role: "Trainee AI Developer",
    startDate: "October 2025",
    endDate: "December 2025",
    location: "Dhaka, Bangladesh (On-site)",
    employmentType: "Full-time",
    responsibilities: [
      "Learned production RAG architecture and prompt design on live commercial projects",
      "Helped senior developers with model testing, data preparation and evaluating generated output",
    ],
  },
  {
    id: "acote-associate-fulltime",
    organization: "Acote Group",
    role: "Associate",
    startDate: "January 2025",
    endDate: "May 2025",
    location: "Dhaka, Bangladesh",
    employmentType: "Full-time",
    responsibilities: [
      "Annotated, cleaned and preprocessed large ML training datasets",
      "Fine-tuned models and benchmarked them against baseline metrics to find performance gaps",
      "Owned parts of the ML workflow from raw data to evaluation",
    ],
  },
  {
    id: "acote-associate-contract",
    organization: "Acote Group",
    role: "Associate",
    startDate: "November 2024",
    endDate: "December 2024",
    location: "Dhaka, Bangladesh",
    employmentType: "Contract",
    responsibilities: [
      "Prepared training data through annotation, cleaning and preprocessing",
      "Helped fine-tune models and compare results against baselines",
    ],
  },
];
