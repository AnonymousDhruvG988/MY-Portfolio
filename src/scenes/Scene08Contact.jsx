import React, { useState } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import { Send, Mail, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Scene08Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmitted, setTransmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    sound.playOverrideAlert();
    setTransmitted(true);

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Sender: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${DEVELOPER_DATA.socials.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="scene-08" className="chapter-section relative py-28">
      {/* Ambient glow */}
      <div className="ambient-glow w-[500px] h-[500px] bg-indigo-500/10 -top-20 left-10" />

      <div className="scene-container relative z-10 space-y-12">
        
        {/* Header */}
        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="modern-badge emerald">
              <MessageSquare className="w-3.5 h-3.5" />
              CHAPTER 08 // CONTACT
            </span>
            <span className="modern-badge">
              Direct Communication
            </span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase tracking-tight">
            START A <br className="hidden sm:inline" />
            <span className="gradient-text-hero">
              CONVERSATION.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl">
            "I'm interested in interesting problems, new technologies, and opportunities to learn and build together."
          </p>
        </div>

        {/* Transmission Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form (7 Cols) */}
          <div className="lg:col-span-7 modern-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-semibold text-white flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                Send a Message
              </span>
              <span className="text-xs text-slate-500">Replies usually within 24h</span>
            </div>

            {transmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="font-display text-lg font-bold text-white">
                  Message Dispatched!
                </h3>
                <p className="text-xs text-slate-300">
                  Your email client has been prepared. If it didn't open automatically, write directly to:
                </p>
                <div className="text-emerald-400 font-mono text-sm bg-black/50 py-2 px-4 rounded-xl border border-white/10 inline-block font-bold">
                  {DEVELOPER_DATA.socials.email}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-medium">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex"
                      className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 p-3 rounded-xl text-white text-xs focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-medium">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 p-3 rounded-xl text-white text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or questions..."
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-400 p-3 rounded-xl text-white text-xs focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor="SEND"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 hover:opacity-90 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(99,102,241,0.3)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="modern-card p-6 space-y-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Direct Contact
              </span>

              <a
                href={`mailto:${DEVELOPER_DATA.socials.email}`}
                data-cursor="EMAIL"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-xs text-white">{DEVELOPER_DATA.socials.email}</div>
                    <div className="text-[10px] text-slate-400">Direct Email Frequency</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <span className="text-indigo-400 font-semibold block">Opportunities:</span>
                <p>
                  Open to software internships, project collaborations, and engineering discussions.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
