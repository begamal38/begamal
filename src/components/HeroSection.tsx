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

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
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
    });

    return () => mm.revert();
  }, [lang]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 flex items-center bg-transparent px-5 pt-24 pb-28 md:min-h-[86svh] md:px-8 md:pb-14 md:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-5 sm:gap-8 lg:grid-cols-12">
        {/* Left/Start: Typography Stack (Immediately visible at scroll = 0, opacity: 1) */}
        <div className="order-2 flex flex-col items-start opacity-100 lg:order-1 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0A0A0C]/85 px-3 py-1.5 md:gap-2.5 md:px-3.5 md:py-1">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4D7DD]"
              aria-hidden="true"
            />
            <p className="font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#D4D7DD] md:tracking-[0.2em]">
              {PORTFOLIO_IDENTITY.heroEyebrow[lang]}
            </p>
          </div>

          <h1 className="mt-3 font-display text-[clamp(1.9rem,5.2vw,3.75rem)] font-semibold uppercase leading-[1.1] tracking-[0.06em] text-[#F4F5F7] sm:mt-4">
            {PORTFOLIO_IDENTITY.name[lang]}
            <span className="mt-1.5 block font-editorial text-[clamp(1.2rem,2.9vw,2.25rem)] font-normal italic leading-[1.24] tracking-[0.02em] text-[#D4D7DD] pb-1 text-balance sm:mt-2">
              {PORTFOLIO_IDENTITY.heroSubtitle[lang]}
            </span>
          </h1>

          <p className="mt-3 max-w-[50ch] text-[15px] leading-[1.65] text-[#E4E4E7] md:mt-4 md:text-[17px] md:leading-relaxed">
            {PORTFOLIO_IDENTITY.heroSubtext[lang]}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3.5 opacity-100 sm:mt-7 sm:gap-4">
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="btn-titanium group inline-flex items-center gap-3 rounded-full py-2.5 ps-6 pe-2.5 text-sm font-semibold text-[#050505] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] whitespace-nowrap"
            >
              <span>{UI_COPY.nav.cta[lang]}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} weight="bold" className="inline-block rtl:-scale-x-100" />
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

        {/* Right/End: Studio Monochrome Portrait dissolved seamlessly into #050505 void */}
        <div className="hero-portrait-parallax order-1 flex justify-center opacity-100 lg:order-2 lg:col-span-5 lg:justify-end">
          <div className="relative mx-auto -mb-12 w-[230px] sm:w-[260px] md:mx-0 md:mb-0 md:w-[292px] lg:w-[376px]">
            {/* Directional silver rim-glow aligned with the Interstellar horizon (same treatment on mobile and desktop) */}
            <div
              className="pointer-events-none absolute -inset-8 rounded-full opacity-25 blur-3xl md:-inset-12"
              style={{
                background:
                  "radial-gradient(circle at 64% 32%, rgba(229, 231, 235, 0.34), rgba(161, 166, 176, 0.12) 45%, rgba(5, 5, 5, 0) 74%)",
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
                className="h-full w-full scale-[1.03] object-cover object-top grayscale contrast-[1.12] brightness-[0.86] opacity-100"
              />
              {/* Bottom and perimeter obsidian scrims erasing headrest/car window edges */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 66% 70% at 50% 38%, rgba(5,5,5,0) 40%, rgba(5,5,5,0.62) 72%, rgba(5,5,5,1) 96%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent"
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
        <span>{lang === "en" ? "Scroll" : "تصفح المسيرة"}</span>
        <ArrowDown size={12} weight="bold" className="text-[#D4D7DD]" />
      </button>
    </section>
  );
}
