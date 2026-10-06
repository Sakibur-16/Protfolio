import type { SkillDomain } from "@/types/portfolio";

export const skillDomains: SkillDomain[] = [
  {
    id: "rag-agentic",
    domain: "RAG & Agentic AI Systems",
    description:
      "Retrieval-augmented and agentic pipelines that ground model output in real sources — so an answer can be traced back rather than taken on trust.",
    items: ["RAG pipelines", "Agentic RAG", "LangGraph", "Multi-agent orchestration", "Vector databases"],
  },
  {
    id: "llm-applications",
    domain: "LLM Application Development",
    description:
      "Designing production LLM systems — prompting strategy, structured outputs, and provider-agnostic abstractions that swap models without rewriting a product.",
    items: ["LLM integration", "Prompt engineering", "Structured JSON outputs", "AI chat assistants"],
  },
  {
    id: "nlp",
    domain: "Natural Language Processing",
    description:
      "Working with language models beyond generation — understanding, classification, summarization, and the preprocessing that makes them viable.",
    items: ["NLP preprocessing", "Transformer models", "Text classification", "Source-code summarization"],
  },
  {
    id: "generative-ai",
    domain: "Generative AI",
    description: "Applying generative models to product surfaces where the output has to hold up in front of a user.",
    items: ["Generative AI", "Content generation", "Grounded generation"],
  },
  {
    id: "computer-vision",
    domain: "Computer Vision & Image Processing",
    description: "Building and evaluating image classification systems, including for diagnostic use cases.",
    items: ["CNNs", "Image classification", "Image processing", "TensorFlow", "Keras"],
  },
  {
    id: "bci",
    domain: "Brain–Computer Interfaces",
    description:
      "Real-time EEG signal processing for assistive control — the subject of his published BCI research.",
    items: ["EEG signal processing", "Real-time BCI", "Assistive robotic control", "MATLAB"],
  },
  {
    id: "ml-foundations",
    domain: "Machine Learning & Evaluation",
    description:
      "Adapting models to a task and measuring the result honestly against a baseline — including the unglamorous data work that decides whether a model is trustworthy.",
    items: ["Model fine-tuning", "Baseline benchmarking", "Data annotation & cleaning", "Preprocessing pipelines"],
  },
  {
    id: "backend",
    domain: "Backend & API Engineering",
    description:
      "Multi-tenant REST APIs with role-aware permissions, transactional integrity, and idempotent handling of money and third-party webhooks.",
    items: ["Django", "Django REST Framework", "FastAPI", "PostgreSQL", "Redis", "Celery", "JWT", "Stripe"],
  },
  {
    id: "devops",
    domain: "DevOps & Cloud Infrastructure",
    description:
      "Containerised multi-service delivery on AWS, provisioned as code and shipped through CI with health checks and rollback.",
    items: ["Docker", "AWS", "Terraform", "Ansible", "GitHub Actions", "Nginx", "Prometheus", "Grafana"],
  },
  {
    id: "engineering",
    domain: "Languages & Foundations",
    description: "Carrying an initiative from a research question or product idea through to production.",
    items: ["Python", "SQL", "C", "Java", "MATLAB", "TypeScript"],
  },
];
