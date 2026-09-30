import React, { useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { Terminal, X, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

interface DiagnosticOverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosticOverrideModal: React.FC<DiagnosticOverrideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      audioSystem.playAccessGranted();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-bg-void/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-bg-surface border-2 border-accent-crimson/60 rounded-lg shadow-[0_0_50px_rgba(255,83,112,0.25)] overflow-hidden flex flex-col bracket-box"
      >
        {/* Header */}
        <div className="bg-accent-crimson/15 px-6 py-4 border-b border-accent-crimson/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-accent-crimson animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold text-accent-crimson tracking-widest uppercase">
              DIAGNOSTIC SYSTEM OVERRIDE // 0xDG988
            </span>
          </div>
          <button
            onClick={() => {
              audioSystem.playClick();
              onClose();
            }}
            className="text-text-muted hover:text-text-primary p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 font-mono text-xs text-text-secondary bg-bg-void/95">
          <div className="p-4 rounded bg-bg-surface/80 border border-border-subtle flex items-start gap-3">
            <Terminal className="w-4 h-4 text-accent-mint shrink-0 mt-0.5" />
            <div>
              <div className="text-text-primary font-bold text-sm mb-1">
                ACCESS GRANTED: DEVELOPER DEBUG KERNEL
              </div>
              <p className="leading-relaxed text-text-muted">
                You triggered the hidden diagnostic protocol (initials frequency burst or override keyword).
              </p>
            </div>
          </div>

          {/* Internal Telemetry Table */}
          <div className="space-y-2 border-y border-border-subtle py-4">
            <div className="flex justify-between">
              <span className="text-text-muted">OPERATOR:</span>
              <span className="text-text-primary font-semibold">{PORTFOLIO_DATA.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">CALLSIGN:</span>
              <span className="text-accent-mint">{PORTFOLIO_DATA.codeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">ENVIRONMENT:</span>
              <span className="text-accent-cyan">Kali Linux Rolling + VS Code + Python 3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">PASSION:</span>
              <span className="text-text-primary">Wireless Frame Analysis & Resilient Systems</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">SECURITY INTEGRITY:</span>
              <span className="text-accent-mint flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                ETHICAL RESEARCH CERTIFIED
              </span>
            </div>
          </div>

          {/* Personal Developer Note */}
          <div className="p-4 rounded bg-accent-mint/5 border border-accent-mint/20 text-text-secondary leading-relaxed">
            <div className="text-accent-mint font-semibold mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              BUILDER'S NOTE:
            </div>
            "Thanks for inspecting the interface closely. I believe software engineering is fundamentally about curiosity: wanting to know what happens behind the screen, inside the socket, and across the wire. Let's build something bold together."
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-accent-crimson/20 hover:bg-accent-crimson hover:text-bg-void text-accent-crimson border border-accent-crimson/40 rounded transition-colors font-bold tracking-wider"
            >
              EXIT OVERRIDE [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
