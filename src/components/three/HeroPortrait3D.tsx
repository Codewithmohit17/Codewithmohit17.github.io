"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const CARD_WIDTH = 3.26;
const CARD_HEIGHT = 3.26;
const PHOTO_WIDTH = 3.04;
const PHOTO_HEIGHT = 3.04;

function createFallbackPortraitTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 768;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 768, 768);
  grad.addColorStop(0, "#0b132b");
  grad.addColorStop(0.5, "#111b3a");
  grad.addColorStop(1, "#090d1f");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 768, 768);

  const aura = ctx.createRadialGradient(384, 340, 40, 384, 340, 300);
  aura.addColorStop(0, "rgba(34, 211, 238, 0.35)");
  aura.addColorStop(0.5, "rgba(168, 85, 247, 0.18)");
  aura.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, 768, 768);

  ctx.fillStyle = "#22d3ee";
  ctx.font = "700 84px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("MC", 384, 390);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRoundedCardShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function createRoundedPlaneGeometry(
  width: number,
  height: number,
  radius: number
) {
  const shape = createRoundedCardShape(width, height, radius);
  const geo = new THREE.ShapeGeometry(shape, 24);
  const posAttr = geo.attributes.position;
  const uvAttr = geo.attributes.uv;

  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    uvAttr.setXY(i, (x + width / 2) / width, (y + height / 2) / height);
  }
  uvAttr.needsUpdate = true;
  return geo;
}

interface PortraitCardMeshProps {
  imagePath: string;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  onLoaded?: (usingCustomPhoto: boolean) => void;
}

function PortraitCardMesh({
  imagePath,
  mouseRef,
  onLoaded,
}: PortraitCardMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = new THREE.TextureLoader();

    loader.load(
      imagePath,
      (loadedTex) => {
        if (!mounted) return;
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.anisotropy = 8;

        // Preserve aspect ratio with cover-fit UV scaling
        const img = loadedTex.image as { width?: number; height?: number };
        if (img?.width && img?.height) {
          const imgAspect = img.width / img.height;
          const planeAspect = PHOTO_WIDTH / PHOTO_HEIGHT;
          if (imgAspect > planeAspect) {
            const scale = planeAspect / imgAspect;
            loadedTex.repeat.set(scale, 1);
            loadedTex.offset.set((1 - scale) / 2, 0);
          } else if (imgAspect < planeAspect) {
            const scale = imgAspect / planeAspect;
            loadedTex.repeat.set(1, scale);
            loadedTex.offset.set(0, (1 - scale) / 2);
          }
        }

        setTexture(loadedTex);
        onLoaded?.(true);
      },
      undefined,
      () => {
        if (!mounted) return;
        setTexture(createFallbackPortraitTexture());
        onLoaded?.(false);
      }
    );

    return () => {
      mounted = false;
    };
  }, [imagePath, onLoaded]);

  const { frameGeo, innerGeo, cyanGlowGeo, purpleGlowGeo } = useMemo(() => {
    const outerShape = createRoundedCardShape(CARD_WIDTH, CARD_HEIGHT, 0.24);
    const frame = new THREE.ExtrudeGeometry(outerShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    frame.center();

    const cyanShape = createRoundedCardShape(
      CARD_WIDTH + 0.14,
      CARD_HEIGHT + 0.14,
      0.27
    );
    const cyanGlow = new THREE.ExtrudeGeometry(cyanShape, {
      depth: 0.02,
      bevelEnabled: false,
    });
    cyanGlow.center();

    const purpleShape = createRoundedCardShape(
      CARD_WIDTH + 0.22,
      CARD_HEIGHT + 0.22,
      0.3
    );
    const purpleGlow = new THREE.ExtrudeGeometry(purpleShape, {
      depth: 0.015,
      bevelEnabled: false,
    });
    purpleGlow.center();

    const inner = createRoundedPlaneGeometry(PHOTO_WIDTH, PHOTO_HEIGHT, 0.18);

    return {
      frameGeo: frame,
      innerGeo: inner,
      cyanGlowGeo: cyanGlow,
      purpleGlowGeo: purpleGlow,
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      const targetRotY = mouseRef.current.x * 0.28 + Math.sin(t * 0.6) * 0.045;
      const targetRotX = -mouseRef.current.y * 0.2 + Math.cos(t * 0.5) * 0.035;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.06
      );
    }

    if (rimLightRef.current) {
      rimLightRef.current.position.x = mouseRef.current.x * 3.5;
      rimLightRef.current.position.y = mouseRef.current.y * 3.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.35}>
        {/* Outer Purple Neon Halo Layer */}
        <mesh geometry={purpleGlowGeo} position={[0, 0, -0.09]}>
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner Cyan Neon Edge Rim */}
        <mesh geometry={cyanGlowGeo} position={[0, 0, -0.07]}>
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.42}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Metallic / Glass Backing Frame */}
        <mesh geometry={frameGeo} castShadow receiveShadow>
          <meshStandardMaterial
            color="#0b1226"
            metalness={0.78}
            roughness={0.2}
            emissive="#1e1b4b"
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* Portrait Photo Plane */}
        {texture && (
          <mesh geometry={innerGeo} position={[0, 0, 0.105]}>
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>
        )}

        {/* Subtle Glass Clearcoat Reflection Overlay */}
        <mesh geometry={innerGeo} position={[0, 0, 0.115]}>
          <meshPhysicalMaterial
            transparent
            opacity={0.07}
            roughness={0.08}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.08}
            color="#bae6fd"
          />
        </mesh>

        {/* Orbiting Tech Accents */}
        <mesh position={[1.88, 1.48, 0.28]} rotation={[0.5, 0.4, 0]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.95}
            wireframe
          />
        </mesh>

        <mesh position={[-1.88, -1.38, 0.32]} rotation={[0.3, 0.8, 0]}>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.95}
            wireframe
          />
        </mesh>

        <mesh position={[-1.78, 1.48, -0.18]}>
          <torusGeometry args={[0.2, 0.035, 16, 32]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.75}
          />
        </mesh>

        <mesh position={[1.82, -1.42, -0.15]} rotation={[0.6, 0.2, 0.4]}>
          <torusGeometry args={[0.16, 0.025, 16, 32]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.75}
          />
        </mesh>
      </Float>

      <Sparkles
        count={30}
        scale={[4.8, 4.8, 2.5]}
        size={2.2}
        speed={0.4}
        color="#22d3ee"
      />

      <pointLight
        ref={rimLightRef}
        position={[1.5, 1.5, 3]}
        intensity={6}
        color="#22d3ee"
        distance={10}
      />
      <pointLight
        position={[-2.5, -2, 2.5]}
        intensity={5}
        color="#a855f7"
        distance={10}
      />
    </group>
  );
}

export default function HeroPortrait3D({
  imagePath,
}: {
  imagePath: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [hasCustomPhoto, setHasCustomPhoto] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current.x = THREE.MathUtils.clamp(
        (e.clientX - centerX) / (window.innerWidth * 0.45),
        -1,
        1
      );
      mouseRef.current.y = THREE.MathUtils.clamp(
        (e.clientY - centerY) / (window.innerHeight * 0.45),
        -1,
        1
      );
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[400px] w-full max-w-[400px] sm:h-[460px] sm:max-w-[460px] lg:h-[510px] lg:max-w-[510px]"
    >
      {/* Ambient Neon Halo behind canvas */}
      <div
        className="pointer-events-none absolute inset-6 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "conic-gradient(from 120deg, rgba(34, 211, 238, 0.45), rgba(59, 130, 246, 0.32), rgba(168, 85, 247, 0.48), rgba(236, 72, 153, 0.28), rgba(34, 211, 238, 0.45))",
        }}
      />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.2], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} color="#ffffff" />
        <PortraitCardMesh
          imagePath={imagePath}
          mouseRef={mouseRef}
          onLoaded={setHasCustomPhoto}
        />
      </Canvas>

      {/* HUD Status Chip */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/25 bg-navy-950/80 px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-md">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
        <span>
          {hasCustomPhoto
            ? "Interactive 3D Portrait • Move cursor"
            : "Loading Portrait..."}
        </span>
      </div>
    </div>
  );
}
