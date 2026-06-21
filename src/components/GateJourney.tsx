'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Target } from 'lucide-react';
import GlowCard from './ui/GlowCard';
import Reveal from './ui/Reveal';

interface RoadmapNode {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  completionRate: number;
  description: string;
  details: string[];
}

const ROADMAP_NODES: RoadmapNode[] = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    status: 'completed',
    completionRate: 90,
    description:
      'Built strong foundations in problem-solving and algorithmic thinking.',
    details: [
      'Arrays, Linked Lists, Stacks, Queues',
      'Trees and Graphs',
      'Dynamic Programming',
      'Recursion & Backtracking',
    ],
  },
  {
    id: 'webdev',
    title: 'Full Stack Development',
    status: 'completed',
    completionRate: 92,
    description:
      'Built real-world scalable web applications and backend systems.',
    details: [
      'HTML, CSS, JavaScript',
      'Node.js & Express',
      'MongoDB & MySQL',
      'Next.js & TypeScript',
    ],
  },
  {
    id: 'cp',
    title: 'Competitive Programming',
    status: 'in-progress',
    completionRate: 75,
    description:
      'Improving speed, optimization, and problem-solving consistency.',
    details: [
      'LeetCode Practice',
      'Codeforces Problem Solving',
      'Greedy & Graph Problems',
      'Advanced DP',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Deployment',
    status: 'in-progress',
    completionRate: 55,
    description:
      'Learning infrastructure, deployment pipelines, and scaling.',
    details: [
      'Docker',
      'AWS EC2',
      'Nginx',
      'Redis',
    ],
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    status: 'planned',
    completionRate: 20,
    description:
      'Future specialization after mastering system fundamentals.',
    details: [
      'Machine Learning Basics',
      'Neural Networks',
      'Deep Learning',
      'Model Optimization',
    ],
  },
];

export default function GateJourney() {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode>(
    ROADMAP_NODES[0]
  );

  return (
    <Reveal>
      <section
        id="gate-journey"
        className="relative w-full py-24 px-6 md:px-12 z-10 border-t border-cyber-cyan/10"
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-2 text-cyber-cyan">
              Core Journey
            </h2>

            <p className="text-xs md:text-sm font-mono text-cyber-text/50 uppercase tracking-widest">
              My technical roadmap toward AI & Research
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Left Roadmap */}
            <div className="lg:col-span-2 space-y-4">
              {ROADMAP_NODES.map((node, index) => {
                const isSelected = selectedNode.id === node.id;

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.12,
                    }}
                    viewport={{ once: false }}
                    onClick={() => setSelectedNode(node)}
                    className={`cursor-pointer p-5 border rounded-lg transition-all duration-300 ${
                      isSelected
                        ? 'border-cyber-pink bg-cyber-pink/5 shadow-[0_0_18px_rgba(255,0,127,0.15)]'
                        : 'border-cyber-cyan/20 bg-black/30 hover:border-cyber-cyan/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">

                        <div>
                          {node.status === 'completed' && (
                            <CheckCircle2 className="w-6 h-6 text-cyber-green" />
                          )}

                          {node.status === 'in-progress' && (
                            <Circle className="w-6 h-6 text-cyber-cyan animate-pulse" />
                          )}

                          {node.status === 'planned' && (
                            <Circle className="w-6 h-6 text-cyber-text/40" />
                          )}
                        </div>

                        <div>
                          <h3 className="font-bold text-cyber-text text-sm sm:text-base">
                            {node.title}
                          </h3>

                          <p className="text-xs font-mono text-cyber-text/50 mt-1">
                            {node.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold font-mono text-cyber-cyan">
                          {node.completionRate}%
                        </span>

                        <div className="w-16 h-1 bg-cyber-dark-lighter rounded mt-1 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${node.completionRate}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: index * 0.15,
                            }}
                            className="h-full bg-cyber-cyan"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-1"
            >
              <GlowCard>
                <div className="flex items-center gap-2 mb-4 text-cyber-pink">
                  <Target className="w-5 h-5" />

                  <span className="font-mono text-xs uppercase tracking-widest font-bold">
                    Current Focus
                  </span>
                </div>

                <h3 className="text-xl font-bold text-cyber-text mb-3">
                  {selectedNode.title}
                </h3>

                <p className="text-sm font-mono text-cyber-text/70 mb-6">
                  {selectedNode.description}
                </p>

                <ul className="space-y-3">
                  {selectedNode.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="text-xs font-mono text-cyber-text/80 flex items-start gap-2"
                    >
                      <span className="text-cyber-cyan">•</span>
                      {detail}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 pt-4 border-t border-cyber-cyan/15 flex justify-between text-[10px] font-mono uppercase">
                  <span>Status</span>
                  <span className="text-cyber-cyan font-bold">
                    {selectedNode.status}
                  </span>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}