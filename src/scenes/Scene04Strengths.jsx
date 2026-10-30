import React, { useState } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import { ChevronRight, ChevronLeft, Target } from 'lucide-react';

export default function Scene04Strengths() {
  const [activeIdx, setActiveIdx] = useState(0);
  const strengths = DEVELOPER_DATA.strengths;
  const current = strengths[activeIdx];

  const handleNext = () => {
    sound.playMechanicalTick(1050);
    setActiveIdx((prev) => (prev + 1) % strengths.length);
  };

  const handlePrev = () => {
    sound.playMechanicalTick(950);
    setActiveIdx((prev) => (prev - 1 + strengths.length) % strengths.length);
  };

  return (
    <section id="scene-04" className="chapter-section relative py-28">
      <div className="scene-container relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="modern-badge indigo">
                <Target className="w-3.5 h-3.5" />
                CHAPTER 04 // APPROACH & MINDSET
              </span>
              <span className="modern-badge">
                Core Strengths
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
              HOW I SOLVE <br className="hidden sm:inline" />
              <span className="gradient-text-indigo">
                PROBLEMS.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">0{activeIdx + 1} / 0{strengths.length}</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                data-cursor="PREV"
                className="p-2.5 rounded-full border border-white/10 hover:border-indigo-400 hover:text-white text-slate-400 transition-colors"
                aria-label="Previous strength"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                data-cursor="NEXT"
                className="p-2.5 rounded-full border border-white/10 hover:border-indigo-400 hover:text-white text-slate-400 transition-colors"
                aria-label="Next strength"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Editorial Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Feature (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              {current.tag}
            </span>

            <h3 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase tracking-tight">
              {current.title}
            </h3>

            <div className="border-l-2 border-indigo-500 pl-6 py-2">
              <blockquote className="font-display text-xl sm:text-2xl text-slate-200 font-medium italic leading-relaxed">
                "{current.quote}"
              </blockquote>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {current.elaboration}
            </p>
          </div>

          {/* Quick Selector (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-2.5">
            <span className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-mono">
              All Core Strengths:
            </span>
            {strengths.map((str, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={str.id}
                  onClick={() => {
                    sound.playMechanicalTick(1000);
                    setActiveIdx(idx);
                  }}
                  data-cursor={str.title}
                  className={`p-3.5 rounded-xl text-left transition-all border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-indigo-500/15 border-indigo-400/50 text-white font-semibold shadow-md'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-mono">0{idx + 1}</span>
                    <span className="text-sm font-display tracking-wide">{str.title}</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-indigo-400 shadow-[0_0_8px_#818cf8]' : 'bg-transparent'}`} />
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
