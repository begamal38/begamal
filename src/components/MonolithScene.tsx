import { useEffect, useRef, useState } from "react";
import { Lang } from "../data/portfolioData";

interface MonolithSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
  scrollVelocityRef: React.MutableRefObject<number>;
  lang: Lang;
  isDossierOpen?: boolean;
  isAudioPlayingRef?: React.MutableRefObject<boolean>;
}

const HERO_OPACITY = 0.42;
const READING_OPACITY = 0.22;
const DOSSIER_OPACITY = 0.12;

/**
 * Ambient monochrome Interstellar cinema video background (`/video/gargantua-bg-loop.mp4`).
 * Locked to `100lvh` so mobile URL bar resize never snaps/jumps during reverse scroll.
 * Desktop (`>= 768px`) runs smooth Lenis GPU scroll parallax + pointer drift + screen blend.
 * Mobile (`< 768px`) skips per-frame JS transforms & screen-blend repaints for native 120Hz fluidity.
 */
export function MonolithScene({
  scrollProgressRef,
  lang,
  isDossierOpen = false,
}: MonolithSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const isDossierOpenRef = useRef<boolean>(isDossierOpen);
  const langDirRef = useRef<number>(lang === "ar" ? -1 : 1);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    isDossierOpenRef.current = isDossierOpen;
  }, [isDossierOpen]);

  useEffect(() => {
    langDirRef.current = lang === "ar" ? -1 : 1;
  }, [lang]);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        setIsMobileViewport(window.innerWidth < 768);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const layer = layerRef.current;
    if (!video || !layer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
    } else if (!document.hidden) {
      video.play().catch(() => {});
    }

    const handleVisibility = () => {
      if (document.hidden || prefersReducedMotion) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Mobile (`< 768px`): zero per-frame JS transform/opacity mutations for native 120Hz touch inertia
    if (isMobileViewport) {
      layer.style.transform = "";
      layer.style.opacity = "";
      return () => {
        document.removeEventListener("visibilitychange", handleVisibility);
      };
    }

    const targetPointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 20;
      targetPointer.y = (e.clientY / window.innerHeight - 0.5) * 20;
    };

    if (hasFinePointer && !prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
    }

    let smoothedScroll = scrollProgressRef.current;
    let currentOpacity = isDossierOpenRef.current ? DOSSIER_OPACITY : HERO_OPACITY;
    let frameId = 0;

    const tick = () => {
      if (!document.hidden) {
        const rawProgress = Math.min(1, Math.max(0, scrollProgressRef.current));
        smoothedScroll += (rawProgress - smoothedScroll) * 0.08;

        currentPointer.x += (targetPointer.x - currentPointer.x) * 0.06;
        currentPointer.y += (targetPointer.y - currentPointer.y) * 0.06;

        // Desktop: 0.42 in Hero -> 0.22 across reading sections, or 0.12 behind Dossiers
        const scrollRatio = Math.min(1, smoothedScroll / 0.16);
        const scrollTargetOpacity =
          HERO_OPACITY - scrollRatio * (HERO_OPACITY - READING_OPACITY);
        const targetOpacity = isDossierOpenRef.current
          ? DOSSIER_OPACITY
          : scrollTargetOpacity;

        currentOpacity += (targetOpacity - currentOpacity) * 0.08;

        const translateYPercent = -(smoothedScroll * 5);
        const scaleVal = 1.03 + smoothedScroll * 0.08;
        const px = prefersReducedMotion ? 0 : currentPointer.x;
        const py = prefersReducedMotion ? 0 : currentPointer.y;

        layer.style.opacity = currentOpacity.toFixed(4);
        layer.style.transform = `translate3d(${px.toFixed(2)}px, calc(${translateYPercent.toFixed(4)}% + ${py.toFixed(2)}px), 0) scale(${scaleVal.toFixed(4)})`;
      }

      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    if (prefersReducedMotion) {
      layer.style.opacity = String(
        isDossierOpenRef.current ? DOSSIER_OPACITY : HERO_OPACITY
      );
      layer.style.transform = "translate3d(0px, 0px, 0) scale(1.03)";
    } else {
      frameId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (hasFinePointer && !prefersReducedMotion) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
    };
  }, [scrollProgressRef, isMobileViewport]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[100lvh] min-h-screen overflow-hidden bg-[#050505]"
    >
      <div
        ref={layerRef}
        className={`h-full w-full transition-opacity duration-300 md:will-change-transform md:transition-none ${
          isMobileViewport
            ? isDossierOpen
              ? "opacity-[0.12]"
              : "opacity-[0.26]"
            : ""
        }`}
        style={
          isMobileViewport
            ? undefined
            : {
                opacity: isDossierOpen ? DOSSIER_OPACITY : HERO_OPACITY,
                transform: "translate3d(0px, 0px, 0) scale(1.03)",
              }
        }
      >
        <video
          ref={videoRef}
          src="/video/gargantua-bg-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover object-[75%_18%] md:object-center md:mix-blend-screen"
        />
      </div>

      {/* Mobile lower vertical scrim ensuring razor-sharp contrast beneath Hero & reading copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent md:hidden"
      />

      {/* Soft radial + edge obsidian vignette preserving 100% typography legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 70% at 56% 44%, rgba(5,5,5,0) 26%, rgba(5,5,5,0.48) 72%, rgba(5,5,5,0.88) 100%), linear-gradient(90deg, rgba(5,5,5,0.65) 0%, rgba(5,5,5,0.22) 48%, rgba(5,5,5,0.1) 100%)",
        }}
      />
    </div>
  );
}
