"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Trash2 } from "lucide-react";
import { prepareImage } from "@/lib/imageResize";

const input = "w-full rounded-sm border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-buoy";
const label = "mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted";

async function uploadFile(file: File, folder: string): Promise<string> {
  const prepared = await prepareImage(file);
  const form = new FormData();
  form.append("file", prepared);
  form.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.url as string;
}

function useUploader(folder: string, onUrl: (url: string) => void) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      for (const f of Array.from(files)) onUrl(await uploadFile(f, folder));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  }
  return { ref, busy, error, onFiles };
}

const btn =
  "inline-flex items-center gap-2 rounded-sm border border-ink/20 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-ink hover:border-ink disabled:opacity-60";

export function ImageField({
  id, text, value, onChange, folder = "projects", hint,
}: { id: string; text: string; value: string; onChange: (v: string) => void; folder?: string; hint?: string }) {
  const up = useUploader(folder, onChange);
  return (
    <div>
      <label htmlFor={id} className={label}>{text}</label>
      <div className="flex flex-wrap items-start gap-4">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-24 w-32 rounded-sm border border-ink/10 bg-fog object-contain" />
        ) : (
          <div className="flex h-24 w-32 items-center justify-center rounded-sm border border-dashed border-ink/20 text-xs text-ink-muted">No image</div>
        )}
        <div className="min-w-[220px] flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={up.busy} onClick={() => up.ref.current?.click()} className={btn}>
              <ImagePlus size={14} /> {up.busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className={`${btn} text-buoy`}>Remove</button>
            )}
          </div>
          <input ref={up.ref} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml" className="hidden" onChange={(e) => up.onFiles(e.target.files)} />
          <input id={id} className={input} value={value} onChange={(e) => onChange(e.target.value)} placeholder="…or paste an image path or link" />
          {hint && <p className="text-xs text-ink-muted">{hint}</p>}
          <p role="alert" aria-live="polite" className="min-h-4 text-xs text-buoy">{up.error}</p>
        </div>
      </div>
    </div>
  );
}

export function GalleryField({ value, onChange, folder = "projects" }: { value: string[]; onChange: (v: string[]) => void; folder?: string }) {
  const up = useUploader(folder, (url) => onChange([...value, url]));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div>
      <p className={label}>More gallery images</p>
      <div className="space-y-2">
        {value.map((url, i) => (
          <div key={i} className="flex items-center gap-3 rounded-sm border border-ink/10 bg-fog/50 p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-14 w-20 shrink-0 rounded-sm bg-white object-cover" />
            <input className={input} value={url} onChange={(e) => onChange(value.map((u, j) => (j === i ? e.target.value : u)))} />
            <button type="button" aria-label="Move up" onClick={() => move(i, -1)} className="text-ink-muted hover:text-ink"><ArrowUp size={15} /></button>
            <button type="button" aria-label="Move down" onClick={() => move(i, 1)} className="text-ink-muted hover:text-ink"><ArrowDown size={15} /></button>
            <button type="button" aria-label="Remove image" onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-ink-muted hover:text-buoy"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" disabled={up.busy} onClick={() => up.ref.current?.click()} className={btn}>
          <ImagePlus size={14} /> {up.busy ? "Uploading…" : "Upload images"}
        </button>
        <input ref={up.ref} type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml" className="hidden" onChange={(e) => up.onFiles(e.target.files)} />
        <p role="alert" aria-live="polite" className="text-xs text-buoy">{up.error}</p>
      </div>
    </div>
  );
}
