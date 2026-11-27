import { useEffect, useRef } from "react";
import {
  ArrowUp,
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
  onNavigate: (sectionId: string) => void;
}

export function SystemsAndContactSection({
  lang,
  onToggleLang,
  onNavigate,
}: SystemsAndContactSectionProps) {
  const systemsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !systemsRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".system-pillar-inner",
        { y: 14, opacity: 0.55 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".system-pillar-grid",
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, [lang]);

  return (
    <>
      {/* AI Production Systems Architecture */}
      <section
        id="systems"
        ref={systemsRef}
        className="relative z-10 bg-transparent px-5 py-14 sm:px-8 md:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold uppercase tracking-[0.06em] text-[#F4F5F7]">
              {UI_COPY.systems.title[lang]}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#E4E4E7]/85">
              {UI_COPY.systems.subtitle[lang]}
            </p>
          </div>

          <div className="system-pillar-grid mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.1] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.75)] backdrop-blur-md lg:grid-cols-3">
            {AI_PRODUCTION_STACK.map((pillar) => (
              <div
                key={pillar.name.en}
                className="system-pillar bg-[#0A0A0C]/76 p-6 transition-colors duration-300 ease-out hover:bg-[#13161F]/85 sm:p-7"
              >
                <div className="system-pillar-inner flex h-full flex-col justify-between">
                  <div>
                    <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#A1A6B0]">
                      {pillar.domain[lang]}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-[#F4F5F7]">
                      {pillar.name[lang]}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF]">
                    {pillar.role[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Channel & Minimal Footer with Language Switch (Safe-Zone Cleared for Floating Audio Toggle) */}
      <footer
        id="contact"
        className="relative z-10 bg-[#0A0A0C]/76 px-5 pb-28 pt-14 backdrop-blur-md sm:px-8 sm:pb-24 md:pt-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="w-full min-w-0 max-w-2xl">
              <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#A1A6B0]">
                {UI_COPY.contact.eyebrow[lang]}
              </p>
              <h2 className="mt-3 block font-display text-[clamp(1.85rem,4.5vw,3rem)] font-semibold uppercase leading-[1.2] tracking-[0.04em] text-[#F4F5F7]">
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
                className="btn-titanium group inline-flex items-center justify-between gap-2.5 rounded-full py-2.5 ps-4 pe-2.5 text-sm font-semibold text-[#050505] transition-all duration-300 ease-out active:scale-[0.98] whitespace-nowrap sm:justify-center sm:ps-5"
              >
                <span className="inline-flex items-center gap-2 text-[#050505]">
                  <WhatsappLogo size={18} weight="fill" className="text-[#050505]" />
                  <span>{UI_COPY.contact.whatsappCta[lang]}</span>
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#050505]/15 text-[#050505] transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={14} weight="bold" className="inline-block text-[#050505] rtl:-scale-x-100" />
                </span>
              </a>

              <a
                href={PORTFOLIO_IDENTITY.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-[#151822]/90 px-5 py-3 text-sm font-medium text-[#F4F5F7] transition-all duration-300 ease-out hover:border-[#D4D7DD] hover:bg-[#1B1F2C] hover:text-white active:scale-[0.98] whitespace-nowrap"
              >
                <FacebookLogo size={17} weight="regular" className="text-[#D4D7DD]" />
                <span>{UI_COPY.contact.facebookCta[lang]}</span>
                <ArrowUpRight size={14} weight="bold" className="inline-block opacity-70 rtl:-scale-x-100" />
              </a>

              <a
                href={PORTFOLIO_IDENTITY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-[#151822]/90 px-5 py-3 text-sm font-medium text-[#F4F5F7] transition-all duration-300 ease-out hover:border-[#D4D7DD] hover:bg-[#1B1F2C] hover:text-white active:scale-[0.98] whitespace-nowrap"
              >
                <InstagramLogo size={17} weight="regular" className="text-[#D4D7DD]" />
                <span>{UI_COPY.contact.instagramCta[lang]}</span>
                <ArrowUpRight size={14} weight="bold" className="inline-block opacity-70 rtl:-scale-x-100" />
              </a>

              <a
                href={PORTFOLIO_IDENTITY.vimeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.dispatchEvent(new CustomEvent("begamal:showreel-play"))}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-[#151822]/90 px-5 py-3 text-sm font-medium text-[#F4F5F7] transition-all duration-300 ease-out hover:border-[#D4D7DD] hover:bg-[#1B1F2C] hover:text-white active:scale-[0.98] whitespace-nowrap"
              >
                <Play size={14} weight="fill" className="text-[#D4D7DD]" />
                <span>{UI_COPY.contact.vimeoCta[lang]}</span>
                <ArrowUpRight size={14} weight="bold" className="inline-block opacity-70 rtl:-scale-x-100" />
              </a>
            </div>
          </div>

          {/* Discreet Footer Closing Row + Copyright + Back to Top + العربية / EN Switch */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 pe-0 sm:pe-36">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-xs tracking-[0.22em] text-[#9CA3AF]">
                {PORTFOLIO_IDENTITY.brandMark[lang]}
              </span>
              <span aria-hidden="true" className="text-white/20">
                ·
              </span>
              <span className="font-mono-code text-[11px] text-[#9CA3AF]">
                © {PORTFOLIO_IDENTITY.brandMark[lang]}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="font-mono-code text-xs text-[#9CA3AF]">
                {lang === "en"
                  ? "Marketing Direction & AI Systems"
                  : "الإدارة الإبداعية وأنظمة الذكاء الاصطناعي"}
              </span>

              <button
                type="button"
                onClick={() => onNavigate("hero")}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#111215] px-3 py-1 font-mono-code text-[11px] text-[#D4D7DD] transition-colors duration-300 ease-out hover:border-[#D4D7DD] hover:text-[#F4F5F7] whitespace-nowrap"
              >
                <ArrowUp size={11} weight="bold" />
                <span>{lang === "en" ? "Back to Top" : "للأعلى"}</span>
              </button>

              <button
                type="button"
                onClick={onToggleLang}
                aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
                className="font-arabic-toggle rounded-full border border-white/15 bg-[#111215] px-3.5 py-1 text-xs font-medium text-[#D4D7DD] transition-colors duration-300 ease-out hover:border-[#D4D7DD] hover:text-[#F4F5F7] whitespace-nowrap"
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
