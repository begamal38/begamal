import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORIES,
  CaseStudy,
  CaseStudyCategoryId,
  Lang,
  UI_COPY,
} from "../data/portfolioData";

interface WorksSectionProps {
  lang: Lang;
}

/**
 * Computes gapless 12-column spans for any filtered count so no row
 * leaves trailing dead space.
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
    if (index >= 2 && index <= 4) return "lg:col-span-4";
    if (index >= 5 && index <= 7) return "lg:col-span-4";
    return "lg:col-span-6";
  }
  if (total === 11) {
    if (index === 0) return "lg:col-span-7";
    if (index === 1) return "lg:col-span-5";
    return "lg:col-span-4";
  }
  return index % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5";
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
  const heightClass = tall ? "h-52" : "h-44";

  if (study.image) {
    if (study.isWhitePlate) {
      return (
        <div
          className={`${heightClass} flex w-full items-center justify-center rounded-xl border border-white/[0.08] bg-[#0B0B0D] p-4`}
        >
          <div className="flex h-32 w-56 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white px-5 py-3 shadow-lg">
            <img
              src={study.image}
              alt={study.title[lang]}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${heightClass} flex w-full items-center justify-center rounded-xl border border-white/[0.08] bg-[#0B0B0D] p-4`}
      >
        <div className="h-32 w-32 overflow-hidden rounded-2xl border border-white/15 shadow-lg">
          <img
            src={study.image}
            alt={study.title[lang]}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${heightClass} flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-[#0B0B0D] p-5 text-center`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C5A572]/40 bg-[#141418] font-display text-lg font-semibold tracking-wider text-[#C5A572]">
        {study.monogram ?? study.title.en.slice(0, 2).toUpperCase()}
      </div>
      <span className="font-display text-base tracking-wide text-[#F2F0EB]">
        {study.title[lang]}
      </span>
    </div>
  );
}

export function WorksSection({ lang }: WorksSectionProps) {
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
      className="relative z-10 border-t border-white/[0.06] bg-[#050505]/85 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.2em] text-[#C5A572]">
              {UI_COPY.works.eyebrow[lang]}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-[0.06em] text-[#F2F0EB] sm:text-4xl">
              {UI_COPY.works.title[lang]}
            </h2>
          </div>

          {/* Filter Pills */}
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
                      ? "border-[#C5A572] bg-[#C5A572] text-[#050505]"
                      : "border-white/10 bg-[#111114] text-[#D6D3CD]/80 hover:border-white/25 hover:text-[#F2F0EB]"
                  }`}
                >
                  {category.label[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gapless Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-flow-dense grid-cols-1 gap-5 lg:grid-cols-12">
          {filteredStudies.map((study, index) => {
            const spanClass = getBentoSpanClass(index, filteredStudies.length);
            const primaryLink = study.links[0];
            return (
              <article
                key={study.id}
                className={`${spanClass} group flex flex-col justify-between rounded-[1.5rem] border border-white/[0.08] bg-[#111114]/90 p-1.5 transition-colors duration-300 hover:border-[#C5A572]/45`}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.15rem] bg-[#0A0A0C] p-6 transition-colors duration-300 group-hover:bg-[#0D0D10]">
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(study)}
                    className="w-full text-start"
                  >
                    <div className="mb-6">
                      <CaseStudyVisualStage study={study} lang={lang} />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#C5A572]">
                        {study.period[lang]}
                      </span>
                      <span className="text-[11px] text-[#8E8A82]">
                        {categoryLabelMap.get(study.category)}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-semibold text-[#F2F0EB] sm:text-2xl">
                      {study.title[lang]}
                    </h3>

                    <p className="mt-2 text-xs font-medium tracking-wide text-[#8E8A82]">
                      {study.discipline[lang]}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[#F2F0EB]/85">
                      {study.summary[lang]}
                    </p>
                  </button>

                  {/* Card Action Bar: Interactive Project Brief + Direct Client Page / Case Study */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedStudy(study)}
                      className="text-xs font-medium text-[#D6D3CD]/80 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#C5A572] hover:decoration-[#C5A572]"
                    >
                      {UI_COPY.works.openDossier[lang]}
                    </button>

                    {primaryLink ? (
                      <a
                        href={primaryLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A572]/35 bg-[#111114] px-3.5 py-1.5 text-xs font-medium text-[#C5A572] transition-colors hover:border-[#C5A572] hover:bg-[#C5A572] hover:text-[#050505]"
                      >
                        <span>{UI_COPY.works.visitPage[lang]}</span>
                        <ArrowUpRight size={13} weight="bold" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedStudy(study)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A572]/35 bg-[#111114] px-3.5 py-1.5 text-xs font-medium text-[#C5A572] transition-colors hover:border-[#C5A572] hover:bg-[#C5A572] hover:text-[#050505]"
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

      {/* Case Study Detail Modal (portaled above fixed navbar) */}
      {selectedStudy &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-study-title"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]/88 p-4 backdrop-blur-xl sm:p-6"
            onClick={() => setSelectedStudy(null)}
          >
            <div
              className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-[1.5rem] border border-white/15 bg-[#111114] p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  <p className="font-mono-code text-xs uppercase tracking-[0.16em] text-[#C5A572]">
                    {selectedStudy.period[lang]} · {categoryLabelMap.get(selectedStudy.category)}
                  </p>
                  <h3
                    id="modal-study-title"
                    className="mt-2 font-display text-2xl font-semibold text-[#F2F0EB] sm:text-3xl"
                  >
                    {selectedStudy.title[lang]}
                  </h3>
                </div>

                <button
                  type="button"
                  aria-label={UI_COPY.works.closeModal[lang]}
                  onClick={() => setSelectedStudy(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0C] text-[#F2F0EB] transition-colors hover:border-[#C5A572]/60 hover:text-[#C5A572]"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <div className="mt-6">
                <CaseStudyVisualStage study={selectedStudy} lang={lang} tall />
              </div>

              <p className="mt-6 text-base leading-relaxed text-[#F2F0EB]/90">
                {selectedStudy.summary[lang]}
              </p>

              <div className="mt-6 space-y-3 border-t border-white/[0.08] pt-5">
                <h4 className="font-mono-code text-xs uppercase tracking-[0.16em] text-[#C5A572]">
                  {UI_COPY.works.scopeHeading[lang]}
                </h4>
                <ul className="space-y-2.5">
                  {selectedStudy.deliverables[lang].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#8E8A82]"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C5A572]"
                        aria-hidden="true"
                      />
                      <span className="text-[#F2F0EB]/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-5">
                {selectedStudy.campaigns[lang].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-[#0A0A0C] px-3.5 py-1.5 text-xs text-[#F2F0EB]/80"
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
                      className="inline-flex items-center gap-2 rounded-full bg-[#C5A572] px-5 py-2.5 text-xs font-semibold text-[#050505] transition-colors hover:bg-[#d2b586]"
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
