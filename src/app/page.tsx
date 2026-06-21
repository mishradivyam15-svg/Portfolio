'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, ExternalLink, GitBranch, Heart } from 'lucide-react';

import Hero from '@/components/Hero';
import About from '@/components/About';
import SkillsSphere from '@/components/SkillsSphere';
import Projects from '@/components/Projects';
import GateJourney from '@/components/GateJourney';
import AIAssistant from '@/components/AIAssistant';
import Timeline from '@/components/Timeline';
import Blog from '@/components/Blog';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';
import { useAppStore } from '@/lib/store';

const NAV_ITEMS = [
  { label: 'HOME', id: 'hero' },
  { label: 'ABOUT', id: 'about' },
  { label: 'SKILLS', id: 'skills-section' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'GATE JOURNEY', id: 'gate-journey' },
  { label: 'AI LAB', id: 'ai-assistant' },
  { label: 'BLOG', id: 'blog' },
  { label: 'CONTACT', id: 'contact' }
];

export default function Page() {
  const { activeSection, setActiveSection, visitorCount, setVisitorCount } =
    useAppStore();

  const [navOpen, setNavOpen] = useState(false);

  // Track visitors
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const postRes = await axios.post('/api/analytics');
        if (postRes.data.success) {
          setVisitorCount(postRes.data.count);
        }
      } catch (e) {
        console.error('Analytics offline:', e);
        try {
          const getRes = await axios.get('/api/analytics');
          setVisitorCount(getRes.data.count);
        } catch (_) {}
      }
    };

    trackVisitor();
  }, [setVisitorCount]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);

        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const handleNavClick = (id: string) => {
    setNavOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md border-b border-cyber-cyan/15 px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 cursor-pointer font-mono font-black text-cyber-cyan tracking-widest text-sm sm:text-base hover:opacity-85"
        >
          <Cpu className="w-5 h-5 text-cyber-pink animate-pulse" />
          <span>DIVYAM.exe</span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs font-bold">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-2.5 py-1 tracking-widest transition-colors uppercase hover:text-cyber-cyan ${
                  isActive ? 'text-cyber-cyan' : 'text-cyber-text/65'
                }`}
              >
                {item.label}

                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyber-pink shadow-[0_0_8px_#ff007f]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* STATUS */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-cyber-cyan/70 border border-cyber-cyan/25 px-2.5 py-1 rounded bg-black/45">
          <Terminal className="w-3.5 h-3.5" />
          <span>BUILD STATUS:</span>
          <span className="font-bold text-cyber-cyan glow-text-primary">
            ACTIVE
          </span>
        </div>

        {/* MOBILE MENU */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="lg:hidden text-cyber-text/80 hover:text-cyber-cyan font-mono text-xs font-bold border border-cyber-cyan/20 px-3 py-1.5 rounded"
        >
          {navOpen ? 'CLOSE' : 'MENU'}
        </button>
      </header>

      {/* MOBILE NAV */}
      {navOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-[60px] left-0 right-0 z-35 bg-black/95 border-b border-cyber-cyan/25 p-6 flex flex-col gap-4 font-mono text-xs text-center font-bold lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="py-2.5 tracking-widest text-cyber-text/85 hover:text-cyber-cyan uppercase"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <Hero />
        <About />

        {/* SKILLS */}
        <section
          id="skills-section"
          className="relative w-full py-24 px-6 md:px-12 z-10 border-t border-cyber-cyan/10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-black mb-2 text-cyber-cyan">
                Tech Arsenal
              </h2>

              <p className="text-xs md:text-sm font-mono text-cyber-text/50 tracking-widest">
                Technologies I build and solve with
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <SkillsSphere />
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="glass-panel p-6 rounded-lg border border-cyber-cyan/20 bg-black/45">
                  <div className="flex items-center gap-2 text-cyber-cyan mb-4">
                    <Shield className="w-5 h-5 text-cyber-pink" />
                    <h3 className="font-mono text-xs uppercase tracking-widest font-bold">
                      Skill Overview
                    </h3>
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-cyber-text/85 leading-relaxed mb-6">
                    A visual map of the tools and technologies I’ve worked with
                    while building full-stack applications, solving DSA problems,
                    and preparing for GATE.
                  </p>

                  <div className="space-y-4">
                    {[
                      ['Backend & Systems', '90%'],
                      ['Databases', '85%'],
                      ['DevOps & Cloud', '75%']
                    ].map(([label, percent]) => (
                      <div key={label}>
                        <div className="flex justify-between font-mono text-[10px] uppercase text-cyber-text/65 mb-1.5">
                          <span>{label}</span>
                          <span className="text-cyber-cyan font-bold">
                            {percent}
                          </span>
                        </div>

                        <div className="h-1.5 bg-cyber-dark-lighter border border-cyber-cyan/15 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyber-cyan rounded-full"
                            style={{ width: percent }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Projects />
        <GateJourney />
        <AIAssistant />
        <Timeline />
        <Blog />
        <Stats />
        <Contact />
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 w-full bg-black/90 border-t border-cyber-cyan/15 py-12 px-6 md:px-12 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono font-black text-cyber-cyan tracking-widest text-sm">
              <Cpu className="w-4 h-4 text-cyber-pink" />
              <span>Divyam Mishra • Portfolio 2026</span>
            </div>

            <p className="font-mono text-[10px] text-cyber-text/50 uppercase">
              Building toward IIT Kharagpur, one problem at a time.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyber-text/45 uppercase">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-cyber-pink fill-current animate-pulse" />
            <span>TypeScript • Next.js</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-cyber-cyan">
            <a
              href="https://github.com/divyam-mishra"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyber-pink flex items-center gap-1"
            >
              GitHub <GitBranch className="w-3.5 h-3.5" />
            </a>

            <a
              href="#hero"
              className="hover:text-cyber-pink flex items-center gap-1"
            >
              Top <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}