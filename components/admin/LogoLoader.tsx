import Image from "next/image";

/** Company logo that "builds itself" from the bottom up while a page loads. */
export function LogoLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60vh] flex-col items-center justify-center gap-7">
      <style>{`
        @keyframes ahsRise { 0% { clip-path: inset(100% 0 0 0); } 65%, 100% { clip-path: inset(0 0 0 0); } }
        @keyframes ahsScan { 0% { top: 100%; opacity: 0; } 8% { opacity: 1; } 65% { top: 0; opacity: 1; } 75%, 100% { top: 0; opacity: 0; } }
        @keyframes ahsBar { 0% { transform: translateX(-100%); } 100% { transform: translateX(260%); } }
        @keyframes ahsDot { 0%, 20% { opacity: .2; } 50% { opacity: 1; } 100% { opacity: .2; } }
        .ahs-logo { position: relative; width: 170px; }
        .ahs-logo-base { filter: grayscale(1); opacity: .16; }
        .ahs-logo-fill { position: absolute; inset: 0; animation: ahsRise 1.9s cubic-bezier(.4,0,.2,1) infinite; }
        .ahs-scan { position: absolute; left: -6%; right: -6%; height: 2px; background: #e8951e; box-shadow: 0 0 12px 2px rgba(232,149,30,.55); animation: ahsScan 1.9s cubic-bezier(.4,0,.2,1) infinite; }
        .ahs-bar { width: 140px; height: 2px; overflow: hidden; background: rgba(10,37,64,.12); }
        .ahs-bar > i { display: block; width: 40%; height: 100%; background: #c1401d; animation: ahsBar 1.3s ease-in-out infinite; }
        .ahs-dots span { animation: ahsDot 1.2s infinite; }
        .ahs-dots span:nth-child(2) { animation-delay: .2s; } .ahs-dots span:nth-child(3) { animation-delay: .4s; }
        @media (prefers-reduced-motion: reduce) {
          .ahs-logo-fill { animation: none; clip-path: none; } .ahs-scan, .ahs-bar > i, .ahs-dots span { animation: none; }
          .ahs-bar > i { width: 100%; opacity: .5; }
        }
      `}</style>

      <div className="ahs-logo">
        <Image src="/images/logo.png" alt="" width={666} height={327} priority className="ahs-logo-base h-auto w-full" />
        <div className="ahs-logo-fill">
          <Image src="/images/logo.png" alt="" width={666} height={327} priority className="h-auto w-full" />
        </div>
        <span className="ahs-scan" aria-hidden="true" />
      </div>

      <div className="ahs-bar" aria-hidden="true"><i /></div>

      <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-muted">
        {label}
        <span className="ahs-dots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span>
      </p>
    </div>
  );
}
