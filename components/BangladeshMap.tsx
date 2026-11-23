"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Maximize2, MapPin, Minus, Plus, X } from "lucide-react";
import type { Project } from "@/lib/data";
import { bdDivisions } from "@/lib/bangladeshDivisions";
import { bangladeshOutlinePaths } from "@/lib/bangladeshOutline";
import { divisionIdAt, projectToMap, snapInside } from "@/lib/mapProjection";
import {
  FULL_VIEW,
  MAP_H,
  MAP_W,
  centerOn,
  fitBox,
  lerpView,
  panBy,
  zoomAt,
  zoomOf,
  type View,
} from "@/lib/mapView";

type Cluster = {
  key: string;
  x: number;
  y: number;
  place: string;
  divisionId: string;
  slugs: string[];
};

const DETAIL_ZOOM = 3; // from here on every project gets its own marker
const LABEL_ZOOM = 1.6; // from here on place names appear

const fills = ["#2c5c86", "#3a7ca5", "#1f4d78", "#4a6fa5", "#2a6f97", "#35608d", "#3c7a89", "#27547e"];

export function BangladeshMap({ projects }: { projects: Project[] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const viewRef = useRef<View>(FULL_VIEW);
  const raf = useRef(0);
  const dragged = useRef(false);

  const [view, setViewState] = useState<View>(FULL_VIEW);
  const [boxW, setBoxW] = useState(380);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeDivision, setActiveDivision] = useState<string | null>(null);

  const k = zoomOf(view);
  const pxPerUnit = (boxW / MAP_W) * k;
  /** a length in screen pixels, expressed in map units at the current zoom */
  const u = (px: number) => px / pxPerUnit;

  const setView = useCallback((v: View) => {
    viewRef.current = v;
    setViewState(v);
  }, []);

  const animateTo = useCallback(
    (target: View, ms = 340) => {
      cancelAnimationFrame(raf.current);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setView(target);
      const from = viewRef.current;
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / ms);
        setView(lerpView(from, target, 1 - Math.pow(1 - t, 3)));
        if (t < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    },
    [setView]
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBoxW(el.clientWidth || 380));
    ro.observe(el);
    setBoxW(el.clientWidth || 380);
    return () => ro.disconnect();
  }, []);

  // ---- data ---------------------------------------------------------------

  const clusters = useMemo(() => {
    const map = new Map<string, Cluster>();
    for (const p of projects) {
      if (!p.geo) continue;
      const raw = projectToMap(p.geo.lat, p.geo.lng);
      const key = `${raw.x},${raw.y}`;
      const existing = map.get(key);
      if (existing) existing.slugs.push(p.slug);
      else {
        const { x, y } = snapInside(raw.x, raw.y);
        map.set(key, { key, x, y, place: p.geo.place, divisionId: divisionIdAt(raw.x, raw.y), slugs: [p.slug] });
      }
    }
    return Array.from(map.values());
  }, [projects]);

  const bySlug = useMemo(() => new Map(projects.map((p) => [p.slug, p])), [projects]);

  const divisionStats = useMemo(() => {
    const stats = new Map<string, { slugs: string[] }>();
    for (const dv of bdDivisions) stats.set(dv.id, { slugs: [] });
    for (const c of clusters) stats.get(c.divisionId)?.slugs.push(...c.slugs);
    return stats;
  }, [clusters]);

  // ---- place labels: greedy placement so names never overlap ------------------

  const labels = useMemo(() => {
    const out = new Map<string, { x: number; y: number; anchor: "start" | "end" }>();
    if (k < LABEL_ZOOM) return out;
    const fs = u(11);
    const placed: { x0: number; y0: number; x1: number; y1: number }[] = [];
    const hits = (a: { x0: number; y0: number; x1: number; y1: number }) =>
      placed.some((b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0);
    // pins first, so a label never sits on top of another pin
    for (const c of clusters) placed.push({ x0: c.x - u(9), y0: c.y - u(9), x1: c.x + u(9), y1: c.y + u(9) });
    const order = [...clusters].sort((a, b) => b.slugs.length - a.slugs.length);
    for (const c of order) {
      const w = c.place.length * fs * 0.58;
      const gap = u(k >= DETAIL_ZOOM ? 26 + c.slugs.length * 4 : 11);
      const tries: { x: number; y: number; anchor: "start" | "end" }[] = [
        { x: c.x + gap, y: c.y, anchor: "start" },
        { x: c.x - gap, y: c.y, anchor: "end" },
        { x: c.x, y: c.y + gap + fs, anchor: "start" },
        { x: c.x, y: c.y - gap, anchor: "start" },
      ];
      for (const t of tries) {
        const x0 = t.anchor === "start" ? t.x : t.x - w;
        const box = { x0, y0: t.y - fs, x1: x0 + w, y1: t.y + fs * 0.35 };
        if (!hits(box)) {
          placed.push(box);
          out.set(c.key, t);
          break;
        }
      }
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clusters, Math.round(k * 20), boxW]);

  // ---- interaction ----------------------------------------------------------

  const unitAt = (clientX: number, clientY: number, v: View) => {
    const r = svgRef.current!.getBoundingClientRect();
    return { x: v.x + ((clientX - r.left) / r.width) * v.w, y: v.y + ((clientY - r.top) / r.height) * v.h };
  };

  const zoomBy = (factor: number) => {
    const v = viewRef.current;
    animateTo(zoomAt(v, factor, v.x + v.w / 2, v.y + v.h / 2), 260);
  };

  const reset = () => {
    setActiveDivision(null);
    setActiveKey(null);
    setActiveSlug(null);
    animateTo(FULL_VIEW);
  };

  // Ctrl / ⌘ + scroll zooms (plain scroll keeps scrolling the page)
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      cancelAnimationFrame(raf.current);
      const v = viewRef.current;
      const p = unitAt(e.clientX, e.clientY, v);
      setView(zoomAt(v, Math.exp(-e.deltaY * 0.0025), p.x, p.y));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setView]);

  // drag to pan, two fingers to pinch
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ view: View; pan?: { x: number; y: number }; pinch?: { dist: number; mid: { x: number; y: number } } } | null>(null);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    cancelAnimationFrame(raf.current);
    dragged.current = false;
    const pts = [...pointers.current.values()];
    if (pts.length === 2) {
      const [a, b] = pts;
      gesture.current = {
        view: viewRef.current,
        pinch: { dist: Math.hypot(a.x - b.x, a.y - b.y), mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } },
      };
    } else if (pts.length === 1) {
      gesture.current = { view: viewRef.current, pan: { x: e.clientX, y: e.clientY } };
    }

    const move = (ev: PointerEvent) => {
      if (!pointers.current.has(ev.pointerId)) return;
      pointers.current.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      const g = gesture.current;
      if (!g) return;
      const rect = svgRef.current!.getBoundingClientRect();
      const now = [...pointers.current.values()];
      if (g.pinch && now.length >= 2) {
        const [a, b] = now;
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const anchor = unitAt(g.pinch.mid.x, g.pinch.mid.y, g.view);
        const zoomed = zoomAt(g.view, dist / g.pinch.dist, anchor.x, anchor.y);
        // keep the pinched map point under the fingers
        const nx = anchor.x - ((mid.x - rect.left) / rect.width) * zoomed.w;
        const ny = anchor.y - ((mid.y - rect.top) / rect.height) * zoomed.h;
        dragged.current = true;
        setView(panBy(zoomed, nx - zoomed.x, ny - zoomed.y));
      } else if (g.pan && now.length === 1 && zoomOf(g.view) > 1.01) {
        const dx = ev.clientX - g.pan.x;
        const dy = ev.clientY - g.pan.y;
        if (Math.abs(dx) + Math.abs(dy) > 4) dragged.current = true;
        if (dragged.current) setView(panBy(g.view, -(dx / rect.width) * g.view.w, -(dy / rect.height) * g.view.h));
      }
    };
    const up = (ev: PointerEvent) => {
      pointers.current.delete(ev.pointerId);
      if (pointers.current.size === 0) {
        gesture.current = null;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
        // swallow the click that ends a drag
        setTimeout(() => (dragged.current = false), 0);
      } else {
        gesture.current = { view: viewRef.current, pan: [...pointers.current.values()][0] };
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const selectDivision = (id: string) => {
    if (dragged.current) return;
    if (activeDivision === id) return reset();
    const dv = bdDivisions.find((d) => d.id === id)!;
    setActiveDivision(id);
    setActiveKey(null);
    setActiveSlug(null);
    animateTo(fitBox(dv.bbox, 10));
  };

  const selectCluster = (c: Cluster, slug?: string) => {
    if (dragged.current) return;
    setActiveKey(c.key);
    setActiveSlug(slug ?? null);
    setActiveDivision(c.divisionId);
    animateTo(centerOn(c.x, c.y, Math.max(DETAIL_ZOOM + 0.4, zoomOf(viewRef.current))));
  };

  const onKey = (fn: () => void) => (e: ReactKeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  // ---- derived UI state -----------------------------------------------------

  const detailed = k >= DETAIL_ZOOM;
  const activeCluster = clusters.find((c) => c.key === activeKey) ?? null;
  const activeDv = bdDivisions.find((d) => d.id === activeDivision) ?? null;
  const panelSlugs = activeCluster ? activeCluster.slugs : activeDv ? divisionStats.get(activeDv.id)!.slugs : [];
  const panelProjects = panelSlugs.map((s) => bySlug.get(s)).filter((p): p is Project => Boolean(p));
  const labelOpacity = k < 1.5 ? 1 : Math.max(0, 1 - (k - 1.5) / 0.6);

  const clientsOf = (ps: Project[]) => [...new Set(ps.map((p) => p.client))];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,540px)_1fr]">
      {/* ---- map ---- */}
      <div className="mx-auto w-full max-w-[540px]">
        <div ref={boxRef} className="relative overflow-hidden rounded-sm border border-white/10 bg-ink-2">
          <div className="absolute inset-0 blueprint-grid" />
          <svg
            ref={svgRef}
            viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
            className="relative block w-full select-none"
            style={{ touchAction: k > 1.01 ? "none" : "pan-y", aspectRatio: `${MAP_W} / ${MAP_H}` }}
            role="group"
            aria-label="Map of Bangladesh by division with AHS Enterprise project locations"
            onPointerDown={onPointerDown}
          >
            {/* click on the sea = clear selection */}
            <rect
              x={0}
              y={0}
              width={MAP_W}
              height={MAP_H}
              fill="transparent"
              onClick={() => {
                if (dragged.current) return;
                if (activeKey || activeDivision) reset();
              }}
            />

            {/* divisions */}
            {bdDivisions.map((dv, i) => {
              const count = divisionStats.get(dv.id)!.slugs.length;
              const isActive = dv.id === activeDivision;
              const dim = activeDivision && !isActive;
              return (
                <path
                  key={dv.id}
                  d={dv.d}
                  fill={fills[i % fills.length]}
                  fillOpacity={dim ? 0.45 : 1}
                  stroke={isActive ? "#e8951e" : "#9fc3e0"}
                  strokeWidth={isActive ? u(2) : u(0.9)}
                  strokeOpacity={isActive ? 1 : 0.55}
                  strokeLinejoin="round"
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${dv.name} division: ${count} project${count === 1 ? "" : "s"}`}
                  className="cursor-pointer outline-none transition-[filter,fill-opacity] duration-200 hover:brightness-125 focus-visible:brightness-150"
                  onClick={() => selectDivision(dv.id)}
                  onKeyDown={onKey(() => selectDivision(dv.id))}
                />
              );
            })}

            {/* country outline */}
            {bangladeshOutlinePaths.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#e8951e" strokeOpacity={0.85} strokeWidth={u(1.4)} strokeLinejoin="round" pointerEvents="none" />
            ))}

            {/* division names */}
            {labelOpacity > 0 &&
              bdDivisions.map((dv) => (
                <text
                  key={dv.id}
                  x={dv.labelX}
                  y={dv.labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={u(10)}
                  letterSpacing={u(1.2)}
                  fill="#fff"
                  fillOpacity={0.88 * labelOpacity}
                  className="pointer-events-none select-none font-mono uppercase"
                  style={{ paintOrder: "stroke", stroke: "rgba(10,37,64,.55)", strokeWidth: u(2.5) }}
                >
                  {dv.name}
                </text>
              ))}

            {/* pins / markers */}
            {clusters.map((c) => {
              const n = c.slugs.length;
              const isActive = c.key === activeKey;
              const label = labels.get(c.key);

              if (!detailed) {
                return (
                  <g
                    key={c.key}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`${c.place}: ${n} project${n > 1 ? "s" : ""}`}
                    onClick={() => selectCluster(c)}
                    onKeyDown={onKey(() => selectCluster(c))}
                    className="cursor-pointer outline-none [&:focus-visible>circle:nth-of-type(2)]:stroke-white"
                  >
                    <circle cx={c.x} cy={c.y} r={u(16)} fill="transparent" />
                    {isActive && <circle cx={c.x} cy={c.y} r={u(13)} className="fill-amber/30 motion-safe:animate-ping" />}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={u(n > 1 ? 9 : 7)}
                      className={isActive ? "fill-amber stroke-ink" : "fill-buoy stroke-ink hover:fill-amber transition-colors"}
                      strokeWidth={u(1.6)}
                    />
                    {n > 1 && (
                      <text x={c.x} y={c.y} textAnchor="middle" dominantBaseline="central" fontSize={u(10)} className="pointer-events-none select-none fill-white font-mono font-bold">
                        {n}
                      </text>
                    )}
                    {label && (
                      <text
                        x={label.x}
                        y={label.y}
                        textAnchor={label.anchor}
                        dominantBaseline="central"
                        fontSize={u(11)}
                        fill="#fff"
                        className="pointer-events-none select-none"
                        style={{ paintOrder: "stroke", stroke: "rgba(10,37,64,.85)", strokeWidth: u(3), strokeLinejoin: "round" }}
                      >
                        {c.place}
                      </text>
                    )}
                  </g>
                );
              }

              // zoomed in: every project is its own marker, fanned out around the place
              const ring = n > 1 ? u(15 + n * 2.6) : 0;
              return (
                <g key={c.key}>
                  {n > 1 && <circle cx={c.x} cy={c.y} r={ring} fill="none" stroke="#fff" strokeOpacity={0.18} strokeDasharray={`${u(3)} ${u(3)}`} strokeWidth={u(1)} pointerEvents="none" />}
                  <circle cx={c.x} cy={c.y} r={u(2.5)} fill="#fff" fillOpacity={0.7} pointerEvents="none" />
                  {c.slugs.map((slug, i) => {
                    const p = bySlug.get(slug)!;
                    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
                    const mx = n > 1 ? c.x + Math.cos(ang) * ring : c.x;
                    const my = n > 1 ? c.y + Math.sin(ang) * ring : c.y;
                    const sel = slug === activeSlug;
                    const done = p.status === "COMPLETED";
                    return (
                      <g
                        key={slug}
                        role="button"
                        tabIndex={0}
                        aria-pressed={sel}
                        aria-label={`${p.code}: ${p.title}, ${p.location}`}
                        onClick={() => selectCluster(c, slug)}
                        onKeyDown={onKey(() => selectCluster(c, slug))}
                        className="cursor-pointer outline-none [&:focus-visible>circle:nth-of-type(2)]:stroke-white"
                      >
                        <title>{`${p.code} · ${p.title}`}</title>
                        {n > 1 && <line x1={c.x} y1={c.y} x2={mx} y2={my} stroke="#fff" strokeOpacity={0.25} strokeWidth={u(1)} pointerEvents="none" />}
                        <circle cx={mx} cy={my} r={u(14)} fill="transparent" />
                        <circle
                          cx={mx}
                          cy={my}
                          r={u(sel ? 11 : 9.5)}
                          fill={sel ? "#ffffff" : done ? "#c1401d" : "#e8951e"}
                          stroke={sel ? "#e8951e" : "#0a2540"}
                          strokeWidth={u(sel ? 2.4 : 1.6)}
                        />
                        <text x={mx} y={my} textAnchor="middle" dominantBaseline="central" fontSize={u(9)} fill={sel ? "#0a2540" : "#fff"} className="pointer-events-none select-none font-mono font-bold">
                          {p.code.replace(/\D/g, "").replace(/^0+(?=\d)/, "") || "·"}
                        </text>
                      </g>
                    );
                  })}
                  {label && (
                    <text
                      x={c.x}
                      y={c.y + ring + u(22)}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={u(12)}
                      fill="#fff"
                      className="pointer-events-none select-none"
                      style={{ paintOrder: "stroke", stroke: "rgba(10,37,64,.9)", strokeWidth: u(3.4), strokeLinejoin: "round" }}
                    >
                      {c.place}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* zoom controls */}
          <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-sm border border-white/15 bg-ink/90 backdrop-blur">
            <button type="button" aria-label="Zoom in" onClick={() => zoomBy(1.8)} className="p-2.5 text-white/80 hover:bg-white/10 hover:text-amber">
              <Plus size={16} />
            </button>
            <button type="button" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.8)} className="border-t border-white/10 p-2.5 text-white/80 hover:bg-white/10 hover:text-amber">
              <Minus size={16} />
            </button>
            <button type="button" aria-label="Show the whole country" onClick={reset} className="border-t border-white/10 p-2.5 text-white/80 hover:bg-white/10 hover:text-amber">
              <Maximize2 size={15} />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 rounded-sm bg-ink/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-white/60 backdrop-blur">
            {k.toFixed(1)}×
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-x border-b border-white/10 bg-ink px-4 py-3">
          <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-white/50">
            <MapPin size={12} className="text-amber" />
            {projects.length} projects · {clusters.length} locations
          </p>
          {detailed && (
            <p className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-widest text-white/50">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-buoy" /> Completed</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-amber" /> Ongoing</span>
            </p>
          )}
        </div>
        <p className="mt-3 text-xs text-white/40">
          Tap a division or a pin · drag to move · pinch or use + / − to zoom (Ctrl + scroll on a computer)
        </p>
      </div>

      {/* ---- side panel ---- */}
      <div className="rounded-sm border border-white/10 bg-ink-2 p-6 md:p-8 lg:max-h-[700px] lg:overflow-y-auto" aria-live="polite">
        {!activeDv && !activeCluster ? (
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-amber">Work by division</p>
            <p className="mt-2 text-sm text-white/55">Select a division to zoom in and see who we work with there.</p>
            <ul className="mt-5 divide-y divide-white/10">
              {bdDivisions.map((dv) => {
                const ps = divisionStats.get(dv.id)!.slugs;
                const total = projects.length || 1;
                return (
                  <li key={dv.id}>
                    <button
                      type="button"
                      onClick={() => selectDivision(dv.id)}
                      className="group flex w-full items-center gap-4 py-3 text-left"
                    >
                      <span className="w-28 shrink-0">
                        <span className="block font-display text-base font-bold uppercase tracking-tight text-white group-hover:text-amber transition-colors">{dv.name}</span>
                        <span className="block text-xs text-white/40">{dv.bn}</span>
                      </span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                        <span className="block h-full rounded-full bg-buoy" style={{ width: `${(ps.length / total) * 100}%` }} />
                      </span>
                      <span className="w-6 text-right font-mono text-sm text-white/70">{ps.length || "—"}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-amber">
                  {activeCluster ? `${activeCluster.place} · ` : ""}
                  {activeDv?.name} division
                </p>
                <p className="mt-1 text-sm text-white/55">
                  {panelProjects.length} project{panelProjects.length > 1 ? "s" : ""}
                  {activeDv ? ` · ${activeDv.bn}` : ""}
                </p>
                <p className="mt-1 text-xs text-white/40">{clientsOf(panelProjects).slice(0, 4).join(" · ")}</p>
              </div>
              <button type="button" onClick={reset} aria-label="Back to all divisions" className="shrink-0 p-1 text-white/40 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {panelProjects.length === 0 && (
              <p className="mt-5 rounded-sm border border-dashed border-white/15 p-4 text-sm text-white/55">
                No projects recorded in the {activeDv?.name} division yet.
              </p>
            )}

            <div className="mt-5 divide-y divide-white/10">
              {panelProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className={`group flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 ${p.slug === activeSlug ? "bg-white/5 -mx-3 px-3 rounded-sm" : ""}`}
                >
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-white/40">
                      {p.code} · {p.location}
                    </p>
                    <p className="font-display mt-1 text-base font-bold uppercase tracking-tight text-white group-hover:text-amber transition-colors">{p.title}</p>
                    <p className="mt-1 text-xs text-white/50">
                      {p.client} · {p.year} · {p.status === "COMPLETED" ? "Completed" : "Ongoing"}
                    </p>
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
