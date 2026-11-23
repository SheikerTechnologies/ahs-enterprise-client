import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { About } from "@/components/About";
import { Reveal } from "@/components/Reveal";
import { companyInfo } from "@/lib/data";
import { getSettings } from "@/lib/content";
import { Download, FileText, Building2, Sun, HardHat, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: `About | ${companyInfo.shortName}`,
  description:
    "Message from the proprietor, our mission, vision and the values behind AHS Enterprise.",
  alternates: { canonical: "/about" },
};

const groupCompanies = [
  {
    name: "AHS Enterprise",
    role: "Contracting, Marine Supply & Indenting",
    desc: "1st Class Contractor, Importer, Exporter, Supplier & Indenting Agent — the group's founding company since 2021.",
    icon: HardHat,
    current: true,
    href: "/",
  },
  {
    name: "AHS Properties & Development Ltd.",
    role: "Real Estate Development",
    desc: "RJSC-registered, RAJUK-approved real estate developer building premium residential and commercial spaces across Dhaka.",
    icon: Building2,
    href: "https://ahspdl.com",
  },
  {
    name: "Sun Solaris Limited",
    role: "Renewable Solar Energy",
    desc: "EPC contractor and investor delivering solar power projects — CAPEX & OPEX models for businesses across Bangladesh.",
    icon: Sun,
    href: "https://sunsolaris.ltd",
  },
];

export const revalidate = 300;

export default async function AboutPage() {
  const { company, timeline, whyChooseUs, howWeWork } = await getSettings();
  return (
    <>
      <Navbar />
      <main id="main" className="bg-paper">
        <PageHeader
          crumb="About"
          path="/about"
          eyebrow="Who We Are"
          title="About AHS Enterprise"
          subtitle="A first-class contractor, importer, exporter, supplier and indenting agent trusted by Bangladesh's military and civil sectors alike."
        />
        <About company={company} />

        {/* Company timeline */}
        <section className="relative border-t border-ink/10 bg-paper py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid-dark opacity-60" />
          <div className="container-x relative">
            <Reveal className="max-w-2xl">
              <p className="eyebrow flex items-center gap-3 text-buoy">
                <span className="h-px w-8 bg-buoy" />
                Company Timeline
              </p>
              <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
                Milestones, Year by Year
              </h2>
              <p className="mt-5 text-ink-muted leading-relaxed">
                A working record of what we have delivered, drawn from the
                projects in our portfolio.
              </p>
            </Reveal>

            <div className="mt-12 border-l border-ink/15 pl-6 md:pl-10">
              {timeline.map((entry, i) => (
                <Reveal
                  key={`${entry.year}-${i}`}
                  delay={i * 0.05}
                  className="relative pb-10 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="absolute -left-[1.65rem] top-2 h-2.5 w-2.5 rounded-full bg-buoy ring-4 ring-paper md:-left-[2.9rem]"
                  />
                  <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
                    {entry.year}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {entry.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-buoy"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="border-t border-ink/10 bg-fog py-20 md:py-24">
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <p className="eyebrow flex items-center gap-3 text-buoy">
                <span className="h-px w-8 bg-buoy" />
                Why Choose Us
              </p>
              <h2 className="font-display mt-5 text-3xl sm:text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
                Built for Difficult Sites and Tight Timelines
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {whyChooseUs.map((point, i) => (
                <div key={point.title} className="rounded-sm border border-ink/10 bg-white p-6">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-buoy">
                    0{i + 1}
                  </p>
                  <p className="font-display mt-2 text-lg font-bold uppercase tracking-tight text-ink">
                    {point.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {point.detail}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* How we work */}
        <section className="relative border-t border-ink/10 bg-ink py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid" />
          <div className="container-x relative">
            <Reveal className="max-w-2xl">
              <p className="eyebrow flex items-center gap-3 text-amber">
                <span className="h-px w-8 bg-amber" />
                How We Work
              </p>
              <h2 className="font-display mt-5 text-3xl sm:text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
                From Enquiry to Handover
              </h2>
              <p className="mt-5 text-white/60 leading-relaxed">
                One accountable team follows every step of the engagement.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {howWeWork.map((step, i) => (
                <Reveal
                  key={`${step.step}-${i}`}
                  delay={i * 0.05}
                  className="rounded-sm border border-white/10 bg-ink-2 p-5"
                >
                  <p className="font-mono text-xs tracking-widest text-amber">
                    {step.step}
                  </p>
                  <p className="font-display mt-3 text-base font-bold uppercase tracking-tight text-white">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {step.detail}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Part of AHS Group */}
        <section className="border-t border-ink/10 bg-ink py-20 md:py-24">
          <div className="container-x">
            <p className="eyebrow flex items-center gap-3 text-amber">
              <span className="h-px w-8 bg-amber" />
              One Group, Three Disciplines
            </p>
            <h2 className="font-display mt-5 text-3xl sm:text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
              Part of the AHS Group
            </h2>
            <p className="mt-4 max-w-xl text-white/60 leading-relaxed">
              AHS Enterprise sits alongside two sister concerns under the
              same leadership — together covering contracting, real estate
              and renewable energy.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {groupCompanies.map((c) => {
                const Icon = c.icon;
                const content = (
                  <>
                    <div className="flex items-start justify-between">
                      <Icon className="text-amber" size={26} strokeWidth={1.6} />
                      {!c.current && (
                        <ArrowUpRight
                          size={16}
                          className="text-white/30 group-hover:text-amber transition-colors"
                        />
                      )}
                    </div>
                    <p className="font-display mt-5 text-lg font-bold uppercase tracking-tight text-white">
                      {c.name}
                    </p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-amber">
                      {c.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {c.desc}
                    </p>
                    {c.current && (
                      <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-white/40">
                        You are here
                      </p>
                    )}
                  </>
                );

                return c.current ? (
                  <div
                    key={c.name}
                    className="rounded-sm border border-amber/30 bg-amber/5 p-7"
                  >
                    {content}
                  </div>
                ) : (
                  <a
                    key={c.name}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-sm border border-white/10 bg-ink-2 p-7 hover:border-amber/40 transition-colors"
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-fog py-14">
          <div className="container-x flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-ink">
                <FileText className="text-amber" size={22} />
              </div>
              <div>
                <p className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                  Download Our Company Profile
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Services, licenses, selected projects and contact details in one PDF.
                </p>
              </div>
            </div>
            <a
              href="/downloads/AHS-Enterprise-Company-Profile.pdf"
              download
              className="inline-flex items-center gap-2 rounded-sm bg-buoy px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:bg-ink transition-colors shrink-0"
            >
              <Download size={15} />
              Download PDF
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
