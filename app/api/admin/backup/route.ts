import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/adminGuard";
import { ProjectModel } from "@/lib/models/Project";
import { ServiceModel } from "@/lib/models/Service";
import { ClientModel } from "@/lib/models/Client";
import { SettingModel } from "@/lib/models/Setting";
import { ContactMessageModel } from "@/lib/models/ContactMessage";

export const dynamic = "force-dynamic";

/** JSON snapshot of all editable content. Never includes admin users or password hashes. */
export async function GET(req: Request) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    await connectDB();
    const [projects, services, clients, setting, contactMessages] = await Promise.all([
      ProjectModel.find().sort({ order: 1, code: 1 }).lean(),
      ServiceModel.find().sort({ order: 1 }).lean(),
      ClientModel.find().sort({ order: 1 }).lean(),
      SettingModel.findOne({ key: "site" }).lean(),
      ContactMessageModel.find().sort({ createdAt: -1 }).lean(),
    ]);

    const payload = {
      exportedAt: new Date().toISOString(),
      projects,
      services,
      clients,
      settings: (setting as { data?: unknown } | null)?.data ?? null,
      contactmessages: contactMessages,
    };

    const filename = `ahs-backup-${new Date().toISOString().slice(0, 10)}.json`;

    return new NextResponse(JSON.stringify(payload, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[admin backup] export failed:", err);
    return NextResponse.json({ error: "Could not create the backup." }, { status: 500 });
  }
}
