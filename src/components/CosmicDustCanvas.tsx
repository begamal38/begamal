import { useEffect, useRef } from "react";

interface CosmicDustCanvasProps {
  scrollProgressRef: React.MutableRefObject<number>;
  scrollVelocityRef: React.MutableRefObject<number>;
}

type DepthStratum = "far" | "mid" | "near";

interface DustParticle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  driftX: number;
  driftY: number;
  phase: number;
  twinkleSpeed: number;
  depthSpeed: number;
  stratum: DepthStratum;
  hasCrossGlint: boolean;
  isBrightSilver: boolean;
  /** Random scintillation: next flare start (s), its duration (s) and peak strength */
  flareStart: number;
  flareDur: number;
  flarePeak: number;
}

interface ShootingStar {
  start: number;
  dur: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * Featherweight 2D Canvas overlay rendering 3-depth monochrome Cold Brushed Titanium
 * cosmic dust and micro-twinkle starlight glints. Locked to `100lvh` so mobile URL
 * bar resize never clears or snaps particles; reads native scrollY passively on touch devices.
 */
export function CosmicDustCanvas({
  scrollVelocityRef,
}: CosmicDustCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;

    let width = window.innerWidth;
    let height = Math.max(window.innerHeight, document.documentElement.clientHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.25 : 1.5);

    const createParticles = (w: number, h: number): DustParticle[] => {
      const count = w < 768 ? 40 : 95;
      const list: DustParticle[] = [];

      for (let i = 0; i < count; i++) {
        const roll = Math.random();
        let stratum: DepthStratum = "mid";
        let size = 1.4;
        let baseAlpha = 0.28;
        let depthSpeed = 0.4;
        let driftY = -(0.06 + Math.random() * 0.12);

        if (roll < 0.45) {
          stratum = "far";
          size = 0.6 + Math.random() * 0.4;
          baseAlpha = 0.22 + Math.random() * 0.28;
          depthSpeed = 0.14;
          driftY = -(0.02 + Math.random() * 0.05);
        } else if (roll < 0.83) {
          stratum = "mid";
          size = 1.2 + Math.random() * 0.6;
          baseAlpha = 0.18 + Math.random() * 0.27;
          depthSpeed = 0.42;
          driftY = -(0.05 + Math.random() * 0.1);
        } else {
          stratum = "near";
          size = 2.2 + Math.random() * 1.0;
          baseAlpha = 0.1 + Math.random() * 0.12;
          depthSpeed = 0.85;
          driftY = -(0.08 + Math.random() * 0.14);
        }

        list.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          baseAlpha,
          driftX: (Math.random() - 0.5) * 0.12,
          driftY,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.6 + Math.random() * 1.1,
          depthSpeed,
          stratum,
          hasCrossGlint: stratum === "far" && Math.random() < 0.14,
          isBrightSilver: Math.random() < 0.65,
          flareStart: stratum === "near" ? Infinity : rand(0.5, stratum === "far" ? 14 : 28),
          flareDur: rand(0.6, 1.4),
          flarePeak: rand(0.45, 0.8),
        });
      }
      return list;
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      const maxDpr = width < 768 ? 1.25 : 1.5;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    let particles = createParticles(width, height);

    const handleResize = () => {
      // Ignore vertical-only URL bar show/hide resizes on mobile to avoid canvas clear & jitter
      if (window.innerWidth === width && width < 1024) {
        return;
      }
      const prevMobile = width < 768;
      resizeCanvas();
      const nowMobile = width < 768;
      if (prevMobile !== nowMobile) {
        particles = createParticles(width, height);
      } else {
        for (const p of particles) {
          p.x = ((p.x % width) + width) % width;
          p.y = ((p.y % height) + height) % height;
        }
      }
      if (prefersReducedMotion) {
        renderFrame(0, 0);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Rare celestial events: one star breaks into a lensed flash, or a meteor crosses the void
    let nextFlashAt = rand(3, 7);
    let flashIndex = -1;
    let flashStart = 0;
    const FLASH_DUR = 1.6;
    let meteor: ShootingStar | null = null;
    let nextMeteorAt = rand(9, 18);

    /** Fast attack, slow exponential decay — how real starlight scintillates */
    const envelope = (t: number, start: number, dur: number) => {
      const k = (t - start) / dur;
      if (k < 0 || k > 1) return 0;
      return k < 0.12 ? k / 0.12 : Math.exp(-(k - 0.12) * 4.2);
    };

    let smoothedVelocity = 0;
    let prevScrollY = window.scrollY;
    let frameId = 0;
    let isVisible = !document.hidden;
    const startTime = performance.now();

    const renderFrame = (elapsedSec: number, velocity: number) => {
      ctx.clearRect(0, 0, width, height);

      const absV = Math.abs(velocity);
      const isWarping = absV > 1.5;
      const streakLength = isWarping
        ? Math.min(14, Math.max(0, absV * 0.45))
        : 0;
      const velocityBoost = isWarping ? Math.min(0.15, (absV - 1.5) * 0.015) : 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.driftX;
          p.y += p.driftY - velocity * p.depthSpeed * 0.35;

          if (p.x < -8) p.x = width + 8;
          else if (p.x > width + 8) p.x = -8;
          if (p.y < -20) p.y = height + 20;
          else if (p.y > height + 20) p.y = -20;
        }

        const rgb = p.isBrightSilver ? "229, 231, 235" : "161, 166, 176";
        let alpha = p.baseAlpha;

        // Random flare scheduling (no fixed rhythm)
        let flare = 0;
        if (!prefersReducedMotion && p.flareStart !== Infinity) {
          if (elapsedSec > p.flareStart + p.flareDur) {
            p.flareStart = elapsedSec + rand(p.stratum === "far" ? 4 : 9, p.stratum === "far" ? 18 : 34);
            p.flareDur = rand(0.6, 1.4);
            p.flarePeak = rand(0.45, 0.8);
          }
          flare = envelope(elapsedSec, p.flareStart, p.flareDur) * p.flarePeak;
        }
        if (i === flashIndex) {
          flare = Math.max(flare, envelope(elapsedSec, flashStart, FLASH_DUR));
        }

        if (p.stratum === "far") {
          // Two incommensurate waves = irregular atmospheric shimmer instead of a metronome
          const twinkle =
            0.6 +
            0.25 * Math.sin(elapsedSec * p.twinkleSpeed + p.phase) +
            0.15 * Math.sin(elapsedSec * p.twinkleSpeed * 2.73 + p.phase * 1.7);
          alpha = p.baseAlpha * twinkle;
        } else if (isWarping) {
          alpha = Math.min(0.85, p.baseAlpha + velocityBoost);
        }

        if (isWarping && p.stratum !== "far" && streakLength > 0.6) {
          const halfStreak = streakLength * 0.5;
          const grad = ctx.createLinearGradient(
            p.x,
            p.y - halfStreak,
            p.x,
            p.y + halfStreak
          );
          grad.addColorStop(0, `rgba(${rgb}, 0)`);
          grad.addColorStop(0.5, `rgba(${rgb}, ${alpha.toFixed(3)})`);
          grad.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1, p.size * 0.72);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - halfStreak);
          ctx.lineTo(p.x, p.y + halfStreak);
          ctx.stroke();
        } else if (p.stratum === "near") {
          const rad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 1.4);
          rad.addColorStop(0, `rgba(${rgb}, ${alpha.toFixed(3)})`);
          rad.addColorStop(0.55, `rgba(${rgb}, ${(alpha * 0.45).toFixed(3)})`);
          rad.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.fillStyle = rad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }

        if (flare > 0.03) {
          const peakAlpha = Math.min(0.95, alpha + flare * 0.75);
          // Soft halo
          const haloR = p.size * (3 + flare * 7);
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
          halo.addColorStop(0, `rgba(244, 245, 247, ${peakAlpha.toFixed(3)})`);
          halo.addColorStop(0.35, `rgba(229, 231, 235, ${(flare * 0.28).toFixed(3)})`);
          halo.addColorStop(1, "rgba(229, 231, 235, 0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
          ctx.fill();
          // Lensed horizontal streak (anamorphic, Interstellar-style) + short vertical spike
          if (flare > 0.3) {
            const armH = 6 + flare * (i === flashIndex ? 46 : 16);
            const armV = armH * 0.38;
            const sAlpha = (flare * 0.55).toFixed(3);
            const gh = ctx.createLinearGradient(p.x - armH, p.y, p.x + armH, p.y);
            gh.addColorStop(0, "rgba(229, 231, 235, 0)");
            gh.addColorStop(0.5, `rgba(244, 245, 247, ${sAlpha})`);
            gh.addColorStop(1, "rgba(229, 231, 235, 0)");
            ctx.strokeStyle = gh;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x - armH, p.y);
            ctx.lineTo(p.x + armH, p.y);
            ctx.stroke();
            const gv = ctx.createLinearGradient(p.x, p.y - armV, p.x, p.y + armV);
            gv.addColorStop(0, "rgba(229, 231, 235, 0)");
            gv.addColorStop(0.5, `rgba(244, 245, 247, ${sAlpha})`);
            gv.addColorStop(1, "rgba(229, 231, 235, 0)");
            ctx.strokeStyle = gv;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - armV);
            ctx.lineTo(p.x, p.y + armV);
            ctx.stroke();
          }
        }

        if (p.hasCrossGlint) {
          const pulse = Math.max(0, Math.sin(elapsedSec * 0.9 + p.phase * 2.1));
          const shimmerAlpha =
            pulse > 0.72 || isWarping
              ? Math.min(0.55, 0.18 + pulse * 0.25 + velocityBoost)
              : 0;
          if (shimmerAlpha > 0.04) {
            const arm = 2.8 + pulse * 2.4 + (isWarping ? 1.5 : 0);
            ctx.strokeStyle = `rgba(229, 231, 235, ${shimmerAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x - arm, p.y);
            ctx.lineTo(p.x + arm, p.y);
            ctx.moveTo(p.x, p.y - arm);
            ctx.lineTo(p.x, p.y + arm);
            ctx.stroke();
          }
        }
      }

      if (prefersReducedMotion) return;

      // Schedule the rare lensed flash on a random distant star
      if (elapsedSec > nextFlashAt) {
        const candidates = particles
          .map((q, idx) => ({ q, idx }))
          .filter(({ q }) => q.stratum !== "near" && q.y > height * 0.08 && q.y < height * 0.7);
        if (candidates.length) {
          flashIndex = candidates[Math.floor(Math.random() * candidates.length)].idx;
          flashStart = elapsedSec;
        }
        nextFlashAt = elapsedSec + rand(6, 13);
      }

      // Rare meteor sweeping across the upper sky
      if (!meteor && elapsedSec > nextMeteorAt) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const speed = rand(520, 760);
        const angle = rand(0.32, 0.52);
        meteor = {
          start: elapsedSec,
          dur: rand(0.7, 1.05),
          x: dir === 1 ? rand(-0.05, 0.45) * width : rand(0.55, 1.05) * width,
          y: rand(0.02, 0.32) * height,
          vx: dir * speed * Math.cos(angle),
          vy: speed * Math.sin(angle),
        };
        nextMeteorAt = elapsedSec + rand(16, 32);
      }
      if (meteor) {
        const k = (elapsedSec - meteor.start) / meteor.dur;
        if (k >= 1) {
          meteor = null;
        } else {
          const t = elapsedSec - meteor.start;
          const hx = meteor.x + meteor.vx * t;
          const hy = meteor.y + meteor.vy * t;
          const tail = 0.16;
          const tx = hx - meteor.vx * tail;
          const ty = hy - meteor.vy * tail;
          const fade = Math.sin(Math.PI * k) * 0.55;
          const g = ctx.createLinearGradient(tx, ty, hx, hy);
          g.addColorStop(0, "rgba(229, 231, 235, 0)");
          g.addColorStop(1, `rgba(244, 245, 247, ${fade.toFixed(3)})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.1;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.stroke();
        }
      }
    };

    const tick = (now: number) => {
      if (!isVisible || prefersReducedMotion) return;
      const elapsedSec = (now - startTime) * 0.001;

      if (isTouchDevice) {
        const currentY = window.scrollY;
        const deltaY = Math.max(-45, Math.min(45, currentY - prevScrollY));
        prevScrollY = currentY;
        smoothedVelocity += (deltaY - smoothedVelocity) * 0.08;
      } else {
        const rawV = scrollVelocityRef.current;
        smoothedVelocity += (rawV - smoothedVelocity) * 0.16;
        scrollVelocityRef.current *= 0.92;
      }

      renderFrame(elapsedSec, smoothedVelocity);
      frameId = window.requestAnimationFrame(tick);
    };

    if (prefersReducedMotion) {
      renderFrame(0, 0);
    } else if (isVisible) {
      frameId = window.requestAnimationFrame(tick);
    }

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        prevScrollY = window.scrollY;
        if (!frameId) {
          frameId = window.requestAnimationFrame(tick);
        }
      } else if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [scrollVelocityRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-[100lvh] min-h-screen w-full"
    />
  );
}
