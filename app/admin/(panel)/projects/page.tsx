import Link from "next/link";
import { Plus } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { ProjectModel } from "@/lib/models/Project";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  await connectDB();
  const projects = await ProjectModel.find({}, { code: 1, title: 1, client: 1, year: 1, status: 1, published: 1 })
    .sort({ order: 1, code: 1 })
    .lean();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">Projects</h1>
          <p className="mt-1 text-sm text-ink-muted">{projects.length} projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-sm bg-buoy px-5 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:bg-ink transition-colors"
        >
          <Plus size={14} /> New project
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm border border-ink/10 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-ink/10 bg-fog font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Visible</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {projects.map((p) => (
              <tr key={String(p._id)} className="hover:bg-fog/60">
                <td className="px-4 py-3 font-mono text-xs text-ink-muted">{p.code}</td>
                <td className="px-4 py-3 font-semibold text-ink">
                  <Link href={`/admin/projects/${p._id}`} className="hover:text-buoy">{p.title}</Link>
                </td>
                <td className="px-4 py-3 text-ink-muted">{p.client}</td>
                <td className="px-4 py-3 text-ink-muted">{p.year}</td>
                <td className="px-4 py-3 font-mono text-xs">{p.status}</td>
                <td className="px-4 py-3 text-xs">{p.published === false ? "Hidden" : "Yes"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
