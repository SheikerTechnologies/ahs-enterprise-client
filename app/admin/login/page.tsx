import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getCurrentAdmin()) redirect("/admin");
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="absolute inset-0 blueprint-grid" />
      <div className="relative w-full max-w-sm">
        <p className="eyebrow flex items-center gap-3 text-amber">
          <span className="h-px w-8 bg-amber" />
          AHS Enterprise
        </p>
        <h1 className="font-display mt-4 mb-8 text-4xl font-extrabold uppercase tracking-tight text-white">
          Admin Sign In
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
