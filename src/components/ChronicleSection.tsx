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
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const spineFillRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (trackWrapRef.current && spineFillRef.current) {
        gsap.fromTo(
          spineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: trackWrapRef.current,
              start: "top 65%",
              end: "bottom 65%",
              scrub: true,
            },
          }
        );
      }

      const chapters = gsap.utils.toArray<HTMLElement>(".chronicle-item");
      chapters.forEach((chapter, idx) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 52%",
          end: "bottom 52%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const activeEntry = CAREER_CHRONICLE[activeIndex] ?? CAREER_CHRONICLE[0];

  return (
    <section
      id="chronicle"
      ref={sectionRef}
      className="relative z-10 border-t border-white/[0.08] bg-[#0A0A0C]/45 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Sticky Index (Desktop) / Static Header (Mobile) */}
        <div className="lg:col-span-5">
          <div className="space-y-6 lg:sticky lg:top-24">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-[#F4F5F7] sm:text-4xl">
              {UI_COPY.chronicle.title[lang]}
            </h2>
            <p className="max-w-[42ch] text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
              {UI_COPY.chronicle.subtitle[lang]}
            </p>

            {/* Active Chapter Telemetry Panel */}
            <div className="hidden rounded-2xl border border-white/[0.09] bg-[#111215]/90 p-5 backdrop-blur-md lg:block">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-mono-code text-xs text-[#D4D7DD]">
                  {activeEntry.period[lang]}
                </span>
                <span className="font-mono-code text-xs text-[#9CA3AF]">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(CAREER_CHRONICLE.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#F4F5F7]">
                {activeEntry.organization[lang]}
              </p>
              <p className="mt-1 text-xs text-[#9CA3AF]">
                {activeEntry.location[lang]}
              </p>
              {activeEntry.logos && activeEntry.logos.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2.5 border-t border-white/[0.08] pt-4">
                  {activeEntry.logos.map((logo) => (
                    <div
                      key={`${activeEntry.id}-panel-${logo.src}`}
                      className="flex h-10 items-center justify-center overflow-hidden rounded-lg border border-white/15 px-3 py-1.5 shadow-sm"
                      style={{ backgroundColor: logo.bg ?? "#0B0C0E" }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt[lang]}
                        className={`object-contain ${
                          logo.wide ? "max-h-6 max-w-[96px]" : "max-h-7 w-auto"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Chapter Stack with Live Titanium Progress Spine */}
        <div ref={trackWrapRef} className="relative ps-5 sm:ps-8 lg:col-span-7">
          <div
            className="pointer-events-none absolute bottom-4 start-0 top-4 w-[2px] rounded-full bg-white/[0.08]"
            aria-hidden="true"
          >
            <div
              ref={spineFillRef}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#F4F5F7] via-[#D4D7DD] to-[#8E94A0]"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div className="space-y-6">
            {CAREER_CHRONICLE.map((entry, idx) => {
              const isActive = idx === activeIndex;
              return (
                <article
                  key={entry.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`chronicle-item relative rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
                    isActive
                      ? "border-[#D4D7DD]/55 bg-[#111215]/96 shadow-[0_12px_36px_-20px_rgba(212,215,221,0.22)]"
                      : "border-white/[0.09] bg-[#111215]/84 hover:border-white/25"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -start-[26px] top-8 h-3 w-3 rounded-full border transition-all duration-300 sm:-start-[38px] ${
                      isActive
                        ? "scale-110 border-[#F4F5F7] bg-[#F4F5F7] shadow-[0_0_10px_rgba(244,245,247,0.75)]"
                        : "border-white/25 bg-[#0A0A0C]"
                    }`}
                  />

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono-code text-xs tracking-wider text-[#D4D7DD]">
                      {entry.period[lang]}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      {entry.location[lang]}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#F4F5F7] sm:text-2xl">
                    {entry.role[lang]}
                  </h3>

                  <p className="mt-1.5 text-sm font-medium text-[#D4D7DD]">
                    {entry.organization[lang]}
                  </p>

                  {entry.logos && entry.logos.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {entry.logos.map((logo) => (
                        <div
                          key={`${entry.id}-${logo.src}`}
                          className="flex h-11 items-center justify-center overflow-hidden rounded-xl border border-white/15 px-3.5 py-1.5 shadow-sm"
                          style={{ backgroundColor: logo.bg ?? "#0B0C0E" }}
                        >
                          <img
                            src={logo.src}
                            alt={logo.alt[lang]}
                            loading="lazy"
                            className={`object-contain ${
                              logo.wide ? "max-h-6 max-w-[108px]" : "max-h-8 w-auto"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF] sm:text-[15px]">
                    {entry.summary[lang]}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-white/[0.07] pt-4">
                    {entry.highlights[lang].map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-xs leading-relaxed text-[#F4F5F7]/85 sm:text-sm"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#D4D7DD]"
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
      </div>
    </section>
  );
}
