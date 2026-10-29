import React, { useState, useEffect } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import { Volume2, VolumeX, Sparkles, Layers, Shield, Menu, X } from 'lucide-react';

export default function Navigation({
  activeChapter,
  onSelectChapter,
  soundActive,
  onToggleSound,
  onTriggerOverride
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  // Easter egg: 5 clicks on initials
  const handleMonogramClick = () => {
    sound.playMechanicalTick(1100);
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setClickCount(0);
      onTriggerOverride();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'scene-01', label: 'Builder', num: '01' },
    { id: 'scene-02', label: 'Cyber Lab', num: '02', isSpecial: true },
    { id: 'scene-03', label: 'Skills', num: '03' },
    { id: 'scene-05', label: 'Projects', num: '05' },
    { id: 'scene-06', label: 'Mindset', num: '06' },
    { id: 'scene-08', label: 'Contact', num: '08' }
  ];

  return (
    <>
      {/* Top Floating Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-[#0b101b]/70 backdrop-blur-xl border border-white/10 px-4 sm:px-6 py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          
          {/* Brand Monogram */}
          <button
            onClick={handleMonogramClick}
            data-cursor="DHRUV"
            className="flex items-center gap-2.5 group focus:outline-none"
            title="Dhruv Portfolio"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.3)]">
              <div className="w-full h-full bg-[#07090e] rounded-full flex items-center justify-center font-display font-bold text-xs text-white group-hover:text-emerald-300 transition-colors">
                {DEVELOPER_DATA.profile.initials}
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xs tracking-wider text-white group-hover:text-indigo-300 transition-colors">
                {DEVELOPER_DATA.profile.name}
              </span>
              <span className="text-[9px] text-emerald-400 font-sans font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Student & Builder
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeChapter === link.num;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    sound.playMechanicalTick(900);
                    onSelectChapter(link.id);
                  }}
                  data-cursor={link.label}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    link.isSpecial
                      ? isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                      : isActive
                      ? 'bg-white/15 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.isSpecial && <Shield className="w-3 h-3 inline mr-1 text-cyan-400" />}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                sound.playMechanicalTick(800);
              }}
              data-cursor={soundActive ? 'MUTE' : 'SOUND'}
              className={`p-2 rounded-full border transition-all ${
                soundActive
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                  : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
              title={soundActive ? 'Audio ON' : 'Audio OFF'}
              aria-label="Toggle Sound"
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile Drawer Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              data-cursor="MENU"
              className="md:hidden p-2 rounded-full border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {drawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Subtle Progress Bar */}
        <div className="max-w-6xl mx-auto px-4 mt-1">
          <div
            className="h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-xl flex flex-col justify-center p-6 md:hidden animate-in fade-in duration-200">
          <div className="space-y-4 max-w-sm mx-auto w-full text-center">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              NAVIGATION
            </span>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    sound.playChapterTransition();
                    onSelectChapter(link.id);
                    setDrawerOpen(false);
                  }}
                  className={`p-3 rounded-xl text-sm font-medium border transition-all ${
                    link.isSpecial
                      ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-bold'
                      : 'border-white/10 bg-white/5 text-white'
                  }`}
                >
                  {link.isSpecial && <Shield className="w-3.5 h-3.5 inline mr-1.5 text-cyan-400" />}
                  {link.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-6 text-xs text-slate-400 hover:text-white border border-white/10 px-4 py-2 rounded-full"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
}
