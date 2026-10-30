import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ProjectItem } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { GithubIcon } from './BrandIcons';
import { X, ExternalLink, Terminal, CheckCircle2, FileCode2, Layers, Shield, Database, Radio, Code2 } from 'lucide-react';

interface ProjectCaseFileModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const renderProjectIcon = (category: string) => {
  if (category.includes('SECURITY')) return <Shield className="w-7 h-7 sm:w-8 sm:h-8" />;
  if (category.includes('SQL') || category.includes('DATA')) return <Database className="w-7 h-7 sm:w-8 sm:h-8" />;
  if (category.includes('NETWORKING')) return <Radio className="w-7 h-7 sm:w-8 sm:h-8" />;
  return <Code2 className="w-7 h-7 sm:w-8 sm:h-8" />;
};

const getAestheticColorClass = (category: string) => {
  if (category.includes('SECURITY')) return 'aesthetic-icon-cyan';
  if (category.includes('SQL') || category.includes('DATA')) return 'aesthetic-icon-amber';
  if (category.includes('NETWORKING')) return 'aesthetic-icon-emerald';
  return 'aesthetic-icon-purple';
};

export const ProjectCaseFileModal: React.FC<ProjectCaseFileModalProps> = ({ project, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!project) return;

    // Reset internal scroll position to top
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const originalOverflow = document.body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const aestheticClass = getAestheticColorClass(project.category);

  // Mount to document.body via Portal to escape any transformed ancestor containers
  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999] bg-black/75 backdrop-blur-2xl overflow-y-auto p-4 sm:p-6 md:p-8 flex items-center justify-center animate-fade-in"
      style={{ minHeight: '100vh', width: '100vw' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-auto liquid-glass-elevated border border-slate-200/80 dark:border-white/20 rounded-[28px] sm:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_40px_rgba(100,210,255,0.2)] overflow-hidden max-h-[85vh] flex flex-col frosted-squircle animate-modal-float"
      >
        {/* Floating Window Header Bar: macOS Traffic Lights + Title + Close */}
        <div className="bg-slate-100/90 dark:bg-black/40 px-5 sm:px-7 py-3.5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* macOS VisionOS Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full glass-traffic-red cursor-pointer" onClick={onClose} title="Close window" />
              <span className="w-3 h-3 rounded-full glass-traffic-yellow" />
              <span className="w-3 h-3 rounded-full glass-traffic-green" />
            </div>

            <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/15 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-accent-blue dark:text-accent-cyan font-bold px-2.5 py-0.5 bg-accent-blue/10 dark:bg-accent-cyan/10 border border-accent-blue/20 dark:border-accent-cyan/30 rounded-full">
                CASE FILE // {project.number}
              </span>
              <span className="font-sans text-xs text-slate-500 dark:text-white/50 hidden md:inline">
                Spatial Architecture Audit
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              audioSystem.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 flex items-center justify-center text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
            aria-label="Close Case File"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 no-scrollbar"
        >
          {/* Header Hero: Aesthetic Squircle Icon + Title & Category */}
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 aesthetic-icon-badge ${aestheticClass} flex items-center justify-center shrink-0`}>
              {renderProjectIcon(project.category)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-sans text-xs text-accent-blue dark:text-accent-cyan tracking-wider uppercase mb-1 font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {project.category}
              </div>
              <h2 className="font-display font-extrabold text-xl sm:text-3xl text-slate-900 dark:text-white mb-1.5 tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed font-sans">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Metrics & Metadata Chips in Frosted Squircle Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
              <div className="text-[10px] font-sans text-slate-500 dark:text-white/40 uppercase">ROLE</div>
              <div className="font-sans text-xs text-slate-900 dark:text-white font-semibold mt-0.5 truncate">{project.role}</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
              <div className="text-[10px] font-sans text-slate-500 dark:text-white/40 uppercase">STATUS</div>
              <div className="font-sans text-xs text-emerald-600 dark:text-accent-mint font-semibold mt-0.5 truncate">{project.status}</div>
            </div>
            {project.metrics?.map((m) => (
              <div key={m.label} className="p-3 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                <div className="text-[10px] font-sans text-slate-500 dark:text-white/40 uppercase truncate">{m.label}</div>
                <div className="font-sans text-xs text-accent-blue dark:text-accent-cyan font-semibold mt-0.5 truncate">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Section: Overview */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <h3 className="font-sans text-xs text-emerald-600 dark:text-accent-mint uppercase tracking-wider mb-2 flex items-center gap-2 font-bold">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-accent-mint" />
              System Architecture & Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed font-sans">
              {project.overview}
            </p>
          </div>

          {/* Section: Technical Bottleneck & Engineering Vector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <h4 className="font-sans text-xs text-amber-600 dark:text-accent-amber uppercase tracking-wider mb-1.5 flex items-center gap-2 font-bold">
                <FileCode2 className="w-4 h-4 text-amber-600 dark:text-accent-amber" />
                Technical Bottleneck
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
              <h4 className="font-sans text-xs text-accent-blue dark:text-accent-cyan uppercase tracking-wider mb-1.5 flex items-center gap-2 font-bold">
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
            <h3 className="text-xs font-sans text-slate-500 dark:text-white/50 uppercase tracking-wider mb-2 font-semibold">
              Technologies Deployed
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3 py-1 bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-white/90 border border-slate-200 dark:border-white/15 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal Invocation Syntax */}
          {project.terminalCommand && (
            <div className="bg-[#0B1120] p-3.5 rounded-2xl border border-slate-800 dark-console">
              <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent-mint" />
                TERMINAL COMMAND
              </div>
              <div className="font-mono text-xs text-emerald-400 overflow-x-auto">
                $ {project.terminalCommand}
              </div>
            </div>
          )}

          {/* Section: What Was Learned */}
          <div className="p-4 sm:p-5 rounded-2xl bg-accent-blue/10 dark:bg-accent-cyan/10 border border-accent-blue/20 dark:border-accent-cyan/20">
            <h4 className="font-sans text-xs text-accent-blue dark:text-accent-cyan uppercase tracking-wider mb-1.5 font-bold">
              What I Learned From Building This
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed font-sans">
              {project.whatLearned}
            </p>
          </div>
        </div>

        {/* Modal Footer Bar: Clean Action Links */}
        <div className="bg-slate-100/90 dark:bg-black/40 px-5 sm:px-7 py-3.5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-slate-800 dark:text-white px-4 py-2 rounded-full bg-white dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 transition-all shadow-sm ios-pressable"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="font-sans text-xs font-medium text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
          >
            Dismiss [ESC]
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
