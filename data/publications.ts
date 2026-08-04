import type { Publication } from "@/types/portfolio";

// Links supplied by the site owner.
//
// The Springer chapter maps unambiguously — it is the only Springer-published
// paper of the three. The two IEEE Xplore documents were assigned by document
// ID order (10928549 predates 11504090, matching RAAICON 2024 before SPICSCON
// 2025). Both publishers block automated fetching, so that pairing could not
// be verified programmatically — worth a click-through to confirm.
export const publications: Publication[] = [
  {
    id: "malaria-diagnosis-generalization",
    title:
      "Assessing Generalization Capabilities of AI Models for Malaria Diagnosis Using Blood Smear Images",
    year: "2025",
    authorRole: "Author",
    venue: "2nd International Conference on Data Mining and Information Security (ICDMIS 2025)",
    affiliation: "Springer",
    doiUrl: "https://link.springer.com/chapter/10.1007/978-3-032-25955-4_35",
    paperUrl: null,
  },
  {
    id: "transformer-code-summarization",
    title:
      "Bridging Code and Comprehension: A Comparative Analysis of Transformer Models for Java Source Code Summarization",
    year: "2025",
    authorRole: "Co-author",
    venue: "4th IEEE SPICSCON 2025",
    affiliation: "IEEE",
    doiUrl: "https://ieeexplore.ieee.org/abstract/document/11504090",
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
    doiUrl: "https://ieeexplore.ieee.org/abstract/document/10928549",
    paperUrl: null,
  },
];
