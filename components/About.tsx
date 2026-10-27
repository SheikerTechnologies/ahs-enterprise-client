"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { CornerMarks } from "./CornerMarks";
import type { CompanyInfo } from "@/lib/data";
import { Quote } from "lucide-react";

export function About({ company }: { company: CompanyInfo }) {
  return (
    <section id="about" className="relative bg-paper py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dark opacity-60" />
      <div className="container-x relative grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-buoy flex items-center gap-3">
              <span className="h-px w-8 bg-buoy" />
              Message from the Proprietor
            </p>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
              Built on Trust,
              <br />
              Delivered with
              <br />
              <span className="text-buoy">Precision.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="relative mt-10 max-w-md">
            <div className="relative overflow-hidden rounded-sm border border-ink/10 bg-ink">
              <CornerMarks className="text-amber/70 z-10" />
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/gallery/tower-1.jpg"
                  alt="AHS Enterprise ongoing residential development at Jolshiri Abashon"
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-amber">
                  Est. 2021 — Dhaka Cantonment
                </p>
                <p className="mt-1 font-display text-xl font-bold uppercase text-white">
                  {company.name}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <Quote className="text-buoy/30" size={52} strokeWidth={1.5} />
            <div className="mt-4 space-y-5 text-[0.98rem] leading-relaxed text-ink-muted md:text-[1.05rem]">
              <p>
                With a profound sense of gratitude, I welcome you to A H S
                Enterprise. Our journey began with a vision —{" "}
                <span className="font-semibold text-ink">
                  &ldquo;We Build Tomorrow&rdquo;
                </span>{" "}
                — to establish a benchmark of unyielding reliability,
                top-tier quality, and strategic innovation in Bangladesh&apos;s
                most vital sectors.
              </p>
              <p>
                Over the years, through multiple ventures, we have had the
                distinct honor of serving as a trusted partner to both the
                military and civil sectors of our nation — from executing
                high-stakes strategic projects for the Bangladesh Armed
                Forces through the DGDP, to delivering submarine machinery
                spares of{" "}
                <span className="font-semibold text-ink">BNS Joyjatra</span>{" "}
                for the Bangladesh Navy. Our deep-rooted enlistments with
                premier national authorities — Dhaka Cantonment Board,
                BIWTA, PWD, HED, CAAB, MES, BADC, RAJUK, DPHE, CPA, PPA —
                reflect a legacy built entirely on trust and flawless
                execution.
              </p>
              <p>
                We bring the same military-grade precision, absolute
                faithfulness, and uncompromising quality that defined our
                past successes straight into the property development
                sector — building environments where modern living aligns
                with strategic foresight.
              </p>
            </div>

            <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-ink/10 pt-8">
              {[
                {
                  title: "Quality that endures",
                  desc: "Building with materials and methods made to last.",
                },
                {
                  title: "Transparency that builds trust",
                  desc: "Operating openly with every client and authority.",
                },
                {
                  title: "Sensitivity to community",
                  desc: "Developing with the people we serve in mind.",
                },
              ].map((v, i) => (
                <div key={v.title} className="relative pl-4">
                  <span className="absolute left-0 top-1 font-mono text-xs text-buoy">
                    0{i + 1}
                  </span>
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                    {v.title}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted leading-snug">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-ink/10 pt-8">
              <div className="h-12 w-12 shrink-0 rounded-full bg-buoy/10 flex items-center justify-center font-display text-lg font-bold text-buoy">
                MS
              </div>
              <div>
                <p className="font-display text-base font-bold text-ink">
                  {company.proprietor}
                </p>
                <p className="text-xs uppercase tracking-wide text-ink-muted">
                  {company.proprietorTitle}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
