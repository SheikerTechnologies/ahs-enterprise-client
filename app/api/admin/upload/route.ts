import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { cloudinaryConfig, uploadImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
const MAX_BYTES = 4 * 1024 * 1024;
const FOLDERS = ["projects", "clients"];

export async function POST(req: Request) {
  const { error } = await requireAdmin(req);
  if (error) return error;
  if (!cloudinaryConfig()) {
    return NextResponse.json({ error: "Image upload is not configured on this server." }, { status: 503 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const folder = String(form?.get("folder") ?? "projects");
  if (!(file instanceof Blob)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Only JPG, PNG, WebP, AVIF or SVG images are allowed." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image is too large (max 4 MB)." }, { status: 413 });
  if (!FOLDERS.includes(folder)) return NextResponse.json({ error: "Invalid folder." }, { status: 400 });

  try {
    const result = await uploadImage(file, `ahs-enterprise/${folder}`);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[admin upload] failed:", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 502 });
  }
}
