import type { SiteConfig } from "@/types/portfolio";

// NEXT_PUBLIC_SITE_URL overrides this per environment. The fallback is the
// real production domain so canonical, Open Graph, sitemap and JSON-LD URLs
// are right even when the variable is unset.
export const siteConfig: SiteConfig = {
  name: "Md. Sakibur Rahman",
  shortName: "Sakibur Rahman",
  title: "Md. Sakibur Rahman — AI Developer",
  description:
    "AI developer in Dhaka building RAG, agentic and ML systems whose answers trace back to real sources. Case studies, peer-reviewed research, and contact.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sakibursr.me",
  locale: "en_US",
  themeColor: "#f2f0e9",
  ogImage: "/opengraph-image.png",
};

export const contact = {
  email: "sakibursrrahman@gmail.com",
  linkedin: "https://www.linkedin.com/in/srnrahman/",
  github: "https://github.com/Sakibur-16",
  scholar: "https://scholar.google.com/citations?user=M7TDa2gAAAAJ&hl=en",
  location: "Dhaka, Bangladesh",
} as const;
