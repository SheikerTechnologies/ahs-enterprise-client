import { NextResponse } from "next/server";
import mongoose, { type Model } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectDB } from "./mongodb";
import { requireAdmin } from "./adminGuard";

type Parsed<T> = { data?: T; error?: string };
type Ctx = { params: Promise<{ id: string }> };

type Config<T extends { order?: number }> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: Model<any>;
  parse: (body: Record<string, unknown>) => Parsed<T>;
  /** public pages to refresh after a change */
  paths: string[];
  duplicateMessage: string;
  /** fill in generated values (e.g. an automatic code) before inserting */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareCreate?: (data: T, model: Model<any>) => Promise<T>;
  /** fields that keep their old value when left blank on edit */
  keepIfBlank?: string[];
};

export function crudHandlers<T extends { order?: number }>(cfg: Config<T>) {
  const refresh = () => cfg.paths.forEach((p) => revalidatePath(p));
  const dup = (err: unknown) => (err as { code?: number }).code === 11000;

  async function create(req: Request) {
    const { error } = await requireAdmin(req);
    if (error) return error;
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const parsed = cfg.parse(body);
    if (!parsed.data) return NextResponse.json({ error: parsed.error }, { status: 400 });

    try {
      await connectDB();
      let data = { ...parsed.data };
      if (cfg.prepareCreate) data = await cfg.prepareCreate(data, cfg.model);
      if (data.order === undefined) {
        const last = await cfg.model.findOne({}, { order: 1 }).sort({ order: -1 }).lean();
        data.order = ((last as { order?: number } | null)?.order ?? 0) + 1;
      }
      const created = await cfg.model.create(data);
      refresh();
      return NextResponse.json({ ok: true, id: String(created._id) });
    } catch (err) {
      if (dup(err)) return NextResponse.json({ error: cfg.duplicateMessage }, { status: 409 });
      console.error("[admin crud] create failed:", err);
      return NextResponse.json({ error: "Could not save." }, { status: 500 });
    }
  }

  async function update(req: Request, { params }: Ctx) {
    const { error } = await requireAdmin(req);
    if (error) return error;
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const parsed = cfg.parse(body);
    if (!parsed.data) return NextResponse.json({ error: parsed.error }, { status: 400 });

    try {
      await connectDB();
      const set: Record<string, unknown> = { ...parsed.data };
      for (const k of cfg.keepIfBlank ?? []) if (set[k] === "") delete set[k];
      if (set.order === undefined) delete set.order;
      const res = await cfg.model.updateOne({ _id: id }, { $set: set }, { runValidators: true });
      if (!res.matchedCount) return NextResponse.json({ error: "Not found." }, { status: 404 });
      refresh();
      return NextResponse.json({ ok: true });
    } catch (err) {
      if (dup(err)) return NextResponse.json({ error: cfg.duplicateMessage }, { status: 409 });
      console.error("[admin crud] update failed:", err);
      return NextResponse.json({ error: "Could not save." }, { status: 500 });
    }
  }

  async function remove(req: Request, { params }: Ctx) {
    const { error } = await requireAdmin(req);
    if (error) return error;
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });
    try {
      await connectDB();
      const removed = await cfg.model.findByIdAndDelete(id).lean();
      if (!removed) return NextResponse.json({ error: "Not found." }, { status: 404 });
      refresh();
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[admin crud] delete failed:", err);
      return NextResponse.json({ error: "Could not delete." }, { status: 500 });
    }
  }

  return { create, update, remove };
}
