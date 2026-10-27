import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/clients", label: "Clients" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const group = [
  { name: "AHS Enterprise", href: "/", desc: "Contracting, marine supply & indenting", current: true },
  { name: "AHS Properties & Development Ltd.", href: "https://ahspdl.com", desc: "Real estate development" },
  { name: "Sun Solaris Limited", href: "https://sunsolaris.ltd", desc: "Renewable solar energy" },
];

export async function Footer() {
  const { company: companyInfo } = await getSettings();
  return (
    <footer className="relative bg-ink border-t border-white/10 pt-16 pb-8">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/logo-mark.png"
                alt="AHS Enterprise"
                width={34}
                height={34}
                className="h-8 w-8 object-contain"
              />
              <span className="font-display text-lg font-extrabold uppercase tracking-wide text-white">
                AHS <span className="text-amber">Enterprise</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {companyInfo.designation}. Building Bangladesh&apos;s
              infrastructure since 2021 — one project plate at a time.
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-white/40">
              Navigate
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/65 hover:text-amber transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-white/40">
              Contact
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/65">
              <p>{companyInfo.phones.join(" · ")}</p>
              <p>{companyInfo.email}</p>
              <p>{companyInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-white/40">
            AHS Group
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {group.map((g) =>
              g.current ? (
                <div
                  key={g.name}
                  className="rounded-sm border border-amber/30 bg-amber/5 px-4 py-3"
                >
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-amber">
                    {g.name}
                  </p>
                  <p className="mt-0.5 text-xs text-white/45">{g.desc} — you are here</p>
                </div>
              ) : (
                <a
                  key={g.name}
                  href={g.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-2 rounded-sm border border-white/10 px-4 py-3 hover:border-amber/40 transition-colors"
                >
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wide text-white group-hover:text-amber transition-colors">
                      {g.name}
                    </p>
                    <p className="mt-0.5 text-xs text-white/45">{g.desc}</p>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-white/30 group-hover:text-amber transition-colors"
                  />
                </a>
              )
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.68rem] text-white/35">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.68rem] text-white/35">
            Demo build — client-side preview
          </p>
        </div>
      </div>
    </footer>
  );
}
