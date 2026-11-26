import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Play, X } from "@phosphor-icons/react";
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

function ClientStatusBadge({
  status,
  lang,
}: {
  status: ClientStatus;
  lang: Lang;
}) {
  const styles: Record<ClientStatus, { pill: string; dot: string }> = {
    active: {
      pill: "border-[#D4D7DD]/50 bg-[#F4F5F7]/[0.12] text-[#F4F5F7]",
      dot: "bg-[#F4F5F7] shadow-[0_0_8px_rgba(244,245,247,0.85)]",
    },
    new: {
      pill: "border-[#C98A5B]/50 bg-[#C98A5B]/[0.14] text-[#F0C6A3]",
      dot: "bg-[#D99B66]",
    },
    leaving_soon: {
      pill: "border-[#D99B52]/55 bg-[#D99B52]/[0.15] text-[#F5D29A]",
      dot: "bg-[#E2A85C] shadow-[0_0_8px_rgba(226,168,92,0.75)]",
    },
    ended: {
      pill: "border-white/15 bg-white/[0.05] text-[#9AA2B0]",
      dot: "bg-[#7A8290]",
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
  const heightClass = tall ? "h-40 sm:h-52" : "h-44";

  if (study.image) {
    if (study.isWhitePlate) {
      return (
        <div
          className={`${heightClass} flex w-full items-center justify-center rounded-xl border border-white/[0.11] bg-[#12161E] p-4`}
        >
          <div className="flex h-32 w-56 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white px-5 py-3 shadow-lg">
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
        className={`${heightClass} flex w-full items-center justify-center rounded-xl border border-white/[0.11] bg-[#12161E] p-4`}
      >
        {study.isPortraitMedallion ? (
          <div className="h-36 w-36 rounded-full border border-[#D4D7DD]/35 bg-[#111215] p-1 shadow-[0_10px_28px_rgba(0,0,0,0.65)]">
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
          <div className="h-32 w-32 overflow-hidden rounded-2xl border border-white/15 shadow-lg">
            <img
              src={study.image}
              alt={study.title[lang]}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-28 w-56 items-center justify-center overflow-hidden px-4 py-2">
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
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-[#181C26] font-display text-lg font-semibold tracking-wider text-[#E2E6EF]">
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
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".works-card",
        { y: 12, opacity: 0.92 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".works-grid",
            start: "top 96%",
            once: true,
          },
        }
      );
    }, sectionRef);

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [activeCategory, lang]);

  useEffect(() => {
    if (!selectedStudy) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStudy(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedStudy]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative z-10 border-t border-white/[0.1] bg-[#0F1218]/65 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        {/* Featured 16:9 Cinema Vimeo Showreel Showcase */}
        <a
          href={PORTFOLIO_IDENTITY.vimeoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-16 block rounded-[2rem] border border-white/[0.12] bg-[#171B24]/95 p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-[#D4D7DD]/50"
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
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1017] via-[#0D1017]/30 to-transparent"
                aria-hidden="true"
              />

              {/* Centered Metallic Titanium Play Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="btn-titanium flex h-16 w-16 items-center justify-center rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.75)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                  <Play size={24} weight="fill" className="translate-x-0.5 text-[#050505]" />
                </span>
              </div>

              {/* Bottom Cinema Overlay Metadata */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-end sm:p-8">
                <div>
                  <p className="font-mono-code text-[11px] uppercase tracking-[0.2em] text-[#D4D7DD]">
                    {UI_COPY.works.showreelEyebrow[lang]}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-[#F4F5F7] sm:text-2xl">
                    {UI_COPY.works.showreelTitle[lang]}
                  </h3>
                  <p className="mt-1 hidden max-w-xl text-sm text-[#9CA3AF] sm:block">
                    {UI_COPY.works.showreelSubtitle[lang]}
                  </p>
                </div>

                <span className="btn-titanium inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-transform duration-300 group-hover:translate-x-0.5">
                  <span>{UI_COPY.works.showreelCta[lang]}</span>
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Section Header + Category Filters */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.2em] text-[#D4D7DD]">
              {UI_COPY.works.eyebrow[lang]}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-[0.06em] text-[#F4F5F7] sm:text-4xl">
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
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 active:scale-[0.98] whitespace-nowrap ${
                    selected
                      ? "btn-titanium border-[#F4F5F7] font-semibold"
                      : "border-white/15 bg-[#151822] text-[#A7B0BE] hover:border-white/30 hover:text-[#F4F5F7]"
                  }`}
                >
                  {category.label[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Double-Bezel Gapless Asymmetric Bento Grid */}
        <div className="works-grid mt-12 grid grid-flow-dense grid-cols-1 gap-5 lg:grid-cols-12">
          {filteredStudies.map((study, index) => {
            const spanClass = getBentoSpanClass(index, filteredStudies.length);
            const primaryLink = study.links[0];
            return (
              <article
                key={study.id}
                className={`${spanClass} works-card group flex flex-col justify-between rounded-[1.5rem] border border-white/[0.12] bg-[#181C25]/94 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4D7DD]/50`}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.15rem] bg-[#101319] p-6 transition-colors duration-300 group-hover:bg-[#141822]">
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(study)}
                    className="w-full text-start"
                  >
                    <div className="mb-6">
                      <CaseStudyVisualStage study={study} lang={lang} />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <ClientStatusBadge status={study.status} lang={lang} />
                        <span className="font-mono-code text-[11px] uppercase tracking-[0.12em] text-[#D4D7DD]">
                          {study.period[lang]}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#9CA3AF]">
                        {categoryLabelMap.get(study.category)}
                      </span>
                    </div>

                    <h3 className="mt-3 text-balance text-xl font-semibold text-[#F4F5F7] sm:text-2xl">
                      {study.title[lang]}
                    </h3>

                    <p className="mt-2 text-xs font-medium tracking-wide text-[#9CA3AF]">
                      {study.discipline[lang]}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[#F4F5F7]/85">
                      {study.summary[lang]}
                    </p>
                  </button>

                  {/* Interactive Project Brief + Direct Client Page */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedStudy(study)}
                      className="text-xs font-medium text-[#D4D7DD] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#F4F5F7] hover:decoration-[#F4F5F7]"
                    >
                      {UI_COPY.works.openDossier[lang]}
                    </button>

                    {primaryLink ? (
                      <a
                        href={primaryLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#161923] px-3.5 py-1.5 text-xs font-medium text-[#F4F5F7] transition-colors hover:border-[#D4D7DD] hover:bg-[#D4D7DD] hover:text-[#050505]"
                      >
                        <span>{UI_COPY.works.visitPage[lang]}</span>
                        <ArrowUpRight size={13} weight="bold" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedStudy(study)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#161923] px-3.5 py-1.5 text-xs font-medium text-[#F4F5F7] transition-colors hover:border-[#D4D7DD] hover:bg-[#D4D7DD] hover:text-[#050505]"
                      >
                        <span>{UI_COPY.works.caseStudyCta[lang]}</span>
                        <ArrowUpRight size={13} weight="bold" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Case Study Modal */}
      {selectedStudy &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-study-title"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#090B0F]/84 p-4 backdrop-blur-xl sm:p-6"
            onClick={() => setSelectedStudy(null)}
          >
            <div
              className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-[1.5rem] border border-white/20 bg-[#161923] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.65)] sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4 sm:pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <ClientStatusBadge status={selectedStudy.status} lang={lang} />
                    <p className="font-mono-code text-xs uppercase tracking-[0.14em] text-[#D4D7DD]">
                      {selectedStudy.period[lang]} · {categoryLabelMap.get(selectedStudy.category)}
                    </p>
                  </div>
                  <h3
                    id="modal-study-title"
                    className="mt-2 font-display text-xl font-semibold text-[#F4F5F7] sm:text-3xl"
                  >
                    {selectedStudy.title[lang]}
                  </h3>
                </div>

                <button
                  type="button"
                  aria-label={UI_COPY.works.closeModal[lang]}
                  onClick={() => setSelectedStudy(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0C] text-[#F4F5F7] transition-colors hover:border-[#D4D7DD] hover:text-white"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <div className="mt-4 sm:mt-6">
                <CaseStudyVisualStage study={selectedStudy} lang={lang} tall />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#F4F5F7]/90 sm:mt-6 sm:text-base">
                {selectedStudy.summary[lang]}
              </p>

              <div className="mt-4 space-y-2.5 border-t border-white/[0.08] pt-4 sm:mt-6 sm:space-y-3 sm:pt-5">
                <h4 className="font-mono-code text-xs uppercase tracking-[0.16em] text-[#D4D7DD]">
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
                      <span className="text-[#F4F5F7]/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-5">
                {selectedStudy.campaigns[lang].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-[#0A0A0C] px-3.5 py-1.5 text-xs text-[#F4F5F7]/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {selectedStudy.links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3 border-t border-white/[0.08] pt-5">
                  {selectedStudy.links.map((item) => (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-titanium inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold"
                    >
                      <span>{item.label[lang]}</span>
                      <ArrowUpRight size={14} weight="bold" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
