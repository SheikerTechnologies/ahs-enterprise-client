"use client";

import { useState, type ReactNode } from "react";
import { Languages } from "lucide-react";

const body =
  "space-y-5 text-[0.98rem] leading-relaxed text-ink-muted md:text-[1.05rem]";

// The inactive language is collapsed to zero height instead of display:none,
// so both languages stay in the DOM and remain readable by crawlers.
function Panel({
  id,
  active,
  lang,
  children,
}: {
  id: string;
  active: boolean;
  lang?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-out"
      style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
      aria-hidden={!active}
    >
      <div id={id} lang={lang} className="min-h-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function ProprietorMessageContent({
  paragraphs,
  closing,
  bengaliHeading,
  bengaliParagraphs,
}: {
  paragraphs: string[];
  closing: string;
  bengaliHeading: string;
  bengaliParagraphs: string[];
}) {
  const [showBengali, setShowBengali] = useState(false);
  const hasBengali = Boolean(bengaliHeading.trim()) || bengaliParagraphs.length > 0;
  const bengali = showBengali && hasBengali;

  return (
    <div>
      {hasBengali && (
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
            {bengali ? "বাংলা" : "English"}
          </p>
          <button
            type="button"
            onClick={() => setShowBengali((v) => !v)}
            aria-expanded={bengali}
            aria-controls="proprietor-bengali"
            className="inline-flex items-center gap-2 rounded-sm border border-ink/15 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-ink transition-colors hover:border-buoy hover:text-buoy"
          >
            <Languages size={13} strokeWidth={1.75} aria-hidden />
            {bengali ? "English" : "বাংলা"}
          </button>
        </div>
      )}

      <Panel id="proprietor-english" active={!bengali}>
        <div className={body}>
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {closing && (
            <p className="border-l-2 border-buoy pl-5 font-medium text-ink">
              {closing}
            </p>
          )}
        </div>
      </Panel>

      {hasBengali && (
        <Panel id="proprietor-bengali" active={bengali} lang="bn">
          <div className={body}>
            {bengaliHeading.trim() && (
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                {bengaliHeading}
              </h3>
            )}
            {bengaliParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}
