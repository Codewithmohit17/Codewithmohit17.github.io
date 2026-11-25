"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type AccentVariant = "icosahedron" | "torus" | "octahedron" | "knot";

function AccentMesh({
  variant,
  color,
}: {
  variant: AccentVariant;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.28;
    meshRef.current.rotation.y += delta * 0.42;
  });

  return (
    <Float speed={2} rotationIntensity={0.35} floatIntensity={0.45}>
      <mesh ref={meshRef}>
        {variant === "icosahedron" && <icosahedronGeometry args={[1.15, 0]} />}
        {variant === "torus" && <torusGeometry args={[0.95, 0.28, 16, 40]} />}
        {variant === "octahedron" && <octahedronGeometry args={[1.2, 0]} />}
        {variant === "knot" && <torusKnotGeometry args={[0.75, 0.22, 96, 16]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
          wireframe
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

export default function SectionAccent3D({
  variant = "icosahedron",
  color = "#22d3ee",
  className = "",
}: {
  variant?: AccentVariant;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none hidden h-28 w-28 md:block ${className}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[2, 2, 3]} intensity={2} color={color} />
        <AccentMesh variant={variant} color={color} />
      </Canvas>
    </div>
  );
}
