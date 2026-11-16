import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    organisation: { type: String, trim: true, maxlength: 160, default: "" },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    status: { type: String, enum: ["new", "read", "replied", "archived"], default: "new", index: true },
    ip: { type: String, default: "" },
  },
  { timestamps: true }
);
ContactMessageSchema.index({ createdAt: -1 });

export type ContactMessageDoc = InferSchemaType<typeof ContactMessageSchema>;
export const ContactMessageModel =
  (mongoose.models.ContactMessage as mongoose.Model<ContactMessageDoc>) ||
  mongoose.model<ContactMessageDoc>("ContactMessage", ContactMessageSchema);
