import { useState, useEffect } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Lang, PORTFOLIO_IDENTITY, UI_COPY } from "../data/portfolioData";

interface NavbarProps {
  lang: Lang;
  wireframeMode: boolean;
  onToggleLang: () => void;
  onToggle3dMode: () => void;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({
  lang,
  wireframeMode,
  onToggleLang,
  onToggle3dMode,
  onNavigate,
}: NavbarProps) {
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
          className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#121216]/90 px-4 backdrop-blur-xl sm:px-6"
        >
          <button
            type="button"
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-3 text-start transition-opacity duration-200 hover:opacity-80"
          >
            <span
              className="h-2 w-2 rounded-full bg-[#E11D38] shadow-[0_0_10px_rgba(225,29,56,0.7)]"
              aria-hidden="true"
            />
            <span className="font-display text-xs tracking-[0.22em] text-[#F1F2F4] sm:text-sm">
              {PORTFOLIO_IDENTITY.brandMark[lang]}
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleLinkClick(item.target)}
                className="text-xs font-medium uppercase tracking-[0.12em] text-[#A1A1AA] transition-colors duration-200 hover:text-[#E11D38]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Live 3D Finish Toggle (Obsidian / Wireframe) */}
            <button
              type="button"
              onClick={onToggle3dMode}
              className="hidden rounded-full border border-white/15 bg-[#09090C] px-3 py-1.5 font-mono-code text-[10px] font-medium uppercase tracking-[0.12em] text-[#F1F2F4]/85 transition-colors duration-200 hover:border-[#E11D38]/70 hover:text-[#E11D38] lg:inline-flex whitespace-nowrap"
            >
              {wireframeMode
                ? UI_COPY.nav.modeWireframe[lang]
                : UI_COPY.nav.modeObsidian[lang]}
            </button>

            {/* High-Contrast Language Toggle Button */}
            <button
              type="button"
              onClick={onToggleLang}
              aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
              className="font-arabic-toggle inline-flex min-w-[66px] items-center justify-center rounded-full border border-[#C81E32]/65 bg-[#C81E32]/15 px-3.5 py-1.5 text-xs font-semibold text-[#F1F2F4] transition-colors duration-200 hover:bg-[#C81E32] active:scale-[0.98] whitespace-nowrap"
            >
              {lang === "en" ? "العربية" : "EN"}
            </button>

            <button
              type="button"
              onClick={() => handleLinkClick("contact")}
              className="group hidden items-center gap-2.5 rounded-full bg-[#C81E32] py-1.5 ps-4 pe-1.5 text-xs font-semibold tracking-wide text-[#F1F2F4] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#E11D38] active:scale-[0.98] sm:inline-flex whitespace-nowrap"
            >
              <span>{UI_COPY.nav.cta[lang]}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#050505]/25 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={13} weight="bold" />
              </span>
            </button>

            <button
              type="button"
              aria-label={
                menuOpen ? UI_COPY.nav.closeMenu[lang] : UI_COPY.nav.openMenu[lang]
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0D] md:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-4 bg-[#F1F2F4] transition-transform duration-300 ${
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4 bg-[#F1F2F4] transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4 bg-[#F1F2F4] transition-transform duration-300 ${
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
              className={`border-b border-white/[0.08] pb-4 text-start font-display text-2xl tracking-[0.08em] text-[#F1F2F4] transition-all duration-500 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${80 + idx * 60}ms` }}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              onToggle3dMode();
              setMenuOpen(false);
            }}
            className="w-fit rounded-full border border-white/15 bg-[#121216] px-4 py-2 font-mono-code text-xs uppercase tracking-[0.14em] text-[#F1F2F4]"
          >
            {wireframeMode
              ? UI_COPY.nav.modeWireframe[lang]
              : UI_COPY.nav.modeObsidian[lang]}
          </button>
        </div>

        <button
          type="button"
          onClick={() => handleLinkClick("contact")}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#C81E32] py-4 text-sm font-semibold text-[#F1F2F4] transition-colors hover:bg-[#E11D38]"
        >
          <span>{UI_COPY.nav.cta[lang]}</span>
          <ArrowUpRight size={16} weight="bold" />
        </button>
      </div>
    </>
  );
}
