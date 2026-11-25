import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AI_PRODUCTION_STACK,
  Lang,
  PORTFOLIO_IDENTITY,
  UI_COPY,
} from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

interface SystemsAndContactSectionProps {
  lang: Lang;
}

export function SystemsAndContactSection({ lang }: SystemsAndContactSectionProps) {
  const systemsRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !systemsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".system-pillar",
        { y: 20, opacity: 0.55 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".system-pillar-grid",
            start: "top 86%",
            once: true,
          },
        }
      );
    }, systemsRef);

    return () => ctx.revert();
  }, [lang]);

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
        ref={systemsRef}
        className="relative z-10 border-t border-white/[0.08] bg-[#0A0A0D]/40 px-5 py-24 sm:px-8 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-[#F1F2F4] sm:text-4xl">
              {UI_COPY.systems.title[lang]}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#E4E4E7]/85">
              {UI_COPY.systems.subtitle[lang]}
            </p>
          </div>

          <div className="system-pillar-grid mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.08] lg:grid-cols-3">
            {AI_PRODUCTION_STACK.map((pillar) => (
              <div
                key={pillar.name.en}
                className="system-pillar flex flex-col justify-between bg-[#121216]/94 p-7 transition-colors duration-300 hover:bg-[#17171C]"
              >
                <div>
                  <p className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#E11D38]">
                    {pillar.domain[lang]}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[#F1F2F4]">
                    {pillar.name[lang]}
                  </h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#A1A1AA]">
                  {pillar.role[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Channel & Clean Closing Band */}
      <footer
        id="contact"
        className="relative z-10 border-t border-[#C81E32]/25 bg-[#050505]/75 px-5 pb-14 pt-24 sm:px-8 md:pt-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#E11D38]">
                {UI_COPY.contact.eyebrow[lang]}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-[1.15] tracking-[0.04em] text-[#F1F2F4] sm:text-5xl">
                {UI_COPY.contact.title[lang]}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#E4E4E7]/85">
                {UI_COPY.contact.subtitle[lang]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href={PORTFOLIO_IDENTITY.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#C81E32] py-2.5 ps-6 pe-2.5 text-sm font-semibold text-[#F1F2F4] transition-all duration-300 hover:bg-[#E11D38] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{UI_COPY.contact.facebookCta[lang]}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#050505]/25 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={15} weight="bold" />
                </span>
              </a>

              <a
                href={PORTFOLIO_IDENTITY.vimeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#121216] px-5 py-3 text-sm font-medium text-[#F1F2F4] transition-colors hover:border-[#E11D38] hover:text-[#E11D38] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{UI_COPY.contact.vimeoCta[lang]}</span>
                <ArrowUpRight size={15} weight="bold" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#121216] px-5 py-3 font-mono-code text-xs font-medium text-[#F1F2F4] transition-colors hover:border-[#E11D38] hover:text-[#E11D38] active:scale-[0.98] whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check size={14} weight="bold" className="text-[#E11D38]" />
                    <span>{UI_COPY.contact.copiedEmail[lang]}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} weight="regular" />
                    <span>
                      {lang === "en" ? "Copy " : "نسخ "}
                      <span dir="ltr">{PORTFOLIO_IDENTITY.email}</span>
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-14 flex items-center justify-between border-t border-white/[0.08] pt-6">
            <span className="font-display text-xs tracking-[0.22em] text-[#A1A1AA]">
              {PORTFOLIO_IDENTITY.brandMark[lang]}
            </span>
            <span className="font-mono-code text-xs text-[#A1A1AA]">
              {PORTFOLIO_IDENTITY.vimeoLabel}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
