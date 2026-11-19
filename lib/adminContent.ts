const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const orderOf = (v: unknown) => {
  if (v === undefined || v === null || String(v).trim() === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : NaN;
};

export type ServiceInput = {
  code: string;
  title: string;
  short: string;
  description: string;
  published: boolean;
  order?: number;
};

export function parseService(b: Record<string, unknown>): { data?: ServiceInput; error?: string } {
  const title = str(b.title, 120);
  const short = str(b.short, 200);
  const description = str(b.description, 1000);
  const order = orderOf(b.order);
  if (!title) return { error: "Title is required." };
  if (!short) return { error: "Short description is required." };
  if (!description) return { error: "Full description is required." };
  if (Number.isNaN(order)) return { error: "Order must be a number." };
  return {
    data: { code: str(b.code, 10).toUpperCase(), title, short, description, published: b.published !== false, order },
  };
}

export type ClientInput = {
  name: string;
  full: string;
  image: string;
  published: boolean;
  order?: number;
};

export function parseClient(b: Record<string, unknown>): { data?: ClientInput; error?: string } {
  const name = str(b.name, 60);
  const full = str(b.full, 200);
  const image = str(b.image, 300);
  const order = orderOf(b.order);
  if (!name) return { error: "Short name is required (e.g. BIWTA)." };
  if (!full) return { error: "Full name is required." };
  if (image && !image.startsWith("/") && !/^https?:\/\//.test(image)) return { error: "Logo path must start with / or https://" };
  if (Number.isNaN(order)) return { error: "Order must be a number." };
  return { data: { name, full, image, published: b.published !== false, order } };
}
