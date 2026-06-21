'use client';

import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);

    // Dynamic colors based on active theme
    const charColor = theme === 'dark' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(157, 78, 221, 0.08)';
    const font = '14px monospace';
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&GATE2027';

    const draw = () => {
      ctx.fillStyle = theme === 'dark' ? 'rgba(5, 5, 8, 0.05)' : 'rgba(240, 243, 248, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = charColor;
      ctx.font = font;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 z-0" />;
}
