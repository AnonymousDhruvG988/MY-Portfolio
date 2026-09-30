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
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const initialLogs: TerminalLog[] = [
    { id: '1', type: 'info', text: 'Kali GNU/Linux Rolling 2026.1 - Lab Shell Initialized.' },
    { id: '2', type: 'info', text: 'Kernel: Linux 6.8.0-kali1-amd64 #1 SMP PREEMPT' },
    { id: '3', type: 'alert', text: '[!] NOTICE: Authorized local lab environment. Educational & defensive security research only.' },
    { id: '4', type: 'info', text: 'Type a command or select a vector below. Available: airmon, airodump, aircrack, hashcat, john, recon, help, clear' },
  ];

  const [logs, setLogs] = useState<TerminalLog[]>(initialLogs);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    audioSystem.playTerminalKey();

    const newLogs: TerminalLog[] = [
      ...logs,
      { id: Date.now().toString(), type: 'command', text: `dhruv@kali:~/lab# ${trimmed}` },
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
          { id: Math.random().toString(), type: 'info', text: 'CH  6 ][ Elapsed: 00:00:14 ][ 2026-09-30 23:42' },
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
          { id: Math.random().toString(), type: 'output', text: 'OpenCL Platform #1: NVIDIA Corporation / CUDA 12.4' },
          { id: Math.random().toString(), type: 'output', text: 'Device #1: RTX Mobile Compute Core, 16384 MB allocatable' },
          { id: Math.random().toString(), type: 'output', text: 'Hashes: 1 digests; 1 unique digests (WPA-PBKDF2-PMKID+EAPOL)' },
          { id: Math.random().toString(), type: 'output', text: 'Speed.#1.........:   782.4 kH/s (85.22ms) @ Accel:64 Loops:1024' },
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
    <section id="offensive-lab" className="relative py-24 bg-bg-base border-t border-border-subtle overflow-hidden">
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-subtle pb-6">
          <div>
            <div className="font-mono text-xs text-accent-crimson tracking-widest uppercase mb-2 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-accent-crimson" />
              OFFENSIVE SECURITY & ETHICAL AUDITING LAB // 02
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-text-primary tracking-tight">
              {PORTFOLIO_DATA.securitySection.headline}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-2xl">
              {PORTFOLIO_DATA.securitySection.subtext}
            </p>
          </div>

          {/* Legal / Ethical Lab Badge */}
          <div className="flex items-center gap-2 px-3 py-2 bg-accent-crimson/10 border border-accent-crimson/30 rounded text-accent-crimson font-mono text-xs max-w-md">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="text-[11px] leading-tight">
              {PORTFOLIO_DATA.securitySection.disclaimer}
            </span>
          </div>
        </div>

        {/* Main 2-Column Interface: Left Tool Explorer, Right Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Security Tools Navigation & Detail (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider flex items-center justify-between">
              <span>TOOLCHAIN SPECIFICATION</span>
              <span>5 AUDIT VECTORS</span>
            </div>

            {/* Tool Selection Tabs */}
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
                    className={`text-left p-4 rounded border transition-all duration-200 relative overflow-hidden group ${
                      isSelected
                        ? 'bg-bg-surface border-accent-mint shadow-[0_0_15px_rgba(124,255,178,0.15)]'
                        : 'bg-bg-surface/50 border-border-subtle hover:border-border-bright hover:bg-bg-surface'
                    }`}
                  >
                    {/* Active Accent Indicator */}
                    {isSelected && (
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-accent-mint" />
                    )}

                    <div className="flex items-center justify-between mb-1.5 pl-2">
                      <div className="flex items-center gap-2">
                        {tool.category === 'WIRELESS AUDITING' ? (
                          <Wifi className={`w-4 h-4 ${isSelected ? 'text-accent-mint' : 'text-text-muted'}`} />
                        ) : tool.category === 'CRYPTANALYSIS' ? (
                          <Lock className={`w-4 h-4 ${isSelected ? 'text-accent-mint' : 'text-text-muted'}`} />
                        ) : (
                          <Cpu className={`w-4 h-4 ${isSelected ? 'text-accent-mint' : 'text-text-muted'}`} />
                        )}
                        <span className={`font-display font-bold text-base ${isSelected ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                          {tool.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-accent-cyan">
                        {tool.category}
                      </span>
                    </div>

                    <p className="text-xs text-text-muted line-clamp-2 pl-2 mb-2 font-normal">
                      {tool.roleDescription}
                    </p>

                    <div className="flex items-center justify-between pl-2 pt-2 border-t border-border-subtle/50 font-mono text-[10px]">
                      <span className="text-accent-mint/90">{tool.masteryStatus}</span>
                      <span className="text-text-muted group-hover:text-accent-mint transition-colors">
                        INSPECT VECTOR →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Tool Deep Dive Panel */}
            <div className="p-5 rounded border border-border-bright bg-bg-surface/90 bracket-box mt-2">
              <div className="flex items-center justify-between mb-3 border-b border-border-subtle pb-2">
                <span className="font-mono text-xs text-accent-mint font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  VECTOR: {selectedTool.name}
                </span>
                <span className="font-mono text-[10px] text-text-muted">KALI_SUITE_v2026</span>
              </div>

              <div className="text-xs text-text-secondary leading-relaxed mb-4">
                {selectedTool.explanation}
              </div>

              {/* Sample Command Box */}
              <div className="font-mono text-xs bg-bg-void p-3 rounded border border-border-subtle text-accent-mint mb-4 relative overflow-x-auto">
                <span className="text-text-muted mr-2">$</span>
                {selectedTool.syntaxExample}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedTool.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg-elevated text-text-secondary border border-border-subtle">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Button: Load into terminal */}
              <button
                onClick={() => handleQuickCommand(selectedTool.syntaxExample)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-bg-void bg-accent-mint hover:bg-accent-mint/90 rounded transition-all shadow-[0_0_12px_rgba(124,255,178,0.25)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                EXECUTE IN LIVE KALI TERMINAL
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Kali Terminal Simulator (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-accent-mint" />
                INTERACTIVE KALI LINUX SHELL
              </span>
              <span className="text-accent-mint text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
                READY FOR INPUT
              </span>
            </div>

            {/* Terminal Window Frame */}
            <div className="rounded border border-border-bright bg-bg-void shadow-2xl overflow-hidden flex flex-col h-[580px]">
              {/* Terminal Title Bar */}
              <div className="bg-bg-elevated/90 px-4 py-2.5 border-b border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-crimson/80" />
                  <div className="w-3 h-3 rounded-full bg-accent-amber/80" />
                  <div className="w-3 h-3 rounded-full bg-accent-mint/80" />
                  <span className="font-mono text-xs text-text-secondary ml-2 font-medium">
                    dhruv@kali: ~/lab (zsh)
                  </span>
                </div>
                <button
                  onClick={() => setLogs(initialLogs)}
                  title="Reset Terminal"
                  className="font-mono text-[11px] text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  RESET
                </button>
              </div>

              {/* Terminal Quick Command Chips */}
              <div className="bg-bg-surface/80 px-3 py-2 border-b border-border-subtle/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono scrollbar-none">
                <span className="text-text-muted shrink-0 text-[10px]">QUICK VECTORS:</span>
                <button
                  onClick={() => handleQuickCommand('airmon-ng start wlan0')}
                  className="px-2 py-0.5 rounded bg-bg-void hover:bg-accent-mint/10 border border-border-subtle hover:border-accent-mint/40 text-text-secondary hover:text-accent-mint shrink-0 transition-colors"
                >
                  airmon-ng
                </button>
                <button
                  onClick={() => handleQuickCommand('airodump-ng -c 6 wlan0mon')}
                  className="px-2 py-0.5 rounded bg-bg-void hover:bg-accent-mint/10 border border-border-subtle hover:border-accent-mint/40 text-text-secondary hover:text-accent-mint shrink-0 transition-colors"
                >
                  airodump-ng
                </button>
                <button
                  onClick={() => handleQuickCommand('hashcat -m 22000 handshake.hc22000')}
                  className="px-2 py-0.5 rounded bg-bg-void hover:bg-accent-mint/10 border border-border-subtle hover:border-accent-mint/40 text-text-secondary hover:text-accent-mint shrink-0 transition-colors"
                >
                  hashcat
                </button>
                <button
                  onClick={() => handleQuickCommand('john --format=sha512crypt hashes.txt')}
                  className="px-2 py-0.5 rounded bg-bg-void hover:bg-accent-mint/10 border border-border-subtle hover:border-accent-mint/40 text-text-secondary hover:text-accent-mint shrink-0 transition-colors"
                >
                  john
                </button>
                <button
                  onClick={() => handleQuickCommand('python3 pyrecon.py')}
                  className="px-2 py-0.5 rounded bg-bg-void hover:bg-accent-mint/10 border border-border-subtle hover:border-accent-mint/40 text-text-secondary hover:text-accent-mint shrink-0 transition-colors"
                >
                  python probe
                </button>
                <button
                  onClick={() => handleQuickCommand('cat secret.txt')}
                  className="px-2 py-0.5 rounded bg-accent-crimson/15 border border-accent-crimson/30 text-accent-crimson shrink-0"
                >
                  cat secret.txt
                </button>
              </div>

              {/* Terminal Logs Output Stream */}
              <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 terminal-scroll bg-bg-void/95">
                {logs.map((log) => {
                  if (log.type === 'command') {
                    return (
                      <div key={log.id} className="text-text-primary font-semibold flex items-start gap-1">
                        <span className="text-accent-mint shrink-0">&gt;</span>
                        <span className="break-all">{log.text}</span>
                      </div>
                    );
                  }
                  if (log.type === 'success') {
                    return (
                      <div key={log.id} className="text-accent-mint flex items-start gap-1 pl-2">
                        <span>{log.text}</span>
                      </div>
                    );
                  }
                  if (log.type === 'alert') {
                    return (
                      <div key={log.id} className="text-accent-amber flex items-start gap-1 pl-2">
                        <span>{log.text}</span>
                      </div>
                    );
                  }
                  if (log.type === 'info') {
                    return (
                      <div key={log.id} className="text-accent-cyan flex items-start gap-1 pl-2">
                        <span>{log.text}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={log.id} className="text-text-secondary pl-2 whitespace-pre-wrap leading-relaxed">
                      {log.text}
                    </div>
                  );
                })}

                {isExecuting && (
                  <div className="text-accent-mint flex items-center gap-2 pl-2">
                    <span className="w-2 h-2 rounded-full bg-accent-mint animate-ping" />
                    <span>Executing subprocess kernel routines...</span>
                  </div>
                )}

                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Active Input Row */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runCommand(inputVal);
                  setInputVal('');
                }}
                className="bg-bg-surface border-t border-border-subtle p-3 flex items-center gap-2"
              >
                <span className="font-mono text-xs text-accent-mint font-bold shrink-0">
                  dhruv@kali:~/lab#
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type command ('help', 'airmon-ng', 'hashcat')..."
                  className="flex-1 bg-transparent text-text-primary font-mono text-xs focus:outline-none placeholder:text-text-muted"
                />
                <button
                  type="submit"
                  disabled={isExecuting}
                  className="font-mono text-[11px] px-3 py-1 bg-accent-mint/15 text-accent-mint border border-accent-mint/30 rounded hover:bg-accent-mint hover:text-bg-void transition-colors"
                >
                  SEND
                </button>
              </form>
            </div>

            {/* Protocol Architecture Mini Flowchart */}
            <div className="p-4 rounded border border-border-subtle bg-bg-surface/40 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-text-muted">
              <div className="flex items-center gap-2">
                <span className="text-accent-mint font-bold">FLOW:</span>
                <span>MONITOR (airmon-ng)</span>
                <span>→</span>
                <span>CAPTURE (airodump-ng)</span>
                <span>→</span>
                <span>VERIFY (aircrack-ng)</span>
                <span>→</span>
                <span>CRUNCH (hashcat)</span>
              </div>
              <div className="text-[10px] text-text-secondary">
                TARGET: 802.11i WPA2-PSK 4-WAY HANDSHAKE INTEGRITY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
