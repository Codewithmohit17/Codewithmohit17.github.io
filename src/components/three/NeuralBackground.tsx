"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralFieldProps {
  nodeCount: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
}

function NeuralField({ nodeCount, mouseRef, scrollRef }: NeuralFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities, colors, linePositions, lineColors } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const vel = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);

    const palette = [
      new THREE.Color("#22d3ee"), // cyan
      new THREE.Color("#3b82f6"), // electric blue
      new THREE.Color("#a855f7"), // soft purple
      new THREE.Color("#ec4899"), // subtle magenta
    ];

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 22;
      pos[i3 + 1] = (Math.random() - 0.5) * 14;
      pos[i3 + 2] = (Math.random() - 0.5) * 10 - 2;

      vel[i3] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.004;

      const c = palette[i % palette.length];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    const maxLines = nodeCount * 6;
    const lPos = new Float32Array(maxLines * 6);
    const lCol = new Float32Array(maxLines * 6);

    return {
      positions: pos,
      velocities: vel,
      colors: col,
      linePositions: lPos,
      lineColors: lCol,
    };
  }, [nodeCount]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      const targetRotX = mouseRef.current.y * 0.12 + scrollRef.current * 0.18;
      const targetRotY = mouseRef.current.x * 0.16 + t * 0.015;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.04
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.04
      );
    }

    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];

      if (arr[i3] > 11 || arr[i3] < -11) velocities[i3] *= -1;
      if (arr[i3 + 1] > 7 || arr[i3 + 1] < -7) velocities[i3 + 1] *= -1;
      if (arr[i3 + 2] > 3 || arr[i3 + 2] < -7) velocities[i3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    let lineIdx = 0;
    const maxLines = nodeCount * 6;
    const maxDist = 2.8;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < nodeCount && lineIdx < maxLines; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < nodeCount && lineIdx < maxLines; j++) {
        const j3 = j * 3;
        const dx = arr[i3] - arr[j3];
        const dy = arr[i3 + 1] - arr[j3 + 1];
        const dz = arr[i3 + 2] - arr[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistSq) {
          const alpha = 1 - Math.sqrt(distSq) / maxDist;
          const base = lineIdx * 6;

          linePositions[base] = arr[i3];
          linePositions[base + 1] = arr[i3 + 1];
          linePositions[base + 2] = arr[i3 + 2];
          linePositions[base + 3] = arr[j3];
          linePositions[base + 4] = arr[j3 + 1];
          linePositions[base + 5] = arr[j3 + 2];

          lineColors[base] = 0.13 * alpha;
          lineColors[base + 1] = 0.82 * alpha;
          lineColors[base + 2] = 0.93 * alpha;
          lineColors[base + 3] = 0.65 * alpha;
          lineColors[base + 4] = 0.33 * alpha;
          lineColors[base + 5] = 0.96 * alpha;

          lineIdx++;
        }
      }
    }

    const lineGeo = linesRef.current.geometry;
    const lPosAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
    const lColAttr = lineGeo.getAttribute("color") as THREE.BufferAttribute;
    lPosAttr.needsUpdate = true;
    lColAttr.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx * 2);
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function NeuralBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollRef.current = window.scrollY / maxScroll;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Radial ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(34, 211, 238, 0.10), transparent 42%), radial-gradient(circle at 80% 25%, rgba(168, 85, 247, 0.11), transparent 45%), radial-gradient(circle at 50% 85%, rgba(59, 130, 246, 0.08), transparent 50%)",
        }}
      />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <NeuralField
          nodeCount={isMobile ? 65 : 130}
          mouseRef={mouseRef}
          scrollRef={scrollRef}
        />
      </Canvas>
    </div>
  );
}
