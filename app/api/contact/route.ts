import { NextResponse, after } from "next/server";
import { connectDB, isDbConfigured } from "@/lib/mongodb";
import { ContactMessageModel } from "@/lib/models/ContactMessage";
import { sendEnquiryNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

// Basic in-memory rate limit (per server instance): 5 messages / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // honeypot — real users never fill this hidden field
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const organisation = String(body.organisation ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 120) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 200) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (message.length < 10 || message.length > 4000) return NextResponse.json({ error: "Please describe your enquiry (10–4000 characters)." }, { status: 400 });
  if (organisation.length > 160) return NextResponse.json({ error: "Organisation name is too long." }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });

  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Enquiries are temporarily unavailable. Please call or WhatsApp us." }, { status: 503 });
  }

  try {
    await connectDB();
    await ContactMessageModel.create({ name, organisation, email, message, ip });

    // Email the owner. Runs after the response is sent; a mail failure never affects the visitor.
    const notify = () =>
      sendEnquiryNotification({ name, organisation, email, message }).catch((err) =>
        console.error("[contact] notification email failed:", err)
      );
    try {
      after(notify);
    } catch {
      void notify();
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] save failed:", err);
    return NextResponse.json({ error: "Could not send your message. Please try again or call us." }, { status: 500 });
  }
}
