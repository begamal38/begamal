import { ArrowUpRight } from "@phosphor-icons/react";
import { CASE_STUDIES, CASE_STUDY_CATEGORIES, Lang, UI_COPY } from "../data/portfolioData";
import { BiDiText } from "./BiDiText";
import { CaseStudyVisualStage, ClientStatusBadge } from "./WorksSection";
import { DetailShell } from "./DetailShell";

/** /work/<slug>: one client case as a full page (the former popup, unchanged content). */
export function WorkPage({ slug, lang }: { slug: string; lang: Lang }) {
  const index = CASE_STUDIES.findIndex((s) => s.id === slug);
  const study = CASE_STUDIES[index];
  const prev = index > 0 ? CASE_STUDIES[index - 1] : null;
  const next = index < CASE_STUDIES.length - 1 ? CASE_STUDIES[index + 1] : null;
  const category = CASE_STUDY_CATEGORIES.find((c) => c.id === study.category)?.label[lang] ?? "";

  return (
    <DetailShell
      lang={lang}
      backHref="/work"
      backLabel={UI_COPY.works.backToWorks[lang]}
      counter={`${String(index + 1).padStart(2, "0")} / ${String(CASE_STUDIES.length).padStart(2, "0")}`}
      meta={`${study.period[lang]} · ${category}`}
      dots={CASE_STUDIES.map((s) => ({ href: `/work/${s.id}`, label: s.title[lang], current: s.id === study.id }))}
      prev={prev && { href: `/work/${prev.id}`, eyebrow: UI_COPY.works.prevWork[lang], title: prev.title[lang] }}
      next={next && { href: `/work/${next.id}`, eyebrow: UI_COPY.works.nextWork[lang], title: next.title[lang] }}
    >
      <div
        className="dossier-stage-fade grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
      >
        {/* Left Metadata & Stage Rail */}
        <aside className="flex flex-col justify-between gap-5 border-b border-white/[0.08] pb-5 lg:col-span-5 lg:border-b-0 lg:border-e lg:border-white/10 lg:pb-0 lg:pe-6">
          <div className="space-y-4">
            <CaseStudyVisualStage study={study} lang={lang} />

            <div>
              <div className="mb-2 flex items-center gap-2">
                <ClientStatusBadge status={study.status} lang={lang} />
              </div>
              <h1
                id="work-page-title"
                className="font-display text-lg font-semibold text-[#F4F5F7] sm:text-xl"
              >
                <BiDiText text={study.title[lang]} lang={lang} />
              </h1>
              <p className="mt-1 text-xs font-medium text-[#A1A6B0]">
                <BiDiText text={study.discipline[lang]} lang={lang} />
              </p>
            </div>
          </div>

          {study.links.length > 0 && (
            <div className="flex flex-col gap-2 pt-1">
              {study.links.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-titanium inline-flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#050505]"
                >
                  <span className="truncate">
                    <BiDiText text={item.label[lang]} lang={lang} />
                  </span>
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="shrink-0 inline-block rtl:-scale-x-100"
                  />
                </a>
              ))}
            </div>
          )}
        </aside>

        {/* Right Narrative Column */}
        <div className="min-w-0 space-y-5 lg:col-span-7">
          <div>
            <p className="mb-2 font-mono-code text-[10px] uppercase tracking-[0.18em] text-[#A1A6B0]">
              {UI_COPY.chronicle.executiveLeadLabel[lang]}
            </p>
            <p className="text-[15px] leading-relaxed text-[#E5E7EB]">
              <BiDiText text={study.summary[lang]} lang={lang} />
            </p>
          </div>

          <div className="border-t border-white/[0.08] pt-4">
            <h4 className="mb-3 font-mono-code text-[10px] uppercase tracking-[0.18em] text-[#A1A6B0]">
              {UI_COPY.works.scopeHeading[lang]}
            </h4>
            <ul className="space-y-2.5">
              {study.deliverables[lang].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#C7CBD3]"
                >
                  <span
                    className="mt-2.5 h-px w-3 shrink-0 bg-[#A1A6B0]/70"
                    aria-hidden="true"
                  />
                  <span>
                    <BiDiText text={item} lang={lang} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-4">
            {study.campaigns[lang].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#E5E7EB]/85"
              >
                <BiDiText text={tag} lang={lang} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </DetailShell>
  );
}
