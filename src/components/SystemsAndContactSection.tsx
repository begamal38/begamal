import { ArrowUpRight } from "@phosphor-icons/react";
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

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
            {AI_PRODUCTION_STACK.map((pillar) => (
              <div
                key={pillar.name.en}
                className="flex flex-col justify-between bg-[#111114] p-7 transition-colors duration-300 hover:bg-[#141418]"
              >
                <div>
                  <p className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#C5A572]">
                    {pillar.domain[lang]}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[#F2F0EB]">
                    {pillar.name[lang]}
                  </h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#8E8A82]">
                  {pillar.role[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Re-engineered Closing Band (Zero Boilerplate Filler) */}
      <footer
        id="contact"
        className="relative z-10 border-t border-white/[0.08] bg-[#050505]/95 px-5 pb-14 pt-24 sm:px-8 md:pt-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#C5A572]">
                {UI_COPY.contact.eyebrow[lang]}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-[1.15] tracking-[0.04em] text-[#F2F0EB] sm:text-5xl">
                {UI_COPY.contact.title[lang]}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#8E8A82]">
                {UI_COPY.contact.subtitle[lang]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PORTFOLIO_IDENTITY.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#C5A572] py-2.5 ps-6 pe-2.5 text-sm font-semibold text-[#050505] transition-all duration-300 hover:bg-[#d2b586] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{UI_COPY.contact.facebookCta[lang]}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={15} weight="bold" />
                </span>
              </a>

              <a
                href={PORTFOLIO_IDENTITY.vimeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#111114] px-6 py-3 text-sm font-medium text-[#F2F0EB] transition-colors hover:border-[#C5A572]/50 hover:text-[#C5A572] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{UI_COPY.contact.vimeoCta[lang]}</span>
                <ArrowUpRight size={15} weight="bold" />
              </a>
            </div>
          </div>

          <div className="mt-14 flex items-center justify-between border-t border-white/[0.08] pt-6">
            <span className="font-display text-xs tracking-[0.22em] text-[#8E8A82]">
              {PORTFOLIO_IDENTITY.brandMark[lang]}
            </span>
            <span className="font-mono-code text-xs text-[#8E8A82]">
              {PORTFOLIO_IDENTITY.vimeoLabel}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
