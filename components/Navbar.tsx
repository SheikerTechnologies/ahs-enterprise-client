"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/clients", label: "Clients" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(255,255,255,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/images/logo-mark.png"
            alt="AHS Enterprise"
            width={36}
            height={36}
            className="h-8 w-8 md:h-9 md:w-9 object-contain"
          />
          <span className="font-display text-lg md:text-xl font-extrabold uppercase tracking-wide text-white leading-none">
            AHS <span className="text-amber">Enterprise</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname.startsWith(l.href) ? "page" : undefined}
              className={`eyebrow transition-colors hover:text-amber ${
                pathname.startsWith(l.href) ? "text-amber" : "text-white/70"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center gap-1.5 rounded-sm bg-amber px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink hover:bg-white transition-colors"
        >
          Request a Quote
          <ArrowUpRight size={14} />
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="lg:hidden bg-ink border-t border-white/10">
          <nav className="container-x flex flex-col py-4 gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="py-3 font-mono text-sm uppercase tracking-wider text-white/80 hover:text-amber border-b border-white/5 last:border-none"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-sm bg-amber px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Request a Quote
              <ArrowUpRight size={14} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
