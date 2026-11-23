import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import type { Project } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

// Evaluated at build time — used when a project has no MongoDB timestamp.
const BUILD_DATE = new Date();

const lastModifiedFor = (project?: Project) =>
  project?.updatedAt ? new Date(project.updatedAt) : BUILD_DATE;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/projects`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/clients`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: lastModifiedFor(p),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
