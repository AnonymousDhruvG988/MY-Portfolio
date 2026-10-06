import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA, type SecurityTool } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { Shield, Terminal, Play, RotateCcw, CheckCircle, Wifi, Lock, Cpu, AlertTriangle } from 'lucide-react';

interface TerminalLog {
  id: string;
  type: 'command' | 'output' | 'success' | 'alert' | 'info';
  text: string;
}

export const OffensiveSecurityLab: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<SecurityTool>(PORTFOLIO_DATA.securitySection.tools[0]);
  const [inputVal, setInputVal] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const terminalLogsContainerRef = useRef<HTMLDivElement>(null);
  const hasUserRunCommandRef = useRef(false);

  const initialLogs: TerminalLog[] = [
    { id: '1', type: 'info', text: 'Terminal.app [Kali Linux Subsystem v2026.1]' },
    { id: '2', type: 'info', text: 'Kernel: Linux 6.8.0-kali1-amd64 #1 SMP PREEMPT (x86_64)' },
    { id: '3', type: 'alert', text: '[!] Authorized Local Lab Sandbox. Educational research and defensive security auditing.' },
    { id: '4', type: 'info', text: 'Ready. Choose a tool below or enter command: airmon, airodump, aircrack, hashcat, john, recon, help, clear' },
  ];

  const [logs, setLogs] = useState<TerminalLog[]>(initialLogs);

  useEffect(() => {
    // Only scroll the internal terminal container, never the window
    if (hasUserRunCommandRef.current && terminalLogsContainerRef.current) {
      terminalLogsContainerRef.current.scrollTop = terminalLogsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    audioSystem.playTerminalKey();
    hasUserRunCommandRef.current = true;

    const newLogs: TerminalLog[] = [
      ...logs,
      { id: Date.now().toString(), type: 'command', text: `dhruv@kali:~/lab$ ${trimmed}` },
    ];

    setLogs(newLogs);
    setIsExecuting(true);

    const lower = trimmed.toLowerCase();

    setTimeout(() => {
      let output: TerminalLog[] = [];

      if (lower === 'clear') {
        setLogs([]);
        setIsExecuting(false);
        return;
      } else if (lower.includes('help')) {
        output = [
          { id: Math.random().toString(), type: 'info', text: '=== KALI OFFENSIVE LAB SIMULATOR COMMANDS ===' },
          { id: Math.random().toString(), type: 'output', text: 'airmon-ng start wlan0                  : Switch wireless chipset to monitor mode' },
          { id: Math.random().toString(), type: 'output', text: 'airodump-ng -c 6 wlan0mon              : Scan 802.11 RF beacons & EAPOL handshakes' },
          { id: Math.random().toString(), type: 'output', text: 'aircrack-ng -w wordlist.txt capture.cap: Audit 4-way WPA handshake integrity' },
          { id: Math.random().toString(), type: 'output', text: 'hashcat -m 22000 handshake.hc22000    : GPU-accelerated PMKID / PBKDF2 hash audit' },
          { id: Math.random().toString(), type: 'output', text: 'john --format=sha512crypt hashes.txt   : Password entropy and shadow file analysis' },
          { id: Math.random().toString(), type: 'output', text: 'python3 pyrecon.py                     : Run Python socket port & banner probe' },
          { id: Math.random().toString(), type: 'output', text: 'cat secret.txt                         : Display developer lab notes' },
          { id: Math.random().toString(), type: 'output', text: 'clear                                  : Clear terminal buffer' },
        ];
      } else if (lower.includes('airmon-ng')) {
        output = [
          { id: Math.random().toString(), type: 'info', text: 'Killing 2 interfering processes (NetworkManager, wpa_supplicant)...' },
          { id: Math.random().toString(), type: 'output', text: 'PHY     Interface       Driver          Chipset' },
          { id: Math.random().toString(), type: 'output', text: 'phy0    wlan0           ath9k_htc       Atheros AR9271 802.11n' },
          { id: Math.random().toString(), type: 'success', text: '[+] (mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]wlan0mon)' },
          { id: Math.random().toString(), type: 'success', text: '[+] Monitor mode active on interface wlan0mon. Ready for raw frame telemetry.' },
        ];
      } else if (lower.includes('airodump-ng')) {
        output = [
          { id: Math.random().toString(), type: 'info', text: 'CH  6 ][ Elapsed: 00:00:14 ][ 2026-10-01 00:54' },
          { id: Math.random().toString(), type: 'output', text: 'BSSID              PWR  Beacons  #Data  #/s  CH   MB   ENC  CIPHER  AUTH  ESSID' },
          { id: Math.random().toString(), type: 'output', text: '00:14:6C:7E:40:80  -42       48    312   12   6  130   WPA2 CCMP    PSK   LAB_TEST_NET' },
          { id: Math.random().toString(), type: 'alert', text: '[*] WPA Handshake: 00:14:6C:7E:40:80 detected! EAPOL frames (1/4, 2/4, 3/4, 4/4) verified.' },
          { id: Math.random().toString(), type: 'success', text: '[+] WPA2 handshake captured cleanly to /root/lab/handshake-01.cap' },
        ];
      } else if (lower.includes('aircrack-ng')) {
        output = [
          { id: Math.random().toString(), type: 'info', text: 'Reading packets, please wait...' },
          { id: Math.random().toString(), type: 'output', text: 'Opening /root/lab/handshake-01.cap' },
          { id: Math.random().toString(), type: 'output', text: 'Read 21450 packets.' },
          { id: Math.random().toString(), type: 'output', text: '#  BSSID              ESSID                     Encryption' },
          { id: Math.random().toString(), type: 'output', text: '1  00:14:6C:7E:40:80  LAB_TEST_NET              WPA (1 handshake)' },
          { id: Math.random().toString(), type: 'info', text: 'Evaluating EAPOL frame MIC against cryptographic wordlist...' },
          { id: Math.random().toString(), type: 'success', text: '[+] Handshake verified valid: PMK derived from PBKDF2-HMAC-SHA1 4096 iterations.' },
          { id: Math.random().toString(), type: 'output', text: 'Entropy analysis: 14 character high-entropy key prevents precomputation dictionary attacks.' },
        ];
      } else if (lower.includes('hashcat')) {
        output = [
          { id: Math.random().toString(), type: 'info', text: 'hashcat (v6.2.6) starting in autodetect mode...' },
          { id: Math.random().toString(), type: 'output', text: 'OpenCL Platform #1: Neural Compute Engine / CUDA Core Emulation' },
          { id: Math.random().toString(), type: 'output', text: 'Device #1: Neural & GPU Core, 16384 MB allocatable' },
          { id: Math.random().toString(), type: 'output', text: 'Hashes: 1 digests; 1 unique digests (WPA-PBKDF2-PMKID+EAPOL)' },
          { id: Math.random().toString(), type: 'output', text: 'Speed.#1.........:   892.4 kH/s (85.22ms) @ Accel:64 Loops:1024' },
          { id: Math.random().toString(), type: 'success', text: '[+] Status...........: Running (Benchmark / Entropy Audit Mode)' },
          { id: Math.random().toString(), type: 'info', text: 'Session finished. Cryptographic verification completed.' },
        ];
      } else if (lower.includes('john')) {
        output = [
          { id: Math.random().toString(), type: 'info', text: 'Loaded 1 password hash (sha512crypt, crypt(3) $6$ [SHA512 256/256 AVX2 4x])' },
          { id: Math.random().toString(), type: 'output', text: 'Cost 1 (iteration count) is 5000 for all loaded hashes' },
          { id: Math.random().toString(), type: 'output', text: 'Proceeding with wordlist mutation rules (JtR Best64 rule matrix)...' },
          { id: Math.random().toString(), type: 'output', text: 'Guesses: 0  time: 0:00:00:02  c/s: 4890  trying: testing123 - security2026' },
          { id: Math.random().toString(), type: 'success', text: '[+] Audit complete: Salted hash prevents rainbow table lookups.' },
        ];
      } else if (lower.includes('pyrecon') || lower.includes('python')) {
        output = [
          { id: Math.random().toString(), type: 'info', text: '[*] PyRecon v1.2: Initializing concurrent socket pool (50 threads)...' },
          { id: Math.random().toString(), type: 'output', text: '[+] Target: 192.168.1.0/24 | Ports: 21, 22, 80, 443, 3306, 8080' },
          { id: Math.random().toString(), type: 'output', text: '192.168.1.1:22   -> OPEN [SSH-2.0-OpenSSH_9.6p1 Debian]' },
          { id: Math.random().toString(), type: 'output', text: '192.168.1.1:80   -> OPEN [nginx/1.24.0 (Ubuntu)]' },
          { id: Math.random().toString(), type: 'output', text: '192.168.1.1:3306 -> OPEN [MySQL 8.0.36 - Handshake Accepted]' },
          { id: Math.random().toString(), type: 'success', text: '[+] Scan complete in 1.42s. 3 open ports, 0 dropped frames.' },
        ];
      } else if (lower.includes('secret') || lower.includes('flag')) {
        output = [
          { id: Math.random().toString(), type: 'success', text: '=== DHRUV GOSWAMI // LAB LOG 0xDG988 ===' },
          { id: Math.random().toString(), type: 'output', text: '"Curiosity is the engine of technical competence.' },
          { id: Math.random().toString(), type: 'output', text: 'To build secure applications, you must understand how communications are sniffed,' },
          { id: Math.random().toString(), type: 'output', text: 'how keys are exchanged, and why lazy assumptions crumble under attack.' },
          { id: Math.random().toString(), type: 'info', text: 'Always learn. Always build. Always respect ethical boundaries."' },
        ];
      } else {
        output = [
          { id: Math.random().toString(), type: 'alert', text: `bash: ${trimmed}: command simulated. Type 'help' for lab tools.` },
        ];
      }

      setLogs((prev) => [...prev, ...output]);
      setIsExecuting(false);
      audioSystem.playAccessGranted();
    }, 450);
  };

  const handleQuickCommand = (cmd: string) => {
    setInputVal(cmd);
    runCommand(cmd);
  };

  return (
    <section id="offensive-lab" className="relative py-28 overflow-hidden">
      {/* Background Soft Refractive Glows */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-accent-crimson/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 dark:bg-accent-crimson/10 mb-3 border border-rose-300/60 dark:border-white/10">
              <Shield className="w-3.5 h-3.5 text-accent-crimson" />
              <span className="font-sans text-xs font-semibold text-rose-700 dark:text-accent-crimson">
                Offensive Security & Wireless Auditing Hub
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
              {PORTFOLIO_DATA.securitySection.headline}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-white/70 max-w-2xl font-sans">
              {PORTFOLIO_DATA.securitySection.subtext}
            </p>
          </div>

          {/* Legal / Ethical Lab Frosted Pill Badge */}
          <div className="liquid-glass p-3.5 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-white/15 max-w-md">
            <div className="w-8 h-8 rounded-xl bg-accent-crimson/15 flex items-center justify-center shrink-0 text-accent-crimson">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-sans text-slate-700 dark:text-white/70 leading-snug">
              {PORTFOLIO_DATA.securitySection.disclaimer}
            </span>
          </div>
        </div>

        {/* 2-Column Interface: Left Tool Explorer, Right Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Security Tool Suite Tiles (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            <div className="font-sans text-xs font-semibold text-slate-500 dark:text-white/50 uppercase tracking-wider px-1">
              Active Security Tool Suite (5 Vectors)
            </div>

            {/* Squircle Tool Tiles */}
            <div className="grid grid-cols-1 gap-2.5">
              {PORTFOLIO_DATA.securitySection.tools.map((tool) => {
                const isSelected = selectedTool.id === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedTool(tool);
                      audioSystem.playHover();
                    }}
                    className={`text-left p-4 rounded-[22px] transition-all duration-300 relative overflow-hidden group ios-pressable hover:-translate-y-1 hover:shadow-xl ${
                      isSelected
                        ? 'liquid-glass-elevated border-accent-blue/50 dark:border-accent-cyan/60 shadow-[0_10px_30px_rgba(100,210,255,0.18)]'
                        : 'liquid-glass hover:bg-slate-50 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/30 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-gradient-to-tr from-accent-cyan to-accent-blue text-white shadow-[0_0_12px_rgba(100,210,255,0.4)]'
                            : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white'
                        }`}>
                          {tool.category === 'WIRELESS AUDITING' ? (
                            <Wifi className="w-4 h-4" />
                          ) : tool.category === 'CRYPTANALYSIS' ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Cpu className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-sans font-bold text-sm text-slate-900 dark:text-white">
                            {tool.name}
                          </div>
                          <div className="text-[11px] font-sans text-slate-500 dark:text-white/50">
                            {tool.masteryStatus}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-accent-blue dark:text-accent-cyan border border-slate-200 dark:border-white/10">
                        {tool.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-white/70 line-clamp-2 pl-1 mb-2 font-sans">
                      {tool.roleDescription}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Tool Detail Card */}
            <div className="liquid-glass p-5 rounded-[26px] border border-slate-200 dark:border-white/15 frosted-squircle mt-1">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-white/10 pb-2">
                <span className="font-sans text-xs font-bold text-accent-blue dark:text-accent-cyan flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-accent-mint" />
                  Active Spec: {selectedTool.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-white/40">KALI_LAB</span>
              </div>

              <p className="text-xs text-slate-700 dark:text-white/80 font-sans leading-relaxed mb-3">
                {selectedTool.explanation}
              </p>

              {/* Monospace Code Pill */}
              <div className="font-mono text-xs bg-[#0B1120] p-3 rounded-xl border border-slate-800 text-emerald-300 dark:text-accent-mint mb-3 overflow-x-auto dark-console">
                <span className="text-slate-500 dark:text-white/40 mr-2">$</span>
                {selectedTool.syntaxExample}
              </div>

              {/* Action Button: Execute in terminal */}
              <button
                onClick={() => handleQuickCommand(selectedTool.syntaxExample)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue hover:from-accent-cyan/90 hover:to-accent-blue/90 text-white font-sans text-xs font-bold transition-all shadow-[0_0_20px_rgba(100,210,255,0.3)] ios-pressable"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute In Terminal</span>
              </button>
            </div>
          </div>

          {/* Right Column: Security Terminal (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            <div className="font-sans text-xs font-semibold text-slate-500 dark:text-white/50 uppercase tracking-wider px-1 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
                Terminal // Kali Linux Sandbox
              </span>
              <span className="text-emerald-500 dark:text-emerald-400 text-xs font-sans flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                Active Shell
              </span>
            </div>

            {/* Terminal Window Frame - Authentic High Contrast Kali Linux Developer Console */}
            <div className="rounded-[32px] bg-[#070C18] border border-cyan-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(100,210,255,0.14)] overflow-hidden flex flex-col h-[520px] sm:h-[590px] frosted-squircle dark-console ring-1 ring-white/10 gpu-layer">
              {/* Traffic Light Header Bar */}
              <div className="bg-[#0E1528] px-5 py-3.5 border-b border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full glass-traffic-red cursor-pointer" />
                  <div className="w-3 h-3 rounded-full glass-traffic-yellow cursor-pointer" />
                  <div className="w-3 h-3 rounded-full glass-traffic-green cursor-pointer" />
                  <span className="font-mono text-xs text-slate-100 ml-3 font-medium flex items-center gap-2">
                    <span className="text-accent-cyan font-bold">dhruv@kali:</span>
                    <span className="text-slate-300">~/lab (zsh)</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline">
                    SANDBOX ACTIVE
                  </span>
                  <button
                    onClick={() => setLogs(initialLogs)}
                    title="Reset Terminal"
                    className="font-sans text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 transition-colors border border-white/10"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Quick Vector Action Pills */}
              <div className="bg-[#0A1020] px-4 py-2.5 border-b border-cyan-500/15 flex items-center gap-1.5 overflow-x-auto text-[11px] font-sans no-scrollbar">
                <span className="text-slate-400 shrink-0 text-[10px] mr-1 font-mono uppercase">QUICK ACTIONS:</span>
                <button
                  onClick={() => handleQuickCommand('airmon-ng start wlan0')}
                  className="px-2.5 py-1 rounded-full bg-[#131C33] hover:bg-[#1E2B4E] text-slate-100 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 shrink-0 transition-all font-mono"
                >
                  airmon-ng
                </button>
                <button
                  onClick={() => handleQuickCommand('airodump-ng -c 6 wlan0mon')}
                  className="px-2.5 py-1 rounded-full bg-[#131C33] hover:bg-[#1E2B4E] text-slate-100 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 shrink-0 transition-all font-mono"
                >
                  airodump-ng
                </button>
                <button
                  onClick={() => handleQuickCommand('hashcat -m 22000 handshake.hc22000')}
                  className="px-2.5 py-1 rounded-full bg-[#131C33] hover:bg-[#1E2B4E] text-slate-100 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 shrink-0 transition-all font-mono"
                >
                  hashcat
                </button>
                <button
                  onClick={() => handleQuickCommand('john --format=sha512crypt hashes.txt')}
                  className="px-2.5 py-1 rounded-full bg-[#131C33] hover:bg-[#1E2B4E] text-slate-100 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 shrink-0 transition-all font-mono"
                >
                  john
                </button>
                <button
                  onClick={() => handleQuickCommand('python3 pyrecon.py')}
                  className="px-2.5 py-1 rounded-full bg-[#131C33] hover:bg-[#1E2B4E] text-slate-100 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 shrink-0 transition-all font-mono"
                >
                  python probe
                </button>
                <button
                  onClick={() => handleQuickCommand('cat secret.txt')}
                  className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 shrink-0 hover:bg-rose-500/30 transition-colors font-mono"
                >
                  cat secret.txt
                </button>
              </div>

              {/* Terminal Logs Output Stream */}
              <div ref={terminalLogsContainerRef} className="flex-1 p-5 font-mono text-xs overflow-y-auto space-y-2 bg-[#070B16] text-slate-100">
                {logs.map((log) => {
                  if (log.type === 'command') {
                    return (
                      <div key={log.id} className="text-white font-semibold flex items-start gap-1.5 bg-white/[0.04] p-1.5 rounded-lg border-l-2 border-accent-cyan">
                        <span className="text-accent-cyan font-bold shrink-0">&gt;</span>
                        <span className="break-all text-white font-mono">{log.text}</span>
                      </div>
                    );
                  }
                  if (log.type === 'success') {
                    return (
                      <div key={log.id} className="text-emerald-400 flex items-start gap-1 pl-2 font-mono">
                        <span className="text-emerald-300 font-bold">[+]</span>
                        <span>{log.text}</span>
                      </div>
                    );
                  }
                  if (log.type === 'alert') {
                    return (
                      <div key={log.id} className="text-amber-300 flex items-start gap-1 pl-2 font-mono">
                        <span className="text-amber-400 font-bold">[!]</span>
                        <span>{log.text}</span>
                      </div>
                    );
                  }
                  if (log.type === 'info') {
                    return (
                      <div key={log.id} className="text-accent-cyan flex items-start gap-1 pl-2 font-mono">
                        <span className="text-accent-cyan font-bold">[*]</span>
                        <span>{log.text}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={log.id} className="text-slate-200 pl-3 whitespace-pre-wrap leading-relaxed font-mono">
                      {log.text}
                    </div>
                  );
                })}

                {isExecuting && (
                  <div className="text-accent-cyan flex items-center gap-2 pl-2">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
                    <span className="font-mono text-accent-cyan">Executing kernel routine...</span>
                  </div>
                )}
              </div>

              {/* Terminal Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runCommand(inputVal);
                  setInputVal('');
                }}
                className="bg-[#0B1224] border-t border-cyan-500/20 p-3 sm:p-3.5 flex items-center gap-2"
              >
                <span className="font-mono text-xs text-accent-cyan font-bold shrink-0">
                  dhruv@kali:~/lab$&nbsp;
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type command ('help', 'airmon-ng', 'hashcat')..."
                  className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-400 caret-cyan-400"
                />
                <button
                  type="submit"
                  disabled={isExecuting}
                  className="font-sans text-xs px-3.5 py-1.5 bg-gradient-to-r from-accent-cyan to-accent-blue hover:from-accent-cyan/90 hover:to-accent-blue/90 text-white font-semibold rounded-full transition-all shadow-[0_0_12px_rgba(100,210,255,0.3)] ios-pressable shrink-0"
                >
                  Return
                </button>
              </form>
            </div>

            {/* Pipeline Flow Strip */}
            <div className="p-4 rounded-2xl liquid-glass border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-sans text-slate-600 dark:text-white/60">
              <div className="flex items-center gap-2">
                <span className="text-accent-blue dark:text-accent-cyan font-bold">PIPELINE:</span>
                <span>Monitor</span>
                <span>→</span>
                <span>Capture</span>
                <span>→</span>
                <span>Verify</span>
                <span>→</span>
                <span>Cryptanalysis</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-white/40">
                802.11 WPA2 4-WAY HANDSHAKE INTEGRITY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

