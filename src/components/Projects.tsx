'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import InteractiveHeading from './ui/InteractiveHeading';

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  gradient: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Airbnb Clone',
    description:
      'A full-stack property booking platform with authentication, listings, reviews, and booking management.',
    tags: ['Node.js', 'Express', 'MongoDB', 'EJS', 'CSS'],
    githubUrl: 'https://github.com/divyam-mishra',
    liveUrl: '#',
    image: '/projects/Airbnb.png',
    gradient: 'radial-gradient(120% 140% at 25% 15%, #7c3aed 0%, #0d0817 65%)',
    accent: '#a78bfa',
  },
  {
    title: 'Portfolio Website',
    description:
      'A premium personal portfolio built using Next.js, TypeScript, Framer Motion, and Three.js.',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Three.js'],
    githubUrl: 'https://github.com/divyam-mishra',
    liveUrl: '#',
    image: '/projects/Portfolio.jpeg',
    gradient: 'radial-gradient(120% 140% at 75% 15%, #ec4899 0%, #0d0817 65%)',
    accent: '#ec4899',
  },
  {
    title: 'SIF Precursor Detection',
    description:
      "An AI/NLP system that analyzes OIL's safety reports to detect Serious Injury & Fatality (SIF) precursors, extracting relationships between unsafe acts, conditions, and near-misses into structured insights. Built for Smart India Hackathon 2026 (SIH26165) by team NeuroNexus — the extraction pipeline is developed and tested.",
    tags: ['AI/ML', 'NLP', 'Intelligent Systems', 'SIH26165', 'Team NeuroNexus'],
    githubUrl: 'https://github.com/divyam-mishra',
    liveUrl: '#',
    image: '/projects/Precursor_Detection.png',
    gradient: 'radial-gradient(120% 140% at 50% 20%, #d946ef 0%, #0d0817 65%)',
    accent: '#d946ef',
  },
  {
    title: 'Farm2Door',
    description:
      'A full-stack farm-to-consumer marketplace connecting farmers directly with nearby customers, with secure payments and location-based discovery.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'Google Maps API'],
    githubUrl: 'https://github.com/divyam-mishra',
    liveUrl: '#',
    image: '/projects/Farm2Door.png',
    gradient: 'radial-gradient(120% 140% at 40% 15%, #7c3aed 0%, #0d0817 65%)',
    accent: '#7c3aed',
  },
];

/**
 * All cards live in ONE shared tall container and share a single scroll
 * container, targeting a common `top` value — this is what makes them
 * genuinely overlap (card N+1 slides up to the same pinned spot while card N
 * is still sticky there), rather than each card getting its own independent
 * scroll region and simply replacing the last one after it has already
 * scrolled away. z-index + a slight upward drift + scale/opacity/blur on the
 * receding card is what sells the "previous stays partially visible
 * underneath" read.
 */
function StackedProjectCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const isLast = index === total - 1;
  const ownStart = index / total;
  const ownEnd = (index + 1) / total;
  const recedeEnd = Math.min((index + 1.8) / total, 1);

  const scale = useTransform(
    scrollYProgress,
    [ownStart, ownEnd, recedeEnd],
    [1, 1, isLast ? 1 : 0.8]
  );
  const opacity = useTransform(
    scrollYProgress,
    [ownStart, ownEnd, recedeEnd],
    [1, 1, isLast ? 1 : 0.55]
  );
  const y = useTransform(
    scrollYProgress,
    [ownStart, ownEnd, recedeEnd],
    [40, 0, isLast ? 0 : -90]
  );
  const blurPx = useTransform(
    scrollYProgress,
    [ownStart, ownEnd, recedeEnd],
    [0, 0, isLast ? 0 : 4]
  );
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  // Text needs to disappear much faster than the card's silhouette does —
  // otherwise the receding card's title/tags ghost behind the new card's
  // own text at the same screen position, which reads as a legibility bug
  // rather than depth. The gradient panel (no text) can recede slowly and
  // still look intentional; the text panel can't.
  const textFadeEnd = ownEnd + (recedeEnd - ownEnd) * 0.4;
  const textOpacity = useTransform(scrollYProgress, [ownStart, ownEnd, textFadeEnd], [1, 1, isLast ? 1 : 0]);
  const textBlurPx = useTransform(scrollYProgress, [ownStart, ownEnd, textFadeEnd], [0, 0, isLast ? 0 : 10]);
  const textFilter = useMotionTemplate`blur(${textBlurPx}px)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x: px, y: py });
    setRotate({ x: -(py / 100 - 0.5) * 3, y: (px / 100 - 0.5) * 3 });
  };

  return (
    <div
      className="sticky top-[10vh] h-[80vh] flex items-center justify-center px-6 md:px-12"
      style={{ zIndex: index + 1 }}
    >
      <motion.div style={{ scale, opacity, y, filter }} className="w-full max-w-4xl">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setRotate({ x: 0, y: 0 })}
          data-cursor="hover"
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          style={{ perspective: 1200 }}
        >
          <motion.div
            animate={{ rotateX: rotate.x, rotateY: rotate.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            {/* Visual identity panel — the real project image, object-cover so
                it fills the frame with no stretching/distortion (cropped to
                fit rather than squashed), on a matching gradient backdrop
                that shows through while it loads. */}
            <div className="relative h-[36vh] md:h-[40vh]" style={{ background: project.gradient }}>
              <Image
                src={project.image}
                alt={`${project.title} cover`}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority={index === 0}
              />
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(280px circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.25), transparent 60%)`,
                }}
              />
              {/* Scrim guarantees the index label reads regardless of how
                  bright the underlying photo is. */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              <span className="absolute bottom-6 left-8 text-[13px] uppercase tracking-[0.2em] text-white/80">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* Content panel — built directly rather than via .glass-panel to
                avoid that global class's all-sides border fighting the
                border-t-0 override (Tailwind v4 utility layers sit below
                unlayered custom CSS in the cascade, so utilities can't win
                that fight). Text fades on its own faster curve (see
                textOpacity/textFilter above) so it never ghosts behind the
                next card's own text. */}
            <motion.div
              style={{ opacity: textOpacity, filter: textFilter }}
              className="bg-[rgba(19,13,31,0.9)] backdrop-blur-xl border border-white/10 border-t-0 p-8 md:p-10"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-cyber-text mb-3">
                {project.title}
              </h3>
              <p className="text-sm md:text-base text-cyber-text/65 leading-relaxed mb-6 max-w-2xl font-light">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] rounded-full border text-cyber-text/70"
                    style={{ borderColor: `${project.accent}40` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 max-w-sm">
                <MagneticButton
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-full text-cyber-text/80 hover:border-white/30 transition-all text-xs"
                >
                  <GitBranch className="w-4 h-4" />
                  Code
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-black transition-opacity hover:opacity-90 text-xs font-medium"
                  style={{ background: project.accent }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" className="relative w-full pt-28 pb-12 z-10 border-t border-cyber-cyan/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center mb-6 text-center">
        <InteractiveHeading text="Projects" className="text-3xl md:text-5xl font-semibold mb-3" />
        <p className="text-sm text-cyber-text/50">
          Things I&rsquo;ve built while learning and experimenting — keep scrolling.
        </p>
      </div>

      <div ref={containerRef} className="relative" style={{ height: `${PROJECTS.length * 100}vh` }}>
        {PROJECTS.map((project, i) => (
          <StackedProjectCard
            key={project.title}
            project={project}
            index={i}
            total={PROJECTS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
