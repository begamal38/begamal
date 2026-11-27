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
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const total = CAREER_CHRONICLE.length;
  const activeRailIndex = selectedIndex ?? activeStageIndex;

  const openStage = useCallback((idx: number) => {
    setActiveStageIndex(idx);
    setSelectedIndex(idx);
  }, []);

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
    setSelectedIndex((prev) => {
      if (prev !== null && prev > 0) {
        const nextIdx = prev - 1;
        setActiveStageIndex(nextIdx);
        return nextIdx;
      }
      return prev;
    });
  }, []);
  const handleOlder = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev !== null && prev < total - 1) {
        const nextIdx = prev + 1;
        setActiveStageIndex(nextIdx);
        return nextIdx;
      }
      return prev;
    });
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
                <button
                  key={`rail-${entry.id}`}
                  type="button"
                  onMouseEnter={() => setActiveStageIndex(idx)}
                  onFocus={() => setActiveStageIndex(idx)}
                  onClick={() => openStage(idx)}
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
              const isNodeActive = activeRailIndex === idx;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onMouseEnter={() => setActiveStageIndex(idx)}
                  onFocus={() => setActiveStageIndex(idx)}
                  onClick={() => openStage(idx)}
                  className={`era-node-card group flex flex-col justify-between rounded-2xl border p-5 text-start backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05] focus-visible:border-white/40 active:scale-[0.99] ${
                    isNodeActive
                      ? "border-white/22 bg-[#0F1219]/82"
                      : "border-white/[0.11] bg-[#0A0A0C]/75"
                  } ${isFoundationWide ? "md:col-span-2 lg:col-span-3" : ""}`}
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

      {/* Focused Obsidian Glass Era Dossier (Editorial 2-Column Split Modal / Mobile Sheet) */}
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
            className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden overscroll-none bg-[#050507]/82 p-0 backdrop-blur-xl sm:items-center sm:p-6"
            onClick={handleClose}
          >
            <div
              className="dossier-enter relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-white/12 bg-[#07070A]/94 shadow-[0_32px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:max-h-[88dvh] sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Ambient Silver Top Hairline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5E7EB]/45 to-transparent"
              />

              {/* Single-Row Clean Dossier Header */}
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-3.5 sm:px-7">
                <div
                  dir="ltr"
                  className="flex min-w-0 items-center gap-2 font-mono-code text-[11px] text-[#A1A6B0]"
                >
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold tabular-nums text-[#F4F5F7]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E5E7EB] shadow-[0_0_8px_rgba(229,231,235,0.85)]" />
                    {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="text-white/25">
                    ·
                  </span>
                  <span className="truncate text-[#D4D7DD]">
                    {selectedEntry.period[lang]}
                  </span>
                </div>

                {/* Subtle Center Progress Indicator */}
                <div
                  aria-label={UI_COPY.chronicle.railAria[lang]}
                  className="hidden items-center gap-1.5 sm:flex"
                >
                  {CAREER_CHRONICLE.map((node, idx) => {
                    const isCurrent = idx === selectedIndex;
                    return (
                      <button
                        key={`dot-${node.id}`}
                        type="button"
                        onClick={() => openStage(idx)}
                        aria-label={`${String(idx + 1).padStart(2, "0")} · ${node.railYear[lang]} — ${node.organization[lang]}`}
                        title={`${node.period[lang]} — ${node.organization[lang]}`}
                        className="group flex h-4 items-center px-0.5"
                      >
                        <span
                          className={`block rounded-full transition-all duration-200 ${
                            isCurrent
                              ? "h-1.5 w-5 bg-[#E5E7EB] shadow-[0_0_8px_rgba(229,231,235,0.65)]"
                              : "h-1.5 w-1.5 bg-white/20 group-hover:bg-white/55"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  aria-label={UI_COPY.chronicle.closeDossier[lang]}
                  onClick={handleClose}
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-[#111319]/90 px-3 text-[#E5E7EB] transition-colors duration-200 hover:border-white/40 hover:text-white"
                >
                  <span className="hidden font-mono-code text-[10px] uppercase tracking-wider text-[#A1A6B0] sm:inline">
                    ESC
                  </span>
                  <X size={14} weight="bold" />
                </button>
              </div>

              {/* Editorial 2-Column Scrollable Dossier Body */}
              <div
                ref={modalBodyRef}
                data-lenis-prevent=""
                data-lenis-prevent-wheel=""
                data-lenis-prevent-touch=""
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y px-5 py-6 sm:px-8 sm:py-7"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div
                  key={selectedEntry.id}
                  className="dossier-stage-fade grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
                >
                  {/* Left Metadata Rail */}
                  <aside className="flex flex-col gap-5 border-b border-white/[0.08] pb-5 lg:col-span-4 lg:gap-6 lg:border-b-0 lg:border-e lg:border-white/10 lg:pb-0 lg:pe-6">
                    <div className="space-y-4">
                      {selectedEntry.logos && selectedEntry.logos.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2.5">
                          {selectedEntry.logos.map((logo) => (
                            <div
                              key={`${selectedEntry.id}-dossier-${logo.src}`}
                              className="flex h-10 min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-white/15 px-3 py-1.5 shadow-sm"
                              style={{ backgroundColor: logo.bg ?? "#0B0C0E" }}
                            >
                              <img
                                src={logo.src}
                                alt={logo.alt[lang]}
                                loading="eager"
                                decoding="sync"
                                className={`block object-contain ${
                                  logo.wide
                                    ? "h-auto max-h-5 w-auto max-w-[120px]"
                                    : "h-7 w-auto"
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div>
                        <h3
                          id="era-dossier-title"
                          className="text-lg font-semibold leading-snug text-[#F4F5F7] sm:text-xl"
                        >
                          <BiDiText text={selectedEntry.role[lang]} lang={lang} />
                        </h3>
                        <p className="mt-1.5 text-sm font-medium text-[#D4D7DD]">
                          <BiDiText
                            text={selectedEntry.organization[lang]}
                            lang={lang}
                          />
                        </p>
                        {!selectedEntry.organization[lang].includes(
                          selectedEntry.location[lang]
                        ) && (
                          <p className="mt-1 font-mono-code text-[11px] text-[#A1A6B0]">
                            {selectedEntry.location[lang]}
                          </p>
                        )}
                      </div>

                      {selectedEntry.kpis && selectedEntry.kpis[lang].length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {selectedEntry.kpis[lang].map((kpi) => (
                            <span
                              key={kpi}
                              className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 font-mono-code text-[10px] font-medium tracking-wide text-[#E5E7EB]"
                            >
                              {kpi}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedEntry.links && selectedEntry.links.length > 0 && (
                      <div className="flex flex-col gap-2 pt-2">
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
                            className="inline-flex w-full items-center justify-between gap-2.5 rounded-xl border border-white/20 bg-white/[0.06] px-3.5 py-2.5 text-xs font-medium text-[#F4F5F7] transition-all duration-200 hover:border-[#E5E7EB] hover:bg-[#E5E7EB] hover:text-[#050505]"
                          >
                            <span className="inline-flex items-center gap-2">
                              <Play size={12} weight="fill" className="shrink-0" />
                              <span>
                                <BiDiText text={link.label[lang]} lang={lang} />
                              </span>
                            </span>
                            <ArrowUpRight
                              size={13}
                              weight="bold"
                              className="shrink-0 inline-block rtl:-scale-x-100"
                            />
                          </a>
                        ))}
                      </div>
                    )}

                    {selectedEntry.archivePhoto && (
                      <figure className="group max-w-[205px] overflow-hidden rounded-xl border border-white/12 bg-[#0B0D12]/90 p-1.5 shadow-sm">
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={selectedEntry.archivePhoto.src}
                            alt={selectedEntry.archivePhoto.alt[lang]}
                            loading="lazy"
                            decoding="async"
                            className="aspect-square w-full object-cover grayscale contrast-[1.08] brightness-[0.94] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
                          />
                        </div>
                        <figcaption className="mt-1.5 px-1 pb-0.5 font-mono-code text-[9.5px] leading-snug text-[#A1A6B0]">
                          <BiDiText
                            text={selectedEntry.archivePhoto.caption[lang]}
                            lang={lang}
                          />
                        </figcaption>
                      </figure>
                    )}
                  </aside>

                  {/* Right Narrative Column */}
                  <div className="min-w-0 space-y-5 lg:col-span-8">
                    <div>
                      <p className="mb-2 font-mono-code text-[10px] uppercase tracking-[0.18em] text-[#A1A6B0]">
                        {UI_COPY.chronicle.executiveLeadLabel[lang]}
                      </p>
                      <p className="text-[15px] leading-relaxed text-[#E5E7EB]">
                        <BiDiText text={selectedEntry.summary[lang]} lang={lang} />
                      </p>
                    </div>

                    <div className="border-t border-white/[0.08] pt-4">
                      <p className="mb-3 font-mono-code text-[10px] uppercase tracking-[0.18em] text-[#A1A6B0]">
                        {UI_COPY.chronicle.impactHighlightsLabel[lang]}
                      </p>
                      <ul className="space-y-2.5">
                        {selectedEntry.highlights[lang].map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-3 text-sm leading-relaxed text-[#C7CBD3]"
                          >
                            <span
                              className="mt-2.5 h-px w-3 shrink-0 bg-[#A1A6B0]/70"
                              aria-hidden="true"
                            />
                            <span>
                              <BiDiText text={highlight} lang={lang} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedEntry.highlightProof && (
                      <figure className="overflow-hidden rounded-xl border border-white/12 bg-[#0A0C10]/95 p-3 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
                        <figcaption
                          className={`mb-2 text-[10px] font-medium text-[#A1A6B0] ${
                            lang === "en"
                              ? "font-mono-code uppercase tracking-[0.16em]"
                              : "font-display tracking-normal"
                          }`}
                        >
                          {selectedEntry.highlightProof.eyebrow[lang]}
                        </figcaption>
                        <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0A0C10]">
                          <img
                            src={selectedEntry.highlightProof.src}
                            alt={selectedEntry.highlightProof.alt[lang]}
                            loading="lazy"
                            decoding="async"
                            className="block w-full object-contain"
                          />
                        </div>
                        <p className="mt-2 text-[11.5px] leading-relaxed text-[#9CA3AF]">
                          <BiDiText
                            text={selectedEntry.highlightProof.caption[lang]}
                            lang={lang}
                          />
                        </p>
                      </figure>
                    )}

                    {selectedEntry.mentorship && (
                      <div className="rounded-e-lg border border-white/[0.06] border-s border-s-white/25 bg-white/[0.03] px-4 py-3.5">
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
                  </div>
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
