import {
  clients,
  companyInfo,
  defaultSettings,
  projects,
  services,
  type ClientItem,
  type Project,
  type Service,
  type SiteSettings,
} from "@/lib/data";

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getClients(): Promise<ClientItem[]> {
  return clients;
}

export async function getSettings(): Promise<SiteSettings> {
  return defaultSettings;
}

export { companyInfo };
