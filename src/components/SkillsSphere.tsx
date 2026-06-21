'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import Reveal from './ui/Reveal';

const SKILLS = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Express.js',
  'MySQL',
  'MongoDB',
  'C++',
  'DSA',
  'AWS',
  'Docker',
  'Redis',
  'Nginx',
  'Next.js',
  'React',
];

function Point({
  position,
  word,
  color,
}: {
  position: [number, number, number];
  word: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Html
      position={position}
      center
      distanceFactor={8}
      style={{
        transition: 'all 0.25s ease',
        opacity: hovered ? 1 : 0.75,
        transform: `scale(${hovered ? 1.25 : 1})`,
      }}
    >
      <div
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        className="px-3 py-1 text-xs md:text-sm font-mono font-bold border rounded bg-black/85 whitespace-nowrap cursor-pointer transition-all"
        style={{
          color: hovered ? '#ff007f' : color,
          borderColor: hovered ? '#ff007f' : `${color}35`,
          boxShadow: hovered ? '0 0 18px #ff007f' : `0 0 10px ${color}20`,
        }}
      >
        {word}
      </div>
    </Html>
  );
}

function Cloud({ radius = 4, color = '#00f0ff' }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = SKILLS.length;

  const points = React.useMemo(() => {
    const temp = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      temp.push({
        position: [x, y, z] as [number, number, number],
        word: SKILLS[i],
      });
    }

    return temp;
  }, [count, radius]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
      groupRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.25) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((p, idx) => (
        <Point
          key={idx}
          position={p.position}
          word={p.word}
          color={color}
        />
      ))}
    </group>
  );
}

export default function SkillsSphere() {
  const theme = useAppStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center font-mono text-cyber-cyan/50 text-sm">
        INITIALIZING SKILL MATRIX...
      </div>
    );
  }

  const sphereColor = theme === 'dark' ? '#00f0ff' : '#9d4edd';

  return (
    <Reveal>
      <section
        id="skills"
        className="relative w-full py-24 px-6 md:px-12 border-t border-cyber-cyan/10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-cyber-cyan mb-2">
              Skills Matrix
            </h2>

            <p className="text-xs md:text-sm font-mono text-cyber-text/50 uppercase tracking-widest">
              Technologies I build with
            </p>
          </motion.div>

          {/* Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-[400px] md:h-[550px] relative select-none cursor-grab active:cursor-grabbing"
          >
            <Canvas camera={{ position: [0, 0, 9], fov: 60 }} dpr={[1, 1.5]}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <Cloud radius={4} color={sphereColor} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
              />
            </Canvas>
          </motion.div>
        </div>
      </section>
    </Reveal>
  );
}