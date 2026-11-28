import { ArrowUpRight, Play } from "@phosphor-icons/react";
import { CAREER_CHRONICLE, Lang, UI_COPY } from "../data/portfolioData";
import { BiDiText } from "./BiDiText";
import { RichInlineText } from "./SignatureGlowLink";
import { DetailShell } from "./DetailShell";

/** /chronicle/<era>: one era as a full page (the former popup, unchanged content). */
export function EraPage({ id, lang }: { id: string; lang: Lang }) {
  const index = CAREER_CHRONICLE.findIndex((e) => e.id === id);
  const entry = CAREER_CHRONICLE[index];
  const total = CAREER_CHRONICLE.length;
  const newer = index > 0 ? CAREER_CHRONICLE[index - 1] : null;
  const older = index < total - 1 ? CAREER_CHRONICLE[index + 1] : null;

  return (
    <DetailShell
      lang={lang}
      backHref="/chronicle"
      backLabel={UI_COPY.chronicle.backToGrid[lang]}
      counter={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
      meta={entry.period[lang]}
      dots={CAREER_CHRONICLE.map((e) => ({
        href: `/chronicle/${e.id}`,
        label: `${e.period[lang]} — ${e.organization[lang]}`,
        current: e.id === entry.id,
      }))}
      prev={newer && { href: `/chronicle/${newer.id}`, eyebrow: UI_COPY.chronicle.newerStage[lang], title: `${newer.railYear[lang]} · ${newer.organization[lang]}` }}
      next={older && { href: `/chronicle/${older.id}`, eyebrow: UI_COPY.chronicle.olderStage[lang], title: `${older.railYear[lang]} · ${older.organization[lang]}` }}
    >
      <div
        className="dossier-stage-fade grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
      >
        {/* Left Metadata Rail */}
        <aside className="flex flex-col gap-5 border-b border-white/[0.08] pb-5 lg:col-span-4 lg:gap-6 lg:border-b-0 lg:border-e lg:border-white/10 lg:pb-0 lg:pe-6">
          <div className="space-y-4">
            {entry.logos && entry.logos.length > 0 && (
              <div className="flex flex-wrap items-center gap-2.5">
                {entry.logos.map((logo) => (
                  <div
                    key={`${entry.id}-dossier-${logo.src}`}
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
              <h1
                id="era-page-title"
                className="text-lg font-semibold leading-snug text-[#F4F5F7] sm:text-xl"
              >
                <BiDiText text={entry.role[lang]} lang={lang} />
              </h1>
              <p className="mt-1.5 text-sm font-medium text-[#D4D7DD]">
                <BiDiText
                  text={entry.organization[lang]}
                  lang={lang}
                />
              </p>
              {!entry.organization[lang].includes(
                entry.location[lang]
              ) && (
                <p className="mt-1 font-mono-code text-[11px] text-[#A1A6B0]">
                  {entry.location[lang]}
                </p>
              )}
            </div>

            {entry.kpis && entry.kpis[lang].length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {entry.kpis[lang].map((kpi) => (
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

          {entry.links && entry.links.length > 0 && (
            <div className="flex flex-col gap-2 pt-2">
              {entry.links.map((link) => (
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

          {entry.archivePhoto && (
            <figure className="group max-w-[205px] overflow-hidden rounded-xl border border-white/12 bg-[#0B0D12]/90 p-1.5 shadow-sm">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={entry.archivePhoto.src}
                  alt={entry.archivePhoto.alt[lang]}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover grayscale contrast-[1.08] brightness-[0.94] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-1.5 px-1 pb-0.5 font-mono-code text-[9.5px] leading-snug text-[#A1A6B0]">
                <BiDiText
                  text={entry.archivePhoto.caption[lang]}
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
              <BiDiText text={entry.summary[lang]} lang={lang} />
            </p>
          </div>

          <div className="border-t border-white/[0.08] pt-4">
            <p className="mb-3 font-mono-code text-[10px] uppercase tracking-[0.18em] text-[#A1A6B0]">
              {UI_COPY.chronicle.impactHighlightsLabel[lang]}
            </p>
            <ul className="space-y-2.5">
              {entry.highlights[lang].map((highlight) => (
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

          {entry.highlightProof && (
            <figure className="overflow-hidden rounded-xl border border-white/12 bg-[#0A0C10]/95 p-3 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
              <figcaption
                className={`mb-2 text-[10px] font-medium text-[#A1A6B0] ${
                  lang === "en"
                    ? "font-mono-code uppercase tracking-[0.16em]"
                    : "font-display tracking-normal"
                }`}
              >
                {entry.highlightProof.eyebrow[lang]}
              </figcaption>
              <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0A0C10]">
                <img
                  src={entry.highlightProof.src}
                  alt={entry.highlightProof.alt[lang]}
                  loading="lazy"
                  decoding="async"
                  className="block w-full object-contain"
                />
              </div>
              <p className="mt-2 text-[11.5px] leading-relaxed text-[#9CA3AF]">
                <BiDiText
                  text={entry.highlightProof.caption[lang]}
                  lang={lang}
                />
              </p>
            </figure>
          )}

          {entry.mentorship && (
            <div className="rounded-e-lg border border-white/[0.06] border-s border-s-white/25 bg-white/[0.03] px-4 py-3.5">
              <p
                className={`mb-2 text-[10px] font-medium text-[#A1A6B0] sm:text-[11px] ${
                  lang === "en"
                    ? "font-mono-code uppercase tracking-[0.18em]"
                    : "font-display tracking-normal"
                }`}
              >
                {entry.mentorship.eyebrow[lang]}
              </p>
              <p className="text-[13.5px] leading-relaxed text-[#D1D5DB] sm:text-[14px]">
                <RichInlineText
                  text={entry.mentorship.body[lang]}
                  lang={lang}
                  links={entry.mentorship.entities.map(
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
      {entry.contrast && (
        <div className="mt-8 border-t border-white/[0.08] pt-6">
          <p className="mb-3 font-mono-code text-[10px] uppercase tracking-[0.18em] text-[#A1A6B0]">
            {entry.contrast.eyebrow[lang]}
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {entry.contrast.items.map((item) => (
              <div key={item.when.en} className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">
                <p className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#A1A6B0]">
                  {item.when[lang]} · <span className="text-[#F4F5F7]">{item.what[lang]}</span>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#D4D7DD]/90">{item.text[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </DetailShell>
  );
}
