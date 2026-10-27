"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Stat } from "@/lib/data";

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-ink text-white pt-28 pb-16 md:pt-40 md:pb-24"
    >
      <div className="absolute inset-0 blueprint-grid" />
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-steel-light/20 blur-[110px]" />
      <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-amber/10 blur-[140px]" />

      <div className="container-x relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-3 text-amber"
          >
            <span className="h-px w-8 bg-amber" />
            M/S A H S Enterprise — Est. 2021
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mt-5 text-[3.1rem] leading-[0.92] font-black uppercase tracking-tight sm:text-7xl md:text-8xl"
          >
            We Build
            <br />
            <span className="text-amber">Tomorrow</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 max-w-lg text-base leading-relaxed text-white/70 md:text-lg"
          >
            A 1st Class Contractor, Importer, Exporter, Supplier &amp;
            Indenting firm — trusted with civil works, marine &amp; submarine
            spares, riverbank protection and dredging by Bangladesh&apos;s
            defense and civil authorities since 2021.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-sm bg-amber px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-ink hover:bg-white transition-colors"
            >
              View Our Projects
              <ArrowUpRight size={15} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:border-amber hover:text-amber transition-colors"
            >
              Our Story
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-extrabold text-amber md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[0.7rem] uppercase tracking-wide text-white/55 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-full border border-amber/40" />
            <div className="absolute inset-3 rounded-full border border-white/15" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber" />
              <span className="absolute left-1/2 bottom-0 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/60" />
            </motion.div>
            <div className="absolute inset-8 overflow-hidden rounded-full ring-4 ring-ink shadow-2xl">
              <Image
                src="/images/hero-submarine.jpg"
                alt="Submarine machinery spares supplied by AHS Enterprise for BNS Joyjatra, Bangladesh Navy"
                fill
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-ink border border-amber/40 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-amber shadow-lg">
              Proud parts supplier — BNS Joyjatra
            </div>
          </motion.div>

          <div className="mt-10 hidden sm:flex justify-center gap-8 font-mono text-[0.68rem] text-white/40 tracking-wide">
            <span>23.7104° N</span>
            <span>90.4074° E</span>
            <span>DHAKA CANTONMENT, BD</span>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
      >
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}
