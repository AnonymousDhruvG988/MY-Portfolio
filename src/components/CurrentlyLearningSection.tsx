import React, { useState } from 'react';
import { PORTFOLIO_DATA, type SkillNode } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { BrainCircuit, Sparkles, Compass, Check, ArrowRight } from 'lucide-react';

export const CurrentlyLearningSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<SkillNode>(PORTFOLIO_DATA.skills[0]);
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'KNOWN' | 'LEARNING' | 'EXPLORING'>('ALL');

  const filteredSkills = PORTFOLIO_DATA.skills.filter((s) => {
    if (filterCategory === 'ALL') return true;
    return s.category === filterCategory;
  });

  return (
    <section id="learning" className="relative py-24 bg-bg-base border-t border-border-subtle">
      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-border-subtle pb-6">
          <div>
            <div className="font-mono text-xs text-accent-mint tracking-widest uppercase mb-2 flex items-center gap-2">
              <BrainCircuit className="w-3.5 h-3.5 text-accent-mint" />
              LIVING LEARNING SYSTEM // 04
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight">
              CURRENTLY LEARNING
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-xl">
              An evolving node system. Honest classifications without fake progress bars or inflated metrics.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            <button
              onClick={() => {
                setFilterCategory('ALL');
                audioSystem.playHover();
              }}
              className={`px-3 py-1 rounded transition-colors ${
                filterCategory === 'ALL'
                  ? 'bg-accent-mint text-bg-void font-semibold'
                  : 'bg-bg-surface text-text-muted hover:text-text-primary border border-border-subtle'
              }`}
            >
              ALL NODES ({PORTFOLIO_DATA.skills.length})
            </button>
            <button
              onClick={() => {
                setFilterCategory('KNOWN');
                audioSystem.playHover();
              }}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                filterCategory === 'KNOWN'
                  ? 'bg-accent-mint text-bg-void font-semibold'
                  : 'bg-bg-surface text-text-muted hover:text-text-primary border border-border-subtle'
              }`}
            >
              <Check className="w-3 h-3" />
              WORKING WITH
            </button>
            <button
              onClick={() => {
                setFilterCategory('LEARNING');
                audioSystem.playHover();
              }}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                filterCategory === 'LEARNING'
                  ? 'bg-accent-cyan text-bg-void font-semibold'
                  : 'bg-bg-surface text-text-muted hover:text-text-primary border border-border-subtle'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              EXPANDING
            </button>
            <button
              onClick={() => {
                setFilterCategory('EXPLORING');
                audioSystem.playHover();
              }}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                filterCategory === 'EXPLORING'
                  ? 'bg-accent-amber text-bg-void font-semibold'
                  : 'bg-bg-surface text-text-muted hover:text-text-primary border border-border-subtle'
              }`}
            >
              <Compass className="w-3 h-3" />
              EXPLORING
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Dynamic Nodes Grid (Left 7 cols) & Active Node Inspector (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Evolving Node Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className={`p-4 rounded border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-bg-surface border-accent-mint shadow-[0_0_16px_rgba(124,255,178,0.15)]'
                      : 'bg-bg-surface/50 border-border-subtle hover:border-border-bright hover:bg-bg-surface/80'
                  }`}
                >
                  {/* Subtle left category indicator */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 w-1 ${
                      skill.category === 'KNOWN'
                        ? 'bg-accent-mint'
                        : skill.category === 'LEARNING'
                        ? 'bg-accent-cyan'
                        : 'bg-accent-amber'
                    }`}
                  />

                  <div className="flex items-center justify-between mb-1 pl-2">
                    <span className="font-display font-bold text-base text-text-primary group-hover:text-accent-mint transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className={`font-mono text-[9px] px-1.5 py-0.5 rounded border uppercase ${
                        skill.category === 'KNOWN'
                          ? 'border-accent-mint/30 text-accent-mint bg-accent-mint/10'
                          : skill.category === 'LEARNING'
                          ? 'border-accent-cyan/30 text-accent-cyan bg-accent-cyan/10'
                          : 'border-accent-amber/30 text-accent-amber bg-accent-amber/10'
                      }`}
                    >
                      {skill.category === 'KNOWN'
                        ? 'WORKING WITH'
                        : skill.category === 'LEARNING'
                        ? 'LEARNING'
                        : 'EXPLORING'}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted line-clamp-1 pl-2 font-normal">
                    {skill.focus}
                  </p>

                  <div className="mt-3 pt-2 border-t border-border-subtle/50 flex items-center justify-between pl-2 font-mono text-[10px] text-text-muted">
                    <span>TYPE: {skill.type}</span>
                    <span className="flex items-center gap-1 group-hover:text-accent-mint transition-colors">
                      INSPECT <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Central Learning Node Telemetry Inspector */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-6 rounded-lg border border-border-bright bg-bg-surface/90 bracket-box shadow-xl">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-5 font-mono text-xs">
                <span className="text-accent-mint font-semibold flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4" />
                  NODE_TELEMETRY // {activeNode.name}
                </span>
                <span className="text-[10px] text-text-muted uppercase">
                  CLASSIFICATION: {activeNode.category}
                </span>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block mb-1">
                  CURRENT STATUS
                </span>
                <span
                  className={`inline-block font-mono text-xs px-2.5 py-1 rounded font-semibold ${
                    activeNode.category === 'KNOWN'
                      ? 'bg-accent-mint/15 text-accent-mint border border-accent-mint/40'
                      : activeNode.category === 'LEARNING'
                      ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/40'
                      : 'bg-accent-amber/15 text-accent-amber border border-accent-amber/40'
                  }`}
                >
                  {activeNode.category === 'KNOWN'
                    ? '● ACTIVELY WORKING & EXPERIMENTING WITH'
                    : activeNode.category === 'LEARNING'
                    ? '▲ ACTIVELY EXPANDING SKILLSET & PRACTICING'
                    : '◆ EXPLORING SYSTEM FOUNDATIONS'}
                </span>
              </div>

              {/* Focus Area */}
              <div className="mb-4">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block mb-1">
                  CORE TECHNICAL FOCUS
                </span>
                <div className="text-sm font-medium text-text-primary bg-bg-void/60 p-3 rounded border border-border-subtle">
                  {activeNode.focus}
                </div>
              </div>

              {/* Why I'm Learning It */}
              <div className="mb-5">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block mb-1">
                  RATIONALE & ARCHITECTURAL MOTIVATION
                </span>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed bg-bg-void/40 p-3 rounded border border-border-subtle">
                  {activeNode.whyLearning}
                </p>
              </div>

              {/* Engineering Principle Notice */}
              <div className="pt-3 border-t border-border-subtle/70 font-mono text-[11px] text-text-muted flex items-center justify-between">
                <span>VERIFIED REAL SKILLS</span>
                <span className="text-accent-mint">NO INFLATED METRICS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
