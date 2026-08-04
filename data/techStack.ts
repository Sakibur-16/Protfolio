import * as icons from "simple-icons";

export type TechItem = {
  name: string;
  /** simple-icons export key, or null when no official brand mark exists. */
  iconKey: keyof typeof icons | null;
};

/**
 * Brand marks come from `simple-icons` (MIT-licensed paths, official brand
 * colours). Anything without an official mark — RAG, agentic AI, EEG/BCI —
 * carries `iconKey: null` and renders as a typographic chip instead of a
 * fake logo.
 */
export const techStack: TechItem[] = [
  { name: "Python", iconKey: "siPython" },
  { name: "TensorFlow", iconKey: "siTensorflow" },
  { name: "PyTorch", iconKey: "siPytorch" },
  { name: "Keras", iconKey: "siKeras" },
  { name: "FastAPI", iconKey: "siFastapi" },
  { name: "Hugging Face", iconKey: "siHuggingface" },
  { name: "LangChain", iconKey: "siLangchain" },
  { name: "scikit-learn", iconKey: "siScikitlearn" },
  { name: "pandas", iconKey: "siPandas" },
  { name: "NumPy", iconKey: "siNumpy" },
  { name: "PostgreSQL", iconKey: "siPostgresql" },
  { name: "SQLite", iconKey: "siSqlite" },
  { name: "MongoDB", iconKey: "siMongodb" },
  { name: "Redis", iconKey: "siRedis" },
  { name: "Docker", iconKey: "siDocker" },
  { name: "Git", iconKey: "siGit" },
  { name: "Linux", iconKey: "siLinux" },
  { name: "Google Cloud", iconKey: "siGooglecloud" },
];

/**
 * Both rows carry the full stack — the bottom row simply reversed — so each
 * copy is wide enough that two of them always exceed the viewport. Splitting
 * the list in half made each copy too short and left dead space on wide
 * screens once the track wrapped.
 */
export const techRowTop = techStack;
export const techRowBottom = [...techStack].reverse();

/** Resolves a free-text technology name to a brand mark where one exists. */
const NAME_TO_KEY: Record<string, keyof typeof icons> = {
  python: "siPython",
  tensorflow: "siTensorflow",
  pytorch: "siPytorch",
  keras: "siKeras",
  fastapi: "siFastapi",
  "hugging face": "siHuggingface",
  langchain: "siLangchain",
  langgraph: "siLangchain",
  "scikit-learn": "siScikitlearn",
  pandas: "siPandas",
  numpy: "siNumpy",
  postgresql: "siPostgresql",
  sqlite: "siSqlite",
  "sqlite fts5": "siSqlite",
  mongodb: "siMongodb",
  redis: "siRedis",
  docker: "siDocker",
  git: "siGit",
  linux: "siLinux",
  systemd: "siLinux",
  "google cloud": "siGooglecloud",
};

export function iconKeyForTech(name: string): keyof typeof icons | null {
  return NAME_TO_KEY[name.trim().toLowerCase()] ?? null;
}
