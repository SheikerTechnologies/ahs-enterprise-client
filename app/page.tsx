import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomeContent } from "@/components/HomeContent";
import { getProjects, getServices, getClients, getSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AHS Enterprise",
  alternateName: ["M/S A H S Enterprise", "AHS Enterprise Bangladesh"],
  url: `${SITE_URL}/`,
};

export default async function Home() {
  const [projects, services, clients, settings] = await Promise.all([
    getProjects(),
    getServices(),
    getClients(),
    getSettings(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar />
      <HomeContent
        projects={projects}
        services={services}
        clients={clients}
        stats={settings.stats}
        company={settings.company}
        faqs={settings.faqs}
      />
      <Footer />
    </>
  );
}
