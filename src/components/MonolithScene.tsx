import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Lang } from "../data/portfolioData";

interface MonolithSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
  scrollVelocityRef: React.MutableRefObject<number>;
  lang: Lang;
  wireframeMode: boolean;
}

/**
 * Generates a lightweight studio reflection environment map (obsidian void +
 * imperial crimson and brushed platinum studio panels) so physical surfaces
 * gleam with sharp chiaroscuro highlights without external HDR downloads.
 */
function createArchitecturalEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x050507);

  const softboxPlatinum = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 12),
    new THREE.MeshBasicMaterial({ color: 0x9ca3af, side: THREE.DoubleSide })
  );
  softboxPlatinum.position.set(-7, 5, 4);
  softboxPlatinum.lookAt(0, 0, 0);
  envScene.add(softboxPlatinum);

  const softboxCrimson = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 10),
    new THREE.MeshBasicMaterial({ color: 0xc81e32, side: THREE.DoubleSide })
  );
  softboxCrimson.position.set(7.5, 2.5, -3);
  softboxCrimson.lookAt(0, 0, 0);
  envScene.add(softboxCrimson);

  const rimStrip = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 2.2),
    new THREE.MeshBasicMaterial({ color: 0xe11d38, side: THREE.DoubleSide })
  );
  rimStrip.position.set(0, -6.5, 3);
  rimStrip.lookAt(0, 0, 0);
  envScene.add(rimStrip);

  const renderTarget = pmrem.fromScene(envScene, 0.035);
  softboxPlatinum.geometry.dispose();
  (softboxPlatinum.material as THREE.Material).dispose();
  softboxCrimson.geometry.dispose();
  (softboxCrimson.material as THREE.Material).dispose();
  rimStrip.geometry.dispose();
  (rimStrip.material as THREE.Material).dispose();
  pmrem.dispose();

  return renderTarget.texture;
}

/**
 * Full-viewport fixed WebGL canvas rendering an architectural obsidian
 * monolith with imperial crimson + brushed platinum orbital gimbal rings,
 * custom GLSL corona aura, live Obsidian/Wireframe switch, and scroll choreography.
 */
export function MonolithScene({
  scrollProgressRef,
  scrollVelocityRef,
  lang,
  wireframeMode,
}: MonolithSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const langDirRef = useRef<number>(lang === "ar" ? -1 : 1);
  const wireframeRef = useRef<boolean>(wireframeMode);
  const materialToggleRef = useRef<{
    outerMat: THREE.MeshPhysicalMaterial;
    edgeMat: THREE.LineBasicMaterial;
    renderNow: () => void;
  } | null>(null);

  useEffect(() => {
    langDirRef.current = lang === "ar" ? -1 : 1;
  }, [lang]);

  useEffect(() => {
    wireframeRef.current = wireframeMode;
    const handles = materialToggleRef.current;
    if (handles) {
      handles.outerMat.wireframe = wireframeMode;
      handles.edgeMat.opacity = wireframeMode ? 0.72 : 0.44;
      handles.renderNow();
    }
  }, [wireframeMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.058);

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 46 : 38,
      window.innerWidth / window.innerHeight,
      0.1,
      60
    );
    camera.position.set(0, 0, isMobile ? 7.6 : 6.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const maxDpr = isMobile ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.24;
    container.appendChild(renderer.domElement);

    const envMap = createArchitecturalEnvMap(renderer);
    scene.environment = envMap;

    const rig = new THREE.Group();
    scene.add(rig);

    // 1. Custom GLSL Volumetric Crimson & Platinum Corona Plane behind sculpture
    const coronaUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uVelocity: { value: 0 },
    };
    const coronaGeom = new THREE.PlaneGeometry(7.2, 7.2);
    const coronaMat = new THREE.ShaderMaterial({
      uniforms: coronaUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uScroll;
        uniform float uVelocity;
        void main() {
          vec2 p = (vUv - 0.5) * 2.0;
          float r = length(p);
          float angle = atan(p.y, p.x);
          float pulse = 0.5 + 0.5 * sin(uTime * 0.8 + uScroll * 6.2831);
          float rays = 0.5 + 0.5 * sin(angle * 6.0 + uTime * 0.35 + uScroll * 4.0);
          float ring = smoothstep(0.62, 0.24, abs(r - (0.34 + 0.04 * pulse)));
          float glow = exp(-r * 2.75) * (0.24 + 0.10 * pulse + 0.16 * uVelocity);
          float beam = ring * (0.07 + 0.06 * rays + 0.14 * uVelocity);
          vec3 crimson = vec3(0.784, 0.118, 0.196);
          vec3 platinum = vec3(0.945, 0.949, 0.957);
          vec3 col = mix(crimson, platinum, beam * 0.45);
          float alpha = clamp((glow + beam) * smoothstep(1.0, 0.15, r), 0.0, 0.48);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    const coronaPlane = new THREE.Mesh(coronaGeom, coronaMat);
    coronaPlane.position.z = -1.15;
    rig.add(coronaPlane);

    // 2. Sculpted Dual-Layer Obsidian & Imperial Crimson Core
    const coreGroup = new THREE.Group();
    rig.add(coreGroup);

    const outerCoreGeom = new THREE.OctahedronGeometry(1.36, 1);
    outerCoreGeom.scale(0.56, 1.32, 0.56);
    const outerObsidianMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#07070a"),
      metalness: 0.78,
      roughness: 0.24,
      clearcoat: 0.85,
      clearcoatRoughness: 0.16,
      reflectivity: 0.85,
      envMapIntensity: 0.95,
      flatShading: true,
      wireframe: wireframeRef.current,
    });
    const outerMonolith = new THREE.Mesh(outerCoreGeom, outerObsidianMat);
    coreGroup.add(outerMonolith);

    const innerCoreGeom = new THREE.OctahedronGeometry(0.74, 0);
    innerCoreGeom.scale(0.54, 1.3, 0.54);
    const innerCrimsonMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#C81E32"),
      metalness: 0.9,
      roughness: 0.24,
      clearcoat: 0.75,
      envMapIntensity: 1.8,
      emissive: new THREE.Color("#450811"),
      emissiveIntensity: 0.65,
      flatShading: true,
    });
    const innerCore = new THREE.Mesh(innerCoreGeom, innerCrimsonMat);
    coreGroup.add(innerCore);

    const edgeGeom = new THREE.EdgesGeometry(outerCoreGeom, 8);
    const edgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#E11D38"),
      transparent: true,
      opacity: wireframeRef.current ? 0.72 : 0.44,
    });
    const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
    edgeLines.scale.setScalar(1.006);
    coreGroup.add(edgeLines);

    const axisGeom = new THREE.CylinderGeometry(0.004, 0.004, 4.5, 8);
    const axisMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#E11D38"),
      transparent: true,
      opacity: 0.34,
    });
    const axisRod = new THREE.Mesh(axisGeom, axisMat);
    coreGroup.add(axisRod);

    // 3. Three-Axis Calibrated Crimson & Platinum Gimbal System
    const crimsonMetalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#E11D38"),
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.85,
      envMapIntensity: 1.8,
      transparent: true,
      opacity: 0.88,
    });
    const platinumHairlineMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#A1A1AA"),
      metalness: 0.86,
      roughness: 0.28,
      envMapIntensity: 1.4,
      transparent: true,
      opacity: 0.34,
    });

    const ringOuterGroup = new THREE.Group();
    const ringOuterGeom = new THREE.TorusGeometry(2.15, 0.011, 14, isMobile ? 72 : 128);
    const ringOuter = new THREE.Mesh(ringOuterGeom, crimsonMetalMat);
    ringOuterGroup.add(ringOuter);

    const tickCount = 36;
    const tickGeom = new THREE.BoxGeometry(0.014, 0.09, 0.014);
    const tickInstanced = new THREE.InstancedMesh(tickGeom, crimsonMetalMat, tickCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < tickCount; i++) {
      const a = (i / tickCount) * Math.PI * 2;
      const rad = 2.15;
      dummy.position.set(Math.cos(a) * rad, Math.sin(a) * rad, 0);
      dummy.rotation.set(0, 0, a - Math.PI / 2);
      dummy.scale.set(1, i % 3 === 0 ? 1.55 : 0.75, 1);
      dummy.updateMatrix();
      tickInstanced.setMatrixAt(i, dummy.matrix);
    }
    ringOuterGroup.add(tickInstanced);
    ringOuterGroup.rotation.set(Math.PI * 0.38, Math.PI * 0.14, 0);
    rig.add(ringOuterGroup);

    const ringMidGeom = new THREE.TorusGeometry(1.76, 0.007, 12, isMobile ? 72 : 120);
    const ringMid = new THREE.Mesh(ringMidGeom, platinumHairlineMat);
    ringMid.rotation.set(-Math.PI * 0.32, 0, Math.PI * 0.24);
    rig.add(ringMid);

    const ringInnerGeom = new THREE.TorusGeometry(2.58, 0.005, 10, isMobile ? 64 : 110);
    const ringInner = new THREE.Mesh(ringInnerGeom, platinumHairlineMat);
    ringInner.rotation.set(Math.PI * 0.18, -Math.PI * 0.4, 0);
    rig.add(ringInner);

    // 4. Orbiting Architectural Shards (InstancedMesh, 1 draw call)
    const shardCount = isMobile ? 12 : 20;
    const shardGeom = new THREE.OctahedronGeometry(0.065, 0);
    shardGeom.scale(0.65, 1.8, 0.65);
    const shardInstanced = new THREE.InstancedMesh(
      shardGeom,
      outerObsidianMat,
      shardCount
    );
    const shardData = Array.from({ length: shardCount }, (_, idx) => ({
      radius: 2.3 + (idx % 4) * 0.34,
      speed: 0.18 + (idx % 5) * 0.06,
      phase: (idx / shardCount) * Math.PI * 2,
      yOffset: ((idx % 7) - 3) * 0.42,
      scale: 0.75 + (idx % 3) * 0.35,
    }));
    rig.add(shardInstanced);

    // 5. Atmospheric Crimson Depth Particles
    const particleCount = isMobile ? 140 : 340;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2.2 + Math.random() * 6.4;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 11;
      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(theta) * radius - 1.5;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color("#E11D38"),
      size: isMobile ? 0.025 : 0.022,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 6. Chiaroscuro Studio Lighting
    const ambient = new THREE.AmbientLight(0x1b1b22, 1.45);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf1f2f4, 2.2);
    keyLight.position.set(-4.5, 5.5, 4.5);
    scene.add(keyLight);

    const crimsonRim = new THREE.DirectionalLight(0xe11d38, 3.8);
    crimsonRim.position.set(4.8, 2.0, -2.5);
    scene.add(crimsonRim);

    const underFill = new THREE.PointLight(0xc81e32, 2.4, 14);
    underFill.position.set(0, -3.5, 2.8);
    scene.add(underFill);

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
      camera.fov = mobile ? 46 : 38;
      camera.position.z = mobile ? 7.6 : 6.4;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    let smoothedScroll = scrollProgressRef.current;
    let smoothedVelocity = 0;
    let smoothedDir = langDirRef.current;
    let frameId = 0;
    let isVisible = !document.hidden;
    const clock = new THREE.Clock();

    const applyChoreography = (
      p: number,
      vel: number,
      elapsed: number,
      dirSign: number
    ) => {
      const mobile = window.innerWidth < 768;
      let targetX = mobile ? 0.0 : 2.28 * dirSign;
      let targetY = mobile ? 1.42 : 0.02;
      let targetZ = mobile ? -2.45 : -1.25;
      let rigScale = mobile ? 0.66 : 0.92;
      let ringSpread = mobile ? 1.18 : 1.08;

      if (p < 0.2) {
        const t = p / 0.2;
        targetX = THREE.MathUtils.lerp(
          mobile ? 0 : 2.28 * dirSign,
          mobile ? 0 : -1.65 * dirSign,
          t
        );
        targetY = THREE.MathUtils.lerp(mobile ? 1.42 : 0.02, 0.08, t);
        targetZ = THREE.MathUtils.lerp(mobile ? -2.45 : -1.25, -0.55, t);
        rigScale = THREE.MathUtils.lerp(mobile ? 0.66 : 0.92, mobile ? 0.84 : 1.0, t);
        ringSpread = THREE.MathUtils.lerp(mobile ? 1.18 : 1.08, 1.15, t);
      } else if (p < 0.5) {
        const t = (p - 0.2) / 0.3;
        targetX = THREE.MathUtils.lerp(
          mobile ? 0 : -1.65 * dirSign,
          mobile ? 0 : -1.35 * dirSign,
          t
        );
        targetY = THREE.MathUtils.lerp(0.08, -0.04, t);
        targetZ = THREE.MathUtils.lerp(-0.55, -0.45, t);
        rigScale = mobile ? 0.84 : 1.0;
        ringSpread = THREE.MathUtils.lerp(1.15, 1.06, t);
      } else if (p < 0.82) {
        const t = (p - 0.5) / 0.32;
        targetX = THREE.MathUtils.lerp(mobile ? 0 : -1.35 * dirSign, 0, t);
        targetY = THREE.MathUtils.lerp(-0.04, 0.2, t);
        targetZ = THREE.MathUtils.lerp(-0.45, -1.75, t);
        rigScale = THREE.MathUtils.lerp(mobile ? 0.84 : 1.0, mobile ? 0.95 : 1.16, t);
        ringSpread = THREE.MathUtils.lerp(1.06, 1.32, t);
      } else {
        const t = (p - 0.82) / 0.18;
        targetX = THREE.MathUtils.lerp(0, mobile ? 0 : 1.45 * dirSign, t);
        targetY = THREE.MathUtils.lerp(0.2, -0.02, t);
        targetZ = THREE.MathUtils.lerp(-1.75, -0.45, t);
        rigScale = THREE.MathUtils.lerp(mobile ? 0.95 : 1.16, mobile ? 0.88 : 1.0, t);
        ringSpread = THREE.MathUtils.lerp(1.32, 1.02, t);
      }

      rig.position.x = targetX + currentPointer.x * 0.22;
      rig.position.y = targetY - currentPointer.y * 0.16;
      rig.position.z = targetZ;
      rig.scale.setScalar(rigScale);

      const baseFov = mobile ? 46 : 38;
      const targetFov = baseFov + Math.min(vel * 3.8, 4.5);
      if (Math.abs(camera.fov - targetFov) > 0.02) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
      camera.lookAt(currentPointer.x * 0.12, -currentPointer.y * 0.08, 0);

      const velocityBoost = vel * 0.45;
      outerMonolith.rotation.y = p * Math.PI * 2.8 + elapsed * 0.14 + velocityBoost;
      outerMonolith.rotation.x =
        Math.sin(p * Math.PI * 2.2) * 0.18 + currentPointer.y * 0.12;
      outerMonolith.rotation.z = Math.cos(p * Math.PI * 1.4) * 0.09;

      edgeLines.rotation.copy(outerMonolith.rotation);

      innerCore.rotation.y = -(p * Math.PI * 3.6 + elapsed * 0.24 + velocityBoost * 1.4);
      innerCore.rotation.x = Math.cos(p * Math.PI * 2.0) * 0.22;
      innerCrimsonMat.emissiveIntensity = 0.62 + Math.min(vel * 0.95, 0.9);

      ringOuterGroup.scale.setScalar(ringSpread);
      ringOuterGroup.rotation.z = elapsed * 0.18 + p * Math.PI * 1.6 + velocityBoost * 0.6;
      ringOuterGroup.rotation.y = Math.PI * 0.14 + p * 1.15;

      ringMid.scale.setScalar(ringSpread * (1.0 + Math.sin(elapsed * 0.6) * 0.015));
      ringMid.rotation.y = -elapsed * 0.14 - p * Math.PI * 1.3;
      ringMid.rotation.x = -Math.PI * 0.32 + Math.sin(p * Math.PI) * 0.35;

      ringInner.scale.setScalar(ringSpread * 1.04);
      ringInner.rotation.z = -elapsed * 0.09 + p * Math.PI * 0.9;
      ringInner.rotation.x = Math.PI * 0.18 + Math.cos(p * Math.PI) * 0.25;

      for (let i = 0; i < shardCount; i++) {
        const s = shardData[i];
        const angle = s.phase + elapsed * s.speed + p * Math.PI * 2.2;
        const rad = s.radius * ringSpread;
        dummy.position.set(
          Math.cos(angle) * rad,
          s.yOffset + Math.sin(angle * 2 + elapsed) * 0.16,
          Math.sin(angle) * rad * 0.72
        );
        dummy.rotation.set(angle * 0.7, angle * 1.3, 0);
        dummy.scale.setScalar(s.scale);
        dummy.updateMatrix();
        shardInstanced.setMatrixAt(i, dummy.matrix);
      }
      shardInstanced.instanceMatrix.needsUpdate = true;

      coronaUniforms.uTime.value = elapsed;
      coronaUniforms.uScroll.value = p;
      coronaUniforms.uVelocity.value = Math.min(vel, 1.2);

      particles.rotation.y = elapsed * 0.03 + p * 0.85;
      particles.position.y = -p * 1.6;
    };

    materialToggleRef.current = {
      outerMat: outerObsidianMat,
      edgeMat,
      renderNow: () => renderer.render(scene, camera),
    };

    const stepFrame = () => {
      if (!isVisible) return;
      frameId = window.requestAnimationFrame(stepFrame);
      const elapsed = clock.getElapsedTime();
      smoothedScroll = THREE.MathUtils.lerp(
        smoothedScroll,
        scrollProgressRef.current,
        0.1
      );
      const absVel = Math.abs(scrollVelocityRef.current);
      smoothedVelocity = THREE.MathUtils.lerp(
        smoothedVelocity,
        Math.min(absVel * 0.035, 1.2),
        0.08
      );
      scrollVelocityRef.current *= 0.9;
      smoothedDir = THREE.MathUtils.lerp(smoothedDir, langDirRef.current, 0.28);
      currentPointer.x = THREE.MathUtils.lerp(
        currentPointer.x,
        targetPointer.x,
        0.06
      );
      currentPointer.y = THREE.MathUtils.lerp(
        currentPointer.y,
        targetPointer.y,
        0.06
      );
      applyChoreography(smoothedScroll, smoothedVelocity, elapsed, smoothedDir);
      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      applyChoreography(0.06, 0, 0, langDirRef.current);
      renderer.render(scene, camera);
    } else {
      stepFrame();
    }

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        clock.getDelta();
        stepFrame();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      materialToggleRef.current = null;
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (hasFinePointer) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      envMap.dispose();
      coronaGeom.dispose();
      coronaMat.dispose();
      outerCoreGeom.dispose();
      outerObsidianMat.dispose();
      innerCoreGeom.dispose();
      innerCrimsonMat.dispose();
      edgeGeom.dispose();
      edgeMat.dispose();
      axisGeom.dispose();
      axisMat.dispose();
      ringOuterGeom.dispose();
      ringMidGeom.dispose();
      ringInnerGeom.dispose();
      tickGeom.dispose();
      tickInstanced.dispose();
      crimsonMetalMat.dispose();
      platinumHairlineMat.dispose();
      shardGeom.dispose();
      shardInstanced.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgressRef, scrollVelocityRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-100"
    />
  );
}
