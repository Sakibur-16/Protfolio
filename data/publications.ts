import type { Publication } from "@/types/portfolio";

// Add doiUrl / paperUrl once real links are available — the UI only
// renders a link button when the value is non-null.
export const publications: Publication[] = [
  {
    id: "malaria-diagnosis-generalization",
    title:
      "Assessing Generalization Capabilities of AI Models for Malaria Diagnosis Using Blood Smear Images",
    year: "2025",
    authorRole: "Author",
    venue: "2nd International Conference on Data Mining and Information Security (ICDMIS 2025)",
    affiliation: "Springer",
    doiUrl: null,
    paperUrl: null,
  },
  {
    id: "transformer-code-summarization",
    title:
      "Bridging Code and Comprehension: A Comparative Analysis of Transformer Models for Java Source Code Summarization",
    year: "2025",
    authorRole: "Co-author",
    venue: "4th IEEE SPICSCON 2025",
    affiliation: "University of Rajshahi, Bangladesh",
    doiUrl: null,
    paperUrl: null,
  },
  {
    id: "neural-command-bci",
    title:
      "Neural Command: Real-Time EEG-Based Brain-Computer Interface for Assistive Robotic Control",
    year: "2024",
    authorRole: "Author",
    venue: "3rd IEEE Robotics, Automation, and AI Conference (RAAICON 2024)",
    affiliation: "IEEE",
    doiUrl: null,
    paperUrl: null,
  },
];
