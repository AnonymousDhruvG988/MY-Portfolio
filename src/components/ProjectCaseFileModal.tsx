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
      className="fixed inset-0 z-50 bg-bg-void/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-bg-surface border border-border-bright rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col bracket-box"
      >
        {/* Modal Header Bar */}
        <div className="bg-bg-elevated px-6 py-4 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-mint font-bold px-2 py-0.5 bg-accent-mint/10 border border-accent-mint/30 rounded">
              CASE_FILE // {project.number}
            </span>
            <span className="font-mono text-xs text-text-muted hidden sm:inline">
              STATUS: {project.status}
            </span>
          </div>
          <button
            onClick={() => {
              audioSystem.playClick();
              onClose();
            }}
            className="text-text-muted hover:text-text-primary p-1.5 rounded hover:bg-bg-surface border border-transparent hover:border-border-subtle transition-colors"
            aria-label="Close Case File"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 terminal-scroll">
          {/* Title & Tagline */}
          <div>
            <div className="font-mono text-xs text-accent-cyan tracking-wider uppercase mb-1">
              {project.category}
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-text-primary mb-3">
              {project.title}
            </h2>
            <p className="text-base text-text-secondary leading-relaxed font-normal">
              {project.tagline}
            </p>
          </div>

          {/* Metrics & Metadata Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-border-subtle py-4">
            <div>
              <div className="font-mono text-[10px] text-text-muted uppercase">ROLE</div>
              <div className="font-mono text-xs text-text-primary font-medium mt-0.5">{project.role}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-text-muted uppercase">STATUS</div>
              <div className="font-mono text-xs text-accent-mint font-medium mt-0.5">{project.status}</div>
            </div>
            {project.metrics?.map((m) => (
              <div key={m.label}>
                <div className="font-mono text-[10px] text-text-muted uppercase">{m.label}</div>
                <div className="font-mono text-xs text-accent-cyan font-medium mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Section: Overview */}
          <div>
            <h3 className="font-mono text-xs text-accent-mint uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent-mint" />
              SYSTEM OVERVIEW
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Section: Problem & Approach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg-void/70 p-5 rounded border border-border-subtle">
              <h4 className="font-mono text-xs text-accent-amber uppercase tracking-wider mb-2 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-accent-amber" />
                THE TECHNICAL CHALLENGE
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="bg-bg-void/70 p-5 rounded border border-border-subtle">
              <h4 className="font-mono text-xs text-accent-cyan uppercase tracking-wider mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                ENGINEERING APPROACH
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Section: Technologies Deployed */}
          <div>
            <h3 className="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">
              TECHNOLOGIES & PROTOCOLS
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3 py-1 bg-bg-elevated text-accent-mint border border-border-subtle rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal Invocation Syntax */}
          {project.terminalCommand && (
            <div className="bg-bg-void p-4 rounded border border-border-bright">
              <div className="font-mono text-[10px] text-text-muted mb-1 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-accent-mint" />
                TERMINAL INVOCATION CLI
              </div>
              <div className="font-mono text-xs text-accent-mint">
                $ {project.terminalCommand}
              </div>
            </div>
          )}

          {/* Section: What Was Learned */}
          <div className="bg-accent-mint/5 border border-accent-mint/20 p-5 rounded">
            <h4 className="font-mono text-xs text-accent-mint uppercase tracking-wider mb-2">
              WHAT I LEARNED FROM BUILDING THIS
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {project.whatLearned}
            </p>
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="bg-bg-elevated px-6 py-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-text-primary hover:text-accent-mint px-4 py-2 rounded bg-bg-surface border border-border-bright hover:border-accent-mint/40 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB REPOSITORY</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-text-muted hover:text-text-primary px-4 py-2"
          >
            CLOSE CASE FILE [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
