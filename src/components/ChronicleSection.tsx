import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAREER_CHRONICLE, Lang, UI_COPY } from "../data/portfolioData";
import { BiDiText } from "./BiDiText";
import { RichInlineText } from "./SignatureGlowLink";
import { useDossierNavigation } from "../hooks/useDossierNavigation";

gsap.registerPlugin(ScrollTrigger);

interface ChronicleSectionProps {
  lang: Lang;
  onModalOpenChange?: (isOpen: boolean) => void;
}

export function ChronicleSection({
  lang,
  onModalOpenChange,
}: ChronicleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const total = CAREER_CHRONICLE.length;
  const activeRailIndex = selectedIndex ?? hoveredIndex;

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

  const handleClose = useCallback(() => setSelectedIndex(null), []);
  const handleNewer = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);
  const handleOlder = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < total - 1 ? prev + 1 : prev
    );
  }, [total]);

  useDossierNavigation({
    isOpen: selectedIndex !== null,
    lang,
    onClose: handleClose,
    onPrev: handleNewer,
    onNext: handleOlder,
    onModalOpenChange,
  });

  useEffect(() => {
    if (selectedIndex !== null && modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [selectedIndex]);

  const selectedEntry =
    selectedIndex !== null ? CAREER_CHRONICLE[selectedIndex] : null;
  const newerEntry =
    selectedIndex !== null && selectedIndex > 0
      ? CAREER_CHRONICLE[selectedIndex - 1]
      : null;
  const olderEntry =
    selectedIndex !== null && selectedIndex < total - 1
      ? CAREER_CHRONICLE[selectedIndex + 1]
      : null;

  return (
    <section
      id="chronicle"
      ref={sectionRef}
      className="relative z-10 border-t border-white/10 bg-[#0B0D12]/42 px-5 py-20 sm:px-8 sm:py-24 md:py-32"
    >
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
          <div className="relative inline-flex min-w-full items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#12151D]/85 p-2 backdrop-blur-md">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-white/[0.08]"
            />
            {CAREER_CHRONICLE.map((entry, idx) => {
              const isActive = activeRailIndex === idx;
              return (
                <button
                  key={`rail-${entry.id}`}
                  type="button"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onFocus={() => setHoveredIndex(idx)}
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative z-10 flex shrink-0 items-center gap-2 rounded-xl border px-3 py-1.5 font-mono-code text-[11px] transition-all duration-300 ease-out whitespace-nowrap ${
                    isActive
                      ? "border-white/25 bg-[#191D28] text-[#F4F5F7] shadow-[0_0_20px_rgba(229,231,235,0.1)]"
                      : "border-transparent bg-[#12151D]/90 text-[#A1A6B0] hover:border-white/15 hover:text-[#F4F5F7]"
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
                </button>
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
              return (
                <button
                  key={entry.id}
                  type="button"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onFocus={() => setHoveredIndex(idx)}
                  onClick={() => setSelectedIndex(idx)}
                  className={`era-node-card group flex flex-col justify-between rounded-2xl border border-white/[0.11] bg-[#13161F]/90 p-5 text-start transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.04] focus-visible:border-white/40 active:scale-[0.99] ${
                    isFoundationWide ? "md:col-span-2 lg:col-span-3" : ""
                  }`}
                >
                  <div className="w-full">
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
                        className="h-2 w-2 shrink-0 rounded-full bg-white/30 transition-all duration-300 ease-out group-hover:bg-[#FFFFFF] group-hover:shadow-[0_0_10px_rgba(229,231,235,0.85)]"
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
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Focused Obsidian Glass Era Dossier (Modal / Mobile Bottom Sheet) */}
      {selectedEntry &&
        selectedIndex !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="era-dossier-title"
            data-lenis-prevent=""
            data-lenis-prevent-wheel=""
            data-lenis-prevent-touch=""
            className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden overscroll-none bg-[#06070A]/82 p-0 backdrop-blur-xl sm:items-center sm:p-6"
            onClick={handleClose}
          >
            <div
              className="dossier-enter relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.5rem] border border-white/15 bg-[#08080A]/96 shadow-[0_28px_80px_rgba(0,0,0,0.85)] sm:max-h-[88dvh] sm:rounded-[1.5rem]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Ambient Silver Top Hairline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5E7EB]/45 to-transparent"
              />

              {/* Dossier Header */}
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.08] px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 font-mono-code text-[11px] text-[#A1A6B0]">
                    <span
                      dir="ltr"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 font-semibold tabular-nums text-[#F4F5F7]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E5E7EB] shadow-[0_0_8px_rgba(229,231,235,0.85)]" />
                      {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </span>
                    <span className="text-[#D4D7DD]">
                      {selectedEntry.period[lang]}
                    </span>
                    <span aria-hidden="true" className="text-white/25">
                      ·
                    </span>
                    <span>{selectedEntry.location[lang]}</span>
                  </div>
                  <h3
                    id="era-dossier-title"
                    className="mt-2.5 text-lg font-semibold leading-snug text-[#F4F5F7] sm:text-2xl"
                  >
                    <BiDiText text={selectedEntry.role[lang]} lang={lang} />
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#D4D7DD] sm:text-sm">
                    <BiDiText
                      text={selectedEntry.organization[lang]}
                      lang={lang}
                    />
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={UI_COPY.chronicle.closeDossier[lang]}
                  onClick={handleClose}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#111319] text-[#F4F5F7] transition-colors duration-300 ease-out hover:border-white/40 hover:text-white"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Mini Year-Node Skipper Strip with Glowing Beacon Lamp */}
              <div className="shrink-0 border-b border-white/[0.07] bg-white/[0.015] px-5 py-2.5 sm:px-8">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {CAREER_CHRONICLE.map((node, idx) => {
                    const isCurrent = idx === selectedIndex;
                    return (
                      <button
                        key={`skip-${node.id}`}
                        type="button"
                        onClick={() => setSelectedIndex(idx)}
                        title={`${node.period[lang]} — ${node.organization[lang]}`}
                        className={`relative flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono-code text-[10px] transition-all duration-200 whitespace-nowrap ${
                          isCurrent
                            ? "border-white/30 bg-white/[0.1] text-[#F4F5F7]"
                            : "border-white/[0.07] bg-transparent text-[#A1A6B0] hover:border-white/20 hover:text-[#F4F5F7]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${
                            isCurrent
                              ? "beacon-lamp bg-[#FFFFFF]"
                              : "bg-white/25"
                          }`}
                        />
                        <span dir="ltr" className="tabular-nums">
                          {String(idx + 1).padStart(2, "0")} · {node.railYear[lang]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable Rich Dossier Body */}
              <div
                ref={modalBodyRef}
                data-lenis-prevent=""
                data-lenis-prevent-wheel=""
                data-lenis-prevent-touch=""
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y px-5 py-5 pb-20 sm:px-8 sm:py-6"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div key={selectedEntry.id} className="dossier-stage-fade">
                  {selectedEntry.logos && selectedEntry.logos.length > 0 && (
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      {selectedEntry.logos.map((logo) => (
                        <div
                          key={`${selectedEntry.id}-dossier-${logo.src}`}
                          className="flex h-11 min-w-[48px] shrink-0 items-center justify-center rounded-xl border border-white/15 px-3.5 py-1.5 shadow-sm"
                          style={{ backgroundColor: logo.bg ?? "#0B0C0E" }}
                        >
                          <img
                            src={logo.src}
                            alt={logo.alt[lang]}
                            loading="eager"
                            decoding="sync"
                            className={`block object-contain ${
                              logo.wide
                                ? "h-auto max-h-6 w-auto max-w-[140px]"
                                : "h-8 w-auto"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm leading-relaxed text-[#E4E4E7]/90 sm:text-[15px]">
                    <BiDiText text={selectedEntry.summary[lang]} lang={lang} />
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-4">
                    {selectedEntry.highlights[lang].map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-xs leading-relaxed text-[#F4F5F7]/85 sm:text-sm"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4D7DD]"
                          aria-hidden="true"
                        />
                        <span>
                          <BiDiText text={highlight} lang={lang} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  {selectedEntry.mentorship && (
                    <div className="mt-5 rounded-e-md border border-white/[0.06] border-s border-s-white/25 bg-white/[0.025] px-4 py-3.5">
                      <p
                        className={`mb-2 text-[10px] font-medium text-[#A1A6B0] sm:text-[11px] ${
                          lang === "en"
                            ? "font-mono-code uppercase tracking-[0.18em]"
                            : "font-display tracking-normal"
                        }`}
                      >
                        {selectedEntry.mentorship.eyebrow[lang]}
                      </p>
                      <p className="text-[13.5px] leading-relaxed text-[#D1D5DB] sm:text-[14px]">
                        <RichInlineText
                          text={selectedEntry.mentorship.body[lang]}
                          lang={lang}
                          links={selectedEntry.mentorship.entities.map(
                            (ent) => ({
                              match: ent.label[lang],
                              url: ent.url,
                            })
                          )}
                        />
                      </p>
                    </div>
                  )}

                  {selectedEntry.links && selectedEntry.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2.5 border-t border-white/[0.08] pt-4">
                      {selectedEntry.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            window.dispatchEvent(
                              new CustomEvent("begamal:showreel-play")
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#1B1F2C]/90 px-4 py-2 text-xs font-medium text-[#F4F5F7] transition-all duration-300 ease-out hover:border-[#D4D7DD] hover:bg-[#D4D7DD] hover:text-[#050505]"
                        >
                          <Play size={12} weight="fill" />
                          <span>
                            <BiDiText text={link.label[lang]} lang={lang} />
                          </span>
                          <ArrowUpRight
                            size={13}
                            weight="bold"
                            className="inline-block rtl:-scale-x-100"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Path vs. Skip Bottom Navigation Bar */}
              <div className="flex shrink-0 items-center justify-between gap-2 border-t border-white/[0.08] bg-[#0B0C10]/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-3.5">
                <button
                  type="button"
                  disabled={!newerEntry}
                  onClick={handleNewer}
                  className="group flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-start transition-all duration-300 ease-out hover:border-white/25 hover:bg-white/[0.05] disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowLeft
                    size={14}
                    weight="bold"
                    className="shrink-0 text-[#D4D7DD] rtl:-scale-x-100"
                  />
                  <div className="min-w-0">
                    <span className="block font-mono-code text-[10px] text-[#A1A6B0]">
                      {UI_COPY.chronicle.newerStage[lang]}
                    </span>
                    {newerEntry && (
                      <span className="block truncate text-xs font-medium text-[#F4F5F7]">
                        {newerEntry.railYear[lang]} · {newerEntry.organization[lang]}
                      </span>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="shrink-0 rounded-full border border-white/15 bg-[#141720] px-3.5 py-2 text-[11px] font-medium text-[#D4D7DD] transition-colors duration-300 ease-out hover:border-white/35 hover:text-white whitespace-nowrap"
                >
                  {UI_COPY.chronicle.backToGrid[lang]}
                </button>

                <button
                  type="button"
                  disabled={!olderEntry}
                  onClick={handleOlder}
                  className="group flex min-w-0 flex-1 items-center justify-end gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-end transition-all duration-300 ease-out hover:border-white/25 hover:bg-white/[0.05] disabled:pointer-events-none disabled:opacity-30"
                >
                  <div className="min-w-0">
                    <span className="block font-mono-code text-[10px] text-[#A1A6B0]">
                      {UI_COPY.chronicle.olderStage[lang]}
                    </span>
                    {olderEntry && (
                      <span className="block truncate text-xs font-medium text-[#F4F5F7]">
                        {olderEntry.railYear[lang]} · {olderEntry.organization[lang]}
                      </span>
                    )}
                  </div>
                  <ArrowRight
                    size={14}
                    weight="bold"
                    className="shrink-0 text-[#D4D7DD] rtl:-scale-x-100"
                  />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
