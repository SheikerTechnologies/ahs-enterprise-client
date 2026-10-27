import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 blueprint-grid" />
        <div className="container-x relative flex min-h-[70vh] flex-col items-start justify-center py-28 text-white">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">
            Error 404
          </p>
          <h1 className="font-display mt-5 text-6xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-8xl">
            Off the
            <br />
            Map.
          </h1>
          <p className="mt-6 max-w-md text-white/60 leading-relaxed">
            This page doesn&apos;t exist — the plate you&apos;re looking for
            may have moved or hasn&apos;t been laid yet.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-sm bg-amber px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-ink hover:bg-white transition-colors"
            >
              <ArrowLeft size={15} />
              Back to Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:border-amber hover:text-amber transition-colors"
            >
              View Projects
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
