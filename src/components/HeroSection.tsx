import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HeroCoreVisualization } from './HeroCoreVisualization';
import { audioSystem } from '../utils/audioSystem';
import { ArrowDownRight, Shield, Terminal, ArrowUpRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Interactive Digital Canvas */}
      <HeroCoreVisualization />

      {/* Decorative Technical Grid Overlay */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Metadata Stream */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-[11px] text-text-muted border-b border-border-subtle/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
            <span className="text-text-secondary tracking-widest uppercase">
              {PORTFOLIO_DATA.hero.systemTag}
            </span>
          </div>
          <div className="flex items-center gap-4 text-text-muted/80">
            <span className="hidden sm:inline">LOC: {PORTFOLIO_DATA.education.location}</span>
            <span>CORE: ACTIVE</span>
            <span className="text-accent-mint">MODE: CURIOUS_BUILDER</span>
          </div>
        </div>

        {/* Main Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Title & Statements (Left 8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Massive Cinematic Editorial Headline */}
            <h1 className="font-display font-black text-5xl sm:text-7xl xl:text-8xl tracking-tighter text-text-primary leading-[0.95] mb-6">
              <span className="block text-text-primary">{PORTFOLIO_DATA.hero.mainTitleLine1}</span>
              <span className="block text-text-secondary hover:text-accent-mint transition-colors duration-300">
                {PORTFOLIO_DATA.hero.mainTitleLine2}
              </span>
              <span className="block text-accent-mint glitch-hover cursor-default">
                {PORTFOLIO_DATA.hero.mainTitleLine3}
              </span>
            </h1>

            {/* Sub-identity Badge Row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-3 py-1 font-mono text-xs text-text-primary bg-bg-surface border border-border-bright rounded">
                B.Tech Student
              </span>
              <span className="px-3 py-1 font-mono text-xs text-accent-mint bg-accent-mint/10 border border-accent-mint/30 rounded">
                Python • HTML • SQL
              </span>
              <span className="px-3 py-1 font-mono text-xs text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/30 rounded flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-accent-cyan" />
                Kali Linux & Offensive Lab
              </span>
            </div>

            {/* Core Philosophy Paragraph */}
            <p className="max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed mb-8 font-normal">
              I enjoy learning unfamiliar systems, understanding how they work from the protocol level up, and turning that knowledge into software people can actually use.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                data-cursor="pointer"
                onMouseEnter={() => audioSystem.playHover()}
                onClick={() => audioSystem.playClick()}
                className="group relative inline-flex items-center gap-2 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-bg-void bg-accent-mint hover:bg-accent-mint/90 rounded transition-all duration-200 shadow-[0_0_20px_rgba(124,255,178,0.3)] hover:shadow-[0_0_28px_rgba(124,255,178,0.5)]"
              >
                <span>[ EXPLORE WORK ]</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#offensive-lab"
                data-cursor="security"
                onMouseEnter={() => audioSystem.playHover()}
                onClick={() => audioSystem.playClick()}
                className="group inline-flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider text-text-primary bg-bg-surface/80 hover:bg-bg-elevated border border-border-bright hover:border-accent-crimson/50 rounded transition-all duration-200"
              >
                <Shield className="w-4 h-4 text-accent-crimson group-hover:animate-pulse" />
                <span>[ OFFENSIVE LAB ]</span>
              </a>

              <a
                href="#contact"
                data-cursor="pointer"
                onMouseEnter={() => audioSystem.playHover()}
                onClick={() => audioSystem.playClick()}
                className="group inline-flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary border border-border-subtle hover:border-accent-cyan/50 rounded transition-all duration-200"
              >
                <span>[ CONNECT ]</span>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Micro Telemetry Panel (Right 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="bracket-box bg-bg-surface/60 backdrop-blur-md border border-border-subtle p-5 rounded-sm">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-1.5 text-text-secondary font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-accent-mint" />
                  SYSTEM_TELEMETRY
                </span>
                <span className="text-[10px] text-accent-mint animate-pulse">LIVE</span>
              </div>

              {/* Monospace System Metadata Lines */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">SYSTEM:</span>
                  <span className="text-text-primary">DEV_PROFILE_v2.4</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">IDENTITY:</span>
                  <span className="text-accent-mint font-semibold">{PORTFOLIO_DATA.name}</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">STATUS:</span>
                  <span className="text-accent-mint flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-ping" />
                    EXPANDING / ACTIVE
                  </span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">PRIMARY:</span>
                  <span className="text-text-primary">PYTHON (Sockets/Scripts)</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">DATA:</span>
                  <span className="text-text-primary">SQL (Relational/CTEs)</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">WEB:</span>
                  <span className="text-text-primary">HTML5 / Modern Stack</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">OFFENSIVE:</span>
                  <span className="text-accent-crimson font-medium">KALI LINUX LAB</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">FOCUS:</span>
                  <span className="text-accent-cyan">WIRELESS & PROTOCOLS</span>
                </div>
              </div>

              {/* Visual Coordinate Ruler */}
              <div className="mt-5 pt-3 border-t border-border-subtle/60 flex items-center justify-between font-mono text-[9px] text-text-muted">
                <span>COORD: 28.6139° N</span>
                <span>77.2090° E</span>
                <span>BUILD: 2026.09</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Scroll Prompt */}
        <div className="mt-14 pt-4 border-t border-border-subtle/40 flex items-center justify-between font-mono text-xs text-text-muted">
          <div className="flex items-center gap-3">
            <span className="text-accent-mint font-bold">// 01</span>
            <span>EXPLORE DIGITAL WORKSPACE</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span>SCROLL TO TRAVERSE ENVIRONMENT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
