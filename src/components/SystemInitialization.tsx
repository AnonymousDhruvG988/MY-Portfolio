import React, { useState, useEffect } from 'react';
import { audioSystem } from '../utils/audioSystem';

interface SystemInitializationProps {
  onComplete: () => void;
}

export const SystemInitialization: React.FC<SystemInitializationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => {
      setStage(1);
      setText('INITIALIZING DEVELOPER PROFILE...');
      audioSystem.playHover();
    }, 400);

    const t2 = setTimeout(() => {
      setStage(2);
      setText('SCANNING LOCAL WORKSPACE // KALI_ENV_VERIFIED');
      audioSystem.playHover();
    }, 1100);

    const t3 = setTimeout(() => {
      setStage(3);
      setText('IDENTITY VERIFIED // DHRUV GOSWAMI');
      audioSystem.playAccessGranted();
    }, 1900);

    const t4 = setTimeout(() => {
      onComplete();
    }, 2500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className="fixed inset-0 z-[10000] bg-bg-void flex flex-col items-center justify-center p-6 cursor-pointer select-none"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

      {/* Center Cinematic Initialization Core */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Pulsing micro coordinate dot */}
        <div className="relative mb-6">
          <div className="w-2.5 h-2.5 bg-accent-mint rounded-full animate-ping absolute inset-0 opacity-75" />
          <div className="w-2.5 h-2.5 bg-accent-mint rounded-full relative shadow-[0_0_12px_#7CFFB2]" />
        </div>

        {/* Technical Terminal Status */}
        <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent-mint rounded-full animate-pulse" />
          SYS_BOOT // PROTOCOL_EXEC: 0x7E3
        </div>

        {/* Dynamic Status Text */}
        <div className="font-mono text-sm md:text-base text-text-primary tracking-wider font-semibold min-h-[32px] flex items-center justify-center">
          <span className="border-r-2 border-accent-mint pr-1 animate-pulse">
            {text}
          </span>
        </div>

        {/* Subtle technical line indicators */}
        <div className="w-48 h-[1px] bg-border-subtle my-5 relative overflow-hidden">
          <div
            className="absolute top-0 bottom-0 bg-accent-mint transition-all duration-700 ease-out"
            style={{
              width: stage === 0 ? '10%' : stage === 1 ? '45%' : stage === 2 ? '80%' : '100%',
              boxShadow: '0 0 8px #7CFFB2',
            }}
          />
        </div>

        {/* System coordinates & telemetry */}
        <div className="flex justify-between w-full font-mono text-[10px] text-text-muted/60 px-4">
          <span>LAT: 28.6139° N</span>
          <span>SYS: LINUX_KERNEL</span>
          <span>SEC: ENCRYPTED</span>
        </div>
      </div>

      {/* Skip action in corner */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="absolute bottom-8 text-xs font-mono text-text-muted hover:text-accent-mint transition-colors px-3 py-1.5 border border-border-subtle hover:border-accent-mint/40 rounded tracking-wider flex items-center gap-2"
      >
        <span className="text-[10px] opacity-60">[ESC]</span> SKIP INITIALIZATION
      </button>
    </div>
  );
};
