'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import GlitchText from './ui/GlitchText';

function HologramParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions] = useState(() => {
    const arr = new Float32Array(450);

    for (let i = 0; i < 450; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = Math.cbrt(Math.random()) * 2.2;

      arr[i] = r * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.2;
      arr[i + 2] = r * Math.cos(phi);
    }

    return arr;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;

      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        mouse.y * 0.25,
        0.05
      );

      pointsRef.current.rotation.z = THREE.MathUtils.lerp(
        pointsRef.current.rotation.z,
        mouse.x * 0.25,
        0.05
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.055}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();

  const particleY = useTransform(scrollY, [0, 1000], [0, 120]);
  const contentY = useTransform(scrollY, [0, 1000], [0, -150]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 400], [1, 0.9]);

  const fullText =
    'Building systems. Solving hard problems. Chasing IIT Kharagpur.';

  useEffect(() => {
    setMounted(true);

    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;

      if (i > fullText.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 py-24 select-none z-10"
    >
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-35"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* PARTICLE PARALLAX */}
      <motion.div
        style={{ y: particleY }}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 md:opacity-55 z-0"
      >
        {mounted && (
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.8} />
            <pointLight
              position={[5, 5, 5]}
              intensity={1.2}
              color="#ff007f"
            />
            <pointLight
              position={[-5, -5, -5]}
              intensity={1.2}
              color="#00f0ff"
            />
            <HologramParticles />
          </Canvas>
        )}
      </motion.div>

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 scanlines opacity-5 pointer-events-none z-0" />

      {/* CONTENT PARALLAX */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
        }}
        className="relative max-w-4xl w-full text-center z-10 flex flex-col gap-6 md:gap-8 items-center"
      >
        {/* STATUS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase px-4 py-1 font-mono tracking-widest border rounded border-cyber-cyan/30 bg-cyber-dark/40 text-cyber-cyan"
        >
          CURRENT MISSION: GATE 2027 + AI/ML
        </motion.div>

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-wide uppercase"
        >
          <GlitchText text="Divyam" className="text-cyber-text" />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-pink">
            Mishra
          </span>
        </motion.h1>

        {/* TYPING TEXT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm sm:text-base md:text-xl font-mono text-cyber-text/75 max-w-2xl h-12 flex justify-center items-center"
        >
          <span>{typedText}</span>
          <span className="w-2 h-5 bg-cyber-cyan ml-1 animate-pulse" />
        </motion.div>

        {/* INFO STRIP */}
        <div className="flex flex-wrap gap-3 justify-center text-xs font-mono uppercase text-cyber-text/60">
          <span>CSE @ MMMUT</span>
          <span>•</span>
          <span>DSA + Web Dev</span>
          <span>•</span>
          <span>Future AI Engineer</span>
        </div>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md"
        >
          <button
            onClick={() => handleScrollToSection('projects')}
            className="flex-1 px-8 py-4 rounded font-bold font-mono tracking-wider text-black bg-gradient-to-r from-cyber-cyan to-cyber-accent hover:scale-105 transition-all uppercase text-sm"
          >
            View Projects
          </button>

          <button
            onClick={() => handleScrollToSection('gate-journey')}
            className="flex-1 px-8 py-4 rounded font-bold font-mono tracking-wider text-cyber-text border border-cyber-cyan/50 hover:bg-cyber-cyan/10 transition-all hover:scale-105 uppercase text-sm"
          >
            My Journey
          </button>
        </motion.div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 z-10">
        <span className="text-[10px] font-mono tracking-widest text-cyber-cyan/70 uppercase">
          Scroll Down
        </span>

        <div className="w-5 h-8 border-2 border-cyber-cyan/40 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-2 bg-cyber-cyan rounded-full animate-ping" />
        </div>
      </div>
    </section>
  );
}