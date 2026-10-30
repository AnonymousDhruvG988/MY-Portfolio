import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioSystem } from '../utils/audioSystem';
import { ThemeToggle } from './ThemeToggle';
import { 
  Home,
  Shield, 
  Cpu, 
  Terminal, 
  Compass, 
  Zap, 
  User, 
  Mail, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  X
} from 'lucide-react';

interface NavigationProps {
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onTriggerOverride: () => void;
}

interface NavSection {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  soundEnabled = false,
  onToggleSound,
  onTriggerOverride 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const [clickCount, setClickCount] = useState(0);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const isHoveringRef = useRef(false);
  const enterTimerRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef<number | null>(null);

  const navSections: NavSection[] = [
    { id: 'hero', label: 'Home', href: '#hero', icon: Home },
    { id: 'offensive-lab', label: 'Security Lab', href: '#offensive-lab', icon: Shield },
    { id: 'work', label: 'Work', href: '#work', icon: Cpu },
    { id: 'learning', label: 'Learning', href: '#learning', icon: Compass },
    { id: 'strengths', label: 'Strengths', href: '#strengths', icon: Zap },
    { id: 'workbench', label: 'Workbench', href: '#workbench', icon: Terminal },
    { id: 'identity', label: 'About', href: '#identity', icon: User },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
  ];

  // Brief initial glance then smoothly collapses into pill
  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setIsOpen(true);
    }, 400);

    const autoCollapseTimer = window.setTimeout(() => {
      if (!isHoveringRef.current) {
        setIsOpen(false);
      }
    }, 2800);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(autoCollapseTimer);
    };
  }, []);

  // Fluid scroll detection:
  // Hides immediately upon scrolling down, and reappears as soon as scrolling stops or when scrolling up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // Clear previous scroll stop timer
      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - lastScrollYRef.current;

          // Always visible near top of the page
          if (currentY < 60) {
            setIsScrolledDown(false);
          } else if (diff > 4) {
            // Scrolling DOWN -> hide navigation
            if (!isHoveringRef.current) {
              setIsScrolledDown(true);
              // If open while user starts scrolling away, collapse gently
              setIsOpen(false);
            }
          } else if (diff < -4) {
            // Scrolling UP -> reveal immediately
            setIsScrolledDown(false);
          }

          lastScrollYRef.current = currentY;
          ticking = false;
        });
        ticking = true;
      }

      // Reappear as soon as user stops scrolling (debounced pause detection)
      scrollStopTimerRef.current = window.setTimeout(() => {
        setIsScrolledDown(false);
      }, 420);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
    };
  }, []);

  // Reveal navigation if user points mouse near the bottom
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight - 80) {
        setIsScrolledDown(false);
      }
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  // Butter-smooth active section detection using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'offensive-lab', 'work', 'learning', 'strengths', 'workbench', 'identity', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => {
            const aDist = Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2);
            const bDist = Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2);
            return aDist - bDist;
          });
          const activeEl = visibleEntries[0].target;
          if (activeEl.id && activeEl.id !== activeSectionId) {
            setActiveSectionId(activeEl.id);
          }
        }
      },
      {
        threshold: [0.1, 0.3, 0.6],
        rootMargin: '-10% 0px -25% 0px',
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeSectionId]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    setIsScrolledDown(false);
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (!isOpen) {
      enterTimerRef.current = window.setTimeout(() => {
        if (isHoveringRef.current) {
          setIsOpen(true);
          audioSystem.playHover();
        }
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (enterTimerRef.current) {
      window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
    if (leaveTimerRef.current) window.clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = window.setTimeout(() => {
      if (!isHoveringRef.current) {
        setIsOpen(false);
      }
    }, 450);
  };

  const handleToggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      audioSystem.playClick();
    }
  };

  const handleInitialsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioSystem.playHover();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setClickCount(0);
      onTriggerOverride();
    }
  };

  const handleNavigate = useCallback((e: React.MouseEvent, section: NavSection) => {
    e.preventDefault();
    audioSystem.playClick();
    setIsOpen(false);

    if (section.id === 'hero' || section.href === '#' || section.href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } else {
      const target = document.getElementById(section.id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const activeSection = navSections.find((s) => s.id === activeSectionId) || navSections[0];
  const ActiveIcon = activeSection.icon;

  return (
    <nav 
      className={`fixed bottom-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none select-none gpu-layer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolledDown && !isOpen ? 'translate-y-24 opacity-0 pointer-events-none scale-95' : 'translate-y-0 opacity-100 scale-100'
      }`}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto flex items-center justify-center max-w-[calc(100vw-16px)]"
      >
        {/* Organic Liquid Glass Capsule with Fluid Morphing */}
        <div
          className={`relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center border border-slate-300/80 dark:border-white/20 ${
            isOpen
              ? 'w-fit max-w-[calc(100vw-16px)] h-14 px-2 sm:px-3 py-1.5 rounded-full liquid-glass-elevated shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_35px_rgba(100,210,255,0.22)]'
              : 'w-[236px] sm:w-[246px] h-12 px-3.5 sm:px-4 rounded-full cursor-pointer liquid-lens-capsule shadow-[0_16px_36px_rgba(0,0,0,0.3),0_0_20px_rgba(100,210,255,0.18)] hover:scale-[1.02] active:scale-[0.98]'
          }`}
          onClick={!isOpen ? handleToggleOpen : undefined}
          title={!isOpen ? 'Click or hover to expand navigation' : undefined}
        >
          {/* COLLAPSED STATE: Monogram + Active Indicator + Pulse Pill */}
          <div
            className={`flex items-center justify-between w-full gap-2.5 whitespace-nowrap transition-all duration-300 ease-out ${
              isOpen
                ? 'opacity-0 scale-95 pointer-events-none absolute inset-0 px-4'
                : 'opacity-100 scale-100'
            }`}
          >
            {/* DG Monogram */}
            <button
              onClick={handleInitialsClick}
              title="Dhruv Goswami (Click 5x for Diagnostics)"
              className="w-7 h-7 rounded-full bg-gradient-to-tr from-accent-cyan via-accent-blue to-accent-mint p-[1px] shadow-[0_0_10px_rgba(100,210,255,0.4)] flex items-center justify-center shrink-0 min-h-[28px] min-w-[28px]"
            >
              <div className="w-full h-full rounded-full bg-slate-900 dark:bg-black flex items-center justify-center text-accent-cyan text-[10px] font-bold">
                {PORTFOLIO_DATA.initials}
              </div>
            </button>

            {/* Active Section Label with Smooth Fade */}
            <div className="flex items-center gap-2 overflow-hidden flex-1 justify-center">
              <ActiveIcon className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
              <div
                key={activeSection.id}
                className="font-sans font-bold text-xs text-slate-900 dark:text-white tracking-wider uppercase truncate animate-fade-in"
              >
                {activeSection.label}
              </div>
            </div>

            {/* Pulse Indicator & Chevron */}
            <div className="flex items-center gap-1.5 pl-1 text-slate-500 dark:text-white/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <ChevronUp className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* EXPANDED STATE: Full Fluid Navigation Bar */}
          <div
            className={`flex items-center gap-1 sm:gap-2 whitespace-nowrap transition-all duration-400 ease-out ${
              isOpen
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 pointer-events-none absolute inset-0 px-3'
            }`}
          >
            {/* Left Monogram */}
            <button
              onClick={handleInitialsClick}
              title="Identity Core (Click 5x for Diagnostics)"
              className="flex items-center p-1 rounded-full hover:bg-slate-900/10 dark:hover:bg-white/10 transition-colors shrink-0 min-w-[32px] sm:min-w-[36px] min-h-[32px] sm:min-h-[36px] justify-center"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-blue p-[1px] shadow-[0_0_8px_rgba(100,210,255,0.35)] shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-slate-900 dark:bg-black flex items-center justify-center font-sans text-[10px] sm:text-[11px] font-bold text-accent-cyan">
                  {PORTFOLIO_DATA.initials}
                </div>
              </div>
            </button>

            {/* Navigation Links with Smooth Stagger Entrance */}
            <div className="flex items-center gap-0.5 sm:gap-1 no-scrollbar py-0.5 overflow-x-auto px-1">
              {navSections.map((section, idx) => {
                const Icon = section.icon;
                const isActive = activeSectionId === section.id;
                return (
                  <a
                    key={section.id}
                    href={section.href}
                    onClick={(e) => handleNavigate(e, section)}
                    style={{
                      transitionDelay: isOpen ? `${idx * 24}ms` : '0ms',
                    }}
                    className={`relative flex items-center rounded-full transition-all duration-300 ease-out shrink-0 min-h-[34px] ${
                      isActive
                        ? 'bg-accent-blue/15 dark:bg-accent-blue/30 text-accent-blue dark:text-white border border-accent-blue/40 dark:border-accent-cyan/50 shadow-[0_0_12px_rgba(10,132,255,0.25)] px-2 sm:px-2.5 py-1'
                        : 'text-slate-700 dark:text-white/70 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10 px-1.5 sm:px-2 py-1'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isActive ? 'text-accent-blue dark:text-accent-cyan scale-110' : 'text-slate-600 dark:text-white/70'}`} />
                    <span className="text-[11px] sm:text-xs font-semibold tracking-tight ml-1 whitespace-nowrap">
                      {section.id === 'offensive-lab' ? (
                        <>
                          <span className="hidden xl:inline">Security </span>Lab
                        </>
                      ) : (
                        section.label
                      )}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Utility Controls Group */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 pl-1.5 sm:pl-2 ml-1 border-l border-slate-300 dark:border-white/10">
              {onToggleSound && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSound();
                  }}
                  title={soundEnabled ? 'Audio Effects: ON' : 'Audio Effects: MUTED'}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 min-h-[28px] sm:min-h-[32px] min-w-[28px] sm:min-w-[32px] ${
                    soundEnabled 
                      ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40 shadow-[0_0_10px_rgba(100,210,255,0.3)]' 
                      : 'text-slate-600 dark:text-white/40 hover:text-slate-900 dark:hover:text-white/80 hover:bg-slate-900/5 dark:hover:bg-white/10'
                  }`}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                </button>
              )}

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audioSystem.playClick();
                  setIsOpen(false);
                }}
                title="Collapse Navigation"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-900/10 dark:text-white/50 dark:hover:text-white dark:hover:bg-white/15 transition-colors min-h-[28px] sm:min-h-[32px] min-w-[28px] sm:min-w-[32px]"
              >
                <X className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
