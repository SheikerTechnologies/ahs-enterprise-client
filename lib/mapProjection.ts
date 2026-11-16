import { BD_MAP_WIDTH, BD_MAP_HEIGHT } from "./bangladeshOutline";

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
