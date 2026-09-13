'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

const NBSP = ' ';

/**
 * Section heading where letters magnetically shy away from the cursor within
 * a small radius. Reads directly on refs during the move handler (no React
 * state) so it stays cheap even at 60fps while hovering.
 */
export default function InteractiveHeading({
  text,
  className,
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  as?: 'h2' | 'h3';
}) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const radius = 60;
    lettersRef.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const strength = (1 - dist / radius) * 7;
        const angle = Math.atan2(dy, dx);
        el.style.transform = `translate(${-Math.cos(angle) * strength}px, ${-Math.sin(angle) * strength}px)`;
      } else {
        el.style.transform = 'translate(0px, 0px)';
      }
    });
  };

  const handleMouseLeave = () => {
    lettersRef.current.forEach((el) => {
      if (el) el.style.transform = 'translate(0px, 0px)';
    });
  };

  const chars = text.split('');

  return (
    <Tag
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-block', className)}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            lettersRef.current[i] = el;
          }}
          className="inline-block transition-transform duration-200 ease-out will-change-transform"
        >
          {char === ' ' ? NBSP : char}
        </span>
      ))}
    </Tag>
  );
}
