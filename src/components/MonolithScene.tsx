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

const HORIZON_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const HORIZON_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform vec2 uResolution;
  uniform float uDir;
  uniform float uAudio;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.52;
    mat2 rot = mat2(0.82, -0.57, 0.57, 0.82);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.03 + vec2(13.1, 7.7);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // Subtle depth zoom & scroll evolution along the cosmic horizon
    float zoom = mix(1.0, 0.84, uScroll);
    p *= zoom;

    // Off-center gravitational anchor (sweeping diagonally across upper-right third in LTR, mirrored smoothly in RTL)
    vec2 center = vec2(0.68 * aspect * uDir, 0.44 - uScroll * 0.24) + uPointer * vec2(0.045, 0.032);
    vec2 rel = p - center;

    // Diagonal anamorphic tilt shifting gently with scroll
    float tilt = (-0.28 + uScroll * 0.14) * uDir;
    float cs = cos(tilt);
    float sn = sin(tilt);
    vec2 rotRel = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs);

    float dist = length(rotRel);
    float angle = atan(rotRel.y, rotRel.x);

    // Monumental partially-cropped event horizon radius
    float horizonR = mix(0.62, 0.72, uScroll);

    // FBM flowing light-plasma along orbital phase
    float flowTime = uTime * 0.065;
    vec2 plasmaCoord = vec2(angle * 2.4 + flowTime * 0.85, (dist - horizonR) * 5.2 - flowTime * 0.3);
    float streaks = fbm(plasmaCoord + vec2(fbm(plasmaCoord * 1.6 + flowTime * 0.2), 0.0));
    float microStreaks = fbm(vec2(angle * 7.5 - flowTime * 1.1, (dist - horizonR) * 14.0));

    // Primary relativistic lensing arc hugging the upper-right singularity shadow
    float outerBand = exp(-abs(dist - (horizonR + 0.035 + (streaks - 0.5) * 0.05)) * 18.0);
    float coronaMist = exp(-max(0.0, dist - horizonR) * 3.1) * (0.45 + 0.55 * streaks);
    float sharpRim = exp(-abs(dist - (horizonR + 0.012)) * 54.0);

    // Sweeping diagonal accretion ribbon (Interstellar-inspired bent plane)
    float planeDist = abs(rotRel.y - sin(rotRel.x * 1.15) * 0.04);
    float accretionRibbon = exp(-planeDist * 11.5) * smoothstep(horizonR * 0.72, horizonR + 0.55, dist);
    float ribbonFlow = fbm(vec2(rotRel.x * 3.8 + flowTime * 1.4, rotRel.y * 12.0));
    accretionRibbon *= (0.45 + 0.75 * ribbonFlow) * exp(-max(0.0, dist - horizonR) * 0.65);

    // Subtle anamorphic horizontal lens flare grazing the horizon limb
    float flareY = abs(rotRel.y + 0.08);
    float anamorphicFlare = exp(-flareY * 26.0) * exp(-abs(rotRel.x + 0.35 * uDir) * 1.45) * 0.32;

    // Singularity shadow carving darkness inside the upper-right arc
    float shadowMask = smoothstep(horizonR - 0.025, horizonR + 0.035, dist);

    // Monochrome Obsidian (#050505) + Cold Brushed Titanium (#A1A6B0 -> #E5E7EB)
    float breath = 1.0 + uAudio * (0.06 + 0.03 * sin(uTime * 1.35));
    float midIntensity = (coronaMist * 0.38 + accretionRibbon * 0.52 + anamorphicFlare) * breath;
    float coreIntensity = (outerBand * (0.34 + 0.38 * microStreaks) + sharpRim * 0.72) * breath;

    // Attenuate slightly toward far left/edge so typography stays razor sharp
    float sweepFade = smoothstep(-0.95 * aspect, 0.55 * aspect, p.x * uDir);
    midIntensity *= (0.42 + 0.58 * sweepFade);
    coreIntensity *= (0.35 + 0.65 * sweepFade);

    vec3 colVoid = vec3(0.0196, 0.0196, 0.0216);      // #050505
    vec3 colSlate = vec3(0.1529, 0.1608, 0.1804);     // #27292E
    vec3 colSilver = vec3(0.6314, 0.6510, 0.6902);    // #A1A6B0
    vec3 colTitanium = vec3(0.8980, 0.9059, 0.9216);  // #E5E7EB

    vec3 color = colVoid;
    color = mix(color, colSlate, clamp(midIntensity * 0.95, 0.0, 1.0));
    color += colSilver * midIntensity * 0.42;
    color += colTitanium * coreIntensity * 0.52;

    // Apply monumental black event horizon shadow core (keeping subtle grazing flare in front)
    color = mix(colVoid, color, shadowMask);
    color += colTitanium * anamorphicFlare * 0.18;

    // Whisper-thin filmic anamorphic grain (~0.025) to prevent dark-display banding
    float grain = (hash21(uv * uResolution + fract(uTime * 17.3)) - 0.5) * 0.025;
    color = max(vec3(0.015), color + grain);

    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * Generates a soft monochrome radial glow sprite texture in memory for cosmic dust particles.
 */
function createDustTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const half = size / 2;
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.35, "rgba(229, 231, 235, 0.65)");
    grad.addColorStop(0.75, "rgba(161, 166, 176, 0.15)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Filmic monochrome Interstellar Gravitational Horizon (GLSL ShaderMaterial)
 * paired with drifting volumetric cosmic dust particles.
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
    const initialW = window.innerWidth;
    const initialH = window.innerHeight;
    const isMobile = initialW < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(initialW, initialH);
    renderer.setClearColor(0x050505, 1);
    renderer.autoClear = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];
    const dustTexture = createDustTexture();

    // Pass 1: Fullscreen GLSL Gravitational Horizon Shader Scene
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const shaderUniforms = {
      uTime: { value: 0 },
      uScroll: { value: scrollProgressRef.current },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(initialW, initialH) },
      uDir: { value: langDirRef.current },
      uAudio: { value: 0 },
    };

    const quadGeom = new THREE.PlaneGeometry(2, 2);
    const horizonMat = new THREE.ShaderMaterial({
      vertexShader: HORIZON_VERTEX_SHADER,
      fragmentShader: HORIZON_FRAGMENT_SHADER,
      uniforms: shaderUniforms,
      depthTest: false,
      depthWrite: false,
    });
    geometriesToDispose.push(quadGeom);
    materialsToDispose.push(horizonMat);
    bgScene.add(new THREE.Mesh(quadGeom, horizonMat));

    // Pass 2: Volumetric Drifting Deep-Space Titanium Dust
    const dustScene = new THREE.Scene();
    const dustCamera = new THREE.PerspectiveCamera(
      isMobile ? 50 : 42,
      initialW / Math.max(initialH, 1),
      0.1,
      80
    );
    dustCamera.position.set(0, 0, 12);

    const dustCount = isMobile ? 400 : 900;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustBasePositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustPhases = new Float32Array(dustCount);

    const cLight = new THREE.Color(0xe5e7eb);
    const cMid = new THREE.Color(0xa1a6b0);
    const cDark = new THREE.Color(0x525763);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 22 - 4;
      dustBasePositions[i3] = x;
      dustBasePositions[i3 + 1] = y;
      dustBasePositions[i3 + 2] = z;
      dustPositions[i3] = x;
      dustPositions[i3 + 1] = y;
      dustPositions[i3 + 2] = z;
      dustPhases[i] = Math.random() * Math.PI * 2;

      const paletteRoll = Math.random();
      const chosen =
        paletteRoll < 0.22 ? cLight : paletteRoll < 0.7 ? cMid : cDark;
      dustColors[i3] = chosen.r;
      dustColors[i3 + 1] = chosen.g;
      dustColors[i3 + 2] = chosen.b;
    }

    const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeom.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: isMobile ? 0.085 : 0.075,
      map: dustTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    geometriesToDispose.push(dustGeom);
    materialsToDispose.push(dustMat);
    const dustPoints = new THREE.Points(dustGeom, dustMat);
    dustScene.add(dustPoints);

    // Desktop fine pointer parallax
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
      dustCamera.aspect = w / Math.max(h, 1);
      dustCamera.fov = mobile ? 50 : 42;
      dustCamera.updateProjectionMatrix();
      shaderUniforms.uResolution.value.set(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let smoothedScroll = scrollProgressRef.current;
    let smoothedDir = langDirRef.current;
    let smoothedAudio = 0;
    let frameId = 0;
    let isVisible = !document.hidden;
    let contextLost = false;
    const clock = new THREE.Clock();

    const updateFrame = (_dt: number, elapsed: number) => {
      smoothedScroll = THREE.MathUtils.lerp(
        smoothedScroll,
        scrollProgressRef.current,
        0.08
      );
      scrollVelocityRef.current *= 0.92;
      smoothedDir = THREE.MathUtils.lerp(smoothedDir, langDirRef.current, 0.12);

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

      const audioTarget = isAudioPlayingRef?.current ? 1.0 : 0.0;
      smoothedAudio = THREE.MathUtils.lerp(smoothedAudio, audioTarget, 0.05);

      shaderUniforms.uTime.value = elapsed;
      shaderUniforms.uScroll.value = smoothedScroll;
      shaderUniforms.uPointer.value.set(currentPointer.x, -currentPointer.y);
      shaderUniforms.uDir.value = smoothedDir;
      shaderUniforms.uAudio.value = smoothedAudio;

      // Subtle volumetric dust drift & parallax
      const posAttr = dustGeom.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const driftTime = elapsed * 0.16;
      for (let i = 0; i < dustCount; i++) {
        const i3 = i * 3;
        const phase = dustPhases[i];
        arr[i3] = dustBasePositions[i3] + Math.sin(driftTime + phase) * 0.28;
        arr[i3 + 1] =
          dustBasePositions[i3 + 1] +
          Math.cos(driftTime * 0.8 + phase * 1.3) * 0.22 +
          smoothedScroll * 1.6;
        arr[i3 + 2] = dustBasePositions[i3 + 2];
      }
      posAttr.needsUpdate = true;

      dustCamera.position.x = currentPointer.x * 0.45 * smoothedDir;
      dustCamera.position.y = -currentPointer.y * 0.35;
      dustCamera.position.z = THREE.MathUtils.lerp(12, 9.6, smoothedScroll);
      dustCamera.lookAt(0, 0, -4);
    };

    const renderScene = () => {
      renderer.clear();
      renderer.render(bgScene, bgCamera);
      renderer.clearDepth();
      renderer.render(dustScene, dustCamera);
    };

    const stepFrame = () => {
      if (!isVisible || contextLost) return;
      frameId = window.requestAnimationFrame(stepFrame);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      updateFrame(dt, elapsed);
      renderScene();
    };

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
      clock.getDelta();
      if (isVisible && !prefersReducedMotion) {
        stepFrame();
      } else {
        renderScene();
      }
    };

    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      handleContextRestored
    );

    if (prefersReducedMotion) {
      updateFrame(0, 1.2);
      renderScene();
    } else if (isVisible) {
      stepFrame();
    }

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

      dustTexture.dispose();
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
            "radial-gradient(ellipse 76% 68% at 54% 44%, rgba(5,5,5,0) 32%, rgba(5,5,5,0.42) 74%, rgba(5,5,5,0.8) 100%)",
        }}
      />
    </>
  );
}
