import React, { useState } from 'react';
import { audioSystem } from '../utils/audioSystem';
import { Terminal, Copy, Check, Play, FileCode, Cpu } from 'lucide-react';

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
    <section id="workbench" className="relative py-24 bg-bg-base border-t border-border-subtle">
      {/* Grid Pattern */}
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border-subtle pb-6">
          <div>
            <div className="font-mono text-xs text-accent-mint tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-accent-mint" />
              CODE IN ACTION // 06
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-text-primary tracking-tight">
              ENGINEERING WORKBENCH
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-xl">
              Concrete implementations. Real Python, SQL, and protocol routines — no decorative placeholders.
            </p>
          </div>

          {/* Core Mindset Sequence */}
          <div className="font-mono text-xs text-text-muted flex flex-wrap items-center gap-2">
            <span className="text-text-primary">THINK</span>
            <span>→</span>
            <span className="text-accent-cyan">DECONSTRUCT</span>
            <span>→</span>
            <span className="text-accent-mint">BUILD</span>
            <span>→</span>
            <span className="text-accent-amber">AUDIT</span>
            <span>→</span>
            <span className="text-text-primary">ITERATE</span>
          </div>
        </div>

        {/* Code Editor Window */}
        <div className="rounded-lg border border-border-bright bg-bg-surface shadow-2xl overflow-hidden bracket-box">
          {/* Editor Header: Tabs & Actions */}
          <div className="bg-bg-elevated px-4 py-2 border-b border-border-subtle flex flex-wrap items-center justify-between gap-3">
            {/* File Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {snippets.map((snip) => {
                const isActive = activeTab.id === snip.id;
                return (
                  <button
                    key={snip.id}
                    onClick={() => {
                      setActiveTab(snip);
                      audioSystem.playHover();
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs transition-colors shrink-0 ${
                      isActive
                        ? 'bg-bg-surface text-accent-mint border border-border-bright font-medium'
                        : 'text-text-muted hover:text-text-secondary hover:bg-bg-surface/50 border border-transparent'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{snip.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Window Controls & Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRun}
                disabled={simulatedExecution}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-mint/10 hover:bg-accent-mint text-accent-mint hover:text-bg-void border border-accent-mint/30 font-mono text-xs transition-all"
                title="Simulate script execution"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{simulatedExecution ? 'EXECUTING...' : 'RUN'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-surface hover:bg-bg-elevated text-text-muted hover:text-text-primary border border-border-subtle font-mono text-xs transition-colors"
                title="Copy code to clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-accent-mint" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {/* Code Sub-description */}
          <div className="bg-bg-void/60 px-6 py-2 border-b border-border-subtle/50 font-mono text-xs text-text-muted flex items-center justify-between">
            <span className="truncate">// {activeTab.description}</span>
            <span className="text-accent-cyan shrink-0 ml-2">LANG: {activeTab.language.toUpperCase()}</span>
          </div>

          {/* Syntax Highlighted Code Display Area */}
          <div className="p-6 bg-bg-void/95 overflow-x-auto terminal-scroll">
            <pre className="font-mono text-xs sm:text-sm text-text-primary leading-relaxed">
              <code>{activeTab.code}</code>
            </pre>
          </div>

          {/* Editor Status Footer */}
          <div className="bg-bg-elevated/70 px-4 py-2 border-t border-border-subtle flex items-center justify-between font-mono text-[11px] text-text-muted">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-accent-mint">
                <Cpu className="w-3 h-3" />
                PYTHON 3.12 / SQL RELATIONAL
              </span>
              <span>UTF-8</span>
            </div>
            <span>DHRUV GOSWAMI // REPOSITORY AUDITED</span>
          </div>
        </div>
      </div>
    </section>
  );
};
