import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  FacebookLogo,
  InstagramLogo,
  Play,
  WhatsappLogo,
} from "@phosphor-icons/react";
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
  onToggleLang: () => void;
}

export function SystemsAndContactSection({
  lang,
  onToggleLang,
}: SystemsAndContactSectionProps) {
  const systemsRef = useRef<HTMLElement>(null);

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

  return (
    <>
      {/* AI Production Systems Architecture */}
      <section
        id="systems"
        ref={systemsRef}
        className="relative z-10 border-t border-white/[0.1] bg-[#0F1219]/62 px-5 py-24 sm:px-8 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-[#F4F5F7] sm:text-4xl">
              {UI_COPY.systems.title[lang]}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#E4E4E7]/85">
              {UI_COPY.systems.subtitle[lang]}
            </p>
          </div>

          <div className="system-pillar-grid mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.1] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.75)] lg:grid-cols-3">
            {AI_PRODUCTION_STACK.map((pillar) => (
              <div
                key={pillar.name.en}
                className="system-pillar flex flex-col justify-between bg-[#151822]/96 p-7 transition-colors duration-300 hover:bg-[#1B1F2C]"
              >
                <div>
                  <p className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#D4D7DD]">
                    {pillar.domain[lang]}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[#F4F5F7]">
                    {pillar.name[lang]}
                  </h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#9CA3AF]">
                  {pillar.role[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Channel & Minimal Footer with Language Switch */}
      <footer
        id="contact"
        className="relative z-10 border-t border-white/[0.11] bg-[#0C0E13]/88 px-5 pb-[max(7rem,calc(6rem+env(safe-area-inset-bottom)))] pt-24 sm:px-8 md:pb-14 md:pt-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#D4D7DD]">
                {UI_COPY.contact.eyebrow[lang]}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-[1.15] tracking-[0.04em] text-[#F4F5F7] sm:text-5xl">
                {UI_COPY.contact.title[lang]}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#E4E4E7]/85">
                {UI_COPY.contact.subtitle[lang]}
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:shrink-0">
              <a
                href={PORTFOLIO_IDENTITY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-titanium group inline-flex items-center justify-between gap-2.5 rounded-full py-2.5 ps-4 pe-2.5 text-sm font-semibold transition-all duration-300 active:scale-[0.98] whitespace-nowrap sm:justify-center sm:ps-5"
              >
                <span className="inline-flex items-center gap-2">
                  <WhatsappLogo size={18} weight="fill" className="text-[#050505]" />
                  <span>{UI_COPY.contact.whatsappCta[lang]}</span>
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </a>

              <a
                href={PORTFOLIO_IDENTITY.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-[#151822] px-5 py-3 text-sm font-medium text-[#F4F5F7] transition-all hover:border-[#D4D7DD] hover:bg-[#1B1F2C] hover:text-white active:scale-[0.98] whitespace-nowrap"
              >
                <FacebookLogo size={17} weight="regular" className="text-[#D4D7DD]" />
                <span>{UI_COPY.contact.facebookCta[lang]}</span>
                <ArrowUpRight size={14} weight="bold" className="opacity-70" />
              </a>

              <a
                href={PORTFOLIO_IDENTITY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-[#151822] px-5 py-3 text-sm font-medium text-[#F4F5F7] transition-all hover:border-[#D4D7DD] hover:bg-[#1B1F2C] hover:text-white active:scale-[0.98] whitespace-nowrap"
              >
                <InstagramLogo size={17} weight="regular" className="text-[#D4D7DD]" />
                <span>{UI_COPY.contact.instagramCta[lang]}</span>
                <ArrowUpRight size={14} weight="bold" className="opacity-70" />
              </a>

              <a
                href={PORTFOLIO_IDENTITY.vimeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-[#151822] px-5 py-3 text-sm font-medium text-[#F4F5F7] transition-all hover:border-[#D4D7DD] hover:bg-[#1B1F2C] hover:text-white active:scale-[0.98] whitespace-nowrap"
              >
                <Play size={14} weight="fill" className="text-[#D4D7DD]" />
                <span>{UI_COPY.contact.vimeoCta[lang]}</span>
                <ArrowUpRight size={14} weight="bold" className="opacity-70" />
              </a>
            </div>
          </div>

          {/* Discreet Footer Closing Row + Minimal العربية / EN Switch */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
            <span className="font-display text-xs tracking-[0.22em] text-[#9CA3AF]">
              {PORTFOLIO_IDENTITY.brandMark[lang]}
            </span>

            <div className="flex items-center gap-4">
              <span className="font-mono-code text-xs text-[#9CA3AF]">
                {lang === "en"
                  ? "Marketing Direction & AI Systems"
                  : "الـ Marketing Direction وأنظمة الذكاء الاصطناعي"}
              </span>

              <button
                type="button"
                onClick={onToggleLang}
                aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
                className="font-arabic-toggle rounded-full border border-white/15 bg-[#111215] px-3.5 py-1 text-xs font-medium text-[#D4D7DD] transition-colors duration-200 hover:border-[#D4D7DD] hover:text-[#F4F5F7] whitespace-nowrap"
              >
                {lang === "en" ? "العربية" : "EN"}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
