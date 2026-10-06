import React, { useState, useEffect } from 'react';
import { audioSystem } from '../utils/audioSystem';

interface SystemInitializationProps {
  onComplete: () => void;
}

export const SystemInitialization: React.FC<SystemInitializationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const [text, setText] = useState<string>('INITIALIZING TRANSLUCENT SYSTEM CORE...');

  useEffect(() => {
    // If already seen in this session, skip immediately
    if (sessionStorage.getItem('dhruv_system_initialized')) {
      onComplete();
      return;
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem('dhruv_system_initialized', 'true');
      onComplete();
      return;
    }

    const t1 = setTimeout(() => {
      setStage(1);
      setText('MOUNTING KALI LINUX LAB // ACTIVE');
      audioSystem.playHover();
    }, 250);

    const t2 = setTimeout(() => {
      setStage(2);
      setText('IDENTITY VERIFIED // DHRUV GOSWAMI');
      audioSystem.playAccessGranted();
    }, 600);

    const t3 = setTimeout(() => {
      sessionStorage.setItem('dhruv_system_initialized', 'true');
      onComplete();
    }, 1050);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        sessionStorage.setItem('dhruv_system_initialized', 'true');
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('dhruv_system_initialized', 'true');
    onComplete();
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[10000] bg-[#030712] flex flex-col items-center justify-center p-6 cursor-pointer select-none system-boot-screen gpu-layer"
    >
      {/* Aurora Refraction Orbs in Boot */}
      <div className="absolute w-[450px] h-[450px] bg-accent-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] bg-accent-cyan/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Center Boot Capsule */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Monogram */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-accent-cyan via-accent-blue to-accent-mint p-[1.5px] shadow-[0_0_30px_rgba(100,210,255,0.4)] mb-6 animate-pulse-subtle">
          <div className="w-full h-full rounded-[22px] bg-black flex items-center justify-center font-display text-2xl font-black text-accent-cyan">
            DG
          </div>
        </div>

        {/* Technical Sub-Tag */}
        <div className="font-sans text-xs text-white/50 tracking-widest uppercase mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          SYSTEM CORE // INITIALIZING
        </div>

        {/* Dynamic Status Text */}
        <div className="font-sans text-sm md:text-base text-white font-semibold min-h-[32px] flex items-center justify-center">
          <span className="animate-fade-in text-slate-100">
            {text}
          </span>
        </div>

        {/* Smooth Progress Pill */}
        <div className="w-56 h-1.5 bg-white/10 rounded-full my-6 overflow-hidden relative">
          <div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-mint rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(100,210,255,0.7)]"
            style={{
              width: stage === 0 ? '30%' : stage === 1 ? '70%' : '100%',
            }}
          />
        </div>

        {/* Coordinates */}
        <div className="flex justify-between w-full font-mono text-[10px] text-white/40 px-6">
          <span>INDIA // 28.61° N</span>
          <span>DHRUV_OS</span>
          <span className="text-emerald-400">ONLINE</span>
        </div>
      </div>

      {/* Skip button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute bottom-10 text-xs font-sans text-white/50 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/15 hover:bg-white/10"
      >
        Tap anywhere or press [ESC] to enter
      </button>
    </div>
  );
};
