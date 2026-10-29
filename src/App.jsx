import React, { useState, useEffect } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import EasterEggs from './components/EasterEggs';

import Scene00Initialization from './scenes/Scene00Initialization';
import Scene01Builder from './scenes/Scene01Builder';
import Scene02CyberSide from './scenes/Scene02CyberSide';
import Scene03Learner from './scenes/Scene03Learner';
import Scene04Strengths from './scenes/Scene04Strengths';
import Scene05Projects from './scenes/Scene05Projects';
import Scene06HowIThink from './scenes/Scene06HowIThink';
import Scene07DigitalFootprint from './scenes/Scene07DigitalFootprint';
import Scene08Contact from './scenes/Scene08Contact';
import Scene09Ending from './scenes/Scene09Ending';

import { sound } from './utils/soundEngine';

export default function App() {
  const [initialized, setInitialized] = useState(false);
  const [activeChapter, setActiveChapter] = useState('01');
  const [soundActive, setSoundActive] = useState(false);
  const [timeDilation, setTimeDilation] = useState(1.0);

  // Easter Eggs state
  const [overrideActive, setOverrideActive] = useState(false);
  const [diagnosticActive, setDiagnosticActive] = useState(false);
  const [wireframeActive, setWireframeActive] = useState(false);

  // Sound toggle handler
  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundActive(newState);
  };

  // Keyboard shortcut listener for easter eggs ("override", "chronos", "diag")
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing into an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 20) {
        keyBuffer = keyBuffer.slice(-20);
      }

      if (keyBuffer.includes('override') || keyBuffer.includes('chronos')) {
        sound.playOverrideAlert();
        setOverrideActive(true);
        keyBuffer = '';
      } else if (keyBuffer.includes('diag') || keyBuffer.endsWith('?')) {
        sound.playMechanicalTick(1200);
        setDiagnosticActive((prev) => !prev);
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // IntersectionObserver to dynamically track active scene
  useEffect(() => {
    if (!initialized) return;

    const sceneIds = [
      { id: 'scene-01', index: '01' },
      { id: 'scene-02', index: '02' },
      { id: 'scene-03', index: '03' },
      { id: 'scene-04', index: '04' },
      { id: 'scene-05', index: '05' },
      { id: 'scene-06', index: '06' },
      { id: 'scene-07', index: '07' },
      { id: 'scene-08', index: '08' },
      { id: 'scene-09', index: '09' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sceneIds.find((s) => s.id === entry.target.id);
            if (matched) {
              setActiveChapter(matched.index);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sceneIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [initialized]);

  // Smooth scroll helper
  const scrollToScene = (sceneId) => {
    const el = document.getElementById(sceneId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRewindToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`relative min-h-screen bg-temporal-black ${wireframeActive ? 'wireframe-mode' : ''}`}>
      
      {/* Film Grain Texture & Scanlines */}
      <div className="film-grain" />
      <div className="scanlines" />

      {/* Retro-Futuristic Reticle Cursor (Desktop) */}
      <CustomCursor />

      {/* WebGL/Canvas Concentric Rings & Branching Filaments */}
      <BackgroundCanvas timeDilation={timeDilation} />

      {/* SCENE 00: INITIALIZATION SEQUENCE */}
      {!initialized && (
        <Scene00Initialization onComplete={() => setInitialized(true)} />
      )}

      {/* Main Experience (Visible after or during initialization) */}
      <div className={`transition-opacity duration-1000 ${initialized ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Navigation Bar & Timeline Dial */}
        <Navigation
          activeChapter={activeChapter}
          onSelectChapter={scrollToScene}
          onTriggerOverride={() => {
            sound.playOverrideAlert();
            setOverrideActive(true);
          }}
          onToggleDiagnostic={() => setDiagnosticActive(!diagnosticActive)}
          soundActive={soundActive}
          onToggleSound={handleToggleSound}
        />

        {/* Easter Eggs & HUDs */}
        <EasterEggs
          overrideActive={overrideActive}
          onCloseOverride={() => setOverrideActive(false)}
          diagnosticActive={diagnosticActive}
          onCloseDiagnostic={() => setDiagnosticActive(false)}
          wireframeActive={wireframeActive}
          onToggleWireframe={() => {
            sound.playMechanicalTick(1100);
            setWireframeActive(!wireframeActive);
          }}
        />

        {/* Cinematic Chapter Scenes */}
        <main className="relative z-10">
          <Scene01Builder
            onScrollToScene={scrollToScene}
            timeDilation={timeDilation}
            setTimeDilation={setTimeDilation}
          />
          <Scene02CyberSide />
          <Scene03Learner />
          <Scene04Strengths />
          <Scene05Projects />
          <Scene06HowIThink />
          <Scene07DigitalFootprint />
          <Scene08Contact />
          <Scene09Ending onRewindToTop={handleRewindToTop} />
        </main>

      </div>
    </div>
  );
}
