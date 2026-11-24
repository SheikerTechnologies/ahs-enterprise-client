import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { CornerMarks } from "./CornerMarks";
import { ProprietorMessageContent } from "./ProprietorMessage";
import type { SiteSettings } from "@/lib/data";

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export function About({ settings }: { settings: SiteSettings }) {
  const { company, proprietorMessage: message } = settings;

  return (
    <section id="about" className="relative bg-paper py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dark opacity-60" aria-hidden />
      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-buoy flex items-center gap-3">
            <span className="h-px w-8 bg-buoy" />
            Message from the Proprietor
          </p>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink text-balance">
            {message.heading}
          </h2>
          {message.subheading && (
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
              {message.subheading}
            </p>
          )}
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            {message.photo && (
              <div className="relative overflow-hidden rounded-sm border border-ink/10 bg-ink">
                <CornerMarks className="text-amber/70 z-10" />
                <div className="relative aspect-[4/5]">
                  <Image
                    src={message.photo}
                    alt={company.proprietor}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 380px"
                  />
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ink">
                {company.proprietor}
              </p>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-buoy">
                Proprietor, M/S A H S Enterprise
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                CEO, AHS Properties &amp; Development Ltd. - Managing Director,
                Sun Solaris Ltd.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <ProprietorMessageContent
              paragraphs={message.paragraphs}
              closing={message.closing}
              bengaliHeading={message.bengaliHeading}
              bengaliParagraphs={message.bengaliParagraphs}
            />

            <div className="mt-10 flex flex-col gap-2 border-t border-ink/10 pt-8">
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-buoy"
              >
                <Mail size={15} className="shrink-0 text-buoy" aria-hidden />
                {company.email}
              </a>
              {company.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="inline-flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-buoy"
                >
                  <Phone size={15} className="shrink-0 text-buoy" aria-hidden />
                  {phone}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
