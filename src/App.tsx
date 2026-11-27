import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, PORTFOLIO_IDENTITY, SCROLL_SECTIONS } from "./data/portfolioData";
import { MonolithScene } from "./components/MonolithScene";
import { Navbar } from "./components/Navbar";
import { ScrollTelemetry } from "./components/ScrollTelemetry";
import { HeroSection } from "./components/HeroSection";
import { StatementSection } from "./components/StatementSection";
import { ChronicleSection } from "./components/ChronicleSection";
import { WorksSection } from "./components/WorksSection";
import { SystemsAndContactSection } from "./components/SystemsAndContactSection";
import { AmbientAudioPlayer } from "./components/AmbientAudioPlayer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeSection, setActiveSection] = useState<string>(SCROLL_SECTIONS[0].id);
  const scrollProgressRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = PORTFOLIO_IDENTITY.pageTitle[lang];
    let cancelled = false;
    const id = window.requestAnimationFrame(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    document.fonts?.ready?.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
    };
  }, [lang]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    SCROLL_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
      triggers.push(st);
    });

    const handleBottomCheck = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 48;
      if (nearBottom) {
        setActiveSection("contact");
      } else if (window.scrollY < 120) {
        setActiveSection("hero");
      }
    };
    window.addEventListener("scroll", handleBottomCheck, { passive: true });
    handleBottomCheck();

    return () => {
      triggers.forEach((st) => st.kill());
      window.removeEventListener("scroll", handleBottomCheck);
    };
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
      syncTouch: false,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = lenis;
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

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
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  const handleModalOpenChange = useCallback((isOpen: boolean) => {
    if (isOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    setActiveSection(sectionId);
    const navOffset = sectionId === "hero" ? 0 : -72;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: navOffset, duration: 1.05 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-[#0A0B0E] text-[#F4F5F7]">
      <div className="noise-overlay" aria-hidden="true" />
      <MonolithScene
        scrollProgressRef={scrollProgressRef}
        scrollVelocityRef={scrollVelocityRef}
        lang={lang}
      />
      <ScrollTelemetry
        lang={lang}
        activeSection={activeSection}
        scrollProgressRef={scrollProgressRef}
        onNavigate={handleNavigate}
      />
      <Navbar
        lang={lang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="relative z-10 w-full overflow-x-clip">
        <HeroSection lang={lang} onNavigate={handleNavigate} />
        <StatementSection lang={lang} />
        <ChronicleSection lang={lang} onModalOpenChange={handleModalOpenChange} />
        <WorksSection lang={lang} onModalOpenChange={handleModalOpenChange} />
        <SystemsAndContactSection
          lang={lang}
          onToggleLang={handleToggleLang}
          onNavigate={handleNavigate}
        />
      </main>
      <AmbientAudioPlayer lang={lang} />
    </div>
  );
}
