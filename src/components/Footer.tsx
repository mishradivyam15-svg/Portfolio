'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/[0.06] py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="space-y-1">
          <div className="text-sm font-medium text-cyber-text">Divyam Mishra</div>
          <p className="text-xs text-cyber-text/45">
            Building toward IIT Kharagpur, one problem at a time.
          </p>
        </div>

        <div className="flex items-center gap-5 text-cyber-text/60">
          <a
            href="mailto:mishradivyam15@gmail.com"
            data-cursor="hover"
            aria-label="Email"
            className="hover:text-cyber-cyan transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/divyam-mishra-b0bb53363/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            aria-label="LinkedIn"
            className="hover:text-cyber-cyan transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/divyam-mishra"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            aria-label="GitHub"
            className="hover:text-cyber-cyan transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="text-[11px] font-mono uppercase tracking-widest text-cyber-text/30">
          © {new Date().getFullYear()} Divyam Mishra
        </div>
      </div>
    </footer>
  );
}
