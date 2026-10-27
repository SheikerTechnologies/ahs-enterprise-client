"use client";

import { Reveal, RevealStagger, staggerItem } from "./Reveal";
import type { CapabilityItem } from "@/lib/data";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, MapPinned, Gauge, CircleCheck } from "lucide-react";

const capIcons = [Gauge, ShieldCheck, MapPinned, Zap];

export function Capability({
  capability,
  executionStrengths,
  riskHandling,
}: {
  capability: CapabilityItem[];
  executionStrengths: string[];
  riskHandling: string[];
}) {
  return (
    <section
      id="capability"
      className="relative bg-fog py-24 md:py-32 border-y border-ink/10"
    >
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-buoy">
            <span className="h-px w-8 bg-buoy" />
            Capability Matrix
          </p>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            What Sets Us Apart
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capability.map((c, i) => {
            const Icon = capIcons[i % capIcons.length];
            return (
              <motion.div
                key={c.title}
                variants={staggerItem}
                className="rounded-sm border border-ink/10 bg-paper p-6 shadow-sm"
              >
                <Icon className="text-buoy" size={24} strokeWidth={1.6} />
                <p className="font-display mt-5 text-lg font-bold uppercase tracking-tight text-ink">
                  {c.title}
                </p>
                <p className="mt-1.5 font-mono text-xs leading-relaxed text-ink-muted">
                  {c.evidence}
                </p>
              </motion.div>
            );
          })}
        </RevealStagger>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="h-full rounded-sm bg-ink p-8">
              <p className="font-display text-lg font-bold uppercase tracking-tight text-white">
                Execution Strength
              </p>
              <ul className="mt-5 space-y-3">
                {executionStrengths.map((e) => (
                  <li
                    key={e}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <CircleCheck className="text-amber shrink-0" size={17} />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="h-full rounded-sm bg-steel p-8">
              <p className="font-display text-lg font-bold uppercase tracking-tight text-white">
                Risk Handling
              </p>
              <p className="mt-1 text-xs text-white/50">
                Experience in handling —
              </p>
              <ul className="mt-4 space-y-3">
                {riskHandling.map((e) => (
                  <li
                    key={e}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <CircleCheck className="text-amber shrink-0" size={17} />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
