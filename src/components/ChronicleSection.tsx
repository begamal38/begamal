import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAREER_CHRONICLE, Lang, UI_COPY } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

interface ChronicleSectionProps {
  lang: Lang;
}

export function ChronicleSection({ lang }: ChronicleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!pinWrapRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 110px",
        end: "bottom bottom-=120",
        pin: pinWrapRef.current,
        pinSpacing: false,
      });

      const chapters = gsap.utils.toArray<HTMLElement>(".chronicle-item");
      chapters.forEach((chapter, idx) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 48%",
          end: "bottom 48%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });
    });

    return () => mm.revert();
  }, [lang]);

  const activeEntry = CAREER_CHRONICLE[activeIndex] ?? CAREER_CHRONICLE[0];

  return (
    <section
      id="chronicle"
      ref={sectionRef}
      className="relative z-10 border-t border-white/[0.06] bg-[#0A0A0C]/80 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Pinned Index (Desktop) / Static Header (Mobile) */}
        <div className="lg:col-span-5">
          <div ref={pinWrapRef} className="space-y-6">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-[#F2F0EB] sm:text-4xl">
              {UI_COPY.chronicle.title[lang]}
            </h2>
            <p className="max-w-[40ch] text-sm leading-relaxed text-[#8E8A82] sm:text-base">
              {UI_COPY.chronicle.subtitle[lang]}
            </p>

            {/* Active Chapter Telemetry Panel */}
            <div className="hidden rounded-2xl border border-white/[0.08] bg-[#111114]/90 p-5 lg:block">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-mono-code text-xs text-[#C5A572]">
                  {activeEntry.period[lang]}
                </span>
                <span className="font-mono-code text-xs text-[#8E8A82]">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(CAREER_CHRONICLE.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#F2F0EB]">
                {activeEntry.organization[lang]}
              </p>
              <p className="mt-1 text-xs text-[#8E8A82]">
                {activeEntry.location[lang]}
              </p>
              {activeEntry.logos && activeEntry.logos.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2.5 border-t border-white/[0.08] pt-4">
                  {activeEntry.logos.map((logo) => (
                    <div
                      key={logo.src}
                      className="flex h-11 items-center justify-center rounded-lg border border-white/10 px-3 py-1.5"
                      style={{ backgroundColor: logo.bg }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt[lang]}
                        className="h-7 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Chapter Stack */}
        <div className="space-y-6 lg:col-span-7">
          {CAREER_CHRONICLE.map((entry, idx) => {
            const isActive = idx === activeIndex;
            return (
              <article
                key={entry.id}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`chronicle-item rounded-2xl border p-6 transition-colors duration-300 sm:p-8 ${
                  isActive
                    ? "border-[#C5A572]/45 bg-[#111114]/95"
                    : "border-white/[0.08] bg-[#111114]/70 hover:border-white/20"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono-code text-xs tracking-wider text-[#C5A572]">
                    {entry.period[lang]}
                  </span>
                  <span className="text-xs text-[#8E8A82]">
                    {entry.location[lang]}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#F2F0EB] sm:text-2xl">
                  {entry.role[lang]}
                </h3>

                <p className="mt-1.5 text-sm font-medium text-[#C5A572]">
                  {entry.organization[lang]}
                </p>

                {entry.logos && entry.logos.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {entry.logos.map((logo) => (
                      <div
                        key={logo.src}
                        className="flex h-12 items-center justify-center rounded-xl border border-white/10 px-3.5 py-2"
                        style={{ backgroundColor: logo.bg }}
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt[lang]}
                          loading="lazy"
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-sm leading-relaxed text-[#8E8A82] sm:text-[15px]">
                  {entry.summary[lang]}
                </p>

                <ul className="mt-5 space-y-2 border-t border-white/[0.07] pt-4">
                  {entry.highlights[lang].map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-xs leading-relaxed text-[#F2F0EB]/85 sm:text-sm"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C5A572]"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
