'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import GlowCard from './ui/GlowCard';
import Reveal from './ui/Reveal';
import ProjectModel from './ui/ProjectModules';

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  modelType: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Airbnb Clone',
    description:
      'A full-stack property booking platform with authentication, listings, reviews, and booking management.',
    tags: ['Node.js', 'Express', 'MongoDB', 'EJS', 'CSS'],
    githubUrl: 'https://github.com/divyam-mishra',
    liveUrl: '#',
    modelType: 'airbnb',
  },
  {
    title: 'Portfolio Website',
    description:
      'A futuristic personal portfolio built using Next.js, TypeScript, Framer Motion, and Three.js.',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Three.js'],
    githubUrl: 'https://github.com/divyam-mishra',
    liveUrl: '#',
    modelType: 'portfolio',
  },
  {
    title: 'DSA Tracker',
    description:
      'A progress tracker for coding practice, problem-solving streaks, and GATE preparation milestones.',
    tags: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/divyam-mishra',
    liveUrl: '#',
    modelType: 'dsa',
  },
];

export default function Projects() {
  return (
    <Reveal>
      <section
        id="projects"
        className="relative w-full py-24 px-6 md:px-12 z-10 border-t border-cyber-cyan/10"
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-2 text-cyber-cyan">
              Projects
            </h2>

            <p className="text-xs md:text-sm font-mono text-cyber-text/50 uppercase tracking-widest">
              Things I’ve built while learning and experimenting
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -80 : 80,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
              >
                <GlowCard className="h-full flex flex-col overflow-hidden group">

                  {/* 3D Model Banner */}
                  <div className="relative h-40 w-full bg-black/40 border-b border-cyber-cyan/10">
                    <ProjectModel type={project.modelType} />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-cyber-text mb-3 group-hover:text-cyber-cyan transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-sm font-mono text-cyber-text/70 leading-relaxed mb-5">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.08 }}
                          className="px-2 py-1 text-[10px] font-mono border border-cyber-cyan/20 text-cyber-cyan rounded"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-cyber-cyan/30 rounded text-cyber-text hover:text-cyber-pink hover:border-cyber-pink transition-all text-xs font-mono uppercase"
                      >
                        <GitBranch className="w-4 h-4" />
                        Code
                      </a>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-cyber-cyan/10 rounded text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all text-xs font-mono uppercase"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    </div>

                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}