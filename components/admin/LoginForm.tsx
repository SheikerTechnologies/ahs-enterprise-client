"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-sm border border-white/15 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-amber transition-colors";
  const label = "font-mono text-[0.68rem] uppercase tracking-widest text-white/50";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block space-y-2">
        <span className={label}>Email</span>
        <input name="email" type="email" required autoComplete="username" className={field} />
      </label>
      <label className="block space-y-2">
        <span className={label}>Password</span>
        <input name="password" type="password" required autoComplete="current-password" className={field} />
      </label>
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-sm bg-amber px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-ink hover:bg-white transition-colors disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <p role="alert" aria-live="polite" className="min-h-5 text-sm text-buoy">
        {error}
      </p>
    </form>
  );
}
