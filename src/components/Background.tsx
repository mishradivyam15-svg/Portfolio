'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

/**
 * Persistent environment layer for the whole site — the single background
 * system every section renders on top of (transparent), rather than each
 * section having its own backdrop. Base gradient adapted from a 21st.dev
 * radial-gradient hero background, retuned to the royal violet/pink palette.
 * Swaps to a light chrome variant with the theme toggle.
 */
export default function Background() {
  const theme = useAppStore((state) => state.theme);
  const isLight = theme === 'light';

  return (
    <div className={cn('fixed inset-0 -z-10 h-full w-full overflow-hidden')}>
      {/* 21st.dev-style radial void gradient — the environment's base layer */}
      <div
        className="absolute inset-0"
        style={{
          background: isLight
            ? 'radial-gradient(125% 125% at 50% 10%, #f7f5fb 35%, #e4d9fb 78%, #d9c9f5 100%)'
            : 'radial-gradient(125% 125% at 50% 10%, #050308 35%, #2a1454 78%, #1a0e33 100%)',
        }}
      />

      {/* Controlled ambient light blobs for depth — restrained, not decorative overload */}
      <div
        className="ambient-glow left-[-10%] top-[-10%] h-[45vw] w-[45vw]"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          opacity: isLight ? 0.14 : 0.3,
        }}
      />
      <div
        className="ambient-glow right-[-15%] bottom-[10%] h-[38vw] w-[38vw]"
        style={{
          background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
          opacity: isLight ? 0.1 : 0.2,
        }}
      />

      {/* Fine film-grain for material texture, kept extremely subtle */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
