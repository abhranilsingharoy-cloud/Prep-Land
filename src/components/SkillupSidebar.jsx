import React from 'react';
import {
  Clock,
  Award,
  Crown,
  Monitor,
  Sparkles,
  Target
} from 'lucide-react';
import { usePrepLand } from '../context/PrepLandContext';
import LiveCountdown from './LiveCountdown';

export default function SkillupSidebar({ activeTab, setActiveTab }) {
  const { student, stats } = usePrepLand();

  // Dynamic SVG circle stroke offset
  const circumference = 264;
  const strokeOffset = circumference - (circumference * stats.readinessScore) / 100;

  return (
    <aside className="w-80 bg-[#161618] text-white p-7 flex flex-col justify-between shrink-0 select-none shadow-2xl relative z-20">
      {/* Top Brand Logo */}
      <div>
        <div
          className="flex items-center gap-2 mb-8 cursor-pointer group"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center">
              Prep<span className="text-teal-400 font-black">`</span>land
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Live Prep Platform
            </p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-teal-400 via-indigo-500 to-amber-400 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
                alt="Candidate Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#161618] shadow animate-pulse"
              title="Online Active"
            />
          </div>

          <h2 className="text-lg font-bold text-white tracking-tight">{student.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{student.examGoal}</p>

          <div className="mt-2.5 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#242428] text-teal-300 text-[11px] font-bold border border-teal-500/20">
              {student.rankTrack}
            </span>
            <LiveCountdown targetDate={student.examTargetDate} />
          </div>
        </div>

        {/* Circular Progress Gauge: Exam Readiness Score (Real-time reactive) */}
        <div className="relative flex flex-col items-center justify-center my-5">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Ring Gauge */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#2a2a30"
                strokeWidth="2.5"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Glowing bead at the end of progress */}
            <div
              className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_14px_4px_rgba(16,185,129,0.9)] border-2 border-[#161618]"
              style={{
                top: '19px',
                right: '46px'
              }}
            />

            {/* Center Text inside Circular Ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-extrabold text-white tracking-tight leading-none mb-1">
                {stats.readinessScore}
                <span className="text-xl font-bold text-teal-400">%</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold max-w-[95px] leading-tight">
                Exam Readiness Benchmark
              </span>
            </div>
          </div>

          {/* 4 Icon Circle Buttons below gauge */}
          <div className="flex items-center gap-3.5 mt-4">
            <button
              onClick={() => setActiveTab('aptitude')}
              className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all ${
                activeTab === 'aptitude'
                  ? 'bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-400/20'
                  : 'bg-[#252529] text-slate-300 hover:bg-[#303036] hover:text-white border border-white/5'
              }`}
              title={`Aptitude Pace: ${stats.avgSpeedSeconds}s per question`}
            >
              <Clock className="w-4 h-4" />
              <span className="text-[8px] mt-0.5 font-bold">{stats.avgSpeedSeconds}s</span>
            </button>

            <button
              onClick={() => setActiveTab('mock-tests')}
              className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all ${
                activeTab === 'mock-tests'
                  ? 'bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-400/20'
                  : 'bg-[#252529] text-slate-300 hover:bg-[#303036] hover:text-white border border-white/5'
              }`}
              title={`Mock Tests: ${stats.mocksCompleted} Completed`}
            >
              <Award className="w-4 h-4" />
              <span className="text-[8px] mt-0.5 font-bold">{stats.mocksCompleted}</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all ${
                activeTab === 'analytics'
                  ? 'bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-400/20'
                  : 'bg-[#252529] text-slate-300 hover:bg-[#303036] hover:text-white border border-white/5'
              }`}
              title={`Percentile: ${stats.percentile}%`}
            >
              <Crown className="w-4 h-4" />
              <span className="text-[8px] mt-0.5 font-bold">{Math.round(stats.percentile)}%</span>
            </button>

            <button
              onClick={() => setActiveTab('placements')}
              className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all ${
                activeTab === 'placements'
                  ? 'bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-400/20'
                  : 'bg-[#252529] text-slate-300 hover:bg-[#303036] hover:text-white border border-white/5'
              }`}
              title={`DSA Problems Solved: ${stats.dsaSolved}`}
            >
              <Monitor className="w-4 h-4" />
              <span className="text-[8px] mt-0.5 font-bold">{stats.dsaSolved}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Greeting Card */}
      <div className="pt-5 border-t border-white/5">
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
          Hey, {student.name.split(' ')[0]}! <span className="inline-block animate-bounce">👋</span>
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
          Daily goal: {stats.questionsSolvedToday} / {stats.dailyTarget} practice questions completed.
        </p>
      </div>
    </aside>
  );
}
