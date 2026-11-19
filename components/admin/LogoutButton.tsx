"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
      }}
      className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-amber transition-colors"
    >
      <LogOut size={14} />
      Sign out
    </button>
  );
}
