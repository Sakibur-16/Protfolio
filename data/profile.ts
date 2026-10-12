import type { Profile } from "@/types/portfolio";

// TODO: confirm resumeUrl and email once supplied — both are null so the
// related buttons hide automatically until real values are added.
export const profile: Profile = {
  fullName: "Md. Sakibur Rahman",
  preferredName: "Sakibur Rahman",
  roleTitle: "AI Developer at Sparktech Agency",
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
    "I'm an AI developer at Sparktech Agency in Dhaka. Most of my work is RAG and agentic systems: the kind that look something up, reason over it, and then take the next step. I try to ground every answer in a source I can point to.",
    "I joined Sparktech as a trainee in October 2025, became a Junior AI Developer in January 2026 and an AI Developer in July 2026. That is two promotions in nine months, and I was named Spark of the Quarter.",
    "Day to day I ship chat assistants and NLP components into live client apps, using OpenAI, Anthropic Claude, ElevenLabs and SerpAPI. I have led the AI work on more than 15 apps across healthcare, education, wellness and consumer tech. One of them is Quranity, a Qur'an app that is live on Google Play, where I also led the project.",
    "Before Sparktech I worked at Acote Group on data annotation, cleaning and model benchmarking. I studied Computer Science and Engineering at East West University and graduated in 2025. My papers cover malaria diagnosis from blood-smear images, transformer models for Java code summarization, and a real-time EEG brain-computer interface.",
    "I'm open to roles and collaborations where I would own the AI layer of a real product.",
  ],


  resumeUrl: "/Sakibur_Rahman_CV.pdf",
  email: "sakibursrrahman@gmail.com",
};
