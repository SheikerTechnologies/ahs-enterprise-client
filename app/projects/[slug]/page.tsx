import { companyInfo } from "@/lib/data";
import { getProject, getProjects } from "@/lib/content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatusStamp } from "@/components/StatusStamp";
import { CornerMarks } from "@/components/CornerMarks";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, Clock, Layers, BadgeCheck } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found | AHS Enterprise" };
  return {
    title: `${project.title} | ${companyInfo.shortName}`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const specIcons = [Layers, MapPin, Calendar, Clock, Layers, Layers];

  return (
    <>
      <Navbar />
      <main id="main" className="bg-paper">
        {/* Hero */}
        <section className="relative bg-ink pt-28 pb-16 text-white md:pt-36 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid" />
          <div className="container-x relative">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-amber transition-colors"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-sm border border-amber/40 px-2.5 py-1 font-mono text-[0.65rem] tracking-widest text-amber">
                {project.code}
              </span>
              <StatusStamp status={project.status} />
            </div>

            <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-xl text-white/60">{project.tagline}</p>
          </div>
        </section>

        {/* Nameplate + Summary */}
        <section className="py-16 md:py-24">
          <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-sm border border-ink/10 bg-ink">
                <CornerMarks className="text-amber/60 z-10" />
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>
              </div>

              {project.gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {project.gallery.slice(1).map((img) => (
                    <div
                      key={img}
                      className="relative aspect-square overflow-hidden rounded-sm border border-ink/10"
                    >
                      <Image
                        src={img}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10">
                <p className="eyebrow text-buoy">Project Summary</p>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-muted">
                  {project.summary}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-sm border border-ink/10 bg-fog p-8">
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-buoy">
                  Nameplate — Specifications
                </p>
                <div className="mt-6 divide-y divide-ink/10">
                  {project.details.map((d, i) => {
                    const Icon = specIcons[i % specIcons.length];
                    return (
                      <div
                        key={d.label}
                        className="flex items-center justify-between gap-4 py-3.5"
                      >
                        <span className="flex items-center gap-2.5 text-xs uppercase tracking-wide text-ink-muted">
                          <Icon size={14} className="text-buoy shrink-0" />
                          {d.label}
                        </span>
                        <span className="text-right font-display text-sm font-bold text-ink">
                          {d.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {project.status === "COMPLETED" && (
                <div className="mt-4 flex items-start gap-3 rounded-sm border border-chart-green/30 bg-chart-green/5 p-5">
                  <BadgeCheck className="text-chart-green shrink-0 mt-0.5" size={19} />
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                      Verified Completion
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                      Backed by an official work-completion certificate
                      signed by the client authority&apos;s Executive
                      Engineer.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 rounded-sm bg-ink p-8">
                <p className="font-display text-lg font-bold uppercase text-white">
                  Interested in a similar scope?
                </p>
                <p className="mt-2 text-sm text-white/60">
                  Talk to our team about your project or tender requirement.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-sm bg-amber px-5 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-ink hover:bg-white transition-colors"
                >
                  Request a Quote
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Next project */}
        <section className="border-t border-ink/10 bg-fog py-14">
          <div className="container-x">
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-ink-muted">
                  Next Project — {next.code}
                </p>
                <p className="font-display mt-2 text-2xl font-extrabold uppercase tracking-tight text-ink group-hover:text-buoy transition-colors">
                  {next.title}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-sm border border-ink/15 px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink group-hover:border-buoy group-hover:text-buoy transition-colors">
                View Project
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
