import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { Mail, Copy, Check, ArrowUpRight, Send, Radio } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryBody, setInquiryBody] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
    setCopied(true);
    audioSystem.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${encodeURIComponent(
      inquirySubject || 'Hello from Portfolio'
    )}&body=${encodeURIComponent(inquiryBody)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative py-24 bg-bg-base border-t border-border-subtle">
      {/* Background Grid */}
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 border-b border-border-subtle pb-6">
          <div className="font-mono text-xs text-accent-mint tracking-widest uppercase mb-2 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-accent-mint animate-pulse" />
            COMMUNICATION CHANNELS // 08
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight">
            LET'S BUILD SOMETHING.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-2xl font-normal">
            I'm always interested in solving difficult problems, exploring new technologies, and connecting with builders and engineering teams.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Verified Direct Channels, Right Quick Dispatcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Technical Communication Channels (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
              VERIFIED DESTINATIONS & IDENTITY
            </div>

            {/* Email Channel Card */}
            <div
              onMouseEnter={() => audioSystem.playHover()}
              className="group p-6 rounded-lg border border-border-subtle hover:border-accent-mint bg-bg-surface/70 hover:bg-bg-surface transition-all duration-300 relative overflow-hidden bracket-box"
            >
              {/* Traveling signal line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-mint to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded border border-border-bright group-hover:border-accent-mint bg-bg-elevated flex items-center justify-center text-accent-mint transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-text-muted uppercase">PRIMARY EMAIL CHANNEL</div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                      className="font-mono text-sm sm:text-base text-text-primary group-hover:text-accent-mint font-semibold transition-colors"
                    >
                      {PORTFOLIO_DATA.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-2 rounded bg-bg-elevated hover:bg-bg-surface text-text-muted hover:text-text-primary border border-border-subtle font-mono text-xs transition-colors"
                    title="Copy Email Address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-accent-mint" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                    className="p-2 rounded bg-accent-mint/10 hover:bg-accent-mint text-accent-mint hover:text-bg-void border border-accent-mint/30 transition-colors"
                    title="Open Mail Client"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Channel Card */}
            <a
              href={PORTFOLIO_DATA.contact.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioSystem.playHover()}
              className="group p-6 rounded-lg border border-border-subtle hover:border-accent-cyan bg-bg-surface/70 hover:bg-bg-surface transition-all duration-300 block relative overflow-hidden bracket-box"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded border border-border-bright group-hover:border-accent-cyan bg-bg-elevated flex items-center justify-center text-accent-cyan transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-text-muted uppercase">CODE REPOSITORY & COMMITS</div>
                    <div className="font-mono text-sm sm:text-base text-text-primary group-hover:text-accent-cyan font-semibold transition-colors">
                      github.com/AnonymousDhruvG988
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-text-muted group-hover:text-accent-cyan transition-colors">
                  <span className="hidden sm:inline">VIEW CODEBASE</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>

            {/* LinkedIn Channel Card */}
            <a
              href={PORTFOLIO_DATA.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioSystem.playHover()}
              className="group p-6 rounded-lg border border-border-subtle hover:border-accent-amber bg-bg-surface/70 hover:bg-bg-surface transition-all duration-300 block relative overflow-hidden bracket-box"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-amber to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded border border-border-bright group-hover:border-accent-amber bg-bg-elevated flex items-center justify-center text-accent-amber transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-text-muted uppercase">PROFESSIONAL NETWORK</div>
                    <div className="font-mono text-sm sm:text-base text-text-primary group-hover:text-accent-amber font-semibold transition-colors">
                      linkedin.com/in/dhruv-goswami
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-text-muted group-hover:text-accent-amber transition-colors">
                  <span className="hidden sm:inline">CONNECT</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Quick Message Draft Helper (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-lg border border-border-bright bg-bg-surface/90 bracket-box">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-5 font-mono text-xs">
                <span className="text-accent-mint font-semibold flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  QUICK DISPATCH CONSOLE
                </span>
                <span className="text-[10px] text-text-muted">DIRECT ROUTING</span>
              </div>

              <form onSubmit={handleSendDraft} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-text-muted text-[10px] uppercase block mb-1">
                    SUBJECT / INQUIRY TOPIC
                  </label>
                  <input
                    type="text"
                    required
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    placeholder="e.g. Collaboration / Engineering Project / Question"
                    className="w-full bg-bg-void border border-border-subtle focus:border-accent-mint rounded p-3 text-text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-text-muted text-[10px] uppercase block mb-1">
                    MESSAGE CONTENT
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryBody}
                    onChange={(e) => setInquiryBody(e.target.value)}
                    placeholder="Brief note or opportunity details..."
                    className="w-full bg-bg-void border border-border-subtle focus:border-accent-mint rounded p-3 text-text-primary focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider text-bg-void bg-accent-mint hover:bg-accent-mint/90 rounded transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(124,255,178,0.2)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>DISPATCH TO EMAIL CLIENT</span>
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-border-subtle/50 text-[10px] font-mono text-text-muted text-center">
                OPENS YOUR DEFAULT EMAIL CLIENT PRE-CONFIGURED WITH DHRUV'S ADDRESS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
