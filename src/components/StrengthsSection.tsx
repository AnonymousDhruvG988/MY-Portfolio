import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { Zap, Activity } from 'lucide-react';

export const StrengthsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section id="strengths" className="relative py-24 bg-bg-void border-t border-border-subtle">
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-border-subtle pb-6">
          <div>
            <div className="font-mono text-xs text-accent-cyan tracking-widest uppercase mb-2 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-accent-cyan" />
              ENGINEERING ATTRIBUTES // 05
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight">
              STRENGTHS
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-xl">
              Qualities over buzzwords. How I approach unknown systems, solve roadblocks, and iterate.
            </p>
          </div>

          <div className="font-mono text-xs text-text-muted flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent-mint animate-pulse" />
            <span>SELECT OR HOVER QUALITIES TO ACTIVATE</span>
          </div>
        </div>

        {/* Interactive Vertical Sequence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline Sequence List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {PORTFOLIO_DATA.strengths.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.number}
                  onMouseEnter={() => {
                    setActiveIdx(idx);
                    audioSystem.playHover();
                  }}
                  onClick={() => {
                    setActiveIdx(idx);
                    audioSystem.playClick();
                  }}
                  className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-bg-surface border-accent-cyan shadow-[0_0_20px_rgba(98,217,255,0.12)]'
                      : 'bg-bg-surface/40 border-border-subtle hover:border-border-bright hover:bg-bg-surface/70'
                  }`}
                >
                  {/* Left Active Glow Bar */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 w-1 transition-all duration-300 ${
                      isActive ? 'bg-accent-cyan shadow-[0_0_10px_#62D9FF]' : 'bg-transparent'
                    }`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className={`font-mono text-xl sm:text-2xl font-bold transition-colors ${
                        isActive ? 'text-accent-cyan' : 'text-text-muted'
                      }`}>
                        {item.number}
                      </span>
                      <div>
                        <h3 className={`font-display font-black text-xl sm:text-2xl transition-colors tracking-tight ${
                          isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                        }`}>
                          {item.title}
                        </h3>
                        <p className="font-mono text-xs text-text-muted mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-accent-mint shrink-0">
                      {item.signal}
                    </span>
                  </div>

                  {/* Expand description if active */}
                  <p className={`mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed pl-10 transition-all ${
                    isActive ? 'opacity-100' : 'opacity-80'
                  }`}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Visual Attribute Radar / Telemetry Inspector (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-8 rounded-lg border border-border-bright bg-bg-surface/90 bracket-box">
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6 flex items-center justify-between border-b border-border-subtle pb-3">
                <span className="flex items-center gap-2 text-text-secondary font-bold">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                  QUALITY VECTOR TELEMETRY
                </span>
                <span className="text-accent-cyan">0{activeIdx + 1} / 05</span>
              </div>

              {/* Big Editorial Quote / Principle */}
              <div className="mb-6">
                <div className="font-mono text-[10px] text-text-muted uppercase mb-1">
                  CURRENT VECTOR FOCUS
                </div>
                <div className="font-display font-black text-2xl text-accent-cyan mb-2">
                  {PORTFOLIO_DATA.strengths[activeIdx].title}
                </div>
                <div className="text-xs font-mono text-accent-mint mb-4">
                  // {PORTFOLIO_DATA.strengths[activeIdx].subtitle}
                </div>
                <div className="p-4 rounded bg-bg-void/80 border border-border-subtle text-xs sm:text-sm text-text-secondary leading-relaxed">
                  "{PORTFOLIO_DATA.strengths[activeIdx].description}"
                </div>
              </div>

              {/* Engineering Metaphor Telemetry List */}
              <div className="space-y-3 font-mono text-xs border-t border-border-subtle/70 pt-4">
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">DIAGNOSTIC APPROACH:</span>
                  <span className="text-text-primary">FIRST PRINCIPLES</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">FEEDBACK LOOP:</span>
                  <span className="text-accent-mint">TRIAL → ERROR → INSIGHT</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="text-text-muted">ETHICAL BOUNDS:</span>
                  <span className="text-accent-cyan">DEFENSIVE & RESPONSIBLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
