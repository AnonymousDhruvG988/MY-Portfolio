import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { Volume2, VolumeX, Menu, X, Shield, Terminal, Cpu } from 'lucide-react';

interface NavigationProps {
  onTriggerOverride: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onTriggerOverride }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = audioSystem.toggleSound();
    setSoundEnabled(newState);
  };

  const handleInitialsClick = () => {
    audioSystem.playHover();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setClickCount(0);
      onTriggerOverride();
    }
  };

  const navLinks = [
    { label: 'WORK', href: '#work', icon: Cpu },
    { label: 'OFFENSIVE LAB', href: '#offensive-lab', icon: Shield, badge: 'KALI' },
    { label: 'LEARNING', href: '#learning' },
    { label: 'STRENGTHS', href: '#strengths' },
    { label: 'WORKBENCH', href: '#workbench', icon: Terminal },
    { label: 'IDENTITY', href: '#identity' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-void/85 backdrop-blur-md border-b border-border-subtle/80 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Developer Name & Initials */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleInitialsClick}
              title="Identity Core [5 clicks for Diagnostic Override]"
              className="group flex items-center gap-2 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded border border-border-bright group-hover:border-accent-mint bg-bg-surface flex items-center justify-center font-mono text-xs font-bold text-accent-mint transition-colors relative overflow-hidden">
                <span className="relative z-10">{PORTFOLIO_DATA.initials}</span>
                <div className="absolute inset-0 bg-accent-mint/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-semibold text-sm tracking-wider text-text-primary group-hover:text-accent-mint transition-colors flex items-center gap-1.5">
                  {PORTFOLIO_DATA.name.toUpperCase()}
                  <span className="text-[10px] font-mono text-text-muted font-normal">// 0xDG</span>
                </div>
                <div className="text-[10px] font-mono text-text-muted flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
                  B.TECH // INDIA
                </div>
              </div>
            </button>
          </div>

          {/* Center / Right Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => audioSystem.playHover()}
                  onClick={() => audioSystem.playClick()}
                  className="relative px-3 py-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  {Icon && <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-accent-mint transition-colors" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] font-mono px-1 py-0.2 bg-accent-crimson/15 text-accent-crimson border border-accent-crimson/30 rounded">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-accent-mint scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </a>
              );
            })}
          </nav>

          {/* Right Status Indicator & Sound Toggle */}
          <div className="flex items-center gap-3">
            {/* Audio Feedback Toggle */}
            <button
              onClick={handleSoundToggle}
              onMouseEnter={() => audioSystem.playHover()}
              className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted hover:text-accent-mint border border-border-subtle hover:border-accent-mint/40 rounded px-2.5 py-1.5 transition-all bg-bg-surface/50"
              title={soundEnabled ? 'Disable Audio Feedback' : 'Enable Audio Synthesizer'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-accent-mint animate-pulse" />
                  <span className="hidden sm:inline text-accent-mint">AUDIO: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-text-muted" />
                  <span className="hidden sm:inline">AUDIO: OFF</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                audioSystem.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 text-text-secondary hover:text-accent-mint border border-border-subtle rounded bg-bg-surface/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg-void/98 backdrop-blur-xl flex flex-col justify-center px-8 lg:hidden animate-fade-in">
          <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
          
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
            SYSTEM NAVIGATION // SELECT ROUTE
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  audioSystem.playClick();
                  setMobileMenuOpen(false);
                }}
                className="font-display text-2xl sm:text-3xl font-bold text-text-primary hover:text-accent-mint tracking-tight flex items-center justify-between border-b border-border-subtle pb-3 group"
              >
                <span className="group-hover:translate-x-2 transition-transform duration-200">
                  {link.label}
                </span>
                <span className="font-mono text-xs text-text-muted">
                  0{idx + 1} //
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t border-border-subtle/50 flex flex-col gap-2 font-mono text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
              STATUS: {PORTFOLIO_DATA.status.availability}
            </div>
            <div>EMAIL: {PORTFOLIO_DATA.contact.email}</div>
          </div>
        </div>
      )}
    </>
  );
};
