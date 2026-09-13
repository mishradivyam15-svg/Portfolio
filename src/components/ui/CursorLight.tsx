'use client';

import React, { useEffect, useRef } from 'react';

/**
 * A very subtle radial light that follows the cursor across the whole site,
 * sitting above the static Background gradient but below page content. This
 * is the "wait, the background reacts to me" beat — deliberately faint so it
 * reads as atmosphere, not a spotlight effect.
 */
export default function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reduceMotion) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      if (ref.current) {
        ref.current.style.setProperty('--x', `${x}px`);
        ref.current.style.setProperty('--y', `${y}px`);
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(167,139,250,0.08), transparent 70%)',
      }}
    />
  );
}
