import React, { useState, useEffect } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import { Shield, Cpu, X, Zap } from 'lucide-react';

export default function EasterEggs({
  overrideActive,
  onCloseOverride,
  diagnosticActive,
  onCloseDiagnostic,
  wireframeActive,
  onToggleWireframe
}) {
  const [fps, setFps] = useState(60);
  const [cmdInput, setCmdInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    'AUTHENTICATING DEVELOPER SHELL...',
    'SYSTEM TELEMETRY UNLOCKED.',
    'TYPE "help" FOR AVAILABLE COMMANDS.'
  ]);

  useEffect(() => {
    if (!diagnosticActive) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, [diagnosticActive]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;
    const input = cmdInput.trim().toLowerCase();
    sound.playMechanicalTick(1100);

    let response = '';
    if (input === 'help') {
      response = 'COMMANDS: wireframe, whoami, philosophy, clear, exit';
    } else if (input === 'wireframe') {
      onToggleWireframe();
      response = `WIREFRAME MODE: ${wireframeActive ? 'DEACTIVATED' : 'ACTIVATED'}`;
    } else if (input === 'whoami') {
      response = `IDENTITY: ${DEVELOPER_DATA.profile.name} // ${DEVELOPER_DATA.profile.role}`;
    } else if (input === 'philosophy') {
      response = `MOTTO: "${DEVELOPER_DATA.profile.shortPhilosophy}"`;
    } else if (input === 'clear') {
      setTerminalLogs([]);
      setCmdInput('');
      return;
    } else if (input === 'exit') {
      onCloseOverride();
      return;
    } else {
      response = `Unknown command: "${input}". Type "help" for options.`;
    }

    setTerminalLogs((prev) => [...prev, `$ ${cmdInput}`, response]);
    setCmdInput('');
  };

  return (
    <>
      {/* 1. OVERRIDE / EASTER EGG TERMINAL */}
      {overrideActive && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#0c101a] border border-indigo-500/30 p-6 rounded-2xl relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-indigo-400" />
                <h3 className="font-display font-bold text-sm text-white">
                  Developer Quick Shell
                </h3>
              </div>
              <button
                onClick={onCloseOverride}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
              <span>Toggle Wireframe Mode:</span>
              <button
                onClick={onToggleWireframe}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  wireframeActive
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                {wireframeActive ? 'Active' : 'Disabled'}
              </button>
            </div>

            {/* Terminal View */}
            <div className="border border-white/10 bg-black/70 p-3.5 rounded-xl font-mono text-xs">
              <div className="h-32 overflow-y-auto space-y-1 text-slate-300 mb-2 scrollbar-thin">
                {terminalLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.startsWith('$')
                        ? 'text-indigo-400 font-semibold'
                        : 'text-emerald-400'
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-white/10 pt-2">
                <span className="text-indigo-400 font-bold">$</span>
                <input
                  type="text"
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  placeholder="type 'help', 'wireframe', 'whoami', 'exit'..."
                  className="w-full bg-transparent border-none text-white text-xs font-mono focus:outline-none placeholder:text-slate-600"
                  autoFocus
                />
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. DIAGNOSTIC TELEMETRY HUD */}
      {diagnosticActive && (
        <div className="fixed bottom-6 right-6 z-50 w-72 bg-[#0c101a]/95 border border-indigo-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-xl font-mono text-xs animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-[11px] font-display">SYSTEM TELEMETRY</span>
            </div>
            <button
              onClick={onCloseDiagnostic}
              className="text-slate-400 hover:text-white text-xs"
              aria-label="Close"
            >
              [X]
            </button>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">ENGINE FPS:</span>
              <span className={fps > 50 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                {fps} FPS
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">AUDIO SYNTH:</span>
              <span className="text-slate-200">
                {sound.isEnabled() ? 'ENABLED' : 'MUTED'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">CYBER LAB:</span>
              <span className="text-cyan-400">SIMULATION READY</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
