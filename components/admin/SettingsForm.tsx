"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { SiteSettings } from "@/lib/data";

const input = "w-full rounded-sm border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-buoy";
const label = "mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted";

function Card({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="rounded-sm border border-ink/10 bg-white p-6">
      <h2 className="font-display text-lg font-bold uppercase tracking-tight text-ink">{title}</h2>
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Text({ name, text, value, onChange, hint }: { name: string; text: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <div>
      <label htmlFor={name} className={label}>{text}</label>
      <input id={name} className={input} value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

function Lines({ name, text, hint, value, onChange, rows = 5 }: { name: string; text: string; hint?: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label htmlFor={name} className={label}>{text}</label>
      <textarea id={name} className={input} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      <p className="mt-1 text-xs text-ink-muted">{hint ?? "One item per line."}</p>
    </div>
  );
}

type Row = Record<string, string>;

function Rows({ items, onChange, fields, addText }: {
  items: Row[];
  onChange: (rows: Row[]) => void;
  fields: { key: string; label: string; area?: boolean }[];
  addText: string;
}) {
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {items.map((row, i) => (
        <div key={i} className="rounded-sm border border-ink/10 bg-fog/50 p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.area ? "sm:col-span-2" : ""}>
                <label className={label}>{f.label}</label>
                {f.area ? (
                  <textarea className={input} rows={3} value={row[f.key]} onChange={(e) => onChange(items.map((r, j) => (j === i ? { ...r, [f.key]: e.target.value } : r)))} />
                ) : (
                  <input className={input} value={row[f.key]} onChange={(e) => onChange(items.map((r, j) => (j === i ? { ...r, [f.key]: e.target.value } : r)))} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3 text-ink-muted">
            <button type="button" aria-label="Move up" onClick={() => move(i, -1)} className="hover:text-ink"><ArrowUp size={15} /></button>
            <button type="button" aria-label="Move down" onClick={() => move(i, 1)} className="hover:text-ink"><ArrowDown size={15} /></button>
            <button type="button" aria-label="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))} className="ml-auto hover:text-buoy"><Trash2 size={15} /></button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, Object.fromEntries(fields.map((f) => [f.key, ""]))])}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-buoy"
      >
        <Plus size={14} /> {addText}
      </button>
    </div>
  );
}

const join = (a: string[]) => a.join("\n");
const split = (s: string) => s.split("\n");

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [company, setCompany] = useState({ ...initial.company, phones: join(initial.company.phones) });
  const [offices, setOffices] = useState<Row[]>(
    initial.offices.map((o) => ({ label: o.label, address: o.address, phone: o.phone ?? "", mapQuery: o.mapQuery ?? "" }))
  );
  const [stats, setStats] = useState<Row[]>(initial.stats.map((s) => ({ ...s })));
  const [capability, setCapability] = useState<Row[]>(initial.capability.map((s) => ({ ...s })));
  const [execution, setExecution] = useState(join(initial.executionStrengths));
  const [risk, setRisk] = useState(join(initial.riskHandling));
  const [licenses, setLicenses] = useState(join(initial.licenses));
  const [banks, setBanks] = useState(join(initial.bankSolvency.banks));
  const [bankNote, setBankNote] = useState(initial.bankSolvency.note);
  const [partners, setPartners] = useState(join(initial.bankingPartners));
  const [groups, setGroups] = useState(join(initial.defenseSupplyGroups));
  const [faqs, setFaqs] = useState<Row[]>(initial.faqs.map((f) => ({ ...f })));
  const [timeline, setTimeline] = useState<Row[]>(
    initial.timeline.map((t) => ({ year: t.year, items: join(t.items) }))
  );
  const [whyChooseUs, setWhyChooseUs] = useState<Row[]>(initial.whyChooseUs.map((w) => ({ ...w })));
  const [howWeWork, setHowWeWork] = useState<Row[]>(initial.howWeWork.map((w) => ({ ...w })));
  const [credentials, setCredentials] = useState<Row[]>(initial.credentials.map((c) => ({ ...c })));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const setC = (k: keyof typeof company, v: string) => setCompany((p) => ({ ...p, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: { ...company, phones: split(company.phones) },
          offices,
          stats,
          capability,
          executionStrengths: split(execution),
          riskHandling: split(risk),
          licenses: split(licenses),
          bankSolvency: { banks: split(banks), note: bankNote },
          bankingPartners: split(partners),
          defenseSupplyGroups: split(groups),
          faqs,
          timeline: timeline.map((t) => ({ year: t.year, items: split(t.items) })),
          whyChooseUs,
          howWeWork,
          credentials,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setMsg({ ok: true, text: "Saved. The website has been updated." });
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      <Card title="Company">
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="c-name" text="Full name" value={company.name} onChange={(v) => setC("name", v)} />
          <Text name="c-short" text="Short name" value={company.shortName} onChange={(v) => setC("shortName", v)} />
          <Text name="c-tag" text="Tagline" value={company.tagline} onChange={(v) => setC("tagline", v)} />
          <Text name="c-email" text="Email" value={company.email} onChange={(v) => setC("email", v)} />
        </div>
        <Text name="c-desig" text="Designation (shown under the name)" value={company.designation} onChange={(v) => setC("designation", v)} />
        <Lines name="c-phones" text="Phone numbers" rows={3} value={company.phones} onChange={(v) => setC("phones", v)} hint="One per line. The first number is also used for the WhatsApp button, so write it like +88 01625-555700." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="c-prop" text="Proprietor name" value={company.proprietor} onChange={(v) => setC("proprietor", v)} />
          <Text name="c-proptitle" text="Proprietor title" value={company.proprietorTitle} onChange={(v) => setC("proprietorTitle", v)} />
        </div>
      </Card>

      <Card
        title="Offices"
        hint="Shown on the Contact page, footer and map. The first office is the primary address used on the rest of the site. Use the arrows to reorder."
      >
        <Rows
          items={offices}
          onChange={setOffices}
          addText="Add office"
          fields={[
            { key: "label", label: "Label" },
            { key: "phone", label: "Phone (optional)" },
            { key: "address", label: "Address", area: true },
            { key: "mapQuery", label: "Map search query (optional — defaults to the address)", area: true },
          ]}
        />
      </Card>

      <Card title="Homepage numbers" hint="The figures in the strip under the hero (e.g. 55+ Projects Delivered). Use the arrows to reorder.">
        <Rows items={stats} onChange={setStats} addText="Add number" fields={[{ key: "value", label: "Number / text" }, { key: "label", label: "Label" }]} />
      </Card>

      <Card title="Capability" hint="The four cards on the Services page.">
        <Rows items={capability} onChange={setCapability} addText="Add card" fields={[{ key: "title", label: "Title" }, { key: "evidence", label: "Detail line" }]} />
        <Lines name="exec" text="Execution strength" rows={4} value={execution} onChange={setExecution} />
        <Lines name="risk" text="Risk handling" rows={4} value={risk} onChange={setRisk} />
      </Card>

      <Card title="Licenses &amp; finance">
        <Lines name="lic" text="Licenses and certifications" rows={8} value={licenses} onChange={setLicenses} />
        <Lines name="banks" text="Banks that issued solvency letters" rows={3} value={banks} onChange={setBanks} />
        <Text name="bnote" text="Solvency note" value={bankNote} onChange={setBankNote} />
        <Lines name="partners" text="Banking partners" rows={5} value={partners} onChange={setPartners} />
        <Lines name="groups" text="DGDP-enlisted supply categories" rows={10} value={groups} onChange={setGroups} />
      </Card>

      <Card title="Company timeline" hint="Shown on the About page. Add the founding year and enlistment dates only once you have confirmed them.">
        <Rows
          items={timeline}
          onChange={setTimeline}
          addText="Add year"
          fields={[
            { key: "year", label: "Year" },
            { key: "items", label: "Milestones", area: true },
          ]}
        />
      </Card>

      <Card title="Why choose us" hint="The short points shown on the About page.">
        <Rows
          items={whyChooseUs}
          onChange={setWhyChooseUs}
          addText="Add point"
          fields={[
            { key: "title", label: "Title" },
            { key: "detail", label: "Detail" },
          ]}
        />
      </Card>

      <Card title="How we work" hint="The steps from tender/enquiry to handover, shown on the About page.">
        <Rows
          items={howWeWork}
          onChange={setHowWeWork}
          addText="Add step"
          fields={[
            { key: "step", label: "Step number" },
            { key: "title", label: "Title" },
            { key: "detail", label: "Detail", area: true },
          ]}
        />
      </Card>

      <Card title="Certificate wall" hint="Shown on the Clients page. Titles, issuers and scopes only — never add license numbers, TIN/BIN, validity dates or personal data.">
        <Rows
          items={credentials}
          onChange={setCredentials}
          addText="Add certificate"
          fields={[
            { key: "title", label: "Title" },
            { key: "issuer", label: "Issuer" },
            { key: "scope", label: "Scope" },
            { key: "icon", label: "Icon (shield, plane, zap, globe, file-badge, receipt, landmark)" },
          ]}
        />
      </Card>

      <Card title="FAQ" hint="Shown on the FAQ page and in Google search results.">
        <Rows items={faqs} onChange={setFaqs} addText="Add question" fields={[{ key: "q", label: "Question", area: false }, { key: "a", label: "Answer", area: true }]} />
      </Card>

      <div className="sticky bottom-0 -mx-1 flex items-center gap-4 bg-fog/95 px-1 py-4 backdrop-blur">
        <button type="submit" disabled={busy} className="rounded-sm bg-buoy px-8 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:bg-ink transition-colors disabled:opacity-60">
          {busy ? "Saving…" : "Save settings"}
        </button>
        <p role="status" aria-live="polite" className={`text-sm ${msg?.ok ? "text-chart-green" : "text-buoy"}`}>{msg?.text}</p>
      </div>
    </form>
  );
}
