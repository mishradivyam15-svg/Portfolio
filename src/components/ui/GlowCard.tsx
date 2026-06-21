'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlowCard({ children, className = '', glowColor = 'var(--cyber-primary)' }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative glass-panel rounded-xl overflow-hidden p-6 transition-all duration-300 ${className}`}
    >
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none rounded-full blur-[100px] opacity-20"
          style={{
            width: '250px',
            height: '250px',
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            left: coords.x - 125,
            top: coords.y - 125,
          }}
          transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
