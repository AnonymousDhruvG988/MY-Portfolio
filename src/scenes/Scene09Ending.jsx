import React from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function Scene09Ending({ onRewindToTop }) {
  const handleRewind = () => {
    sound.playChapterTransition();
    onRewindToTop();
  };

  return (
    <footer id="scene-09" className="min-h-[60vh] relative border-t border-white/5 flex flex-col justify-between py-16 bg-[#05070c]">
      <div className="scene-container relative z-10 flex-1 flex flex-col justify-center items-center text-center space-y-8 my-auto">
        
        {/* Status Pill */}
        <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Profile Active
          </span>
          <span className="text-white/20">•</span>
          <span>Status: Continuous Growth</span>
        </div>

        {/* Statement */}
        <div className="space-y-2">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            STILL LEARNING. <br />
            <span className="gradient-text-hero">
              STILL BUILDING.
            </span>
          </h2>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase pt-1">
            {DEVELOPER_DATA.profile.name} // {DEVELOPER_DATA.profile.degree}
          </p>
        </div>

        {/* Rewind */}
        <button
          onClick={handleRewind}
          data-cursor="TOP"
          className="px-6 py-2.5 rounded-full border border-white/10 hover:border-indigo-400 hover:bg-indigo-500/10 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 group"
        >
          <ArrowUp className="w-4 h-4 text-indigo-400 group-hover:-translate-y-0.5 transition-transform" />
          <span>Back to Top</span>
        </button>

      </div>

      <div className="scene-container relative z-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div>
          <span>Crafted with React, Tailwind CSS & Web Audio API</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} {DEVELOPER_DATA.profile.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
