import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { SettingModel } from "@/lib/models/Setting";
import { requireAdmin } from "@/lib/adminGuard";
import { parseSettings } from "@/lib/adminSettings";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const parsed = parseSettings(body);
  if (!parsed.data) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    await connectDB();
    await SettingModel.updateOne({ key: "site" }, { $set: { data: parsed.data } }, { upsert: true });
    // settings appear on every page (footer, WhatsApp button, page data)
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin settings] save failed:", err);
    return NextResponse.json({ error: "Could not save settings." }, { status: 500 });
  }
}
