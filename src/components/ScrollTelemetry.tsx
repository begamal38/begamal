import { useEffect, useRef } from "react";
import { Lang, SCROLL_SECTIONS } from "../data/portfolioData";

interface ScrollTelemetryProps {
  lang: Lang;
  activeSection: string;
  scrollProgressRef: React.MutableRefObject<number>;
  onNavigate: (sectionId: string) => void;
}

/**
 * Top 1px brushed-titanium scroll depth filament tipped by a 4px silver beacon dot,
 * paired with an out-of-gutter desktop telemetry rail (strictly at 2xl+).
 */
export function ScrollTelemetry({
  lang,
  activeSection,
  scrollProgressRef,
  onNavigate,
}: ScrollTelemetryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const isRtlRef = useRef<boolean>(lang === "ar");

  useEffect(() => {
    isRtlRef.current = lang === "ar";
  }, [lang]);

  useEffect(() => {
    let rafId = 0;
    let current = scrollProgressRef.current;

    const updateBar = () => {
      const target = Math.max(0, Math.min(1, scrollProgressRef.current));
      current += (target - current) * 0.2;
      const trackW = trackRef.current?.clientWidth || window.innerWidth;
      const scaleVal = Math.max(0.015, Math.min(1, current));
      const xOffset = current * trackW;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${scaleVal.toFixed(4)})`;
      }
      if (dotRef.current) {
        const dirSign = isRtlRef.current ? -1 : 1;
        const centerOffset = isRtlRef.current ? 2 : -2;
        const pos = dirSign * Math.min(trackW, Math.max(0, xOffset)) + centerOffset;
        dotRef.current.style.transform = `translate3d(${pos.toFixed(2)}px, -50%, 0)`;
      }
      rafId = window.requestAnimationFrame(updateBar);
    };

    rafId = window.requestAnimationFrame(updateBar);
    return () => window.cancelAnimationFrame(rafId);
  }, [scrollProgressRef]);

  return (
    <>
      <div
        ref={trackRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[1px] bg-white/5"
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className={`h-full w-full will-change-transform ${
            lang === "ar"
              ? "bg-gradient-to-l from-white/10 via-[#E5E7EB]/60 to-white"
              : "bg-gradient-to-r from-white/10 via-[#E5E7EB]/60 to-white"
          }`}
          style={{
            transform: "scaleX(0.015)",
            transformOrigin: lang === "ar" ? "right center" : "left center",
          }}
        />
        <span
          ref={dotRef}
          className={`absolute top-1/2 h-1 w-1 rounded-full bg-white will-change-transform ${
            lang === "ar" ? "right-0" : "left-0"
          }`}
          style={{
            boxShadow: "0 0 10px rgba(229, 231, 235, 0.9)",
            transform: "translate3d(0px, -50%, 0)",
          }}
        />
      </div>

      <nav
        aria-label={lang === "en" ? "Section Progress" : "مؤشر الأقسام"}
        className="pointer-events-none fixed end-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3.5 2xl:flex"
      >
        {SCROLL_SECTIONS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "true" : undefined}
              className="pointer-events-auto group flex items-center justify-end gap-2.5 text-end focus:outline-none"
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
