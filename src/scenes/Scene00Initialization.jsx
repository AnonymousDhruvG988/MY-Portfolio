import React, { useState, useEffect } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';

export default function Scene00Initialization({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    try {
      sound.playBootChime();
    } catch {
      // Audio context error suppressed if user hasn't interacted yet
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCompleted(true);
            setTimeout(onComplete, 350);
          }, 200);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    try {
      sound.playMechanicalTick(1100);
    } catch {
      // ignore
    }
    setCompleted(true);
    onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#05060a] flex flex-col items-center justify-center p-6 transition-opacity duration-500 ${
        completed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        
        {/* Luminous Logo Badge */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-cyan-400 to-emerald-400 p-[1.5px] shadow-[0_0_40px_rgba(99,102,241,0.35)] animate-pulse">
            <div className="w-full h-full bg-[#0a0d16] rounded-2xl flex items-center justify-center font-display font-extrabold text-2xl text-white">
              {DEVELOPER_DATA.profile.initials}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-display font-bold text-lg text-white tracking-wider">
            {DEVELOPER_DATA.profile.name}
          </h1>
          <p className="text-xs text-slate-400">
            Developer Portfolio Experience
          </p>
        </div>

        {/* Sleek Line Progress Bar */}
        <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Skip Action */}
        <button
          onClick={handleSkip}
          data-cursor="ENTER"
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors pt-2 px-3 py-1 rounded-full border border-white/5 hover:border-white/15"
        >
          Skip Intro
        </button>

      </div>
    </div>
  );
}
