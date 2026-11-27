import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAREER_CHRONICLE, Lang, UI_COPY } from "../data/portfolioData";
import { BiDiText } from "./BiDiText";
import { RichInlineText } from "./SignatureGlowLink";

gsap.registerPlugin(ScrollTrigger);

interface ChronicleSectionProps {
  lang: Lang;
}

export function ChronicleSection({ lang }: ChronicleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const spineFillRef = useRef<HTMLDivElement>(null);
  const beaconRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && trackWrapRef.current && spineFillRef.current) {
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

        if (beaconRef.current) {
          gsap.fromTo(
            beaconRef.current,
            { top: "0%" },
            {
              top: "100%",
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
      } else if (prefersReducedMotion && spineFillRef.current) {
        gsap.set(spineFillRef.current, { scaleY: 1 });
        if (beaconRef.current) {
          gsap.set(beaconRef.current, { top: "100%" });
        }
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
      className="relative z-10 border-t border-white/[0.1] bg-[#0B0D12]/42 px-5 py-20 sm:px-8 sm:py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Sticky Index (Desktop) / Static Header (Mobile) */}
        <div className="lg:col-span-5">
          <div className="space-y-6 lg:sticky lg:top-24">
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold uppercase tracking-[0.06em] text-[#F4F5F7]">
              {UI_COPY.chronicle.title[lang]}
            </h2>
            <p className="max-w-[42ch] text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
              <BiDiText text={UI_COPY.chronicle.subtitle[lang]} lang={lang} />
            </p>

            {/* Active Chapter Telemetry Panel */}
            <div className="hidden rounded-2xl border border-white/[0.12] bg-[#151822]/94 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-md lg:block">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-mono-code text-xs text-[#D4D7DD]">
                  {activeEntry.period[lang]}
                </span>
                <span
                  dir="ltr"
                  className="inline-block font-mono-code text-xs tabular-nums text-[#9CA3AF]"
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(CAREER_CHRONICLE.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#F4F5F7]">
                <BiDiText text={activeEntry.organization[lang]} lang={lang} />
              </p>
              <p className="mt-1 text-xs text-[#9CA3AF]">
                {activeEntry.location[lang]}
              </p>
              {activeEntry.logos && activeEntry.logos.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2.5 border-t border-white/[0.08] pt-4">
                  {activeEntry.logos.map((logo) => (
                    <div
                      key={`${activeEntry.id}-panel-${logo.src}`}
                      className="flex h-10 min-w-[44px] shrink-0 items-center justify-center rounded-lg border border-white/15 px-3 py-1.5 shadow-sm"
                      style={{ backgroundColor: logo.bg ?? "#0B0C0E" }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt[lang]}
                        loading="eager"
                        decoding="sync"
                        className={`block object-contain ${
                          logo.wide ? "h-auto max-h-6 w-auto max-w-[136px]" : "h-7 w-auto"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Chapter Stack with Live Titanium Progress Spine + Glowing Beacon Lamp */}
        <div ref={trackWrapRef} className="relative ps-5 sm:ps-8 lg:col-span-7">
          <div
            className="pointer-events-none absolute bottom-4 start-0 top-4 w-[2px] rounded-full bg-white/[0.1]"
            aria-hidden="true"
          >
            <div
              ref={spineFillRef}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#D4D7DD] to-[#8E94A0]"
              style={{ transform: "scaleY(0)" }}
            />
            <div
              ref={beaconRef}
              className="absolute start-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2"
            >
              <span className="beacon-lamp block h-full w-full rounded-full bg-[#FFFFFF]" />
            </div>
          </div>

          <div className="space-y-6">
            {CAREER_CHRONICLE.map((entry, idx) => {
              const isActive = idx === activeIndex;
              return (
                <article
                  key={entry.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`chronicle-item relative rounded-2xl border p-5 transition-all duration-300 sm:p-8 ${
                    isActive
                      ? "border-[#DDE2EB]/55 bg-[#161923]/96 shadow-[0_16px_42px_-18px_rgba(212,215,221,0.24),inset_0_1px_0_rgba(255,255,255,0.09)]"
                      : "border-white/[0.1] bg-[#13161E]/88 hover:border-white/25"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -start-[26px] top-8 h-3 w-3 rounded-full border transition-all duration-300 sm:-start-[38px] ${
                      isActive
                        ? "scale-110 border-[#FFFFFF] bg-[#FFFFFF] shadow-[0_0_10px_rgba(244,245,247,0.85)]"
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
                    <BiDiText text={entry.role[lang]} lang={lang} />
                  </h3>

                  <p className="mt-1.5 text-balance text-sm font-medium text-[#D4D7DD]">
                    <BiDiText text={entry.organization[lang]} lang={lang} />
                  </p>

                  {entry.logos && entry.logos.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {entry.logos.map((logo) => (
                        <div
                          key={`${entry.id}-${logo.src}`}
                          className="flex h-11 min-w-[48px] shrink-0 items-center justify-center rounded-xl border border-white/15 px-3.5 py-1.5 shadow-sm"
                          style={{ backgroundColor: logo.bg ?? "#0B0C0E" }}
                        >
                          <img
                            src={logo.src}
                            alt={logo.alt[lang]}
                            loading="eager"
                            decoding="sync"
                            className={`block object-contain ${
                              logo.wide ? "h-auto max-h-6 w-auto max-w-[140px]" : "h-8 w-auto"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF] sm:text-[15px]">
                    <BiDiText text={entry.summary[lang]} lang={lang} />
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
                        <span>
                          <BiDiText text={highlight} lang={lang} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  {entry.mentorship && (
                    <div className="mt-5 rounded-e-md border border-white/[0.06] border-s border-s-white/25 bg-white/[0.025] px-4 py-3.5">
                      <p
                        className={`mb-2 text-[10px] sm:text-[11px] font-medium text-[#A1A6B0] ${
                          lang === "en"
                            ? "font-mono-code uppercase tracking-[0.18em]"
                            : "font-display tracking-normal"
                        }`}
                      >
                        {entry.mentorship.eyebrow[lang]}
                      </p>
                      <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#D1D5DB]">
                        <RichInlineText
                          text={entry.mentorship.body[lang]}
                          lang={lang}
                          links={[
                            {
                              match: entry.mentorship.entity.label[lang],
                              url: entry.mentorship.entity.url,
                            },
                          ]}
                        />
                      </p>
                    </div>
                  )}

                  {entry.links && entry.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2.5 border-t border-white/[0.07] pt-4">
                      {entry.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => window.dispatchEvent(new CustomEvent("begamal:showreel-play"))}
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#1B1F2C]/90 px-4 py-2 text-xs font-medium text-[#F4F5F7] transition-all hover:border-[#D4D7DD] hover:bg-[#D4D7DD] hover:text-[#050505]"
                        >
                          <Play size={12} weight="fill" />
                          <span>
                            <BiDiText text={link.label[lang]} lang={lang} />
                          </span>
                          <ArrowUpRight size={13} weight="bold" className="inline-block rtl:-scale-x-100" />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
