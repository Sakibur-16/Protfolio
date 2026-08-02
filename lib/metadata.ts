import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import type { Project } from "@/types/portfolio";

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s — ${siteConfig.shortName}`,
    },
    description: siteConfig.description,
    keywords: [
      "AI Developer",
      "Machine Learning Engineer",
      "LLM Engineer",
      "RAG",
      "NLP",
      "Computer Vision",
      "Speech AI",
      "Dhaka",
      "Bangladesh",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.shortName,
      images: [{ url: siteConfig.ogImage }],
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
    icons: { icon: "/icon.svg" },
    ...overrides,
  };
}

export function projectMetadata(project: Project): Metadata {
  return buildMetadata({
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
      title: `${project.title} — ${siteConfig.shortName}`,
      description: project.shortDescription,
      images: [{ url: siteConfig.ogImage }],
    },
  });
}

/** JSON-LD Person schema, rendered once in the root layout. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.roleTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: profile.location.country,
    },
    knowsAbout: [
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "Natural Language Processing",
      "Computer Vision",
      "Speech AI",
    ],
  };
}

/** JSON-LD ScholarlyArticle entries for the research section. */
export function publicationsJsonLd() {
  return publications.map((pub) => ({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    datePublished: pub.year,
    author: {
      "@type": "Person",
      name: profile.fullName,
    },
    publisher: pub.affiliation ? { "@type": "Organization", name: pub.affiliation } : undefined,
    isPartOf: pub.venue,
  }));
}
