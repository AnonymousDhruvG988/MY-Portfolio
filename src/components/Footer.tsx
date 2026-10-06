import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-14 border-t border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-sans text-xs text-slate-500 dark:text-white/50">
          {/* Left: Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="font-bold text-slate-900 dark:text-white tracking-tight">
              {PORTFOLIO_DATA.name}
            </span>
            <span className="hidden sm:inline text-slate-300 dark:opacity-30">•</span>
            <span className="text-slate-600 dark:text-white/60">B.Tech Student & Offensive Security Explorer</span>
          </div>

          {/* Center / Right: Technical Status */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-slate-600 dark:text-white/70">Engineered with Modern Translucent Glass & Spatial Design.</span>
            <span className="text-slate-300 dark:opacity-30">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Ecosystem: Online
            </span>
            <span className="text-slate-300 dark:opacity-30">•</span>
            <span className="text-accent-blue dark:text-accent-cyan font-mono text-[11px]">
              28.61° N, 77.20° E
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
