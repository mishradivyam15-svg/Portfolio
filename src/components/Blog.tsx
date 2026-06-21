'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, BookOpen, ChevronRight } from 'lucide-react';
import GlowCard from './ui/GlowCard';

interface Article {
  title: string;
  category: 'GATE' | 'ALGORITHMS' | 'DEVOP_AI';
  date: string;
  readTime: string;
  snippet: string;
}

const ARTICLES: Article[] = [
  {
    title: 'Cracking GATE 2027: Syllabus Compilation Strategy',
    category: 'GATE',
    date: 'Jun 10, 2026',
    readTime: '6 min read',
    snippet: 'An overview of digital logic compilation rates, discrete mathematics, and database indexing methods to maximize examination scores.'
  },
  {
    title: 'C++ Memory Allocations and Dynamic Pointers',
    category: 'ALGORITHMS',
    date: 'May 28, 2026',
    readTime: '8 min read',
    snippet: 'Decompiling how assembly arrays read cache memory blocks and how to optimize algorithms by managing pointer alignments.'
  },
  {
    title: 'Containerizing Microservices with Docker and Redis',
    category: 'DEVOP_AI',
    date: 'May 14, 2026',
    readTime: '5 min read',
    snippet: 'Configuring Redis databases in localized Docker nodes, managing caching networks, and routing APIs using an Nginx proxy.'
  },
  {
    title: 'Discrete Mathematics: Graph Theory for CSE Aspirants',
    category: 'GATE',
    date: 'Apr 22, 2026',
    readTime: '9 min read',
    snippet: 'A deep dive into planar graphs, Euler path equations, tree traversals, and matrix multipliers targeted for GATE syllabus.'
  },
  {
    title: 'Neural Networks: Decoupling Activation Regressions',
    category: 'DEVOP_AI',
    date: 'Mar 18, 2026',
    readTime: '12 min read',
    snippet: 'Analyzing dynamic backpropagation matrices, optimizing weights regressions, and establishing classification maps.'
  }
];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'ALL' | 'GATE' | 'ALGORITHMS' | 'DEVOP_AI'>('ALL');

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
                          article.snippet.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'ALL' || article.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="relative w-full py-24 px-6 md:px-12 z-10 border-t border-cyber-cyan/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-2">
            [ <span className="text-cyber-cyan">DATAFEED_LOGS</span> ]
          </h2>
          <p className="text-xs md:text-sm font-mono text-cyber-text/50 uppercase tracking-widest">
            Engineering publications, academic logs, and technical notes
          </p>
        </div>

        {/* Search & Category Filter Controls Dashboard */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          
          {/* Categories Row */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['ALL', 'GATE', 'ALGORITHMS', 'DEVOP_AI'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat as any)}
                className={`px-4 py-2 border rounded font-mono text-xs uppercase transition-all select-none cursor-pointer ${
                  category === cat
                    ? 'border-cyber-pink bg-cyber-pink/5 text-cyber-pink shadow-[0_0_10px_rgba(255,0,127,0.15)]'
                    : 'border-cyber-cyan/25 bg-black/35 hover:border-cyber-cyan/65 text-cyber-text/80'
                }`}
              >
                {cat === 'DEVOP_AI' ? 'DevOps & AI' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-cyber-cyan/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search logs database..."
              className="w-full bg-black/45 border border-cyber-cyan/25 rounded pl-10 pr-4 py-2 font-mono text-xs sm:text-sm text-cyber-cyan placeholder-cyber-cyan/40 focus:outline-none focus:border-cyber-pink focus:shadow-[0_0_8px_rgba(255,0,127,0.15)] transition-colors"
            />
          </div>

        </div>

        {/* Article Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <GlowCard className="h-full flex flex-col justify-between hover:border-cyber-cyan/60 group">
                  <div className="space-y-4">
                    
                    {/* Header: Date, ReadTime and Category tag */}
                    <div className="flex items-center justify-between font-mono text-[10px] text-cyber-text/50 uppercase border-b border-cyber-cyan/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-cyber-cyan" /> {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyber-cyan" /> {article.readTime}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 border border-cyber-pink/25 text-cyber-pink bg-cyber-pink/5 rounded-sm">
                        {article.category}
                      </span>
                    </div>

                    {/* Article Details */}
                    <div>
                      <h3 className="text-lg font-bold uppercase text-cyber-text tracking-wide mb-2 group-hover:text-cyber-cyan transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-cyber-text/70 leading-relaxed">
                        {article.snippet}
                      </p>
                    </div>

                  </div>

                  {/* Read Article Link */}
                  <div className="mt-6 border-t border-cyber-cyan/10 pt-4 flex justify-between items-center text-xs font-mono text-cyber-cyan group-hover:text-cyber-pink transition-colors font-bold uppercase select-none cursor-pointer">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> Decrypt Data Log
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>

                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search State */}
        {filteredArticles.length === 0 && (
          <div className="text-center font-mono py-12 text-cyber-pink/75">
            [ SECURE DATABASE RETURNED NULL RECORDS - ZERO INDEX MATCHED ]
          </div>
        )}

      </div>
    </section>
  );
}
