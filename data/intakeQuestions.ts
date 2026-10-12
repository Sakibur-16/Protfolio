// Questions for the local intake form at /intake (development only).
// Only what is still missing is asked. Everything already answered has been
// applied to the site, so those projects only keep the screenshot upload.
// Answers are saved to /intake-data/<slug>.json and uploaded images to
// /public/images/..., then used to update the site.

export type IntakeField = {
  id: string;
  label: string;
  type: "text" | "url" | "textarea" | "select";
  help?: string;
  placeholder?: string;
  options?: string[];
};

export type IntakeSection = {
  slug: string;
  title: string;
  intro?: string;
  fields: IntakeField[];
  imageLabel?: string;
};

const hardest: IntakeField = {
  id: "hardest",
  label: "The hardest problem and how I fixed it",
  type: "textarea",
  help: "What broke, what you chose, and why.",
};
const result: IntakeField = {
  id: "result",
  label: "One real number",
  type: "text",
  help: "Users, accuracy, speed, tests, cost saved... anything measurable.",
};
const myPart: IntakeField = {
  id: "myPart",
  label: "What I built (my part)",
  type: "textarea",
  help: "In your own words. Only your part.",
};
const stack: IntakeField = {
  id: "stack",
  label: "Tech used",
  type: "text",
  help: "Comma separated, for example Python, FastAPI, OpenAI API.",
};

/** Only the projects that still have open questions. */
const neededFields: Record<string, IntakeField[]> = {
  everidog: [
    { id: "what", label: "What does the AI do for dog owners?", type: "textarea" },
    { id: "liveLink", label: "Live link", type: "url", placeholder: "https://" },
    myPart,
    stack,
    hardest,
    result,
  ],
  byoj: [
    { id: "what", label: "What does it generate, and for whom?", type: "textarea" },
    myPart,
    stack,
    hardest,
    result,
  ],
  "alfred-ai-dating-concierge": [hardest, result],
  "rise-life-coaching-app": [hardest, result],
  "finance-ai": [hardest, result],
  "frazzl-kid": [
    { id: "what", label: "What does the app do for children?", type: "textarea" },
    result,
  ],
  "medical-imaging-diagnostics": [
    { id: "metrics", label: "Datasets and results (optional)", type: "textarea" },
  ],
  "malaria-diagnosis": [
    { id: "metrics", label: "Datasets and results (optional)", type: "textarea" },
  ],
};

/** The one thing about the site itself that is still missing. */
export const generalSection: IntakeSection = {
  slug: "general",
  title: "The site",
  intro: "Your real address, and a share image for links.",
  imageLabel: "Share image (1200x630), shown when your link is shared",
  fields: [
    {
      id: "domain",
      label: "Your real site address",
      type: "url",
      placeholder: "https://sakibursr.me",
      help: "The public address, not localhost.",
    },
  ],
};

export function projectSection(slug: string, title: string): IntakeSection {
  const fields = neededFields[slug] ?? [];
  return {
    slug,
    title,
    intro: fields.length === 0 ? "Nothing more to answer. Screenshots only." : undefined,
    imageLabel: "Real screenshots or photos (png, jpg or webp)",
    fields,
  };
}
