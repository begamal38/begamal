import { useState, useEffect } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Lang, PORTFOLIO_IDENTITY, UI_COPY } from "../data/portfolioData";

interface NavbarProps {
  lang: Lang;
  onToggleLang: () => void;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ lang, onToggleLang, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: UI_COPY.nav.chronicle[lang], target: "chronicle" },
    { label: UI_COPY.nav.works[lang], target: "works" },
    { label: UI_COPY.nav.systems[lang], target: "systems" },
  ];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleLinkClick = (target: string) => {
    setMenuOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav
          aria-label="Primary Navigation"
          className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#111114]/88 px-4 backdrop-blur-xl sm:px-6"
        >
          <button
            type="button"
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-3 text-start transition-opacity duration-200 hover:opacity-80"
          >
            <span className="h-2 w-2 rounded-full bg-[#C5A572]" aria-hidden="true" />
            <span className="font-display text-xs tracking-[0.22em] text-[#F2F0EB] sm:text-sm">
              {PORTFOLIO_IDENTITY.brandMark[lang]}
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleLinkClick(item.target)}
                className="text-xs font-medium tracking-[0.12em] text-[#8E8A82] uppercase transition-colors duration-200 hover:text-[#F2F0EB]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Pure Language Switcher */}
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
              className="rounded-full border border-white/15 bg-[#0A0A0C] px-3 py-1.5 text-xs font-medium text-[#F2F0EB] transition-colors duration-200 hover:border-[#C5A572]/60 hover:text-[#C5A572] active:scale-[0.98]"
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>

            <button
              type="button"
              onClick={() => handleLinkClick("contact")}
              className="group hidden items-center gap-2.5 rounded-full border border-[#C5A572]/40 bg-[#C5A572] py-1.5 ps-4 pe-1.5 text-xs font-semibold tracking-wide text-[#050505] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#d2b586] active:scale-[0.98] sm:inline-flex whitespace-nowrap"
            >
              <span>{UI_COPY.nav.cta[lang]}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={13} weight="bold" />
              </span>
            </button>

            <button
              type="button"
              aria-label={menuOpen ? UI_COPY.nav.closeMenu[lang] : UI_COPY.nav.openMenu[lang]}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0C] md:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-4 bg-[#F2F0EB] transition-transform duration-300 ${
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4 bg-[#F2F0EB] transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4 bg-[#F2F0EB] transition-transform duration-300 ${
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay Menu */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#050505]/95 px-6 pb-10 pt-28 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((item, idx) => (
            <button
              key={item.target}
              type="button"
              onClick={() => handleLinkClick(item.target)}
              style={{ transitionDelay: menuOpen ? `${idx * 60 + 80}ms` : "0ms" }}
              className={`border-b border-white/10 pb-4 text-start font-display text-3xl tracking-wider text-[#F2F0EB] transition-all duration-500 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleLinkClick("contact")}
            className="flex w-full items-center justify-between rounded-full bg-[#C5A572] px-6 py-3.5 text-sm font-semibold text-[#050505] active:scale-[0.98]"
          >
            <span>{UI_COPY.nav.cta[lang]}</span>
            <ArrowUpRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </>
  );
}
