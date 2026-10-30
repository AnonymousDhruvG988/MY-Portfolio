import React from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import {
  Code2,
  Database,
  Terminal,
  Shield,
  ArrowRight,
  Sparkles,
  Cpu
} from 'lucide-react';

export default function Scene01Builder({ onScrollToScene }) {
  return (
    <section
      id="scene-01"
      className="chapter-section min-h-screen relative flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="ambient-glow w-[500px] h-[500px] bg-indigo-500/20 -top-32 -left-32" />
      <div className="ambient-glow w-[450px] h-[450px] bg-emerald-500/15 bottom-10 right-0" />

      <div className="scene-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Bold, Sleek Headline & Narrative (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Status Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="modern-badge emerald">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {DEVELOPER_DATA.profile.statusBadge}
            </span>
            <span className="modern-badge">
              {DEVELOPER_DATA.profile.degree}
            </span>
          </div>

          {/* Large Editorial Headline */}
          <div className="space-y-1">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl tracking-tight text-white leading-[1.05]">
              {DEVELOPER_DATA.profile.heroHeadline} <br />
              <span className="gradient-text-hero">
                {DEVELOPER_DATA.profile.heroHighlight}
              </span>
            </h1>
          </div>

          {/* Subtitle & Narrative */}
          <p className="font-body text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            {DEVELOPER_DATA.profile.heroSubtitle}
          </p>

          <p className="font-body text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed italic border-l-2 border-indigo-500/50 pl-4 py-1">
            "{DEVELOPER_DATA.profile.bio}"
          </p>

          {/* Interactive Tech Pills */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/40 transition-colors text-xs text-white">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Python Automation</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors text-xs text-white">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>SQL Architecture</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors text-xs text-white">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>HTML5 & Web Fundamentals</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Cybersecurity Exploration</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sound.playChapterTransition();
                onScrollToScene('scene-05');
              }}
              data-cursor="WORK"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-[0_0_24px_rgba(99,102,241,0.4)] flex items-center gap-2 group"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                sound.playChapterTransition();
                onScrollToScene('scene-02');
              }}
              data-cursor="CYBER LAB"
              className="px-5 py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 font-medium text-sm transition-all flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>View Cyber Lab</span>
            </button>
          </div>

        </div>

        {/* Right Column: Sleek Floating Glass Architecture Showcase (5 Cols) */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          
          <div className="w-full max-w-md modern-card p-6 border-white/10 shadow-2xl relative space-y-5">
            
            {/* Header of Card */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">
                    Developer Telemetry
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    B.Tech Student & Builder
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400">Core Focus</span>
                <div className="font-display font-bold text-base text-white">
                  Python & SQL
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400">Security Lab</span>
                <div className="font-display font-bold text-base text-cyan-300">
                  Kali & Wireshark
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400">Expanding To</span>
                <div className="font-display font-bold text-base text-indigo-300">
                  React & JS
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400">Mindset</span>
                <div className="font-display font-bold text-base text-emerald-300">
                  First Principles
                </div>
              </div>
            </div>

            {/* Interactive Code Teaser */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1.5 text-slate-300">
              <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-white/5">
                <span>main.py</span>
                <span>Python 3.12</span>
              </div>
              <p className="text-emerald-400">
                <span className="text-indigo-400">class</span> <span className="text-yellow-300">Developer</span>:
              </p>
              <p className="pl-3 text-slate-300">
                passion = <span className="text-emerald-300">["Build", "Learn", "Solve"]</span>
              </p>
              <p className="pl-3 text-slate-400">
                focus = <span className="text-cyan-300">"Systems & Security"</span>
              </p>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Curious by default. Building what matters.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
