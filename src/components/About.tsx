'use client';

import React, { useEffect, useState } from 'react';
import { Download, GraduationCap, Code2, Target } from 'lucide-react';
import GlowCard from './ui/GlowCard';
import Reveal from './ui/Reveal';

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
    <div className="flex flex-col items-center p-4 border border-cyber-cyan/15 rounded bg-black/45">
      <span className="text-2xl sm:text-3xl font-black font-mono text-cyber-cyan">
        {count}
        {suffix}
      </span>

      <span className="text-[10px] sm:text-xs font-mono uppercase text-cyber-text/60 mt-1">
        {label}
      </span>
    </div>
  );
}

export default function About() {

  return (
    <Reveal>
      <section
        id="about"
        className="relative w-full py-24 px-6 md:px-12 z-10 border-t border-cyber-cyan/10"
      >
        <div className="max-w-6xl mx-auto">

          {/* Section Title */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-2 text-cyber-cyan">
              About Me
            </h2>

            <p className="text-xs md:text-sm font-mono text-cyber-text/50 uppercase tracking-widest">
              My journey, goals, and what I build
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Card */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <GlowCard className="flex flex-col items-center text-center">

                {/* Avatar */}
                <div className="relative w-36 h-36 rounded-full border-2 border-cyber-cyan flex items-center justify-center bg-gradient-to-tr from-cyber-cyan/10 to-cyber-pink/10 mb-6">
                  <Code2 className="w-14 h-14 text-cyber-cyan" />
                </div>

                <h3 className="text-xl font-bold text-cyber-text uppercase tracking-wider mb-1">
                  Divyam Mishra
                </h3>

                <p className="text-xs font-mono text-cyber-cyan/80 mb-6 uppercase tracking-wider">
                  CSE Student • GATE 2027 Aspirant
                </p>

                <p className="text-sm font-mono text-cyber-text/75 leading-relaxed text-center mb-6">
                  Passionate about building scalable systems, solving DSA
                  problems, and exploring AI/ML. Currently working toward IIT
                  Kharagpur.
                </p>

                <a
                  href="/resume.pdf"
                  download="Divyam_Mishra_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-cyber-pink rounded font-mono font-bold uppercase text-xs tracking-wider text-cyber-pink hover:bg-cyber-pink/10 transition-all text-center"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </GlowCard>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <GlowCard className="flex-1">

                <h3 className="text-lg font-bold font-mono text-cyber-cyan uppercase tracking-wider mb-6">
                  My Focus
                </h3>

                <div className="space-y-4 text-sm sm:text-base font-mono text-cyber-text/85 leading-relaxed">
                  <p>
                    I’m a B.Tech Computer Science student focused on mastering
                    Data Structures, Algorithms, and Full Stack Development.
                  </p>

                  <p>
                    My current stack includes Node.js, Express.js, MongoDB,
                    MySQL, Docker, AWS, and modern frontend tools like React
                    and Next.js.
                  </p>

                  <p>
                    Alongside development, I’m preparing for GATE 2027 with the
                    goal of securing a top rank and pursuing advanced studies in
                    AI & Machine Learning.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <StatCounter value={250} suffix="+" label="DSA Problems" />
                  <StatCounter value={8} suffix="+" label="Core Skills" />
                  <StatCounter value={4} suffix="+" label="Major Projects" />
                  <StatCounter value={2027} label="Target Year" />
                </div>
              </GlowCard>

              {/* Bottom Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <GlowCard className="p-5 flex gap-4">
                  <GraduationCap className="w-10 h-10 text-cyber-cyan shrink-0" />

                  <div>
                    <h4 className="font-bold text-cyber-text uppercase tracking-wider">
                      Education
                    </h4>

                    <p className="text-xs font-mono text-cyber-cyan/75 mt-1">
                      B.Tech CSE @ MMMUT
                    </p>

                    <p className="text-xs font-mono text-cyber-text/50 mt-2">
                      Building strong foundations in algorithms, systems, and
                      software engineering.
                    </p>
                  </div>
                </GlowCard>

                <GlowCard className="p-5 flex gap-4">
                  <Target className="w-10 h-10 text-cyber-pink shrink-0" />

                  <div>
                    <h4 className="font-bold text-cyber-text uppercase tracking-wider">
                      Goal
                    </h4>

                    <p className="text-xs font-mono text-cyber-pink mt-1">
                      IIT Kharagpur • AI/ML
                    </p>

                    <p className="text-xs font-mono text-cyber-text/50 mt-2">
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