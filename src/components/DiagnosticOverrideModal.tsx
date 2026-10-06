import React, { useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { X, ShieldAlert, Cpu, CheckCircle, Terminal } from 'lucide-react';

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
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fade-in diagnostic-modal"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#080D1A] border border-accent-cyan/40 rounded-[36px] shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(100,210,255,0.25)] overflow-hidden flex flex-col frosted-squircle diagnostic-modal"
      >
        {/* Modal Header */}
        <div className="bg-[#0B1120] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full glass-traffic-red cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full glass-traffic-yellow cursor-pointer" />
            <span className="w-3 h-3 rounded-full glass-traffic-green cursor-pointer" />
            <span className="font-sans text-xs sm:text-sm font-bold text-white ml-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-accent-cyan" />
              Diagnostic System Override
            </span>
          </div>
          <button
            onClick={() => {
              audioSystem.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-white/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-7 sm:p-8 space-y-6 font-sans text-xs text-white/80 bg-black/70">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
            <Terminal className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-bold text-sm mb-1">
                Developer Debug Kernel Initialized
              </div>
              <p className="leading-relaxed text-white/60">
                You unlocked the hidden diagnostic protocol (frequency burst or keyword override).
              </p>
            </div>
          </div>

          {/* Internal Telemetry Table */}
          <div className="space-y-2.5 border-y border-white/10 py-4 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-white/40">OPERATOR:</span>
              <span className="text-white font-semibold">{PORTFOLIO_DATA.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">CALLSIGN:</span>
              <span className="text-accent-cyan font-bold">{PORTFOLIO_DATA.codeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">ECOSYSTEM:</span>
              <span className="text-white">Translucent Core + Kali Linux Lab</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">SPECIALTY:</span>
              <span className="text-accent-mint">Wireless Frame Telemetry & Security Probes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">SECURITY INTEGRITY:</span>
              <span className="text-ios-green flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                Ethical Lab Certified
              </span>
            </div>
          </div>

          {/* Personal Developer Note */}
          <div className="p-5 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/25 text-white/80 leading-relaxed font-sans">
            <div className="text-accent-cyan font-bold mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Builder's Statement:
            </div>
            "Thanks for inspecting the interface so closely. I believe exceptional software combines rigorous first-principles engineering with intuitive, beautiful human interaction. Let's create ambitious things together."
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.4)] ios-pressable"
            >
              Dismiss Diagnostics [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
