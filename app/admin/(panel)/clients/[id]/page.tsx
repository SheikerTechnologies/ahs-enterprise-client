import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { ClientModel } from "@/lib/models/Client";
import { EntityForm } from "@/components/admin/EntityForm";
import { clientFields } from "@/lib/adminFields";

export const dynamic = "force-dynamic";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();
  await connectDB();
  const doc = await ClientModel.findById(id).lean();
  if (!doc) notFound();

  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">Edit client</h1>
      <EntityForm
        id={id}
        apiBase="/api/admin/clients"
        listHref="/admin/clients"
        fields={clientFields}
        published={doc.published !== false}
        initial={{ name: doc.name, full: doc.full, image: doc.image ?? "", order: String(doc.order ?? "") }}
      />
    </div>
  );
}
