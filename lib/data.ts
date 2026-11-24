export type Project = {
  slug: string;
  code: string;
  title: string;
  client: string;
  location: string;
  year: string;
  duration: string;
  scope: string;
  status: "COMPLETED" | "ONGOING";
  tagline: string;
  summary: string;
  image: string;
  gallery: string[];
  details: { label: string; value: string }[];
  geo?: { lat: number; lng: number; place: string };
  /** Set by MongoDB; used as the sitemap lastModified date. */
  updatedAt?: string;
};

export const projects: Project[] = [
  {
    slug: "emergency-geo-bag-dumping-aricha",
    code: "PRJ-01",
    title: "Emergency Geo-Bag Dumping",
    client: "BIWTA",
    location: "Aricha Ferryghat",
    year: "2021",
    duration: "06 Days",
    scope: "Riverbank Protection — Erosion Control",
    status: "COMPLETED",
    tagline: "Riverbank Protection Work",
    summary:
      "A rapid-response erosion-control deployment at Aricha Ferryghat, where the riverbank was actively collapsing into the channel. Our crew mobilised within hours, laid geo-textile bags along the failing embankment, and stabilised the bank before the next high-flow cycle.",
    image: "/images/gallery/riverbank-1.jpg",
    gallery: [
      "/images/gallery/riverbank-1.jpg",
      "/images/gallery/geo-bag-1.jpg",
      "/images/gallery/riverbank-3.jpg",
    ],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Aricha Ferryghat" },
      { label: "Year", value: "2021" },
      { label: "Duration", value: "06 Days" },
      { label: "Scope", value: "Riverbank Protection (Erosion Control)" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "ancillary-dredging-dhaka-mirkadim",
    code: "PRJ-02",
    title: "Ancillary Dredging Works",
    client: "BIWTA",
    location: "Dhaka–Mirkadim Route",
    year: "2021",
    duration: "35 Days",
    scope: "River Channel Maintenance Support",
    status: "COMPLETED",
    tagline: "Execution Under High-Flow Conditions",
    summary:
      "Ancillary works in support of dredging operations along the Dhaka–Mirkadim port area in the river Ichamoti. The channel had silted heavily; our team ran continuous shore-support and material handling through a 35-day window to keep the dredger operating through high-flow conditions.",
    image: "/images/gallery/dredging-2.jpg",
    gallery: [
      "/images/gallery/dredging-2.jpg",
      "/images/gallery/dredging-1.jpg",
      "/images/gallery/river-protection-1.jpg",
    ],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Dhaka–Mirkadim Route" },
      { label: "Year", value: "2021" },
      { label: "Duration", value: "35 Days" },
      { label: "Scope", value: "River Channel Maintenance Support" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "pontoon-repair-sp385-barishal",
    code: "PRJ-03",
    title: "Pontoon Repair Works (SP-385)",
    client: "BIWTA",
    location: "Barishal",
    year: "2025",
    duration: "30 Days",
    scope: "Marine Structural Repair",
    status: "COMPLETED",
    tagline: "Ensuring Operational Continuity",
    summary:
      "Structural repair of the SP-385 pontoon serving the Charmondol and Charkhali launch-ghats in Barishal. The pontoon deck, floats and mooring hardware were restored to full service without interrupting the daily launch schedule the community depends on.",
    image: "/images/gallery/river-protection-1.jpg",
    gallery: [
      "/images/gallery/river-protection-1.jpg",
      "/images/gallery/dredging-2.jpg",
    ],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Barishal" },
      { label: "Year", value: "2025" },
      { label: "Duration", value: "30 Days" },
      { label: "Work Type", value: "Marine Structural Repair" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "navigation-marks-chandpur",
    code: "PRJ-04",
    title: "Supply & Installation of Navigation Marks",
    client: "BIWTA",
    location: "Chandpur Waterways",
    year: "2024",
    duration: "27 Days",
    scope: "H-Marks · O-Marks · Diamond Marks",
    status: "COMPLETED",
    tagline: "Supporting Safe Navigation",
    summary:
      "Procurement and installation of 80 H-marks, 80 O-marks and 80 Diamond marks across the Chandpur section waterways, under the Conservancy & Pilotage department of BIWTA — critical infrastructure that keeps vessel traffic safe on one of the country's busiest river sections.",
    image: "/images/gallery/geo-bag-2.jpg",
    gallery: ["/images/gallery/geo-bag-2.jpg", "/images/gallery/geo-bag-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Chandpur Waterways" },
      { label: "Year", value: "2024" },
      { label: "Duration", value: "27 Days" },
      { label: "Items", value: "H-Marks · O-Marks · Diamond Marks" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "padma-bridge-approach-road",
    code: "PRJ-05",
    title: "Approach Road to Padma Bridge",
    client: "BIWTA",
    location: "Munshiganj",
    year: "2022",
    duration: "06 Days",
    scope: "Structural Road Construction",
    status: "COMPLETED",
    tagline: "Ensuring Prompt Construction Operations",
    summary:
      "Construction of the structural approach road connecting the ferry terminal to the Padma Bridge corridor at Munshiganj — a fast-turnaround civil works job completed in six days to keep the crossing open to traffic.",
    image: "/images/gallery/road-1.jpg",
    gallery: [
      "/images/gallery/road-1.jpg",
      "/images/gallery/excavator-1.jpg",
      "/images/gallery/excavator-2.jpg",
    ],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Munshiganj" },
      { label: "Year", value: "2022" },
      { label: "Duration", value: "06 Days" },
      { label: "Work Type", value: "Construction — Structural Road" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "jolshiri-abashon-residence",
    code: "PRJ-06",
    title: "Residential Tower, Jolshiri Abashon",
    client: "Private Development",
    location: "Jolshiri Abashon, Dhaka",
    year: "2025",
    duration: "In Progress",
    scope: "Residential Building Construction",
    status: "ONGOING",
    tagline: "Bringing Military-Grade Precision to Property Development",
    summary:
      "A ground-up residential tower at Jolshiri Abashon — the same discipline of quality control, cost-efficiency and timely delivery that defines our government works, now applied to modern urban housing.",
    image: "/images/gallery/tower-1.jpg",
    gallery: ["/images/gallery/tower-1.jpg"],
    details: [
      { label: "Client", value: "Private Development" },
      { label: "Location", value: "Jolshiri Abashon, Dhaka" },
      { label: "Year", value: "2025" },
      { label: "Duration", value: "In Progress" },
      { label: "Scope", value: "Residential Building Construction" },
      { label: "Status", value: "Ongoing" },
    ],
  },
  {
    slug: "damp-proofing-tiles-biwta-bhaban",
    code: "PRJ-07",
    title: "Damp-Proofing, Tiles & Stair Railing",
    client: "BIWTA",
    location: "BIWTA Bhaban, Dhaka",
    year: "2021",
    duration: "10 Days",
    scope: "Interior Civil Finishing",
    status: "COMPLETED",
    tagline: "Interior Civil & Finishing Works",
    summary:
      "Damp-proofing, tile work and stair-railing installation inside BIWTA Bhaban — a fast-turnaround interior finishing job completed within 10 days without disrupting daily office operations.",
    image: "/images/gallery/civil-works-1.jpg",
    gallery: ["/images/gallery/civil-works-1.jpg", "/images/gallery/road-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "BIWTA Bhaban, Dhaka" },
      { label: "Year", value: "2021" },
      { label: "Duration", value: "10 Days" },
      { label: "Scope", value: "Interior Civil Finishing" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "cba-office-extension-sadarghat",
    code: "PRJ-08",
    title: "CBA Office Extension & Interior",
    client: "BIWTA",
    location: "Sadarghat Terminal, Dhaka",
    year: "2021",
    duration: "18 Days",
    scope: "Interior Fit-Out & Extension",
    status: "COMPLETED",
    tagline: "Extending Working Space Without Downtime",
    summary:
      "Extension and interior fit-out of the CBA office at Sadarghat Terminal — additional working space delivered for BIWTA's river-terminal staff over an 18-day build.",
    image: "/images/gallery/civil-works-1.jpg",
    gallery: ["/images/gallery/civil-works-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Sadarghat Terminal, Dhaka" },
      { label: "Year", value: "2021" },
      { label: "Duration", value: "18 Days" },
      { label: "Scope", value: "Interior Fit-Out & Extension" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "emergency-geo-bag-dumping-doulotdia-2021",
    code: "PRJ-09",
    title: "Emergency Geo-Bag Dumping, Doulotdia",
    client: "BIWTA",
    location: "Doulotdia Ferryghat, Aricha",
    year: "2021",
    duration: "27 Days",
    scope: "Riverbank Protection — Erosion Control",
    status: "COMPLETED",
    tagline: "Riverbank Protection Work",
    summary:
      "A larger emergency geo-bag deployment at Doulotdia Ferryghat to hold back active bank erosion — 27 days of continuous work to stabilise the embankment through a full high-flow cycle.",
    image: "/images/gallery/geo-bag-2.jpg",
    gallery: ["/images/gallery/geo-bag-2.jpg", "/images/gallery/geo-bag-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Doulotdia Ferryghat, Aricha" },
      { label: "Year", value: "2021" },
      { label: "Duration", value: "27 Days" },
      { label: "Scope", value: "Riverbank Protection (Erosion Control)" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "new-ferry-ghat-narayanganj",
    code: "PRJ-10",
    title: "New Ferry Ghat Construction & Maintenance",
    client: "BIWTA",
    location: "Narayanganj",
    year: "2021",
    duration: "3 Months",
    scope: "Ferry Ghat Construction & AMC",
    status: "COMPLETED",
    tagline: "Full Ferry Ghat Delivery, Start to Finish",
    summary:
      "Construction of a new mid/high-water ferry ghat at Narayanganj, followed by an annual maintenance contract to keep it operational year-round — a three-month engagement covering both build and upkeep.",
    image: "/images/gallery/vessel-1.jpg",
    gallery: ["/images/gallery/vessel-1.jpg", "/images/gallery/dredging-2.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Narayanganj" },
      { label: "Year", value: "2021" },
      { label: "Duration", value: "3 Months" },
      { label: "Scope", value: "Ferry Ghat Construction & AMC" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "approach-road-baghabari-port",
    code: "PRJ-11",
    title: "Approach Road & Inaugural Gate",
    client: "BIWTA",
    location: "Baghabari River Port, Sirajganj",
    year: "2022",
    duration: "07 Days",
    scope: "River Port Civil Works",
    status: "COMPLETED",
    tagline: "Civil Works for Riverine Trade Infrastructure",
    summary:
      "Construction of the approach road and inaugural gate at Baghabari River Port, Sirajganj — civil infrastructure supporting one of the busiest riverine cargo points on the Jamuna.",
    image: "/images/gallery/road-1.jpg",
    gallery: ["/images/gallery/road-1.jpg", "/images/gallery/excavator-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Baghabari River Port, Sirajganj" },
      { label: "Year", value: "2022" },
      { label: "Duration", value: "07 Days" },
      { label: "Scope", value: "River Port Civil Works" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "emergency-ramp-repair-doulotdia",
    code: "PRJ-12",
    title: "Emergency Ramp Base Repair",
    client: "BIWTA",
    location: "Ferryghat No. 5, Doulotdia, Aricha",
    year: "2022",
    duration: "05 Days",
    scope: "Marine Structural Repair (Emergency)",
    status: "COMPLETED",
    tagline: "Same-Week Emergency Response",
    summary:
      "Emergency repair of the failing ramp base at Ferryghat No. 5, Doulotdia — mobilised and completed within 5 days to keep the crossing in service.",
    image: "/images/gallery/riverbank-1.jpg",
    gallery: ["/images/gallery/riverbank-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Ferryghat No. 5, Doulotdia, Aricha" },
      { label: "Year", value: "2022" },
      { label: "Duration", value: "05 Days" },
      { label: "Scope", value: "Marine Structural Repair (Emergency)" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "emergency-geo-bag-dumping-doulotdia-2022",
    code: "PRJ-13",
    title: "Emergency Geo-Bag Dumping, Doulotdia (2022)",
    client: "BIWTA",
    location: "Doulotdia Ferryghat, Aricha",
    year: "2022",
    duration: "05 Days",
    scope: "Riverbank Protection (Emergency)",
    status: "COMPLETED",
    tagline: "Riverbank Protection Work",
    summary:
      "A second emergency geo-bag deployment at Doulotdia Ferryghat, this time a rapid 5-day response to a fresh erosion threat during the monsoon season.",
    image: "/images/gallery/riverbank-2.jpg",
    gallery: ["/images/gallery/riverbank-2.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Doulotdia Ferryghat, Aricha" },
      { label: "Year", value: "2022" },
      { label: "Duration", value: "05 Days" },
      { label: "Scope", value: "Riverbank Protection (Emergency)" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "riverbank-repair-tulai-river",
    code: "PRJ-14",
    title: "Riverbank Repair, Lot-01",
    client: "BIWTA",
    location: "Tulai River, Dinajpur",
    year: "2022",
    duration: "83 Days",
    scope: "Riverbank Protection — Major Works",
    status: "COMPLETED",
    tagline: "The Longest Riverbank Engagement to Date",
    summary:
      "A major riverbank protection contract on the Tulai River in Dinajpur — the longest single engagement in our portfolio at 83 days, covering an extended stretch of failing embankment.",
    image: "/images/gallery/riverbank-3.jpg",
    gallery: ["/images/gallery/riverbank-3.jpg", "/images/gallery/river-protection-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Tulai River, Dinajpur" },
      { label: "Year", value: "2022" },
      { label: "Duration", value: "83 Days" },
      { label: "Scope", value: "Riverbank Protection — Major Works" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "low-water-ferry-ghat-shimulia",
    code: "PRJ-15",
    title: "Extension of Low-Water Ferry Ghats",
    client: "BIWTA",
    location: "Shimulia (Mawa), Dhaka",
    year: "2023",
    duration: "07 Days",
    scope: "Ferry Ghat Extension",
    status: "COMPLETED",
    tagline: "Keeping the Mawa Crossing Moving",
    summary:
      "Extension of two low-water ferry ghats at Shimulia (Mawa) — infrastructure work to keep one of the country's highest-traffic crossings operating through the dry season.",
    image: "/images/gallery/vessel-1.jpg",
    gallery: ["/images/gallery/vessel-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Shimulia (Mawa), Dhaka" },
      { label: "Year", value: "2023" },
      { label: "Duration", value: "07 Days" },
      { label: "Scope", value: "Ferry Ghat Extension" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "bundling-goods-kaulia-sirajganj",
    code: "PRJ-16",
    title: "Bundling Goods Delivery & Installation",
    client: "BIWTA",
    location: "Kaulia–Sirajganj Route, Dhaka",
    year: "2023",
    duration: "30 Days",
    scope: "Marine Hardware Supply & Install",
    status: "COMPLETED",
    tagline: "Supply Chain Meets Installation",
    summary:
      "Delivery and installation of bundling goods and marine hardware along the Kaulia–Sirajganj waterway route — a full month covering procurement through on-site fitting.",
    image: "/images/gallery/loading-1.jpg",
    gallery: ["/images/gallery/loading-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Kaulia–Sirajganj Route, Dhaka" },
      { label: "Year", value: "2023" },
      { label: "Duration", value: "30 Days" },
      { label: "Scope", value: "Marine Hardware Supply & Install" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "pontoon-repair-sp228-ultinganj",
    code: "PRJ-17",
    title: "Minor Repair, SP-228 Pontoon",
    client: "BIWTA",
    location: "Ultinganj Launchghat, Dhaka",
    year: "2023",
    duration: "30 Days",
    scope: "Pontoon Repair",
    status: "COMPLETED",
    tagline: "Ensuring Operational Continuity",
    summary:
      "Minor structural repair of the SP-228 pontoon at Ultinganj Launchghat — deck and mooring hardware restored to full service across a 30-day window.",
    image: "/images/gallery/dredging-2.jpg",
    gallery: ["/images/gallery/dredging-2.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Ultinganj Launchghat, Dhaka" },
      { label: "Year", value: "2023" },
      { label: "Duration", value: "30 Days" },
      { label: "Scope", value: "Pontoon Repair" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "navigation-marks-sirajganj",
    code: "PRJ-18",
    title: "Procurement of 200 'H' & 'O' Navigation Marks",
    client: "BIWTA",
    location: "Sirajganj",
    year: "2023",
    duration: "04 Days",
    scope: "Navigation Aid Supply",
    status: "COMPLETED",
    tagline: "Supporting Safe Navigation",
    summary:
      "Fast-turnaround procurement of 200 'H' and 'O' navigation marks for the Sirajganj waterway section — sourced and delivered inside 4 days.",
    image: "/images/gallery/loading-1.jpg",
    gallery: ["/images/gallery/loading-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Sirajganj" },
      { label: "Year", value: "2023" },
      { label: "Duration", value: "04 Days" },
      { label: "Scope", value: "Navigation Aid Supply" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "pontoon-repair-stp01-monpura",
    code: "PRJ-19",
    title: "Minor Repair, STP-01 Pontoon",
    client: "BIWTA",
    location: "Ramnewaz, Monpura, Dhaka",
    year: "2024",
    duration: "30 Days",
    scope: "Pontoon Repair",
    status: "COMPLETED",
    tagline: "Ensuring Operational Continuity",
    summary:
      "Structural repair of the STP-01 pontoon at Ramnewaz, Monpura — restoring full service to a remote-island launch point over a 30-day contract.",
    image: "/images/gallery/dredging-1.jpg",
    gallery: ["/images/gallery/dredging-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Ramnewaz, Monpura, Dhaka" },
      { label: "Year", value: "2024" },
      { label: "Duration", value: "30 Days" },
      { label: "Scope", value: "Pontoon Repair" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "sl-chain-coastal-buoys-chittagong",
    code: "PRJ-20",
    title: "Procurement of 36mm SL Chain for Coastal Buoys",
    client: "BIWTA",
    location: "Chittagong",
    year: "2024",
    duration: "20 Days",
    scope: "Marine Hardware Supply",
    status: "COMPLETED",
    tagline: "Coastal Navigation Infrastructure",
    summary:
      "Supply of heavy 36mm SL mooring chain for coastal buoy installations at Chittagong — marine-grade hardware sourced and delivered within 20 days.",
    image: "/images/gallery/loading-1.jpg",
    gallery: ["/images/gallery/loading-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Chittagong" },
      { label: "Year", value: "2024" },
      { label: "Duration", value: "20 Days" },
      { label: "Scope", value: "Marine Hardware Supply" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "fs-wear-coils-ships-pontoons",
    code: "PRJ-21",
    title: "Procurement of F.S. Wear Coils",
    client: "BIWTA",
    location: "Dhaka",
    year: "2024",
    duration: "30 Days",
    scope: "Marine Spares Supply",
    status: "COMPLETED",
    tagline: "Keeping the Fleet Running",
    summary:
      "Supply of F.S. wear coils for BIWTA's fleet of ships and pontoons — spare-parts procurement supporting fleet-wide maintenance over a month-long contract.",
    image: "/images/gallery/vessel-1.jpg",
    gallery: ["/images/gallery/vessel-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Dhaka" },
      { label: "Year", value: "2024" },
      { label: "Duration", value: "30 Days" },
      { label: "Scope", value: "Marine Spares Supply" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "stationery-supply-bns-sher-e-bangla",
    code: "PRJ-22",
    title: "Stationery Supply, Passing Parade",
    client: "Bangladesh Navy",
    location: "BNS Sher-E-Bangla, Patuakhali",
    year: "2024",
    duration: "12 Days",
    scope: "Defense Supply",
    status: "COMPLETED",
    tagline: "Direct Support to a Naval Passing-Out Parade",
    summary:
      "Stationery and event-support supply for the passing parade at BNS Sher-E-Bangla, Patuakhali — a direct-to-Navy engagement delivered inside 12 days.",
    image: "/images/hero-submarine.jpg",
    gallery: ["/images/hero-submarine.jpg"],
    details: [
      { label: "Client", value: "Bangladesh Navy" },
      { label: "Location", value: "BNS Sher-E-Bangla, Patuakhali" },
      { label: "Year", value: "2024" },
      { label: "Duration", value: "12 Days" },
      { label: "Scope", value: "Defense Supply" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "mongla-pilot-house-bathrooms-tank",
    code: "PRJ-23",
    title: "Ancillary Works, Mongla Pilot House",
    client: "BIWTA",
    location: "Barishal",
    year: "2024",
    duration: "30 Days",
    scope: "Civil Ancillary Works",
    status: "COMPLETED",
    tagline: "Supporting Facilities for Pilotage Staff",
    summary:
      "Bathroom and water-tank installation at the Mongla Pilot House — ancillary civil works improving on-site facilities for BIWTA's pilotage staff.",
    image: "/images/gallery/excavator-1.jpg",
    gallery: ["/images/gallery/excavator-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Barishal" },
      { label: "Year", value: "2024" },
      { label: "Duration", value: "30 Days" },
      { label: "Scope", value: "Civil Ancillary Works" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "mongla-pilot-house-two-rooms",
    code: "PRJ-24",
    title: "Ancillary Works, 2 Rooms — Mongla Pilot House",
    client: "BIWTA",
    location: "Barishal",
    year: "2024",
    duration: "3 Months",
    scope: "Civil Ancillary Works",
    status: "COMPLETED",
    tagline: "Expanding On-Site Capacity",
    summary:
      "Construction of two additional rooms at the Mongla Pilot House — a three-month build expanding on-site capacity for BIWTA's pilotage operations.",
    image: "/images/gallery/excavator-2.jpg",
    gallery: ["/images/gallery/excavator-2.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Barishal" },
      { label: "Year", value: "2024" },
      { label: "Duration", value: "3 Months" },
      { label: "Scope", value: "Civil Ancillary Works" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "mooring-buoy-accessories-chandpur",
    code: "PRJ-25",
    title: "Navigational Aids & Mooring Buoy Accessories",
    client: "BIWTA",
    location: "Chandpur, Dhaka",
    year: "2025",
    duration: "30 Days",
    scope: "Navigation Aid Supply",
    status: "COMPLETED",
    tagline: "Supporting Safe Navigation",
    summary:
      "Supply of navigational aids and mooring buoy accessories for the Chandpur waterway section — a month-long procurement contract for BIWTA's Conservancy & Pilotage department.",
    image: "/images/gallery/river-protection-1.jpg",
    gallery: ["/images/gallery/river-protection-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Chandpur, Dhaka" },
      { label: "Year", value: "2025" },
      { label: "Duration", value: "30 Days" },
      { label: "Scope", value: "Navigation Aid Supply" },
      { label: "Status", value: "Completed" },
    ],
  },
  {
    slug: "shackles-stud-link-chain-dhaka",
    code: "PRJ-26",
    title: "Procurement of Shackles & Stud-Link Chain",
    client: "BIWTA",
    location: "Dhaka",
    year: "2025",
    duration: "15 Days",
    scope: "Marine Hardware Supply",
    status: "COMPLETED",
    tagline: "Marine Hardware, Delivered Fast",
    summary:
      "Procurement of 25 shackles and 28mm stud-link chain for BIWTA's marine operations — heavy mooring hardware sourced and delivered within 15 days.",
    image: "/images/gallery/loading-1.jpg",
    gallery: ["/images/gallery/loading-1.jpg"],
    details: [
      { label: "Client", value: "BIWTA" },
      { label: "Location", value: "Dhaka" },
      { label: "Year", value: "2025" },
      { label: "Duration", value: "15 Days" },
      { label: "Scope", value: "Marine Hardware Supply" },
      { label: "Status", value: "Completed" },
    ],
  },
];

export type Service = {
  code: string;
  title: string;
  short: string;
  description: string;
};

export const services: Service[] = [
  {
    code: "S1",
    title: "Civil Works",
    short: "Construction, repair & maintenance of roads and buildings",
    description:
      "Well-tailored facility for roads, buildings, spaces and bridge construction, repair and maintenance services — executed to government-tender standards.",
  },
  {
    code: "S2",
    title: "Marine & Submarine Supply",
    short: "Submarine spares, naval ship spares, navigation equipment",
    description:
      "Closed multiple limited deals supplying submarine spares, naval machineries and industrial equipment with government and defense bodies of Bangladesh, including BNS Joyjatra.",
  },
  {
    code: "S3",
    title: "Riverbank Protection",
    short: "Geo-bag dumping, hard-rock sedimentation",
    description:
      "A dedicated team of experts delivering sustainable riverbank protection — multiple geo-bag dumping projects completed nationwide, often on emergency timelines.",
  },
  {
    code: "S4",
    title: "River Channel Maintenance",
    short: "Dredging works for the Ministry of Shipping",
    description:
      "Annual dredging support that keeps Bangladesh's river channels navigable, tackling shrinking and silting alluvia across the riverine parts of the country.",
  },
  {
    code: "S5",
    title: "Ferry Ghat & Pontoon Repair",
    short: "Repair and maintenance of ferry ghats and pontoons",
    description:
      "Multiple projects of repairing and maintaining ferry ghats and pontoons handed over successfully to several government bodies.",
  },
  {
    code: "S6",
    title: "Power & Renewables",
    short: "Renewable solar energy projects under Sun Solaris Limited",
    description:
      "Promoting renewable energy over fossil-fuel consumption through Sun Solaris Limited, our sister concern dedicated to solar solutions at home and abroad.",
  },
  {
    code: "S7",
    title: "Indenting, Export & Import",
    short: "Cross-border trade & indenting services",
    description:
      "End-to-end indenting, export and import services connecting international suppliers with Bangladesh's government and industrial buyers.",
  },
  {
    code: "S8",
    title: "Electrical Installation Works",
    short: "High, medium & low pressure electrical contracting",
    description:
      "Licensed by the Electricity Licensing Board (Bangladesh) as a Class A, B & C Electrical Contractor — covering extra-high, medium and low pressure electrical installation works.",
  },
];

export const defenseSupplyGroups = [
  "Motor Transport & Spares",
  "Signal, Electrical & Electronic Equipment",
  "Medical & Electromedical Equipment",
  "Clothing, Barrack & Camp Equipment",
  "Stationery & Tent Equipment",
  "Food, Forage & Hygiene Stores",
  "AC Machines, Trucks & Ground Equipment",
  "Batteries, Office & Photographic Equipment",
  "Construction Equipment, Materials & Hardware",
  "Fitness Equipment, Chemicals & Packing Materials",
];

export type ClientItem = { name: string; full: string; image?: string };

export const clients: ClientItem[] = [
  {
    name: "BIWTA",
    full: "Bangladesh Inland Water Transport Authority",
    image: "/images/clients/biwta.png",
  },
  { name: "NSSD", full: "Naval Stores & Supply Depot" },
  {
    name: "Bangladesh Navy",
    full: "Bangladesh Navy",
    image: "/images/clients/bangladesh-navy.png",
  },
  {
    name: "CPA",
    full: "Chittagong Port Authority",
    image: "/images/clients/chittagong-port.png",
  },
  {
    name: "MPA",
    full: "Mongla Port Authority",
    image: "/images/clients/mongla-port.png",
  },
  { name: "PPA", full: "Payra Port Authority" },
  { name: "DGDP", full: "Directorate General of Defence Purchase" },
  {
    name: "Dhaka Cantonment Board",
    full: "Dhaka Cantonment Board",
    image: "/images/clients/dhaka-cantonment-board.png",
  },
  {
    name: "MES",
    full: "Military Engineering Services",
    image: "/images/clients/mes.png",
  },
  {
    name: "RAJUK",
    full: "Rajdhani Unnayan Kartripakkha",
    image: "/images/clients/rajuk.png",
  },
  {
    name: "PWD",
    full: "Public Works Department",
    image: "/images/clients/pwd.png",
  },
  { name: "RHD", full: "Roads and Highways Department" },
  {
    name: "BADC",
    full: "Bangladesh Agricultural Development Corporation",
    image: "/images/clients/badc.png",
  },
  {
    name: "Coast Guard",
    full: "Bangladesh Coast Guard",
    image: "/images/clients/coast-guard.png",
  },
  { name: "HED", full: "Health Engineering Department" },
  {
    name: "DPHE",
    full: "Department of Public Health Engineering",
    image: "/images/clients/dphe.png",
  },
  {
    name: "CAAB",
    full: "Civil Aviation Authority of Bangladesh",
    image: "/images/clients/CAAB.png",
  },
  {
    name: "Govt. of Bangladesh",
    full: "Government of the People's Republic of Bangladesh",
    image: "/images/clients/bangladesh-govt.png",
  },
];

export const bankingPartners = [
  "Trust Bank",
  "AB Bank",
  "City Bank",
  "NRBC Bank",
  "Pubali Bank",
];

export const stats = [
  { value: "55+", label: "Projects Delivered" },
  { value: "2021", label: "Founded — Operating Since" },
  { value: "17+", label: "Government & Defense Clients" },
  { value: "Nationwide", label: "Coverage Across Bangladesh" },
];

export const capability = [
  { title: "Emergency Work", evidence: "6-day execution turnaround" },
  { title: "River Protection", evidence: "10+ geo-bag dumping projects" },
  {
    title: "Marine Equipment",
    evidence: "Buoy, chain & navigation-tool installation",
  },
  { title: "Repair Work", evidence: "Pontoon & ferry-ghat restoration" },
];

export const executionStrengths = [
  "Fast mobilization",
  "Multi-location operation",
  "Government coordination capability",
];

export const riskHandling = [
  "High water-flow conditions",
  "Emergency execution pressure",
  "Remote logistics",
];

export const licenses = [
  "VAT Registration — NBR",
  "1st Class Contractor License",
  "Import Registration Certificate (IRC)",
  "Trade License — Dhaka Cantonment Board",
  "DGDP Enlisted Local Supplier",
  "CAAB Enlisted Contractor — Class A (Unlimited)",
  "Electrical Contractor License — Class A, B & C",
];

export const bankSolvency = {
  banks: ["Trust Bank PLC", "NRBC Bank"],
  note: "Official financial solvency reference letters on file from both banks.",
};

export const companyInfo = {
  name: "M/S A H S Enterprise",
  shortName: "AHS Enterprise",
  tagline: "We Build Tomorrow",
  designation: "1st Class Contractor, Importer, Exporter, Supplier & Indenting",
  phones: ["+88 01625-555700", "+88 01725-555700"],
  email: "ahsenterprise21@gmail.com",
  // Kept for backwards compatibility. Always derived from offices[0].address
  // wherever it is displayed — edit the Offices list instead.
  address: "W-20/2, 67/1, China Town, VIP Road, Naya Palton, Dhaka-1000.",
  proprietor: "Md. Sohanur Rahman Sohan",
  proprietorTitle: "Proprietor, AHS Enterprise",
};

export type CompanyInfo = typeof companyInfo;
export type Stat = (typeof stats)[number];
export type CapabilityItem = (typeof capability)[number];
export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "Is AHS Enterprise an enlisted government supplier?",
    a: "Yes. We are enlisted with the Directorate General of Defence Purchase (DGDP) as a local-currency supplier, enlisted with the Civil Aviation Authority of Bangladesh (CAAB) as a Class A Unlimited (Civil & E/M) contractor, and hold active enlistments with BIWTA, RAJUK, PWD, RHD and several other government authorities.",
  },
  {
    q: "What licenses and registrations do you hold?",
    a: "VAT registration with the NBR, a 1st Class Contractor License, an Import Registration Certificate (IRC), a Trade License from Dhaka Cantonment Board, DGDP enlistment, CAAB enlistment, and an Electrical Contractor License (Class A, B & C) from the Electricity Licensing Board.",
  },
  {
    q: "Can you take on emergency or short-notice work?",
    a: "Yes \u2014 several of our completed projects were emergency mobilisations, including riverbank geo-bag protection work completed in as little as 4 to 6 days from notice.",
  },
  {
    q: "Which parts of Bangladesh do you operate in?",
    a: "We've delivered projects across Dhaka, Aricha, Barishal, Chittagong, Sirajganj, Dinajpur, Narayanganj and Patuakhali \u2014 our coverage is effectively nationwide, coordinated from our Dhaka Cantonment office.",
  },
  {
    q: "Do you supply directly to the Bangladesh Navy or other armed forces?",
    a: "Yes. We are a proud parts supplier for BNS Joyjatra and are enlisted with DGDP across categories including motor transport, signal & electrical equipment, medical equipment, clothing & camp equipment, and construction hardware.",
  },
  {
    q: "Can you provide proof of financial standing?",
    a: `Yes \u2014 we hold official financial solvency reference letters from ${bankSolvency.banks.join(" and ")}, available on request for tender pre-qualification.`,
  },
  {
    q: "Do you only work with government clients?",
    a: "No. Alongside our government and defense work, we also take on private development \u2014 for example, our ongoing residential tower project at Jolshiri Abashon.",
  },
  {
    q: "How do I submit a tender enquiry or request a quote?",
    a: "Reach us by phone, WhatsApp or email on the Contact page, or send your enquiry through the contact form. We typically respond within one business day.",
  },
];

export type Office = {
  label: string;
  address: string;
  phone?: string;
  mapQuery?: string;
};

export type TimelineEntry = { year: string; items: string[] };
export type Credential = { title: string; issuer: string; scope: string; icon: string };
export type WhyPoint = { title: string; detail: string };
export type ProcessStep = { step: string; title: string; detail: string };

export type ProprietorMessage = {
  heading: string;
  subheading: string;
  photo: string;
  paragraphs: string[];
  closing: string;
  bengaliHeading: string;
  bengaliParagraphs: string[];
};

export type SiteSettings = {
  company: CompanyInfo;
  offices: Office[];
  stats: Stat[];
  capability: CapabilityItem[];
  executionStrengths: string[];
  riskHandling: string[];
  licenses: string[];
  bankSolvency: { banks: string[]; note: string };
  bankingPartners: string[];
  defenseSupplyGroups: string[];
  faqs: FaqItem[];
  timeline: TimelineEntry[];
  whyChooseUs: WhyPoint[];
  howWeWork: ProcessStep[];
  credentials: Credential[];
  proprietorMessage: ProprietorMessage;
};

// Timeline seeded only from completed/ongoing projects already listed above.
// TODO(owner): confirm the founding year and the dates of each enlistment, then
// add them to this timeline. Do not add unverified dates.
export const timeline: TimelineEntry[] = [
  {
    year: "2021",
    items: [
      "Damp-proofing, tiles & stair railing at BIWTA Bhaban, Dhaka",
      "Emergency geo-bag dumping at Aricha Ferryghat",
      "New ferry ghat construction and annual maintenance at Narayanganj",
    ],
  },
  {
    year: "2022",
    items: [
      "Approach road to the Padma Bridge, Munshiganj",
      "Approach road and inaugural gate at Baghabari River Port, Sirajganj",
      "Riverbank repair on the Tulai River, Dinajpur (83 days)",
    ],
  },
  {
    year: "2023",
    items: [
      "Extension of low-water ferry ghats at Shimulia (Mawa)",
      "Procurement of 200 H & O navigation marks for Sirajganj",
    ],
  },
  {
    year: "2024",
    items: [
      "Stationery supply for the passing parade at BNS Sher-E-Bangla, Patuakhali",
      "Ancillary civil works at the Mongla Pilot House",
    ],
  },
  {
    year: "2025",
    items: [
      "Pontoon repair works (SP-385), Barishal",
      "Residential tower at Jolshiri Abashon, Dhaka (ongoing)",
    ],
  },
];

export const proprietorMessage: ProprietorMessage = {
  heading: "Built on Trust, Delivered with Precision",
  subheading: "Welcome to M/S A H S Enterprise",
  photo: "/images/people/MdSohanurRahmanSohan.jpeg",
  paragraphs: [
    "Our journey began with a vision - \"We Build Tomorrow\" - to establish a benchmark of unyielding reliability, top-tier quality, and strategic innovation in Bangladesh's most vital sectors. Through M/S. AHS Enterprise we have had the distinct honour of serving as a trusted partner to both the military and civil sectors of our nation.",
    "From executing high-stakes strategic projects for the Bangladesh Armed Forces through the DGDP, to delivering critical maritime solutions for the Bangladesh Navy (including the prestigious supply of submarine machinery spares), our track record speaks for itself. Our deep-rooted enlistments with premier national authorities - such as Dhaka Cantonment Board, BIWTA, PWD, HED, CAAB, MES, BADC, RAJUK, DPHE, CPA and PPA - reflect a legacy built entirely on trust and flawless execution.",
    "The same discipline now runs across the AHS Group, alongside our sister concerns AHS Properties & Development Ltd. in real estate and Sun Solaris Limited in renewable energy.",
  ],
  closing:
    "To our clients, partners, and stakeholders: thank you for your unwavering trust. We pledge to keep delivering superior results and building a stronger future for Bangladesh.",
  bengaliHeading: "",
  // TODO(owner): proofread / complete Bengali. The Bengali paragraphs from the
  // source component were not supplied with this change, so they are seeded
  // empty — the Bengali block stays hidden on the site until text is added here
  // or in the admin panel. Do not machine-translate.
  bengaliParagraphs: [],
};

export const whyChooseUs: WhyPoint[] = [
  {
    title: "Emergency mobilisation",
    detail: "Crews, equipment and materials can be moved to site at short notice when a bank or structure is failing.",
  },
  {
    title: "Tender-ready documentation",
    detail: "Enlistments, licenses and financial references are kept current for government and defense procurement.",
  },
  {
    title: "Nationwide reach",
    detail: "Projects delivered across river ports, coastal districts and city sites, coordinated from Dhaka.",
  },
  {
    title: "One accountable team",
    detail: "The same team handles survey, procurement, execution and handover — no gaps between contractors.",
  },
];

export const howWeWork: ProcessStep[] = [
  {
    step: "01",
    title: "Tender / enquiry",
    detail: "Share the scope, drawings or tender documents and the delivery timeline you are working to.",
  },
  {
    step: "02",
    title: "Survey & quotation",
    detail: "We assess the site, confirm quantities and submit a costed, itemised quotation.",
  },
  {
    step: "03",
    title: "Mobilisation",
    detail: "Crews, plant and materials are arranged and moved to site once the work order is confirmed.",
  },
  {
    step: "04",
    title: "Execution",
    detail: "Work is carried out under supervision with progress reporting and quality checks.",
  },
  {
    step: "05",
    title: "Handover",
    detail: "Completion documents, measurements and a joint site walk-through close out the engagement.",
  },
];

export const credentials: Credential[] = [
  {
    title: "DGDP Enlisted Supplier",
    issuer: "Directorate General of Defence Purchase",
    scope: "10 supply categories",
    icon: "shield",
  },
  {
    title: "CAAB Enlisted Contractor",
    issuer: "Civil Aviation Authority of Bangladesh",
    scope: "Civil & E/M works",
    icon: "plane",
  },
  {
    title: "Electrical Contractor License",
    issuer: "Electricity Licensing Board",
    scope: "Class A, B & C",
    icon: "zap",
  },
  {
    title: "Import Registration Certificate (IRC)",
    issuer: "Chief Controller of Imports & Exports",
    scope: "Importer registration",
    icon: "globe",
  },
  {
    title: "Trade License",
    issuer: "Dhaka Cantonment Board",
    scope: "Trade & business operations",
    icon: "file-badge",
  },
  {
    title: "VAT Registration",
    issuer: "National Board of Revenue (NBR)",
    scope: "VAT-registered supplier",
    icon: "receipt",
  },
  {
    title: "Bank Solvency",
    issuer: "Trust Bank PLC · NRBC Bank",
    scope: "Financial solvency reference",
    icon: "landmark",
  },
];

// The first office is the primary one. Spellings are used as supplied by the
// owner — do not "correct" them.
export const defaultOffices: Office[] = [
  {
    label: "Corporate HQ",
    address: "W-20/2, 67/1, China Town, VIP Road, Naya Palton, Dhaka-1000.",
  },
  {
    label: "Military Office",
    address: "2nd Floor, Rajanigandha Tower, Dhaka Cantonment",
  },
  {
    label: "Lakeside Complex",
    address: "Plot-42, Road-505, Sector-16, Jolshiri Abashon",
  },
];

export const defaultSettings: SiteSettings = {
  company: companyInfo,
  offices: defaultOffices,
  stats,
  capability,
  executionStrengths,
  riskHandling,
  licenses,
  bankSolvency,
  bankingPartners,
  defenseSupplyGroups,
  faqs,
  timeline,
  whyChooseUs,
  howWeWork,
  credentials,
  proprietorMessage,
};
