// Pure helpers for the zoomable map: a "view" is the visible rectangle in map units.
export const MAP_W = 380;
export const MAP_H = 460;
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 8;

export type View = { x: number; y: number; w: number; h: number };
export const FULL_VIEW: View = { x: 0, y: 0, w: MAP_W, h: MAP_H };

export const zoomOf = (v: View) => MAP_W / v.w;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** Keeps the view inside the map and its size inside the allowed zoom range. */
export function clampView(v: View): View {
  const w = clamp(v.w, MAP_W / MAX_ZOOM, MAP_W / MIN_ZOOM);
  const h = (w * MAP_H) / MAP_W;
  return { w, h, x: clamp(v.x, 0, MAP_W - w), y: clamp(v.y, 0, MAP_H - h) };
}

/** Zoom by `factor` (>1 zooms in) keeping the map point (cx, cy) fixed on screen. */
export function zoomAt(v: View, factor: number, cx: number, cy: number): View {
  const w = clamp(v.w / factor, MAP_W / MAX_ZOOM, MAP_W / MIN_ZOOM);
  const h = (w * MAP_H) / MAP_W;
  const k = w / v.w;
  return clampView({ w, h, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
}

export function panBy(v: View, dx: number, dy: number): View {
  return clampView({ ...v, x: v.x + dx, y: v.y + dy });
}

/** View that shows the box [x0, y0, x1, y1] with some padding. */
export function fitBox([x0, y0, x1, y1]: [number, number, number, number], pad = 12): View {
  const bw = x1 - x0 + pad * 2;
  const bh = y1 - y0 + pad * 2;
  const w = Math.max(bw, (bh * MAP_W) / MAP_H);
  const h = (w * MAP_H) / MAP_W;
  return clampView({ w, h, x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2 });
}

export function centerOn(cx: number, cy: number, zoom: number): View {
  const w = MAP_W / clamp(zoom, MIN_ZOOM, MAX_ZOOM);
  const h = (w * MAP_H) / MAP_W;
  return clampView({ w, h, x: cx - w / 2, y: cy - h / 2 });
}

export function lerpView(a: View, b: View, t: number): View {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, w: a.w + (b.w - a.w) * t, h: a.h + (b.h - a.h) * t };
}
