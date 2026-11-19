import { getSettings } from "@/lib/content";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">Settings</h1>
      <p className="mb-8 mt-2 text-sm text-ink-muted">Company details and site-wide content. Changes go live as soon as you save.</p>
      <SettingsForm initial={settings} />
    </div>
  );
}
