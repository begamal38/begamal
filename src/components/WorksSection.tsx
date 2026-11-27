import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORIES,
  CLIENT_STATUS_LABELS,
  CaseStudy,
  CaseStudyCategoryId,
  ClientStatus,
  Lang,
  PORTFOLIO_IDENTITY,
  UI_COPY,
} from "../data/portfolioData";
import { BiDiText } from "./BiDiText";
import { useDossierNavigation } from "../hooks/useDossierNavigation";

gsap.registerPlugin(ScrollTrigger);

interface WorksSectionProps {
  lang: Lang;
  onModalOpenChange?: (isOpen: boolean) => void;
}

/**
 * Computes gapless 12-column spans for any filtered count (1..13+)
 * so no row leaves trailing dead space.
 */
function getBentoSpanClass(index: number, total: number): string {
  if (total === 1) return "lg:col-span-12";
  if (total === 2) return "lg:col-span-6";
  if (total === 3) return "lg:col-span-4";
  if (total === 4) {
    return index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5";
  }
  if (total === 5) {
    return index < 2 ? "lg:col-span-6" : "lg:col-span-4";
  }
  if (total === 6) return "lg:col-span-4";
  if (total === 7) {
    if (index === 0) return "lg:col-span-7";
    if (index === 1) return "lg:col-span-5";
    if (index >= 2 && index <= 4) return "lg:col-span-4";
    if (index === 5) return "lg:col-span-5";
    return "lg:col-span-7";
  }
  if (total === 8) {
    if (index === 0) return "lg:col-span-7";
    if (index === 1) return "lg:col-span-5";
    return "lg:col-span-4";
  }
  if (total === 9) {
    if (index === 0) return "lg:col-span-7";
    if (index === 1) return "lg:col-span-5";
    if (index >= 2 && index <= 4) return "lg:col-span-4";
    if (index === 5 || index === 6) return "lg:col-span-6";
    if (index === 7) return "lg:col-span-5";
    return "lg:col-span-7";
  }
  if (total === 10) {
    if (index === 0) return "lg:col-span-7";
    if (index === 1) return "lg:col-span-5";
    return index >= 2 && index <= 7 ? "lg:col-span-4" : "lg:col-span-6";
  }
  if (total === 11) {
    if (index === 0) return "lg:col-span-7";
    if (index === 1) return "lg:col-span-5";
    return "lg:col-span-4";
  }
  if (total === 12) return "lg:col-span-4";
  if (total === 13) {
    if (index === 0) return "lg:col-span-7";
    if (index === 1) return "lg:col-span-5";
    if (index >= 2 && index <= 10) return "lg:col-span-4";
    return "lg:col-span-6";
  }
  return index % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5";
}

function ClientStatusBadge({
  status,
  lang,
}: {
  status: ClientStatus;
  lang: Lang;
}) {
  const styles: Record<ClientStatus, { pill: string; dot: string }> = {
    active: {
      pill: "border-[#E5E7EB]/55 bg-[#F4F5F7]/[0.12] text-[#F4F5F7]",
      dot: "bg-[#F4F5F7] shadow-[0_0_8px_rgba(244,245,247,0.85)]",
    },
    new: {
      pill: "border-[#E5E7EB]/65 bg-[#E5E7EB]/[0.18] text-[#FFFFFF]",
      dot: "bg-[#FFFFFF] ring-2 ring-[#A1A6B0]/50",
    },
    leaving_soon: {
      pill: "border-dashed border-[#A1A6B0]/65 bg-[#27292E]/80 text-[#E5E7EB]",
      dot: "bg-[#A1A6B0]",
    },
    ended: {
      pill: "border-white/15 bg-white/[0.04] text-[#9CA3AF]",
      dot: "bg-[#6B7280]",
    },
  };

  return (
    <span
      data-client-status={status}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono-code text-[10px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap ${styles[status].pill}`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${styles[status].dot}`}
        aria-hidden="true"
      />
      <span>{CLIENT_STATUS_LABELS[status][lang]}</span>
    </span>
  );
}

function CaseStudyVisualStage({
  study,
  lang,
  tall = false,
}: {
  study: CaseStudy;
  lang: Lang;
  tall?: boolean;
}) {
  const heightClass = tall ? "h-40 sm:h-48" : "h-36";

  if (study.image) {
    if (study.isWhitePlate) {
      return (
        <div
          className={`${heightClass} flex w-full items-center justify-center rounded-xl border border-white/[0.11] bg-[#12161E] p-3.5`}
        >
          <div className="flex h-24 w-48 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white px-4 py-2.5 shadow-lg sm:h-28 sm:w-52">
            <img
              src={study.image}
              alt={study.title[lang]}
              decoding="async"
              className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${heightClass} flex w-full items-center justify-center rounded-xl border border-white/[0.11] bg-[#12161E] p-3.5`}
      >
        {study.isPortraitMedallion ? (
          <div className="h-28 w-28 rounded-full border border-[#D4D7DD]/35 bg-[#111215] p-1 shadow-[0_10px_28px_rgba(0,0,0,0.65)] sm:h-32 sm:w-32">
            <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10">
              <img
                src={study.image}
                alt={study.title[lang]}
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        ) : study.isMedallion ? (
          <div className="h-24 w-24 overflow-hidden rounded-2xl border border-white/15 shadow-lg sm:h-28 sm:w-28">
            <img
              src={study.image}
              alt={study.title[lang]}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-24 w-48 items-center justify-center overflow-hidden px-4 py-2 sm:w-52">
            <img
              src={study.image}
              alt={study.title[lang]}
              decoding="async"
              className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${heightClass} flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.11] bg-[#12161E] p-5 text-center`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-[#181C26] font-display text-lg font-semibold tracking-wider text-[#E2E6EF]">
        {study.monogram ?? study.title.en.slice(0, 2).toUpperCase()}
      </div>
      <span className="font-display text-base tracking-wide text-[#F4F5F7]">
        {study.title[lang]}
      </span>
    </div>
  );
}

export function WorksSection({ lang, onModalOpenChange }: WorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<CaseStudyCategoryId>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredStudies = useMemo(() => {
    if (activeCategory === "all") return CASE_STUDIES;
    return CASE_STUDIES.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const categoryLabelMap = useMemo(() => {
    const map = new Map<CaseStudyCategoryId, string>();
    CASE_STUDY_CATEGORIES.forEach((c) => map.set(c.id, c.label[lang]));
    return map;
  }, [lang]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".works-card",
        { y: 14, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.5,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".works-grid",
            start: "top 92%",
            once: true,
          },
        }
      );
    });

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      mm.revert();
    };
  }, [activeCategory, lang]);

  const handleClose = useCallback(() => setSelectedIndex(null), []);
  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);
  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < filteredStudies.length - 1 ? prev + 1 : prev
    );
  }, [filteredStudies.length]);

  useDossierNavigation({
    isOpen: selectedIndex !== null,
    lang,
    onClose: handleClose,
    onPrev: handlePrev,
    onNext: handleNext,
    onModalOpenChange,
  });

  useEffect(() => {
    if (selectedIndex !== null && modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [selectedIndex]);

  const selectedStudy =
    selectedIndex !== null ? filteredStudies[selectedIndex] ?? null : null;
  const prevStudy =
    selectedIndex !== null && selectedIndex > 0
      ? filteredStudies[selectedIndex - 1]
      : null;
  const nextStudy =
    selectedIndex !== null && selectedIndex < filteredStudies.length - 1
      ? filteredStudies[selectedIndex + 1]
      : null;

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative z-10 border-t border-white/10 bg-transparent px-5 py-20 sm:px-8 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Featured 16:9 Cinema Vimeo Showreel Showcase */}
        <a
          href={PORTFOLIO_IDENTITY.vimeoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.dispatchEvent(new CustomEvent("begamal:showreel-play"))}
          className="group mb-16 block rounded-[2rem] border border-white/[0.12] bg-[#0D0F14]/75 p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 ease-out hover:border-[#D4D7DD]/50"
        >
          <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#10131B]">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={PORTFOLIO_IDENTITY.showreelPosterPath}
                alt={UI_COPY.works.showreelTitle[lang]}
                loading="lazy"
                className="h-full w-full object-cover brightness-[0.76] contrast-[1.08] grayscale-[55%] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080C] via-[#090C12]/80 via-45% to-transparent"
                aria-hidden="true"
              />

              {/* Centered Metallic Titanium Play Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="btn-titanium flex h-16 w-16 items-center justify-center rounded-full text-[#050505] shadow-[0_12px_36px_rgba(0,0,0,0.75)] transition-transform duration-300 ease-out group-hover:scale-110 sm:h-20 sm:w-20">
                  <Play size={24} weight="fill" className="translate-x-0.5 text-[#050505]" />
                </span>
              </div>

              {/* Bottom Cinema Overlay Metadata */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-end sm:p-8">
                <div>
                  <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#A1A6B0]">
                    {UI_COPY.works.showreelEyebrow[lang]}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-[#F4F5F7] sm:text-2xl">
                    {UI_COPY.works.showreelTitle[lang]}
                  </h3>
                  <p className="mt-1 hidden max-w-xl text-sm text-[#D4D7DD]/90 sm:block">
                    {UI_COPY.works.showreelSubtitle[lang]}
                  </p>
                </div>

                <span className="btn-titanium inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-[#050505] transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                  <span>{UI_COPY.works.showreelCta[lang]}</span>
                  <ArrowUpRight size={14} weight="bold" className="inline-block rtl:-scale-x-100" />
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Section Header + Category Filters */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#A1A6B0]">
              {UI_COPY.works.eyebrow[lang]}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold uppercase tracking-[0.06em] text-[#F4F5F7]">
              {UI_COPY.works.title[lang]}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label={UI_COPY.works.title[lang]}
            className="flex flex-wrap gap-2"
          >
            {CASE_STUDY_CATEGORIES.map((category) => {
              const selected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ease-out active:scale-[0.98] whitespace-nowrap ${
                    selected
                      ? "btn-titanium border-[#F4F5F7] font-semibold"
                      : "border-white/15 bg-[#0D0F14]/80 text-[#A7B0BE] backdrop-blur-md hover:border-white/30 hover:text-[#F4F5F7]"
                  }`}
                >
                  {category.label[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Uniform Scannable Bento Grid (Progressive Disclosure) */}
        <div className="works-grid mt-10 grid grid-flow-dense grid-cols-1 gap-5 lg:grid-cols-12">
          {filteredStudies.map((study, index) => {
            const spanClass = getBentoSpanClass(index, filteredStudies.length);
            const primaryLink = study.links[0];
            return (
              <article
                key={study.id}
                className={`${spanClass} works-card group flex flex-col justify-between rounded-[1.5rem] border border-white/[0.11] bg-[#0D0F14]/75 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25`}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.15rem] bg-[#0A0A0C]/75 p-5 backdrop-blur-md transition-colors duration-300 ease-out group-hover:bg-[#11131A]/85 sm:p-6">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="w-full text-start"
                  >
                    <div className="mb-4">
                      <CaseStudyVisualStage study={study} lang={lang} />
                    </div>

                    <div className="flex min-h-[2rem] flex-nowrap items-center justify-between gap-2">
                      <div className="flex min-w-0 flex-nowrap items-center gap-1.5">
                        <ClientStatusBadge status={study.status} lang={lang} />
                        <span className="truncate font-mono-code text-[10px] uppercase tracking-[0.08em] text-[#D4D7DD] whitespace-nowrap">
                          {study.period[lang]}
                        </span>
                      </div>
                      <span className="shrink-0 whitespace-nowrap text-[10px] font-medium tracking-[0.04em] text-[#A1A6B0]">
                        {categoryLabelMap.get(study.category)}
                      </span>
                    </div>

                    <h3 className="mt-2.5 line-clamp-1 text-lg font-semibold text-[#F4F5F7] sm:text-xl">
                      <BiDiText text={study.title[lang]} lang={lang} />
                    </h3>

                    <p className="mt-1 line-clamp-1 text-xs font-medium text-[#A1A6B0]">
                      <BiDiText text={study.discipline[lang]} lang={lang} />
                    </p>

                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#9CA3AF] sm:text-[13px]">
                      <BiDiText text={study.summary[lang]} lang={lang} />
                    </p>
                  </button>

                  {/* Compact Action Row */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3.5">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D4D7DD] transition-colors duration-300 ease-out hover:text-white"
                    >
                      <span>{UI_COPY.works.openDossier[lang]}</span>
                      <ArrowUpRight
                        size={13}
                        weight="bold"
                        className="inline-block opacity-75 rtl:-scale-x-100"
                      />
                    </button>

                    {primaryLink && (
                      <a
                        href={primaryLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#161923] px-3 py-1 text-[11px] font-medium text-[#D4D7DD] transition-colors duration-300 ease-out hover:border-[#D4D7DD] hover:bg-[#D4D7DD] hover:text-[#050505]"
                      >
                        <span>{primaryLink.label[lang]}</span>
                        <ArrowUpRight
                          size={12}
                          weight="bold"
                          className="inline-block rtl:-scale-x-100"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Obsidian Case Dossier Modal / Mobile Bottom Sheet */}
      {selectedStudy &&
        selectedIndex !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-study-title"
            data-lenis-prevent=""
            data-lenis-prevent-wheel=""
            data-lenis-prevent-touch=""
            className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden overscroll-none bg-[#06070A]/82 p-0 backdrop-blur-xl sm:items-center sm:p-6"
            onClick={handleClose}
          >
            <div
              className="dossier-enter relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.5rem] border border-white/15 bg-[#08080A]/96 shadow-[0_28px_80px_rgba(0,0,0,0.85)] sm:max-h-[88dvh] sm:rounded-[1.5rem]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Ambient Silver Top Hairline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5E7EB]/45 to-transparent"
              />

              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.08] p-5 pb-4 sm:p-7 sm:pb-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <ClientStatusBadge status={selectedStudy.status} lang={lang} />
                    <p className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#A1A6B0]">
                      {selectedStudy.period[lang]} ·{" "}
                      {categoryLabelMap.get(selectedStudy.category)}
                    </p>
                  </div>
                  <h3
                    id="modal-study-title"
                    className="mt-2 font-display text-xl font-semibold text-[#F4F5F7] sm:text-2xl"
                  >
                    <BiDiText text={selectedStudy.title[lang]} lang={lang} />
                  </h3>
                </div>

                <button
                  type="button"
                  aria-label={UI_COPY.works.closeModal[lang]}
                  onClick={handleClose}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#111319] text-[#F4F5F7] transition-colors duration-300 ease-out hover:border-white/40 hover:text-white"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              <div
                ref={modalBodyRef}
                data-modal-scroll="true"
                data-lenis-prevent=""
                data-lenis-prevent-wheel=""
                data-lenis-prevent-touch=""
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y p-5 pt-4 pb-20 sm:p-7 sm:pt-5"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div key={selectedStudy.id} className="dossier-stage-fade">
                  <CaseStudyVisualStage study={selectedStudy} lang={lang} tall />

                  <p className="mt-4 text-sm leading-relaxed text-[#E4E4E7]/90 sm:mt-5 sm:text-[15px]">
                    <BiDiText text={selectedStudy.summary[lang]} lang={lang} />
                  </p>

                  <div className="mt-4 space-y-2.5 border-t border-white/[0.08] pt-4 sm:mt-5 sm:space-y-3 sm:pt-5">
                    <h4 className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#A1A6B0]">
                      {UI_COPY.works.scopeHeading[lang]}
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedStudy.deliverables[lang].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-[#9CA3AF]"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4D7DD]"
                            aria-hidden="true"
                          />
                          <span className="text-[#F4F5F7]/85">
                            <BiDiText text={item} lang={lang} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.08] pt-4">
                    {selectedStudy.campaigns[lang].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-[#0A0A0C] px-3 py-1 text-xs text-[#F4F5F7]/80"
                      >
                        <BiDiText text={tag} lang={lang} />
                      </span>
                    ))}
                  </div>

                  {selectedStudy.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3 border-t border-white/[0.08] pt-4">
                      {selectedStudy.links.map((item) => (
                        <a
                          key={item.url}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-titanium inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-[#050505]"
                        >
                          <span>
                            <BiDiText text={item.label[lang]} lang={lang} />
                          </span>
                          <ArrowUpRight
                            size={14}
                            weight="bold"
                            className="inline-block rtl:-scale-x-100"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Prev / Back to Works / Next Bottom Bar */}
              <div className="flex shrink-0 items-center justify-between gap-2 border-t border-white/[0.08] bg-[#0B0C10]/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-7 sm:py-3.5">
                <button
                  type="button"
                  disabled={!prevStudy}
                  onClick={handlePrev}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-start transition-all duration-300 ease-out hover:border-white/25 hover:bg-white/[0.05] disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowLeft
                    size={14}
                    weight="bold"
                    className="shrink-0 text-[#D4D7DD] rtl:-scale-x-100"
                  />
                  <div className="min-w-0">
                    <span className="block font-mono-code text-[10px] text-[#A1A6B0]">
                      {UI_COPY.works.prevWork[lang]}
                    </span>
                    {prevStudy && (
                      <span className="block truncate text-xs font-medium text-[#F4F5F7]">
                        {prevStudy.title[lang]}
                      </span>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="shrink-0 rounded-full border border-white/15 bg-[#141720] px-3.5 py-2 text-[11px] font-medium text-[#D4D7DD] transition-colors duration-300 ease-out hover:border-white/35 hover:text-white whitespace-nowrap"
                >
                  {UI_COPY.works.backToWorks[lang]}
                </button>

                <button
                  type="button"
                  disabled={!nextStudy}
                  onClick={handleNext}
                  className="flex min-w-0 flex-1 items-center justify-end gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-end transition-all duration-300 ease-out hover:border-white/25 hover:bg-white/[0.05] disabled:pointer-events-none disabled:opacity-30"
                >
                  <div className="min-w-0">
                    <span className="block font-mono-code text-[10px] text-[#A1A6B0]">
                      {UI_COPY.works.nextWork[lang]}
                    </span>
                    {nextStudy && (
                      <span className="block truncate text-xs font-medium text-[#F4F5F7]">
                        {nextStudy.title[lang]}
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
