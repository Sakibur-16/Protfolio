import type { SkillDomain } from "@/types/portfolio";

export const skillDomains: SkillDomain[] = [
  {
    id: "llm-applications",
    domain: "LLM Application Development",
    description:
      "Designing production LLM systems — prompting strategy, structured outputs, and provider-agnostic abstractions that swap models without rewriting a product.",
    items: ["OpenAI API", "LLM orchestration", "Structured JSON outputs", "Provider-agnostic architecture"],
  },
  {
    id: "rag-search",
    domain: "Retrieval-Augmented Generation & Semantic Search",
    description:
      "Grounding LLM responses in real documents and data through retrieval pipelines and vector search.",
    items: ["RAG pipelines", "Vector databases", "Semantic search", "Full-text search"],
  },
  {
    id: "nlp",
    domain: "Natural Language Processing",
    description: "Working with language models beyond generation — understanding, classification, and summarization.",
    items: ["NLP", "Transformer models", "Text classification", "Source-code summarization"],
  },
  {
    id: "computer-vision",
    domain: "Computer Vision",
    description: "Building and evaluating image classification systems, including for diagnostic use cases.",
    items: ["CNNs", "Image classification", "Image processing", "TensorFlow", "Keras"],
  },
  {
    id: "speech",
    domain: "Speech-to-Text & Text-to-Speech",
    description: "Integrating transcription and synthetic voice into product experiences.",
    items: ["OpenAI Whisper", "ElevenLabs", "Voice cloning", "Text-to-speech"],
  },
  {
    id: "fine-tuning",
    domain: "Model Fine-Tuning & Benchmarking",
    description: "Adapting models to a task and measuring the result honestly against a baseline.",
    items: ["Model fine-tuning", "Baseline benchmarking", "Performance evaluation"],
  },
  {
    id: "data-prep",
    domain: "ML Data Preparation",
    description: "The unglamorous work that determines whether a model is trustworthy: annotation, cleaning, and preprocessing at scale.",
    items: ["Data annotation", "Data cleaning", "Preprocessing pipelines"],
  },
  {
    id: "product-leadership",
    domain: "AI Product Leadership & Research",
    description: "Carrying an AI initiative from a research question or product idea through to a handoff-ready implementation.",
    items: ["End-to-end AI workflow ownership", "Research & evaluation", "Python", "Flutter"],
  },
];
