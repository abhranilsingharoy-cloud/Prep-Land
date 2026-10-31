import React, { useState } from 'react';
import { Search, Sparkles, Languages, Clock, Target, CheckCircle2 } from 'lucide-react';
import PomodoroTimer from './PomodoroTimer';

export const TARGET_EXAMS = [
  { id: 'sde-campus', name: 'Campus Placement: SDE-1 / Product', category: 'College' },
  { id: 'service-campus', name: 'Campus Placement: Mass / TCS / Infy', category: 'College' },
  { id: 'ssc-cgl', name: 'SSC CGL 2026 (Tier 1 & 2)', category: 'Govt Exam' },
  { id: 'upsc-cse', name: 'UPSC CSE (Prelims & CSAT)', category: 'Govt Exam' },
  { id: 'banking-po', name: 'IBPS / SBI PO & Clerk', category: 'Govt Exam' },
  { id: 'rrb-railway', name: 'RRB NTPC & Group D', category: 'Govt Exam' },
  { id: 'cat-aptitude', name: 'CAT / General Aptitude', category: 'Competitive' },
];

export default function Header({
  targetExam,
  setTargetExam,
  onOpenSearch,
  language,
  setLanguage,
  onOpenAiDoubt
}) {
  const [showPomodoro, setShowPomodoro] = useState(false);

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Target Exam Goal Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
          <Target className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400 font-medium">Target Track:</span>
          <select
            value={targetExam}
            onChange={(e) => setTargetExam(e.target.value)}
            className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer"
          >
            {TARGET_EXAMS.map((item) => (
              <option key={item.id} value={item.id} className="bg-slate-900 text-white">
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Global Quick Search Bar */}
      <button
        onClick={onOpenSearch}
        className="flex items-center gap-3 bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/80 px-4 py-2 rounded-xl text-xs transition-all w-96 justify-between group"
      >
        <span className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
          <span>Search formulas, DSA patterns, PYQs, topics...</span>
        </span>
        <kbd className="bg-slate-700/60 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-600">
          Ctrl + K
        </kbd>
      </button>

      {/* Controls: Pomodoro, Language, Ask Coach */}
      <div className="flex items-center gap-3 relative">
        {/* Pomodoro Focus Timer Trigger */}
        <button
          onClick={() => setShowPomodoro(!showPomodoro)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition ${
            showPomodoro
              ? 'bg-indigo-600 border-indigo-500 text-white'
              : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-700'
          }`}
          title="Pomodoro Focus Study Timer"
        >
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Focus Timer</span>
        </button>

        {/* Pomodoro Popover Modal */}
        {showPomodoro && (
          <div className="absolute right-0 top-12 z-50 w-80 animate-in fade-in zoom-in-95">
            <PomodoroTimer onSessionComplete={() => {}} />
          </div>
        )}

        {/* Language switcher */}
        <button
          onClick={() => setLanguage(language === 'English' ? 'Hinglish' : language === 'Hinglish' ? 'Hindi' : 'English')}
          className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-700 transition"
          title="Toggle English / Hinglish / Hindi response mode"
        >
          <Languages className="w-3.5 h-3.5 text-teal-400" />
          <span>{language}</span>
        </button>

        {/* Instant Doubt CTA */}
        <button
          onClick={onOpenAiDoubt}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          <span>Ask Prep Land</span>
        </button>
      </div>
    </header>
  );
}
