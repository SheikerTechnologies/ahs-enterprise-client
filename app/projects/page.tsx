import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { BangladeshMap } from "@/components/BangladeshMap";
import { companyInfo } from "@/lib/data";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: `Projects | ${companyInfo.shortName}`,
  description:
    "Completed and ongoing projects delivered by AHS Enterprise for BIWTA, Bangladesh Navy, DGDP, RAJUK and other national authorities.",
};

export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <Navbar />
      <main id="main" className="bg-paper">
        <PageHeader
          crumb="Projects"
          eyebrow="Track Record"
          title="Projects"
          subtitle="Dredging, riverbank protection, civil works and marine supply — delivered for BIWTA, Bangladesh Navy, DGDP, RAJUK and more."
        />
        <section className="relative bg-ink py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid" />
          <div className="container-x relative">
            <p className="eyebrow flex items-center gap-3 text-amber">
              <span className="h-px w-8 bg-amber" />
              Nationwide Coverage
            </p>
            <h2 className="font-display mt-5 text-3xl sm:text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white">
              Work Across Bangladesh
            </h2>
            <p className="mt-4 max-w-xl text-white/60 leading-relaxed">
              From the ferry ghats of Aricha to the port city of Chittagong — every pin is a real engagement.
            </p>
            <div className="mt-10">
              <BangladeshMap projects={projects} />
            </div>
          </div>
        </section>

        <ProjectsGrid projects={projects} />
      </main>
      <Footer />
    </>
  );
}
