'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Journey', id: 'timeline' },
  { label: 'GATE', id: 'gate-journey' },
  { label: 'AI Lab', id: 'ai-assistant' },
  { label: 'Contact', id: 'contact' },
];

function HoverLink({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      className={`relative overflow-hidden h-4 text-xs tracking-wide ${
        isActive ? 'text-cyber-cyan' : 'text-cyber-text/60'
      }`}
    >
      {/* Two stacked copies — the hover swaps which one sits in view,
          rather than just sliding the label away into nothing. */}
      <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {label}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 text-cyber-text"
      >
        {label}
      </span>
    </button>
  );
}

export default function Navbar() {
  const { activeSection, setActiveSection } = useAppStore();
  const [navOpen, setNavOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setNavOpen(false);
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 md:px-10 md:py-5 flex items-center justify-between backdrop-blur-md bg-black/20 border-b border-white/[0.06]">
        <button
          onClick={() => handleNavClick('hero')}
          data-cursor="hover"
          className="flex items-center gap-2 text-sm font-medium tracking-wide text-cyber-text hover:opacity-80 transition-opacity"
        >
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold chrome-text bg-white/5 border border-white/10">
            DM
          </span>
          <span className="hidden sm:inline">Divyam Mishra</span>
        </button>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <div key={item.id} className="group">
              <HoverLink
                label={item.label}
                isActive={activeSection === item.id}
                onClick={() => handleNavClick(item.id)}
              />
            </div>
          ))}
        </nav>

        <button
          onClick={() => setNavOpen(!navOpen)}
          data-cursor="hover"
          className="lg:hidden text-cyber-text/80 text-xs font-medium border border-white/10 px-3 py-1.5 rounded-full"
        >
          {navOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {navOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-[64px] left-0 right-0 z-30 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-5 text-center lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="py-1.5 text-sm text-cyber-text/80 hover:text-cyber-cyan"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </>
  );
}
