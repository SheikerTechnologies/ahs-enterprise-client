import { EntityForm } from "@/components/admin/EntityForm";
import { serviceFields } from "@/lib/adminFields";

export const dynamic = "force-dynamic";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-extrabold uppercase tracking-tight text-ink">New service</h1>
      <EntityForm apiBase="/api/admin/services" listHref="/admin/services" fields={serviceFields} />
    </div>
  );
}
