import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import type { FaqItem } from "@/lib/data";

export function Faq({
  faqs,
  phones,
}: {
  faqs: FaqItem[];
  phones: string[];
}) {
  return (
    <section id="faq" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-buoy">
              <span className="h-px w-8 bg-buoy" />
              Common Questions
            </p>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-sm text-sm text-ink-muted leading-relaxed">
              Straight answers on our licenses, coverage area, and how to work
              with us. Can&apos;t find yours? Call us — we answer directly.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-sm bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-buoy"
              >
                Ask a Question
                <ArrowUpRight size={14} />
              </Link>
              {phones[0] && (
                <a
                  href={`tel:${phones[0].replace(/\s+/g, "")}`}
                  className="font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-buoy"
                >
                  {phones[0]}
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="divide-y divide-ink/10 overflow-hidden rounded-sm border border-ink/10 bg-fog">
              {faqs.map((item) => (
                <details key={item.q} className="group px-6 py-5 md:px-8">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-ink md:text-lg">
                    {item.q}
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-buoy transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-[0.95rem]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
