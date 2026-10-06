import React, { useEffect } from 'react';
import type { ProjectItem } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { GithubIcon } from './BrandIcons';
import { X, ExternalLink, Terminal, CheckCircle2, FileCode2, Layers } from 'lucide-react';

interface ProjectCaseFileModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectCaseFileModal: React.FC<ProjectCaseFileModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl liquid-glass-elevated border border-slate-200 dark:border-white/20 rounded-[36px] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col frosted-squircle"
      >
        {/* Sheet Grabber Bar & Header */}
        <div className="bg-slate-100/80 dark:bg-black/30 px-6 sm:px-8 pt-4 pb-4 border-b border-slate-200 dark:border-white/10 flex flex-col gap-3">
          <div className="w-12 h-1 bg-slate-300 dark:bg-white/25 rounded-full mx-auto" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent-blue dark:text-accent-cyan font-bold px-3 py-1 bg-accent-blue/10 dark:bg-accent-cyan/10 border border-accent-blue/20 dark:border-accent-cyan/30 rounded-full">
                PROJECT {project.number}
              </span>
              <span className="font-sans text-xs text-slate-500 dark:text-white/50 hidden sm:inline">
                Project Case File
              </span>
            </div>
            <button
              onClick={() => {
                audioSystem.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 flex items-center justify-center text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Close Case File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Title & Tagline */}
          <div>
            <div className="font-sans text-xs text-accent-blue dark:text-accent-cyan tracking-wider uppercase mb-1 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              {project.category}
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white mb-2 tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-slate-600 dark:text-white/70 leading-relaxed font-sans">
              {project.tagline}
            </p>
          </div>

          {/* Metrics & Metadata Chips in Frosted Squircle Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
              <div className="text-[10px] font-sans text-slate-500 dark:text-white/40 uppercase">ROLE</div>
              <div className="font-sans text-xs text-slate-900 dark:text-white font-semibold mt-0.5">{project.role}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
              <div className="text-[10px] font-sans text-slate-500 dark:text-white/40 uppercase">STATUS</div>
              <div className="font-sans text-xs text-emerald-600 dark:text-accent-mint font-semibold mt-0.5">{project.status}</div>
            </div>
            {project.metrics?.map((m) => (
              <div key={m.label} className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                <div className="text-[10px] font-sans text-slate-500 dark:text-white/40 uppercase">{m.label}</div>
                <div className="font-sans text-xs text-accent-blue dark:text-accent-cyan font-semibold mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Section: Overview */}
          <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <h3 className="font-sans text-xs text-emerald-600 dark:text-accent-mint uppercase tracking-wider mb-2 flex items-center gap-2 font-bold">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-accent-mint" />
              System Architecture & Overview
            </h3>
            <p className="text-sm text-slate-700 dark:text-white/80 leading-relaxed font-sans">
              {project.overview}
            </p>
          </div>

          {/* Section: Problem & Approach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <h4 className="font-sans text-xs text-amber-600 dark:text-accent-amber uppercase tracking-wider mb-2 flex items-center gap-2 font-bold">
                <FileCode2 className="w-4 h-4 text-amber-600 dark:text-accent-amber" />
                Technical Bottleneck
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <h4 className="font-sans text-xs text-accent-blue dark:text-accent-cyan uppercase tracking-wider mb-2 flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-accent-blue dark:text-accent-cyan" />
                Engineering Vector
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed font-sans">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Section: Technologies Deployed */}
          <div>
            <h3 className="text-xs font-sans text-slate-500 dark:text-white/50 uppercase tracking-wider mb-2.5 font-semibold">
              Technologies Deployed
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3.5 py-1.5 bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-white/90 border border-slate-200 dark:border-white/15 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal Invocation Syntax */}
          {project.terminalCommand && (
            <div className="bg-[#0B1120] p-4 rounded-2xl border border-slate-800 dark-console">
              <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent-mint" />
                TERMINAL COMMAND
              </div>
              <div className="font-mono text-xs text-emerald-400">
                $ {project.terminalCommand}
              </div>
            </div>
          )}

          {/* Section: What Was Learned */}
          <div className="p-5 rounded-2xl bg-accent-blue/10 dark:bg-accent-cyan/10 border border-accent-blue/20 dark:border-accent-cyan/20">
            <h4 className="font-sans text-xs text-accent-blue dark:text-accent-cyan uppercase tracking-wider mb-1.5 font-bold">
              What I Learned From Building This
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed font-sans">
              {project.whatLearned}
            </p>
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="bg-slate-100/90 dark:bg-black/40 px-6 sm:px-8 py-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-800 dark:text-white px-5 py-2.5 rounded-full bg-white dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 transition-all ios-pressable"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="font-sans text-xs text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white px-4 py-2"
          >
            Dismiss [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
