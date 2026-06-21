'use client';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, RoundedBox, Sparkles, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* ======================================================================
   AIRBNB-STYLE HOUSE
   Glossy ceramic-roof + warm stucco walls, glassy emissive windows,
   a softly glowing pin marker that bobs above the roofline, and a
   light dusting of ambient sparkle for that "premium" feel.
   ====================================================================== */
function HouseModel() {
  const ref = useRef<THREE.Group>(null);
  const pinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.004;
    }
    if (pinRef.current) {
      pinRef.current.position.y = 1.55 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06;
      pinRef.current.rotation.y += 0.013;
    }
  });

  const windowMat = (
    <meshPhysicalMaterial
      color="#d6f8ff"
      emissive="#00f0ff"
      emissiveIntensity={0.55}
      metalness={0.1}
      roughness={0.05}
      clearcoat={1}
      clearcoatRoughness={0.1}
      transmission={0.3}
    />
  );

  return (
    <group ref={ref} scale={1.5}>
      {/* House base / walls */}
      <RoundedBox args={[2, 1.2, 2]} radius={0.06} smoothness={6} position={[0, -0.5, 0]}>
        <meshPhysicalMaterial color="#fbf3e7" roughness={0.6} metalness={0.04} clearcoat={0.3} />
      </RoundedBox>

      {/* Base trim / foundation */}
      <mesh position={[0, -1.14, 0]}>
        <boxGeometry args={[2.08, 0.12, 2.08]} />
        <meshStandardMaterial color="#cfc3ad" roughness={0.85} />
      </mesh>

      {/* Corner pilasters for depth */}
      {[
        [-0.97, -0.5, 0.97],
        [0.97, -0.5, 0.97],
        [-0.97, -0.5, -0.97],
        [0.97, -0.5, -0.97],
      ].map((p, i) => (
        <mesh key={`corner-${i}`} position={p as [number, number, number]}>
          <boxGeometry args={[0.09, 1.2, 0.09]} />
          <meshStandardMaterial color="#efe3cf" roughness={0.7} />
        </mesh>
      ))}

      {/* Roof - main gabled block, glossy ceramic look */}
      <mesh position={[0, 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.62, 1.1, 4]} />
        <meshPhysicalMaterial color="#ff2d8a" roughness={0.35} metalness={0.15} clearcoat={0.8} clearcoatRoughness={0.2} />
      </mesh>

      {/* Roof ridge cap accent */}
      <mesh position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#ffe1ee" emissive="#ff007f" emissiveIntensity={0.5} />
      </mesh>

      {/* Eaves / overhang ring */}
      <mesh position={[0, 0.06, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.78, 0.06, 4]} />
        <meshStandardMaterial color="#d6005f" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Chimney */}
      <mesh position={[0.62, 0.55, -0.55]}>
        <boxGeometry args={[0.22, 0.7, 0.22]} />
        <meshStandardMaterial color="#9a9a9a" roughness={0.8} />
      </mesh>
      <mesh position={[0.62, 0.92, -0.55]}>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        <meshStandardMaterial color="#777777" roughness={0.8} />
      </mesh>

      {/* Door frame */}
      <mesh position={[0, -0.7, 1.02]}>
        <boxGeometry args={[0.48, 0.74, 0.05]} />
        <meshStandardMaterial color="#5a3b22" roughness={0.6} />
      </mesh>
      {/* Door panel */}
      <mesh position={[0, -0.72, 1.06]}>
        <boxGeometry args={[0.4, 0.66, 0.06]} />
        <meshPhysicalMaterial color="#1c1c1c" roughness={0.25} metalness={0.3} clearcoat={0.6} />
      </mesh>
      {/* Door panel inset lines */}
      <mesh position={[0, -0.55, 1.1]}>
        <boxGeometry args={[0.3, 0.22, 0.01]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.86, 1.1]}>
        <boxGeometry args={[0.3, 0.22, 0.01]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      {/* Door knob */}
      <mesh position={[0.15, -0.72, 1.1]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="#ffd166" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Windows with frames + shutters, left and right of door */}
      {[-0.65, 0.65].map((x, i) => (
        <group key={`window-${i}`} position={[x, -0.5, 1.02]}>
          {/* frame */}
          <mesh>
            <boxGeometry args={[0.42, 0.42, 0.05]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
          {/* glass */}
          <mesh position={[0, 0, 0.02]}>{windowMat}<boxGeometry args={[0.32, 0.32, 0.02]} /></mesh>
          {/* mullions */}
          <mesh position={[0, 0, 0.035]}>
            <boxGeometry args={[0.32, 0.025, 0.01]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <boxGeometry args={[0.025, 0.32, 0.01]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {/* shutters */}
          <mesh position={[-0.24, 0, 0]}>
            <boxGeometry args={[0.06, 0.42, 0.04]} />
            <meshStandardMaterial color="#ff2d8a" roughness={0.5} />
          </mesh>
          <mesh position={[0.24, 0, 0]}>
            <boxGeometry args={[0.06, 0.42, 0.04]} />
            <meshStandardMaterial color="#ff2d8a" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Gable end windows (front-facing under roof peak, small) */}
      <mesh position={[0, 0.12, 1.0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.18, 0.18, 0.04]} />
        {windowMat}
      </mesh>

      {/* Floating location pin above the house */}
      <group ref={pinRef} position={[0, 1.55, 0]}>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshPhysicalMaterial
            color="#ff5a8a"
            emissive="#ff007f"
            emissiveIntensity={0.55}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>
        <mesh position={[0, -0.18, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.1, 0.18, 20]} />
          <meshPhysicalMaterial
            color="#ff5a8a"
            emissive="#ff007f"
            emissiveIntensity={0.55}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.15} />
        </mesh>
      </group>

      <Sparkles count={20} scale={3} size={2} speed={0.3} color="#ffd1e6" />
    </group>
  );
}

/* ======================================================================
   PORTFOLIO LAPTOP
   Brushed-metal chassis, glassy glowing display with animated code
   lines and a subtle scanline shimmer, backlit keyboard deck.
   ====================================================================== */
function LaptopModel() {
  const ref = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const scanRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0055;
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.55 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
    if (scanRef.current) {
      scanRef.current.position.y = 0.56 - ((state.clock.elapsedTime * 0.27) % 1.1);
    }
  });

  const codeLines = Array.from({ length: 7 }).map((_, i) => ({
    y: 0.62 - i * 0.13,
    width: 0.5 + Math.sin(i * 1.7) * 0.35 + 0.6,
    color: i % 3 === 0 ? '#ff2d8a' : i % 3 === 1 ? '#00f0ff' : '#b76bff',
  }));

  return (
    <group ref={ref} position={[0, -0.1, 0]} scale={1.5}>
      {/* ---------- SCREEN ASSEMBLY (tilted back slightly) ---------- */}
      <group position={[0, 0.55, -0.55]} rotation={[-0.18, 0, 0]}>
        {/* Outer screen shell - brushed aluminum */}
        <RoundedBox args={[2, 1.34, 0.06]} radius={0.06} smoothness={6} position={[0, 0, -0.02]}>
          <meshPhysicalMaterial color="#e3e3ec" metalness={0.85} roughness={0.32} clearcoat={0.4} />
        </RoundedBox>

        {/* Bezel */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[1.92, 1.26, 0.02]} />
          <meshStandardMaterial color="#0a0a0e" roughness={0.35} metalness={0.4} />
        </mesh>

        {/* Screen glow backdrop */}
        <mesh ref={glowRef} position={[0, 0, 0.03]}>
          <planeGeometry args={[1.78, 1.12]} />
          <meshPhysicalMaterial
            color="#160b30"
            emissive="#9d4edd"
            emissiveIntensity={0.55}
            roughness={0.15}
            clearcoat={0.8}
          />
        </mesh>

        {/* Subtle moving scanline shimmer for a "live screen" feel */}
        <mesh ref={scanRef} position={[0, 0.3, 0.038]}>
          <planeGeometry args={[1.78, 0.04]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.06} />
        </mesh>

        {/* "Browser/editor" top bar */}
        <mesh position={[0, 0.48, 0.04]}>
          <boxGeometry args={[1.78, 0.12, 0.005]} />
          <meshStandardMaterial color="#1f1430" emissive="#00f0ff" emissiveIntensity={0.22} />
        </mesh>
        {[-0.78, -0.7, -0.62].map((x, i) => (
          <mesh key={`dot-${i}`} position={[x, 0.48, 0.045]}>
            <circleGeometry args={[0.022, 16]} />
            <meshStandardMaterial
              color={i === 0 ? '#ff5f56' : i === 1 ? '#ffbd2e' : '#27c93f'}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}

        {/* Code lines glowing on screen */}
        {codeLines.map((line, i) => (
          <mesh key={`code-${i}`} position={[-0.78 + line.width / 2, line.y, 0.045]}>
            <planeGeometry args={[line.width, 0.045]} />
            <meshStandardMaterial
              color={line.color}
              emissive={line.color}
              emissiveIntensity={1}
            />
          </mesh>
        ))}

        {/* Webcam */}
        <mesh position={[0, 0.59, 0.025]}>
          <circleGeometry args={[0.012, 12]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>
      </group>

      {/* ---------- BASE / KEYBOARD DECK ---------- */}
      <group position={[0, -0.18, 0.05]}>
        <RoundedBox args={[2, 0.1, 1.45]} radius={0.05} smoothness={6}>
          <meshPhysicalMaterial color="#dadae2" metalness={0.75} roughness={0.28} clearcoat={0.5} />
        </RoundedBox>

        {/* Keyboard recessed area */}
        <mesh position={[0, 0.052, -0.18]}>
          <boxGeometry args={[1.7, 0.01, 0.78]} />
          <meshStandardMaterial color="#13131a" roughness={0.6} />
        </mesh>

        {/* Key rows hint (small backlit bumps in a grid) */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 11 }).map((_, col) => (
            <mesh
              key={`key-${row}-${col}`}
              position={[-0.78 + col * 0.155, 0.058, -0.42 + row * 0.135]}
            >
              <boxGeometry args={[0.11, 0.012, 0.09]} />
              <meshStandardMaterial
                color="#2c2c36"
                emissive="#00f0ff"
                emissiveIntensity={0.08}
                roughness={0.5}
              />
            </mesh>
          ))
        )}

        {/* Trackpad */}
        <mesh position={[0, 0.053, 0.42]}>
          <boxGeometry args={[0.55, 0.005, 0.35]} />
          <meshPhysicalMaterial
            color="#eeeef4"
            metalness={0.4}
            roughness={0.08}
            clearcoat={1}
            emissive="#00f0ff"
            emissiveIntensity={0.04}
          />
        </mesh>

        {/* Front lip accent / logo glow under deck */}
        <mesh position={[0, -0.052, 0.7]}>
          <boxGeometry args={[0.3, 0.02, 0.04]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Hinge */}
      <mesh position={[0, -0.1, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.96, 20]} />
        <meshStandardMaterial color="#b4b4be" metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  );
}

/* ======================================================================
   DSA NETWORK / GRAPH
   Layered node-link graph with glassy glowing nodes, dual-line glow
   edges, orbiting rings, and a faint particle drift for atmosphere.
   ====================================================================== */
function GraphModel() {
  const ref = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);

  const points: [number, number, number][] = [
    [0, 1.15, 0],
    [-0.85, 0.35, 0.2],
    [0.85, 0.35, -0.2],
    [-1.35, -0.6, 0],
    [-0.4, -0.6, 0.3],
    [0.4, -0.6, -0.3],
    [1.35, -0.6, 0],
  ];

  const edges: [number, number, string][] = [
    [0, 1, '#00f0ff'],
    [0, 2, '#00f0ff'],
    [1, 3, '#ff2d8a'],
    [1, 4, '#ff2d8a'],
    [2, 5, '#ff2d8a'],
    [2, 6, '#ff2d8a'],
    [3, 4, '#b76bff'],
    [5, 6, '#b76bff'],
  ];

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0065;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Group) {
          const s = 1 + Math.sin(state.clock.elapsedTime * 1.5 + i * 0.7) * 0.1;
          child.scale.setScalar(s);
        }
      });
    }
  });

  const nodeColor = (i: number) => (i === 0 ? '#ff2d8a' : i < 3 ? '#00f0ff' : '#b76bff');

  return (
    <group ref={ref} scale={1.5}>
      {edges.map(([a, b, color], i) => (
        <group key={`edge-${i}`}>
          <Line points={[points[a], points[b]]} color={color} lineWidth={3} transparent opacity={0.3} />
          <Line points={[points[a], points[b]]} color={color} lineWidth={1.2} />
        </group>
      ))}

      <group ref={nodesRef}>
        {points.map((p, i) => (
          <group key={`node-${i}`} position={p}>
            <mesh>
              <sphereGeometry args={[0.2, 24, 24]} />
              <meshPhysicalMaterial
                color={nodeColor(i)}
                emissive={nodeColor(i)}
                emissiveIntensity={0.65}
                roughness={0.15}
                metalness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.1, 20, 20]} />
              <meshStandardMaterial color="#ffffff" roughness={0.05} />
            </mesh>
            <mesh rotation={[Math.PI / 2.3, 0, 0]}>
              <torusGeometry args={[0.3, 0.013, 10, 40]} />
              <meshStandardMaterial
                color={nodeColor(i)}
                emissive={nodeColor(i)}
                emissiveIntensity={0.9}
                transparent
                opacity={0.65}
              />
            </mesh>
          </group>
        ))}
      </group>

      <Sparkles count={30} scale={4} size={1.6} speed={0.4} color="#bfefff" />
    </group>
  );
}

/* ---------------- WRAPPER ---------------- */
export default function ProjectModel({ type }: { type: string }) {
  const renderModel = () => {
    switch (type) {
      case 'airbnb':
        return <HouseModel />;
      case 'portfolio':
        return <LaptopModel />;
      case 'dsa':
        return <GraphModel />;
      default:
        return <LaptopModel />;
    }
  };

  return (
    <div className="w-full h-40">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={1.8} color="#fff6ec" />
        <pointLight position={[-3, -2, 3]} intensity={0.7} color="#00f0ff" />
        <pointLight position={[2, -3, -2]} intensity={0.6} color="#ff2d8a" />
        <directionalLight position={[0, 5, 2]} intensity={0.5} />
        <directionalLight position={[-2, -1, 4]} intensity={0.25} color="#9d4edd" />
        {renderModel()}
        <ContactShadows position={[0, -1.3, 0]} opacity={0.35} scale={5} blur={2.2} far={2} />
      </Canvas>
    </div>
  );
}