import { cache } from "react";
import {
  projects as staticProjects,
  services as staticServices,
  clients as staticClients,
  companyInfo,
  defaultSettings,
  type Project,
  type Service,
  type ClientItem,
  type SiteSettings,
} from "./data";
import { projectGeo } from "./projectGeo";
import { connectDB, isDbConfigured } from "./mongodb";
import { ProjectModel } from "./models/Project";
import { ServiceModel } from "./models/Service";
import { ClientModel } from "./models/Client";
import { SettingModel } from "./models/Setting";

const STRIP = ["_id", "__v", "createdAt", "updatedAt", "order", "published"];

function plain<T>(doc: unknown): T {
  const obj = JSON.parse(JSON.stringify(doc)) as Record<string, unknown>;
  for (const k of STRIP) delete obj[k];
  return obj as T;
}

// Reads from MongoDB when MONGODB_URI is set; otherwise (or if the DB is
// unreachable / empty) falls back to the static content in lib/data.ts.
async function fromDb<T>(read: () => Promise<T | null>, fallback: T): Promise<T> {
  if (!isDbConfigured()) return fallback;
  try {
    await connectDB();
    const result = await read();
    return result ?? fallback;
  } catch (err) {
    console.error("[content] MongoDB read failed — using static data:", err);
    return fallback;
  }
}

function withGeo(p: Project): Project {
  return { ...p, geo: p.geo ?? projectGeo[p.slug] };
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const list = await fromDb<Project[]>(async () => {
    const docs = await ProjectModel.find({ published: { $ne: false } })
      .sort({ order: 1, code: 1 })
      .lean();
    return docs.length ? docs.map((d) => plain<Project>(d)) : null;
  }, staticProjects);
  return list.map(withGeo);
});

export const getProject = cache(async (slug: string): Promise<Project | null> => {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
});

export const getServices = cache(async (): Promise<Service[]> =>
  fromDb<Service[]>(async () => {
    const docs = await ServiceModel.find({ published: { $ne: false } }).sort({ order: 1 }).lean();
    return docs.length ? docs.map((d) => plain<Service>(d)) : null;
  }, staticServices)
);

export const getClients = cache(async (): Promise<ClientItem[]> =>
  fromDb<ClientItem[]>(async () => {
    const docs = await ClientModel.find({ published: { $ne: false } }).sort({ order: 1 }).lean();
    return docs.length ? docs.map((d) => plain<ClientItem>(d)) : null;
  }, staticClients)
);

export const getSettings = cache(async (): Promise<SiteSettings> =>
  fromDb<SiteSettings>(async () => {
    const doc = await SettingModel.findOne({ key: "site" }).lean();
    if (!doc) return null;
    return { ...defaultSettings, ...plain<{ data: Partial<SiteSettings> }>(doc).data };
  }, defaultSettings)
);

export { companyInfo };