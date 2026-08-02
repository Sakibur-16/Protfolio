// Central type definitions for every data model used across the site.
// Components should import types from here and content from /data — never
// define portfolio shapes inline in a component.

export type AIDomain =
  | "llm"
  | "rag"
  | "nlp"
  | "computer-vision"
  | "speech"
  | "education"
  | "healthcare"
  | "product";

export interface NavLink {
  id: string;
  label: string;
  href: string;
  /** Short mono index shown in the index rail, e.g. "01". Omit if the section is not part of the primary sequence. */
  code?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string | null;
  icon: "github" | "linkedin" | "mail" | "scholar" | "file";
}

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

export interface AvailabilityStatus {
  state: "open" | "selective" | "unavailable";
  label: string;
}

export interface Profile {
  fullName: string;
  preferredName: string;
  roleTitle: string;
  taglines: string[];
  headline: string;
  location: {
    city: string;
    country: string;
    lat: number;
    lon: number;
  };
  availability: AvailabilityStatus;
  bio: string[];
  resumeUrl: string | null;
  email: string | null;
}

export interface CredibilityHighlight {
  id: string;
  value: string;
  label: string;
  detail?: string;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  /** Set true when the role title/dates are provisional pending confirmation. Never rendered publicly. */
  isPlaceholder?: boolean;
  startDate: string;
  endDate: string | "Present";
  location: string;
  employmentType?: string;
  responsibilities: string[];
}

export type ProjectCategory =
  | "llm-application"
  | "rag-search"
  | "nlp"
  | "computer-vision"
  | "speech-ai"
  | "education"
  | "healthcare"
  | "product-platform"
  | "tooling";

export type ProjectStatus =
  | "shipped"
  | "in-development"
  | "client-confidential"
  | "research"
  /** Genuinely undisclosed — used instead of guessing at a status we don't know. */
  | "undisclosed";

export interface ProjectLink {
  external: string | null;
  repository: string | null;
  store: string | null;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  category: ProjectCategory;
  domains: AIDomain[];
  status: ProjectStatus;
  featured: boolean;
  shortDescription: string;
  fullDescription: string;
  challenge: string | null;
  approach: string | null;
  outcome: string | null;
  technologies: string[];
  image: string | null;
  gallery: string[];
  links: ProjectLink;
  accentColor: string;
  /** Internal note only — never rendered. Used to flag fields awaiting client confirmation. */
  todo?: string;
}

export interface SkillDomain {
  id: string;
  domain: string;
  description: string;
  items: string[];
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

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa?: string;
  eqfLevel?: string;
  coreAreas: string[];
}

export interface Certification {
  id: string;
  title: string;
  date: string;
  issuers: string[];
  description: string;
}

export interface LanguageProficiency {
  id: string;
  language: string;
  level: string;
  breakdown?: {
    listening?: string;
    spokenInteraction?: string;
    reading?: string;
    writing?: string;
  };
}
