import type { Profile } from "@/types/portfolio";

// TODO: confirm resumeUrl and email once supplied — both are null so the
// related buttons hide automatically until real values are added.
export const profile: Profile = {
  fullName: "Md. Sakibur Rahman",
  preferredName: "Sakibur Rahman",
  roleTitle: "AI Developer · ML Researcher",
  taglines: ["LLMs & Agentic RAG", "Applied AI Research", "Production AI Systems"],
  // His own framing, taken from his LinkedIn summary rather than invented.
  headline: "I build AI that reasons, retrieves, and acts.",
  location: {
    city: "Dhaka",
    country: "Bangladesh",
    lat: 23.8103,
    lon: 90.4125,
  },
  availability: {
    state: "selective",
    label: "Open to select AI engineering & research collaborations",
  },
  bio: [
    "Md. Sakibur Rahman is an AI developer at a leading technology company in Dhaka, Bangladesh, building retrieval-augmented and agentic AI systems — the kind that reason, retrieve, and act, rather than only generating text.",
    "He joined as a trainee in October 2025 and moved through junior to his current role, working across RAG and agentic RAG pipelines, LLM reasoning grounded in real retrieval, NLP components, and AI chat assistants, carrying features from prototype through to production. The emphasis throughout is on reliability and explainability: grounding model outputs, testing edge cases, and understanding the retrieval and reasoning layers beneath the interface.",
    "Alongside product work he publishes applied AI research, with peer-reviewed contributions spanning medical image diagnostics, source-code understanding, and brain-computer interfaces, presented at international conferences including ICDMIS 2025 and IEEE SPICSCON 2025.",
  ],
  resumeUrl: null,
  email: null,
};
