'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom liquid-chrome cursor: a soft blurred dot that lerps toward the
 * pointer, and magnetizes/expands over any element tagged data-cursor="hover".
 * Technique inspired by the reference repo's lerped trailing cursor —
 * reimplemented fresh. Disabled on touch devices and prefers-reduced-motion.
 */
export default function LiquidCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reduceMotion) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest('[data-cursor="hover"]');
      setHovering(!!el);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full mix-blend-difference transition-[width,height,background] duration-300 ease-out"
      style={{
        width: hovering ? 56 : 14,
        height: hovering ? 56 : 14,
        background: 'radial-gradient(circle, #ffffff 0%, #a78bfa 70%)',
        filter: 'blur(0.5px)',
      }}
    />
  );
}
