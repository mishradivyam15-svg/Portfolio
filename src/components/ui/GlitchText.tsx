'use client';

import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function GlitchText({ text, className = '', speed = 2500 }: GlitchTextProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={glitch ? 'opacity-70 text-cyber-cyan glitch-clip absolute left-[2px] top-0' : 'hidden'}>
        {text}
      </span>
      <span className={glitch ? 'opacity-70 text-cyber-pink glitch-clip absolute left-[-2px] top-0' : 'hidden'}>
        {text}
      </span>
      <span className="relative z-10">{text}</span>
    </span>
  );
}
