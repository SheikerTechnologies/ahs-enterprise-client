import mongoose, { Schema, type InferSchemaType } from "mongoose";

// Schema only — authentication (password hashing, sessions) is built with the admin panel.
const AdminUserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "editor"], default: "editor" },
    active: { type: Boolean, default: true },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

export type AdminUserDoc = InferSchemaType<typeof AdminUserSchema>;
export const AdminUserModel =
  (mongoose.models.AdminUser as mongoose.Model<AdminUserDoc>) ||
  mongoose.model<AdminUserDoc>("AdminUser", AdminUserSchema);
