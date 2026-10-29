import React, { useState } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import { Terminal, Cpu, ArrowRight, Code2, Sparkles, Check } from 'lucide-react';

export default function Scene06HowIThink() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const steps = DEVELOPER_DATA.howIThink.steps;
  const currentStep = steps[activeStepIdx];

  const handleStepClick = (idx) => {
    sound.playMechanicalTick(900 + idx * 40);
    setActiveStepIdx(idx);
  };

  return (
    <section id="scene-06" className="chapter-section relative py-28">
      {/* Ambient glow */}
      <div className="ambient-glow w-[450px] h-[450px] bg-indigo-500/10 -bottom-10 right-1/4" />

      <div className="scene-container relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="modern-badge indigo">
              <Cpu className="w-3.5 h-3.5" />
              CHAPTER 06 // HOW I THINK
            </span>
            <span className="modern-badge">
              Engineering Mindset
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            ENGINEERING <br className="hidden sm:inline" />
            <span className="gradient-text-indigo">
              FIRST PRINCIPLES.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            I don't collect technologies to add keywords to a page. I learn by building harnesses, analyzing edge failures, and understanding root principles.
          </p>
        </div>

        {/* 7-Step Progression Pipeline */}
        <div className="flex items-center justify-between gap-2 p-2 bg-[#090d16] border border-white/10 rounded-2xl overflow-x-auto">
          {steps.map((st, idx) => {
            const isCurrent = activeStepIdx === idx;
            const isPast = idx < activeStepIdx;
            return (
              <button
                key={st.num}
                onClick={() => handleStepClick(idx)}
                data-cursor={st.label}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-indigo-600 text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                    : isPast
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isCurrent
                    ? 'bg-white text-indigo-700'
                    : isPast
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-white/10 text-slate-400'
                }`}>
                  {isPast ? <Check className="w-3 h-3" /> : st.num}
                </span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

        {/* Step Breakdown + VS Code Style Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Stage Focus (5 Cols) */}
          <div className="lg:col-span-5 modern-card p-6 sm:p-8 space-y-6 border-indigo-500/30">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                Stage {currentStep.num} // {currentStep.label}
              </span>
              <span className="text-xs text-slate-500 font-mono">Step {activeStepIdx + 1} of 7</span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-3xl text-white">
                {currentStep.label}
              </h3>
              <p className="text-sm font-semibold text-emerald-400">
                "{currentStep.shortDesc}"
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStep.detail}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  const nextIdx = (activeStepIdx + 1) % steps.length;
                  handleStepClick(nextIdx);
                }}
                data-cursor="NEXT"
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Next Stage: {steps[(activeStepIdx + 1) % steps.length].label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Modern VS Code Dark Editor (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#090d16] border border-white/10 overflow-hidden shadow-2xl font-mono text-xs">
            {/* Editor Window Topbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1422] border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-slate-400 text-[11px] ml-2 font-sans flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  ipv4_dissector.py
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-sans">Python 3.12</span>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-5 overflow-x-auto text-[11px] leading-relaxed text-slate-300 max-h-[380px] scrollbar-thin">
              <pre>
                {DEVELOPER_DATA.howIThink.codeSnippet.split('\n').map((line, idx) => (
                  <div key={idx} className="flex hover:bg-white/5 px-1 py-0.5 rounded">
                    <span className="w-7 shrink-0 text-slate-600 select-none text-right pr-3 font-mono">
                      {idx + 1}
                    </span>
                    <span
                      className={
                        line.trim().startsWith('#')
                          ? 'text-slate-500 italic'
                          : line.includes('def ')
                          ? 'text-emerald-400 font-bold'
                          : line.includes('return ')
                          ? 'text-indigo-400'
                          : line.includes('import ')
                          ? 'text-cyan-400'
                          : line.includes('struct.unpack')
                          ? 'text-amber-300'
                          : 'text-slate-200'
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </pre>
            </div>

            <div className="px-4 py-2 bg-[#0e1422] border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-sans">
              <span>UTF-8 • RFC 791 Specification</span>
              <span className="text-emerald-400">Zero Dependencies</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
