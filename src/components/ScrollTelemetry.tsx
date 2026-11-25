import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, SCROLL_SECTIONS } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTelemetryProps {
  lang: Lang;
  scrollProgressRef: React.MutableRefObject<number>;
  onNavigate: (sectionId: string) => void;
}

/**
 * Architectural top progress hairline + desktop telemetry navigation rail
 * calibrated in Imperial Crimson & Brushed Platinum.
 */
export function ScrollTelemetry({
  lang,
  scrollProgressRef,
  onNavigate,
}: ScrollTelemetryProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>(SCROLL_SECTIONS[0].id);

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

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    SCROLL_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 48%",
        end: "bottom 48%",
        onEnter: () => setActiveId(section.id),
        onEnterBack: () => setActiveId(section.id),
      });
      triggers.push(st);
    });
    return () => triggers.forEach((st) => st.kill());
  }, [lang]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] bg-white/[0.04]"
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className="h-full w-full bg-gradient-to-r from-[#C81E32]/70 via-[#E11D38] to-[#F1F2F4]"
          style={{
            transform: "scaleX(0.02)",
            transformOrigin: lang === "ar" ? "right center" : "left center",
          }}
        />
      </div>

      <nav
        aria-label={lang === "en" ? "Section Progress" : "مؤشر الأقسام"}
        className="fixed end-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3.5 xl:flex"
      >
        {SCROLL_SECTIONS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center justify-end gap-2.5 text-end focus:outline-none"
            >
              <span
                className={`font-mono-code text-[10px] tracking-[0.14em] transition-all duration-300 ${
                  isActive
                    ? "translate-x-0 text-[#E11D38] opacity-100"
                    : "pointer-events-none translate-x-1 text-[#A1A1AA] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {item.index} · {item.label[lang]}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-2.5 w-2.5 bg-[#E11D38] shadow-[0_0_10px_rgba(225,29,56,0.85)]"
                    : "h-1.5 w-1.5 bg-white/25 group-hover:bg-[#E11D38]/75"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
