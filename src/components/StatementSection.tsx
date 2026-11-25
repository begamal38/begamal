import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_IDENTITY } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const words = PORTFOLIO_IDENTITY.pointOfView.split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scrub-word",
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".statement-block",
            start: "top 80%",
            end: "bottom 42%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="perspective"
      ref={sectionRef}
      className="relative z-10 border-t border-white/[0.06] bg-[#050505]/70 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="statement-block max-w-4xl">
          <h2 className="font-editorial text-3xl font-normal leading-[1.3] tracking-[-0.01em] text-[#F2F0EB] sm:text-4xl lg:text-[2.85rem]">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="scrub-word inline-block mr-[0.28em]">
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Architectural Identity Coordinates */}
        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-10 md:grid-cols-3 md:gap-8">
          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#C5A572]">
              Coordinates
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F0EB]">
              Born {PORTFOLIO_IDENTITY.born}
            </p>
            <p className="mt-1 font-mono-code text-xs text-[#8E8A82]">
              {PORTFOLIO_IDENTITY.bornCompact} · {PORTFOLIO_IDENTITY.base}
            </p>
          </div>

          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#C5A572]">
              Academic Foundation
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F0EB]">
              B.Sc. in Commerce
            </p>
            <p className="mt-1 text-sm text-[#8E8A82]">
              Business Administration (English Section), Beni Suef University
            </p>
          </div>

          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#C5A572]">
              Practice Scope
            </p>
            <p className="mt-2 text-base font-medium text-[#F2F0EB]">
              {PORTFOLIO_IDENTITY.reach}
            </p>
            <p className="mt-1 text-sm text-[#8E8A82]">
              {PORTFOLIO_IDENTITY.secondaryDisciplines.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
