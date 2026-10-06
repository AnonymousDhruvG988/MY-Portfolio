import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { audioSystem } from '../utils/audioSystem';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dhruv_theme');
      if (saved) return saved === 'dark';
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    audioSystem.playClick();
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dhruv_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dhruv_theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="w-8 h-8 rounded-full liquid-glass border border-white/20 dark:border-white/15 shadow-[0_0_12px_rgba(100,210,255,0.2)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Toggle Dark and Light Mode"
    >
      {isDark ? (
        <Moon className="w-3.5 h-3.5 text-accent-cyan group-hover:-rotate-12 transition-transform duration-300" />
      ) : (
        <Sun className="w-3.5 h-3.5 text-accent-amber group-hover:rotate-45 transition-transform duration-300" />
      )}
    </button>
  );
};
