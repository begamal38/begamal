import { ArrowUpRight } from "@phosphor-icons/react";
import { Lang, PORTFOLIO_IDENTITY, UI_COPY } from "../data/portfolioData";

interface NavbarProps {
  lang: Lang;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ lang, onNavigate }: NavbarProps) {
  const mobileBottomItems = [
    { label: UI_COPY.nav.works[lang], target: "works" },
    { label: UI_COPY.nav.chronicle[lang], target: "chronicle" },
    { label: UI_COPY.nav.ethos[lang], target: "perspective" },
    { label: UI_COPY.nav.contact[lang], target: "contact" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav
          aria-label="Primary Navigation"
          className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-full border border-white/10 bg-[#111215]/90 px-3.5 backdrop-blur-xl sm:px-6"
        >
          <button
            type="button"
            onClick={() => onNavigate("hero")}
            className="flex shrink-0 items-center gap-2 text-start transition-opacity duration-200 hover:opacity-80 whitespace-nowrap"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#D4D7DD] shadow-[0_0_8px_rgba(244,245,247,0.5)]"
              aria-hidden="true"
            />
            <span className="font-display text-[11px] tracking-[0.14em] text-[#F4F5F7] sm:text-sm sm:tracking-[0.2em]">
              {PORTFOLIO_IDENTITY.brandMark[lang]}
            </span>
          </button>

          {/* Desktop Navigation + Showreel + Connect */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-6">
            <div className="hidden items-center gap-7 md:flex">
              <button
                type="button"
                onClick={() => onNavigate("works")}
                className="text-xs font-medium uppercase tracking-[0.12em] text-[#9CA3AF] transition-colors duration-200 hover:text-[#F4F5F7]"
              >
                {UI_COPY.nav.works[lang]}
              </button>
              <button
                type="button"
                onClick={() => onNavigate("chronicle")}
                className="text-xs font-medium uppercase tracking-[0.12em] text-[#9CA3AF] transition-colors duration-200 hover:text-[#F4F5F7]"
              >
                {UI_COPY.nav.chronicle[lang]}
              </button>
            </div>

            <a
              href={PORTFOLIO_IDENTITY.vimeoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#D4D7DD] transition-colors duration-200 hover:text-[#F4F5F7] whitespace-nowrap sm:text-xs sm:tracking-[0.1em]"
            >
              <span>{UI_COPY.nav.showreel[lang]}</span>
              <ArrowUpRight size={12} weight="bold" />
            </a>

            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="btn-titanium group inline-flex items-center gap-1.5 rounded-full py-1.5 ps-3 pe-1.5 text-[11px] font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] whitespace-nowrap sm:gap-2 sm:ps-4 sm:text-xs"
            >
              <span>{UI_COPY.nav.cta[lang]}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-6 sm:w-6">
                <ArrowUpRight size={12} weight="bold" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Floating Bottom Navigation Pill (replaces hamburger menu) */}
      <nav
        aria-label={lang === "en" ? "Mobile Section Navigation" : "تنقل الأقسام للموبايل"}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#111215]/92 p-1.5 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.85)] md:hidden"
      >
        {mobileBottomItems.map((item) => (
          <button
            key={item.target}
            type="button"
            onClick={() => onNavigate(item.target)}
            className="rounded-full px-3.5 py-2 text-[11px] font-medium text-[#D4D7DD] transition-colors duration-200 hover:bg-white/[0.08] hover:text-[#F4F5F7] active:scale-[0.97] whitespace-nowrap"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
}
