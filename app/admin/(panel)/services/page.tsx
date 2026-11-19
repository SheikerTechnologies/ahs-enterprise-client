import Link from "next/link";
import { Plus } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { ServiceModel } from "@/lib/models/Service";

export const dynamic = "force-dynamic";

export default async function AdminServices() {
  await connectDB();
  const items = await ServiceModel.find({}).sort({ order: 1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">Services</h1>
          <p className="mt-1 text-sm text-ink-muted">{items.length} items</p>
        </div>
        <Link href="/admin/services/new" className="inline-flex items-center gap-2 rounded-sm bg-buoy px-5 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:bg-ink transition-colors">
          <Plus size={14} /> New
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto rounded-sm border border-ink/10 bg-white">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-ink/10 bg-fog font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
            <tr><th className="px-4 py-3">Order</th><th className="px-4 py-3">Code</th><th className="px-4 py-3">Title</th><th className="px-4 py-3">Visible</th></tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {items.map((i) => (
              <tr key={String(i._id)} className="hover:bg-fog/60">
                <td className="px-4 py-3 font-mono text-xs text-ink-muted">{i.order}</td>
                <td className="px-4 py-3 font-mono text-xs text-ink-muted">{i.code}</td><td className="px-4 py-3 font-semibold text-ink"><Link href={`/admin/services/${i._id}`} className="hover:text-buoy">{i.title}</Link></td>
                <td className="px-4 py-3 text-xs">{i.published === false ? "Hidden" : "Yes"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
