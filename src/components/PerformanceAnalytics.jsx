import React from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  ArrowRight
} from 'lucide-react';

export default function PerformanceAnalytics({ setActiveTab }) {
  const domains = [
    { name: 'Quantitative Aptitude', accuracy: 74, benchmark: 80, speed: '52s / Q', status: 'Near Benchmark' },
    { name: 'Logical Reasoning', accuracy: 88, benchmark: 80, speed: '41s / Q', status: 'Ready' },
    { name: 'Core CS (OS, DBMS, CN)', accuracy: 70, benchmark: 85, speed: '38s / Q', status: 'Needs Revision' },
    { name: 'DSA & Algorithms', accuracy: 68, benchmark: 75, speed: '18m / Problem', status: 'Needs Practice' },
    { name: 'General Awareness / Polity', accuracy: 65, benchmark: 75, speed: '25s / Q', status: 'Needs Practice' },
  ];

  const gapItems = [
    {
      topic: 'Time & Work (Pipes & Cisterns)',
      accuracy: 58,
      action: 'Master LCM efficiency method; practice 5 leak problems',
      tab: 'aptitude'
    },
    {
      topic: 'SQL Window Functions (RANK, DENSE_RANK)',
      accuracy: 62,
      action: 'Revise tie-breaking syntax and partition queries',
      tab: 'placements'
    },
    {
      topic: 'Dynamic Programming (0/1 Knapsack & Subsets)',
      accuracy: 60,
      action: 'Practice choice diagram and 1D space optimization',
      tab: 'placements'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-400" />
            Performance & Gap Analysis
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real metrics, zero flattery. Pinpoint exact knowledge gaps, speed bottlenecks, and percentile trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Readiness Index
            </p>
            <p className="text-xl font-black text-emerald-400">76 / 100</p>
          </div>
        </div>
      </div>

      {/* Domain Breakdown Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          Skill Accuracy & Speed Matrix
        </h3>

        <div className="space-y-3.5">
          {domains.map((dom, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">{dom.name}</span>
                <div className="flex items-center gap-4 text-slate-400">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-amber-400" /> {dom.speed}
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      dom.accuracy >= dom.benchmark ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {dom.accuracy}% (Goal: {dom.benchmark}%)
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    dom.accuracy >= dom.benchmark
                      ? 'bg-emerald-400'
                      : dom.accuracy >= 70
                      ? 'bg-amber-400'
                      : 'bg-rose-400'
                  }`}
                  style={{ width: `${dom.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gap Analysis & Actionable Remedies */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Active Gap Remedy Prescription
          </h3>
          <span className="text-xs text-slate-400">Strictly targeted to eliminate interview/OA rejects</span>
        </div>

        <div className="space-y-3">
          {gapItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-850 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{item.topic}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    {item.accuracy}% Accuracy
                  </span>
                </div>
                <p className="text-xs text-slate-400">{item.action}</p>
              </div>

              <button
                onClick={() => setActiveTab(item.tab)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-semibold self-start sm:self-auto transition"
              >
                <span>Bridge Gap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
