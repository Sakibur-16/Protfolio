import type { LanguageProficiency } from "@/types/portfolio";

export const languages: LanguageProficiency[] = [
  {
    id: "bengali",
    language: "Bengali",
    level: "Native",
  },
  {
    id: "english",
    language: "English",
    level: "Professional proficiency",
    breakdown: {
      listening: "C1",
      spokenInteraction: "C1",
      reading: "B2",
      writing: "B2",
    },
  },
];
