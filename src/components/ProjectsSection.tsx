import React, { useState } from 'react';
import { PORTFOLIO_DATA, type ProjectItem } from '../data/portfolioData';
import { ProjectCaseFileModal } from './ProjectCaseFileModal';
import { audioSystem } from '../utils/audioSystem';
import { GithubIcon } from './BrandIcons';
import { ArrowUpRight, Terminal, Shield, Database, Radio, Code2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCaseFile, setSelectedCaseFile] = useState<ProjectItem | null>(null);

  const getProjectIcon = (category: string) => {
    if (category.includes('SECURITY')) return Shield;
    if (category.includes('SQL') || category.includes('DATA')) return Database;
    if (category.includes('NETWORKING')) return Radio;
    return Code2;
  };

  return (
    <section id="work" className="relative py-24 bg-bg-void border-t border-border-subtle">
      {/* Decorative Grid */}
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-border-subtle pb-6">
          <div>
            <div className="font-mono text-xs text-accent-mint tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
              SYSTEM PORTFOLIO // 03
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight">
              SELECTED WORK
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-xl">
              Systems, security utilities, and database tools engineered to understand architecture from the protocol level up.
            </p>
          </div>

          <div className="font-mono text-xs text-text-muted flex items-center gap-4">
            <span>INDEX: 01 — 04</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-accent-mint">CLICK TO INSPECT TECHNICAL CASE FILE</span>
          </div>
        </div>

        {/* Editorial Project Compositions List */}
        <div className="space-y-12">
          {PORTFOLIO_DATA.projects.map((proj) => {
            const Icon = getProjectIcon(proj.category);
            return (
              <div
                key={proj.id}
                data-cursor="project"
                onClick={() => {
                  audioSystem.playClick();
                  setSelectedCaseFile(proj);
                }}
                onMouseEnter={() => audioSystem.playHover()}
                className="group relative p-6 sm:p-10 rounded-lg border border-border-subtle hover:border-border-bright bg-bg-surface/40 hover:bg-bg-surface/80 transition-all duration-300 cursor-pointer overflow-hidden bracket-box"
              >
                {/* Thin scan line that passes through on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-mint/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  {/* Left Column: Number & Category (3 cols) */}
                  <div className="lg:col-span-3 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-4xl sm:text-5xl font-black text-text-muted/40 group-hover:text-accent-mint transition-colors duration-300">
                        {proj.number}
                      </span>
                      <div className="mt-2 font-mono text-[11px] text-accent-cyan tracking-wider uppercase flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-accent-cyan" />
                        {proj.category}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border-subtle/50 font-mono text-xs text-text-muted space-y-1 hidden lg:block">
                      <div>ROLE: {proj.role}</div>
                      <div>
                        STATUS:{' '}
                        <span className="text-accent-mint font-semibold">{proj.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Title & Description (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-text-primary group-hover:text-accent-mint transition-colors duration-200 mb-3 tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6 font-normal">
                      {proj.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] px-2.5 py-1 bg-bg-elevated border border-border-subtle text-text-secondary group-hover:border-border-bright rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CLI invocation preview if present */}
                    {proj.terminalCommand && (
                      <div className="mt-4 font-mono text-xs text-text-muted/80 bg-bg-void/80 px-3 py-1.5 rounded border border-border-subtle/50 flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-accent-mint shrink-0" />
                        <span className="truncate">$ {proj.terminalCommand}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Actions & Quick Telemetry (3 cols) */}
                  <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end h-full">
                    {/* Metrics preview */}
                    <div className="space-y-2 w-full lg:text-right mb-6">
                      {proj.metrics?.map((m) => (
                        <div key={m.label} className="font-mono text-[10px] text-text-muted">
                          <span className="opacity-60">{m.label}: </span>
                          <span className="text-text-primary font-medium">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Inspect Button */}
                    <div className="flex items-center gap-3">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 rounded border border-border-subtle hover:border-accent-mint text-text-muted hover:text-accent-mint bg-bg-surface transition-colors"
                          title="Open GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}

                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-text-primary bg-bg-surface group-hover:bg-accent-mint group-hover:text-bg-void border border-border-bright group-hover:border-accent-mint rounded transition-all duration-200"
                      >
                        <span>INSPECT CASE FILE</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Case File Inspection Modal */}
      <ProjectCaseFileModal
        project={selectedCaseFile}
        onClose={() => setSelectedCaseFile(null)}
      />
    </section>
  );
};
