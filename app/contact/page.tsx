import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Contact } from "@/components/Contact";
import { companyInfo } from "@/lib/data";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact | ${companyInfo.shortName}`,
  description: "Get in touch with AHS Enterprise for tenders, supply enquiries or project partnerships.",
};

export const revalidate = 300;

export default async function ContactPage() {
  const { company } = await getSettings();
  return (
    <>
      <Navbar />
      <main id="main" className="bg-paper">
        <PageHeader
          crumb="Contact"
          eyebrow="Reach Us"
          title="Talk to Our Team"
          subtitle="For tenders, supply enquiries, or project partnerships — reach us directly, or send a message below."
        />
        <Contact company={company} />
      </main>
      <Footer />
    </>
  );
}
