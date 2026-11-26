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
      className="relative z-10 border-t border-white/[0.1] bg-[#0F1218]/55 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Double-Bezel Editorial Manifesto Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#181C25]/92 p-1.5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Subtle architectural 13-node geometric filigree (purely visual, zero copy) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 240 240"
            className="pointer-events-none absolute -end-8 -top-8 z-10 h-60 w-60 text-[#D4D7DD] opacity-[0.038]"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
          >
            <circle cx="120" cy="120" r="26" />
            <circle cx="120" cy="68" r="26" />
            <circle cx="165" cy="94" r="26" />
            <circle cx="165" cy="146" r="26" />
            <circle cx="120" cy="172" r="26" />
            <circle cx="75" cy="146" r="26" />
            <circle cx="75" cy="94" r="26" />
            <circle cx="120" cy="42" r="26" opacity="0.55" />
            <circle cx="187.5" cy="81" r="26" opacity="0.55" />
            <circle cx="187.5" cy="159" r="26" opacity="0.55" />
            <circle cx="120" cy="198" r="26" opacity="0.55" />
            <circle cx="52.5" cy="159" r="26" opacity="0.55" />
            <circle cx="52.5" cy="81" r="26" opacity="0.55" />
            <polygon points="120,42 187.5,159 52.5,159" />
            <polygon points="120,198 187.5,81 52.5,81" />
            <line x1="120" y1="42" x2="120" y2="198" opacity="0.6" />
            <line x1="52.5" y1="81" x2="187.5" y2="159" opacity="0.6" />
            <line x1="187.5" y1="81" x2="52.5" y2="159" opacity="0.6" />
          </svg>
          <div className="statement-block relative rounded-[calc(2rem-0.375rem)] bg-[#11141B]/94 p-6 sm:p-10">
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
        <div className="milestone-grid grid grid-cols-1 gap-6 border-t border-white/[0.1] pt-10 md:grid-cols-3 md:gap-8">
          <div className="milestone-card rounded-2xl border border-white/[0.11] bg-[#151821]/92 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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

          <div className="milestone-card rounded-2xl border border-white/[0.11] bg-[#151821]/92 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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

          <div className="milestone-card rounded-2xl border border-white/[0.11] bg-[#151821]/92 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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
