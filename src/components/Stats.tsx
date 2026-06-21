'use client';

import React from 'react';
import { Code, GitBranch, Target, Flame } from 'lucide-react';
import GlowCard from './ui/GlowCard';

interface StatBoxProps {
  title: string;
  value: string;
  subtitle: string;
}

function StatBox({ title, value, subtitle }: StatBoxProps) {
  return (
    <div className="border border-cyber-cyan/15 rounded-lg p-4 bg-black/40">
      <p className="text-xs font-mono uppercase text-cyber-text/50 mb-2">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-cyber-cyan mb-2">{value}</h3>

      <p className="text-xs font-mono text-cyber-text/65">{subtitle}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative w-full py-24 px-6 md:px-12 z-10 border-t border-cyber-cyan/10"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-2 text-cyber-cyan">
            Progress & Stats
          </h2>

          <p className="text-xs md:text-sm font-mono text-cyber-text/50 uppercase tracking-widest">
            A snapshot of my coding and learning journey
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <GlowCard>
            <div className="flex items-center gap-2 mb-4 text-cyber-cyan">
              <Code className="w-5 h-5" />
              <span className="font-mono text-xs uppercase font-bold">
                DSA Practice
              </span>
            </div>

            <StatBox
              title="Problems Solved"
              value="250+"
              subtitle="LeetCode + Practice Sets"
            />
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-4 text-cyber-cyan">
              <Target className="w-5 h-5" />
              <span className="font-mono text-xs uppercase font-bold">
                GATE Prep
              </span>
            </div>

            <StatBox
              title="Subjects Covered"
              value="4+"
              subtitle="DSA, Digital Logic, Math, Web"
            />
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-4 text-cyber-cyan">
              <GitBranch className="w-5 h-5" />
              <span className="font-mono text-xs uppercase font-bold">
                Projects
              </span>
            </div>

            <StatBox
              title="Projects Built"
              value="4+"
              subtitle="Full Stack + Portfolio + DSA Tools"
            />
          </GlowCard>

          <GlowCard>
            <div className="flex items-center gap-2 mb-4 text-cyber-cyan">
              <Flame className="w-5 h-5" />
              <span className="font-mono text-xs uppercase font-bold">
                Focus
              </span>
            </div>

            <StatBox
              title="Current Goal"
              value="GATE 2027"
              subtitle="Target: IIT Kharagpur"
            />
          </GlowCard>

        </div>
      </div>
    </section>
  );
}