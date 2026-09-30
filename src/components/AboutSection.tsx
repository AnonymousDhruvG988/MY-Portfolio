import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { User, CheckCircle2, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="identity" className="relative py-24 bg-bg-void border-t border-border-subtle">
      {/* Background Subtle Noise & Grid */}
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 border-b border-border-subtle pb-6">
          <div className="font-mono text-xs text-accent-mint tracking-widest uppercase mb-2 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-accent-mint" />
            DIGITAL IDENTITY // 07
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight max-w-3xl leading-tight">
            {PORTFOLIO_DATA.about.leadStatement}
          </h2>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {PORTFOLIO_DATA.about.storyParagraphs.map((para, idx) => (
              <p key={idx} className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
                {para}
              </p>
            ))}

            {/* Core Architectural Pillars */}
            <div className="pt-6">
              <h3 className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
                FOUNDATIONAL TECHNICAL WORKING KNOWLEDGE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PORTFOLIO_DATA.about.technicalFoundations.map((item) => (
                  <div
                    key={item}
                    className="p-3 rounded border border-border-subtle bg-bg-surface/60 flex items-center gap-2.5 text-xs font-mono text-text-primary"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-mint shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Academic & Technical Context Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-lg border border-border-bright bg-bg-surface/90 bracket-box">
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6 flex items-center justify-between border-b border-border-subtle pb-3">
                <span className="text-accent-mint font-semibold">ACADEMIC & DEV CONTEXT</span>
                <span>INDIA // 2026</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-text-muted uppercase text-[10px] block">ACADEMIC PROGRAM</span>
                  <span className="text-text-primary font-semibold text-sm">
                    {PORTFOLIO_DATA.education.degree}
                  </span>
                  <div className="text-text-secondary mt-0.5">
                    {PORTFOLIO_DATA.education.field}
                  </div>
                </div>

                <div>
                  <span className="text-text-muted uppercase text-[10px] block">PRIMARY OBJECTIVE</span>
                  <p className="text-text-secondary leading-relaxed mt-1 font-sans text-xs">
                    To work on challenging software systems, master network protocols and defensive engineering, and continuously expand through active building.
                  </p>
                </div>

                <div className="pt-3 border-t border-border-subtle">
                  <span className="text-text-muted uppercase text-[10px] block mb-1">CURIOSITY VECTORS</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-bg-elevated text-accent-mint text-[10px]">
                      Web Experiences
                    </span>
                    <span className="px-2 py-0.5 rounded bg-bg-elevated text-accent-cyan text-[10px]">
                      Offensive Security
                    </span>
                    <span className="px-2 py-0.5 rounded bg-bg-elevated text-accent-amber text-[10px]">
                      Network Protocols
                    </span>
                    <span className="px-2 py-0.5 rounded bg-bg-elevated text-text-secondary text-[10px]">
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
