import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    code: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    year: { type: String, required: true },
    duration: { type: String, required: true },
    scope: { type: String, required: true },
    status: { type: String, enum: ["COMPLETED", "ONGOING"], required: true, index: true },
    tagline: { type: String, default: "" },
    summary: { type: String, default: "" },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    details: {
      type: [new Schema({ label: String, value: String }, { _id: false })],
      default: [],
    },
    geo: {
      type: new Schema(
        { lat: Number, lng: Number, place: String },
        { _id: false }
      ),
      default: undefined,
    },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export type ProjectDoc = InferSchemaType<typeof ProjectSchema>;
export const ProjectModel =
  (mongoose.models.Project as mongoose.Model<ProjectDoc>) ||
  mongoose.model<ProjectDoc>("Project", ProjectSchema);
