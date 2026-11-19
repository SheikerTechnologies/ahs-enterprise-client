import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { ProjectModel } from "@/lib/models/Project";
import { requireAdmin } from "@/lib/adminGuard";
import { parseProject, refreshPublicSite } from "@/lib/adminProject";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const parsed = parseProject(body);
  if (!parsed.data) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    await connectDB();
    const existing = await ProjectModel.findById(id).lean();
    if (!existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });

    const data = { ...parsed.data, code: parsed.data.code || existing.code };
    const update: Record<string, unknown> = { $set: data };
    if (!data.geo) update.$unset = { geo: "" };
    await ProjectModel.updateOne({ _id: id }, update, { runValidators: true });

    refreshPublicSite(existing.slug);
    refreshPublicSite(data.slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "Another project already uses this slug or code." }, { status: 409 });
    }
    console.error("[admin projects] update failed:", err);
    return NextResponse.json({ error: "Could not save the project." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  try {
    await connectDB();
    const removed = await ProjectModel.findByIdAndDelete(id).lean();
    if (!removed) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    refreshPublicSite(removed.slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin projects] delete failed:", err);
    return NextResponse.json({ error: "Could not delete the project." }, { status: 500 });
  }
}
