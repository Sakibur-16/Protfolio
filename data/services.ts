export interface Service {
  id: string;
  title: string;
  description: string;
  points: string[];
}

// What I take on. Each point maps to work listed on the CV.
export const services: Service[] = [
  {
    id: "rag-agents",
    title: "RAG and agentic pipelines",
    description:
      "Retrieval pipelines and agents that answer from your own data, so every response can be traced back to a source.",
    points: [
      "Retrieval and vector search with FAISS or Pinecone",
      "Agent workflows built with LangChain",
      "Evaluation and checks against hallucinated answers",
    ],
  },
  {
    id: "llm-assistants",
    title: "LLM chat assistants",
    description:
      "Assistants for web and mobile apps, connected to OpenAI or Claude and to your own backend.",
    points: [
      "OpenAI and Anthropic Claude APIs",
      "Streamed replies and structured JSON output",
      "A service layer where the model provider can be swapped",
    ],
  },
  {
    id: "voice-speech",
    title: "Voice and speech AI",
    description:
      "Voice features for apps, from narrated stories to speech input and live translation.",
    points: [
      "Voice cloning and text-to-speech with ElevenLabs",
      "Speech-to-text with OpenAI Whisper",
      "Real-time translation",
    ],
  },
  {
    id: "computer-vision",
    title: "Computer vision",
    description:
      "Image models for products and research, from preparing the data to measuring how well they hold up.",
    points: [
      "CNN image classification",
      "Medical and diagnostic imaging",
      "Dataset annotation, cleaning and benchmarking",
    ],
  },
  {
    id: "ai-services",
    title: "AI services and deployment",
    description:
      "The service around the model: the API, the data layer, the tests and getting it running in production.",
    points: [
      "FastAPI services on MySQL or PostgreSQL",
      "Test suites with pytest",
      "VPS deployment with systemd and firewall setup",
    ],
  },
];
