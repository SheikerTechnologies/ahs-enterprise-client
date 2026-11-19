"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

export type ProjectFormValues = {
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
  geo: { lat: string; lng: string; place: string };
  published: boolean;
};

const empty: ProjectFormValues = {
  slug: "", code: "", title: "", client: "BIWTA", location: "", year: String(new Date().getFullYear()),
  duration: "", scope: "", status: "COMPLETED", tagline: "", summary: "", image: "", gallery: [],
  details: [], geo: { lat: "", lng: "", place: "" }, published: true,
};

const input = "w-full rounded-sm border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-buoy";
const label = "mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted";
const hint = "mt-1 text-xs text-ink-muted";

export function ProjectForm({ id, initial }: { id?: string; initial?: ProjectFormValues }) {
  const router = useRouter();
  const [v, setV] = useState<ProjectFormValues>(initial ?? empty);
  const [galleryText, setGalleryText] = useState((initial?.gallery ?? []).join("\n"));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof ProjectFormValues>(k: K, val: ProjectFormValues[K]) => setV((p) => ({ ...p, [k]: val }));

  async function request(method: "POST" | "PUT" | "DELETE") {
    const url = id ? `/api/admin/projects/${id}` : "/api/admin/projects";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "DELETE" ? undefined : JSON.stringify({ ...v, gallery: galleryText.split("\n") }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong.");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await request(id ? "PUT" : "POST");
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!window.confirm("Delete this project permanently? This cannot be undone.")) return;
    setBusy(true);
    setError("");
    try {
      await request("DELETE");
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-8">
      <section className="grid gap-5 rounded-sm border border-ink/10 bg-white p-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Title *</label>
          <input className={input} required value={v.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <label className={label}>Client *</label>
          <input className={input} required value={v.client} onChange={(e) => set("client", e.target.value)} />
        </div>
        <div>
          <label className={label}>Location *</label>
          <input className={input} required value={v.location} onChange={(e) => set("location", e.target.value)} placeholder="Aricha Ferryghat" />
        </div>
        <div>
          <label className={label}>Year *</label>
          <input className={input} required value={v.year} onChange={(e) => set("year", e.target.value)} />
        </div>
        <div>
          <label className={label}>Duration *</label>
          <input className={input} required value={v.duration} onChange={(e) => set("duration", e.target.value)} placeholder="30 Days" />
        </div>
        <div>
          <label className={label}>Status *</label>
          <select className={input} value={v.status} onChange={(e) => set("status", e.target.value as ProjectFormValues["status"])}>
            <option value="COMPLETED">Completed</option>
            <option value="ONGOING">Ongoing</option>
          </select>
        </div>
        <div>
          <label className={label}>Scope *</label>
          <input className={input} required value={v.scope} onChange={(e) => set("scope", e.target.value)} placeholder="Riverbank Protection" />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Tagline</label>
          <input className={input} value={v.tagline} onChange={(e) => set("tagline", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Summary</label>
          <textarea className={input} rows={4} value={v.summary} onChange={(e) => set("summary", e.target.value)} />
        </div>
      </section>

      <section className="grid gap-5 rounded-sm border border-ink/10 bg-white p-6">
        <div>
          <label className={label}>Main image path *</label>
          <input className={input} required value={v.image} onChange={(e) => set("image", e.target.value)} placeholder="/images/gallery/example.jpg" />
          <p className={hint}>Put the file in <code>public/images/…</code> and write its path here. Direct upload comes in a later step.</p>
        </div>
        <div>
          <label className={label}>More gallery images (one path per line)</label>
          <textarea className={`${input} font-mono text-xs`} rows={3} value={galleryText} onChange={(e) => setGalleryText(e.target.value)} />
        </div>
      </section>

      <section className="rounded-sm border border-ink/10 bg-white p-6">
        <p className={label}>Specification rows (optional)</p>
        <p className={`${hint} mb-4`}>Leave empty to fill them automatically from the fields above.</p>
        <div className="space-y-3">
          {v.details.map((d, i) => (
            <div key={i} className="flex gap-3">
              <input className={input} placeholder="Label" value={d.label} onChange={(e) => set("details", v.details.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
              <input className={input} placeholder="Value" value={d.value} onChange={(e) => set("details", v.details.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
              <button type="button" aria-label="Remove row" onClick={() => set("details", v.details.filter((_, j) => j !== i))} className="px-2 text-ink-muted hover:text-buoy">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => set("details", [...v.details, { label: "", value: "" }])} className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-buoy">
          <Plus size={14} /> Add row
        </button>
      </section>

      <section className="grid gap-5 rounded-sm border border-ink/10 bg-white p-6 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <p className={label}>Map pin (optional)</p>
          <p className={hint}>Latitude and longitude of the site (e.g. from Google Maps). Leave empty to hide it from the map.</p>
        </div>
        <div>
          <label className={label}>Latitude</label>
          <input className={input} inputMode="decimal" value={v.geo.lat} onChange={(e) => set("geo", { ...v.geo, lat: e.target.value })} placeholder="23.656" />
        </div>
        <div>
          <label className={label}>Longitude</label>
          <input className={input} inputMode="decimal" value={v.geo.lng} onChange={(e) => set("geo", { ...v.geo, lng: e.target.value })} placeholder="89.976" />
        </div>
        <div>
          <label className={label}>Place name</label>
          <input className={input} value={v.geo.place} onChange={(e) => set("geo", { ...v.geo, place: e.target.value })} placeholder="Aricha" />
        </div>
      </section>

      <section className="grid gap-5 rounded-sm border border-ink/10 bg-white p-6 sm:grid-cols-3">
        <div>
          <label className={label}>Code</label>
          <input className={input} value={v.code} onChange={(e) => set("code", e.target.value)} placeholder="auto (e.g. PRJ-27)" />
        </div>
        <div>
          <label className={label}>URL slug</label>
          <input className={input} value={v.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from title" />
        </div>
        <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-ink">
          <input type="checkbox" checked={v.published} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4" />
          Visible on the website
        </label>
        {id && <p className={`${hint} sm:col-span-3`}>Changing the slug changes the project&apos;s web address.</p>}
      </section>

      <p role="alert" aria-live="polite" className="min-h-5 text-sm text-buoy">{error}</p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3">
          <button type="submit" disabled={busy} className="rounded-sm bg-buoy px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:bg-ink transition-colors disabled:opacity-60">
            {busy ? "Saving…" : id ? "Save changes" : "Create project"}
          </button>
          <button type="button" disabled={busy} onClick={() => router.push("/admin/projects")} className="rounded-sm border border-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink hover:border-ink">
            Cancel
          </button>
        </div>
        {id && (
          <button type="button" disabled={busy} onClick={onDelete} className="font-mono text-xs uppercase tracking-widest text-buoy hover:underline">
            Delete project
          </button>
        )}
      </div>
    </form>
  );
}
