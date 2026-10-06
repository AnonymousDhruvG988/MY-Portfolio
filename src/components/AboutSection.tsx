import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { User, CheckCircle2, GraduationCap, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="identity" className="relative py-28 overflow-hidden">
      {/* Background Soft Refractive Mesh */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 mb-3 border border-slate-300/80 dark:border-white/10">
            <User className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
            <span className="font-sans text-xs font-semibold text-slate-700 dark:text-white/80">
              Developer Profile & Philosophy
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight max-w-3xl leading-tight">
            {PORTFOLIO_DATA.about.leadStatement}
          </h2>
        </div>

        {/* Asymmetrical Glass Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {PORTFOLIO_DATA.about.storyParagraphs.map((para, idx) => (
              <p key={idx} className="text-base sm:text-lg text-slate-700 dark:text-white/85 leading-relaxed font-sans font-normal">
                {para}
              </p>
            ))}

            {/* Foundational Pillars in Frosted Squircles */}
            <div className="pt-6">
              <h3 className="font-sans text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-blue dark:text-accent-cyan" />
                Verified Hands-On Working Foundations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PORTFOLIO_DATA.about.technicalFoundations.map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-2xl liquid-glass border border-slate-200 dark:border-white/10 hover:border-accent-cyan/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex items-center gap-3 text-xs font-sans font-semibold text-slate-800 dark:text-white cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Academic & Lab Status Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-[36px] liquid-glass-elevated border border-slate-200 dark:border-white/20 shadow-2xl frosted-squircle space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-accent-cyan to-accent-blue p-[1px]">
                    <div className="w-full h-full rounded-[14px] bg-slate-900 dark:bg-black flex items-center justify-center text-accent-cyan">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-slate-900 dark:text-white">Academic Status</div>
                    <div className="text-[11px] font-sans text-slate-500 dark:text-white/50">Developer Identity</div>
                  </div>
                </div>
                <span className="font-mono text-xs text-accent-blue dark:text-accent-mint px-2.5 py-0.5 rounded-full bg-accent-blue/10 dark:bg-accent-mint/10 border border-accent-blue/20 dark:border-accent-mint/20">
                  INDIA // 2026
                </span>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <span className="text-slate-500 dark:text-white/40 uppercase font-semibold text-[10px] block mb-0.5">
                    DEGREE PROGRAM
                  </span>
                  <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                    {PORTFOLIO_DATA.education.degree}
                  </span>
                  <div className="text-slate-600 dark:text-white/70 mt-0.5">
                    {PORTFOLIO_DATA.education.field}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-500 dark:text-white/40 uppercase font-semibold text-[10px] block mb-1">
                    PRIMARY AMBITION
                  </span>
                  <p className="text-slate-700 dark:text-white/80 leading-relaxed bg-slate-100/80 dark:bg-black/30 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                    To engineer challenging software systems, master network protocols and defensive security, and continuously build impactful tools.
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-slate-500 dark:text-white/40 uppercase font-semibold text-[10px] block mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
                    CURIOUS VECTORS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-white font-medium text-xs hover:scale-105 transition-transform duration-200 cursor-default">
                      Web Experiences
                    </span>
                    <span className="px-3 py-1 rounded-full bg-accent-blue/10 dark:bg-accent-cyan/15 text-accent-blue dark:text-accent-cyan font-medium text-xs border border-accent-blue/20 dark:border-accent-cyan/20 hover:scale-105 transition-transform duration-200 cursor-default">
                      Offensive Security
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-accent-mint/15 text-emerald-600 dark:text-accent-mint font-medium text-xs border border-emerald-500/20 dark:border-accent-mint/20 hover:scale-105 transition-transform duration-200 cursor-default">
                      Network Protocols
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 dark:bg-accent-amber/15 text-amber-600 dark:text-accent-amber font-medium text-xs border border-amber-500/20 dark:border-accent-amber/20 hover:scale-105 transition-transform duration-200 cursor-default">
                      Automation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
