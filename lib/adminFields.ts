import type { Field } from "@/components/admin/EntityForm";

export const serviceFields: Field[] = [
  { name: "title", label: "Title", required: true },
  { name: "short", label: "Short description", required: true, hint: "One line shown on the card." },
  { name: "description", label: "Full description", type: "textarea", required: true },
  { name: "code", label: "Code", placeholder: "auto (e.g. S9)", hint: "Leave blank to generate automatically." },
  { name: "order", label: "Order", type: "number", hint: "Lower numbers appear first. Blank = last." },
];

export const clientFields: Field[] = [
  { name: "name", label: "Short name", required: true, placeholder: "BIWTA" },
  { name: "full", label: "Full name", required: true, placeholder: "Bangladesh Inland Water Transport Authority" },
  { name: "image", label: "Logo", type: "image", folder: "clients", hint: "Upload a logo (PNG with transparent background works best), or leave empty for no logo." },
  { name: "order", label: "Order", type: "number", hint: "Lower numbers appear first. Blank = last." },
];
