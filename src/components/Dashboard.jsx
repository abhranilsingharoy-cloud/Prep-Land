import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  BookOpen,
  Code2,
  Database,
  Briefcase
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { UPCOMING_DRIVES } from '../data/flashcardsData';

export default function Dashboard({ setActiveTab, onStartPractice, targetExam }) {
  const weakAreas = [
    { topic: 'Time & Work (Pipes & Cisterns)', accuracy: 58, testedIn: 'TCS, Infosys, SSC CGL' },
    { topic: 'Graph Traversal (BFS & DFS)', accuracy: 64, testedIn: 'Amazon, Adobe, FlipKart' },
    { topic: 'ACID & SQL Window Functions', accuracy: 60, testedIn: 'Tech Interviews' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Mentor Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-7 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Targeting: {targetExam.toUpperCase()}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Good evening, Candidate! Let's lock in your preparation.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              "Consistency beats last-minute panic. Today we focus on step-by-step clarity, 
              zero guesswork, and high-yield problem solving across your 4 active tracks."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveTab('aptitude')}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <span>Daily Aptitude Drill</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('placements')}
              className="flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-white font-semibold px-5 py-3 rounded-xl text-xs transition-all"
            >
              <Code2 className="w-4 h-4 text-teal-400" />
              <span>DSA & Core CS</span>
            </button>
          </div>
        </div>

        {/* Ambient background blur */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4-Track Quick Execution Matrix */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            The 4-Track Placement & Exam Engine
          </h3>
          <span className="text-xs text-slate-400">Recommended 3.5 hrs/day distribution</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Track 1 */}
          <div
            onClick={() => setActiveTab('aptitude')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 transition-all cursor-pointer group hover:shadow-xl hover:shadow-teal-500/5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
                Track 1
              </span>
            </div>
            <h4 className="font-bold text-slate-100 text-sm group-hover:text-teal-300 transition-colors">
              Aptitude Engine
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Quant shortcuts, LCM efficiency method, syllogisms, and speed math drills.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800/80">
              <span className="text-emerald-400 font-medium">8 topics active</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-slate-300">
                Practice <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Track 2 */}
          <div
            onClick={() => setActiveTab('placements')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group hover:shadow-xl hover:shadow-indigo-500/5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                Track 2
              </span>
            </div>
            <h4 className="font-bold text-slate-100 text-sm group-hover:text-indigo-300 transition-colors">
              DSA & Placement Sheet
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Categorized LeetCode sheets, Two Pointers, Trees, DP, and Python/C++ code.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800/80">
              <span className="text-indigo-400 font-medium">Amazon & TCS sets</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-slate-300">
                Solve <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Track 3 */}
          <div
            onClick={() => setActiveTab('govt-exams')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group hover:shadow-xl hover:shadow-amber-500/5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                Track 3
              </span>
            </div>
            <h4 className="font-bold text-slate-100 text-sm group-hover:text-amber-300 transition-colors">
              Core CS & Govt PYQs
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              OS Deadlocks, DBMS Indexing, SQL queries, SSC CGL & UPSC verified PYQs.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800/80">
              <span className="text-amber-400 font-medium">100% verified data</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-slate-300">
                Revise <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Track 4 */}
          <div
            onClick={() => setActiveTab('interview-coach')}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group hover:shadow-xl hover:shadow-emerald-500/5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                Track 4
              </span>
            </div>
            <h4 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors">
              STAR Interview Coach
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Situation-Task-Action-Result answers, HR traps, and ATS resume scoring.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800/80">
              <span className="text-emerald-400 font-medium">Mock evaluator</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-slate-300">
                Simulate <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Weak Area Alerts & Upcoming Placement/Govt Drives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Diagnostic Weak Areas & Concept of Day */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weak Area Diagnostic */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-white text-base">Diagnostic Weak Area Alerts</h4>
              </div>
              <span className="text-xs text-slate-400">Based on recent performance</span>
            </div>

            <div className="space-y-3">
              {weakAreas.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-200">{item.topic}</p>
                    <p className="text-xs text-slate-400">Tested in: {item.testedIn}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-400">{item.accuracy}% Accuracy</span>
                      <p className="text-[10px] text-slate-500">Benchmark: 80%+</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('aptitude')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20 transition"
                    >
                      Fix Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-Yield Formula Spotlight */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Daily Speed Shortcut
              </span>
              <span className="text-xs text-slate-400">Tested in 95% Campus OAs</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              Time & Work: Efficiency (LCM) Principle
            </h4>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 my-3 font-mono text-sm text-emerald-400 text-center">
              <MathRenderer
                content="\text{Total Work} = \text{LCM of days} \quad | \quad \text{Efficiency} = \frac{\text{Total Work}}{\text{Days}} \quad | \quad \text{Time} = \frac{\text{Work}}{\sum \text{Efficiency}}"
                inline={false}
              />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never solve with fractions like $\frac{1}{12} + \frac{1}{18}$. Taking the LCM of days instantly converts work into whole units, allowing mental math and saving 45 seconds per problem!
            </p>
          </div>
        </div>

        {/* Right Col: Live Deadlines & Drives */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Active Hiring & Exams
              </h4>
              <span className="text-[11px] text-slate-400">Live Updates</span>
            </div>

            <div className="space-y-3.5">
              {UPCOMING_DRIVES.map((drive) => (
                <div
                  key={drive.id}
                  className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-semibold text-slate-200 text-xs">{drive.company}</h5>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        drive.status === 'Open'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {drive.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{drive.role}</p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <span className="text-emerald-400 font-semibold">{drive.package}</span>
                    <span className="text-slate-400">{drive.batch}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
