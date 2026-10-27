"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import type { ClientItem } from "@/lib/data";

export function Clients({ clients }: { clients: ClientItem[] }) {
  return (
    <section id="clients" className="relative bg-fog py-24 md:py-32 border-t border-ink/10">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-buoy">
            <span className="h-px w-8 bg-buoy" />
            Institutional Trust
          </p>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            Our Clients
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            A distinguished portfolio of government bodies, defense sectors,
            engineering authorities and port authorities — long-term
            partnerships built on consistent quality and on-time delivery.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 overflow-hidden rounded-sm border border-ink/10 bg-white p-6 md:p-10">
          <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl">
            <Image
              src="/images/clients/clients-grid.jpg"
              alt="Government and institutional client seals: BIWTA, Bangladesh Navy, DGDP, Dhaka Cantonment Board, PWD, Mongla Port Authority, Chittagong Port Authority, Payra Port Authority, Bangladesh Coast Guard, DPHE, RAJUK, BADC, HED, Government of Bangladesh"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {clients.map((c) => (
            <span
              key={c.name}
              title={c.full}
              className="font-mono text-xs uppercase tracking-widest text-ink-muted"
            >
              {c.name}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
