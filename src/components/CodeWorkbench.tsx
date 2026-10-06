import React, { useState } from 'react';
import { audioSystem } from '../utils/audioSystem';
import { Copy, Check, Play, FileCode, Cpu, Terminal } from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  description: string;
  code: string;
}

export const CodeWorkbench: React.FC = () => {
  const snippets: CodeSnippet[] = [
    {
      id: 'python-handshake',
      name: 'packetsense_parser.py',
      language: 'Python',
      description: '802.11 Raw frame inspector validating EAPOL 4-way key exchange integrity',
      code: `import struct, socket
from dataclasses import dataclass

@dataclass
class EapolKeyFrame:
    version: int
    key_info: int
    key_length: int
    replay_counter: int
    mic: bytes

def verify_wpa2_eapol(raw_frame: bytes) -> bool:
    """Inspects IEEE 802.11 EAPOL Key Exchange Frame"""
    if len(raw_frame) < 99:
        return False
        
    # Extract IEEE 802.1X Auth Type & Key Info bitmask
    version, frame_type = struct.unpack("!BB", raw_frame[0:2])
    key_info, key_len = struct.unpack("!HH", raw_frame[5:9])
    
    # Check bit 3: Pairwise Key, bit 8: MIC present
    is_pairwise = bool(key_info & (1 << 3))
    has_mic = bool(key_info & (1 << 8))
    
    if is_pairwise and has_mic:
        mic_digest = raw_frame[81:97]
        print(f"[+] Valid EAPOL Message captured. MIC: {mic_digest.hex()[:16]}...")
        return True
    return False`,
    },
    {
      id: 'python-scanner',
      name: 'socket_recon.py',
      language: 'Python',
      description: 'Concurrent socket probe with non-blocking timeout and protocol banner grabbing',
      code: `import socket
from concurrent.futures import ThreadPoolExecutor

def audit_port_banner(host: str, port: int, timeout: float = 0.5) -> dict:
    """Probes TCP port and grabs service introduction banner"""
    result = {"port": port, "open": False, "banner": None}
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(timeout)
            if sock.connect_ex((host, port)) == 0:
                result["open"] = True
                sock.sendall(b"HEAD / HTTP/1.0\\r\\n\\r\\n")
                try:
                    banner = sock.recv(128).decode("utf-8", errors="ignore").strip()
                    result["banner"] = banner.split("\\n")[0]
                except socket.timeout:
                    result["banner"] = "SERVICE_ACTIVE_SILENT"
    except Exception as err:
        result["error"] = str(err)
    return result`,
    },
    {
      id: 'sql-analysis',
      name: 'audit_telemetry.sql',
      language: 'SQL',
      description: 'Relational Common Table Expression (CTE) analyzing network access logs and indexing performance',
      code: `WITH ranked_events AS (
    SELECT 
        event_id,
        bssid_address,
        client_mac,
        signal_dbm,
        timestamp,
        ROW_NUMBER() OVER (
            PARTITION BY client_mac 
            ORDER BY timestamp DESC
        ) AS rank_seq
    FROM wireless_telemetry_logs
    WHERE signal_dbm >= -75
      AND encryption_type = 'WPA2-CCMP'
)
SELECT 
    client_mac,
    bssid_address,
    AVG(signal_dbm) AS mean_signal,
    COUNT(event_id) AS total_handshakes
FROM ranked_events
WHERE rank_seq <= 5
GROUP BY client_mac, bssid_address
HAVING COUNT(event_id) > 2
ORDER BY mean_signal DESC;`,
    },
  ];

  const [activeTab, setActiveTab] = useState(snippets[0]);
  const [copied, setCopied] = useState(false);
  const [simulatedExecution, setSimulatedExecution] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    audioSystem.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    audioSystem.playTerminalKey();
    setSimulatedExecution(true);
    setTimeout(() => {
      setSimulatedExecution(false);
      audioSystem.playAccessGranted();
    }, 800);
  };

  return (
    <section id="workbench" className="relative py-28 overflow-hidden">
      {/* Background Refraction */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 mb-3 border border-slate-300/80 dark:border-white/10">
              <Terminal className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
              <span className="font-sans text-xs font-semibold text-slate-700 dark:text-white/80">
                Interactive Developer Studio
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
              Engineering Workbench
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-white/70 max-w-xl font-sans">
              Concrete implementations in Python and relational SQL — real code that parses 802.11 frames and probes sockets.
            </p>
          </div>

          {/* Sequence Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-slate-600 dark:text-white/60">
            <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-white font-medium">Think</span>
            <span>→</span>
            <span className="px-3 py-1 rounded-full bg-accent-blue/10 dark:bg-accent-cyan/15 text-accent-blue dark:text-accent-cyan font-medium">Deconstruct</span>
            <span>→</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-accent-mint/15 text-emerald-600 dark:text-accent-mint font-medium">Build</span>
            <span>→</span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 dark:bg-accent-amber/15 text-amber-600 dark:text-accent-amber font-medium">Audit</span>
          </div>
        </div>

        {/* Code Studio Frame */}
        <div className="rounded-[36px] liquid-glass-elevated border border-slate-200 dark:border-white/20 shadow-2xl overflow-hidden frosted-squircle">
          {/* Header Bar with Traffic Lights */}
          <div className="bg-slate-100 dark:bg-black/50 px-6 py-3.5 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full glass-traffic-red" />
                <span className="w-3 h-3 rounded-full glass-traffic-yellow" />
                <span className="w-3 h-3 rounded-full glass-traffic-green" />
              </div>
              
              {/* File Tabs */}
              <div className="flex items-center gap-1.5 ml-4 overflow-x-auto">
                {snippets.map((snip) => {
                  const isActive = activeTab.id === snip.id;
                  return (
                    <button
                      key={snip.id}
                      onClick={() => {
                        setActiveTab(snip);
                        audioSystem.playHover();
                      }}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ios-pressable shrink-0 ${
                        isActive
                          ? 'bg-white text-slate-900 dark:text-black font-semibold shadow-sm border border-slate-200 dark:border-transparent'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      <span>{snip.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRun}
                disabled={simulatedExecution}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-blue hover:bg-accent-blue/90 dark:bg-accent-cyan dark:hover:bg-accent-cyan/90 text-white dark:text-black font-sans font-bold text-xs transition-all shadow-sm ios-pressable"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{simulatedExecution ? 'Running...' : 'Run Routine'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 hover:text-slate-900 dark:text-white font-sans text-xs transition-colors ios-pressable"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500 dark:text-accent-mint" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Sub-description Strip */}
          <div className="bg-slate-50 dark:bg-black/30 px-6 py-2.5 border-b border-slate-200 dark:border-white/10 text-xs font-sans text-slate-600 dark:text-white/60 flex items-center justify-between">
            <span className="truncate">{activeTab.description}</span>
            <span className="font-mono text-accent-blue dark:text-accent-cyan shrink-0 ml-2">LANG: {activeTab.language.toUpperCase()}</span>
          </div>

          {/* Code Body - Authentic High-Contrast Terminal Surface */}
          <div className="p-7 bg-[#0B1120] overflow-x-auto dark-console">
            <pre className="font-mono text-xs sm:text-sm text-slate-100 leading-relaxed">
              <code>{activeTab.code}</code>
            </pre>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="bg-slate-50 dark:bg-black/50 px-6 py-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between font-sans text-xs text-slate-500 dark:text-white/40">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-accent-blue dark:text-accent-cyan">
                <Cpu className="w-3.5 h-3.5" />
                Developer Studio Core
              </span>
              <span>•</span>
              <span>Python 3.12 / SQL CTE Plan</span>
            </div>
            <span>Dhruv Goswami // Verified Repository</span>
          </div>
        </div>
      </div>
    </section>
  );
};
