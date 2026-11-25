import { useCallback, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MonolithScene } from "./components/MonolithScene";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StatementSection } from "./components/StatementSection";
import { ChronicleSection } from "./components/ChronicleSection";
import { WorksSection } from "./components/WorksSection";
import { SystemsAndContactSection } from "./components/SystemsAndContactSection";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const scrollProgressRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    const handleScrollUpdate = ({ progress }: { progress: number }) => {
      scrollProgressRef.current = progress;
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
      lenisRef.current.scrollTo(el, { offset: -20 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-[#050505] text-[#F2F0EB]">
      <div className="noise-overlay" aria-hidden="true" />
      <MonolithScene scrollProgressRef={scrollProgressRef} />
      <Navbar onNavigate={handleNavigate} />

      <main className="relative z-10 w-full overflow-x-hidden">
        <HeroSection onNavigate={handleNavigate} />
        <StatementSection />
        <ChronicleSection />
        <WorksSection />
        <SystemsAndContactSection />
      </main>
    </div>
  );
}
