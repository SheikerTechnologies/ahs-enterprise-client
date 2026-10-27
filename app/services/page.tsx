import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/Services";
import { Capability } from "@/components/Capability";
import { companyInfo } from "@/lib/data";
import { getServices, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: `Services | ${companyInfo.shortName}`,
  description:
    "Construction, marine engineering, defense supply, dredging, riverbank protection and more — the full range of services offered by AHS Enterprise.",
};

export const revalidate = 300;

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  return (
    <>
      <Navbar />
      <main id="main" className="bg-paper">
        <PageHeader
          crumb="Services"
          eyebrow="What We Offer"
          title="Services & Capability"
          subtitle="From government tenders and civil works to marine machinery spares — delivered with quality control, cost-efficiency and timely execution."
        />
        <Services services={services} defenseSupplyGroups={settings.defenseSupplyGroups} />
        <Capability
          capability={settings.capability}
          executionStrengths={settings.executionStrengths}
          riskHandling={settings.riskHandling}
        />
      </main>
      <Footer />
    </>
  );
}
