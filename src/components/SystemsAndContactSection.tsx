import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "@phosphor-icons/react";
import {
  AI_PRODUCTION_STACK,
  Lang,
  PORTFOLIO_IDENTITY,
  UI_COPY,
} from "../data/portfolioData";

interface SystemsAndContactSectionProps {
  lang: Lang;
}

export function SystemsAndContactSection({ lang }: SystemsAndContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_IDENTITY.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PORTFOLIO_IDENTITY.email}`;
    }
  };

  return (
    <>
      {/* AI Production Systems Architecture */}
      <section
        id="systems"
        className="relative z-10 border-t border-white/[0.06] bg-[#0A0A0C]/80 px-5 py-24 sm:px-8 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-[#F2F0EB] sm:text-4xl">
              {UI_COPY.systems.title[lang]}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#8E8A82]">
              {UI_COPY.systems.subtitle[lang]}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {AI_PRODUCTION_STACK.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col justify-between bg-[#111114] p-7 transition-colors duration-300 hover:bg-[#141418]"
              >
                <div>
                  <p className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#C5A572]">
                    {tool.domain[lang]}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[#F2F0EB]">
                    {tool.name}
                  </h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#8E8A82]">
                  {tool.role[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grounded Contact & Resolution */}
      <footer
        id="contact"
        className="relative z-10 border-t border-white/[0.08] bg-[#050505]/95 px-5 pb-14 pt-24 sm:px-8 md:pt-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl font-semibold uppercase leading-[1.12] tracking-[0.05em] text-[#F2F0EB] sm:text-5xl">
                {UI_COPY.contact.title[lang]}
              </h2>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[#8E8A82]">
                {UI_COPY.contact.subtitle[lang]}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${PORTFOLIO_IDENTITY.email}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#C5A572] py-2.5 ps-6 pe-2.5 text-sm font-semibold text-[#050505] transition-all duration-300 hover:bg-[#d2b586] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>{PORTFOLIO_IDENTITY.email}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={15} weight="bold" />
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#111114] px-5 py-3 text-xs font-medium text-[#F2F0EB] transition-colors hover:border-[#C5A572]/50 hover:text-[#C5A572] active:scale-[0.98] whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check size={14} weight="bold" className="text-[#C5A572]" />
                      <span>{UI_COPY.contact.copied[lang]}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} weight="regular" />
                      <span>{UI_COPY.contact.copyAddress[lang]}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/[0.08] pt-6 lg:col-span-5 lg:border-t-0 lg:border-s lg:ps-10 lg:pt-0">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-xs uppercase tracking-wider text-[#8E8A82]">
                  {UI_COPY.contact.showreel[lang]}
                </span>
                <a
                  href={PORTFOLIO_IDENTITY.vimeoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-code text-xs text-[#F2F0EB] transition-colors hover:text-[#C5A572]"
                >
                  <span>{PORTFOLIO_IDENTITY.vimeoLabel}</span>
                  <ArrowUpRight size={13} weight="bold" />
                </a>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="text-xs uppercase tracking-wider text-[#8E8A82]">
                  {UI_COPY.contact.domain[lang]}
                </span>
                <span className="font-mono-code text-xs text-[#F2F0EB]">
                  begamal.pages.dev
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#8E8A82]">
                  {UI_COPY.contact.base[lang]}
                </span>
                <span className="text-xs text-[#F2F0EB]">
                  {PORTFOLIO_IDENTITY.base[lang]}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/[0.08] pt-6 text-xs text-[#8E8A82] sm:flex-row sm:items-center">
            <p>{UI_COPY.contact.footerLeft[lang]}</p>
            <p className="font-mono-code">{UI_COPY.contact.footerRight[lang]}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
