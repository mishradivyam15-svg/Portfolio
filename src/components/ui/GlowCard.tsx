'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tilt?: boolean;
}

export default function GlowCard({
  children,
  className = '',
  glowColor = 'var(--cyber-primary)',
  tilt = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    if (tilt) {
      const px = (x / rect.width - 0.5) * 2;
      const py = (y / rect.height - 0.5) * 2;
      setRotate({ x: -py * 4, y: px * 4 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={tilt ? { rotateX: rotate.x, rotateY: rotate.y } : undefined}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={tilt ? { transformPerspective: 900 } : undefined}
      className={cn(
        'relative glass-panel rounded-2xl overflow-hidden p-6 transition-colors duration-300',
        className
      )}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute rounded-full blur-[90px] opacity-[0.18]"
          style={{
            width: '260px',
            height: '260px',
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            left: coords.x - 130,
            top: coords.y - 130,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
