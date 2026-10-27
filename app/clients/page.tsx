import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Clients } from "@/components/Clients";
import { TrustStrip } from "@/components/TrustStrip";
import { companyInfo } from "@/lib/data";
import { getClients, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: `Clients & Partners | ${companyInfo.shortName}`,
  description:
    "Government bodies, defense sectors, port authorities, banking partners and the licenses that back AHS Enterprise.",
};

export const revalidate = 300;

export default async function ClientsPage() {
  const [clients, settings] = await Promise.all([getClients(), getSettings()]);
  return (
    <>
      <Navbar />
      <main id="main" className="bg-paper">
        <PageHeader
          crumb="Clients"
          eyebrow="Trusted By"
          title="Clients & Partners"
          subtitle="A distinguished portfolio of government bodies, defense sectors, engineering authorities and banking partners."
        />
        <Clients clients={clients} />
        <TrustStrip
          bankingPartners={settings.bankingPartners}
          licenses={settings.licenses}
          bankSolvency={settings.bankSolvency}
        />
      </main>
      <Footer />
    </>
  );
}
