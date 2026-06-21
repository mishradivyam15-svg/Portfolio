'use client';

import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function ThemeToggle() {
  const { theme, setTheme } = useAppStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'neon-light') {
      root.classList.add('neon-light');
    } else {
      root.classList.remove('neon-light');
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'neon-light' : 'dark')}
      className="fixed bottom-6 right-20 z-50 p-3 rounded-full glass-panel hover:border-cyber-primary text-cyber-text transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-cyan-500/25"
      aria-label="Toggle cyberpunk theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-cyber-cyan" />
      ) : (
        <Moon className="w-5 h-5 text-cyber-purple" />
      )}
    </button>
  );
}
