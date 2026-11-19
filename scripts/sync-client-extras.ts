/**
 * One-time fix: copies extra client fields (e.g. logo image paths) from lib/data.ts
 * into the existing MongoDB client documents. Names, order and visibility set in the
 * admin panel are NOT changed.
 *
 *   npm run sync-clients
 */
import mongoose from "mongoose";
import { connectDB } from "../lib/mongodb";
import { clients } from "../lib/data";
import { ClientModel } from "../lib/models/Client";

const BASE = new Set(["name", "full", "order", "published"]);

async function main() {
  await connectDB();
  let updated = 0;
  const seen = new Set<string>();

  for (const c of clients as unknown as Record<string, unknown>[]) {
    const extra = Object.fromEntries(Object.entries(c).filter(([k, v]) => !BASE.has(k) && v !== undefined));
    Object.keys(extra).forEach((k) => seen.add(k));
    if (!Object.keys(extra).length) continue;
    // native driver call: not filtered by the Mongoose schema
    const res = await ClientModel.collection.updateOne({ name: c.name }, { $set: extra });
    if (res.matchedCount) updated++;
    else console.log(`  not in database (skipped): ${String(c.name)}`);
  }

  console.log(`Extra fields found in data.ts: ${seen.size ? [...seen].join(", ") : "NONE"}`);
  console.log(`Client documents updated: ${updated} of ${clients.length}`);
  if (!seen.size) console.log("lib/data.ts clients have no logo/image field — send me one client entry from it.");
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error("Failed:", err.message ?? err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
