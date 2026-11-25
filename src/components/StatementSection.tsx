import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, PORTFOLIO_IDENTITY, UI_COPY } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

interface StatementSectionProps {
  lang: Lang;
}

export function StatementSection({ lang }: StatementSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const words = PORTFOLIO_IDENTITY.pointOfView[lang].split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scrub-word",
        { opacity: 0.38 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".statement-block",
            start: "top 86%",
            end: "center 52%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="perspective"
      ref={sectionRef}
      className="relative z-10 border-t border-white/[0.06] bg-[#050505]/70 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="statement-block max-w-4xl">
          <h2 className="font-editorial text-2xl font-medium leading-[1.48] tracking-[-0.01em] text-[#F2F0EB] sm:text-4xl lg:text-[2.6rem]">
            {words.map((word, index) => (
              <span
                key={`${lang}-${word}-${index}`}
                className="scrub-word inline-block me-[0.28em]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Verified Milestones & Academic Foundation */}
        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-10 md:grid-cols-3 md:gap-8">
          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#C5A572]">
              {UI_COPY.statement.origin[lang]}
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F0EB]">
              {PORTFOLIO_IDENTITY.bornLabel[lang]}
            </p>
            <p className="mt-1 font-mono-code text-xs text-[#8E8A82]">
              {PORTFOLIO_IDENTITY.bornCompact}
            </p>
          </div>

          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#C5A572]">
              {UI_COPY.statement.education[lang]}
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F0EB]">
              {PORTFOLIO_IDENTITY.educationTitle[lang]}
            </p>
            <p className="mt-1 text-sm text-[#8E8A82]">
              {PORTFOLIO_IDENTITY.educationSub[lang]}
            </p>
          </div>

          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#C5A572]">
              {UI_COPY.statement.scope[lang]}
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F0EB]">
              {PORTFOLIO_IDENTITY.trackTitle[lang]}
            </p>
            <p className="mt-1 text-sm text-[#8E8A82]">
              {PORTFOLIO_IDENTITY.trackSub[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
