import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Sparkles, Clock, Target } from 'lucide-react';
import PomodoroTimer from './PomodoroTimer';

export default function SkillupHeader({
  activeTab,
  setActiveTab,
  onOpenSearch
}) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md px-10 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30">
      {/* Horizontal Nav Links for Prep Land Modules */}
      <nav className="flex items-center gap-8 text-sm font-semibold text-slate-500">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`transition-colors relative py-2 ${
            activeTab === 'dashboard' ? 'text-slate-900 font-extrabold' : 'hover:text-slate-900'
          }`}
        >
          Study Assistant
          {activeTab === 'dashboard' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('aptitude')}
          className={`transition-colors relative py-2 ${
            activeTab === 'aptitude' ? 'text-slate-900 font-extrabold' : 'hover:text-slate-900'
          }`}
        >
          Aptitude Engine
          {activeTab === 'aptitude' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('solver')}
          className={`transition-colors relative py-2 ${
            activeTab === 'solver' ? 'text-slate-900 font-extrabold' : 'hover:text-slate-900'
          }`}
        >
          Formula Solver
          {activeTab === 'solver' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
          )}
        </button>

        {/* Preparation Hubs Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCoursesOpen(!coursesOpen)}
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors py-2 cursor-pointer"
          >
            <span>Prep Hubs</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </button>

          {coursesOpen && (
            <div className="absolute top-11 left-0 w-60 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 z-50 text-xs font-semibold text-slate-700 animate-in fade-in zoom-in-95">
              <button
                onClick={() => {
                  setActiveTab('placements');
                  setCoursesOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition flex items-center justify-between"
              >
                <span>Campus SDE & Core CS</span>
                <span className="text-[10px] font-mono bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">DSA</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('govt-exams');
                  setCoursesOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition flex items-center justify-between"
              >
                <span>UPSC, SSC & Banking</span>
                <span className="text-[10px] font-mono bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">PYQs</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('mock-tests');
                  setCoursesOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition flex items-center justify-between"
              >
                <span>Adaptive Mock Test</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">Live</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('interview-coach');
                  setCoursesOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition flex items-center justify-between"
              >
                <span>STAR Interview Coach</span>
                <span className="text-[10px] font-mono bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded">HR/Tech</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('flashcards');
                  setCoursesOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition flex items-center justify-between"
              >
                <span>AI Notes & Flashcards</span>
                <span className="text-[10px] font-mono bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded">Recall</span>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveTab('resume-optimizer')}
          className={`transition-colors relative py-2 ${
            activeTab === 'resume-optimizer' ? 'text-slate-900 font-extrabold' : 'hover:text-slate-900'
          }`}
        >
          Resume ATS
          {activeTab === 'resume-optimizer' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`transition-colors relative py-2 ${
            activeTab === 'analytics' ? 'text-slate-900 font-extrabold' : 'hover:text-slate-900'
          }`}
        >
          Analytics & Gaps
          {activeTab === 'analytics' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('ai-chat')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow hover:bg-slate-800 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Ask Prep Land</span>
        </button>
      </nav>

      {/* Right Search and Notification */}
      <div className="flex items-center gap-4 relative">
        <button
          onClick={onOpenSearch}
          className="flex items-center justify-between w-64 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full text-xs text-slate-400 transition"
        >
          <span>Search formulas, PYQs...</span>
          <kbd className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        {/* Pomodoro Focus Study Timer */}
        <button
          onClick={() => setShowPomodoro(!showPomodoro)}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition cursor-pointer ${
            showPomodoro
              ? 'bg-indigo-600 text-white border-indigo-600 shadow'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 shadow-sm'
          }`}
          title="Pomodoro Study Timer"
        >
          <Clock className="w-4 h-4" />
        </button>

        {showPomodoro && (
          <div className="absolute right-0 top-14 w-80 z-50 animate-in fade-in zoom-in-95">
            <PomodoroTimer onSessionComplete={() => {}} />
          </div>
        )}

        {/* Notification Bell */}
        <button
          onClick={() => setActiveTab('mock-tests')}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center shadow-sm relative cursor-pointer"
          title="Mock test alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2.5 right-2.5" />
        </button>
      </div>
    </header>
  );
}
