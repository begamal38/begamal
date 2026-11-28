import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAREER_CHRONICLE, Lang, UI_COPY } from "../data/portfolioData";
import { BiDiText } from "./BiDiText";
import { onInternalLinkClick } from "../lib/router";

gsap.registerPlugin(ScrollTrigger);

interface ChronicleSectionProps {
  lang: Lang;
}

export function ChronicleSection({ lang }: ChronicleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const total = CAREER_CHRONICLE.length;
  const activeRailIndex = activeStageIndex;


  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".era-node-card",
        { y: 14, opacity: 0.55 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.5,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".era-node-grid",
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, [lang]);

  return (
    <section
      id="chronicle"
      ref={sectionRef}
      className="relative z-10 bg-transparent px-5 py-14 sm:px-8 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="mx-auto max-w-6xl">
        {/* Section Header + Quick Year-Jump Timeline Node Rail */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold uppercase tracking-[0.06em] text-[#F4F5F7]">
              {UI_COPY.chronicle.title[lang]}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
              <BiDiText text={UI_COPY.chronicle.subtitle[lang]} lang={lang} />
            </p>
          </div>

          <div
            dir="ltr"
            className="flex items-center gap-2 font-mono-code text-xs text-[#A1A6B0]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5E7EB] shadow-[0_0_10px_rgba(229,231,235,0.85)]" />
            <span className="tabular-nums">
              {String(activeRailIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Horizontal Quick Year-Jump Rail with Glowing Active Beacon Dot */}
        <nav
          aria-label={UI_COPY.chronicle.railAria[lang]}
          className="relative mt-8 overflow-x-auto no-scrollbar pb-2"
        >
          <div className="relative inline-flex min-w-full items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#0A0A0C]/75 p-2 backdrop-blur-md">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-white/[0.08]"
            />
            {CAREER_CHRONICLE.map((entry, idx) => {
              const isActive = activeRailIndex === idx;
              return (
                <a
                  key={`rail-${entry.id}`}
                  href={`/chronicle/${entry.id}`}
                  onMouseEnter={() => setActiveStageIndex(idx)}
                  onFocus={() => setActiveStageIndex(idx)}
                  onClick={(e) => onInternalLinkClick(e, `/chronicle/${entry.id}`)}
                  className={`group relative z-10 flex shrink-0 items-center gap-2 min-h-11 rounded-xl border px-3.5 py-2 font-mono-code text-[12px] transition-all duration-300 ease-out whitespace-nowrap ${
                    isActive
                      ? "border-white/25 bg-[#191D28] text-[#F4F5F7] shadow-[0_0_20px_rgba(229,231,235,0.1)]"
                      : "border-transparent bg-[#0D0F14]/90 text-[#A1A6B0] hover:border-white/15 hover:text-[#F4F5F7]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? "beacon-lamp bg-[#FFFFFF]"
                        : "bg-white/25 group-hover:bg-[#D4D7DD]"
                    }`}
                  />
                  <span dir="ltr" className="tabular-nums">
                    {entry.railYear[lang]}
                  </span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* Compact Architectural Era Node Grid (Progressive Disclosure) */}
        <div className="era-node-grid relative mt-6 ps-4 sm:ps-5">
          {/* Subtle vertical titanium spine connecting the grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 start-0 top-4 w-[1.5px] rounded-full bg-gradient-to-b from-white/30 via-white/12 to-white/5"
          >
            <span className="beacon-lamp absolute start-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2 rounded-full bg-[#FFFFFF]" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CAREER_CHRONICLE.map((entry, idx) => {
              const isFoundationWide = idx === total - 1;
              const isFeatured = Boolean(entry.feature);
              const isNodeActive = activeRailIndex === idx;
              return (
                <a
                  key={entry.id}
                  href={`/chronicle/${entry.id}`}
                  onMouseEnter={() => setActiveStageIndex(idx)}
                  onFocus={() => setActiveStageIndex(idx)}
                  onClick={(e) => onInternalLinkClick(e, `/chronicle/${entry.id}`)}
                  className={`era-node-card group flex flex-col justify-between rounded-2xl border p-5 text-start backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05] focus-visible:border-white/40 active:scale-[0.99] ${
                    isNodeActive
                      ? "border-white/22 bg-[#0F1219]/82"
                      : "border-white/[0.11] bg-[#0A0A0C]/75"
                  } ${isFoundationWide ? "md:col-span-2 lg:col-span-2" : ""} ${isFeatured ? "md:col-span-2 lg:col-span-2" : ""}`}
                >
                  <div className="w-full">
                    {entry.feature && (
                      <div className="-mx-1 -mt-1 mb-4 overflow-hidden rounded-xl border border-white/10">
                        <img
                          src={entry.feature.photo}
                          alt={entry.feature.alt[lang]}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[720/300] w-full object-cover grayscale contrast-[1.06] brightness-[0.85] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-95"
                        />
                      </div>
                    )}
                    {/* Top Row: Stage Index + Period + Hover Beacon */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono-code text-[11px] text-[#A1A6B0]">
                        <span
                          dir="ltr"
                          className="tabular-nums font-semibold text-[#D4D7DD]"
                        >
                          {String(idx + 1).padStart(2, "0")} /{" "}
                          {String(total).padStart(2, "0")}
                        </span>
                        <span aria-hidden="true" className="text-white/20">
                          ·
                        </span>
                        <span>{entry.period[lang]}</span>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ease-out ${
                          isNodeActive
                            ? "bg-[#FFFFFF] shadow-[0_0_10px_rgba(229,231,235,0.85)]"
                            : "bg-white/30 group-hover:bg-[#FFFFFF] group-hover:shadow-[0_0_10px_rgba(229,231,235,0.85)]"
                        }`}
                      />
                    </div>

                    {/* Logo Row (Consistent height across all nodes) */}
                    <div className="mt-3.5 flex min-h-[2.25rem] flex-wrap items-center gap-2">
                      {entry.logos && entry.logos.length > 0 ? (
                        entry.logos.map((logo) => (
                          <div
                            key={`${entry.id}-node-${logo.src}`}
                            className="flex h-9 min-w-[40px] shrink-0 items-center justify-center rounded-lg border border-white/15 px-2.5 py-1 shadow-sm"
                            style={{ backgroundColor: logo.bg ?? "#0B0C0E" }}
                          >
                            <img
                              src={logo.src}
                              alt={logo.alt[lang]}
                              loading="eager"
                              decoding="sync"
                              className={`block object-contain ${
                                logo.wide
                                  ? "h-auto max-h-5 w-auto max-w-[110px]"
                                  : "h-6 w-auto"
                              }`}
                            />
                          </div>
                        ))
                      ) : (
                        <span className="inline-flex h-8 items-center rounded-lg border border-white/10 bg-white/[0.03] px-2.5 font-mono-code text-[10px] tracking-wider text-[#A1A6B0]">
                          {entry.location[lang]}
                        </span>
                      )}
                    </div>

                    {/* Role Title & Organization */}
                    <h3 className="mt-3.5 line-clamp-2 text-base font-semibold leading-snug text-[#F4F5F7] sm:text-[17px]">
                      <BiDiText text={entry.role[lang]} lang={lang} />
                    </h3>
                    <p className="mt-1 line-clamp-1 text-xs font-medium text-[#D4D7DD]/90">
                      <BiDiText text={entry.organization[lang]} lang={lang} />
                    </p>

                    {entry.feature && entry.kpis && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.kpis[lang].map((kpi) => (
                          <span
                            key={kpi}
                            className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 font-mono-code text-[11px] font-medium tracking-wide text-[#F4F5F7]"
                          >
                            {kpi}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Concise 2-Line Takeaway */}
                    <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#9CA3AF]">
                      <BiDiText text={entry.summary[lang]} lang={lang} />
                    </p>
                  </div>

                  {/* Bottom Micro-Affordance */}
                  <div className="mt-4 flex w-full items-center justify-between border-t border-white/[0.06] pt-3 text-[11px] font-medium text-[#D4D7DD]">
                    <span className="transition-colors duration-300 group-hover:text-white">
                      {UI_COPY.chronicle.openEra[lang]}
                    </span>
                    <ArrowUpRight
                      size={13}
                      weight="bold"
                      className="text-[#A1A6B0] transition-all duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white rtl:-scale-x-100"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
