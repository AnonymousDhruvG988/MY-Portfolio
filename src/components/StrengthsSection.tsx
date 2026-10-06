import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { Zap, Activity, Flame, CheckCircle2, ArrowRight, ChevronRight, Sparkles, BarChart2, ShieldCheck, Cpu } from 'lucide-react';

interface VectorMetric {
  name: string;
  level: number;
}

export const StrengthsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const vectorMetrics: Record<number, VectorMetric[]> = {
    0: [
      { name: 'Documentation Absorption', level: 96 },
      { name: 'Toolchain Ramp-up Speed', level: 98 },
      { name: 'Concept Synthesis', level: 94 },
    ],
    1: [
      { name: 'First-Principles Deconstruction', level: 99 },
      { name: 'Variable Isolation & Root Cause', level: 97 },
      { name: 'Systematic Debugging', level: 95 },
    ],
    2: [
      { name: '802.11 Frame / Packet Fidelity', level: 98 },
      { name: 'Low-Level Socket Architecture', level: 93 },
      { name: 'Raw Execution Plan Telemetry', level: 96 },
    ],
    3: [
      { name: 'Fault Tolerance & Resilience', level: 97 },
      { name: 'Trial-and-Error Iteration Velocity', level: 95 },
      { name: 'Prototype Delivery Drive', level: 98 },
    ],
    4: [
      { name: 'Ethical Sandbox Rigor', level: 100 },
      { name: 'Defensive Architecture Design', level: 96 },
      { name: 'Cryptographic Security Verification', level: 94 },
    ],
  };

  const handleSelectStrength = (idx: number) => {
    if (activeIdx !== idx) {
      setActiveIdx(idx);
      audioSystem.playHover();
    }
  };

  const currentStrength = PORTFOLIO_DATA.strengths[activeIdx];
  const currentMetrics = vectorMetrics[activeIdx] || vectorMetrics[0];

  return (
    <section id="strengths" className="relative py-28 overflow-hidden">
      {/* Background Soft Ambient Refractions */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 mb-3 border border-slate-300/80 dark:border-white/10">
              <Zap className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
              <span className="font-sans text-xs font-semibold text-slate-700 dark:text-white/80">
                Core Engineering Attributes
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight">
              Strengths
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-white/70 max-w-xl font-sans">
              Qualities over buzzwords. How I deconstruct difficult problems, handle errors, and ship functional software.
            </p>
          </div>

          <div className="font-sans text-xs text-slate-500 dark:text-white/50 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500 dark:text-accent-mint animate-pulse" />
            <span>INTERACTIVE ARCHITECTURAL TILES // HOVER OR CLICK TO PROJECT</span>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Left Timeline, Right Dynamic Side Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left Column: Strengths Interactive Sequence List (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {PORTFOLIO_DATA.strengths.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.number}
                  onMouseEnter={() => handleSelectStrength(idx)}
                  onClick={() => {
                    handleSelectStrength(idx);
                    audioSystem.playClick();
                  }}
                  className={`p-6 rounded-[28px] transition-all duration-300 cursor-pointer relative overflow-hidden group ios-pressable hover:-translate-y-1 hover:shadow-xl ${
                    isActive
                      ? 'liquid-glass-elevated border-accent-blue/60 dark:border-accent-cyan/70 shadow-[0_12px_36px_rgba(100,210,255,0.22)] ring-1 ring-accent-cyan/30'
                      : 'liquid-glass hover:bg-slate-50 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/30 border-slate-200 dark:border-white/10'
                  }`}
                >
                  {/* Active Card Subtle Connecting Gradient Beam */}
                  {isActive && (
                    <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-mint" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono text-sm font-bold transition-all shrink-0 ${
                        isActive
                          ? 'bg-gradient-to-tr from-accent-cyan to-accent-blue text-white shadow-[0_0_16px_rgba(100,210,255,0.5)] scale-105'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/60 group-hover:scale-102'
                      }`}>
                        {item.number}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-sans font-bold text-lg sm:text-2xl transition-colors tracking-tight ${
                            isActive ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-white/80 group-hover:text-slate-950 dark:group-hover:text-white'
                          }`}>
                            {item.title}
                          </h3>
                        </div>
                        <p className="font-sans text-xs text-slate-500 dark:text-white/50 mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-accent-blue dark:text-accent-cyan border border-slate-200 dark:border-white/10">
                        {item.signal}
                      </span>
                      {/* Directional projector pip pointing to side screen */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-accent-cyan/20 text-accent-cyan translate-x-0.5 opacity-100'
                          : 'text-slate-400 dark:text-white/20 opacity-0 group-hover:opacity-60'
                      }`}>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <p className={`mt-4 text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed pl-14 transition-all font-sans ${
                    isActive ? 'opacity-100' : 'opacity-80'
                  }`}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Responsive Side Screen (5 cols, sticky on desktop) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-7 sm:p-8 rounded-[36px] liquid-glass-elevated border border-slate-200 dark:border-white/20 shadow-2xl frosted-squircle relative overflow-hidden gpu-layer">
              {/* Dynamic Side Screen Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3.5 mb-5">
                <span className="flex items-center gap-2 text-slate-900 dark:text-white font-bold font-sans text-xs">
                  <Flame className="w-4 h-4 text-accent-blue dark:text-accent-cyan animate-pulse" />
                  Side Screen Telemetry // Vector 0{activeIdx + 1}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
                  <span className="text-accent-blue dark:text-accent-cyan font-mono text-xs font-semibold">
                    ACTIVE PROJECTOR
                  </span>
                </div>
              </div>

              {/* Animated Side Screen Content Container (Key-based transition on vector switch) */}
              <div key={activeIdx} className="animate-side-screen space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-[10px] text-accent-blue dark:text-accent-cyan uppercase font-bold tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Active Principle Vector
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-white/40">
                      0{activeIdx + 1} OF 05
                    </span>
                  </div>

                  <div className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight mb-1">
                    {currentStrength.title}
                  </div>

                  <div className="text-xs font-sans text-emerald-600 dark:text-accent-mint font-medium mb-4 flex items-center gap-1">
                    <span>//</span>
                    <span>{currentStrength.subtitle}</span>
                  </div>

                  {/* Core Statement Quote Card */}
                  <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-white/85 leading-relaxed font-sans shadow-inner relative">
                    <div className="absolute top-3 right-3 text-slate-300 dark:text-white/10 font-serif text-3xl select-none pointer-events-none">
                      ”
                    </div>
                    "{currentStrength.description}"
                  </div>
                </div>

                {/* Animated Attribute Vector Bars */}
                <div className="space-y-3 p-4 rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-between text-xs font-sans font-semibold text-slate-700 dark:text-white/80">
                    <span className="flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5 text-accent-cyan" />
                      Telemetry Vector Benchmark
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-white/40">CALIBRATED</span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {currentMetrics.map((metric) => (
                      <div key={metric.name} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-sans">
                          <span className="text-slate-600 dark:text-white/70">{metric.name}</span>
                          <span className="font-mono text-accent-blue dark:text-accent-cyan font-bold">{metric.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-mint rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(100,210,255,0.6)]"
                            style={{ width: `${metric.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Badges Row */}
                <div className="space-y-2.5 font-sans text-xs border-t border-slate-200 dark:border-white/10 pt-4">
                  <div className="flex justify-between items-center text-slate-600 dark:text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
                      Diagnostic Protocol:
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
                      First Principles
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 dark:text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
                      Iteration Velocity:
                    </span>
                    <span className="text-emerald-600 dark:text-accent-mint font-semibold">Continuous Trial & Error</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 dark:text-white/60">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
                      Security Rigor:
                    </span>
                    <span className="text-accent-blue dark:text-accent-cyan font-semibold">Defensive Engineering</span>
                  </div>
                </div>

                {/* Vector Stepper Controls on Side Screen */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    onClick={() => {
                      const next = (activeIdx - 1 + PORTFOLIO_DATA.strengths.length) % PORTFOLIO_DATA.strengths.length;
                      handleSelectStrength(next);
                      audioSystem.playClick();
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white transition-colors ios-pressable flex items-center gap-1"
                  >
                    <span>Prev Vector</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {PORTFOLIO_DATA.strengths.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          handleSelectStrength(i);
                          audioSystem.playClick();
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeIdx === i
                            ? 'w-5 bg-accent-cyan shadow-[0_0_8px_rgba(100,210,255,0.8)]'
                            : 'bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40'
                        }`}
                        aria-label={`Jump to vector ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const next = (activeIdx + 1) % PORTFOLIO_DATA.strengths.length;
                      handleSelectStrength(next);
                      audioSystem.playClick();
                    }}
                    className="px-3 py-1.5 rounded-full bg-accent-blue hover:bg-accent-blue/90 dark:bg-accent-cyan dark:hover:bg-accent-cyan/90 text-white dark:text-black font-semibold transition-colors ios-pressable flex items-center gap-1 shadow-sm"
                  >
                    <span>Next Vector</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
