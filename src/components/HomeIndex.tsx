import { ArrowUpRight } from "@phosphor-icons/react";
import { CASE_STUDIES, Lang, PORTFOLIO_IDENTITY, UI_COPY } from "../data/portfolioData";
import { PAGE_PATHS, PageKey, onInternalLinkClick } from "../lib/router";
import { PAGE_LABELS } from "../lib/pageMeta";
import { CaseStudyVisualStage, ClientStatusBadge } from "./WorksSection";

interface HomeIndexProps {
  lang: Lang;
  onOpenWork: (slug: string) => void;
}

/** First three works in Belal's own order on the Works page. */
const FEATURED_WORKS = CASE_STUDIES.slice(0, 3);

/** First sentence of a localized copy line (the home cards carry exactly one sentence). */
function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!؟?](\s|$)/);
  return (match ? match[0] : text).trim();
}

const PAGE_CARDS: {
  key: PageKey;
  image: string;
  imageClass: string;
  line: { en: string; ar: string };
}[] = [
  {
    key: "work",
    image: "/assets/showreel-poster.jpg",
    imageClass: "object-cover",
    line: UI_COPY.works.showreelSubtitle,
  },
  {
    key: "chronicle",
    image: "/assets/clients/majorel-smart-village-team.jpg",
    imageClass: "object-cover",
    line: UI_COPY.chronicle.subtitle,
  },
  {
    key: "about",
    image: "/assets/portrait.jpg",
    imageClass: "object-cover object-[50%_35%]",
    line: PORTFOLIO_IDENTITY.lensText,
  },
  {
    key: "systems",
    image: "/video/gargantua-poster.jpg",
    imageClass: "object-cover object-[73%_50%]",
    line: UI_COPY.systems.subtitle,
  },
];

export function HomeIndex({ lang, onOpenWork }: HomeIndexProps) {
  return (
    <>
      {/* Selected works preview */}
      <section id="home-latest" className="relative z-10 px-5 py-14 sm:px-8 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#A1A6B0]">
                {UI_COPY.works.eyebrow[lang]}
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-semibold uppercase tracking-[0.06em] text-[#F4F5F7]">
                {UI_COPY.works.title[lang]}
              </h2>
            </div>
            <a
              href={PAGE_PATHS.work}
              onClick={(e) => onInternalLinkClick(e, PAGE_PATHS.work)}
              className="btn-titanium group inline-flex min-h-11 items-center gap-2 rounded-full ps-5 pe-2 text-sm font-semibold text-[#050505]"
            >
              <span>{lang === "en" ? "All Works" : "كل الأعمال"}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                <ArrowUpRight size={14} weight="bold" className="rtl:-scale-x-100" />
              </span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {FEATURED_WORKS.map((study) => (
              <a
                key={study.id}
                href={`/work/${study.id}`}
                onClick={(e) => {
                  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  onOpenWork(study.id);
                }}
                className="works-card group flex flex-col rounded-[1.5rem] border border-white/[0.11] bg-[#0D0F14]/75 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25"
              >
                <div className="flex h-full flex-col rounded-[1.15rem] bg-[#0A0A0C]/75 p-4">
                  <CaseStudyVisualStage study={study} lang={lang} />
                  <div className="mt-4 flex items-center gap-2">
                    <ClientStatusBadge status={study.status} lang={lang} />
                    <span className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#A1A6B0]">
                      {study.period[lang]}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-[#F4F5F7]">{study.title[lang]}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#9CA3AF]">{study.discipline[lang]}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Doors to the other pages */}
      <section className="relative z-10 px-5 pb-14 sm:px-8 md:pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
          {PAGE_CARDS.map((card) => (
            <a
              key={card.key}
              href={PAGE_PATHS[card.key]}
              onClick={(e) => onInternalLinkClick(e, PAGE_PATHS[card.key])}
              className="film-card group block rounded-[2rem] border border-white/[0.12] bg-[#0D0F14]/75 p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 ease-out hover:border-[#D4D7DD]/50"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#10131B]">
                <img
                  src={card.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full ${card.imageClass} brightness-[0.72] contrast-[1.08] grayscale-[55%] transition-all duration-700 ease-out group-hover:scale-[1.025] group-hover:brightness-90 group-hover:grayscale-0`}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080C] via-[#090C12]/70 via-45% to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <p className="font-display text-xl font-semibold uppercase tracking-[0.06em] text-[#F4F5F7]">
                      {PAGE_LABELS[card.key][lang]}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-sm text-[#D4D7DD]/90">
                      {firstSentence(card.line[lang])}
                    </p>
                  </div>
                  <span className="btn-titanium inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#050505]">
                    <ArrowUpRight size={16} weight="bold" className="rtl:-scale-x-100" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Closing line to the contact page */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-10">
          <div>
            <p className="font-editorial text-lg font-medium italic text-[#D4D7DD]/70" lang="en" dir="ltr">
              — {PORTFOLIO_IDENTITY.signature}
            </p>
            <p className="mt-2 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold uppercase tracking-[0.04em] text-[#F4F5F7]">
              {UI_COPY.contact.title[lang]}
            </p>
          </div>
          <a
            href={PAGE_PATHS.contact}
            onClick={(e) => onInternalLinkClick(e, PAGE_PATHS.contact)}
            className="btn-titanium group inline-flex min-h-11 items-center gap-2 rounded-full ps-5 pe-2 text-sm font-semibold text-[#050505]"
          >
            <span>{UI_COPY.nav.cta[lang]}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
              <ArrowUpRight size={14} weight="bold" className="rtl:-scale-x-100" />
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
