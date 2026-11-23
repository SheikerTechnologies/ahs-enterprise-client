"use client";

import { motion } from "framer-motion";
import {
  Award,
  FileBadge,
  Globe2,
  Landmark,
  Plane,
  ReceiptText,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealStagger, staggerItem } from "./Reveal";
import type { Credential } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  plane: Plane,
  zap: Zap,
  globe: Globe2,
  "file-badge": FileBadge,
  receipt: ReceiptText,
  landmark: Landmark,
};

/**
 * Certificate wall for the Clients page. Titles, issuers and scopes only —
 * never license numbers, TIN/BIN, validity dates or personal data.
 */
export function CertificateWall({ credentials }: { credentials: Credential[] }) {
  if (!credentials.length) return null;

  return (
    <section id="certificates" className="border-t border-ink/10 bg-paper py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-buoy">
            <span className="h-px w-8 bg-buoy" />
            Certificate Wall
          </p>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            Enlistments & Licenses
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            The registrations and enlistments that let us bid, supply and
            execute for government, defense and private clients.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((credential, i) => {
            const Icon = iconMap[credential.icon] ?? Award;
            return (
              <motion.div
                key={`${credential.title}-${i}`}
                variants={staggerItem}
                className="rounded-sm border border-ink/10 bg-fog p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-buoy/25 bg-buoy/5">
                    <Icon size={20} strokeWidth={1.7} className="text-buoy" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold uppercase leading-tight tracking-tight text-ink">
                      {credential.title}
                    </p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                      {credential.issuer}
                    </p>
                  </div>
                </div>
                {credential.scope && (
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                    {credential.scope}
                  </p>
                )}
              </motion.div>
            );
          })}
        </RevealStagger>

        <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-widest text-ink-muted">
          Documents available on request
        </p>
      </div>
    </section>
  );
}
