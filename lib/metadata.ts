import type { Metadata } from "next";
import { contact, siteConfig } from "@/data/site";

// The Open Graph / Twitter image comes from app/opengraph-image.png (file
// convention), so it is not repeated here.
export function buildMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: ["AI Developer", "RAG", "Agentic AI", "LLM", "NLP", "Computer Vision", "Dhaka", "Bangladesh"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.shortName,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
    },
    icons: { icon: "/icon.svg" },
  };
}

/** JSON-LD Person schema, rendered once in the root layout. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "AI Developer",
    description: siteConfig.description,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "Bangladesh",
    },
    worksFor: { "@type": "Organization", name: "Sparktech Agency" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "East West University" },
    sameAs: [contact.linkedin],
    knowsAbout: [
      "Retrieval-Augmented Generation",
      "Agentic AI",
      "Large Language Models",
      "Natural Language Processing",
      "Computer Vision",
    ],
  };
}
