import React, { useState } from 'react';
import { PORTFOLIO_DATA, type ProjectItem } from '../data/portfolioData';
import { ProjectCaseFileModal } from './ProjectCaseFileModal';
import { audioSystem } from '../utils/audioSystem';
import { GithubIcon } from './BrandIcons';
import { ArrowRight, Terminal, Shield, Database, Radio, Code2, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCaseFile, setSelectedCaseFile] = useState<ProjectItem | null>(null);

  const getProjectIcon = (category: string) => {
    if (category.includes('SECURITY')) return Shield;
    if (category.includes('SQL') || category.includes('DATA')) return Database;
    if (category.includes('NETWORKING')) return Radio;
    return Code2;
  };

  const getProjectAccentGradient = (idx: number) => {
    switch (idx % 4) {
      case 0:
        return 'from-accent-cyan via-accent-blue to-accent-mint';
      case 1:
        return 'from-accent-amber via-orange-500 to-amber-300';
      case 2:
        return 'from-accent-mint via-teal-400 to-accent-cyan';
      default:
        return 'from-purple-500 via-indigo-500 to-accent-blue';
    }
  };

  return (
    <section id="work" className="relative py-28 overflow-hidden">
      {/* Background Refractive Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 mb-3 border border-slate-300/80 dark:border-white/10">
              <Layers className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan" />
              <span className="font-sans text-xs font-semibold text-slate-700 dark:text-white/80">
                Spatial Projects & Experiences
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight">
              Selected Work
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-white/70 max-w-xl font-sans">
              Practical software systems, offensive security audits, and database engines engineered from the protocol level up.
            </p>
          </div>

          <div className="font-sans text-xs text-slate-500 dark:text-white/50 flex items-center gap-3">
            <span>INDEX: 01 — 04</span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span className="text-accent-blue dark:text-accent-cyan font-semibold">TAP CARD TO INSPECT EXPERIENCE</span>
          </div>
        </div>

        {/* Squircle Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {PORTFOLIO_DATA.projects.map((proj, idx) => {
            const Icon = getProjectIcon(proj.category);
            const gradient = getProjectAccentGradient(idx);

            return (
              <div
                key={proj.id}
                onClick={() => {
                  audioSystem.playClick();
                  setSelectedCaseFile(proj);
                }}
                onMouseEnter={() => audioSystem.playHover()}
                className="group relative p-7 sm:p-8 rounded-[36px] liquid-glass hover:liquid-glass-elevated border border-slate-200 dark:border-white/15 hover:border-accent-cyan/50 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.12),0_0_30px_rgba(100,210,255,0.15)] dark:hover:shadow-[0_24px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(100,210,255,0.2)] transition-all duration-300 cursor-pointer overflow-hidden frosted-squircle flex flex-col justify-between ios-pressable"
              >
                {/* Top Subtle Specular Line */}
                <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-slate-400/30 dark:via-white/40 to-transparent pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${gradient} p-[1.5px] shadow-[0_0_20px_rgba(100,210,255,0.25)] group-hover:scale-105 transition-transform duration-300`}>
                        <div className="w-full h-full rounded-[14px] bg-slate-900 dark:bg-black/90 flex items-center justify-center text-white">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-xs text-accent-blue dark:text-accent-cyan font-bold">
                          // 0{idx + 1}
                        </div>
                        <div className="text-[11px] font-sans text-slate-500 dark:text-white/50 uppercase font-medium">
                          {proj.category}
                        </div>
                      </div>
                    </div>

                    <span className="font-sans text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white/90 border border-slate-200 dark:border-white/15">
                      {proj.status}
                    </span>
                  </div>

                  {/* Project Title & Tagline */}
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white group-hover:text-accent-blue dark:group-hover:text-accent-cyan transition-colors duration-200 mb-3 tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed mb-6 font-sans">
                    {proj.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] px-3 py-1 bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-white/80 group-hover:border-slate-300 dark:group-hover:border-white/20 rounded-full hover:scale-105 transition-all duration-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Terminal preview if present */}
                  {proj.terminalCommand && (
                    <div className="mb-6 font-mono text-xs text-emerald-300 dark:text-emerald-400 bg-slate-900 dark:bg-black/70 px-3.5 py-2.5 rounded-xl border border-slate-800 dark:border-white/10 flex items-center gap-2 shadow-sm">
                      <Terminal className="w-3.5 h-3.5 text-accent-cyan dark:text-accent-mint shrink-0" />
                      <span className="truncate">$ {proj.terminalCommand}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 hover:text-slate-950 dark:text-white/70 dark:hover:text-white transition-colors"
                        title="GitHub Repo"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-800 dark:text-white group-hover:text-accent-blue dark:group-hover:text-accent-cyan transition-colors">
                    <span>Inspect Case File</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case File Inspection Modal */}
      <ProjectCaseFileModal
        project={selectedCaseFile}
        onClose={() => setSelectedCaseFile(null)}
      />
    </section>
  );
};
