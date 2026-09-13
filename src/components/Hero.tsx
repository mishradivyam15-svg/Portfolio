'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';
import { useAppStore } from '@/lib/store';

const SPLINE_VIEWER_SRC = 'https://cdn.spline.design/@splinetool/viewer@2.0.46/build/spline-viewer.js';
const SPLINE_SCENE_URL = 'https://prod.spline.design/2tdGJFW9PAJlxkdI/scene.splinecode';

// `<spline-viewer>` is a browser-native custom element registered by the
// script above, not a React component — there's no type-safe JSX for it, so
// it's rendered via createElement with an `any` cast rather than fighting
// JSX.IntrinsicElements augmentation. The viewer script itself is an ES
// module (it uses `import.meta` internally) — `type="module"` is required
// here or the browser throws a syntax error trying to run it as a classic
// script. Its containing `motion.div` already carries `pointer-events-none`
// (see below), which the element inherits unless it explicitly opts itself
// back in; confirmed with an actual wheel-scroll test over Hero that page
// scrolling is unaffected (the scene doesn't grab the wheel for camera
// zoom) — only the old blob's bespoke cursor-follow code is gone, since
// that logic lived on the removed mesh, not something a third-party scene
// can replicate.
function HeroScene() {
  return (
    <>
      <Script src={SPLINE_VIEWER_SRC} type="module" strategy="afterInteractive" />
      {React.createElement('spline-viewer' as any, {
        url: SPLINE_SCENE_URL,
        // The scene's camera framing is baked in and renders much larger/
        // lower than the old blob was tuned for, overlapping the CTA
        // buttons and (on mobile) the tagline. The container itself stays
        // full-size (100%/100%) so the element's own responsive layout
        // doesn't crop it — a CSS `scale` + `translateY` shrinks and lifts
        // the whole rendered scene uniformly instead, landing it back in
        // roughly the old blob's compact footprint behind the heading.
        style: {
          width: '100%',
          height: '100%',
          transform: 'scale(0.95) translateY(-14%)',
          transformOrigin: '50% 50%',
        },
      })}
    </>
  );
}

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [mounted, setMounted] = useState(false);
  const theme = useAppStore((state) => state.theme);

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 1000], [0, -120]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const sceneOpacity = useTransform(scrollY, [0, 500], [1, 0.15]);

  const fullText = 'Building systems. Solving hard problems. Chasing IIT Kharagpur.';

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 py-24 select-none z-10"
    >
      {/* LIQUID CHROME CENTERPIECE */}
      <motion.div
        style={{ opacity: sceneOpacity }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        {mounted && <HeroScene />}
      </motion.div>

      {/* Contrast scrim — guarantees text legibility regardless of where the
          cursor-reactive blob's specular highlight lands */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            theme === 'light'
              ? 'radial-gradient(60% 45% at 50% 48%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)'
              : 'radial-gradient(60% 45% at 50% 48%, rgba(5,3,8,0.55) 0%, rgba(5,3,8,0) 100%)',
        }}
      />

      {/* CONTENT */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative max-w-4xl w-full text-center z-10 flex flex-col gap-6 md:gap-8 items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase px-4 py-1.5 font-mono tracking-[0.2em] rounded-full border border-cyber-cyan/25 text-cyber-cyan/90"
        >
          Current Focus — GATE 2027 &amp; AI/ML
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight chrome-text chrome-text-animate leading-[0.95]"
        >
          Divyam Mishra
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-cyber-text/70 max-w-2xl h-8 flex justify-center items-center font-light"
        >
          <span>{typedText}</span>
          <span className="w-[2px] h-5 bg-cyber-cyan ml-1 animate-pulse" />
        </motion.p>

        <div className="flex flex-wrap gap-3 justify-center text-xs font-mono uppercase tracking-widest text-cyber-text/45">
          <span>CSE @ MMMUT</span>
          <span>·</span>
          <span>DSA + Web Dev</span>
          <span>·</span>
          <span>Future AI Engineer</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md justify-center"
        >
          <MagneticButton
            onClick={() => handleScrollToSection('projects')}
            className="px-8 py-4 rounded-full font-medium tracking-wide text-black bg-gradient-to-r from-cyber-cyan to-cyber-pink hover:opacity-90 transition-opacity text-sm"
          >
            View Projects
          </MagneticButton>

          <MagneticButton
            onClick={() => handleScrollToSection('gate-journey')}
            className="px-8 py-4 rounded-full font-medium tracking-wide text-cyber-text border border-cyber-cyan/30 hover:bg-cyber-cyan/10 transition-colors text-sm"
          >
            My Journey
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
        <span className="text-[10px] font-mono tracking-widest text-cyber-text/70 uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 border border-cyber-text/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-1 h-2 bg-cyber-cyan rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
