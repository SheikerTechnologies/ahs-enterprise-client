"use client";

import {
  HardHat,
  Anchor,
  Waves,
  ShipWheel,
  Wrench,
  Sun,
  Globe,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Reveal, RevealStagger, staggerItem } from "./Reveal";
import type { Service } from "@/lib/data";
import { motion } from "framer-motion";

const icons = [HardHat, Anchor, Waves, ShipWheel, Wrench, Sun, Globe, Zap];

export function Services({
  services,
  defenseSupplyGroups,
}: {
  services: Service[];
  defenseSupplyGroups: string[];
}) {
  return (
    <section id="services" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid" />
      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-amber">
            <span className="h-px w-8 bg-amber" />
            What We Do
          </p>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
            Our Services
          </h2>
          <p className="mt-5 text-white/65 leading-relaxed">
            A comprehensive range of services in construction, power sector,
            engineering support, and industrial supply — from government
            tenders and civil works to high-quality marine machinery spares,
            delivered with quality control, cost-efficiency and timely
            execution.
          </p>
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={s.code}
                variants={staggerItem}
                className="group relative bg-ink p-7 transition-colors hover:bg-ink-2 md:p-8"
              >
                <div className="flex items-start justify-between">
                  <Icon className="text-amber" size={26} strokeWidth={1.6} />
                  <span className="font-mono text-[0.7rem] text-white/30">
                    {s.code}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-bold uppercase tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  {s.short}
                </p>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/55">
                  {s.description}
                </p>
              </motion.div>
            );
          })}
        </RevealStagger>

        {/* DGDP enlisted supply categories */}
        <Reveal delay={0.15} className="mt-6 rounded-sm border border-white/10 bg-ink-2 p-8 md:p-10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-amber shrink-0" size={22} />
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-tight text-white">
                DGDP-Enlisted Supply Categories
              </p>
              <p className="mt-1 text-sm text-white/55">
                Registered with the Directorate General of Defence Purchase
                as a local-currency supplier across these categories.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {defenseSupplyGroups.map((g) => (
              <span
                key={g}
                className="rounded-sm border border-white/15 px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-wide text-white/75"
              >
                {g}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
