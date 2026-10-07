import { publications } from "@/data/publications";

export type SourceId = "quranity" | "sparktech" | "malaria" | "spicscon" | "raaicon";

export interface Source {
  id: SourceId;
  /** Footnote number, in order of first appearance on the page. */
  n: number;
  title: string;
  detail: string;
  href: string;
  linkLabel: string;
  external: boolean;
}

function paper(id: string) {
  const found = publications.find((p) => p.id === id);
  if (!found || !found.doiUrl) throw new Error(`Missing publication: ${id}`);
  return found;
}

const malaria = paper("malaria-diagnosis-generalization");
const spicscon = paper("transformer-code-summarization");
const raaicon = paper("neural-command-bci");

// Every [n] marker on the site resolves to one of these entries. Nothing here
// is written for effect: each is a project, role or paper that exists.
export const sources: Record<SourceId, Source> = {
  quranity: {
    id: "quranity",
    n: 1,
    title: "Quranity: Qalam, the grounded AI assistant",
    detail: "Lead AI Developer & PM · 2026 · live on Google Play and the App Store",
    href: "#quranity",
    linkLabel: "Read the case study",
    external: false,
  },
  sparktech: {
    id: "sparktech",
    n: 2,
    title: "AI Developer, Sparktech Agency",
    detail: "Dhaka · July 2026 to present",
    href: "#experience",
    linkLabel: "See experience",
    external: false,
  },
  malaria: {
    id: "malaria",
    n: 3,
    title: malaria.title,
    detail: `${malaria.authorRole} · ${malaria.venue}, ${malaria.affiliation} · ${malaria.year}`,
    href: malaria.doiUrl!,
    linkLabel: "Open the paper",
    external: true,
  },
  spicscon: {
    id: "spicscon",
    n: 4,
    title: spicscon.title,
    detail: `${spicscon.authorRole} · ${spicscon.venue}, ${spicscon.affiliation} · ${spicscon.year}`,
    href: spicscon.doiUrl!,
    linkLabel: "Open the paper",
    external: true,
  },
  raaicon: {
    id: "raaicon",
    n: 5,
    title: raaicon.title,
    detail: `${raaicon.authorRole} · ${raaicon.venue}, ${raaicon.affiliation} · ${raaicon.year}`,
    href: raaicon.doiUrl!,
    linkLabel: "Open the paper",
    external: true,
  },
};

export const paperSources: Source[] = [sources.malaria, sources.spicscon, sources.raaicon];
