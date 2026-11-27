import { ArrowUpRight } from "@phosphor-icons/react";
import { Lang, PORTFOLIO_IDENTITY, UI_COPY } from "../data/portfolioData";

interface NavbarProps {
  lang: Lang;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ lang, activeSection, onNavigate }: NavbarProps) {
  const mobileBottomItems = [
    { label: UI_COPY.nav.works[lang], target: "works" },
    { label: UI_COPY.nav.chronicle[lang], target: "chronicle" },
    { label: UI_COPY.nav.contact[lang], target: "contact" },
  ];

  const desktopItems = [
    { label: UI_COPY.nav.works[lang], target: "works" },
    { label: UI_COPY.nav.chronicle[lang], target: "chronicle" },
  ];

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-[max(0.85rem,env(safe-area-inset-top))] sm:px-6">
        <nav
          aria-label="Primary Navigation"
          className="pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-full border border-white/[0.18] bg-[#0B0D12]/94 px-3.5 shadow-[0_10px_34px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:px-6"
        >
          <button
            type="button"
            onClick={() => onNavigate("hero")}
            className="-my-3 flex shrink-0 items-center gap-2 py-3 text-start transition-opacity duration-300 ease-out hover:opacity-80 whitespace-nowrap"
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
              {desktopItems.map((item) => {
                const isActive = activeSection === item.target;
                return (
                  <button
                    key={item.target}
                    type="button"
                    onClick={() => onNavigate(item.target)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative py-1 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300 ease-out ${
                      isActive
                        ? "text-[#F4F5F7]"
                        : "text-[#9CA3AF] hover:text-[#F4F5F7]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] rounded-full bg-[#E5E7EB] transition-all duration-300 ease-out ${
                        isActive ? "scale-x-100 opacity-90" : "scale-x-0 opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
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

            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="btn-titanium group inline-flex items-center gap-1.5 rounded-full py-1.5 ps-3 pe-1.5 text-[11px] font-semibold tracking-wide text-[#050505] transition-all duration-300 ease-out active:scale-[0.98] whitespace-nowrap sm:gap-2 sm:ps-4 sm:text-xs"
            >
              <span>{UI_COPY.nav.cta[lang]}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 sm:h-6 sm:w-6">
                <ArrowUpRight size={12} weight="bold" className="inline-block rtl:-scale-x-100" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Floating Bottom Navigation Pill (replaces hamburger menu) */}
      <nav
        aria-label={lang === "en" ? "Mobile Section Navigation" : "تنقل الأقسام للموبايل"}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] start-3 z-40 flex items-center gap-1 rounded-full border border-white/15 bg-[#111215]/92 p-1.5 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.85)] md:hidden"
      >
        {mobileBottomItems.map((item) => {
          const isActive = activeSection === item.target;
          return (
            <button
              key={item.target}
              type="button"
              onClick={() => onNavigate(item.target)}
              aria-current={isActive ? "page" : undefined}
              className={`min-h-11 rounded-full px-4 text-[13px] font-medium transition-all duration-300 ease-out active:scale-[0.97] whitespace-nowrap ${
                isActive
                  ? "bg-white/[0.13] text-[#F4F5F7] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                  : "text-[#A1A6B0] hover:bg-white/[0.06] hover:text-[#F4F5F7]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
