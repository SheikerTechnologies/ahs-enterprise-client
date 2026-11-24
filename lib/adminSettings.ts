import type { SiteSettings } from "./data";

const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const arr = (v: unknown) => (Array.isArray(v) ? v : []);
const obj = (v: unknown) => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});

function lines(v: unknown, max: number, count: number) {
  return arr(v).map((x) => str(x, max)).filter(Boolean).slice(0, count);
}

type Result = { data?: SiteSettings; error?: string };

/** Validates the whole settings form. Every list is cleaned of blank entries. */
export function parseSettings(body: Record<string, unknown>): Result {
  const c = obj(body.company);
  const name = str(c.name, 120);
  const shortName = str(c.shortName, 60);
  const email = str(c.email, 200);
  const phones = lines(c.phones, 30, 5);

  if (!name) return { error: "Company: full name is required." };
  if (!shortName) return { error: "Company: short name is required." };
  if (!phones.length) return { error: "Company: add at least one phone number." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Company: enter a valid email address." };

  // Blank rows are dropped; the first office is the primary address.
  const offices = arr(body.offices)
    .map((s) => ({
      label: str(obj(s).label, 60),
      address: str(obj(s).address, 300),
      phone: str(obj(s).phone, 200),
      mapQuery: str(obj(s).mapQuery, 200),
    }))
    .filter((s) => s.label || s.address)
    .map((s) => ({
      label: s.label,
      address: s.address,
      ...(s.phone ? { phone: s.phone } : {}),
      ...(s.mapQuery ? { mapQuery: s.mapQuery } : {}),
    }));
  if (!offices.length) return { error: "Offices: add at least one office." };
  if (offices.length > 6) return { error: "Offices: keep at most 6 offices." };
  if (offices.some((s) => !s.label || !s.address)) return { error: "Offices: every office needs a label and an address." };

  const stats = arr(body.stats).map((s) => ({ value: str(obj(s).value, 30), label: str(obj(s).label, 80) })).filter((s) => s.value || s.label);
  if (stats.some((s) => !s.value || !s.label)) return { error: "Hero numbers: every row needs both a number and a label." };
  if (stats.length < 1 || stats.length > 8) return { error: "Hero numbers: keep between 1 and 8 rows." };

  const capability = arr(body.capability).map((s) => ({ title: str(obj(s).title, 60), evidence: str(obj(s).evidence, 150) })).filter((s) => s.title || s.evidence);
  if (capability.some((s) => !s.title || !s.evidence)) return { error: "Capability: every row needs a title and a detail line." };
  if (capability.length < 1 || capability.length > 8) return { error: "Capability: keep between 1 and 8 rows." };

  const faqs = arr(body.faqs).map((s) => ({ q: str(obj(s).q, 200), a: str(obj(s).a, 2000) })).filter((s) => s.q || s.a);
  if (faqs.some((s) => !s.q || !s.a)) return { error: "FAQ: every entry needs both a question and an answer." };
  if (faqs.length > 30) return { error: "FAQ: at most 30 entries." };

  const timeline = arr(body.timeline)
    .map((entry) => ({ year: str(obj(entry).year, 10), items: lines(obj(entry).items, 300, 12) }))
    .filter((entry) => entry.year || entry.items.length);
  if (timeline.some((entry) => !entry.year || !entry.items.length)) return { error: "Timeline: every year needs a label and at least one milestone." };
  if (timeline.length > 40) return { error: "Timeline: at most 40 years." };

  const whyChooseUs = arr(body.whyChooseUs)
    .map((s) => ({ title: str(obj(s).title, 80), detail: str(obj(s).detail, 300) }))
    .filter((s) => s.title || s.detail);
  if (whyChooseUs.some((s) => !s.title || !s.detail)) return { error: "Why choose us: every row needs a title and a detail line." };
  if (whyChooseUs.length > 8) return { error: "Why choose us: keep at most 8 rows." };

  const howWeWork = arr(body.howWeWork)
    .map((s) => ({ step: str(obj(s).step, 20), title: str(obj(s).title, 80), detail: str(obj(s).detail, 300) }))
    .filter((s) => s.step || s.title || s.detail);
  if (howWeWork.some((s) => !s.step || !s.title || !s.detail)) return { error: "How we work: every step needs a number, title and detail line." };
  if (howWeWork.length > 10) return { error: "How we work: keep at most 10 steps." };

  const credentials = arr(body.credentials)
    .map((s) => ({
      title: str(obj(s).title, 120),
      issuer: str(obj(s).issuer, 160),
      scope: str(obj(s).scope, 160),
      icon: str(obj(s).icon, 40),
    }))
    .filter((s) => s.title || s.issuer || s.scope);
  if (credentials.some((s) => !s.title || !s.issuer)) return { error: "Certificate wall: every certificate needs a title and an issuer." };
  if (credentials.length > 40) return { error: "Certificate wall: at most 40 certificates." };

  const bs = obj(body.bankSolvency);

  return {
    data: {
      company: {
        name,
        shortName,
        tagline: str(c.tagline, 120),
        designation: str(c.designation, 200),
        phones,
        email,
        // Derived from the primary office so it can never drift from offices[0].
        address: offices[0].address,
        proprietor: str(c.proprietor, 120),
        proprietorTitle: str(c.proprietorTitle, 120),
      },
      offices,
      stats,
      capability,
      executionStrengths: lines(body.executionStrengths, 200, 30),
      riskHandling: lines(body.riskHandling, 200, 30),
      licenses: lines(body.licenses, 200, 30),
      bankSolvency: { banks: lines(bs.banks, 100, 10), note: str(bs.note, 300) },
      bankingPartners: lines(body.bankingPartners, 100, 20),
      defenseSupplyGroups: lines(body.defenseSupplyGroups, 120, 30),
      faqs,
      timeline,
      whyChooseUs,
      howWeWork,
      credentials,
    },
  };
}
