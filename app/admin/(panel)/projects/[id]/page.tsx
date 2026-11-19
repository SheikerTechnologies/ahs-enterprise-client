import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { ProjectModel } from "@/lib/models/Project";
import { ProjectForm, type ProjectFormValues } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();
  await connectDB();
  const doc = await ProjectModel.findById(id).lean();
  if (!doc) notFound();

  const initial: ProjectFormValues = {
    slug: doc.slug,
    code: doc.code,
    title: doc.title,
    client: doc.client,
    location: doc.location,
    year: doc.year,
    duration: doc.duration,
    scope: doc.scope,
    status: doc.status,
    tagline: doc.tagline ?? "",
    summary: doc.summary ?? "",
    image: doc.image,
    gallery: doc.gallery ?? [],
    details: (doc.details ?? []).map((d) => ({ label: d.label ?? "", value: d.value ?? "" })),
    geo: doc.geo?.lat != null ? { lat: String(doc.geo.lat), lng: String(doc.geo.lng), place: doc.geo.place ?? "" } : { lat: "", lng: "", place: "" },
    published: doc.published !== false,
  };

  return (
    <div>
      <h1 className="font-display mb-1 text-3xl font-extrabold uppercase tracking-tight text-ink">Edit project</h1>
      <p className="mb-8 font-mono text-xs text-ink-muted">{doc.code} · /projects/{doc.slug}</p>
      <ProjectForm id={id} initial={initial} />
    </div>
  );
}
