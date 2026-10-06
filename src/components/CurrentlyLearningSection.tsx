import React, { useState } from 'react';
import { PORTFOLIO_DATA, type SkillNode } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { BrainCircuit, Zap, Compass, Check, ArrowRight } from 'lucide-react';

export const CurrentlyLearningSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<SkillNode>(PORTFOLIO_DATA.skills[0]);
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'KNOWN' | 'LEARNING' | 'EXPLORING'>('ALL');

  const filteredSkills = PORTFOLIO_DATA.skills.filter((s) => {
    if (filterCategory === 'ALL') return true;
    return s.category === filterCategory;
  });

  return (
    <section id="learning" className="relative py-28 overflow-hidden">
      {/* Background Soft Refraction */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 mb-3 border border-slate-300/80 dark:border-white/10">
              <BrainCircuit className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
              <span className="font-sans text-xs font-semibold text-slate-700 dark:text-white/80">
                Evolving Knowledge Graph
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight">
              Currently Learning
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-white/70 max-w-xl font-sans">
              An active learning ecosystem. Honest classifications with zero fabricated progress bars or false credentials.
            </p>
          </div>

          {/* Segmented Control Filter Pills */}
          <div className="liquid-glass p-1.5 rounded-full flex flex-wrap gap-1 border border-slate-200 dark:border-white/15">
            <button
              onClick={() => {
                setFilterCategory('ALL');
                audioSystem.playHover();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all ios-pressable ${
                filterCategory === 'ALL'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-[0_2px_10px_rgba(0,0,0,0.15)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white'
              }`}
            >
              All ({PORTFOLIO_DATA.skills.length})
            </button>
            <button
              onClick={() => {
                setFilterCategory('KNOWN');
                audioSystem.playHover();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all flex items-center gap-1.5 ios-pressable ${
                filterCategory === 'KNOWN'
                  ? 'bg-emerald-500 text-white dark:bg-ios-green dark:text-black font-bold shadow-[0_0_15px_rgba(48,209,88,0.4)]'
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white'
              }`}
            >
              <Check className="w-3 h-3" />
              Working With
            </button>
            <button
              onClick={() => {
                setFilterCategory('LEARNING');
                audioSystem.playHover();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all flex items-center gap-1.5 ios-pressable ${
                filterCategory === 'LEARNING'
                  ? 'bg-accent-blue text-white dark:bg-accent-cyan dark:text-black font-bold shadow-[0_0_15px_rgba(100,210,255,0.4)]'
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3" />
              Expanding
            </button>
            <button
              onClick={() => {
                setFilterCategory('EXPLORING');
                audioSystem.playHover();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold transition-all flex items-center gap-1.5 ios-pressable ${
                filterCategory === 'EXPLORING'
                  ? 'bg-amber-500 text-white dark:bg-accent-amber dark:text-black font-bold shadow-[0_0_15px_rgba(255,159,10,0.4)]'
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white'
              }`}
            >
              <Compass className="w-3 h-3" />
              Exploring
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left Column: Interactive Node Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredSkills.map((skill) => {
              const isActive = activeNode.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    setActiveNode(skill);
                    audioSystem.playClick();
                  }}
                  onMouseEnter={() => {
                    setActiveNode(skill);
                    audioSystem.playHover();
                  }}
                  className={`p-5 rounded-[26px] transition-all duration-300 cursor-pointer relative overflow-hidden group ios-pressable hover:-translate-y-1 hover:shadow-xl ${
                    isActive
                      ? 'liquid-glass-elevated border-accent-blue/50 dark:border-accent-cyan/60 shadow-[0_12px_30px_rgba(100,210,255,0.18)]'
                      : 'liquid-glass hover:bg-slate-50 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/30 border-slate-200 dark:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans font-bold text-base text-slate-900 dark:text-white group-hover:text-accent-blue dark:group-hover:text-accent-cyan transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className={`font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        skill.category === 'KNOWN'
                          ? 'border-emerald-500/30 text-emerald-600 dark:text-ios-green bg-emerald-500/10'
                          : skill.category === 'LEARNING'
                          ? 'border-accent-blue/30 text-accent-blue dark:text-accent-cyan bg-accent-blue/10 dark:bg-accent-cyan/10'
                          : 'border-amber-500/30 text-amber-600 dark:text-accent-amber bg-amber-500/10'
                      }`}
                    >
                      {skill.category === 'KNOWN'
                        ? 'WORKING'
                        : skill.category === 'LEARNING'
                        ? 'LEARNING'
                        : 'EXPLORING'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-white/60 line-clamp-1 mb-3 font-sans">
                    {skill.focus}
                  </p>

                  <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-white/40">
                    <span>{skill.type}</span>
                    <span className="flex items-center gap-1 text-slate-600 dark:text-white/60 group-hover:text-accent-blue dark:group-hover:text-accent-cyan font-sans text-xs transition-colors">
                      Inspect <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Central Learning Node Telemetry Widget */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-7 rounded-[32px] liquid-glass-elevated border border-slate-200 dark:border-white/20 shadow-2xl frosted-squircle space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <span className="text-accent-blue dark:text-accent-cyan font-bold font-sans text-xs flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4" />
                  Node Inspector // {activeNode.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-white/40 uppercase">
                  {activeNode.type}
                </span>
              </div>

              {/* Status Badge */}
              <div>
                <span className="font-sans text-[10px] text-slate-500 dark:text-white/40 uppercase font-semibold block mb-1.5">
                  Current Trajectory
                </span>
                <span
                  className={`inline-block font-sans text-xs px-3 py-1.5 rounded-full font-bold ${
                    activeNode.category === 'KNOWN'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-ios-green border border-emerald-500/30'
                      : activeNode.category === 'LEARNING'
                      ? 'bg-accent-blue/10 text-accent-blue dark:bg-accent-cyan/15 dark:text-accent-cyan border border-accent-blue/30 dark:border-accent-cyan/30'
                      : 'bg-amber-500/10 text-amber-600 dark:bg-accent-amber/15 dark:text-accent-amber border border-amber-500/30'
                  }`}
                >
                  {activeNode.category === 'KNOWN'
                    ? '● Active Working Knowledge'
                    : activeNode.category === 'LEARNING'
                    ? '▲ Rapid Skill Expansion'
                    : '◆ Foundational Exploration'}
                </span>
              </div>

              {/* Focus Area */}
              <div>
                <span className="font-sans text-[10px] text-slate-500 dark:text-white/40 uppercase font-semibold block mb-1.5">
                  Technical Core Focus
                </span>
                <div className="text-sm font-semibold text-slate-900 dark:text-white bg-slate-100/90 dark:bg-black/40 p-4 rounded-2xl border border-slate-200 dark:border-white/10 font-sans">
                  {activeNode.focus}
                </div>
              </div>

              {/* Why I'm Learning It */}
              <div>
                <span className="font-sans text-[10px] text-slate-500 dark:text-white/40 uppercase font-semibold block mb-1.5">
                  Architectural Rationale
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed bg-slate-100/80 dark:bg-black/30 p-4 rounded-2xl border border-slate-200 dark:border-white/10 font-sans">
                  {activeNode.whyLearning}
                </p>
              </div>

              {/* Trust Seal */}
              <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-sans text-slate-500 dark:text-white/40">
                <span>Verified Practical Competence</span>
                <span className="text-emerald-600 dark:text-accent-mint font-semibold">100% Genuine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
