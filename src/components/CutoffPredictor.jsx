import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Calculator,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { sounds } from '../utils/audio';

const CUTOFF_BENCHMARKS = {
  'SSC CGL Tier 1': {
    totalMarks: 200,
    cutoffs: {
      UR: 144.5,
      OBC: 140.2,
      EWS: 138.0,
      SC: 124.8,
      ST: 116.5
    }
  },
  'IBPS PO Prelims': {
    totalMarks: 100,
    cutoffs: {
      UR: 54.5,
      OBC: 54.0,
      EWS: 52.5,
      SC: 47.5,
      ST: 41.0
    }
  },
  'RRB NTPC CBT-1': {
    totalMarks: 100,
    cutoffs: {
      UR: 72.0,
      OBC: 68.5,
      EWS: 65.0,
      SC: 60.5,
      ST: 55.0
    }
  }
};

export default function CutoffPredictor() {
  const [selectedExam, setSelectedExam] = useState('SSC CGL Tier 1');
  const [category, setCategory] = useState('UR');
  const [rawScore, setRawScore] = useState(136);
  const [shiftDifficulty, setShiftDifficulty] = useState('hard'); // 'easy', 'moderate', 'hard'

  const examData = CUTOFF_BENCHMARKS[selectedExam];
  const targetCutoff = examData.cutoffs[category];

  // Normalization bonus
  let normBonus = 0;
  if (shiftDifficulty === 'hard') {
    normBonus = selectedExam === 'SSC CGL Tier 1' ? 12.4 : 6.2;
  } else if (shiftDifficulty === 'moderate') {
    normBonus = selectedExam === 'SSC CGL Tier 1' ? 4.5 : 2.1;
  } else {
    normBonus = selectedExam === 'SSC CGL Tier 1' ? -1.0 : -0.5;
  }

  const normalizedScore = Number((rawScore + normBonus).toFixed(2));
  const diff = Number((normalizedScore - targetCutoff).toFixed(2));

  let zone = 'safe';
  let zoneLabel = 'Safe Zone (High Clearance Probability)';
  let zoneColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let probability = 88;

  if (diff < -5) {
    zone = 'risk';
    zoneLabel = 'At Risk (Below Expected Cutoff)';
    zoneColor = 'text-rose-700 bg-rose-50 border-rose-200';
    probability = 32;
  } else if (diff >= -5 && diff < 5) {
    zone = 'borderline';
    zoneLabel = 'Borderline Zone (Margin of Error)';
    zoneColor = 'text-amber-700 bg-amber-50 border-amber-200';
    probability = 62;
  }

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-1">
            <Calculator className="w-3.5 h-3.5 text-teal-600" />
            Normalization & Cutoff Predictor
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Multi-Shift Score Normalization & Cutoff Calculator
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Based on 2021–2025 Staff Selection Commission & IBPS Cutoff Models
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Columns: Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-500 font-semibold block mb-1">Target Exam:</label>
              <select
                value={selectedExam}
                onChange={(e) => { setSelectedExam(e.target.value); sounds.playClick(); }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl font-semibold focus:outline-none focus:border-teal-500"
              >
                {Object.keys(CUTOFF_BENCHMARKS).map((ex) => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-500 font-semibold block mb-1">Reservation Category:</label>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); sounds.playClick(); }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl font-semibold focus:outline-none focus:border-teal-500"
              >
                {['UR', 'OBC', 'EWS', 'SC', 'ST'].map((cat) => (
                  <option key={cat} value={cat}>{cat} Category</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label className="text-slate-500 font-semibold">Your Raw Mock Score:</label>
              <span className="font-mono font-extrabold text-slate-900 text-sm">
                {rawScore} / {examData.totalMarks}
              </span>
            </div>
            <input
              type="range"
              min={Math.round(examData.totalMarks * 0.2)}
              max={examData.totalMarks}
              value={rawScore}
              onChange={(e) => setRawScore(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Min ({Math.round(examData.totalMarks * 0.2)})</span>
              <span>Target Cutoff ({targetCutoff})</span>
              <span>Max ({examData.totalMarks})</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 font-semibold block mb-1.5">
              Shift Difficulty Index:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'easy', label: 'Easy Shift (-1 mark)' },
                { id: 'moderate', label: 'Moderate (+4 marks)' },
                { id: 'hard', label: 'Hard Shift (+12 marks)' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setShiftDifficulty(s.id); sounds.playClick(); }}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                    shiftDifficulty === s.id
                      ? 'bg-teal-600 text-white border-teal-600 shadow'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Forecast Result Card */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 text-white space-y-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-teal-400 font-bold">
                FORECAST SUMMARY
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${zoneColor}`}>
                {zoneLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-medium block">Projected Normalized:</span>
                <span className="text-2xl font-extrabold text-teal-400 font-mono">
                  {normalizedScore}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">
                  ({normBonus >= 0 ? `+${normBonus}` : normBonus} shift adjustment)
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-medium block">{category} Expected Cutoff:</span>
                <span className="text-2xl font-extrabold text-amber-400 font-mono">
                  {targetCutoff}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                  Net Margin: {diff >= 0 ? `+${diff}` : diff}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
            <strong className="text-slate-200 block">💡 Diagnostic Recommendation:</strong>
            <p className="text-slate-400 leading-relaxed">
              {diff >= 10
                ? `You have a comfortable +${diff} mark buffer above the ${category} benchmark. Focus on Tier-2 advanced geometry and English comprehension.`
                : diff >= 0
                ? `You are clearing the expected cutoff by +${diff} marks. Push 3 more correct answers in Quantitative aptitude to enter the 95% Safe Zone.`
                : `You are currently ${Math.abs(diff)} marks below the ${category} cutoff threshold. Reducing negative marks in General Awareness will easily recover +${Math.abs(diff)} marks.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
