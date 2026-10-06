import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { Mail, Copy, Check, ArrowRight, Send, Radio } from 'lucide-react';

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
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background Soft Refractive Glow */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 mb-3 border border-slate-300/80 dark:border-white/10">
            <Radio className="w-3.5 h-3.5 text-accent-blue dark:text-accent-cyan animate-pulse" />
            <span className="font-sans text-xs font-semibold text-slate-700 dark:text-white/80">
              Communication & AirDrop Gateway
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight">
            Let's Build Something.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-white/70 max-w-2xl font-sans">
            I'm always interested in solving difficult technical challenges, learning new technologies, and connecting with engineering teams.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Verified Direct Channels, Right Quick Dispatcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Communication Tiles (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="font-sans text-xs font-semibold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-1 px-1">
              Verified Destinations & Links
            </div>

            {/* Email Channel Card */}
            <div
              onMouseEnter={() => audioSystem.playHover()}
              className="group p-6 rounded-[30px] liquid-glass hover:liquid-glass-elevated border border-slate-200 dark:border-white/15 hover:border-accent-cyan/40 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden frosted-squircle ios-pressable"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-cyan to-accent-blue p-[1px] shadow-[0_0_15px_rgba(100,210,255,0.3)] group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-[14px] bg-slate-900 dark:bg-black/90 flex items-center justify-center text-accent-cyan">
                      <Mail className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-sans font-semibold text-slate-500 dark:text-white/50 uppercase">DIRECT EMAIL CHANNEL</div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                      className="font-sans text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-accent-blue dark:group-hover:text-accent-cyan font-bold transition-colors"
                    >
                      {PORTFOLIO_DATA.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 hover:text-slate-950 dark:text-white font-sans text-xs transition-colors ios-pressable border border-slate-200 dark:border-white/10"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-ios-green" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                    className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black transition-colors shadow-sm"
                    title="Open Mail Client"
                  >
                    <ArrowRight className="w-4 h-4" />
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
              className="group p-6 rounded-[30px] liquid-glass hover:liquid-glass-elevated border border-slate-200 dark:border-white/15 hover:border-accent-cyan/40 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 block relative overflow-hidden frosted-squircle ios-pressable"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(191,90,242,0.3)] group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-[14px] bg-slate-900 dark:bg-black/90 flex items-center justify-center text-white">
                      <GithubIcon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-sans font-semibold text-slate-500 dark:text-white/50 uppercase">CODE REPOSITORY & COMMITS</div>
                    <div className="font-sans text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-accent-blue dark:group-hover:text-accent-cyan font-bold transition-colors">
                      github.com/AnonymousDhruvG988
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-600 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  <span className="hidden sm:inline">Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

            {/* LinkedIn Channel Card */}
            <a
              href={PORTFOLIO_DATA.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioSystem.playHover()}
              className="group p-6 rounded-[30px] liquid-glass hover:liquid-glass-elevated border border-slate-200 dark:border-white/15 hover:border-accent-cyan/40 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 block relative overflow-hidden frosted-squircle ios-pressable"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-blue to-accent-cyan p-[1px] shadow-[0_0_15px_rgba(10,132,255,0.3)] group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-[14px] bg-slate-900 dark:bg-black/90 flex items-center justify-center text-white">
                      <LinkedinIcon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-sans font-semibold text-slate-500 dark:text-white/50 uppercase">PROFESSIONAL NETWORK</div>
                    <div className="font-sans text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-accent-blue font-bold transition-colors">
                      linkedin.com/in/dhruv-goswami
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-600 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  <span className="hidden sm:inline">Connect</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Dispatcher Console (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-7 sm:p-8 rounded-[36px] liquid-glass-elevated border border-slate-200 dark:border-white/20 shadow-2xl frosted-squircle space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <span className="text-slate-900 dark:text-white font-bold font-sans text-xs flex items-center gap-2">
                  <Send className="w-4 h-4 text-accent-blue dark:text-accent-cyan" />
                  Quick Dispatch Console
                </span>
                <span className="text-[10px] font-mono text-accent-blue dark:text-accent-cyan font-semibold">DIRECT ROUTE</span>
              </div>

              <form onSubmit={handleSendDraft} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="text-slate-600 dark:text-white/50 text-[10px] uppercase font-semibold block mb-1.5">
                    Subject / Discussion Vector
                  </label>
                  <input
                    type="text"
                    required
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    placeholder="e.g. Collaboration / Engineering Project / Question"
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 focus:border-accent-blue dark:focus:border-accent-cyan rounded-2xl p-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-600 dark:text-white/50 text-[10px] uppercase font-semibold block mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryBody}
                    onChange={(e) => setInquiryBody(e.target.value)}
                    placeholder="Write a message or project note..."
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 focus:border-accent-blue dark:focus:border-accent-cyan rounded-2xl p-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue text-white font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(100,210,255,0.4)] ios-pressable"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Mail Client</span>
                </button>
              </form>

              <div className="pt-2 text-[11px] font-sans text-slate-500 dark:text-white/40 text-center">
                Pre-configured with Dhruv's verified email address
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
