// Shared shapes for site-level data. Content lives in /data; components import
// types from here instead of defining shapes inline.

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  themeColor: string;
  ogImage: string;
}

export interface Publication {
  id: string;
  title: string;
  year: string;
  authorRole: "Author" | "Co-author";
  venue: string;
  affiliation: string;
  doiUrl: string | null;
  paperUrl: string | null;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  dates: string;
  /** One line of what the role involved, taken from the CV. */
  summary: string;
  /** Optional recognition tied to the role. */
  note?: string;
}
