import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, SCROLL_SECTIONS } from "./data/portfolioData";
import { MonolithScene } from "./components/MonolithScene";
import { CosmicDustCanvas } from "./components/CosmicDustCanvas";
import { Navbar } from "./components/Navbar";
import { ScrollTelemetry } from "./components/ScrollTelemetry";
import { HeroSection } from "./components/HeroSection";
import { StatementSection } from "./components/StatementSection";
import { ChronicleSection } from "./components/ChronicleSection";
import { WorksSection } from "./components/WorksSection";
import { SystemsAndContactSection } from "./components/SystemsAndContactSection";
import { WorkPage } from "./components/WorkPage";
import { EraPage } from "./components/EraPage";
import { AmbientAudioPlayer } from "./components/AmbientAudioPlayer";
import { PAGE_PATHS, PAGE_SECTION_ID, PageKey, SECTION_TO_PAGE, navigate, useRoute } from "./lib/router";
import { applyPageMeta } from "./lib/pageMeta";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeSection, setActiveSection] = useState<string>(SCROLL_SECTIONS[0].id);
  const scrollProgressRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const isAudioPlayingRef = useRef<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);
  const route = useRoute();
  const isLongPage = !route.workSlug && !route.eraId;
  const viewKey = isLongPage ? "long" : route.path;
  const lastViewKeyRef = useRef<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    let cancelled = false;
    const id = window.requestAnimationFrame(() => {
      if (!cancelled) {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      }
    });
    document.fonts?.ready?.then(() => {
      if (!cancelled) {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      }
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
    };
  }, [lang]);

  // Title, description and canonical follow the route
  useEffect(() => {
    applyPageMeta(route, lang);
  }, [route, lang]);

  // Detail pages open at the top. Section paths scroll the long page to their section:
  // instantly when the long page has just been drawn, smoothly when it was already on screen.
  useEffect(() => {
    const freshView = lastViewKeyRef.current !== viewKey;
    lastViewKeyRef.current = viewKey;
    let raf1 = 0;
    let raf2 = 0;
    const go = () => {
      const lenis = lenisRef.current;
      lenis?.start();
      if (freshView) {
        lenis?.resize();
        ScrollTrigger.refresh();
      }
      const sectionId = isLongPage ? PAGE_SECTION_ID[route.page] : null;
      const el = sectionId ? document.getElementById(sectionId) : null;
      if (!el) {
        if (lenis) lenis.scrollTo(0, { immediate: freshView, force: true, duration: 1.05 });
        else window.scrollTo({ top: 0, behavior: freshView ? "auto" : "smooth" });
        return;
      }
      if (lenis) {
        lenis.scrollTo(el, { offset: 80, immediate: freshView, force: true, duration: 1.05 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: freshView ? "auto" : "smooth" });
      }
    };
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(go);
    });
    // A fresh load can be pushed around by the browser's own hash jump and late images: settle once more
    const settle = freshView ? window.setTimeout(go, 450) : 0;
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(settle);
    };
  }, [route, viewKey, isLongPage]);

  // Which section of the long page is in view (side rail + nav highlight)
  useEffect(() => {
    if (!isLongPage) return;
    const triggers: ScrollTrigger[] = [];
    const id = window.requestAnimationFrame(() => {
      SCROLL_SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: () => setActiveSection(section.id),
            onEnterBack: () => setActiveSection(section.id),
          })
        );
      });
    });
    const handleBottomCheck = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
      if (nearBottom) setActiveSection("contact");
      else if (window.scrollY < 120) setActiveSection("hero");
    };
    window.addEventListener("scroll", handleBottomCheck, { passive: true });
    handleBottomCheck();
    return () => {
      window.cancelAnimationFrame(id);
      triggers.forEach((t) => t.kill());
      window.removeEventListener("scroll", handleBottomCheck);
    };
  }, [isLongPage, lang]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;

    const updateNativeProgress = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollProgressRef.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    if (prefersReducedMotion || isTouchDevice) {
      window.addEventListener("scroll", updateNativeProgress, { passive: true });
      updateNativeProgress();

      // Only refresh ScrollTrigger on genuine horizontal width changes (orientation/breakpoint), never mobile URL bar height jitter
      let lastWidth = window.innerWidth;
      const handleWidthResize = () => {
        if (window.innerWidth !== lastWidth) {
          lastWidth = window.innerWidth;
          ScrollTrigger.refresh();
        }
      };
      window.addEventListener("resize", handleWidthResize, { passive: true });

      return () => {
        window.removeEventListener("scroll", updateNativeProgress);
        window.removeEventListener("resize", handleWidthResize);
      };
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
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

  const handleAudioPlayingChange = useCallback((playing: boolean) => {
    isAudioPlayingRef.current = playing;
  }, []);

  /** Section ids from the hero buttons and the side rail: go to that section's path. */
  const handleNavigate = useCallback((sectionId: string) => {
    const target = SECTION_TO_PAGE[sectionId];
    if (!target) return;
    const to = PAGE_PATHS[target];
    navigate(to, { replace: window.location.pathname === to });
  }, []);

  const handleOpenWork = useCallback((slug: string) => navigate(`/work/${slug}`), []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  // Nav highlight: the section in view on the long page, or the section a detail page belongs to
  const activePage: PageKey = isLongPage
    ? SECTION_TO_PAGE[activeSection] ?? "home"
    : route.page;

  return (
    <div className="relative min-h-[100dvh] text-[#F4F5F7]">
      <div className="noise-overlay" aria-hidden="true" />
      <MonolithScene
        scrollProgressRef={scrollProgressRef}
        scrollVelocityRef={scrollVelocityRef}
        lang={lang}
        isDossierOpen={false}
        isAudioPlayingRef={isAudioPlayingRef}
        routeKey={viewKey}
      />
      <CosmicDustCanvas
        scrollProgressRef={scrollProgressRef}
        scrollVelocityRef={scrollVelocityRef}
      />
      <ScrollTelemetry
        lang={lang}
        activeSection={activeSection}
        scrollProgressRef={scrollProgressRef}
        onNavigate={handleNavigate}
        chapters={isLongPage ? SCROLL_SECTIONS : []}
      />
      <Navbar lang={lang} activePage={activePage} onOpenWork={handleOpenWork} />

      <main key={viewKey} className={`relative z-10 w-full overflow-x-clip ${isLongPage ? "" : "pt-24 md:pt-28"}`}>
        {isLongPage ? (
          <>
            <HeroSection lang={lang} onNavigate={handleNavigate} />
            <StatementSection lang={lang} />
            <ChronicleSection lang={lang} />
            <WorksSection lang={lang} />
          </>
        ) : route.workSlug ? (
          <WorkPage slug={route.workSlug} lang={lang} />
        ) : (
          route.eraId && <EraPage id={route.eraId} lang={lang} />
        )}
        <SystemsAndContactSection
          lang={lang}
          onToggleLang={handleToggleLang}
          show={isLongPage ? "all" : "none"}
          activePage={activePage}
        />
      </main>
      <AmbientAudioPlayer
        lang={lang}
        onPlayingChange={handleAudioPlayingChange}
      />
    </div>
  );
}
