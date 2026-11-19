import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { ArrowLeft, Mail } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { ContactMessageModel } from "@/lib/models/ContactMessage";
import { MessageActions } from "@/components/admin/MessageActions";

export const dynamic = "force-dynamic";

const fmt = (d: Date | string) =>
  new Date(d).toLocaleString("en-GB", { timeZone: "Asia/Dhaka", dateStyle: "full", timeStyle: "short" });

export default async function MessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) notFound();
  await connectDB();

  let m = await ContactMessageModel.findById(id).lean();
  if (!m) notFound();
  // opening a new message marks it as read
  if (m.status === "new") {
    await ContactMessageModel.updateOne({ _id: id }, { $set: { status: "read" } });
    m = { ...m, status: "read" };
  }

  return (
    <div className="max-w-3xl">
      <Link href="/admin/messages" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-muted hover:text-buoy">
        <ArrowLeft size={14} /> All messages
      </Link>

      <div className="mt-6 rounded-sm border border-ink/10 bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">{m.name}</h1>
            {m.organisation && <p className="text-sm text-ink-muted">{m.organisation}</p>}
          </div>
          <span className="rounded-sm bg-ink/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">{m.status}</span>
        </div>

        <p className="mt-4 flex items-center gap-2 text-sm">
          <Mail size={15} className="text-buoy" />
          <a href={`mailto:${m.email}`} className="text-buoy hover:underline">{m.email}</a>
        </p>
        <p className="mt-1 text-xs text-ink-muted">{fmt(m.createdAt as unknown as Date)}</p>

        <p className="mt-6 whitespace-pre-wrap border-t border-ink/10 pt-6 text-[0.95rem] leading-relaxed text-ink">{m.message}</p>
      </div>

      <div className="mt-6">
        <MessageActions id={id} status={m.status} />
      </div>
    </div>
  );
}
