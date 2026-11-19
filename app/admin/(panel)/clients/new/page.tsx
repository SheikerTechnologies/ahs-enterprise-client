import { EntityForm } from "@/components/admin/EntityForm";
import { clientFields } from "@/lib/adminFields";

export const dynamic = "force-dynamic";

export default function NewClientPage() {
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">New client</h1>
      <EntityForm apiBase="/api/admin/clients" listHref="/admin/clients" fields={clientFields} />
    </div>
  );
}
