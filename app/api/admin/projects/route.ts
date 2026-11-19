import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ProjectModel } from "@/lib/models/Project";
import { requireAdmin } from "@/lib/adminGuard";
import { parseProject, refreshPublicSite } from "@/lib/adminProject";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const parsed = parseProject(body);
  if (!parsed.data) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    await connectDB();
    const data = { ...parsed.data };

    if (!data.code) {
      const codes = await ProjectModel.find({}, { code: 1 }).lean();
      const max = codes.reduce((m, c) => Math.max(m, Number(/PRJ-(\d+)/.exec(c.code)?.[1] ?? 0)), 0);
      data.code = `PRJ-${String(max + 1).padStart(2, "0")}`;
    }
    const last = await ProjectModel.findOne({}, { order: 1 }).sort({ order: -1 }).lean();
    const created = await ProjectModel.create({ ...data, order: (last?.order ?? 0) + 1 });

    refreshPublicSite(data.slug);
    return NextResponse.json({ ok: true, id: String(created._id) });
  } catch (err) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "A project with this slug or code already exists." }, { status: 409 });
    }
    console.error("[admin projects] create failed:", err);
    return NextResponse.json({ error: "Could not save the project." }, { status: 500 });
  }
}
