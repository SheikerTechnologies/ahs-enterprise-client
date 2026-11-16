import type { Project } from "./data";

// Approximate coordinates used for the project map. Seeded into MongoDB as `geo`;
// also the fallback when a project has no `geo` set.
export const projectGeo: Record<string, NonNullable<Project["geo"]>> = {
  "emergency-geo-bag-dumping-aricha": { lat: 23.656, lng: 89.9761, place: "Aricha" },
  "ancillary-dredging-dhaka-mirkadim": { lat: 23.5422, lng: 90.5305, place: "Munshiganj" },
  "pontoon-repair-sp385-barishal": { lat: 22.701, lng: 90.3535, place: "Barishal" },
  "navigation-marks-chandpur": { lat: 23.2333, lng: 90.6667, place: "Chandpur" },
  "padma-bridge-approach-road": { lat: 23.5422, lng: 90.5305, place: "Munshiganj" },
  "jolshiri-abashon-residence": { lat: 23.83, lng: 90.52, place: "Jolshiri" },
  "damp-proofing-tiles-biwta-bhaban": { lat: 23.8103, lng: 90.4125, place: "Dhaka" },
  "cba-office-extension-sadarghat": { lat: 23.7071, lng: 90.4095, place: "Sadarghat" },
  "emergency-geo-bag-dumping-doulotdia-2021": { lat: 23.645, lng: 89.755, place: "Doulotdia" },
  "new-ferry-ghat-narayanganj": { lat: 23.6238, lng: 90.5, place: "Narayanganj" },
  "approach-road-baghabari-port": { lat: 24.35, lng: 89.65, place: "Baghabari" },
  "emergency-ramp-repair-doulotdia": { lat: 23.645, lng: 89.755, place: "Doulotdia" },
  "emergency-geo-bag-dumping-doulotdia-2022": { lat: 23.645, lng: 89.755, place: "Doulotdia" },
  "riverbank-repair-tulai-river": { lat: 25.6217, lng: 88.6354, place: "Dinajpur" },
  "low-water-ferry-ghat-shimulia": { lat: 23.4833, lng: 90.2667, place: "Shimulia" },
  "bundling-goods-kaulia-sirajganj": { lat: 24.42, lng: 89.72, place: "Kaulia" },
  "pontoon-repair-sp228-ultinganj": { lat: 23.75, lng: 90.43, place: "Ultinganj" },
  "navigation-marks-sirajganj": { lat: 24.45, lng: 89.7, place: "Sirajganj" },
  "pontoon-repair-stp01-monpura": { lat: 22.1667, lng: 90.9333, place: "Monpura" },
  "sl-chain-coastal-buoys-chittagong": { lat: 22.3569, lng: 91.7832, place: "Chittagong" },
  "fs-wear-coils-ships-pontoons": { lat: 23.8103, lng: 90.4125, place: "Dhaka" },
  "stationery-supply-bns-sher-e-bangla": { lat: 22.3596, lng: 90.3296, place: "Patuakhali" },
  "mongla-pilot-house-bathrooms-tank": { lat: 22.701, lng: 90.3535, place: "Barishal" },
  "mongla-pilot-house-two-rooms": { lat: 22.701, lng: 90.3535, place: "Barishal" },
  "mooring-buoy-accessories-chandpur": { lat: 23.2333, lng: 90.6667, place: "Chandpur" },
  "shackles-stud-link-chain-dhaka": { lat: 23.8103, lng: 90.4125, place: "Dhaka" },
};
