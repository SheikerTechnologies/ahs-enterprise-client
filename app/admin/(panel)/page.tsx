import { connectDB } from "@/lib/mongodb";
import { ProjectModel } from "@/lib/models/Project";
import { ServiceModel } from "@/lib/models/Service";
import { ClientModel } from "@/lib/models/Client";
import { ContactMessageModel } from "@/lib/models/ContactMessage";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectDB();
  const [projects, services, clients, newMessages] = await Promise.all([
    ProjectModel.countDocuments(),
    ServiceModel.countDocuments(),
    ClientModel.countDocuments(),
    ContactMessageModel.countDocuments({ status: "new" }),
  ]);

  const cards = [
    { label: "Projects", value: projects },
    { label: "Services", value: services },
    { label: "Clients", value: clients },
    { label: "New messages", value: newMessages },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">Dashboard</h1>
      <p className="mt-2 text-sm text-ink-muted">Welcome back. Editing tools for each section are coming next.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-sm border border-ink/10 bg-white p-5">
            <p className="font-display text-4xl font-extrabold text-ink">{c.value}</p>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <a
          href="/api/admin/backup"
          className="inline-flex items-center gap-2 rounded-sm border border-ink/15 bg-white px-5 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-ink hover:border-buoy hover:text-buoy transition-colors"
        >
          <Download size={15} />
          Download backup
        </a>
        <p className="mt-2 text-xs text-ink-muted">
          A JSON snapshot of projects, services, clients, settings and messages.
        </p>
      </div>
    </div>
  );
}
