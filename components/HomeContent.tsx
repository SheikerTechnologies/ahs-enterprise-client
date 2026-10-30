import { Hero } from "./Hero";
import { Services } from "./Services";
import { Capability } from "./Capability";
import { Clients } from "./Clients";
import { ProjectsGrid } from "./ProjectsGrid";
import type { ClientItem, CompanyInfo, Project, Service, Stat } from "@/lib/data";

export function HomeContent({
  projects,
  services,
  clients,
  stats,
  company,
}: {
  projects: Project[];
  services: Service[];
  clients: ClientItem[];
  stats: Stat[];
  company: CompanyInfo;
}) {
  return (
    <>
      <Hero stats={stats} />
      <Services services={services} defenseSupplyGroups={["Motor Transport & Spares", "Signal, Electrical & Electronic Equipment", "Medical & Electromedical Equipment", "Construction Equipment, Materials & Hardware"]} />
      <Capability
        capability={[
          { title: "Emergency Work", evidence: "6-day execution turnaround" },
          { title: "River Protection", evidence: "10+ geo-bag dumping projects" },
          { title: "Marine Equipment", evidence: "Buoy, chain & navigation-tool installation" },
          { title: "Repair Work", evidence: "Pontoon & ferry-ghat restoration" },
        ]}
        executionStrengths={[
          "Fast mobilization",
          "Multi-location operation",
          "Government coordination capability",
        ]}
        riskHandling={["High water-flow conditions", "Emergency execution pressure", "Remote logistics"]}
      />
      <ProjectsGrid projects={projects.slice(0, 6)} />
      <Clients clients={clients} />
      <section className="bg-paper py-20">
        <div className="container-x">
          <div className="rounded-sm border border-ink/10 bg-fog p-8 md:p-10">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-buoy">
              Trusted across Bangladesh
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">
              Built on delivery, accountability, and local reach.
            </h2>
            <p className="mt-4 max-w-2xl text-ink-muted">
              {company.name} serves public-sector institutions, defense-linked procurement, and private development with practical execution. Our team mobilizes quickly and stays focused on quality control, cost efficiency, and dependable timelines.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
