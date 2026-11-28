import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Play } from "@phosphor-icons/react";
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
  UI_COPY,
} from "../data/portfolioData";
import { BiDiText } from "./BiDiText";
import { onInternalLinkClick } from "../lib/router";

gsap.registerPlugin(ScrollTrigger);

interface WorksSectionProps {
  lang: Lang;
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

export function ClientStatusBadge({
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

export function CaseStudyVisualStage({
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

export function WorksSection({ lang }: WorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<CaseStudyCategoryId>("all");

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



  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative z-10 bg-transparent px-5 py-14 sm:px-8 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="mx-auto max-w-6xl">
        {/* Featured films: header + two 16:9 cinema cards in one identity */}
        <div className="mb-12">
          <div className="mb-5">
            <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#A1A6B0]">
              {UI_COPY.works.showreelEyebrow[lang]}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-[#F4F5F7] sm:text-2xl">
              {UI_COPY.works.showreelTitle[lang]}
            </h3>
            <p className="mt-1.5 max-w-2xl text-sm text-[#D4D7DD]/90">
              {UI_COPY.works.showreelSubtitle[lang]}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {UI_COPY.works.films.map((film) => (
              <a
                key={film.id}
                href={film.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.dispatchEvent(new CustomEvent("begamal:showreel-play"))}
                className="film-card group block rounded-[2rem] border border-white/[0.12] bg-[#0D0F14]/75 p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 ease-out hover:border-[#D4D7DD]/50"
              >
                <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#10131B]">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={film.poster}
                      alt={film.title[lang]}
                      loading="lazy"
                      className="h-full w-full object-cover brightness-[0.8] contrast-[1.08] grayscale-[55%] transition-all duration-700 ease-out group-hover:scale-[1.025] group-hover:brightness-95 group-hover:grayscale-0"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080C] via-[#090C12]/70 via-40% to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="btn-titanium flex h-14 w-14 items-center justify-center rounded-full text-[#050505] shadow-[0_12px_36px_rgba(0,0,0,0.75)] transition-transform duration-300 ease-out group-hover:scale-110 sm:h-16 sm:w-16">
                        <Play size={22} weight="fill" className="translate-x-0.5 text-[#050505]" />
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                      <div className="min-w-0">
                        <p className="font-mono-code text-[10px] uppercase tracking-[0.16em] text-[#A1A6B0] sm:text-[11px]">
                          {film.eyebrow[lang]}
                        </p>
                        <p className="mt-1 font-display text-base font-semibold text-[#F4F5F7] sm:text-lg">
                          {film.title[lang]}
                        </p>
                      </div>
                      <span
                        className="btn-titanium inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#050505] transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                        title={film.cta[lang]}
                      >
                        <span className="sr-only">{film.cta[lang]}</span>
                        <ArrowUpRight size={16} weight="bold" className="inline-block rtl:-scale-x-100" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

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
                  className={`min-h-11 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ease-out active:scale-[0.98] whitespace-nowrap ${
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
                  <a
                    href={`/work/${study.id}`}
                    onClick={(e) => onInternalLinkClick(e, `/work/${study.id}`)}
                    className="block w-full text-start"
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
                  </a>

                  {/* Compact Action Row */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3.5">
                    <a
                      href={`/work/${study.id}`}
                      onClick={(e) => onInternalLinkClick(e, `/work/${study.id}`)}
                      className="-my-2 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-[#D4D7DD] transition-colors duration-300 ease-out hover:text-white"
                    >
                      <span>{UI_COPY.works.openDossier[lang]}</span>
                      <ArrowUpRight
                        size={13}
                        weight="bold"
                        className="inline-block opacity-75 rtl:-scale-x-100"
                      />
                    </a>

                    {primaryLink && (
                      <a
                        href={primaryLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 bg-[#161923] px-3.5 py-2.5 text-[12px] font-medium text-[#D4D7DD] transition-colors duration-300 ease-out hover:border-[#D4D7DD] hover:bg-[#D4D7DD] hover:text-[#050505]"
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

    </section>
  );
}
