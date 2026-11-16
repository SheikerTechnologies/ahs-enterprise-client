import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ClientSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    full: { type: String, required: true, trim: true },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type ClientDoc = InferSchemaType<typeof ClientSchema>;
export const ClientModel =
  (mongoose.models.Client as mongoose.Model<ClientDoc>) ||
  mongoose.model<ClientDoc>("Client", ClientSchema);
