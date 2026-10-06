import React, { useState, useEffect } from 'react';
import { audioSystem } from '../utils/audioSystem';

export const InnovativeScrollBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSection, setCurrentSection] = useState('HERO');

  useEffect(() => {
    let ticking = false;
    let lastSectionCheck = 0;

    const sections = ['work', 'offensive-lab', 'learning', 'strengths', 'workbench', 'identity', 'contact'];

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
            setScrollProgress(progress);
          }

          // Throttle section detection to once every 150ms to prevent layout thrashing
          const now = Date.now();
          if (now - lastSectionCheck > 150) {
            lastSectionCheck = now;
            let active = 'HERO';
            const vh = window.innerHeight;
            for (const id of sections) {
              const el = document.getElementById(id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= vh * 0.45 && rect.bottom >= vh * 0.1) {
                  active = id.toUpperCase().replace('-', ' ');
                  break;
                }
              }
            }
            setCurrentSection(active);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    audioSystem.playClick();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = clickY / rect.height;
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: percentage * totalScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none pointer-events-auto gpu-layer"
      onMouseEnter={() => {
        setIsHovered(true);
        audioSystem.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip displaying section & percentage */}
      <div
        className={`absolute right-7 transition-all duration-300 pointer-events-none px-3 py-1.5 rounded-full liquid-glass-elevated border border-slate-300 dark:border-white/20 text-[11px] font-mono text-slate-800 dark:text-white flex items-center gap-2 whitespace-nowrap shadow-xl ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
        style={{
          top: `calc(${scrollProgress}% - 14px)`,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
        <span className="text-accent-blue dark:text-accent-cyan font-bold">{Math.round(scrollProgress)}%</span>
        <span className="text-slate-400 dark:text-white/40">•</span>
        <span className="text-slate-700 dark:text-white/80">{currentSection}</span>
      </div>

      {/* Translucent Track */}
      <div
        onClick={handleTrackClick}
        className="w-2.5 h-48 rounded-full liquid-glass border border-slate-300/80 dark:border-white/20 p-[2px] cursor-pointer hover:w-3.5 transition-all duration-200 relative shadow-lg"
      >
        {/* Glow Bead Pill */}
        <div
          className="w-full bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-mint rounded-full will-change-transform relative shadow-[0_0_12px_rgba(100,210,255,0.8)]"
          style={{
            height: '24px',
            transform: `translate3d(0, ${(scrollProgress / 100) * (192 - 24 - 4)}px, 0)`,
          }}
        />
      </div>
    </div>
  );
};
