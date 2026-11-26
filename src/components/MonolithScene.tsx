import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Lang } from "../data/portfolioData";

interface MonolithSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
  scrollVelocityRef: React.MutableRefObject<number>;
  lang: Lang;
}

/**
 * Generates an Obsidian & Cold Brushed Titanium chiaroscuro studio reflection
 * environment with a subtle warm burnished mineral copper bounce strip.
 */
function createCrystalEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x161b26);

  const softboxCool = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 13),
    new THREE.MeshBasicMaterial({ color: 0x7b859a, side: THREE.DoubleSide })
  );
  softboxCool.position.set(-7, 5, 4);
  softboxCool.lookAt(0, 0, 0);
  envScene.add(softboxCool);

  const softboxTitanium = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 11),
    new THREE.MeshBasicMaterial({ color: 0xf2f4f8, side: THREE.DoubleSide })
  );
  softboxTitanium.position.set(7.5, 2.5, -3);
  softboxTitanium.lookAt(0, 0, 0);
  envScene.add(softboxTitanium);

  const rimStripSilver = new THREE.Mesh(
    new THREE.PlaneGeometry(13, 2.8),
    new THREE.MeshBasicMaterial({ color: 0xc7cdd8, side: THREE.DoubleSide })
  );
  rimStripSilver.position.set(0, -6.5, 3);
  rimStripSilver.lookAt(0, 0, 0);
  envScene.add(rimStripSilver);

  // Subtle raw burnished copper mineral reflection bounce (never UI red)
  const copperBounce = new THREE.Mesh(
    new THREE.PlaneGeometry(8.0, 3.4),
    new THREE.MeshBasicMaterial({ color: 0xb67a48, side: THREE.DoubleSide })
  );
  copperBounce.position.set(4.5, -5.2, -4.5);
  copperBounce.lookAt(0, 0, 0);
  envScene.add(copperBounce);

  const renderTarget = pmrem.fromScene(envScene, 0.035);
  softboxCool.geometry.dispose();
  (softboxCool.material as THREE.Material).dispose();
  softboxTitanium.geometry.dispose();
  (softboxTitanium.material as THREE.Material).dispose();
  rimStripSilver.geometry.dispose();
  (rimStripSilver.material as THREE.Material).dispose();
  copperBounce.geometry.dispose();
  (copperBounce.material as THREE.Material).dispose();
  pmrem.dispose();

  return renderTarget.texture;
}

/**
 * Builds 13 Fruit-of-Life nodes and Metatron's Cube 3D projection chord lines
 * with staggered Z-depth for higher-dimensional spatial parallax.
 */
function buildMetatronGeometry() {
  const nodes: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];
  const rInner = 0.98;
  const rOuter = 1.94;

  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    nodes.push(
      new THREE.Vector3(
        Math.cos(a) * rInner,
        Math.sin(a) * rInner,
        i % 2 === 0 ? 0.24 : -0.24
      )
    );
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    nodes.push(
      new THREE.Vector3(
        Math.cos(a) * rOuter,
        Math.sin(a) * rOuter,
        i % 2 === 0 ? -0.34 : 0.34
      )
    );
  }

  const lineCoords: number[] = [];
  const pushEdge = (i: number, j: number) => {
    const a = nodes[i];
    const b = nodes[j];
    lineCoords.push(a.x, a.y, a.z, b.x, b.y, b.z);
  };

  // Radial axes + inner hexagon + outer hexagon + nested triangles (Metatron net)
  for (let i = 1; i <= 6; i++) {
    pushEdge(0, i);
    pushEdge(i, i + 6);
    const nextInner = (i % 6) + 1;
    pushEdge(i, nextInner);
    pushEdge(i + 6, (i % 6) + 7);
    // Star polygons across inner and outer hex rings
    const step2Inner = ((i + 1) % 6) + 1;
    const step2Outer = ((i + 1) % 6) + 7;
    pushEdge(i, step2Inner);
    pushEdge(i + 6, step2Outer);
    // Cross-tier harmonic chords
    pushEdge(i, ((i % 6) + 7));
    pushEdge(i, (((i + 4) % 6) + 7));
  }

  const lineGeom = new THREE.BufferGeometry();
  lineGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(lineCoords, 3)
  );
  return { nodes, lineGeom };
}

/**
 * Fixed WebGL cosmic obsidian-quartz monolith with interlocked counter-rotating
 * star-tetrahedron core, 3D Metatron geometry cage, and cold titanium + whisper
 * mineral copper orbital rings.
 */
export function MonolithScene({
  scrollProgressRef,
  scrollVelocityRef,
  lang,
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
    scene.fog = new THREE.FogExp2(0x0a0b0e, 0.042);

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
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    const envMap = createCrystalEnvMap(renderer);
    scene.environment = envMap;

    const rig = new THREE.Group();
    scene.add(rig);

    // 1. Concentric Six-Fold Harmonic Corona & Seed-of-Life Field
    const coronaUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uVelocity: { value: 0 },
    };
    const coronaGeom = new THREE.PlaneGeometry(7.8, 7.8);
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
          float pulse = 0.5 + 0.5 * sin(uTime * 0.65 + uScroll * 6.2831);
          float hexHarmonic = 0.5 + 0.5 * cos(angle * 6.0 - uTime * 0.25 + uScroll * 4.0);
          float ring1 = smoothstep(0.055, 0.008, abs(r - (0.31 + 0.02 * pulse)));
          float ring2 = smoothstep(0.045, 0.006, abs(r - (0.58 - 0.02 * pulse)));
          float glow = exp(-r * 2.25) * (0.22 + 0.08 * pulse + 0.18 * uVelocity);
          float harmonics = (ring1 + ring2 * 0.78) * (0.08 + 0.06 * hexHarmonic + 0.10 * uVelocity);
          vec3 titanium = vec3(0.898, 0.914, 0.945);
          vec3 mineralCopper = vec3(0.820, 0.545, 0.285);
          vec3 col = mix(titanium, mineralCopper, smoothstep(0.48, 0.10, r) * 0.18);
          float alpha = clamp((glow + harmonics) * smoothstep(1.0, 0.10, r), 0.0, 0.52);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    const coronaPlane = new THREE.Mesh(coronaGeom, coronaMat);
    coronaPlane.position.z = -1.25;
    rig.add(coronaPlane);

    // 2. Luminous Smoky Quartz Crystal Monolith (IOR 1.544) & Interlocked Merkaba Core
    const coreGroup = new THREE.Group();
    rig.add(coreGroup);

    const outerCoreGeom = new THREE.OctahedronGeometry(1.36, 1);
    outerCoreGeom.scale(0.56, 1.36, 0.56);
    const outerQuartzMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#cfd6e6"),
      metalness: 0.18,
      roughness: 0.09,
      transmission: isMobile ? 0.62 : 0.84,
      thickness: 1.45,
      ior: 1.544,
      attenuationColor: new THREE.Color("#646c7d"),
      attenuationDistance: 3.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.96,
      envMapIntensity: 2.1,
      flatShading: true,
    });
    const outerMonolith = new THREE.Mesh(outerCoreGeom, outerQuartzMat);
    coreGroup.add(outerMonolith);

    const outerEdgeGeom = new THREE.EdgesGeometry(outerCoreGeom, 8);
    const outerEdgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#E8ECF5"),
      transparent: true,
      opacity: 0.52,
    });
    const outerEdges = new THREE.LineSegments(outerEdgeGeom, outerEdgeMat);
    outerEdges.scale.setScalar(1.006);
    coreGroup.add(outerEdges);

    // Interlocked Dual Tetrahedron (Star Tetrahedron) Core inside Quartz
    const innerMerkabaGroup = new THREE.Group();
    coreGroup.add(innerMerkabaGroup);

    const tetraGeom = new THREE.TetrahedronGeometry(0.68, 0);
    tetraGeom.scale(0.88, 1.24, 0.88);
    const innerTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#CBD2DE"),
      metalness: 0.92,
      roughness: 0.16,
      clearcoat: 0.9,
      envMapIntensity: 2.0,
      emissive: new THREE.Color("#4d3524"),
      emissiveIntensity: 0.58,
      flatShading: true,
    });

    const tetraUp = new THREE.Mesh(tetraGeom, innerTitaniumMat);
    const tetraDown = new THREE.Mesh(tetraGeom, innerTitaniumMat);
    tetraDown.rotation.set(Math.PI, Math.PI / 3, 0);
    innerMerkabaGroup.add(tetraUp, tetraDown);

    const tetraEdgeGeom = new THREE.EdgesGeometry(tetraGeom, 1);
    const tetraCopperEdgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#D48C54"),
      transparent: true,
      opacity: 0.78,
    });
    const tetraEdgeUp = new THREE.LineSegments(tetraEdgeGeom, tetraCopperEdgeMat);
    tetraEdgeUp.scale.setScalar(1.015);
    const tetraEdgeDown = new THREE.LineSegments(tetraEdgeGeom, tetraCopperEdgeMat);
    tetraEdgeDown.rotation.copy(tetraDown.rotation);
    tetraEdgeDown.scale.setScalar(1.015);
    innerMerkabaGroup.add(tetraEdgeUp, tetraEdgeDown);

    const axisGeom = new THREE.CylinderGeometry(0.004, 0.004, 4.6, 8);
    const axisMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#E8ECF5"),
      transparent: true,
      opacity: 0.34,
    });
    const axisRod = new THREE.Mesh(axisGeom, axisMat);
    coreGroup.add(axisRod);

    // 3. 3D Metatron's Cube Polyhedral Cage & 13 Constellation Nodes
    const metatronGroup = new THREE.Group();
    const { nodes: metatronNodes, lineGeom: metatronLineGeom } =
      buildMetatronGeometry();
    const metatronLineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#E2E6EF"),
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
    });
    const metatronLines = new THREE.LineSegments(
      metatronLineGeom,
      metatronLineMat
    );
    metatronGroup.add(metatronLines);

    const nodeGeom = new THREE.SphereGeometry(0.026, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nodeInstanced = new THREE.InstancedMesh(
      nodeGeom,
      nodeMat,
      metatronNodes.length
    );
    const nodeDummy = new THREE.Object3D();
    const titaniumNodeCol = new THREE.Color("#D4D7DD");
    const copperNodeCol = new THREE.Color("#B87333");
    metatronNodes.forEach((pt, idx) => {
      nodeDummy.position.copy(pt);
      nodeDummy.scale.setScalar(idx === 0 ? 1.45 : idx <= 6 ? 1.1 : 0.88);
      nodeDummy.updateMatrix();
      nodeInstanced.setMatrixAt(idx, nodeDummy.matrix);
      nodeInstanced.setColorAt(
        idx,
        idx <= 6 ? copperNodeCol : titaniumNodeCol
      );
    });
    nodeInstanced.instanceMatrix.needsUpdate = true;
    if (nodeInstanced.instanceColor) nodeInstanced.instanceColor.needsUpdate = true;
    metatronGroup.add(nodeInstanced);
    metatronGroup.rotation.set(0.18, -0.22, 0.08);
    rig.add(metatronGroup);

    // 4. Orbital Celestial Rings (Cold Titanium + Cool Silver + Trace Burnished Copper)
    const titaniumRingMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#E8ECF5"),
      metalness: 0.9,
      roughness: 0.16,
      clearcoat: 0.9,
      envMapIntensity: 1.9,
      transparent: true,
      opacity: 0.84,
    });
    const silverHairlineMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#BCC4D0"),
      metalness: 0.86,
      roughness: 0.22,
      envMapIntensity: 1.6,
      transparent: true,
      opacity: 0.4,
    });
    const copperMeridianMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#C9834E"),
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.7,
      transparent: true,
      opacity: 0.48,
    });

    const ringOuterGroup = new THREE.Group();
    const ringOuterGeom = new THREE.TorusGeometry(
      2.22,
      0.009,
      14,
      isMobile ? 72 : 128
    );
    const ringOuter = new THREE.Mesh(ringOuterGeom, titaniumRingMat);
    ringOuterGroup.add(ringOuter);

    const tickCount = 36;
    const tickGeom = new THREE.BoxGeometry(0.012, 0.082, 0.012);
    const tickInstanced = new THREE.InstancedMesh(
      tickGeom,
      titaniumRingMat,
      tickCount
    );
    const dummy = new THREE.Object3D();
    for (let i = 0; i < tickCount; i++) {
      const a = (i / tickCount) * Math.PI * 2;
      const rad = 2.22;
      dummy.position.set(Math.cos(a) * rad, Math.sin(a) * rad, 0);
      dummy.rotation.set(0, 0, a - Math.PI / 2);
      dummy.scale.set(1, i % 3 === 0 ? 1.5 : 0.75, 1);
      dummy.updateMatrix();
      tickInstanced.setMatrixAt(i, dummy.matrix);
    }
    ringOuterGroup.add(tickInstanced);
    ringOuterGroup.rotation.set(Math.PI * 0.38, Math.PI * 0.14, 0);
    rig.add(ringOuterGroup);

    const ringMidGeom = new THREE.TorusGeometry(
      1.78,
      0.007,
      12,
      isMobile ? 72 : 120
    );
    const ringMid = new THREE.Mesh(ringMidGeom, copperMeridianMat);
    ringMid.rotation.set(-Math.PI * 0.32, 0, Math.PI * 0.24);
    rig.add(ringMid);

    const ringInnerGeom = new THREE.TorusGeometry(
      2.64,
      0.005,
      10,
      isMobile ? 64 : 110
    );
    const ringInner = new THREE.Mesh(ringInnerGeom, silverHairlineMat);
    ringInner.rotation.set(Math.PI * 0.18, -Math.PI * 0.4, 0);
    rig.add(ringInner);

    // 5. Orbiting Faceted Obsidian Quartz Shards (InstancedMesh, 1 draw call)
    const shardCount = isMobile ? 10 : 18;
    const shardGeom = new THREE.OctahedronGeometry(0.062, 0);
    shardGeom.scale(0.62, 1.85, 0.62);
    const shardObsidianMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#252b38"),
      metalness: 0.76,
      roughness: 0.18,
      clearcoat: 0.92,
      envMapIntensity: 1.55,
      flatShading: true,
    });
    const shardInstanced = new THREE.InstancedMesh(
      shardGeom,
      shardObsidianMat,
      shardCount
    );
    const shardData = Array.from({ length: shardCount }, (_, idx) => ({
      radius: 2.36 + (idx % 4) * 0.34,
      speed: 0.17 + (idx % 5) * 0.055,
      phase: (idx / shardCount) * Math.PI * 2,
      yOffset: ((idx % 7) - 3) * 0.42,
      scale: 0.75 + (idx % 3) * 0.35,
    }));
    rig.add(shardInstanced);

    // 6. Multidimensional Cosmic Depth Field (Silver + Subtle Copper-Star Sparks)
    const particleCount = isMobile ? 150 : 340;
    const positions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const cSilver = new THREE.Color("#D4D7DD");
    const cCopperHint = new THREE.Color("#C48A5A");
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2.0 + Math.random() * 8.2;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 12;
      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(theta) * radius - 2.2;
      const col = i % 7 === 0 ? cCopperHint : cSilver;
      pColors[i3] = col.r;
      pColors[i3 + 1] = col.g;
      pColors[i3 + 2] = col.b;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeom.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.024 : 0.021,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 7. Chiaroscuro Studio Lighting (Luminous Titanium Dominant + Trace Copper Fill)
    const ambient = new THREE.AmbientLight(0x2b3242, 1.95);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.75);
    keyLight.position.set(-4.5, 5.5, 4.5);
    scene.add(keyLight);

    const titaniumRim = new THREE.DirectionalLight(0xe5e8f0, 3.8);
    titaniumRim.position.set(4.8, 2.0, -2.5);
    scene.add(titaniumRim);

    const copperFill = new THREE.PointLight(0xd98c4a, 1.4, 14);
    copperFill.position.set(3.2, -3.6, 2.2);
    scene.add(copperFill);

    const silverUnderFill = new THREE.PointLight(0xbec6d4, 1.85, 15);
    silverUnderFill.position.set(-2.4, -3.2, 2.8);
    scene.add(silverUnderFill);

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
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
      );
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
      let targetX = mobile ? 0.0 : 2.42 * dirSign;
      let targetY = mobile ? 1.42 : 0.02;
      let targetZ = mobile ? -2.45 : -1.48;
      let rigScale = mobile ? 0.66 : 0.92;
      let ringSpread = mobile ? 1.18 : 1.08;

      if (p < 0.2) {
        const t = p / 0.2;
        targetX = THREE.MathUtils.lerp(
          mobile ? 0 : 2.42 * dirSign,
          mobile ? 0 : -1.65 * dirSign,
          t
        );
        targetY = THREE.MathUtils.lerp(mobile ? 1.42 : 0.02, 0.08, t);
        targetZ = THREE.MathUtils.lerp(mobile ? -2.45 : -1.48, -0.55, t);
        rigScale = THREE.MathUtils.lerp(
          mobile ? 0.66 : 0.92,
          mobile ? 0.84 : 1.0,
          t
        );
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
        rigScale = mobile ? 0.95 : 1.16;
        ringSpread = THREE.MathUtils.lerp(1.06, 1.32, t);
      } else {
        const t = (p - 0.82) / 0.18;
        targetX = THREE.MathUtils.lerp(0, mobile ? 0 : 1.45 * dirSign, t);
        targetY = THREE.MathUtils.lerp(0.2, -0.02, t);
        targetZ = THREE.MathUtils.lerp(-1.75, -0.45, t);
        rigScale = mobile ? 0.88 : 1.0;
        ringSpread = THREE.MathUtils.lerp(1.32, 1.02, t);
      }

      rig.position.x = targetX + currentPointer.x * 0.2;
      rig.position.y = targetY - currentPointer.y * 0.14;
      rig.position.z = targetZ;
      rig.scale.setScalar(rigScale);

      const baseFov = mobile ? 46 : 38;
      const targetFov = baseFov + Math.min(vel * 3.6, 4.2);
      if (Math.abs(camera.fov - targetFov) > 0.02) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
      camera.lookAt(currentPointer.x * 0.12, -currentPointer.y * 0.08, 0);

      const velocityBoost = vel * 0.45;
      outerMonolith.rotation.y =
        p * Math.PI * 2.8 + elapsed * 0.14 + velocityBoost;
      outerMonolith.rotation.x =
        Math.sin(p * Math.PI * 2.2) * 0.18 + currentPointer.y * 0.12;
      outerMonolith.rotation.z = Math.cos(p * Math.PI * 1.4) * 0.09;

      outerEdges.rotation.copy(outerMonolith.rotation);

      innerMerkabaGroup.rotation.y = -(
        p * Math.PI * 3.8 +
        elapsed * 0.26 +
        velocityBoost * 1.4
      );
      innerMerkabaGroup.rotation.x = Math.cos(p * Math.PI * 2.0) * 0.24;
      innerMerkabaGroup.rotation.z = Math.sin(elapsed * 0.2 + p * 3.0) * 0.16;
      innerTitaniumMat.emissiveIntensity = 0.56 + Math.min(vel * 0.6, 0.65);

      metatronGroup.scale.setScalar(0.96 + (ringSpread - 1.0) * 0.55);
      metatronGroup.rotation.z = elapsed * 0.06 + p * Math.PI * 0.9;
      metatronGroup.rotation.y =
        -0.22 + Math.sin(elapsed * 0.25 + p * Math.PI) * 0.35 + currentPointer.x * 0.15;
      metatronGroup.rotation.x =
        0.18 + Math.cos(elapsed * 0.2 + p * Math.PI) * 0.22 - currentPointer.y * 0.12;
      metatronLineMat.opacity = 0.22 + Math.min(vel * 0.22, 0.18);

      ringOuterGroup.scale.setScalar(ringSpread);
      ringOuterGroup.rotation.z =
        elapsed * 0.18 + p * Math.PI * 1.6 + velocityBoost * 0.6;
      ringOuterGroup.rotation.y = Math.PI * 0.14 + p * 1.15;

      ringMid.scale.setScalar(
        ringSpread * (1.0 + Math.sin(elapsed * 0.6) * 0.015)
      );
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

      particles.rotation.y = elapsed * 0.028 + p * 0.85;
      particles.position.y = -p * 1.6;
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
      outerQuartzMat.dispose();
      outerEdgeGeom.dispose();
      outerEdgeMat.dispose();
      tetraGeom.dispose();
      innerTitaniumMat.dispose();
      tetraEdgeGeom.dispose();
      tetraCopperEdgeMat.dispose();
      axisGeom.dispose();
      axisMat.dispose();
      metatronLineGeom.dispose();
      metatronLineMat.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      nodeInstanced.dispose();
      ringOuterGeom.dispose();
      ringMidGeom.dispose();
      ringInnerGeom.dispose();
      tickGeom.dispose();
      tickInstanced.dispose();
      titaniumRingMat.dispose();
      silverHairlineMat.dispose();
      copperMeridianMat.dispose();
      shardGeom.dispose();
      shardObsidianMat.dispose();
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
