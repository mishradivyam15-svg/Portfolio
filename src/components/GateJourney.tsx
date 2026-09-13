'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Target } from 'lucide-react';
import GlowCard from './ui/GlowCard';
import Reveal from './ui/Reveal';
import InteractiveHeading from './ui/InteractiveHeading';

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
    description: 'Built strong foundations in problem-solving and algorithmic thinking.',
    details: ['Arrays, Linked Lists, Stacks, Queues', 'Trees and Graphs', 'Dynamic Programming', 'Recursion & Backtracking'],
  },
  {
    id: 'webdev',
    title: 'Full Stack Development',
    status: 'completed',
    completionRate: 92,
    description: 'Built real-world scalable web applications and backend systems.',
    details: ['HTML, CSS, JavaScript', 'Node.js & Express', 'MongoDB & MySQL', 'Next.js & TypeScript'],
  },
  {
    id: 'cp',
    title: 'Competitive Programming',
    status: 'in-progress',
    completionRate: 75,
    description: 'Improving speed, optimization, and problem-solving consistency.',
    details: ['LeetCode Practice', 'Codeforces Problem Solving', 'Greedy & Graph Problems', 'Advanced DP'],
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    status: 'planned',
    completionRate: 20,
    description: 'Future specialization after mastering system fundamentals.',
    details: ['Machine Learning Basics', 'Neural Networks', 'Deep Learning', 'Model Optimization'],
  },
];

export default function GateJourney() {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode>(ROADMAP_NODES[0]);

  return (
    <Reveal>
      <section id="gate-journey" className="relative w-full py-28 px-6 md:px-12 z-10 border-t border-cyber-cyan/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <InteractiveHeading text="GATE Journey" className="text-3xl md:text-5xl font-semibold mb-3" />
            <p className="text-sm text-cyber-text/50">My technical roadmap toward AI &amp; Research</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              {ROADMAP_NODES.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: false }}
                    onClick={() => setSelectedNode(node)}
                    data-cursor="hover"
                    className={`cursor-pointer p-5 rounded-2xl transition-all duration-300 border ${
                      isSelected
                        ? 'border-cyber-pink/40 bg-cyber-pink/[0.04]'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          {node.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-cyber-green" />}
                          {node.status === 'in-progress' && <Circle className="w-5 h-5 text-cyber-cyan animate-pulse" />}
                          {node.status === 'planned' && <Circle className="w-5 h-5 text-cyber-text/30" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-cyber-text text-sm sm:text-base">{node.title}</h3>
                          <p className="text-xs text-cyber-text/45 mt-1">{node.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-semibold text-cyber-cyan">{node.completionRate}%</span>
                        <div className="w-16 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${node.completionRate}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-cyber-cyan"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <GlowCard tilt>
                <div className="flex items-center gap-2 mb-4 text-cyber-pink">
                  <Target className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-medium">Current Focus</span>
                </div>

                <h3 className="text-xl font-semibold text-cyber-text mb-3">{selectedNode.title}</h3>
                <p className="text-sm text-cyber-text/60 mb-6">{selectedNode.description}</p>

                <ul className="space-y-3">
                  {selectedNode.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="text-xs text-cyber-text/70 flex items-start gap-2"
                    >
                      <span className="text-cyber-cyan">•</span>
                      {detail}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-cyber-text/40">Status</span>
                  <span className="text-cyber-cyan font-medium">{selectedNode.status}</span>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
