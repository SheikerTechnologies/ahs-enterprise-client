import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { ContactMessageModel } from "@/lib/models/ContactMessage";
import { requireAdmin } from "@/lib/adminGuard";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };
const STATUSES = ["new", "read", "replied", "archived"];

export async function PATCH(req: Request, { params }: Ctx) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  const body = await req.json().catch(() => null);
  const status = String(body?.status ?? "");
  if (!STATUSES.includes(status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });

  try {
    await connectDB();
    const res = await ContactMessageModel.updateOne({ _id: id }, { $set: { status } });
    if (!res.matchedCount) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin messages] update failed:", err);
    return NextResponse.json({ error: "Could not update." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  try {
    await connectDB();
    const removed = await ContactMessageModel.findByIdAndDelete(id).lean();
    if (!removed) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin messages] delete failed:", err);
    return NextResponse.json({ error: "Could not delete." }, { status: 500 });
  }
}
