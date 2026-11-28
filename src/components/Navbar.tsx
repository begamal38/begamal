import { useEffect, useRef } from "react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { CASE_STUDIES, CaseStudy, Lang, PORTFOLIO_IDENTITY, UI_COPY } from "../data/portfolioData";
import { PAGE_PATHS, PageKey, onInternalLinkClick } from "../lib/router";
import { PAGE_LABELS } from "../lib/pageMeta";

interface NavbarProps {
  lang: Lang;
  activePage: PageKey;
  onOpenWork: (slug: string) => void;
}

/** Small logo tile for menus. Keeps every client mark exactly as supplied (white plates stay white). */
function WorkThumb({ study, lang }: { study: CaseStudy; lang: Lang }) {
  if (!study.image) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#181C26] font-display text-xs text-[#E2E6EF]">
        {study.monogram ?? study.title.en.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-white/15 ${
        study.isPortraitMedallion ? "rounded-full" : "rounded-lg"
      } ${study.isWhitePlate ? "bg-white p-1" : "bg-[#12161E]"}`}
    >
      <img
        src={study.image}
        alt={study.title[lang]}
        loading="lazy"
        decoding="async"
        className={`h-full w-full ${study.isWhitePlate ? "object-contain" : "object-cover"}`}
      />
    </span>
  );
}

function WorkMenuList({
  lang,
  onOpenWork,
  onPick,
}: {
  lang: Lang;
  onOpenWork: (slug: string) => void;
  onPick?: () => void;
}) {
  return (
    <>
      <ul className="grid gap-0.5">
        {CASE_STUDIES.map((study) => (
          <li key={study.id}>
            <a
              href={`/work/${study.id}`}
              onClick={(e) => {
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                onPick?.();
                onOpenWork(study.id);
              }}
              className="flex min-h-11 items-center gap-3 rounded-xl px-2.5 py-1.5 transition-colors duration-200 ease-out hover:bg-white/[0.06] focus-visible:bg-white/[0.08]"
            >
              <WorkThumb study={study} lang={lang} />
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium text-[#F4F5F7]">
                  {study.title[lang]}
                </span>
                <span className="block truncate font-mono-code text-[10.5px] uppercase tracking-[0.12em] text-[#A1A6B0]">
                  {study.period[lang]}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a
        href={PAGE_PATHS.work}
        onClick={(e) => {
          onPick?.();
          onInternalLinkClick(e, PAGE_PATHS.work);
        }}
        className="btn-titanium mt-2 flex min-h-11 items-center justify-center gap-2 rounded-full text-[13px] font-semibold text-[#050505]"
      >
        <span>{lang === "en" ? "All Works" : "كل الأعمال"}</span>
        <ArrowUpRight size={13} weight="bold" className="rtl:-scale-x-100" />
      </a>
    </>
  );
}

const DESKTOP_PAGES: PageKey[] = ["chronicle", "about", "systems"];

export function Navbar({ lang, activePage, onOpenWork }: NavbarProps) {
  const mobileWorksRef = useRef<HTMLDetailsElement>(null);

  // Close the mobile works list on any page change or outside tap
  useEffect(() => {
    if (mobileWorksRef.current) mobileWorksRef.current.open = false;
  }, [activePage]);
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const d = mobileWorksRef.current;
      if (d?.open && !d.contains(e.target as Node)) d.open = false;
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const closeMobileWorks = () => {
    if (mobileWorksRef.current) mobileWorksRef.current.open = false;
  };

  const navLinkClass = (isActive: boolean) =>
    `relative py-1 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300 ease-out ${
      isActive ? "text-[#F4F5F7]" : "text-[#9CA3AF] hover:text-[#F4F5F7]"
    }`;

  const underline = (isActive: boolean) => (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] rounded-full bg-[#E5E7EB] transition-all duration-300 ease-out ${
        isActive ? "scale-x-100 opacity-90" : "scale-x-0 opacity-0"
      }`}
    />
  );

  const mobileTab = (isActive: boolean) =>
    `inline-flex min-h-11 items-center rounded-full px-4 text-[13px] font-medium transition-all duration-300 ease-out active:scale-[0.97] whitespace-nowrap ${
      isActive
        ? "bg-white/[0.13] text-[#F4F5F7] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
        : "text-[#A1A6B0] hover:bg-white/[0.06] hover:text-[#F4F5F7]"
    }`;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-[max(0.85rem,env(safe-area-inset-top))] sm:px-6">
        <nav
          aria-label="Primary Navigation"
          className="pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-full border border-white/[0.18] bg-[#0B0D12]/94 px-3.5 shadow-[0_10px_34px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] keep-blur backdrop-blur-xl sm:px-6"
        >
          <a
            href={PAGE_PATHS.home}
            onClick={(e) => onInternalLinkClick(e, PAGE_PATHS.home)}
            aria-current={activePage === "home" ? "page" : undefined}
            className="-my-3 flex shrink-0 items-center gap-2 py-3 text-start transition-opacity duration-300 ease-out hover:opacity-80 whitespace-nowrap"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#D4D7DD] shadow-[0_0_8px_rgba(244,245,247,0.5)]"
              aria-hidden="true"
            />
            <span className="font-display text-[11px] tracking-[0.14em] text-[#F4F5F7] sm:text-sm sm:tracking-[0.2em]">
              {PORTFOLIO_IDENTITY.brandMark[lang]}
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-3 sm:gap-6">
            <div className="hidden items-center gap-7 md:flex">
              {/* Work + dropdown (hover and keyboard focus) */}
              <div className="group/work relative">
                <a
                  href={PAGE_PATHS.work}
                  onClick={(e) => onInternalLinkClick(e, PAGE_PATHS.work)}
                  aria-current={activePage === "work" ? "page" : undefined}
                  aria-haspopup="true"
                  className={`${navLinkClass(activePage === "work")} inline-flex items-center gap-1`}
                >
                  <span>{PAGE_LABELS.work[lang]}</span>
                  <CaretDown
                    size={10}
                    weight="bold"
                    className="transition-transform duration-300 ease-out group-hover/work:rotate-180 group-focus-within/work:rotate-180"
                  />
                  {underline(activePage === "work")}
                </a>
                <div className="invisible absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 ease-out group-hover/work:visible group-hover/work:opacity-100 group-focus-within/work:visible group-focus-within/work:opacity-100">
                  <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-white/[0.14] bg-[#0B0D12]/97 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
                    <WorkMenuList lang={lang} onOpenWork={onOpenWork} />
                  </div>
                </div>
              </div>

              {DESKTOP_PAGES.map((key) => (
                <a
                  key={key}
                  href={PAGE_PATHS[key]}
                  onClick={(e) => onInternalLinkClick(e, PAGE_PATHS[key])}
                  aria-current={activePage === key ? "page" : undefined}
                  className={`${navLinkClass(activePage === key)} ${key === "chronicle" ? "" : "hidden lg:inline"}`}
                >
                  <span>{PAGE_LABELS[key][lang]}</span>
                  {underline(activePage === key)}
                </a>
              ))}
            </div>

            <a
              href={PORTFOLIO_IDENTITY.vimeoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.dispatchEvent(new CustomEvent("begamal:showreel-play"))}
              className="-my-3 inline-flex items-center gap-1 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#D4D7DD] transition-colors duration-300 ease-out hover:text-[#F4F5F7] whitespace-nowrap sm:text-xs sm:tracking-[0.1em]"
            >
              <span>{UI_COPY.nav.showreel[lang]}</span>
              <ArrowUpRight size={12} weight="bold" className="inline-block rtl:-scale-x-100" />
            </a>

            <a
              href={PAGE_PATHS.contact}
              onClick={(e) => onInternalLinkClick(e, PAGE_PATHS.contact)}
              aria-current={activePage === "contact" ? "page" : undefined}
              className="btn-titanium group relative inline-flex items-center before:absolute before:-inset-x-1 before:-inset-y-2 before:content-[''] gap-1.5 rounded-full py-1.5 ps-3 pe-1.5 text-[11px] font-semibold tracking-wide text-[#050505] transition-all duration-300 ease-out active:scale-[0.98] whitespace-nowrap sm:gap-2 sm:ps-4 sm:text-xs"
            >
              <span>{UI_COPY.nav.cta[lang]}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 sm:h-6 sm:w-6">
                <ArrowUpRight size={12} weight="bold" className="inline-block rtl:-scale-x-100" />
              </span>
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile floating bottom navigation (no hamburger, by identity). Works opens the full list. */}
      <nav
        aria-label={lang === "en" ? "Mobile Section Navigation" : "تنقل الأقسام للموبايل"}
        className="fixed bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] start-[max(0.75rem,env(safe-area-inset-left))] z-40 flex items-center gap-1 rounded-full border border-white/15 bg-[#111215]/92 p-1.5 keep-blur backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.85)] md:hidden"
      >
        <details ref={mobileWorksRef} className="group/mw relative">
          <summary
            className={`${mobileTab(activePage === "work")} cursor-pointer list-none gap-1 [&::-webkit-details-marker]:hidden`}
            aria-current={activePage === "work" ? "page" : undefined}
          >
            {PAGE_LABELS.work[lang]}
            <CaretDown size={10} weight="bold" className="transition-transform duration-200 group-open/mw:rotate-180" />
          </summary>
          <div className="absolute bottom-full start-0 mb-3 w-[min(320px,calc(100vw-1.5rem))] rounded-2xl border border-white/[0.14] bg-[#0B0D12] p-2 shadow-[0_-18px_50px_rgba(0,0,0,0.8)]">
            <div className="max-h-[min(60vh,460px)] overflow-y-auto overscroll-contain" data-lenis-prevent="">
              <WorkMenuList lang={lang} onOpenWork={onOpenWork} onPick={closeMobileWorks} />
            </div>
          </div>
        </details>
        {(["chronicle", "contact"] as PageKey[]).map((key) => (
          <a
            key={key}
            href={PAGE_PATHS[key]}
            onClick={(e) => {
              closeMobileWorks();
              onInternalLinkClick(e, PAGE_PATHS[key]);
            }}
            aria-current={activePage === key ? "page" : undefined}
            className={mobileTab(activePage === key)}
          >
            {PAGE_LABELS[key][lang]}
          </a>
        ))}
      </nav>
    </>
  );
}
