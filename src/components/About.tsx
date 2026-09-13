'use client';

import React, { useEffect, useState } from 'react';
import { Download, GraduationCap, Code2, Target } from 'lucide-react';
import GlowCard from './ui/GlowCard';
import Reveal from './ui/Reveal';
import MagneticButton from './ui/MagneticButton';
import InteractiveHeading from './ui/InteractiveHeading';

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatCounter({ value, suffix = '', label }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <span className="text-2xl sm:text-3xl font-semibold chrome-text">
        {count}
        {suffix}
      </span>
      <span className="text-[11px] uppercase tracking-wider text-cyber-text/50 mt-1 text-center">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <Reveal>
      <section id="about" className="relative w-full py-28 px-6 md:px-12 z-10 border-t border-cyber-cyan/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <InteractiveHeading text="About" className="text-3xl md:text-5xl font-semibold mb-3" />
            <p className="text-sm text-cyber-text/50">My journey, goals, and what I build</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col gap-6">
              <GlowCard tilt className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-tr from-cyber-cyan/10 to-cyber-pink/10 mb-6">
                  <Code2 className="w-12 h-12 text-cyber-cyan" />
                </div>

                <h3 className="text-lg font-semibold text-cyber-text mb-1">Divyam Mishra</h3>
                <p className="text-xs text-cyber-cyan/80 mb-6 uppercase tracking-wider">
                  CSE Student · GATE 2027 Aspirant
                </p>

                <p className="text-sm text-cyber-text/65 leading-relaxed text-center mb-6">
                  Passionate about building scalable systems, solving DSA problems, and
                  exploring AI/ML. Currently working toward IIT Kharagpur.
                </p>

                <MagneticButton
                  as="a"
                  href="/resume.pdf"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-cyber-pink/50 font-medium text-xs uppercase tracking-wider text-cyber-pink hover:bg-cyber-pink/10 transition-all text-center"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </MagneticButton>
              </GlowCard>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-8">
              <GlowCard className="flex-1">
                <h3 className="text-base font-semibold text-cyber-cyan uppercase tracking-wider mb-6">
                  My Focus
                </h3>

                <div className="space-y-4 text-sm sm:text-base text-cyber-text/75 leading-relaxed font-light">
                  <p>
                    I&rsquo;m a B.Tech Computer Science student focused on mastering Data
                    Structures, Algorithms, and Full Stack Development.
                  </p>
                  <p>
                    My current stack includes Node.js, Express.js, MongoDB, MySQL, Python,
                    and modern frontend tools like React and Next.js.
                  </p>
                  <p>
                    Alongside development, I&rsquo;m preparing for GATE 2027 with the goal of
                    securing a top rank and pursuing advanced studies in AI &amp; Machine
                    Learning.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <StatCounter value={250} suffix="+" label="DSA Problems" />
                  <StatCounter value={8} suffix="+" label="Core Skills" />
                  <StatCounter value={4} suffix="+" label="Major Projects" />
                  <StatCounter value={2027} label="Target Year" />
                </div>
              </GlowCard>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlowCard className="p-5 flex gap-4">
                  <GraduationCap className="w-8 h-8 text-cyber-cyan shrink-0" />
                  <div>
                    <h4 className="font-semibold text-cyber-text">Education</h4>
                    <p className="text-xs text-cyber-cyan/75 mt-1">B.Tech CSE @ MMMUT</p>
                    <p className="text-xs text-cyber-text/45 mt-2">
                      Building strong foundations in algorithms, systems, and software
                      engineering.
                    </p>
                  </div>
                </GlowCard>

                <GlowCard className="p-5 flex gap-4">
                  <Target className="w-8 h-8 text-cyber-pink shrink-0" />
                  <div>
                    <h4 className="font-semibold text-cyber-text">Goal</h4>
                    <p className="text-xs text-cyber-pink mt-1">IIT Kharagpur · AI/ML</p>
                    <p className="text-xs text-cyber-text/45 mt-2">
                      Long-term goal: become an AI engineer and work on impactful
                      intelligent systems.
                    </p>
                  </div>
                </GlowCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
