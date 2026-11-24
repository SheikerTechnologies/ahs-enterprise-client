"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import type { CompanyInfo, Office } from "@/lib/data";
import { Phone, Mail, MapPin, ArrowUpRight, Send, MessageCircle, FileDown, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";

type Status = { state: "idle" | "sending" | "success" | "error"; message?: string };

export function Contact({ company: companyInfo, offices = [] }: { company: CompanyInfo; offices?: Office[] }) {
  // The first office is the primary address; fall back to company.address for
  // sites whose settings document predates the offices list.
  const officeList: Office[] = offices.length
    ? offices
    : [{ label: "Head Office", address: companyInfo.address }];
  const [activeOffice, setActiveOffice] = useState(0);
  const activeIndex = Math.min(activeOffice, officeList.length - 1);
  const active = officeList[activeIndex];
  const primaryOffice = officeList[0];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const isSending = status.state === "sending";
  const isSuccess = status.state === "success";
  const isError = status.state === "error";

  function closePopup() {
    if (!isSending) setStatus({ state: "idle" });
  }

  function onTabKeyDown(e: ReactKeyboardEvent<HTMLButtonElement>, i: number) {
    const last = officeList.length - 1;
    let next = i;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActiveOffice(next);
    tabRefs.current[next]?.focus();
  }

  useEffect(() => {
    if (!isSuccess && !isError) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setStatus({ state: "idle" });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSuccess, isError]);

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
                  <span>
                    <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-white/40">
                      {primaryOffice.label}
                    </span>
                    {primaryOffice.address}
                  </span>
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
                </div>
              </form>
            </Reveal>
          </div>
        </div>

        {/* Offices */}
        <Reveal delay={0.1} className="mt-10">
          <p className="eyebrow flex items-center gap-3 text-ink-muted">
            <span className="h-px w-8 bg-amber" />
            Our Offices
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {officeList.map((office) => (
              <div
                key={office.label}
                className="rounded-sm border border-ink/10 bg-white p-6"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-buoy">
                  {office.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {office.address}
                </p>
                {office.phone && (
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, "")}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm text-ink hover:text-buoy transition-colors"
                  >
                    <Phone size={14} className="text-buoy" />
                    {office.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Map — follows the selected office */}
        <Reveal delay={0.15} className="mt-6 overflow-hidden rounded-sm border border-ink/10">
          <div
            role="tablist"
            aria-label="Office map"
            className="flex flex-wrap gap-2 border-b border-ink/10 bg-white p-3"
          >
            {officeList.map((office, i) => (
              <button
                key={office.label}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`office-tab-${i}`}
                aria-selected={i === activeIndex}
                aria-controls="office-map-panel"
                tabIndex={i === activeIndex ? 0 : -1}
                onClick={() => setActiveOffice(i)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`rounded-sm px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest transition-colors ${
                  i === activeIndex
                    ? "bg-ink text-white"
                    : "text-ink-muted hover:bg-fog hover:text-ink"
                }`}
              >
                {office.label}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id="office-map-panel"
            aria-labelledby={`office-tab-${activeIndex}`}
          >
            <iframe
              key={activeIndex}
              title={`${active.label} location map — ${active.address}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(active.mapQuery || active.address)}&output=embed`}
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[20%]"
            />
          </div>
        </Reveal>
      </div>

      {/* Enquiry status pop-up */}
      <AnimatePresence>
        {status.state !== "idle" && (
          <motion.div
            key="enquiry-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-5 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="enquiry-popup-title"
              aria-describedby="enquiry-popup-message"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative w-full max-w-md overflow-hidden rounded-sm border border-ink/10 bg-paper p-8 shadow-[0_40px_80px_-40px_rgba(10,37,64,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 ${
                  isSending ? "bg-amber" : isSuccess ? "bg-chart-green" : "bg-buoy"
                }`}
              />
              {!isSending && (
                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close"
                  className="absolute right-4 top-4 rounded-sm p-1.5 text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <X size={16} />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={status.state}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center pt-2 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={
                      isError
                        ? { scale: 1, opacity: 1, x: [0, -6, 6, -4, 4, 0] }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={
                      isError
                        ? { duration: 0.5, ease: "easeInOut" }
                        : { type: "spring", stiffness: 300, damping: 18 }
                    }
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${
                      isSending
                        ? "bg-amber/10 text-amber"
                        : isSuccess
                          ? "bg-chart-green/10 text-chart-green"
                          : "bg-buoy/10 text-buoy"
                    }`}
                  >
                    {isSending && <Loader2 size={30} className="animate-spin" />}
                    {isSuccess && <CheckCircle2 size={30} />}
                    {isError && <AlertCircle size={30} />}
                  </motion.div>

                  <p className="eyebrow mt-5 text-ink-muted">Enquiry Status</p>
                  <h3
                    id="enquiry-popup-title"
                    className="font-display mt-2 text-2xl font-extrabold uppercase tracking-tight text-ink"
                  >
                    {isSending ? "Sending Enquiry" : isSuccess ? "Enquiry Sent" : "Enquiry Failed"}
                  </h3>
                  <p id="enquiry-popup-message" className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {isSending
                      ? "Please wait while we deliver your message."
                      : status.message}
                  </p>

                  {!isSending && (
                    <button
                      type="button"
                      onClick={closePopup}
                      className={`mt-6 inline-flex items-center gap-2 rounded-sm px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-colors ${
                        isSuccess ? "bg-chart-green hover:bg-ink" : "bg-buoy hover:bg-ink"
                      }`}
                    >
                      {isSuccess ? "Done" : "Try Again"}
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
