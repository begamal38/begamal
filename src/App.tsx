import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang } from "./data/portfolioData";
import { MonolithScene } from "./components/MonolithScene";
import { CosmicDustCanvas } from "./components/CosmicDustCanvas";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { HomeIndex } from "./components/HomeIndex";
import { StatementSection } from "./components/StatementSection";
import { ChronicleSection } from "./components/ChronicleSection";
import { WorksSection } from "./components/WorksSection";
import { SystemsAndContactSection } from "./components/SystemsAndContactSection";
import { AmbientAudioPlayer } from "./components/AmbientAudioPlayer";
import { PAGE_PATHS, SECTION_TO_PAGE, closeWork, navigate, useRoute } from "./lib/router";
import { applyPageMeta } from "./lib/pageMeta";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const scrollProgressRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const isAudioPlayingRef = useRef<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);
  const route = useRoute();
  const page = route.page;

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

  // Title, description and canonical follow the page (and the open work dossier)
  useEffect(() => {
    applyPageMeta(route, lang);
  }, [route, lang]);

  // A new page opens at the top; opening/closing a dossier over a page keeps its scroll
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const id = window.requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [page]);

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

  const handleModalOpenChange = useCallback((isOpen: boolean) => {
    setIsDossierOpen(isOpen);
    if (isOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, []);

  const handleAudioPlayingChange = useCallback((playing: boolean) => {
    isAudioPlayingRef.current = playing;
  }, []);

  /** Section ids from older buttons: an in-page anchor scrolls, anything else goes to its page. */
  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el && !SECTION_TO_PAGE[sectionId]) {
      if (lenisRef.current) {
        lenisRef.current.start();
        lenisRef.current.scrollTo(el, { offset: -72, duration: 1.05 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    const target = SECTION_TO_PAGE[sectionId];
    if (target) navigate(PAGE_PATHS[target]);
  }, []);

  const handleOpenWork = useCallback(
    (slug: string) => {
      const state = window.history.state as { bg?: string; inApp?: boolean } | null;
      if (route.workSlug) {
        // Already in a dossier: swap it in place, keep the page underneath
        navigate(`/work/${slug}`, { replace: true, state: { bg: page, inApp: state?.inApp } });
      } else {
        navigate(`/work/${slug}`, { state: { bg: page } });
      }
    },
    [route.workSlug, page]
  );

  const handleStepWork = useCallback(
    (slug: string) => {
      const state = window.history.state as { bg?: string; inApp?: boolean } | null;
      navigate(`/work/${slug}`, { replace: true, state: { bg: page, inApp: state?.inApp } });
    },
    [page]
  );

  const handleCloseWork = useCallback(() => closeWork(route), [route]);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const worksProps = {
    lang,
    onModalOpenChange: handleModalOpenChange,
    openSlug: route.workSlug,
    onOpenWork: handleOpenWork,
    onStepWork: handleStepWork,
    onCloseWork: handleCloseWork,
  };

  return (
    <div className="relative min-h-[100dvh] text-[#F4F5F7]">
      <div className="noise-overlay" aria-hidden="true" />
      <MonolithScene
        scrollProgressRef={scrollProgressRef}
        scrollVelocityRef={scrollVelocityRef}
        lang={lang}
        isDossierOpen={isDossierOpen}
        isAudioPlayingRef={isAudioPlayingRef}
        routeKey={page}
      />
      <CosmicDustCanvas
        scrollProgressRef={scrollProgressRef}
        scrollVelocityRef={scrollVelocityRef}
      />
      <Navbar lang={lang} activePage={page} onOpenWork={handleOpenWork} />

      <main key={page} className={`relative z-10 w-full overflow-x-clip ${page === "home" ? "" : "pt-20 md:pt-24"}`}>
        {page === "home" && (
          <>
            <HeroSection lang={lang} onNavigate={handleNavigate} />
            <HomeIndex lang={lang} onOpenWork={handleOpenWork} />
          </>
        )}
        {page === "about" && <StatementSection lang={lang} />}
        {page === "chronicle" && (
          <ChronicleSection lang={lang} onModalOpenChange={handleModalOpenChange} />
        )}
        {page === "work" && <WorksSection {...worksProps} variant="full" />}
        <SystemsAndContactSection
          lang={lang}
          onToggleLang={handleToggleLang}
          show={page === "systems" ? "systems" : page === "contact" ? "contact" : "none"}
          activePage={page}
        />
      </main>
      {/* A work opened over another page (home cards, nav menu) */}
      {page !== "work" && route.workSlug && <WorksSection {...worksProps} variant="dossierOnly" />}
      <AmbientAudioPlayer
        lang={lang}
        onPlayingChange={handleAudioPlayingChange}
      />
    </div>
  );
}
