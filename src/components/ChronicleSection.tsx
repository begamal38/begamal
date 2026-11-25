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
      // Animate continuous vertical gold timeline spine across all viewports
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

      // Track active chapter on both desktop and mobile
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
      className="relative z-10 border-t border-white/[0.06] bg-[#0A0A0C]/45 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Sticky Index (Desktop) / Static Header (Mobile) */}
        <div className="lg:col-span-5">
          <div className="space-y-6 lg:sticky lg:top-24">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-[#F2F0EB] sm:text-4xl">
              {UI_COPY.chronicle.title[lang]}
            </h2>
            <p className="max-w-[40ch] text-sm leading-relaxed text-[#D6D3CD]/80 sm:text-base">
              {UI_COPY.chronicle.subtitle[lang]}
            </p>

            {/* Active Chapter Telemetry Panel */}
            <div className="hidden rounded-2xl border border-white/[0.08] bg-[#111114]/82 p-5 backdrop-blur-md lg:block">
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

        {/* Scrollable Chapter Stack with Live Progress Spine */}
        <div ref={trackWrapRef} className="relative ps-5 sm:ps-8 lg:col-span-7">
          <div
            className="pointer-events-none absolute bottom-4 start-0 top-4 w-[2px] rounded-full bg-white/[0.08]"
            aria-hidden="true"
          >
            <div
              ref={spineFillRef}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#C5A572] via-[#C5A572] to-[#F2F0EB]/60"
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
                  className={`chronicle-item relative rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 sm:p-8 ${
                    isActive
                      ? "border-[#C5A572]/55 bg-[#111114]/88 shadow-[0_12px_40px_-20px_rgba(197,165,114,0.3)]"
                      : "border-white/[0.08] bg-[#111114]/65 hover:border-white/20"
                  }`}
                >
                  {/* Node indicator on vertical spine */}
                  <span
                    aria-hidden="true"
                    className={`absolute -start-[26px] top-8 h-3 w-3 rounded-full border transition-all duration-300 sm:-start-[38px] ${
                      isActive
                        ? "scale-110 border-[#C5A572] bg-[#C5A572] shadow-[0_0_12px_rgba(197,165,114,0.85)]"
                        : "border-white/25 bg-[#0A0A0C]"
                    }`}
                  />

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

                  <p className="mt-4 text-sm leading-relaxed text-[#D6D3CD]/80 sm:text-[15px]">
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
      </div>
    </section>
  );
}
