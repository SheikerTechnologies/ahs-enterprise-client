import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, FolderKanban, Wrench, Building2, Mail, Settings } from "lucide-react";
import { getCurrentAdmin } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, ready: true },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, ready: true },
  { href: "/admin/services", label: "Services", icon: Wrench, ready: true },
  { href: "/admin/clients", label: "Clients", icon: Building2, ready: true },
  { href: "/admin/messages", label: "Messages", icon: Mail, ready: true },
  { href: "/admin/settings", label: "Settings", icon: Settings, ready: true },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-fog md:grid md:grid-cols-[240px_1fr]">
      <aside className="bg-ink px-5 py-6 text-white md:min-h-screen">
        <p className="font-display text-xl font-extrabold uppercase tracking-wide">
          AHS <span className="text-amber">Admin</span>
        </p>
        <nav className="mt-8 space-y-1" aria-label="Admin">
          {nav.map(({ href, label, icon: Icon, ready }) =>
            ready ? (
              <Link key={href} href={href} className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-white/85 hover:bg-white/10">
                <Icon size={16} className="text-amber" />
                {label}
              </Link>
            ) : (
              <span key={href} className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-white/30">
                <Icon size={16} />
                {label}
                <span className="ml-auto font-mono text-[0.6rem] uppercase tracking-widest">soon</span>
              </span>
            )
          )}
        </nav>
        <div className="mt-10 border-t border-white/10 pt-5">
          <p className="text-sm text-white/80">{admin.name}</p>
          <p className="mb-4 text-xs text-white/40">{admin.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <main id="main" className="p-6 md:p-10">{children}</main>
    </div>
  );
}
