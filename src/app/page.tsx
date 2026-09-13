'use client';

import React, { useEffect } from 'react';
import axios from 'axios';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SkillsBallPit from '@/components/SkillsBallPit';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import GateJourney from '@/components/GateJourney';
import AIAssistant from '@/components/AIAssistant';
import Contact from '@/components/Contact';
import { useAppStore } from '@/lib/store';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'timeline', 'gate-journey', 'ai-assistant', 'contact'];

export default function Page() {
  const { setActiveSection, setVisitorCount } = useAppStore();

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const postRes = await axios.post('/api/analytics');
        if (postRes.data.success) setVisitorCount(postRes.data.count);
      } catch {
        try {
          const getRes = await axios.get('/api/analytics');
          setVisitorCount(getRes.data.count);
        } catch {
          /* analytics unavailable, non-critical */
        }
      }
    };
    trackVisitor();
  }, [setVisitorCount]);

  useEffect(() => {
    // IntersectionObserver instead of a 'scroll' listener: the previous
    // version ran on every native scroll event — which Lenis fires
    // continuously while it's smoothing a scroll gesture, not just once per
    // user action — and did 8x `getElementById` + `offsetTop`/`offsetHeight`
    // reads each time. Those layout reads force a synchronous reflow
    // whenever the browser's layout is dirty (which scroll-linked Framer
    // Motion transforms elsewhere on this page make likely), so this was
    // real, measurable main-thread contention during every scroll — the
    // kind that stalls a frame long enough for physics (Skills' ball-pit)
    // to visibly jump when it catches up. An IntersectionObserver only
    // fires when a section actually crosses the viewport threshold, does no
    // layout reads at all, and costs nothing while scrolling within one
    // section.
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -40% 0px' } // active once a section is near the vertical center
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [setActiveSection]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col">
        <Hero />
        <About />
        <SkillsBallPit />
        <Projects />
        <Timeline />
        <GateJourney />
        <AIAssistant />
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
