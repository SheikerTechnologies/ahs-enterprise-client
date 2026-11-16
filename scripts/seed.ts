/**
 * Seeds MongoDB from the static content in lib/data.ts.
 *
 *   npm run seed            # insert only what's missing (safe to re-run, keeps admin edits)
 *   npm run seed -- --force # overwrite existing documents with the static data
 */
import mongoose from "mongoose";
import { connectDB } from "../lib/mongodb";
import { projects, services, clients, defaultSettings } from "../lib/data";
import { projectGeo } from "../lib/projectGeo";
import { ProjectModel } from "../lib/models/Project";
import { ServiceModel } from "../lib/models/Service";
import { ClientModel } from "../lib/models/Client";
import { SettingModel } from "../lib/models/Setting";
import { ContactMessageModel } from "../lib/models/ContactMessage";
import { AdminUserModel } from "../lib/models/AdminUser";

const force = process.argv.includes("--force");
const op = force ? "$set" : "$setOnInsert";

async function main() {
  await connectDB();
  console.log(`Connected. Mode: ${force ? "FORCE (overwrite)" : "insert-missing"}`);

  const projectOps = projects.map((p, i) => ({
    updateOne: {
      filter: { slug: p.slug },
      update: { [op]: { ...p, geo: p.geo ?? projectGeo[p.slug], order: i, published: true } },
      upsert: true,
    },
  }));
  const serviceOps = services.map((s, i) => ({
    updateOne: { filter: { code: s.code }, update: { [op]: { ...s, order: i, published: true } }, upsert: true },
  }));
  const clientOps = clients.map((c, i) => ({
    updateOne: { filter: { name: c.name }, update: { [op]: { ...c, order: i, published: true } }, upsert: true },
  }));

  const [pr, sr, cr] = await Promise.all([
    ProjectModel.bulkWrite(projectOps),
    ServiceModel.bulkWrite(serviceOps),
    ClientModel.bulkWrite(clientOps),
  ]);
  await SettingModel.updateOne(
    { key: "site" },
    { [op]: { key: "site", data: defaultSettings } },
    { upsert: true }
  );

  // make sure indexes (unique slug/code/email…) exist
  await Promise.all([
    ProjectModel.syncIndexes(),
    ServiceModel.syncIndexes(),
    ClientModel.syncIndexes(),
    SettingModel.syncIndexes(),
    ContactMessageModel.syncIndexes(),
    AdminUserModel.syncIndexes(),
  ]);

  console.log(`Projects: ${pr.upsertedCount} inserted, ${pr.modifiedCount} updated (of ${projects.length})`);
  console.log(`Services: ${sr.upsertedCount} inserted, ${sr.modifiedCount} updated (of ${services.length})`);
  console.log(`Clients:  ${cr.upsertedCount} inserted, ${cr.modifiedCount} updated (of ${clients.length})`);
  console.log("Settings: site document ready");
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error("Seed failed:", err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
