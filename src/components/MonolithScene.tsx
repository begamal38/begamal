import { useEffect, useRef } from "react";
import * as THREE from "three";

interface MonolithSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

/**
 * Full-viewport fixed WebGL canvas rendering a faceted obsidian monolith,
 * brushed champagne-gold orbital rings, and subtle atmospheric depth particles
 * choreographed smoothly to document scroll progress (0 -> 1).
 */
export function MonolithScene({ scrollProgressRef }: MonolithSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.085);

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 44 : 38,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, isMobile ? 7.2 : 6.2);

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
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Master group for scroll choreography
    const rig = new THREE.Group();
    scene.add(rig);

    // 1. Faceted Dark Obsidian Monolith (architectural stretched octa-prism)
    const monolithGroup = new THREE.Group();
    rig.add(monolithGroup);

    const coreGeom = new THREE.OctahedronGeometry(1.38, 0);
    coreGeom.scale(0.62, 1.58, 0.62);

    const obsidianMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0b0b0e"),
      metalness: 0.86,
      roughness: 0.22,
      flatShading: true,
    });
    const monolithMesh = new THREE.Mesh(coreGeom, obsidianMat);
    monolithGroup.add(monolithMesh);

    // Subtle champagne-gold chamfered edge wireframe
    const edgeGeom = new THREE.EdgesGeometry(coreGeom, 12);
    const edgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#C5A572"),
      transparent: true,
      opacity: 0.34,
    });
    const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
    edgeLines.scale.setScalar(1.003);
    monolithGroup.add(edgeLines);

    // Inner vertical architectural axis line
    const axisGeom = new THREE.CylinderGeometry(0.004, 0.004, 4.4, 8);
    const axisMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#C5A572"),
      transparent: true,
      opacity: 0.22,
    });
    const axisRod = new THREE.Mesh(axisGeom, axisMat);
    monolithGroup.add(axisRod);

    // 2. Precision Orbital Rings (champagne gold hairlines)
    const ringMatPrimary = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C5A572"),
      metalness: 0.92,
      roughness: 0.26,
      transparent: true,
      opacity: 0.65,
    });
    const ringMatSecondary = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F2F0EB"),
      metalness: 0.8,
      roughness: 0.35,
      transparent: true,
      opacity: 0.22,
    });

    const ringPrimaryGeom = new THREE.TorusGeometry(
      1.95,
      0.008,
      12,
      isMobile ? 72 : 120
    );
    const ringPrimary = new THREE.Mesh(ringPrimaryGeom, ringMatPrimary);
    ringPrimary.rotation.x = Math.PI * 0.38;
    ringPrimary.rotation.y = Math.PI * 0.14;
    rig.add(ringPrimary);

    const ringSecondaryGeom = new THREE.TorusGeometry(
      2.42,
      0.005,
      10,
      isMobile ? 72 : 120
    );
    const ringSecondary = new THREE.Mesh(ringSecondaryGeom, ringMatSecondary);
    ringSecondary.rotation.x = -Math.PI * 0.32;
    ringSecondary.rotation.z = Math.PI * 0.22;
    rig.add(ringSecondary);

    // 3. Atmospheric Depth Particles (single draw call)
    const particleCount = isMobile ? 140 : 340;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2.4 + Math.random() * 5.8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 9.5;
      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(theta) * radius - 1.5;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color("#C5A572"),
      size: isMobile ? 0.024 : 0.02,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 4. Chiaroscuro Studio Lighting
    const ambient = new THREE.AmbientLight(0x16161a, 1.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf2f0eb, 2.2);
    keyLight.position.set(-4.5, 5.5, 4.0);
    scene.add(keyLight);

    const goldRim = new THREE.DirectionalLight(0xc5a572, 3.2);
    goldRim.position.set(4.5, 1.8, -2.5);
    scene.add(goldRim);

    const underFill = new THREE.PointLight(0xc5a572, 1.8, 12);
    underFill.position.set(0, -3.5, 2.5);
    scene.add(underFill);

    // Pointer parallax state (desktop fine pointer only)
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
      camera.fov = mobile ? 44 : 38;
      camera.position.z = mobile ? 7.2 : 6.2;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Smoothly interpolated choreography helper
    let smoothedScroll = scrollProgressRef.current;
    let frameId = 0;
    let isVisible = !document.hidden;
    const clock = new THREE.Clock();

    const applyChoreography = (p: number, elapsed: number) => {
      const mobile = window.innerWidth < 768;
      // Lateral balance across sections so typography stays clear
      let targetX = mobile ? 0.0 : 1.35;
      let targetY = mobile ? 0.35 : 0.05;
      let targetZ = mobile ? -1.1 : -0.2;
      let ringSpread = 1.0;

      if (p < 0.22) {
        // Hero -> Statement transition
        const t = p / 0.22;
        targetX = THREE.MathUtils.lerp(mobile ? 0 : 1.35, mobile ? 0 : -1.55, t);
        targetY = THREE.MathUtils.lerp(mobile ? 0.35 : 0.05, 0.1, t);
        targetZ = THREE.MathUtils.lerp(mobile ? -1.1 : -0.2, -0.8, t);
        ringSpread = THREE.MathUtils.lerp(1.0, 1.12, t);
      } else if (p < 0.55) {
        // Statement -> Chronicle
        const t = (p - 0.22) / 0.33;
        targetX = THREE.MathUtils.lerp(mobile ? 0 : -1.55, mobile ? 0 : -1.45, t);
        targetY = THREE.MathUtils.lerp(0.1, -0.05, t);
        targetZ = THREE.MathUtils.lerp(-0.8, -0.5, t);
        ringSpread = THREE.MathUtils.lerp(1.12, 1.04, t);
      } else if (p < 0.85) {
        // Chronicle -> Selected Works (recede for clean bento contrast)
        const t = (p - 0.55) / 0.3;
        targetX = THREE.MathUtils.lerp(mobile ? 0 : -1.45, 0, t);
        targetY = THREE.MathUtils.lerp(-0.05, 0.15, t);
        targetZ = THREE.MathUtils.lerp(-0.5, -2.1, t);
        ringSpread = THREE.MathUtils.lerp(1.04, 1.24, t);
      } else {
        // Works -> AI Systems & Closing equilibrium
        const t = (p - 0.85) / 0.15;
        targetX = THREE.MathUtils.lerp(0, mobile ? 0 : 1.15, t);
        targetY = THREE.MathUtils.lerp(0.15, 0, t);
        targetZ = THREE.MathUtils.lerp(-2.1, -0.45, t);
        ringSpread = THREE.MathUtils.lerp(1.24, 1.0, t);
      }

      rig.position.x = targetX + currentPointer.x * 0.18;
      rig.position.y = targetY - currentPointer.y * 0.14;
      rig.position.z = targetZ;

      monolithGroup.rotation.y = p * Math.PI * 2.4 + elapsed * 0.11;
      monolithGroup.rotation.x = Math.sin(p * Math.PI * 2) * 0.14 + currentPointer.y * 0.08;
      monolithGroup.rotation.z = Math.cos(p * Math.PI) * 0.08;

      ringPrimary.scale.setScalar(ringSpread);
      ringPrimary.rotation.z = elapsed * 0.16 + p * Math.PI * 1.4;
      ringPrimary.rotation.y = Math.PI * 0.14 + p * 0.9;

      ringSecondary.scale.setScalar(ringSpread * 1.02);
      ringSecondary.rotation.y = -elapsed * 0.11 - p * Math.PI;

      particles.rotation.y = elapsed * 0.025 + p * 0.6;
      particles.position.y = -p * 1.2;
    };

    if (prefersReducedMotion) {
      applyChoreography(0.06, 0);
      renderer.render(scene, camera);
    } else {
      const renderLoop = () => {
        if (!isVisible) return;
        frameId = window.requestAnimationFrame(renderLoop);
        const elapsed = clock.getElapsedTime();
        smoothedScroll = THREE.MathUtils.lerp(
          smoothedScroll,
          scrollProgressRef.current,
          0.09
        );
        currentPointer.x = THREE.MathUtils.lerp(
          currentPointer.x,
          targetPointer.x,
          0.05
        );
        currentPointer.y = THREE.MathUtils.lerp(
          currentPointer.y,
          targetPointer.y,
          0.05
        );
        applyChoreography(smoothedScroll, elapsed);
        renderer.render(scene, camera);
      };
      renderLoop();
    }

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        clock.getDelta();
        frameId = window.requestAnimationFrame(function tick() {
          if (!isVisible) return;
          frameId = window.requestAnimationFrame(tick);
          const elapsed = clock.getElapsedTime();
          smoothedScroll = THREE.MathUtils.lerp(
            smoothedScroll,
            scrollProgressRef.current,
            0.09
          );
          currentPointer.x = THREE.MathUtils.lerp(
            currentPointer.x,
            targetPointer.x,
            0.05
          );
          currentPointer.y = THREE.MathUtils.lerp(
            currentPointer.y,
            targetPointer.y,
            0.05
          );
          applyChoreography(smoothedScroll, elapsed);
          renderer.render(scene, camera);
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (hasFinePointer) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      coreGeom.dispose();
      obsidianMat.dispose();
      edgeGeom.dispose();
      edgeMat.dispose();
      axisGeom.dispose();
      axisMat.dispose();
      ringPrimaryGeom.dispose();
      ringMatPrimary.dispose();
      ringSecondaryGeom.dispose();
      ringMatSecondary.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgressRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-95"
    />
  );
}
