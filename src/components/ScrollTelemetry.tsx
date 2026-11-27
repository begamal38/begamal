import { useEffect, useRef } from "react";
import { Lang, SCROLL_SECTIONS } from "../data/portfolioData";

interface ScrollTelemetryProps {
  lang: Lang;
  activeSection: string;
  scrollProgressRef: React.MutableRefObject<number>;
  onNavigate: (sectionId: string) => void;
}

/**
 * Top brushed-titanium 2px scroll hairline + out-of-gutter desktop telemetry rail
 * (visible strictly at 2xl+ outside the 1152px container so cards are never overlapped).
 */
export function ScrollTelemetry({
  lang,
  activeSection,
  scrollProgressRef,
  onNavigate,
}: ScrollTelemetryProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let current = 0;
    const updateBar = () => {
      current += (scrollProgressRef.current - current) * 0.18;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.max(0.02, Math.min(1, current))})`;
      }
      rafId = window.requestAnimationFrame(updateBar);
    };
    rafId = window.requestAnimationFrame(updateBar);
    return () => window.cancelAnimationFrame(rafId);
  }, [scrollProgressRef]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-[55] h-[2px] bg-white/[0.04]"
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className="h-full w-full bg-gradient-to-r from-[#8E94A0] via-[#D4D7DD] to-[#F4F5F7]"
          style={{
            transform: "scaleX(0.02)",
            transformOrigin: lang === "ar" ? "right center" : "left center",
          }}
        />
      </div>

      <nav
        aria-label={lang === "en" ? "Section Progress" : "مؤشر الأقسام"}
        className="fixed end-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3.5 2xl:flex"
      >
        {SCROLL_SECTIONS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center justify-end gap-2.5 text-end focus:outline-none"
            >
              <span
                className={`font-mono-code text-[10px] tracking-[0.14em] transition-all duration-300 ease-out ${
                  isActive
                    ? "translate-x-0 text-[#F4F5F7] opacity-100"
                    : "pointer-events-none translate-x-1 text-[#9CA3AF] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {item.index} · {item.label[lang]}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "h-2.5 w-2.5 bg-[#F4F5F7] shadow-[0_0_10px_rgba(244,245,247,0.75)]"
                    : "h-1.5 w-1.5 bg-white/25 group-hover:bg-[#D4D7DD]"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
