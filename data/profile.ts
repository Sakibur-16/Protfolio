import type { Profile } from "@/types/portfolio";

// TODO: confirm resumeUrl and email once supplied — both are null so the
// related buttons hide automatically until real values are added.
export const profile: Profile = {
  fullName: "Md. Sakibur Rahman",
  preferredName: "Sakibur Rahman",
  roleTitle: "AI Developer · ML Researcher · Product Builder",
  taglines: ["LLM Systems", "Applied ML Research", "Production AI Layers"],
  headline: "I build the AI layer between research and real products.",
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
    "Md. Sakibur Rahman is an AI developer and final-year Computer Science and Engineering student at East West University in Dhaka, Bangladesh, working across applied machine learning, product engineering, and academic research.",
    "His product work is consistently scoped to the AI logic layer — the models, retrieval systems, and reasoning pipelines a system is built around — designed in Python and FastAPI and handed off in a state ready for a backend team to integrate. That scope has carried him across dating, life-coaching, emotional-intelligence, logistics, and language-learning products.",
    "Alongside product work, he conducts applied AI research, with peer-reviewed contributions spanning medical image diagnostics, source-code understanding, and brain-computer interfaces, presented at international conferences including ICDMIS 2025 and IEEE SPICSCON 2025.",
  ],
  resumeUrl: null,
  email: null,
};
