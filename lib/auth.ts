import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectDB, isDbConfigured } from "./mongodb";
import { AdminUserModel } from "./models/AdminUser";

export const SESSION_COOKIE = "ahs_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

type SessionPayload = { uid: string; name: string; role: string };
export type AdminSession = SessionPayload;

function secretKey() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (at least 32 characters)");
  return new TextEncoder().encode(s);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function getSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { uid: String(payload.uid), name: String(payload.name), role: String(payload.role) };
  } catch {
    return null;
  }
}

/** Session + a live database check, so deactivating a user takes effect immediately. */
export async function getCurrentAdmin() {
  const session = await getSession();
  if (!session || !isDbConfigured()) return null;
  try {
    await connectDB();
    const user = await AdminUserModel.findById(session.uid).lean();
    if (!user || !user.active) return null;
    return { id: String(user._id), name: user.name, email: user.email, role: user.role };
  } catch {
    return null;
  }
}
