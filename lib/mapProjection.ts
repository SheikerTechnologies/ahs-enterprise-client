import { bangladeshOutlinePaths, BD_MAP_WIDTH, BD_MAP_HEIGHT } from "./bangladeshOutline";

// Must match the bounds used to generate bangladeshOutline.ts
const LON_MIN = 88.0;
const LON_MAX = 92.7;
const LAT_MIN = 20.55;
const LAT_MAX = 26.65;

export function projectToMap(lat: number, lng: number) {
  return {
    x: Math.round(((lng - LON_MIN) / (LON_MAX - LON_MIN)) * BD_MAP_WIDTH * 10) / 10,
    y: Math.round(((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * BD_MAP_HEIGHT * 10) / 10,
  };
}

type Pt = [number, number];

const polygons: Pt[][] = bangladeshOutlinePaths.map((d) =>
  (d.match(/-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?/g) ?? []).map((s) => s.split(",").map(Number) as Pt)
);

function inPolygon([x, y]: Pt, poly: Pt[]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Nearest point on any outline edge. */
function nearestEdge(p: Pt) {
  let best = { q: polygons[0][0], d: Infinity, poly: polygons[0] };
  for (const poly of polygons) {
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [ax, ay] = poly[j];
      const [bx, by] = poly[i];
      const dx = bx - ax;
      const dy = by - ay;
      const len2 = dx * dx + dy * dy;
      const t = len2 ? Math.max(0, Math.min(1, ((p[0] - ax) * dx + (p[1] - ay) * dy) / len2)) : 0;
      const q: Pt = [ax + t * dx, ay + t * dy];
      const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
      if (d < best.d) best = { q, d, poly };
    }
  }
  return best;
}

function insideAny(p: Pt) {
  return polygons.some((poly) => inPolygon(p, poly));
}

/** Nearest point to `p` that is on land and at least `margin` away from the coast. */
function searchLand(p: Pt, margin: number): Pt | null {
  for (const radius of [12, 24, 48, 96, 160]) {
    const step = Math.max(1, radius / 16);
    let best: { pt: Pt; dist: number } | null = null;
    for (let gx = p[0] - radius; gx <= p[0] + radius; gx += step) {
      for (let gy = p[1] - radius; gy <= p[1] + radius; gy += step) {
        const q: Pt = [gx, gy];
        const dist = Math.hypot(gx - p[0], gy - p[1]);
        if (dist > radius || (best && dist >= best.dist) || !insideAny(q)) continue;
        if (nearestEdge(q).d >= margin) best = { pt: q, dist };
      }
    }
    if (best) return best.pt;
  }
  return null;
}

/**
 * Keeps a map pin fully inside the Bangladesh outline: a pin that falls outside
 * (or too close to the coast for its circle to fit) is moved to the nearest
 * point of land that has room for it. Tiny islands get the best fit available.
 */
export function snapInside(x: number, y: number, margin = 9) {
  const p: Pt = [x, y];
  if (insideAny(p) && nearestEdge(p).d >= margin) return { x, y };
  for (const m of [margin, margin * 0.6, 3, 1]) {
    const found = searchLand(p, m);
    if (found) return { x: Math.round(found[0] * 10) / 10, y: Math.round(found[1] * 10) / 10 };
  }
  return { x, y };
}

// ---- divisions ----------------------------------------------------------

import { bdDivisions } from "./bangladeshDivisions";

function parseRings(d: string): Pt[][] {
  return d
    .split("Z")
    .map((chunk) => chunk.match(/-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?/g))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => m.map((s) => s.split(",").map(Number) as Pt));
}

const divisionRings = bdDivisions.map((dv) => ({ id: dv.id, rings: parseRings(dv.d) }));

function distToRing(p: Pt, ring: Pt[]) {
  let best = Infinity;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [ax, ay] = ring[j];
    const [bx, by] = ring[i];
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    const t = len2 ? Math.max(0, Math.min(1, ((p[0] - ax) * dx + (p[1] - ay) * dy) / len2)) : 0;
    best = Math.min(best, Math.hypot(p[0] - (ax + t * dx), p[1] - (ay + t * dy)));
  }
  return best;
}

/** Which division a map point belongs to (nearest one if it falls just offshore). */
export function divisionIdAt(x: number, y: number): string {
  const p: Pt = [x, y];
  for (const dv of divisionRings) if (dv.rings.some((r) => inPolygon(p, r))) return dv.id;
  let best = { id: divisionRings[0].id, d: Infinity };
  for (const dv of divisionRings) for (const r of dv.rings) {
    const d = distToRing(p, r);
    if (d < best.d) best = { id: dv.id, d };
  }
  return best.id;
}
