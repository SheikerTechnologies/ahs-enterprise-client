import { createHash } from "node:crypto";

/** Cloudinary signature: sorted "key=value" pairs joined with &, secret appended, SHA-1. */
export function signParams(params: Record<string, string | number>, secret: string) {
  const toSign = Object.keys(params)
    .filter((k) => params[k] !== "" && params[k] !== undefined)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(toSign + secret).digest("hex");
}

export function cloudinaryConfig() {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  return cloud && key && secret ? { cloud, key, secret } : null;
}

export async function uploadImage(file: Blob, folder: string) {
  const cfg = cloudinaryConfig();
  if (!cfg) throw new Error("Cloudinary is not configured");

  const timestamp = Math.floor(Date.now() / 1000);
  const signed = { folder, timestamp };
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", cfg.key);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("signature", signParams(signed, cfg.secret));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloud}/image/upload`, { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || `Cloudinary error ${res.status}`);
  return { url: String(data.secure_url), width: Number(data.width) || 0, height: Number(data.height) || 0 };
}
