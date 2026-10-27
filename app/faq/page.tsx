import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { getSettings } from "@/lib/content";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about AHS Enterprise's licenses, enlistments, coverage area and how to submit a tender or supply enquiry.",
};

export const revalidate = 300;

export default async function FaqPage() {
  const { faqs, company: companyInfo } = await getSettings();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <Navbar />
      <main id="main" className="bg-paper">
        <PageHeader
          crumb="FAQ"
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Straight answers on our licenses, coverage area, and how to work with us."
        />

        <section className="py-20 md:py-24">
          <div className="container-x max-w-3xl">
            <Reveal className="divide-y divide-ink/10 rounded-sm border border-ink/10 bg-fog">
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
            </Reveal>

            <Reveal delay={0.1} className="mt-10 rounded-sm bg-ink p-8 text-center md:p-10">
              <p className="font-display text-xl font-bold uppercase text-white">
                Still have a question?
              </p>
              <p className="mt-2 text-sm text-white/60">
                {companyInfo.phones[0]} &middot; {companyInfo.email}
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-amber px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-ink hover:bg-white transition-colors"
              >
                Contact Us
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
