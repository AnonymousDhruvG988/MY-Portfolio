import { useState, useEffect, useCallback } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { SystemInitialization } from './components/SystemInitialization';
import { Navigation } from './components/Navigation';
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
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);
  const [keySequence, setKeySequence] = useState<string>('');

  const triggerOverride = useCallback(() => {
    setIsOverrideOpen(true);
    audioSystem.playAccessGranted();
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

  return (
    <div className="min-h-screen bg-bg-void text-text-primary selection:bg-accent-mint selection:text-bg-void relative overflow-x-hidden">
      {/* Cinematic Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Opening Cinematic Initialization (1.5 - 2.5s, skippable) */}
      {!isInitialized && (
        <SystemInitialization onComplete={() => setIsInitialized(true)} />
      )}

      {/* Main Engineering Interface */}
      <div className={`transition-opacity duration-700 ${isInitialized ? 'opacity-100' : 'opacity-0'}`}>
        {/* Fixed Engineering Header */}
        <Navigation onTriggerOverride={triggerOverride} />

        {/* Hero Section with Interactive Digital Core */}
        <HeroSection />

        {/* Dedicated Kali Linux & Offensive Security Lab Section */}
        <OffensiveSecurityLab />

        {/* Selected Work & Case Files */}
        <ProjectsSection />

        {/* Currently Learning Living Node Graph */}
        <CurrentlyLearningSection />

        {/* Engineering Strengths & Qualities */}
        <StrengthsSection />

        {/* Live Code Workbench */}
        <CodeWorkbench />

        {/* About & Digital Identity */}
        <AboutSection />

        {/* Verified Contact & Communication Channels */}
        <ContactSection />

        {/* Technical Footer */}
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
