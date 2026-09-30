import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 bg-bg-void border-t border-border-subtle/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-text-muted">
          {/* Left: Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-bold text-text-primary tracking-wider">
              {PORTFOLIO_DATA.name.toUpperCase()}
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span>B.Tech Student · Developer · Lifelong Learner</span>
          </div>

          {/* Center / Right: Technical Status */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="text-text-secondary">BUILT WITH CURIOSITY.</span>
            <span className="opacity-40">•</span>
            <span className="text-accent-mint flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
              SYSTEM STATUS: ONLINE
            </span>
            <span className="opacity-40">•</span>
            <span className="text-accent-cyan">
              LEARNING: ACTIVE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
