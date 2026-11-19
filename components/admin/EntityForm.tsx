"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number";
  required?: boolean;
  placeholder?: string;
  hint?: string;
};

type Values = Record<string, string>;

const input = "w-full rounded-sm border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-buoy";
const label = "mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted";

export function EntityForm({
  apiBase,
  listHref,
  id,
  fields,
  initial,
  published: initialPublished = true,
}: {
  apiBase: string;
  listHref: string;
  id?: string;
  fields: Field[];
  initial?: Values;
  published?: boolean;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(() =>
    Object.fromEntries(fields.map((f) => [f.name, initial?.[f.name] ?? ""]))
  );
  const [published, setPublished] = useState(initialPublished);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function send(method: "POST" | "PUT" | "DELETE") {
    const res = await fetch(id ? `${apiBase}/${id}` : apiBase, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "DELETE" ? undefined : JSON.stringify({ ...values, published }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong.");
  }

  async function run(method: "POST" | "PUT" | "DELETE") {
    setBusy(true);
    setError("");
    try {
      await send(method);
      router.push(listHref);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        run(id ? "PUT" : "POST");
      }}
      className="max-w-2xl space-y-6"
    >
      <div className="grid gap-5 rounded-sm border border-ink/10 bg-white p-6">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className={label}>
              {f.label}
              {f.required ? " *" : ""}
            </label>
            {f.type === "textarea" ? (
              <textarea id={f.name} className={input} rows={4} required={f.required} placeholder={f.placeholder} value={values[f.name]} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} />
            ) : (
              <input id={f.name} className={input} type={f.type === "number" ? "number" : "text"} required={f.required} placeholder={f.placeholder} value={values[f.name]} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} />
            )}
            {f.hint && <p className="mt-1 text-xs text-ink-muted">{f.hint}</p>}
          </div>
        ))}
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-4 w-4" />
          Visible on the website
        </label>
      </div>

      <p role="alert" aria-live="polite" className="min-h-5 text-sm text-buoy">{error}</p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-3">
          <button type="submit" disabled={busy} className="rounded-sm bg-buoy px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:bg-ink transition-colors disabled:opacity-60">
            {busy ? "Saving…" : id ? "Save changes" : "Create"}
          </button>
          <button type="button" disabled={busy} onClick={() => router.push(listHref)} className="rounded-sm border border-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink hover:border-ink">
            Cancel
          </button>
        </div>
        {id && (
          <button
            type="button"
            disabled={busy}
            onClick={() => window.confirm("Delete permanently? This cannot be undone.") && run("DELETE")}
            className="font-mono text-xs uppercase tracking-widest text-buoy hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
