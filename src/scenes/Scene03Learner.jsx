import React, { useState } from 'react';
import { DEVELOPER_DATA } from '../data/developerData';
import { sound } from '../utils/soundEngine';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export default function Scene03Learner() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(DEVELOPER_DATA.skills.categories[0].items[0]);

  const allSkills = [
    ...DEVELOPER_DATA.skills.categories[0].items.map((i) => ({ ...i, type: 'Known', cat: 'Core' })),
    ...DEVELOPER_DATA.skills.categories[1].items.map((i) => ({ ...i, type: 'Learning', cat: 'Expanding' }))
  ];

  const filteredSkills = activeCategory === 'all'
    ? allSkills
    : allSkills.filter((s) => (activeCategory === 'known' ? s.type === 'Known' : s.type === 'Learning'));

  const handleSkillClick = (skill) => {
    sound.playMechanicalTick(950);
    setSelectedSkill(skill);
  };

  return (
    <section id="scene-03" className="chapter-section relative py-28">
      {/* Ambient glow */}
      <div className="ambient-glow w-[400px] h-[400px] bg-indigo-500/10 -top-20 right-10" />

      <div className="scene-container relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="modern-badge indigo">
                <Sparkles className="w-3.5 h-3.5" />
                CHAPTER 03 // THE LEARNER
              </span>
              <span className="modern-badge">
                Continuous Evolution
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
              SKILLS & <br className="hidden sm:inline" />
              <span className="gradient-text-indigo">
                ACTIVE LEARNING.
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === 'all' ? 'bg-white/20 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Skills
            </button>
            <button
              onClick={() => setActiveCategory('known')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === 'known' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Working Knowledge
            </button>
            <button
              onClick={() => setActiveCategory('learning')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === 'learning' ? 'bg-indigo-500/20 text-indigo-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Currently Learning
            </button>
          </div>
        </div>

        {/* Main Grid: Skills Grid + Deep Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Skills Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => handleSkillClick(skill)}
                  data-cursor="INSPECT"
                  className={`modern-card p-5 cursor-pointer relative group ${
                    isSelected
                      ? 'border-indigo-400/50 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                      : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full border ${
                        skill.type === 'Known'
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                          : 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10'
                      }`}
                    >
                      {skill.level}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">{skill.cat}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Click for details</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-indigo-400' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Skill Detail Panel (5 Cols) */}
          <div className="lg:col-span-5 modern-card p-6 sm:p-8 space-y-6 sticky top-28 border-indigo-500/20">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                Skill Telemetry
              </span>
              <span className="text-xs text-slate-400">
                {selectedSkill?.type}
              </span>
            </div>

            {selectedSkill ? (
              <div className="space-y-5">
                <div>
                  <h3 className="font-display font-extrabold text-3xl text-white">
                    {selectedSkill.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">Proficiency:</span>
                    <span className="text-xs text-emerald-400 font-semibold">{selectedSkill.level}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>How I Apply This:</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Learning Philosophy:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Rather than memorizing syntax, I write working test scripts, inspect memory and network logs, and build real tools.
                  </p>
                </div>
              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
}
