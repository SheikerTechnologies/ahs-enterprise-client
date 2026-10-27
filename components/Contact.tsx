"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import type { CompanyInfo } from "@/lib/data";
import { Phone, Mail, MapPin, ArrowUpRight, Send, MessageCircle, FileDown } from "lucide-react";

type Status = { state: "idle" | "sending" | "success" | "error"; message?: string };

export function Contact({ company: companyInfo }: { company: CompanyInfo }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      form.reset();
      setStatus({ state: "success", message: "Thank you — your enquiry has been received. We'll get back to you shortly." });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return (
    <section id="contact" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 overflow-hidden rounded-sm border border-ink/10 lg:grid-cols-12">
          <div className="relative bg-ink p-10 lg:col-span-5 md:p-14">
            <div className="absolute inset-0 blueprint-grid" />
            <div className="relative">
              <p className="eyebrow flex items-center gap-3 text-amber">
                <span className="h-px w-8 bg-amber" />
                Get In Touch
              </p>
              <h2 className="font-display mt-5 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
                Let&apos;s Build
                <br />
                What&apos;s Next.
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
                For tenders, supply enquiries, or project partnerships —
                reach us directly.
              </p>

              <div className="mt-10 space-y-5">
                {companyInfo.phones.map((ph) => (
                  <a
                    key={ph}
                    href={`tel:${ph.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 text-sm text-white/85 hover:text-amber transition-colors"
                  >
                    <Phone size={16} className="text-amber" />
                    {ph}
                  </a>
                ))}
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 text-sm text-white/85 hover:text-amber transition-colors"
                >
                  <Mail size={16} className="text-amber" />
                  {companyInfo.email}
                </a>
                <div className="flex items-start gap-3 text-sm text-white/85">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-amber" />
                  {companyInfo.address}
                </div>
              </div>

              <div className="mt-10 hidden sm:flex gap-8 font-mono text-[0.65rem] text-white/35 tracking-wide">
                <span>23.7104° N</span>
                <span>90.4074° E</span>
              </div>

              <a
                href={`https://wa.me/${companyInfo.phones[0].replace(/[^\d]/g, "").replace(/^0/, "88")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-sm border border-chart-green/40 bg-chart-green/10 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-chart-green hover:bg-chart-green/20 transition-colors"
              >
                <MessageCircle size={14} />
                Chat on WhatsApp
              </a>

              <a
                href="/downloads/AHS-Enterprise-Company-Profile.pdf"
                download
                className="mt-3 inline-flex items-center gap-2 rounded-sm border border-white/25 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-white/85 hover:border-amber hover:text-amber transition-colors"
              >
                <FileDown size={14} />
                Download Company Profile
              </a>
            </div>
          </div>

          <div className="bg-white p-10 lg:col-span-7 md:p-14">
            <Reveal>
              <form className="grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={onSubmit} noValidate={false}>
                <label className="flex flex-col gap-2 sm:col-span-1">
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest text-ink-muted">Full Name</span>
                  <input name="name" type="text" required maxLength={120} autoComplete="name" placeholder="Your name" className="rounded-sm border border-ink/15 bg-fog px-4 py-3 text-sm text-ink outline-none focus:border-buoy transition-colors" />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-1">
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest text-ink-muted">Organisation</span>
                  <input name="organisation" type="text" maxLength={160} autoComplete="organization" placeholder="Company / authority" className="rounded-sm border border-ink/15 bg-fog px-4 py-3 text-sm text-ink outline-none focus:border-buoy transition-colors" />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest text-ink-muted">Email</span>
                  <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" className="rounded-sm border border-ink/15 bg-fog px-4 py-3 text-sm text-ink outline-none focus:border-buoy transition-colors" />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest text-ink-muted">Project / Enquiry Details</span>
                  <textarea name="message" rows={4} required minLength={10} maxLength={4000} placeholder="Tell us what you need..." className="resize-none rounded-sm border border-ink/15 bg-fog px-4 py-3 text-sm text-ink outline-none focus:border-buoy transition-colors" />
                </label>
                {/* honeypot: hidden from users, bots tend to fill it */}
                <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status.state === "sending"}
                    className="inline-flex w-fit items-center gap-2 rounded-sm bg-buoy px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-ink disabled:opacity-60"
                  >
                    {status.state === "sending" ? "Sending…" : "Send Enquiry"}
                    <Send size={14} />
                  </button>
                  <p
                    role="status"
                    aria-live="polite"
                    className={`mt-4 text-sm ${status.state === "error" ? "text-buoy" : "text-chart-green"}`}
                  >
                    {status.message}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>

        {/* Map */}
        <Reveal delay={0.15} className="mt-6 overflow-hidden rounded-sm border border-ink/10">
          <iframe
            title="AHS Enterprise office location — Rajnigandha Tower, Dhaka Cantonment"
            src="https://www.google.com/maps?q=Rajnigandha+Tower+Dhaka+Cantonment+Dhaka+Bangladesh&output=embed"
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[20%]"
          />
        </Reveal>
      </div>
    </section>
  );
}
