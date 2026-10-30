import React, { useState } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import { FolderGit2, X, ArrowRight } from 'lucide-react';

export default function Scene05Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const projects = DEVELOPER_DATA.projects;

  const openProjectModal = (proj) => {
    sound.playPacketPing(1300);
    setActiveModalProject(proj);
  };

  const closeProjectModal = () => {
    sound.playMechanicalTick(900);
    setActiveModalProject(null);
  };

  return (
    <section id="scene-05" className="chapter-section relative py-28">
      {/* Ambient glow */}
      <div className="ambient-glow w-[500px] h-[500px] bg-emerald-500/10 -top-24 left-1/3" />

      <div className="scene-container relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="modern-badge emerald">
              <FolderGit2 className="w-3.5 h-3.5" />
              CHAPTER 05 // SELECTED WORK
            </span>
            <span className="modern-badge">
              Real Builds & Benchmarks
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            FEATURED <br className="hidden sm:inline" />
            <span className="gradient-text-hero">
              PROJECTS & LABS.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Real implementations exploring network socket parsing, relational query optimization, and cryptographic verification.
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-12">
          {projects.map((proj, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={proj.id}
                className="modern-card p-6 sm:p-10 relative overflow-hidden group hover:border-white/20 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Details (7 Cols) */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        Project {proj.code}
                      </span>
                      <span className="text-xs text-slate-500 font-sans">
                        {proj.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-indigo-300 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {proj.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {proj.objective}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {proj.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-sans"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => openProjectModal(proj)}
                        data-cursor="CASE STUDY"
                        className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white text-xs font-medium transition-all flex items-center gap-2 group-hover:bg-indigo-600/30"
                      >
                        <span>View Project Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Code & Execution Preview (5 Cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="bg-[#080c14] border border-white/10 rounded-2xl p-5 font-mono text-xs space-y-3 shadow-xl">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[10px] text-slate-500">
                        <span>LIVE BENCHMARK TELEMETRY</span>
                        <span className="text-emerald-400 font-semibold">{proj.status}</span>
                      </div>

                      {proj.demoType === 'terminal-preview' && (
                        <div className="space-y-1.5 text-[11px] text-slate-300">
                          <div className="text-cyan-400 font-semibold">$ python3 net_dissect.py --raw</div>
                          <div className="text-slate-500">[+] AF_INET raw socket bound</div>
                          <div className="text-emerald-400">[✓] IPv4 Header: 20 bytes parsed</div>
                          <div className="text-white">SRC: 192.168.1.104 → DST: 192.168.1.1</div>
                          <div className="text-indigo-400">[✓] Flag Mask: SYN=1, ACK=0</div>
                        </div>
                      )}

                      {proj.demoType === 'query-preview' && (
                        <div className="space-y-1.5 text-[11px] text-slate-300">
                          <div className="text-amber-400 font-semibold">-- EXPLAIN ANALYZE QUERY</div>
                          <div className="text-slate-200">SELECT s.name, count(e.id)</div>
                          <div className="text-slate-200">FROM students s JOIN enrollments e</div>
                          <div className="text-emerald-400">[✓] Index Scan using idx_student_id</div>
                          <div className="text-slate-500">Execution: 0.142 ms (B-Tree hit)</div>
                        </div>
                      )}

                      {proj.demoType === 'hash-preview' && (
                        <div className="space-y-1.5 text-[11px] text-slate-300">
                          <div className="text-emerald-400 font-semibold">$ python3 secarch_hash.py sample.bin</div>
                          <div className="text-slate-500">[i] Streaming 4096-byte chunk blocks...</div>
                          <div className="text-cyan-400 font-bold truncate">SHA-256: 8f434346648f6b9...</div>
                          <div className="text-indigo-400">Entropy Score: 7.92 / 8.0 (Packed)</div>
                        </div>
                      )}

                      {proj.demoType === 'sys-preview' && (
                        <div className="space-y-1.5 text-[11px] text-slate-300">
                          <div className="text-indigo-300 font-semibold">$ ./pycore_telemetry --watch</div>
                          <div className="text-white">CPU_USER: 14.2% | MEM_USED: 2.1GB</div>
                          <div className="text-emerald-400">[✓] Sockets: 42 ESTABLISHED</div>
                          <div className="text-slate-500">Report: telemetry_summary.html</div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modern Project Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0d121c] border border-white/20 p-6 sm:p-8 rounded-2xl relative shadow-2xl max-h-[85vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  Project #{activeModalProject.code}
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={closeProjectModal}
                className="p-2 rounded-full border border-white/10 hover:border-white text-slate-400 hover:text-white"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-500 uppercase font-mono">OBJECTIVE:</span>
                <p className="text-sm text-slate-200">
                  {activeModalProject.objective}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <span className="text-xs text-indigo-400 font-mono font-bold uppercase">
                  TECHNICAL ARCHITECTURE & IMPLEMENTATION:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModalProject.buildOverview}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <span className="text-xs text-emerald-400 font-mono font-bold uppercase">
                  KEY LESSONS & TAKEAWAYS:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModalProject.lessons}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeModalProject.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-sans"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={closeProjectModal}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                >
                  Done Reading
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
