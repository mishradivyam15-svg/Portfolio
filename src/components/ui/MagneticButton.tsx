'use client';

import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
}

/**
 * Wraps interactive elements with a restrained "magnetic" pull toward the
 * cursor — the button nudges toward you within its own bounds, then springs
 * back on leave. Cheap spring math, no physics engine needed for this scale.
 */
export default function MagneticButton({
  children,
  className,
  style,
  onClick,
  as = 'button',
  href,
  target,
  rel,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.2 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = as === 'a' ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
      className="inline-block"
      style={{ x, y }}
    >
      <Tag
        onClick={onClick}
        href={as === 'a' ? href : undefined}
        target={as === 'a' ? target : undefined}
        rel={as === 'a' ? rel : undefined}
        className={cn(className)}
        style={style}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
