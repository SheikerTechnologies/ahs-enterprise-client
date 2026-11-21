"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import type { ClientItem } from "@/lib/data";

function ClientCard({ client }: { client: ClientItem }) {
  const initials = client.name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 4);

  return (
    <div className="marquee-3d__card" title={client.full}>
      {client.image ? (
        <Image
          src={client.image}
          alt={`${client.full} emblem`}
          width={120}
          height={120}
          sizes="120px"
          className="h-16 w-16 object-contain"
        />
      ) : (
        <span
          aria-hidden
          className="font-display flex h-16 w-16 items-center justify-center rounded-full border border-ink/15 bg-fog text-xl font-extrabold tracking-tight text-ink-muted"
        >
          {initials}
        </span>
      )}
      <span className="font-mono text-[0.62rem] uppercase leading-tight tracking-[0.16em] text-ink-muted text-center">
        {client.name}
      </span>
    </div>
  );
}

function Row({
  clients,
  variant,
}: {
  clients: ClientItem[];
  variant: "a" | "b";
}) {
  return (
    <div className={`marquee-3d__row marquee-3d__row--${variant}`}>
      <div className="marquee-3d__track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="marquee-3d__group"
            aria-hidden={copy === 1}
          >
            {clients.map((client) => (
              <ClientCard key={`${copy}-${client.name}`} client={client} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Clients({ clients }: { clients: ClientItem[] }) {
  const split = Math.ceil(clients.length / 3);
  const topRow = clients.slice(0, split);
  const middleRow = clients.slice(split, split * 2);
  const bottomRow = clients.slice(split * 2);

  return (
    <section
      id="clients"
      className="relative bg-fog py-24 md:py-32 border-t border-ink/10"
    >
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
      </div>

      <Reveal delay={0.15} className="mt-14">
        <div className="marquee-3d">
          <Row clients={topRow} variant="a" />
          <Row clients={middleRow} variant="b" />
          <Row clients={bottomRow} variant="a" />
        </div>
      </Reveal>
    </section>
  );
}
