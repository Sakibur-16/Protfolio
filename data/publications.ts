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
    summary:
      "Tests how AI models trained on thin blood smear images generalize across datasets. It flags model robustness, dataset diversity and site-specific bias, and proposes transfer and incremental learning to improve generalization.",
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
    summary:
      "Compares T5, BERT and GPT-2 on Java source code summarization, scored with BLEU, ROUGE, METEOR and human assessment.",
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
    summary:
      "A non-invasive EEG system that drives a robotic car in real time from a MUSE headband. It reached 85% control accuracy with an average response time of 300 ms.",
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
