import { NextResponse } from "next/server";
import { getCurrentAdmin } from "./auth";

/** For admin API routes: returns the admin, or a ready-made error response. */
export async function requireAdmin(req: Request) {
  // Reject cross-site requests (extra protection on top of SameSite cookies)
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return { admin: null, error: NextResponse.json({ error: "Forbidden." }, { status: 403 }) };
  }
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { admin: null, error: NextResponse.json({ error: "Please sign in again." }, { status: 401 }) };
  }
  return { admin, error: null };
}
