import React, { useState } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import { Mail, Copy, Check, ExternalLink, Globe } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Scene07DigitalFootprint() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const socials = DEVELOPER_DATA.socials;

  const handleCopyEmail = () => {
    sound.playPacketPing(1500);
    navigator.clipboard.writeText(socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const channels = [
    {
      id: 'github',
      name: 'GitHub',
      handle: socials.githubUser,
      url: socials.github,
      desc: 'Repositories, Python experiments, and database schemas.',
      icon: <GithubIcon className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: socials.linkedinUser,
      url: socials.linkedin,
      desc: 'Academic journey, professional connection, and technical dialogue.',
      icon: <LinkedinIcon className="w-5 h-5 text-cyan-400" />
    },
    {
      id: 'email',
      name: 'Email Inbox',
      handle: socials.email,
      url: `mailto:${socials.email}`,
      desc: 'Direct conversation, project inquiries, and collaborative ideas.',
      icon: <Mail className="w-5 h-5 text-indigo-400" />,
      isEmail: true
    }
  ];

  return (
    <section id="scene-07" className="chapter-section relative py-28">
      <div className="scene-container relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="modern-badge cyan">
              <Globe className="w-3.5 h-3.5" />
              CHAPTER 07 // DIGITAL PRESENCE
            </span>
            <span className="modern-badge">
              Channels
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            CONNECT & <br className="hidden sm:inline" />
            <span className="gradient-text-cyan">
              REACH OUT.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Direct channels to explore code repositories, connect professionally, or send an inquiry.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((ch) => (
            <div
              key={ch.id}
              className="modern-card p-6 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {ch.icon}
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-indigo-300 transition-colors">
                    {ch.name}
                  </h3>
                  <div className="text-xs text-slate-400 truncate mt-0.5 font-mono">
                    {ch.handle}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {ch.desc}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                <a
                  href={ch.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <span>Visit Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {ch.isEmail && (
                  <button
                    onClick={handleCopyEmail}
                    data-cursor="COPY"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-all"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {copiedEmail && ch.isEmail && (
                <div className="text-[11px] font-sans text-emerald-400 text-center font-medium">
                  Email copied to clipboard!
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
