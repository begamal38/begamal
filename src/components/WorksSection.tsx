import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORIES,
  CaseStudy,
  CaseStudyCategoryId,
  Lang,
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
          className={`${heightClass} flex w-full items-center justify-center rounded-xl border border-white/[0.08] bg-[#09090C] p-4`}
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

    const isWideWordmark = study.id === "chance-media";
    return (
      <div
        className={`${heightClass} flex w-full items-center justify-center rounded-xl border border-white/[0.08] bg-[#09090C] p-4`}
      >
        <div
          className={
            isWideWordmark
              ? "flex h-28 w-56 items-center justify-center overflow-hidden px-4 py-2"
              : "h-32 w-32 overflow-hidden rounded-2xl border border-white/15 shadow-lg"
          }
        >
          <img
            src={study.image}
            alt={study.title[lang]}
            loading="lazy"
            className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 ${
              isWideWordmark ? "object-contain" : "object-cover"
            }`}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${heightClass} flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-[#09090C] p-5 text-center`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C81E32]/45 bg-[#121216] font-display text-lg font-semibold tracking-wider text-[#E11D38]">
        {study.monogram ?? study.title.en.slice(0, 2).toUpperCase()}
      </div>
      <span className="font-display text-base tracking-wide text-[#F1F2F4]">
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
        { y: 22, opacity: 0.65 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".works-grid",
            start: "top 86%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
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
      className="relative z-10 border-t border-white/[0.08] bg-[#050505]/45 px-5 py-24 sm:px-8 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-code text-[11px] uppercase tracking-[0.2em] text-[#E11D38]">
              {UI_COPY.works.eyebrow[lang]}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-[0.06em] text-[#F1F2F4] sm:text-4xl">
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
                      ? "border-[#C81E32] bg-[#C81E32] text-[#F1F2F4]"
                      : "border-white/10 bg-[#121216] text-[#A1A1AA] hover:border-white/25 hover:text-[#F1F2F4]"
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
                className={`${spanClass} works-card group flex flex-col justify-between rounded-[1.5rem] border border-white/[0.09] bg-[#121216]/90 p-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C81E32]/55`}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.15rem] bg-[#0A0A0D] p-6 transition-colors duration-300 group-hover:bg-[#0D0D11]">
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(study)}
                    className="w-full text-start"
                  >
                    <div className="mb-6">
                      <CaseStudyVisualStage study={study} lang={lang} />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#E11D38]">
                        {study.period[lang]}
                      </span>
                      <span className="text-[11px] text-[#A1A1AA]">
                        {categoryLabelMap.get(study.category)}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-semibold text-[#F1F2F4] sm:text-2xl">
                      {study.title[lang]}
                    </h3>

                    <p className="mt-2 text-xs font-medium tracking-wide text-[#A1A1AA]">
                      {study.discipline[lang]}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[#F1F2F4]/85">
                      {study.summary[lang]}
                    </p>
                  </button>

                  {/* Interactive Project Brief + Direct Client Page */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedStudy(study)}
                      className="text-xs font-medium text-[#E4E4E7]/85 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#E11D38] hover:decoration-[#E11D38]"
                    >
                      {UI_COPY.works.openDossier[lang]}
                    </button>

                    {primaryLink ? (
                      <a
                        href={primaryLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#C81E32]/40 bg-[#121216] px-3.5 py-1.5 text-xs font-medium text-[#F1F2F4] transition-colors hover:border-[#E11D38] hover:bg-[#C81E32]"
                      >
                        <span>{UI_COPY.works.visitPage[lang]}</span>
                        <ArrowUpRight size={13} weight="bold" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedStudy(study)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#C81E32]/40 bg-[#121216] px-3.5 py-1.5 text-xs font-medium text-[#F1F2F4] transition-colors hover:border-[#E11D38] hover:bg-[#C81E32]"
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]/88 p-4 backdrop-blur-xl sm:p-6"
            onClick={() => setSelectedStudy(null)}
          >
            <div
              className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-[1.5rem] border border-[#C81E32]/35 bg-[#121216] p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  <p className="font-mono-code text-xs uppercase tracking-[0.16em] text-[#E11D38]">
                    {selectedStudy.period[lang]} · {categoryLabelMap.get(selectedStudy.category)}
                  </p>
                  <h3
                    id="modal-study-title"
                    className="mt-2 font-display text-2xl font-semibold text-[#F1F2F4] sm:text-3xl"
                  >
                    {selectedStudy.title[lang]}
                  </h3>
                </div>

                <button
                  type="button"
                  aria-label={UI_COPY.works.closeModal[lang]}
                  onClick={() => setSelectedStudy(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0D] text-[#F1F2F4] transition-colors hover:border-[#E11D38] hover:text-[#E11D38]"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <div className="mt-6">
                <CaseStudyVisualStage study={selectedStudy} lang={lang} tall />
              </div>

              <p className="mt-6 text-base leading-relaxed text-[#F1F2F4]/90">
                {selectedStudy.summary[lang]}
              </p>

              <div className="mt-6 space-y-3 border-t border-white/[0.08] pt-5">
                <h4 className="font-mono-code text-xs uppercase tracking-[0.16em] text-[#E11D38]">
                  {UI_COPY.works.scopeHeading[lang]}
                </h4>
                <ul className="space-y-2.5">
                  {selectedStudy.deliverables[lang].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#A1A1AA]"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E11D38]"
                        aria-hidden="true"
                      />
                      <span className="text-[#F1F2F4]/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-5">
                {selectedStudy.campaigns[lang].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-[#0A0A0D] px-3.5 py-1.5 text-xs text-[#F1F2F4]/80"
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
                      className="inline-flex items-center gap-2 rounded-full bg-[#C81E32] px-5 py-2.5 text-xs font-semibold text-[#F1F2F4] transition-colors hover:bg-[#E11D38]"
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
