import { useEffect, useRef } from "react";
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
 * Ambient monochrome Interstellar cinema video background (`/video/gargantua-bg-loop.mp4`)
 * blended seamlessly into `#050505` void via `mix-blend-screen`, driven on GPU with
 * Lenis-synced scroll opacity/parallax, subtle pointer parallax, reduced-motion pause,
 * and automatic background-tab pause.
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

  useEffect(() => {
    isDossierOpenRef.current = isDossierOpen;
  }, [isDossierOpen]);

  useEffect(() => {
    langDirRef.current = lang === "ar" ? -1 : 1;
  }, [lang]);

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

    const targetPointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 20; // +/- 10px
      targetPointer.y = (e.clientY / window.innerHeight - 0.5) * 20; // +/- 10px
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

        // Ease smoothly from 0.42 in Hero down to 0.22 across reading sections, or 0.12 behind Dossiers
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
  }, [scrollProgressRef]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]"
    >
      <div
        ref={layerRef}
        className="h-full w-full will-change-transform"
        style={{
          opacity: isDossierOpen ? DOSSIER_OPACITY : HERO_OPACITY,
          transform: "translate3d(0px, 0px, 0) scale(1.03)",
        }}
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
          className="h-full w-full object-cover object-right md:object-center mix-blend-screen"
        />
      </div>

      {/* Soft radial + edge obsidian vignette preserving 100% left/center typography legibility */}
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
