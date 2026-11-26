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
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: ".statement-block",
            start: "top 86%",
            end: "center 50%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".milestone-card",
        { y: 18, opacity: 0.55 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".milestone-grid",
            start: "top 88%",
            once: true,
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
      className="relative z-10 border-t border-white/[0.08] bg-[#050505]/35 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Double-Bezel Editorial Manifesto Card */}
        <div className="rounded-[2rem] border border-white/[0.09] bg-[#111215]/90 p-1.5">
          <div className="statement-block rounded-[calc(2rem-0.375rem)] bg-[#0A0A0C]/95 p-6 sm:p-10">
            <h2 className="font-editorial text-2xl font-medium leading-[1.48] tracking-[-0.01em] text-[#F4F5F7] sm:text-4xl lg:text-[2.45rem]">
              {words.map((word, index) => (
                <span key={`${lang}-${word}-${index}`}>
                  <span className="scrub-word inline-block">{word}</span>
                  {index < words.length - 1 ? " " : ""}
                </span>
              ))}
            </h2>

            {/* Creative Influence (Tameem Youness) & Analytical Lens */}
            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-6 md:grid-cols-2">
              <div>
                <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#D4D7DD]">
                  {PORTFOLIO_IDENTITY.inspirationLabel[lang]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#E4E4E7]/90">
                  {PORTFOLIO_IDENTITY.inspirationText[lang]}
                </p>
              </div>
              <div>
                <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#D4D7DD]">
                  {PORTFOLIO_IDENTITY.lensLabel[lang]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
                  {PORTFOLIO_IDENTITY.lensText[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Milestones & Academic Foundation */}
        <div className="milestone-grid grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-10 md:grid-cols-3 md:gap-8">
          <div className="milestone-card rounded-2xl border border-white/[0.09] bg-[#111215]/92 p-5">
            <p className="font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#D4D7DD]">
              {UI_COPY.statement.origin[lang]}
            </p>
            <p className="mt-2 text-base font-medium text-[#F4F5F7]">
              {PORTFOLIO_IDENTITY.bornLabel[lang]}
            </p>
            <p className="mt-1 font-mono-code text-xs text-[#9CA3AF]">
              {PORTFOLIO_IDENTITY.bornCompact}
            </p>
          </div>

          <div className="milestone-card rounded-2xl border border-white/[0.09] bg-[#111215]/92 p-5">
            <p className="font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#D4D7DD]">
              {UI_COPY.statement.education[lang]}
            </p>
            <p className="mt-2 text-base font-medium text-[#F4F5F7]">
              {PORTFOLIO_IDENTITY.educationTitle[lang]}
            </p>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              {PORTFOLIO_IDENTITY.educationSub[lang]}
            </p>
          </div>

          <div className="milestone-card rounded-2xl border border-white/[0.09] bg-[#111215]/92 p-5">
            <p className="font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#D4D7DD]">
              {UI_COPY.statement.scope[lang]}
            </p>
            <p className="mt-2 text-base font-medium text-[#F4F5F7]">
              {PORTFOLIO_IDENTITY.trackTitle[lang]}
            </p>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              {PORTFOLIO_IDENTITY.trackSub[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
