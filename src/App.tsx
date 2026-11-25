import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, PORTFOLIO_IDENTITY } from "./data/portfolioData";
import { MonolithScene } from "./components/MonolithScene";
import { Navbar } from "./components/Navbar";
import { ScrollTelemetry } from "./components/ScrollTelemetry";
import { HeroSection } from "./components/HeroSection";
import { StatementSection } from "./components/StatementSection";
import { ChronicleSection } from "./components/ChronicleSection";
import { WorksSection } from "./components/WorksSection";
import { SystemsAndContactSection } from "./components/SystemsAndContactSection";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const scrollProgressRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = PORTFOLIO_IDENTITY.pageTitle[lang];
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [lang]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateFallbackProgress = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollProgressRef.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    if (prefersReducedMotion) {
      window.addEventListener("scroll", updateFallbackProgress, { passive: true });
      updateFallbackProgress();
      return () => window.removeEventListener("scroll", updateFallbackProgress);
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.35,
    });
    lenisRef.current = lenis;

    const handleScrollUpdate = ({
      progress,
      velocity,
    }: {
      progress: number;
      velocity: number;
    }) => {
      scrollProgressRef.current = progress;
      scrollVelocityRef.current = velocity;
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScrollUpdate);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", handleScrollUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -18, duration: 1.1 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-[#050505] text-[#F2F0EB]">
      <div className="noise-overlay" aria-hidden="true" />
      <MonolithScene
        scrollProgressRef={scrollProgressRef}
        scrollVelocityRef={scrollVelocityRef}
        lang={lang}
      />
      <ScrollTelemetry
        lang={lang}
        scrollProgressRef={scrollProgressRef}
        onNavigate={handleNavigate}
      />
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onNavigate={handleNavigate}
      />

      <main className="relative z-10 w-full overflow-x-clip">
        <HeroSection lang={lang} onNavigate={handleNavigate} />
        <StatementSection lang={lang} />
        <ChronicleSection lang={lang} />
        <WorksSection lang={lang} />
        <SystemsAndContactSection lang={lang} />
      </main>
    </div>
  );
}
