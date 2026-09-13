'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

export default function Loader() {
  const { loading, setLoading } = useAppStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + step, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [loading, setLoading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-[#050308] flex flex-col items-center justify-center p-6 select-none"
        >
          <div className="relative flex flex-col items-center gap-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-semibold chrome-text"
            >
              {progress}%
            </motion.span>

            <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-pink"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-[11px] text-cyber-text/35 tracking-[0.25em] uppercase">
              Divyam Mishra
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
