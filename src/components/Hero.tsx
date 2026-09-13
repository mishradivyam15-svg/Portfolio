'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';
import { useAppStore } from '@/lib/store';

const SPLINE_VIEWER_SRC = 'https://cdn.spline.design/@splinetool/viewer@2.0.46/build/spline-viewer.js';
const SPLINE_SCENE_URL = 'https://prod.spline.design/2tdGJFW9PAJlxkdI/scene.splinecode';

// The prebuilt `<spline-viewer>` custom element (loaded from Spline's CDN,
// never touched by Next.js/Turbopack's bundler — a plain browser fetch) is
// used rather than the lower-level `@splinetool/runtime` package directly.
// That package's own asset loading (`new URL('boolean_wasm_bg.wasm', ...)`,
// `'../libs/draco/gltf/draco_wasm_wrapper.js'`, etc.) references filenames
// that don't match what's actually shipped in the npm package — a genuine
// packaging defect present across many versions (confirmed: 2.0.30 through
// 2.0.46 all reference the same mismatched `boolean_wasm_bg.wasm`), not a
// bundler incompatibility (webpack fails identically to Turbopack). Loading
// the CDN build instead means the browser resolves everything relative to
// Spline's own server, so none of that matters.
//
// The remaining problem: this viewer auto-selects Three.js's WebGPURenderer
// whenever the browser grants a WebGPU adapter — which Safari/WebKit does,
// but its WebGPU implementation threw a genuine validation error on every
// frame for this scene (`executeBundles: render bundle is not valid, reason
// = firstIndexOffsetInBytes + indexCount * indexSizeInBytes >
// m_indexBufferSize`, confirmed by loading the page in Playwright's WebKit
// engine — Safari's engine family — and reading the real console output),
// so nothing ever drew: the robot was invisible on Safari while working
// fine on Chrome. The bundle reads `new URLSearchParams(window.location
// .search).get('forcegl') === '1'` (found by searching the minified source)
// to force the classic WebGL pipeline instead — there's no per-element
// attribute for it, only this page-level diagnostic flag. `history
// .replaceState` sets it on the current URL just before the viewer script
// runs (a synchronous call, completing long before the script's network
// fetch could finish, so the flag is reliably present when the check runs),
// then reverts it once the scene reports it has finished loading (or after
// a fallback timeout, in case that event never fires) — restoring the
// user's actual URL rather than leaving `?forcegl=1` visible.
function HeroScene() {
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const originalUrl = window.location.href;
    const forcedUrl = new URL(window.location.href);
    forcedUrl.searchParams.set('forcegl', '1');
    window.history.replaceState(null, '', forcedUrl.toString());

    let restored = false;
    const restoreUrl = () => {
      if (restored) return;
      restored = true;
      window.history.replaceState(null, '', originalUrl);
    };

    const el = viewerRef.current;
    el?.addEventListener('load-complete', restoreUrl, { once: true });
    el?.addEventListener('splineerror', restoreUrl, { once: true });
    const fallback = setTimeout(restoreUrl, 8000);

    return () => {
      el?.removeEventListener('load-complete', restoreUrl);
      el?.removeEventListener('splineerror', restoreUrl);
      clearTimeout(fallback);
      restoreUrl();
    };
  }, []);

  return (
    <>
      <Script src={SPLINE_VIEWER_SRC} type="module" strategy="afterInteractive" />
      {React.createElement('spline-viewer' as any, {
        ref: viewerRef,
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
