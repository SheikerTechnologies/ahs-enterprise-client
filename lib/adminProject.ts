import { revalidatePath } from "next/cache";

export type ProjectInput = {
  slug: string;
  code: string;
  title: string;
  client: string;
  location: string;
  year: string;
  duration: string;
  scope: string;
  status: "COMPLETED" | "ONGOING";
  tagline: string;
  summary: string;
  image: string;
  gallery: string[];
  details: { label: string; value: string }[];
  geo?: { lat: number; lng: number; place: string };
  published: boolean;
};

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const str = (v: unknown, max = 500) => String(v ?? "").trim().slice(0, max);

/** Validates the request body. `code` and `slug` may be blank (filled in by the caller). */
export function parseProject(body: Record<string, unknown>): { data?: ProjectInput; error?: string } {
  const title = str(body.title, 200);
  const client = str(body.client, 200);
  const location = str(body.location, 200);
  const year = str(body.year, 20);
  const duration = str(body.duration, 60);
  const scope = str(body.scope, 200);
  const image = str(body.image, 300);
  const status = body.status === "ONGOING" ? "ONGOING" : body.status === "COMPLETED" ? "COMPLETED" : null;

  if (!title) return { error: "Title is required." };
  if (!client) return { error: "Client is required." };
  if (!location) return { error: "Location is required." };
  if (!year) return { error: "Year is required." };
  if (!duration) return { error: "Duration is required." };
  if (!scope) return { error: "Scope is required." };
  if (!status) return { error: "Choose a status." };
  if (!image) return { error: "Main image path is required (e.g. /images/gallery/example.jpg)." };
  if (!image.startsWith("/") && !/^https?:\/\//.test(image)) return { error: "Image must start with / or https://" };

  const slug = slugify(str(body.slug, 100) || title);
  if (!slug) return { error: "Could not create a URL slug from the title." };

  const gallery = (Array.isArray(body.gallery) ? body.gallery : [])
    .map((g) => str(g, 300))
    .filter(Boolean)
    .slice(0, 20);
  if (!gallery.length) gallery.push(image);

  let details = (Array.isArray(body.details) ? body.details : [])
    .map((d) => ({ label: str((d as Record<string, unknown>)?.label, 60), value: str((d as Record<string, unknown>)?.value, 200) }))
    .filter((d) => d.label && d.value)
    .slice(0, 20);
  if (!details.length) {
    details = [
      { label: "Client", value: client },
      { label: "Location", value: location },
      { label: "Year", value: year },
      { label: "Duration", value: duration },
      { label: "Scope", value: scope },
      { label: "Status", value: status === "COMPLETED" ? "Completed" : "Ongoing" },
    ];
  }

  let geo: ProjectInput["geo"];
  const g = body.geo as Record<string, unknown> | undefined;
  if (g && str(g.lat) !== "" && str(g.lng) !== "") {
    const lat = Number(g.lat);
    const lng = Number(g.lng);
    if (!Number.isFinite(lat) || lat < 20.5 || lat > 26.7) return { error: "Latitude must be a number between 20.5 and 26.7 (Bangladesh)." };
    if (!Number.isFinite(lng) || lng < 87.9 || lng > 92.8) return { error: "Longitude must be a number between 87.9 and 92.8 (Bangladesh)." };
    geo = { lat, lng, place: str(g.place, 60) || location.split(",")[0].trim() };
  }

  return {
    data: {
      slug,
      code: str(body.code, 20).toUpperCase(),
      title,
      client,
      location,
      year,
      duration,
      scope,
      status,
      tagline: str(body.tagline, 200),
      summary: str(body.summary, 2000),
      image,
      gallery,
      details,
      geo,
      published: body.published !== false,
    },
  };
}

/** Make the public site pick up a change right away. */
export function refreshPublicSite(slug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/projects/${slug}`);
}
