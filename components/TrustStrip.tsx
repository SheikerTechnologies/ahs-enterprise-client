"use client";

import { Reveal, RevealStagger, staggerItem } from "./Reveal";

import { motion } from "framer-motion";
import { Landmark, BadgeCheck, ShieldCheck } from "lucide-react";

export function TrustStrip({
  bankingPartners,
  licenses,
  bankSolvency,
}: {
  bankingPartners: string[];
  licenses: string[];
  bankSolvency: { banks: string[]; note: string };
}) {
  return (
    <section className="relative bg-ink py-20 md:py-24">
      <div className="container-x grid grid-cols-1 gap-14 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-amber">
              <Landmark size={14} className="text-amber" />
              Banking Partners
            </p>
            <RevealStagger className="mt-6 flex flex-wrap gap-3">
              {bankingPartners.map((b) => (
                <motion.span
                  key={b}
                  variants={staggerItem}
                  className="rounded-sm border border-white/15 px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white/85"
                >
                  {b}
                </motion.span>
              ))}
            </RevealStagger>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex items-start gap-3 rounded-sm border border-chart-green/30 bg-chart-green/10 p-5">
            <ShieldCheck className="text-chart-green shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wide text-white">
                Financial Solvency Verified
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                Certified financially solvent with official reference
                letters on file from {bankSolvency.banks.join(" and ")}.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="eyebrow flex items-center gap-3 text-amber">
            <BadgeCheck size={14} className="text-amber" />
            Licenses &amp; Certifications
          </p>
          <RevealStagger className="mt-6 flex flex-col gap-2.5">
            {licenses.map((l) => (
              <motion.div
                key={l}
                variants={staggerItem}
                className="flex items-center gap-3 border-b border-white/10 pb-2.5 text-sm text-white/70"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-chart-green" />
                {l}
              </motion.div>
            ))}
          </RevealStagger>
        </Reveal>
      </div>
    </section>
  );
}
