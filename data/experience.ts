import type { ExperienceEntry } from "@/types/portfolio";

// The résumé source lists two Acote Group engagements. The contract role
// below is fully documented. The earlier role's title and dates were not
// supplied — isPlaceholder marks it so the UI can label it honestly instead
// of inventing specifics. Update role/startDate/endDate here once confirmed;
// nothing else needs to change.
export const experience: ExperienceEntry[] = [
  {
    id: "acote-earlier-role",
    organization: "Acote Group",
    role: "AI/ML Role", // TODO: confirm exact title
    isPlaceholder: true,
    startDate: "TBD", // TODO: confirm start date
    endDate: "TBD", // TODO: confirm end date
    location: "Dhaka, Bangladesh",
    responsibilities: [
      "Delivered data annotation, cleaning, and preprocessing across large ML datasets",
      "Improved the consistency and reliability of model inputs",
      "Fine-tuned and benchmarked ML models against baseline metrics",
      "Identified performance gaps and helped inform model iteration",
      "Owned parts of the end-to-end ML workflow, from preparation to evaluation",
    ],
  },
  {
    id: "acote-associate-contract",
    organization: "Acote Group",
    role: "Associate (Contract)",
    startDate: "November 2024",
    endDate: "December 2024",
    location: "Dhaka, Bangladesh",
    employmentType: "Contract",
    responsibilities: [
      "Prepared and curated training data through annotation, cleaning, and preprocessing",
      "Supported early-stage ML model development",
      "Assisted with model fine-tuning",
      "Compared results against baseline metrics to inform model iteration",
    ],
  },
];
