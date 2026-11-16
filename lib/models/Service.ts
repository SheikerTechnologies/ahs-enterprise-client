import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ServiceSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    short: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type ServiceDoc = InferSchemaType<typeof ServiceSchema>;
export const ServiceModel =
  (mongoose.models.Service as mongoose.Model<ServiceDoc>) ||
  mongoose.model<ServiceDoc>("Service", ServiceSchema);
