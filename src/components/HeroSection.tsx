import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, PORTFOLIO_IDENTITY, UI_COPY } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  lang: Lang;
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ lang, onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-portrait-parallax", {
        yPercent: -9,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(".hero-scroll-cue", {
        opacity: 0,
        y: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "28% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 flex min-h-[100dvh] items-center px-5 pb-14 pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:px-8 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
        {/* Left/Start: Typography Stack (Immediately visible at scroll = 0, opacity: 1) */}
        <div className="order-2 flex flex-col items-start opacity-100 lg:order-1 lg:col-span-7">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#0A0A0C]/85 px-3.5 py-1">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4D7DD]"
              aria-hidden="true"
            />
            <p className="font-mono-code text-[11px] uppercase tracking-[0.2em] text-[#D4D7DD]">
              {PORTFOLIO_IDENTITY.heroEyebrow[lang]}
            </p>
          </div>

          <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-[1.08] tracking-[0.06em] text-[#F4F5F7] sm:text-5xl lg:text-[3.75rem]">
            {PORTFOLIO_IDENTITY.name[lang]}
            <span className="mt-2 block font-editorial text-2xl font-normal italic leading-[1.2] tracking-[0.02em] text-[#D4D7DD] pb-1 sm:text-3xl lg:text-[2.25rem]">
              {PORTFOLIO_IDENTITY.heroSubtitle[lang]}
            </span>
          </h1>

          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-[#E4E4E7] sm:text-[17px]">
            {PORTFOLIO_IDENTITY.heroSubtext[lang]}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 opacity-100">
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="btn-titanium group inline-flex items-center gap-3 rounded-full py-2.5 ps-6 pe-2.5 text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] whitespace-nowrap"
            >
              <span>{UI_COPY.nav.cta[lang]}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} weight="bold" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("works")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#111215]/90 px-6 py-3 text-sm font-medium text-[#F4F5F7] transition-colors duration-200 hover:border-[#D4D7DD] hover:text-white active:scale-[0.98] whitespace-nowrap"
            >
              <span>{UI_COPY.hero.secondaryCta[lang]}</span>
            </button>
          </div>
        </div>

        {/* Right/End: Chiaroscuro Monochrome Portrait (Immediately opacity: 1 at scroll = 0) */}
        <div className="hero-portrait-parallax order-1 flex justify-center opacity-100 lg:order-2 lg:col-span-5 lg:justify-end">
          <div className="relative w-[195px] sm:w-[275px] lg:w-[365px]">
            <div
              className="pointer-events-none absolute -inset-6 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 60% 35%, rgba(212, 215, 221, 0.16), rgba(5, 5, 5, 0) 68%)",
              }}
              aria-hidden="true"
            />
            <div className="portrait-mask relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={PORTFOLIO_IDENTITY.portraitPath}
                alt={UI_COPY.hero.portraitAlt[lang]}
                width={740}
                height={925}
                loading="eager"
                decoding="sync"
                className="h-full w-full object-cover object-top grayscale contrast-[1.24] brightness-[0.88] opacity-100"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 68% 72% at 50% 45%, rgba(5,5,5,0) 44%, rgba(5,5,5,0.72) 78%, rgba(5,5,5,1) 100%)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Exploration Cue */}
      <button
        type="button"
        onClick={() => onNavigate("perspective")}
        className="hero-scroll-cue absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-[#111215]/80 px-4 py-1.5 font-mono-code text-[10px] uppercase tracking-[0.18em] text-[#D4D7DD] backdrop-blur-md transition-colors hover:border-white/40 hover:text-[#F4F5F7] sm:inline-flex"
      >
        <span>{lang === "en" ? "Scroll" : "استكشف المسيرة"}</span>
        <ArrowDown size={12} weight="bold" className="text-[#D4D7DD]" />
      </button>
    </section>
  );
}
