import React from 'react';
import {
  BookOpen,
  Briefcase,
  Landmark,
  GraduationCap,
  Sparkles,
  FileText,
  MessageSquare,
  BarChart3,
  Award,
  Layers,
  ChevronRight,
  Flame,
  CheckCircle2,
  Calculator
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, streakCount = 6, dailyGoalProgress = 75 }) {
  const navItems = [
    { id: 'dashboard', label: 'Study Assistant', icon: GraduationCap, badge: 'Hub' },
    { id: 'aptitude', label: 'Aptitude Engine', icon: BookOpen, badge: 'Speed' },
    { id: 'solver', label: 'Live Formula Solver', icon: Calculator, badge: 'Live' },
    { id: 'placements', label: 'Placement Hub', icon: Briefcase, badge: 'SDE/Core' },
    { id: 'govt-exams', label: 'Govt Exam Hub', icon: Landmark, badge: 'PYQs' },
    { id: 'mock-tests', label: 'Mock Test Simulator', icon: Award, badge: 'Tests' },
    { id: 'interview-coach', label: 'Interview Coach', icon: Sparkles, badge: 'STAR' },
    { id: 'resume-optimizer', label: 'Resume & ATS', icon: FileText, badge: 'Score' },
    { id: 'flashcards', label: 'AI Notes & Cards', icon: Layers, badge: 'Recall' },
    { id: 'analytics', label: 'Analytics & Gaps', icon: BarChart3, badge: 'Track' },
    { id: 'ai-chat', label: 'Prep Land Mentor', icon: MessageSquare, badge: 'AI' },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col h-screen sticky top-0 select-none shadow-xl">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              Prep Land
              <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                AI Coach
              </span>
            </h1>
            <p className="text-xs text-slate-400">Exam & Placement Mentor</p>
          </div>
        </div>
      </div>

      {/* Daily Streak & Goal Progress */}
      <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
        <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
            {streakCount} Day Streak!
          </span>
          <span className="text-slate-400">{dailyGoalProgress}% of Goal</span>
        </div>
        <div className="w-full bg-slate-700/60 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${dailyGoalProgress}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          16 / 20 practice questions done today
        </p>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-1 py-1 custom-scrollbar">
        <div className="px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Learning Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isActive ? 'opacity-100' : ''
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Mentor Persona Status */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <p className="font-semibold text-slate-200">Coach Mode: Active</p>
            <p className="text-[11px] text-slate-400">Step-by-step & Zero Flattery</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
