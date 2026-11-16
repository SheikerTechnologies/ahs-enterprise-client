import mongoose, { Schema } from "mongoose";

// Single document (key: "site") holding all site-wide editable content:
// company info, stats, capability, licenses, banking partners, FAQs, etc.
const SettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export type SettingDoc = { key: string; data: Record<string, unknown> };
export const SettingModel =
  (mongoose.models.Setting as mongoose.Model<SettingDoc>) ||
  mongoose.model<SettingDoc>("Setting", SettingSchema);
