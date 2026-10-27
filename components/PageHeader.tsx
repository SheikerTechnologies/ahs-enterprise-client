import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="relative bg-ink pt-28 pb-14 text-white md:pt-36 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid" />
      <div className="container-x relative">
        <nav className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-white/45">
          <Link href="/" className="hover:text-amber transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-white/70">{crumb}</span>
        </nav>

        <p className="eyebrow mt-8 flex items-center gap-3 text-amber">
          <span className="h-px w-8 bg-amber" />
          {eyebrow}
        </p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-white/60 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
