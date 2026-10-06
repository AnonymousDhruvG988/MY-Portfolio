import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HeroCoreVisualization } from './HeroCoreVisualization';
import { audioSystem } from '../utils/audioSystem';
import { Shield, ArrowRight, Flame, Terminal, Activity, Wifi, Database } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[96vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Dynamic Canvas Particle Core */}
      <HeroCoreVisualization />

      {/* Aurora Refraction Lighting Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-blue/15 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-accent-cyan/15 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-accent-mint/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Foreground Grid & Glass Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top System Status Bar Tag */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
            <span className="font-sans text-xs font-semibold text-slate-600 dark:text-white/70 tracking-tight">
              Developer Identity // Security & Systems
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-sans text-slate-500 dark:text-white/50">
            <span>CORE: ONLINE</span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span>SYSTEM: 100% HEALTH</span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span className="text-accent-blue dark:text-accent-cyan font-mono">28.6139° N, 77.2090° E</span>
          </div>
        </div>

        {/* Main Composition: Editorial Headline (Left 7 cols) & Control Center Widgets (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Bold Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* System Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 w-fit mb-6 border border-slate-300/80 dark:border-white/10">
              <Flame className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
              <span className="font-sans text-xs font-semibold text-slate-800 dark:text-white/90">
                B.Tech Student & Offensive Security Explorer
              </span>
            </div>

            {/* Massive Headline with Refraction */}
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl xl:text-8xl tracking-tight text-slate-900 dark:text-white leading-[0.95] mb-6">
              <span className="block text-slate-900 dark:text-white/90">{PORTFOLIO_DATA.hero.mainTitleLine1}</span>
              <span className="block text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">
                {PORTFOLIO_DATA.hero.mainTitleLine2}
              </span>
              <span className="block bg-gradient-to-r from-accent-cyan via-accent-mint to-accent-blue bg-clip-text text-transparent">
                {PORTFOLIO_DATA.hero.mainTitleLine3}
              </span>
            </h1>

            {/* Subtext */}
            <p className="max-w-xl text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans leading-relaxed mb-8 font-normal">
              I enjoy learning unfamiliar systems, understanding how network packets and databases function beneath the interface, and engineering software people can rely on.
            </p>

            {/* Translucent Capsule Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#work"
                onMouseEnter={() => audioSystem.playHover()}
                onClick={() => audioSystem.playClick()}
                className="group px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-white/95 text-white dark:text-black font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-[0_4px_16px_rgba(15,23,42,0.25)] dark:shadow-[0_0_30px_rgba(255,255,255,0.4)] ios-pressable"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#offensive-lab"
                onMouseEnter={() => audioSystem.playHover()}
                onClick={() => audioSystem.playClick()}
                className="group px-6 py-3.5 rounded-full liquid-glass hover:liquid-glass-elevated text-slate-800 dark:text-white font-sans font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 border border-slate-300 dark:border-white/20 ios-pressable"
              >
                <Shield className="w-4 h-4 text-accent-crimson group-hover:scale-110 transition-transform" />
                <span>Offensive Lab</span>
              </a>

              <a
                href="#contact"
                onMouseEnter={() => audioSystem.playHover()}
                onClick={() => audioSystem.playClick()}
                className="px-5 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-950 dark:text-white/80 dark:hover:text-white font-sans text-xs tracking-wider transition-all border border-slate-200 dark:border-white/10 ios-pressable"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right Column: Control Center Modular Glass Widgets */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Master Control Center Container */}
            <div className="liquid-glass p-6 sm:p-7 rounded-[32px] border border-slate-200 dark:border-white/[0.16] shadow-2xl relative overflow-hidden frosted-squircle">
              {/* Top Bar of Widget */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full glass-traffic-red" />
                    <span className="w-2.5 h-2.5 rounded-full glass-traffic-yellow" />
                    <span className="w-2.5 h-2.5 rounded-full glass-traffic-green" />
                  </div>
                  <span className="font-sans text-xs font-bold text-slate-900 dark:text-white ml-2">
                    Control Center // Telemetry Core
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-accent-blue dark:text-accent-cyan border border-slate-200 dark:border-white/10">
                  SYSTEM_ACTIVE
                </span>
              </div>

              {/* Modular 2x2 Widget Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Widget 1: Identity & Degree */}
                <div 
                  onMouseEnter={() => audioSystem.playHover()}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 hover:border-accent-cyan/40 hover:bg-white dark:hover:bg-white/[0.09] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1),0_0_15px_rgba(100,210,255,0.18)] transition-all duration-300 cursor-pointer group/tile"
                >
                  <div className="w-7 h-7 rounded-xl bg-accent-blue/15 text-accent-blue flex items-center justify-center mb-2 group-hover/tile:scale-110 transition-transform">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-white/50 uppercase">PROGRAM</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">B.Tech Student</div>
                  <div className="text-[11px] text-accent-blue dark:text-accent-cyan mt-1">Computer Science</div>
                </div>

                {/* Widget 2: Offensive Security Hub */}
                <div 
                  onMouseEnter={() => audioSystem.playHover()}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 hover:border-accent-crimson/40 hover:bg-white dark:hover:bg-white/[0.09] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1),0_0_15px_rgba(255,69,58,0.18)] transition-all duration-300 cursor-pointer group/tile"
                >
                  <div className="w-7 h-7 rounded-xl bg-accent-crimson/15 text-accent-crimson flex items-center justify-center mb-2 group-hover/tile:scale-110 transition-transform">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-white/50 uppercase">SECURITY LAB</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Kali Linux Suite</div>
                  <div className="text-[11px] text-emerald-600 dark:text-accent-mint mt-1">Airmon • Hashcat</div>
                </div>

                {/* Widget 3: Languages & Data */}
                <div 
                  onMouseEnter={() => audioSystem.playHover()}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 hover:border-accent-mint/40 hover:bg-white dark:hover:bg-white/[0.09] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1),0_0_15px_rgba(99,230,226,0.18)] transition-all duration-300 cursor-pointer group/tile"
                >
                  <div className="w-7 h-7 rounded-xl bg-accent-mint/20 text-teal-600 dark:text-accent-mint flex items-center justify-center mb-2 group-hover/tile:scale-110 transition-transform">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-white/50 uppercase">LANGUAGES</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Python & HTML</div>
                  <div className="text-[11px] text-slate-600 dark:text-white/70 mt-1">Sockets • Scripts</div>
                </div>

                {/* Widget 4: Database Systems */}
                <div 
                  onMouseEnter={() => audioSystem.playHover()}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 hover:border-accent-amber/40 hover:bg-white dark:hover:bg-white/[0.09] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1),0_0_15px_rgba(255,159,10,0.18)] transition-all duration-300 cursor-pointer group/tile"
                >
                  <div className="w-7 h-7 rounded-xl bg-accent-amber/20 text-amber-600 dark:text-accent-amber flex items-center justify-center mb-2 group-hover/tile:scale-110 transition-transform">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] font-sans font-medium text-slate-500 dark:text-white/50 uppercase">DATA SYSTEMS</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Relational SQL</div>
                  <div className="text-[11px] text-amber-600 dark:text-accent-amber mt-1">Queries • Indexes</div>
                </div>
              </div>

              {/* Bottom Quick Status Strip */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-accent-cyan/15 via-accent-blue/15 to-accent-mint/15 border border-slate-200 dark:border-white/10 flex items-center justify-between font-sans text-xs">
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
                  <span className="text-slate-700 dark:text-white/80">Wireless Frame Auditing:</span>
                  <span className="text-emerald-600 dark:text-accent-mint font-semibold">Active</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-white/50">802.11i</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
