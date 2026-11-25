import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORIES,
  CaseStudy,
  CaseStudyCategory,
} from "../data/portfolioData";

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
  if (total === 7) {
    if (index === 0) return "lg:col-span-7";
    if (index === 1) return "lg:col-span-5";
    if (index >= 2 && index <= 4) return "lg:col-span-4";
    if (index === 5) return "lg:col-span-5";
    return "lg:col-span-7";
  }
  return index % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5";
}

export function WorksSection() {
  const [activeCategory, setActiveCategory] = useState<CaseStudyCategory>("All");
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = useMemo(() => {
    if (activeCategory === "All") return CASE_STUDIES;
    return CASE_STUDIES.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (!selectedStudy) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStudy(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedStudy]);

  return (
    <section
      id="works"
      className="relative z-10 border-t border-white/[0.06] bg-[#050505]/85 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.22em] text-[#C5A572]">
              Client Roster &amp; Case Studies
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium uppercase tracking-[0.06em] text-[#F2F0EB] sm:text-4xl">
              Selected Works
            </h2>
          </div>

          {/* Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter case studies by discipline"
            className="flex flex-wrap gap-2"
          >
            {CASE_STUDY_CATEGORIES.map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 active:scale-[0.98] whitespace-nowrap ${
                    selected
                      ? "border-[#C5A572] bg-[#C5A572] text-[#050505]"
                      : "border-white/10 bg-[#111114] text-[#8E8A82] hover:border-white/25 hover:text-[#F2F0EB]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gapless Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-flow-dense grid-cols-1 gap-5 lg:grid-cols-12">
          {filteredStudies.map((study, index) => {
            const spanClass = getBentoSpanClass(index, filteredStudies.length);
            return (
              <article
                key={study.id}
                className={`${spanClass} group rounded-[1.5rem] border border-white/[0.08] bg-[#111114]/90 p-1.5 transition-colors duration-300 hover:border-[#C5A572]/45`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedStudy(study)}
                  className="flex h-full w-full flex-col justify-between rounded-[1.15rem] bg-[#0A0A0C] p-6 text-left transition-colors duration-300 group-hover:bg-[#0D0D10]"
                >
                  <div>
                    {/* Visual Header or Typographic Monogram */}
                    {study.image ? (
                      <div
                        className={`mb-6 flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] ${
                          study.isLogoMark ? "h-44 p-4" : "aspect-video"
                        }`}
                        style={{ backgroundColor: study.imageBg ?? "#0A0A0C" }}
                      >
                        <img
                          src={study.image}
                          alt={`${study.title} visual identity`}
                          loading="lazy"
                          className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
                            study.isLogoMark
                              ? "h-28 w-auto max-w-[78%] rounded-xl object-contain"
                              : "h-full w-full object-cover"
                          }`}
                        />
                      </div>
                    ) : (
                      <div className="mb-6 flex h-28 w-full items-center justify-between rounded-xl border border-white/[0.06] bg-[#111114] px-6">
                        <span className="font-display text-2xl tracking-wider text-[#F2F0EB]">
                          {study.title}
                        </span>
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: study.accentHex }}
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono-code text-[11px] uppercase tracking-[0.16em] text-[#C5A572]">
                        {study.period}
                      </span>
                      <span className="font-mono-code text-[11px] text-[#8E8A82]">
                        {study.category}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl font-semibold text-[#F2F0EB] sm:text-2xl">
                        {study.title}
                      </h3>
                      {study.titleAr && (
                        <span
                          lang="ar"
                          dir="rtl"
                          className="font-arabic text-base font-semibold text-[#C5A572]"
                        >
                          {study.titleAr}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs font-medium tracking-wide text-[#8E8A82]">
                      {study.discipline}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[#F2F0EB]/80">
                      {study.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <span className="font-mono-code text-xs text-[#8E8A82]">
                      Open Case Dossier
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#111114] text-[#F2F0EB] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[#C5A572]/50 group-hover:text-[#C5A572]">
                      <ArrowUpRight size={15} weight="bold" />
                    </span>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/85 p-4 backdrop-blur-xl sm:p-6"
          onClick={() => setSelectedStudy(null)}
        >
          <div
            className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-[1.5rem] border border-white/15 bg-[#111114] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="font-mono-code text-xs uppercase tracking-[0.18em] text-[#C5A572]">
                  {selectedStudy.period} · {selectedStudy.category}
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
                  <h3
                    id="modal-study-title"
                    className="font-display text-2xl font-medium text-[#F2F0EB] sm:text-3xl"
                  >
                    {selectedStudy.title}
                  </h3>
                  {selectedStudy.titleAr && (
                    <span
                      lang="ar"
                      dir="rtl"
                      className="font-arabic text-lg font-semibold text-[#C5A572]"
                    >
                      {selectedStudy.titleAr}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                aria-label="Close case study dossier"
                onClick={() => setSelectedStudy(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0C] text-[#F2F0EB] transition-colors hover:border-[#C5A572]/50 hover:text-[#C5A572]"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {selectedStudy.image && (
              <div
                className="mt-6 flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.08]"
                style={{ backgroundColor: selectedStudy.imageBg ?? "#0A0A0C" }}
              >
                <img
                  src={selectedStudy.image}
                  alt={`${selectedStudy.title} preview`}
                  className={
                    selectedStudy.isLogoMark
                      ? "h-36 w-auto max-w-[78%] object-contain"
                      : "h-full w-full object-cover"
                  }
                />
              </div>
            )}

            <p className="mt-6 text-base leading-relaxed text-[#F2F0EB]/90">
              {selectedStudy.summary}
            </p>

            <div className="mt-6 space-y-3 border-t border-white/[0.08] pt-5">
              <h4 className="font-mono-code text-xs uppercase tracking-[0.18em] text-[#C5A572]">
                Verified Scope &amp; Execution
              </h4>
              <ul className="space-y-2.5">
                {selectedStudy.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[#8E8A82]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: selectedStudy.accentHex }}
                      aria-hidden="true"
                    />
                    <span className="text-[#F2F0EB]/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-5">
              {selectedStudy.campaigns.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-[#0A0A0C] px-3.5 py-1.5 font-mono-code text-xs text-[#F2F0EB]/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {selectedStudy.link && (
              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <a
                  href={selectedStudy.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C5A572] px-5 py-2.5 text-xs font-semibold text-[#050505] transition-colors hover:bg-[#d2b586]"
                >
                  <span>Visit {selectedStudy.link.label}</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
