'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

const BOOT_LOGS = [
  'INITIALIZING HOLOGRAPHIC ENVIRONMENT...',
  'ESTABLISHING SECURE CONNECTION MONGODB://...',
  'CONNECTING NEURAL ASSISTANT TO OPENAI INTERFACE...',
  'LOADING 3D PARTICLE RENDER ENGINE...',
  'LOADING SKILL SPHERE CORE MATRIX...',
  'RETRIEVING GATE 2027 ROADMAP SCHEMATICS...',
  'SYSTEM SECURE. PREPARING PORTFOLIO DATA...'
];

export default function Loader() {
  const { loading, setLoading } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;

    // Fast initial boost, then standard countdown
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [loading, setLoading]);

  useEffect(() => {
    if (progress === 0) return;
    const nextLogTrigger = Math.floor((BOOT_LOGS.length - 1) * (progress / 100));
    if (nextLogTrigger > logIndex) {
      setLogIndex(nextLogTrigger);
    }
  }, [progress, logIndex]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-[#050508] flex flex-col items-center justify-center p-6 select-none font-mono"
        >
          {/* Neon Grid Backdrop */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
          <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

          <div className="relative max-w-lg w-full flex flex-col items-center gap-8 text-center">
            {/* Holographic Glowing Circle */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyber-cyan"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                className="absolute w-20 h-20 rounded-full border-b-2 border-l-2 border-cyber-pink"
              />
              <span className="text-xl font-bold text-cyber-cyan glow-text-primary">
                {progress}%
              </span>
            </div>

            {/* Terminal Boot Log Output */}
            <div className="w-full h-20 glass-panel bg-black/40 border border-cyber-cyan/35 text-left p-3 text-xs md:text-sm text-cyber-cyan/95 rounded flex flex-col justify-end overflow-hidden select-none">
              <div className="text-cyber-cyan/60 mb-1">{`>> [BOOT SEQUENCE PROGRESS]`}</div>
              <motion.div
                key={logIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="truncate"
              >
                {BOOT_LOGS[logIndex]}
              </motion.div>
            </div>

            <div className="text-xs text-cyber-cyan/45 tracking-widest uppercase">
              DIVYAM MISHRA • SECURE_ACCESS_PORTFOLIO
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
