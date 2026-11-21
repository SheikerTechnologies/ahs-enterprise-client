"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, X, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { projectToMap, snapInside } from "@/lib/mapProjection";
import {
  bangladeshOutlinePaths,
  BD_MAP_WIDTH,
  BD_MAP_HEIGHT,
} from "@/lib/bangladeshOutline";

type Cluster = { key: string; x: number; y: number; place: string; slugs: string[] };

export function BangladeshMap({ projects }: { projects: Project[] }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const clusters = useMemo(() => {
    const map = new Map<string, Cluster>();
    for (const p of projects) {
      if (!p.geo) continue;
      const raw = projectToMap(p.geo.lat, p.geo.lng);
      const key = `${raw.x},${raw.y}`;
      const existing = map.get(key);
      if (existing) existing.slugs.push(p.slug);
      else {
        // keep every pin fully inside the country outline
        const { x, y } = snapInside(raw.x, raw.y);
        map.set(key, { key, x, y, place: p.geo.place, slugs: [p.slug] });
      }
    }
    return Array.from(map.values());
  }, [projects]);

  const active = clusters.find((c) => c.key === activeKey) ?? null;
  const activeProjects = active
    ? projects.filter((p) => active.slugs.includes(p.slug))
    : [];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
      <div className="relative mx-auto w-full max-w-[380px] overflow-hidden rounded-sm border border-white/10 bg-ink-2">
        <div className="absolute inset-0 blueprint-grid" />
        <svg
          viewBox={`0 0 ${BD_MAP_WIDTH} ${BD_MAP_HEIGHT}`}
          className="relative w-full"
          role="group"
          aria-label="Map of Bangladesh with AHS Enterprise project locations"
        >
          {bangladeshOutlinePaths.map((d, i) => (
            <path key={i} d={d} className="fill-steel stroke-amber/60" strokeWidth={1} />
          ))}

          {clusters.map((c) => {
            const isActive = c.key === activeKey;
            const count = c.slugs.length;
            const toggle = () => setActiveKey(isActive ? null : c.key);
            return (
              <g
                key={c.key}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${c.place}: ${count} project${count > 1 ? "s" : ""}`}
                onClick={toggle}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle();
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible>circle:last-of-type]:stroke-white"
              >
                {/* invisible 24px-radius hit area for touch */}
                <circle cx={c.x} cy={c.y} r={14} fill="transparent" />
                {isActive && (
                  <circle cx={c.x} cy={c.y} r={11} className="fill-amber/25 motion-safe:animate-ping" />
                )}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={count > 1 ? 7 : 5.5}
                  className={isActive ? "fill-amber stroke-ink" : "fill-buoy stroke-ink hover:fill-amber transition-colors"}
                  strokeWidth={1.4}
                />
                {count > 1 && (
                  <text
                    x={c.x}
                    y={c.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-white font-mono font-bold pointer-events-none select-none"
                    style={{ fontSize: 7 }}
                  >
                    {count}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="relative border-t border-white/10 bg-ink px-4 py-3">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-white/50">
            <MapPin size={12} className="text-amber" />
            {projects.length} projects · {clusters.length} locations
          </p>
        </div>
      </div>

      <div className="rounded-sm border border-white/10 bg-ink-2 p-6 md:p-8" aria-live="polite">
        {!active && (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
            <MapPin className="text-amber/50" size={28} />
            <p className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-white">
              Select a pin to explore
            </p>
            <p className="mt-2 max-w-xs text-sm text-white/50">
              Each marker is one or more engagements. Tap or press Enter on a pin to see the projects there.
            </p>
          </div>
        )}

        {active && (
          <div>
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-amber">
                {active.place} · {activeProjects.length} project{activeProjects.length > 1 ? "s" : ""}
              </p>
              <button
                onClick={() => setActiveKey(null)}
                aria-label="Close location details"
                className="p-1 text-white/40 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-4 divide-y divide-white/10">
              {activeProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-white/40">
                      {p.code} · {p.location}
                    </p>
                    <p className="font-display mt-1 text-base font-bold uppercase tracking-tight text-white group-hover:text-amber transition-colors">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs text-white/50">{p.client} · {p.year}</p>
                  </div>
                  <ArrowUpRight size={16} className="shrink-0 text-white/30 group-hover:text-amber transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
