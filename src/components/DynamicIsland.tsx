import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { Shield, Volume2, VolumeX, Terminal, ChevronDown } from 'lucide-react';

interface DynamicIslandProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onTriggerOverride: () => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  soundEnabled,
  onToggleSound,
  onTriggerOverride,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        onMouseEnter={() => {
          audioSystem.playHover();
        }}
        onClick={() => {
          audioSystem.playClick();
          setIsExpanded(!isExpanded);
        }}
        className={`pointer-events-auto dynamic-island-capsule cursor-pointer select-none transition-all duration-500 ease-out ${
          isExpanded
            ? 'w-full max-w-xl p-5 rounded-[32px] bg-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(100,210,255,0.2)]'
            : 'h-11 px-4 rounded-full flex items-center gap-3.5 hover:scale-[1.02]'
        }`}
      >
        {!isExpanded ? (
          /* Compact Dynamic Island Pill */
          <>
            {/* Left Status Dot / Logo */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-accent-cyan via-accent-blue to-accent-mint flex items-center justify-center p-[1px] shadow-[0_0_10px_rgba(100,210,255,0.5)]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-mono text-[9px] font-black text-accent-cyan">
                  DG
                </div>
              </div>
              <span className="font-sans text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                System Core
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
            </div>

            {/* Center Status / Lab Telemetry */}
            <div className="h-3.5 w-[1px] bg-white/20 mx-0.5" />
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/80">
              <Shield className="w-3.5 h-3.5 text-accent-cyan" />
              <span className="hidden sm:inline font-sans text-xs text-white/70">KALI SECURITY LAB:</span>
              <span className="text-accent-mint font-semibold">ACTIVE</span>
            </div>

            {/* Right Mini Audio Equalizer Visualizer */}
            <div className="ml-auto flex items-center gap-2 pl-2">
              <div className="flex items-center gap-0.5 h-3">
                <span className={`w-0.5 bg-accent-cyan rounded-full transition-all duration-300 ${soundEnabled ? 'h-3 animate-pulse' : 'h-1'}`} />
                <span className={`w-0.5 bg-accent-mint rounded-full transition-all duration-300 ${soundEnabled ? 'h-2 animate-bounce' : 'h-1.5'}`} />
                <span className={`w-0.5 bg-accent-blue rounded-full transition-all duration-300 ${soundEnabled ? 'h-3.5 animate-pulse' : 'h-1'}`} />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
            </div>
          </>
        ) : (
          /* Expanded Widget */
          <div className="w-full space-y-4 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent-cyan via-accent-blue to-accent-mint p-[1.5px] shadow-[0_0_15px_rgba(100,210,255,0.4)]">
                  <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center font-bold text-accent-cyan">
                    DG
                  </div>
                </div>
                <div>
                  <div className="font-sans font-bold text-sm text-white flex items-center gap-2">
                    {PORTFOLIO_DATA.name}
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-white/10 text-white/80 border border-white/15">
                      DEVELOPER CORE
                    </span>
                  </div>
                  <div className="text-xs text-white/60 font-sans">
                    B.Tech Student • Developer & Security Explorer
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors text-xs"
              >
                ✕
              </button>
            </div>

            {/* Quick System Telemetry Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-[10px] font-mono text-white/50 uppercase">OFFENSIVE LAB</div>
                <div className="text-xs font-semibold text-accent-mint flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
                  KALI LINUX 2026
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-[10px] font-mono text-white/50 uppercase">LOCATION</div>
                <div className="text-xs font-semibold text-white mt-1">
                  INDIA // 28.61° N
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-[10px] font-mono text-white/50 uppercase">HAPTIC AUDIO</div>
                <div className="text-xs font-semibold text-accent-cyan mt-1 flex items-center gap-1">
                  {soundEnabled ? 'SPATIAL ON' : 'MUTED'}
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleSound}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans font-medium text-white transition-all ios-pressable border border-white/15"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>Sound Feedback: ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-white/60" />
                      <span>Sound Feedback: OFF</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onTriggerOverride}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-cyan/15 hover:bg-accent-cyan/25 text-xs font-sans text-accent-cyan border border-accent-cyan/30 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Diagnostics</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#offensive-lab"
                  onClick={() => setIsExpanded(false)}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white/80 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5 text-accent-crimson" />
                  <span>Lab</span>
                </a>
                <a
                  href="#work"
                  onClick={() => setIsExpanded(false)}
                  className="px-3.5 py-1.5 rounded-full bg-accent-blue text-white font-medium text-xs hover:bg-accent-blue/90 transition-colors shadow-[0_0_12px_rgba(10,132,255,0.5)]"
                >
                  View Work
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
