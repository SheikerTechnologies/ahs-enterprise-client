"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const options = [
  { value: "read", label: "Mark as read" },
  { value: "replied", label: "Mark as replied" },
  { value: "archived", label: "Archive" },
];

export function MessageActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function call(method: "PATCH" | "DELETE", body?: object) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      if (method === "DELETE") router.push("/admin/messages");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {options
          .filter((o) => o.value !== status)
          .map((o) => (
            <button
              key={o.value}
              disabled={busy}
              onClick={() => call("PATCH", { status: o.value })}
              className="rounded-sm border border-ink/20 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-ink hover:border-ink disabled:opacity-60"
            >
              {o.label}
            </button>
          ))}
        <button
          disabled={busy}
          onClick={() => window.confirm("Delete this message permanently?") && call("DELETE")}
          className="ml-auto font-mono text-xs uppercase tracking-widest text-buoy hover:underline"
        >
          Delete
        </button>
      </div>
      <p role="alert" aria-live="polite" className="mt-3 min-h-5 text-sm text-buoy">{error}</p>
    </div>
  );
}
