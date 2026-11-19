import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { ContactMessageModel } from "@/lib/models/ContactMessage";

export const dynamic = "force-dynamic";

const tabs = [
  { key: "", label: "All" },
  { key: "new", label: "New" },
  { key: "read", label: "Read" },
  { key: "replied", label: "Replied" },
  { key: "archived", label: "Archived" },
];

const badge: Record<string, string> = {
  new: "bg-buoy/10 text-buoy",
  read: "bg-ink/10 text-ink-muted",
  replied: "bg-chart-green/10 text-chart-green",
  archived: "bg-ink/5 text-ink-muted",
};

const fmt = (d: Date | string) =>
  new Date(d).toLocaleString("en-GB", { timeZone: "Asia/Dhaka", dateStyle: "medium", timeStyle: "short" });

export default async function AdminMessages({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const valid = tabs.some((t) => t.key === status) && status ? status : "";
  await connectDB();
  const [items, counts] = await Promise.all([
    ContactMessageModel.find((valid ? { status: valid } : {}) as Record<string, string>).sort({ createdAt: -1 }).limit(200).lean(),
    ContactMessageModel.aggregate<{ _id: string; n: number }>([{ $group: { _id: "$status", n: { $sum: 1 } } }]),
  ]);
  const count = (k: string) => (k ? counts.find((c) => c._id === k)?.n ?? 0 : counts.reduce((s, c) => s + c.n, 0));

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">Messages</h1>
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filter messages">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={t.key ? `/admin/messages?status=${t.key}` : "/admin/messages"}
            aria-current={t.key === valid ? "page" : undefined}
            className={`rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-widest ${
              t.key === valid ? "border-ink bg-ink text-white" : "border-ink/20 text-ink hover:border-ink"
            }`}
          >
            {t.label} ({count(t.key)})
          </Link>
        ))}
      </nav>

      <div className="mt-6 divide-y divide-ink/10 rounded-sm border border-ink/10 bg-white">
        {items.length === 0 && <p className="p-6 text-sm text-ink-muted">No messages here.</p>}
        {items.map((m) => (
          <Link key={String(m._id)} href={`/admin/messages/${m._id}`} className="flex items-start gap-4 p-4 hover:bg-fog/60">
            <span className={`mt-0.5 shrink-0 rounded-sm px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest ${badge[m.status] ?? ""}`}>
              {m.status}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm ${m.status === "new" ? "font-bold text-ink" : "text-ink"}`}>
                {m.name}
                {m.organisation ? <span className="font-normal text-ink-muted"> · {m.organisation}</span> : null}
              </p>
              <p className="truncate text-sm text-ink-muted">{m.message}</p>
            </div>
            <time className="shrink-0 text-xs text-ink-muted">{fmt(m.createdAt as unknown as Date)}</time>
          </Link>
        ))}
      </div>
    </div>
  );
}
