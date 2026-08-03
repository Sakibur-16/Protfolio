import type { SiteConfig } from "@/types/portfolio";

// Update NEXT_PUBLIC_SITE_URL in your environment before deploying so
// canonical URLs, sitemap.ts, and JSON-LD all resolve correctly.
export const siteConfig: SiteConfig = {
  name: "Md. Sakibur Rahman",
  shortName: "Sakibur Rahman",
  title: "Md. Sakibur Rahman — AI Developer & ML Researcher",
  description:
    "AI developer and ML researcher building production LLM, RAG, NLP, computer vision, and speech products, with published research in medical AI, code understanding, and brain-computer interfaces.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sakiburrahman.dev",
  locale: "en_US",
  themeColor: "#0a0a0b",
  ogImage: "/og-image.png",
};
