"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { Reveal, RevealStagger, staggerItem } from "./Reveal";
import { StatusStamp } from "./StatusStamp";
import type { Project } from "@/lib/data";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-3 text-buoy">
              <span className="h-px w-8 bg-buoy" />
              Project Gallery
            </p>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
              Work on the Ground
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink-muted leading-relaxed">
            Every plate below is a real engagement — open one to
            see the client, location, duration and scope of work in full.
          </p>
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <motion.div key={p.slug} variants={staggerItem}>
              <Link
                href={`/projects/${p.slug}`}
                className="group relative block overflow-hidden rounded-sm border border-ink/10 bg-ink shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <StatusStamp
                    status={p.status}
                    className="absolute right-3 top-3 bg-ink/80 backdrop-blur-sm"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-ink/80 px-2 py-1 font-mono text-[0.62rem] tracking-widest text-amber backdrop-blur-sm">
                    {p.code}
                  </span>
                </div>

                <div className="p-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-amber">
                    {p.client}
                  </p>
                  <h3 className="font-display mt-1.5 text-lg font-bold uppercase leading-tight tracking-tight text-white">
                    {p.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                    <div className="flex items-center gap-3 text-[0.7rem] text-white/50">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {p.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {p.year}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-amber transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
