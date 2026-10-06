import { useState, useEffect, useCallback } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { SystemInitialization } from './components/SystemInitialization';
import { Navigation } from './components/Navigation';
import { InnovativeScrollBar } from './components/InnovativeScrollBar';
import { ScrollReveal } from './components/ScrollReveal';
import { HeroSection } from './components/HeroSection';
import { OffensiveSecurityLab } from './components/OffensiveSecurityLab';
import { ProjectsSection } from './components/ProjectsSection';
import { CurrentlyLearningSection } from './components/CurrentlyLearningSection';
import { StrengthsSection } from './components/StrengthsSection';
import { CodeWorkbench } from './components/CodeWorkbench';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DiagnosticOverrideModal } from './components/DiagnosticOverrideModal';
import { audioSystem } from './utils/audioSystem';

export function App() {
  const [isInitialized, setIsInitialized] = useState(() => {
    try {
      return !!sessionStorage.getItem('dhruv_system_initialized');
    } catch {
      return false;
    }
  });
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [keySequence, setKeySequence] = useState<string>('');

  const triggerOverride = useCallback(() => {
    setIsOverrideOpen(true);
    audioSystem.playAccessGranted();
  }, []);

  const handleToggleSound = useCallback(() => {
    const newState = audioSystem.toggleSound();
    setSoundEnabled(newState);
  }, []);

  // Keyboard sequence detector for 'kali' or 'hack' easter eggs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const newSeq = (keySequence + e.key.toLowerCase()).slice(-8);
      setKeySequence(newSeq);

      if (newSeq.endsWith('kali') || newSeq.endsWith('hack')) {
        triggerOverride();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence, triggerOverride]);

  // Ensure webpage always starts strictly at the top (Home)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Reset anchor hash on initial load so browser does not jump down to middle sections
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const t1 = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);
    const t2 = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 180);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (isInitialized) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [isInitialized]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-black text-slate-900 dark:text-white selection:bg-accent-cyan selection:text-black relative overflow-x-hidden font-sans transition-colors duration-300">
      {/* Aurora Ambient Background Mesh */}
      <div className="fixed inset-0 aurora-mesh pointer-events-none z-0 opacity-70" />

      {/* Non-blocking Specular Halo Optical Follower */}
      <CustomCursor />

      {/* Translucent Interactive Scroll Rail */}
      <InnovativeScrollBar />

      {/* Cinematic System Initialization (skippable) */}
      {!isInitialized && (
        <SystemInitialization onComplete={() => setIsInitialized(true)} />
      )}

      {/* Main Portfolio Interface */}
      <div className={`relative z-10 transition-opacity duration-700 ${isInitialized ? 'opacity-100' : 'opacity-0'}`}>
        {/* Buttery-Smooth Fluid Floating Navigation Bar */}
        <Navigation 
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onTriggerOverride={triggerOverride} 
        />

        {/* Hero Section with Spatial Canvas */}
        <HeroSection />

        {/* Dedicated Kali Linux & Offensive Security Lab Section */}
        <ScrollReveal>
          <OffensiveSecurityLab />
        </ScrollReveal>

        {/* Selected Work & Spatial Case Files */}
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>

        {/* Living Learning Node Graph & Segmented Controls */}
        <ScrollReveal>
          <CurrentlyLearningSection />
        </ScrollReveal>

        {/* Engineering Strengths & Qualities */}
        <ScrollReveal>
          <StrengthsSection />
        </ScrollReveal>

        {/* Live Code Workbench */}
        <ScrollReveal>
          <CodeWorkbench />
        </ScrollReveal>

        {/* Developer Identity & Philosophy */}
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>

        {/* Communication Hub & Dispatcher */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>

        {/* Minimalist Footer */}
        <Footer />

        {/* Diagnostic System Override Easter Egg Modal */}
        <DiagnosticOverrideModal
          isOpen={isOverrideOpen}
          onClose={() => setIsOverrideOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
