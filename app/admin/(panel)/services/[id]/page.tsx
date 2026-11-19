import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { ServiceModel } from "@/lib/models/Service";
import { EntityForm } from "@/components/admin/EntityForm";
import { serviceFields } from "@/lib/adminFields";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();
  await connectDB();
  const doc = await ServiceModel.findById(id).lean();
  if (!doc) notFound();

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">Edit service</h1>
      <EntityForm
        id={id}
        apiBase="/api/admin/services"
        listHref="/admin/services"
        fields={serviceFields}
        published={doc.published !== false}
        initial={{ title: doc.title, short: doc.short, description: doc.description, code: doc.code, order: String(doc.order ?? "") }}
      />
    </div>
  );
}
