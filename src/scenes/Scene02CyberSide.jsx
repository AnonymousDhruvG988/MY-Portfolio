import React, { useState } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import {
  Shield,
  Terminal as TerminalIcon,
  Radio,
  Search,
  Activity,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Scene02CyberSide() {
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal', 'wireshark', 'wireless', 'crypto'
  const [selectedPacket, setSelectedPacket] = useState(null);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: 'whoami', out: 'developer // b.tech explorer' },
    { cmd: 'uname -a', out: 'Linux kali-lab 6.6.9-kali1-amd64 #1 SMP PREEMPT_DYNAMIC Kali' },
    { cmd: 'cat /etc/security-lab.conf', out: 'FOCUS="Network Analysis & Protocol Dissection"\nTOOLS="Wireshark, airmon-ng, Python Sockets"\nSTATUS="Active Exploration & Lab Verification"' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Wireshark Simulated Packet Stream
  const [packets] = useState([
    {
      id: 1,
      time: '0.000000',
      source: '192.168.1.104',
      dest: '192.168.1.1',
      protocol: 'DNS',
      length: 74,
      info: 'Standard query 0x1a2b A internal-lab.local',
      hex: '45 00 00 4a a1 2c 00 00 40 11 b8 e2 c0 a8 01 68 c0 a8 01 01'
    },
    {
      id: 2,
      time: '0.001420',
      source: '192.168.1.1',
      dest: '192.168.1.104',
      protocol: 'DNS',
      length: 90,
      info: 'Standard response 0x1a2b A 192.168.1.250',
      hex: '45 00 00 5a 00 01 00 00 40 11 b8 d2 c0 a8 01 01 c0 a8 01 68'
    },
    {
      id: 3,
      time: '0.003180',
      source: '192.168.1.104',
      dest: '192.168.1.250',
      protocol: 'TCP',
      length: 66,
      info: '54210 → 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460',
      hex: '45 00 00 42 e4 51 40 00 40 06 75 a4 c0 a8 01 68 c0 a8 01 fa'
    },
    {
      id: 4,
      time: '0.004810',
      source: '192.168.1.250',
      dest: '192.168.1.104',
      protocol: 'TCP',
      length: 66,
      info: '443 → 54210 [SYN, ACK] Seq=0 Ack=1 Win=65160 Len=0',
      hex: '45 00 00 42 12 a8 00 00 3c 06 47 4e c0 a8 01 fa c0 a8 01 68'
    },
    {
      id: 5,
      time: '0.005110',
      source: '192.168.1.104',
      dest: '192.168.1.250',
      protocol: 'TLSv1.3',
      length: 517,
      info: 'Client Hello, Version: TLS 1.3 (0x0304)',
      hex: '16 03 01 02 00 01 00 01 fc 03 03 f4 a1 b9 73 d1 e4 88 23 10'
    },
    {
      id: 6,
      time: '0.008920',
      source: '192.168.1.104',
      dest: '192.168.1.255',
      protocol: 'ARP',
      length: 42,
      info: 'Who has 192.168.1.1? Tell 192.168.1.104',
      hex: 'ff ff ff ff ff ff 00 1a 2b 3c 4d 5e 08 06 00 01 08 00 06 04'
    }
  ]);

  // Wireless simulation nodes
  const [wirelessNodes] = useState([
    { bssid: 'F4:8C:EB:21:40:91', essid: 'LAB_SECURE_5G', channel: 36, signal: -42, clients: 3, enc: 'WPA2-PSK' },
    { bssid: 'A0:04:60:88:12:DF', essid: 'GATEWAY_TEST_24', channel: 6, signal: -58, clients: 5, enc: 'WPA2-CCMP' },
    { bssid: '38:D5:47:19:AA:08', essid: 'IOT_ISOLATION_ZONE', channel: 11, signal: -71, clients: 2, enc: 'WPA3' },
    { bssid: 'BC:A9:93:55:76:30', essid: 'TELEMETRY_BENCH', channel: 149, signal: -49, clients: 1, enc: 'WPA2-PSK' }
  ]);

  // Hash lab state
  const [hashAnalysisState, setHashAnalysisState] = useState('IDLE');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const startHashAnalysis = () => {
    sound.playPacketPing(1100);
    setHashAnalysisState('ANALYZING');
    setAnalysisProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setAnalysisProgress(p);
      sound.playMechanicalTick(700 + p * 8);
      if (p >= 100) {
        clearInterval(interval);
        setHashAnalysisState('RESOLVED');
        sound.playPacketPing(1800);
      }
    }, 180);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    sound.playMechanicalTick(1000);

    let out = '';
    if (cmd === 'help') {
      out = 'COMMANDS: whoami, tools, scan, uname, clear, status';
    } else if (cmd === 'whoami') {
      out = 'developer // b.tech student // curious builder';
    } else if (cmd === 'tools') {
      out = 'Kali Linux, Wireshark, airmon-ng, Python raw sockets';
    } else if (cmd === 'scan') {
      out = 'SYNTHETIC SCAN: 4 local lab test beacons detected. Zero external networks targeted.';
    } else if (cmd === 'uname' || cmd === 'uname -a') {
      out = 'Linux kali-lab 6.6.9-kali1-amd64 #1 SMP PREEMPT_DYNAMIC Kali';
    } else if (cmd === 'status') {
      out = 'ACTIVE // EXPLORING PROTOCOLS & NETWORK LAYER BEHAVIOR';
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      out = `bash: command not found: ${cmd}. Type "help" for valid lab commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: terminalInput, out }]);
    setTerminalInput('');
  };

  return (
    <section id="scene-02" className="chapter-section relative bg-[#04060a] border-t border-b border-cyan-500/20 py-24">
      
      {/* Cyan & Dark Slate Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] pointer-events-none" />

      <div className="scene-container relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="modern-badge cyan">
                <Shield className="w-3.5 h-3.5" />
                CHAPTER 02 // THE CYBER SIDE
              </span>
              <span className="modern-badge">
                Kali Linux Security Lab
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
              CYBERSECURITY & <br className="hidden sm:inline" />
              <span className="gradient-text-cyan">
                NETWORK ANALYSIS.
              </span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-slate-400 space-y-1 bg-black/60 border border-cyan-500/20 p-3.5 rounded-xl">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>TRUTHFUL POSITIONING:</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Exploring Kali Linux, Wireshark packet inspection, and wireless monitoring in an isolated laboratory setting with synthetic data.
            </p>
          </div>
        </div>

        {/* Kali Workbench Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => {
              sound.playMechanicalTick(900);
              setActiveTab('terminal');
            }}
            data-cursor="TERMINAL"
            className={`px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all ${
              activeTab === 'terminal'
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>KALI LINUX TERMINAL</span>
          </button>

          <button
            onClick={() => {
              sound.playMechanicalTick(900);
              setActiveTab('wireshark');
            }}
            data-cursor="PACKETS"
            className={`px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all ${
              activeTab === 'wireshark'
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>WIRESHARK PACKET DISSECTION</span>
          </button>

          <button
            onClick={() => {
              sound.playMechanicalTick(900);
              setActiveTab('wireless');
            }}
            data-cursor="AIRMON"
            className={`px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all ${
              activeTab === 'wireless'
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>AIRMON-NG WIRELESS LAB</span>
          </button>

          <button
            onClick={() => {
              sound.playMechanicalTick(900);
              setActiveTab('crypto');
            }}
            data-cursor="HASH LAB"
            className={`px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all ${
              activeTab === 'crypto'
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>HASH & FILE SECURITY LAB</span>
          </button>
        </div>

        {/* TAB 1: KALI LINUX TERMINAL */}
        {activeTab === 'terminal' && (
          <div className="bg-[#0b0f19] border border-cyan-500/30 rounded-xl p-5 sm:p-6 font-mono text-xs shadow-2xl max-w-4xl mx-auto space-y-4 animate-in fade-in duration-200">
            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] text-slate-400 ml-2 font-semibold">
                  kali@security-lab: ~
                </span>
              </div>
              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                KALI LINUX 2026
              </span>
            </div>

            {/* Scrollable Command Log */}
            <div className="min-h-[220px] max-h-[320px] overflow-y-auto space-y-3 scrollbar-thin">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-cyan-400 font-bold">
                    ┌──(kali㉿security-lab)-[~]
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">└─$</span>
                    <span className="text-white font-semibold">{item.cmd}</span>
                  </div>
                  <div className="text-slate-300 pl-4 border-l-2 border-cyan-500/30 whitespace-pre-wrap text-[11px]">
                    {item.out}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Shell Input */}
            <form onSubmit={handleTerminalSubmit} className="pt-3 border-t border-white/10 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">kali@lab:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'whoami', 'tools', 'scan', 'uname', 'help'..."
                className="w-full bg-transparent border-none text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* TAB 2: WIRESHARK PACKET INSPECTOR */}
        {activeTab === 'wireshark' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
            {/* Packet Table */}
            <div className="lg:col-span-8 bg-[#0b0f19] p-4 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="font-bold">WIRESHARK CAPTURE: eth0 (SYNTHETIC)</span>
                </div>
                <span className="text-[10px] text-slate-500">RFC 791 / RFC 793</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-500 text-[10px] uppercase">
                      <th className="py-2 px-2">No.</th>
                      <th className="py-2 px-2">Time</th>
                      <th className="py-2 px-2">Source</th>
                      <th className="py-2 px-2">Destination</th>
                      <th className="py-2 px-2">Protocol</th>
                      <th className="py-2 px-2">Len</th>
                      <th className="py-2 px-2">Info</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {packets.map((pkt) => (
                      <tr
                        key={pkt.id}
                        onClick={() => {
                          sound.playPacketPing(1400);
                          setSelectedPacket(pkt);
                        }}
                        data-cursor="INSPECT"
                        className={`cursor-pointer transition-colors ${
                          selectedPacket?.id === pkt.id
                            ? 'bg-cyan-500/20 text-white'
                            : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <td className="py-2 px-2 text-slate-500">{pkt.id}</td>
                        <td className="py-2 px-2 text-slate-400">{pkt.time}</td>
                        <td className="py-2 px-2 text-cyan-400">{pkt.source}</td>
                        <td className="py-2 px-2 text-white">{pkt.dest}</td>
                        <td className="py-2 px-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              pkt.protocol === 'DNS'
                                ? 'bg-blue-500/20 text-blue-300'
                                : pkt.protocol === 'TCP'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : pkt.protocol === 'TLSv1.3'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}
                          >
                            {pkt.protocol}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-slate-400">{pkt.length}</td>
                        <td className="py-2 px-2 truncate max-w-[220px] text-slate-300">{pkt.info}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Packet Detail Inspector */}
            <div className="lg:col-span-4 bg-[#0b0f19] p-4 rounded-xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-xs">
                  <span className="text-cyan-400 font-bold">DEEP PACKET INSPECTION</span>
                  <span className="text-slate-500">
                    {selectedPacket ? `PKT #${selectedPacket.id}` : 'SELECT ROW'}
                  </span>
                </div>

                {selectedPacket ? (
                  <div className="mt-4 space-y-4 font-mono text-xs">
                    <div className="bg-black/60 p-3 rounded-lg border border-white/10 space-y-1">
                      <div className="text-[10px] text-cyan-400 font-bold uppercase">
                        DECODED HEADERS
                      </div>
                      <div className="text-slate-200">Protocol: {selectedPacket.protocol}</div>
                      <div className="text-slate-200">Source: {selectedPacket.source}</div>
                      <div className="text-slate-200">Destination: {selectedPacket.dest}</div>
                      <div className="text-slate-200">Payload: {selectedPacket.length} bytes</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 uppercase mb-1">
                        HEXADECIMAL DUMP
                      </div>
                      <div className="bg-black/80 p-2.5 rounded-lg border border-white/10 text-[11px] text-cyan-300 leading-relaxed tracking-wider break-all">
                        {selectedPacket.hex}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-center p-6 text-slate-500 font-mono text-xs space-y-2">
                    <Search className="w-8 h-8 text-slate-600" />
                    <span>Select any row in the capture to inspect decoded headers and hex payload.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AIRMON-NG WIRELESS LAB */}
        {activeTab === 'wireless' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
            <div className="lg:col-span-5 bg-[#0b0f19] p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest absolute top-4 left-4">
                AIRMON-NG LAB RADAR SWEEP
              </div>

              <div className="relative w-56 h-56 rounded-full border border-cyan-500/30 flex items-center justify-center my-6">
                <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/20" />
                <div className="absolute inset-12 rounded-full border border-cyan-500/15" />
                <div className="absolute inset-20 rounded-full border border-cyan-500/10" />

                <div className="absolute w-full h-px bg-cyan-500/20" />
                <div className="absolute h-full w-px bg-cyan-500/20" />

                <div className="radar-sweep-arm absolute w-1/2 h-px bg-gradient-to-r from-transparent to-cyan-400 origin-left left-1/2 top-1/2 shadow-[0_0_15px_#06b6d4]" />
                <div className="w-3 h-3 rounded-full bg-cyan-400 z-10 shadow-[0_0_10px_#06b6d4]" />

                <div className="absolute top-12 left-16 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <div className="absolute top-12 left-16 w-2 h-2 rounded-full bg-amber-400" />
                <div className="absolute bottom-16 right-14 w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <div className="font-mono text-[10px] text-slate-500 text-center">
                INTERFACE: wlan0mon // LAB TEST HARNESS
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0b0f19] p-6 rounded-xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                <span className="text-cyan-400 font-bold">SYNTHETIC 802.11 BEACON METRICS</span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  MONITOR MODE ACTIVE
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-500 text-[10px] uppercase">
                      <th className="py-2">BSSID</th>
                      <th className="py-2">ESSID</th>
                      <th className="py-2">CH</th>
                      <th className="py-2">PWR</th>
                      <th className="py-2">ENC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {wirelessNodes.map((w, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="py-2.5 text-slate-400">{w.bssid}</td>
                        <td className="py-2.5 font-bold text-white">{w.essid}</td>
                        <td className="py-2.5 text-amber-400">{w.channel}</td>
                        <td className="py-2.5 text-cyan-400">{w.signal} dBm</td>
                        <td className="py-2.5 text-slate-300">{w.enc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HASH & FILE SECURITY LAB */}
        {activeTab === 'crypto' && (
          <div className="bg-[#0b0f19] p-6 rounded-xl border border-emerald-500/30 max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Lock className="w-4 h-4" />
                <span>CRYPTOGRAPHIC INTEGRITY & HASH ANALYSIS</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                LAB VERIFIED
              </span>
            </div>

            <div className="bg-black/60 p-4 rounded-lg border border-white/10 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">TARGET FILE:</span>
                <span className="text-white font-bold">demo_archive.enc</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SECURITY PROTOCOL:</span>
                <span className="text-amber-400">SHA-256 INTEGRITY DIGEST</span>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <span className="text-slate-400">COMPUTED HASH:</span>
                <span className="text-[11px] text-cyan-400 break-all bg-black/80 p-2 rounded border border-white/5">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </span>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">INTEGRITY VERIFICATION PROGRESS:</span>
                <span className="text-emerald-400">{analysisProgress}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 rounded-full transition-all duration-150"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
            </div>

            {hashAnalysisState === 'RESOLVED' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/40 p-4 rounded-xl flex items-center gap-3 text-xs font-mono">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-emerald-400 font-bold">
                    DEMO ACCESS VERIFIED // LAB KEY MATCH
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    Hash match confirmed. Demonstrating cryptographic preimage resistance and message digest verification.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  onClick={startHashAnalysis}
                  disabled={hashAnalysisState === 'ANALYZING'}
                  data-cursor="EXECUTE"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                >
                  {hashAnalysisState === 'ANALYZING' ? 'VERIFYING DIGEST...' : 'EXECUTE INTEGRITY VERIFICATION'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Exit Statement */}
        <div className="pt-6 border-t border-white/10 flex flex-col items-center justify-center text-center space-y-1">
          <p className="font-display font-extrabold text-lg sm:text-2xl text-white uppercase tracking-tight">
            "UNDERSTANDING THE SYSTEM IS MORE INTERESTING THAN BREAKING IT."
          </p>
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
            SCENE 02 // LAB EXPLORATION
          </span>
        </div>

      </div>
    </section>
  );
}
