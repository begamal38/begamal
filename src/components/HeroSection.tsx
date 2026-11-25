import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PORTFOLIO_IDENTITY } from "../data/portfolioData";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 22,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        clearProps: "transform",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 flex min-h-[100dvh] items-center px-5 pb-14 pt-20 sm:px-8 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left: Authoritative Typography Stack (Max 4 text elements) */}
        <div className="order-2 flex flex-col items-start lg:order-1 lg:col-span-7">
          <p className="hero-reveal font-mono-code text-[11px] uppercase tracking-[0.22em] text-[#C5A572]">
            {PORTFOLIO_IDENTITY.primaryTitle} · {PORTFOLIO_IDENTITY.base}
          </p>

          <h1 className="hero-reveal mt-5 font-display text-4xl font-medium uppercase leading-[1.06] tracking-[0.06em] text-[#F2F0EB] sm:text-5xl lg:text-[3.75rem]">
            {PORTFOLIO_IDENTITY.name}
            <span className="mt-1.5 block font-editorial text-2xl font-normal italic tracking-[0.02em] text-[#C5A572] sm:text-3xl lg:text-[2.3rem] leading-[1.15] pb-1">
              Creative Direction &amp; AI Systems
            </span>
          </h1>

          <p className="hero-reveal mt-5 max-w-[48ch] text-base leading-relaxed text-[#8E8A82] sm:text-[17px]">
            {PORTFOLIO_IDENTITY.heroSubtext}
          </p>

          <div className="hero-reveal mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="group inline-flex items-center gap-3 rounded-full bg-[#C5A572] py-2.5 pl-6 pr-2.5 text-sm font-semibold text-[#050505] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#d2b586] active:scale-[0.98] whitespace-nowrap"
            >
              <span>Direct Inquiry</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} weight="bold" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("works")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#111114]/70 px-6 py-3 text-sm font-medium text-[#F2F0EB] transition-colors duration-200 hover:border-[#C5A572]/50 hover:text-[#C5A572] active:scale-[0.98] whitespace-nowrap"
            >
              <span>Selected Works</span>
            </button>
          </div>
        </div>

        {/* Right: Chiaroscuro Monochrome Portrait Dissolving into #050505 */}
        <div className="hero-reveal order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <div className="relative w-[210px] sm:w-[290px] lg:w-[370px]">
            <div
              className="pointer-events-none absolute -inset-6 rounded-full opacity-45 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 60% 35%, rgba(197, 165, 114, 0.2), rgba(5, 5, 5, 0) 68%)",
              }}
              aria-hidden="true"
            />
            <div className="portrait-mask relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={PORTFOLIO_IDENTITY.portraitPath}
                alt="Belal Gamal portrait in low-key monochrome studio light"
                width={740}
                height={925}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-top grayscale contrast-[1.24] brightness-[0.84] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 68% 72% at 50% 45%, rgba(5,5,5,0) 44%, rgba(5,5,5,0.75) 78%, rgba(5,5,5,1) 100%)",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
