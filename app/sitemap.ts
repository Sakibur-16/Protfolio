import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { allProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: project.featured ? 0.8 : 0.5,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
