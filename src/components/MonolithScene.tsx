import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Lang } from "../data/portfolioData";

interface MonolithSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
  scrollVelocityRef: React.MutableRefObject<number>;
  lang: Lang;
  isDossierOpen?: boolean;
  isAudioPlayingRef?: React.MutableRefObject<boolean>;
}

/**
 * Generates a soft radial white-to-transparent glow texture in memory
 * for relativistic disk particles, lensed arc dust, and starfield points.
 */
function createProceduralGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const half = size / 2;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.28, "rgba(229, 231, 235, 0.72)");
    grad.addColorStop(0.62, "rgba(161, 166, 176, 0.2)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Monochrome Interstellar Gargantua + Tesseract 3D Spatial Background.
 * Strictly calibrated in Pure Void Black (#050505) and Cold Brushed Titanium
 * (#E5E7EB / #A1A6B0 / #27292E) for editorial subtlety and text legibility.
 */
export function MonolithScene({
  scrollProgressRef,
  scrollVelocityRef,
  lang,
  isDossierOpen = false,
  isAudioPlayingRef,
}: MonolithSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const langDirRef = useRef<number>(lang === "ar" ? -1 : 1);

  useEffect(() => {
    langDirRef.current = lang === "ar" ? -1 : 1;
  }, [lang]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.028);

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 48 : 40,
      window.innerWidth / window.innerHeight,
      0.1,
      80
    );
    camera.position.set(0, 0.4, 15.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x050505, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    const glowTexture = createProceduralGlowTexture();
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // 1. Gargantua Monochrome Singularity Rig
    const gargantuaGroup = new THREE.Group();
    gargantuaGroup.rotation.set(0.24, 0, -0.18);
    gargantuaGroup.position.set(isMobile ? 0 : 1.65 * langDirRef.current, 0.2, 0);
    scene.add(gargantuaGroup);

    // Event horizon pure obsidian sphere
    const horizonGeom = new THREE.SphereGeometry(1.85, 48, 48);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x020203 });
    geometriesToDispose.push(horizonGeom);
    materialsToDispose.push(horizonMat);
    const horizonSphere = new THREE.Mesh(horizonGeom, horizonMat);
    gargantuaGroup.add(horizonSphere);

    // Razor-thin Cold Titanium photon ring
    const photonRingGeom = new THREE.RingGeometry(1.89, 2.0, 128);
    const photonRingMat = new THREE.MeshBasicMaterial({
      color: 0xe5e7eb,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.58,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    geometriesToDispose.push(photonRingGeom);
    materialsToDispose.push(photonRingMat);
    const photonRing = new THREE.Mesh(photonRingGeom, photonRingMat);
    gargantuaGroup.add(photonRing);

    // Gravitational lensing vertical halo + subtle secondary outer ring
    const lensedHaloGeom = new THREE.TorusGeometry(2.08, 0.042, 16, 128);
    const lensedHaloMat = new THREE.MeshBasicMaterial({
      color: 0xd1d5db,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    geometriesToDispose.push(lensedHaloGeom);
    materialsToDispose.push(lensedHaloMat);
    const lensedHalo = new THREE.Mesh(lensedHaloGeom, lensedHaloMat);
    gargantuaGroup.add(lensedHalo);

    const secondaryRingGeom = new THREE.TorusGeometry(2.52, 0.025, 12, 128);
    const secondaryRingMat = new THREE.MeshBasicMaterial({
      color: 0xa1a6b0,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    geometriesToDispose.push(secondaryRingGeom);
    materialsToDispose.push(secondaryRingMat);
    const secondaryRing = new THREE.Mesh(secondaryRingGeom, secondaryRingMat);
    secondaryRing.rotation.x = Math.PI * 0.44;
    gargantuaGroup.add(secondaryRing);

    // Swirling relativistic accretion disk (differential orbital rotation)
    const diskCount = isMobile ? 1400 : 3600;
    const diskPositions = new Float32Array(diskCount * 3);
    const diskColors = new Float32Array(diskCount * 3);
    const diskRadii = new Float32Array(diskCount);
    const diskAngles = new Float32Array(diskCount);
    const diskSpeeds = new Float32Array(diskCount);
    const diskHeights = new Float32Array(diskCount);

    const colInner = new THREE.Color(0xe5e7eb);
    const colOuter = new THREE.Color(0xa1a6b0);
    const colTemp = new THREE.Color();

    for (let i = 0; i < diskCount; i++) {
      const t = Math.pow(Math.random(), 1.65);
      const r = 2.15 + t * 5.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * (0.08 + t * 0.22);

      diskRadii[i] = r;
      diskAngles[i] = angle;
      diskHeights[i] = y;
      // Faster orbital velocity closer to the event horizon
      diskSpeeds[i] = (0.34 / Math.pow(r * 0.48, 1.35)) * (0.85 + Math.random() * 0.3);

      const i3 = i * 3;
      diskPositions[i3] = Math.cos(angle) * r;
      diskPositions[i3 + 1] = y;
      diskPositions[i3 + 2] = Math.sin(angle) * r;

      colTemp.copy(colInner).lerp(colOuter, t);
      const brightness = 1.0 - t * 0.42;
      diskColors[i3] = colTemp.r * brightness;
      diskColors[i3 + 1] = colTemp.g * brightness;
      diskColors[i3 + 2] = colTemp.b * brightness;
    }

    const diskGeom = new THREE.BufferGeometry();
    diskGeom.setAttribute("position", new THREE.BufferAttribute(diskPositions, 3));
    diskGeom.setAttribute("color", new THREE.BufferAttribute(diskColors, 3));
    const diskMat = new THREE.PointsMaterial({
      size: isMobile ? 0.11 : 0.095,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    geometriesToDispose.push(diskGeom);
    materialsToDispose.push(diskMat);
    const accretionDisk = new THREE.Points(diskGeom, diskMat);
    gargantuaGroup.add(accretionDisk);

    // Subtle vertical lensed arc dust wrapping above & below horizon
    const arcCount = isMobile ? 500 : 1200;
    const arcPositions = new Float32Array(arcCount * 3);
    const arcColors = new Float32Array(arcCount * 3);
    for (let i = 0; i < arcCount; i++) {
      const i3 = i * 3;
      const r = 1.98 + Math.pow(Math.random(), 1.4) * 1.35;
      const theta = Math.random() * Math.PI * 2;
      const spreadZ = (Math.random() - 0.5) * 0.32;
      arcPositions[i3] = Math.cos(theta) * r;
      arcPositions[i3 + 1] = Math.sin(theta) * r * 1.06;
      arcPositions[i3 + 2] = spreadZ;

      const fade = 0.6 + Math.random() * 0.4;
      arcColors[i3] = colInner.r * fade;
      arcColors[i3 + 1] = colInner.g * fade;
      arcColors[i3 + 2] = colInner.b * fade;
    }

    const arcGeom = new THREE.BufferGeometry();
    arcGeom.setAttribute("position", new THREE.BufferAttribute(arcPositions, 3));
    arcGeom.setAttribute("color", new THREE.BufferAttribute(arcColors, 3));
    const arcMat = new THREE.PointsMaterial({
      size: isMobile ? 0.085 : 0.075,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    geometriesToDispose.push(arcGeom);
    materialsToDispose.push(arcMat);
    const lensedArc = new THREE.Points(arcGeom, arcMat);
    gargantuaGroup.add(lensedArc);

    // 2. Tesseract Dimensional Lattice (Layered Wireframe Strata & Vertical Time Rays)
    const tesseractGroup = new THREE.Group();
    tesseractGroup.position.set(0, 0, -9);
    scene.add(tesseractGroup);

    const gridSpecs = [
      { size: 28, divs: 18, y: -3.8, z: 2.0, rx: 0.14, ry: 0.08, op: 0.09 },
      { size: 32, divs: 20, y: 4.2, z: -2.5, rx: -0.12, ry: -0.1, op: 0.075 },
      { size: 36, divs: 16, y: 0, z: -6.5, rx: Math.PI * 0.42, ry: 0.22, op: 0.1 },
    ];
    gridSpecs.forEach((spec) => {
      const grid = new THREE.GridHelper(spec.size, spec.divs, 0xe5e7eb, 0x27292e);
      grid.position.set(0, spec.y, spec.z);
      grid.rotation.set(spec.rx, spec.ry, 0);
      const mats = Array.isArray(grid.material) ? grid.material : [grid.material];
      mats.forEach((m) => {
        m.transparent = true;
        m.opacity = spec.op;
        m.depthWrite = false;
        materialsToDispose.push(m);
      });
      geometriesToDispose.push(grid.geometry);
      tesseractGroup.add(grid);
    });

    // Vertical light-pillar time rays behind Gargantua
    const rayCount = isMobile ? 24 : 48;
    const rayCoords = new Float32Array(rayCount * 6);
    for (let i = 0; i < rayCount; i++) {
      const i6 = i * 6;
      const x = (Math.random() - 0.5) * 28;
      const z = (Math.random() - 0.5) * 14 - 2;
      const h = 8 + Math.random() * 14;
      const yCenter = (Math.random() - 0.5) * 6;
      rayCoords[i6] = x;
      rayCoords[i6 + 1] = yCenter - h * 0.5;
      rayCoords[i6 + 2] = z;
      rayCoords[i6 + 3] = x;
      rayCoords[i6 + 4] = yCenter + h * 0.5;
      rayCoords[i6 + 5] = z;
    }
    const raysGeom = new THREE.BufferGeometry();
    raysGeom.setAttribute("position", new THREE.BufferAttribute(rayCoords, 3));
    const raysMat = new THREE.LineBasicMaterial({
      color: 0xe5e7eb,
      transparent: true,
      opacity: 0.09,
      depthWrite: false,
    });
    geometriesToDispose.push(raysGeom);
    materialsToDispose.push(raysMat);
    const timeRays = new THREE.LineSegments(raysGeom, raysMat);
    tesseractGroup.add(timeRays);

    // 3. Deep Relativistic Starfield
    const starCount = isMobile ? 650 : 1400;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const r = 10 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = r * Math.cos(phi) - 6;

      const c = i % 4 === 0 ? colInner : colOuter;
      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;
    }
    const starGeom = new THREE.BufferGeometry();
    starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.09 : 0.08,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    geometriesToDispose.push(starGeom);
    materialsToDispose.push(starMat);
    const starfield = new THREE.Points(starGeom, starMat);
    scene.add(starfield);

    // Pointer parallax (desktop fine pointer)
    const targetPointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const handlePointerMove = (e: PointerEvent) => {
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    if (hasFinePointer && !prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
    }

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      camera.aspect = w / h;
      camera.fov = mobile ? 48 : 40;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let smoothedScroll = scrollProgressRef.current;
    let smoothedDir = langDirRef.current;
    let frameId = 0;
    let isVisible = !document.hidden;
    let contextLost = false;
    const clock = new THREE.Clock();

    const updateScene = (dt: number, elapsed: number) => {
      const mobile = window.innerWidth < 768;
      smoothedScroll = THREE.MathUtils.lerp(
        smoothedScroll,
        scrollProgressRef.current,
        0.08
      );
      scrollVelocityRef.current *= 0.92;
      smoothedDir = THREE.MathUtils.lerp(smoothedDir, langDirRef.current, 0.14);

      currentPointer.x = THREE.MathUtils.lerp(
        currentPointer.x,
        targetPointer.x,
        0.04
      );
      currentPointer.y = THREE.MathUtils.lerp(
        currentPointer.y,
        targetPointer.y,
        0.04
      );

      // Differential orbital rotation for accretion disk particles
      const posAttr = diskGeom.getAttribute("position") as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < diskCount; i++) {
        const angle = diskAngles[i] + diskSpeeds[i] * dt;
        diskAngles[i] = angle;
        const r = diskRadii[i];
        const i3 = i * 3;
        arr[i3] = Math.cos(angle) * r;
        arr[i3 + 2] = Math.sin(angle) * r;
      }
      posAttr.needsUpdate = true;

      // Subtle vertical lensed arc rotation
      lensedArc.rotation.z = elapsed * 0.045;
      lensedHalo.rotation.z = -elapsed * 0.03;
      secondaryRing.rotation.z = elapsed * 0.025;

      // Subtle photon ring breathing when ambient audio is playing (±2%)
      if (isAudioPlayingRef?.current) {
        const breath = 1 + Math.sin(elapsed * 1.45) * 0.02;
        photonRing.scale.setScalar(breath);
      } else {
        photonRing.scale.setScalar(1);
      }

      // Gargantua gentle scroll choreography (frames right/left in Hero, drifts subtly with scroll)
      const heroShiftX = mobile ? 0 : (1.75 - smoothedScroll * 2.4) * smoothedDir;
      gargantuaGroup.position.x = heroShiftX + currentPointer.x * 0.45;
      gargantuaGroup.position.y =
        (mobile ? 0.65 : 0.15) - smoothedScroll * 0.6 - currentPointer.y * 0.3;
      gargantuaGroup.rotation.y = smoothedScroll * 0.45 + currentPointer.x * 0.08;
      gargantuaGroup.rotation.x = 0.24 + smoothedScroll * 0.14 - currentPointer.y * 0.05;

      // Tesseract strata slow drift & scroll rotation
      tesseractGroup.rotation.y = elapsed * 0.018 + smoothedScroll * 0.55;
      tesseractGroup.rotation.x = Math.sin(elapsed * 0.04) * 0.05 + smoothedScroll * 0.18;

      // Starfield spherical drift
      starfield.rotation.y = elapsed * 0.01 + smoothedScroll * 0.22;
      starfield.rotation.x = smoothedScroll * 0.08;

      // Camera glides smoothly z: 15.5 -> 11.8 with subtle Y/angle drift
      camera.position.z = THREE.MathUtils.lerp(15.5, 11.8, smoothedScroll);
      camera.position.y = 0.4 - smoothedScroll * 0.55 - currentPointer.y * 0.22;
      camera.position.x = currentPointer.x * 0.35;
      camera.lookAt(currentPointer.x * 0.12, -currentPointer.y * 0.08, 0);
    };

    const stepFrame = () => {
      if (!isVisible || contextLost) return;
      frameId = window.requestAnimationFrame(stepFrame);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      updateScene(dt, elapsed);
      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      updateScene(0, 0);
      renderer.render(scene, camera);
    } else {
      clock.start();
      stepFrame();
    }

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };
    const handleContextRestored = () => {
      contextLost = false;
      if (!document.hidden && !prefersReducedMotion) {
        clock.getDelta();
        stepFrame();
      }
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      handleContextRestored
    );

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !contextLost && !prefersReducedMotion) {
        clock.getDelta();
        stepFrame();
      } else if (!isVisible && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost
      );
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        handleContextRestored
      );
      if (hasFinePointer) {
        window.removeEventListener("pointermove", handlePointerMove);
      }

      glowTexture.dispose();
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgressRef, scrollVelocityRef, isAudioPlayingRef]);

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 ${
          isDossierOpen ? "opacity-45" : "opacity-100"
        }`}
      />
      {/* Subtle radial edge vignette keeping outer typography razor-sharp */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(5,5,5,0) 35%, rgba(5,5,5,0.44) 76%, rgba(5,5,5,0.82) 100%)",
        }}
      />
    </>
  );
}
