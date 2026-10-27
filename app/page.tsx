import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomeContent } from "@/components/HomeContent";
import { getProjects, getServices, getClients, getSettings } from "@/lib/content";

export const revalidate = 300;

export default async function Home() {
  const [projects, services, clients, settings] = await Promise.all([
    getProjects(),
    getServices(),
    getClients(),
    getSettings(),
  ]);

  return (
    <>
      <Navbar />
      <HomeContent
        projects={projects}
        services={services}
        clients={clients}
        stats={settings.stats}
        company={settings.company}
      />
      <Footer />
    </>
  );
}
