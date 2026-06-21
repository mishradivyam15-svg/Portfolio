'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Code,
  Target,
  Brain,
  ArrowRight,
} from 'lucide-react';
import GlowCard from './ui/GlowCard';
import Reveal from './ui/Reveal';

interface TimelineGroup {
  period: string;
  type: 'PAST' | 'CURRENT' | 'FUTURE';
  items: {
    title: string;
    description: string;
    details: string;
    icon: React.ReactNode;
  }[];
}

const TIMELINE_GROUPS: TimelineGroup[] = [
  {
    period: 'Past (2024 - 2025)',
    type: 'PAST',
    items: [
      {
        title: 'Started B.Tech CSE',
        description:
          'Began my computer science journey and built strong programming foundations.',
        details:
          'Focused on C++, logic building, and core problem-solving.',
        icon: <GraduationCap className="w-5 h-5 text-cyber-cyan" />,
      },
      {
        title: 'Built Full Stack Projects',
        description:
          'Learned backend and frontend development by building real systems.',
        details:
          'Worked with Node.js, Express, MongoDB, MySQL, and Next.js.',
        icon: <Code className="w-5 h-5 text-cyber-cyan" />,
      },
    ],
  },
  {
    period: 'Current (2026)',
    type: 'CURRENT',
    items: [
      {
        title: 'Preparing for GATE 2027',
        description:
          'Strengthening CS fundamentals and improving technical depth.',
        details:
          'Focused heavily on DSA, systems thinking, and consistency.',
        icon: <Target className="w-5 h-5 text-cyber-cyan" />,
      },
      {
        title: 'Competitive Programming',
        description:
          'Sharpening speed, optimization, and problem-solving ability.',
        details:
          'Active LeetCode and Codeforces practice.',
        icon: <Code className="w-5 h-5 text-cyber-cyan" />,
      },
      {
        title: 'Learning DevOps',
        description:
          'Building deployment knowledge and infrastructure understanding.',
        details:
          'Docker, Redis, Nginx, AWS EC2.',
        icon: <Brain className="w-5 h-5 text-cyber-cyan" />,
      },
    ],
  },
  {
    period: 'Future (2027+)',
    type: 'FUTURE',
    items: [
      {
        title: 'Crack GATE 2027',
        description:
          'Secure a strong rank and get into IIT Kharagpur.',
        details:
          'Targeting advanced CS specialization.',
        icon: <Target className="w-5 h-5 text-cyber-pink" />,
      },
      {
        title: 'M.Tech in AI/ML',
        description:
          'Deep specialization into machine learning and intelligent systems.',
        details:
          'Research-focused advanced learning.',
        icon: <Brain className="w-5 h-5 text-cyber-pink" />,
      },
      {
        title: 'AI Research Career',
        description:
          'Work on impactful AI systems and global-scale opportunities.',
        details:
          'Long-term goal: AI research + advanced engineering.',
        icon: <GraduationCap className="w-5 h-5 text-cyber-pink" />,
      },
    ],
  },
];

export default function Timeline() {
  return (
    <Reveal>
      <section
        id="timeline"
        className="relative w-full py-24 px-6 md:px-12 z-10 border-t border-cyber-cyan/10"
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-2 text-cyber-cyan">
              My Timeline
            </h2>

            <p className="text-xs md:text-sm font-mono text-cyber-text/50 uppercase tracking-widest">
              How I started, where I am, and where I’m headed
            </p>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {TIMELINE_GROUPS.map((group, groupIdx) => (
              <motion.div
                key={groupIdx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: groupIdx * 0.2,
                }}
                viewport={{ once: false }}
                className="flex flex-col gap-6"
              >
                {/* Group Header */}
                <div className="flex items-center gap-3 border-b border-cyber-cyan/20 pb-4">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      group.type === 'FUTURE'
                        ? 'bg-cyber-pink'
                        : 'bg-cyber-cyan'
                    }`}
                  />

                  <h3 className="font-bold font-mono text-sm uppercase tracking-wider text-cyber-text">
                    {group.period}
                  </h3>
                </div>

                {/* Items */}
                <div className="space-y-6">
                  {group.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.15,
                      }}
                    >
                      <GlowCard
                        className={`border-l-4 ${
                          group.type === 'FUTURE'
                            ? 'border-l-cyber-pink'
                            : 'border-l-cyber-cyan'
                        }`}
                      >
                        <div className="flex items-start gap-4">

                          <div
                            className={`p-2 border rounded bg-black/45 shrink-0 ${
                              group.type === 'FUTURE'
                                ? 'border-cyber-pink/35 text-cyber-pink'
                                : 'border-cyber-cyan/35 text-cyber-cyan'
                            }`}
                          >
                            {item.icon}
                          </div>

                          <div>
                            <h4 className="font-bold text-cyber-text text-sm sm:text-base mb-2">
                              {item.title}
                            </h4>

                            <p className="text-xs font-mono text-cyber-text/70 leading-relaxed mb-3">
                              {item.description}
                            </p>

                            <div
                              className={`flex items-center gap-2 text-[10px] font-mono uppercase ${
                                group.type === 'FUTURE'
                                  ? 'text-cyber-pink/80'
                                  : 'text-cyber-cyan/80'
                              }`}
                            >
                              <ArrowRight className="w-3 h-3" />
                              {item.details}
                            </div>
                          </div>

                        </div>
                      </GlowCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </Reveal>
  );
}