// Sends an email through Resend (https://resend.com) using its HTTP API — no extra package needed.

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL);
}

type Enquiry = { name: string; organisation: string; email: string; message: string };

export async function sendEnquiryNotification(m: Enquiry) {
  const key = process.env.RESEND_API_KEY;
  const to = (process.env.NOTIFY_EMAIL ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!key || !to.length) return { sent: false as const, reason: "not configured" };

  const from = process.env.MAIL_FROM || "AHS Website <onboarding@resend.dev>";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ahs-enterprise.com";
  const subject = `New enquiry from ${m.name}${m.organisation ? ` (${m.organisation})` : ""}`.slice(0, 150);

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;color:#0a2540">
  <h2 style="margin:0 0 4px">New website enquiry</h2>
  <p style="margin:0 0 20px;color:#667">Sent from the contact form on ${esc(site)}</p>
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    <tr><td style="padding:6px 0;color:#667;width:110px">Name</td><td><b>${esc(m.name)}</b></td></tr>
    <tr><td style="padding:6px 0;color:#667">Organisation</td><td>${esc(m.organisation) || "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#667">Email</td><td><a href="mailto:${esc(m.email)}">${esc(m.email)}</a></td></tr>
  </table>
  <div style="margin:20px 0;padding:16px;background:#f3f5f4;border-left:3px solid #e8951e;white-space:pre-wrap;font-size:14px;line-height:1.55">${esc(m.message)}</div>
  <p style="font-size:13px;color:#667">Reply to this email to answer ${esc(m.name)} directly, or open the
  <a href="${esc(site)}/admin/messages">admin inbox</a>.</p>
</div>`;

  const text = `New website enquiry\n\nName: ${m.name}\nOrganisation: ${m.organisation || "-"}\nEmail: ${m.email}\n\n${m.message}\n\nInbox: ${site}/admin/messages`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, reply_to: m.email, subject, html, text }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 200)}`);
  }
  return { sent: true as const };
}
