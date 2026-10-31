import React, { useState } from 'react';
import { Calculator, Zap, ArrowRight, RotateCcw, CheckCircle, Sparkles } from 'lucide-react';
import MathRenderer from './MathRenderer';

// GCD and LCM helpers
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
const lcmThree = (a, b, c) => lcm(lcm(a, b), c);

export default function InteractiveSolver() {
  const [activeTool, setActiveTool] = useState('time-work'); // 'time-work', 'ci-si', 'trains', 'dishonest'

  // Tool 1: Time & Work state
  const [twA, setTwA] = useState(12);
  const [twB, setTwB] = useState(15);
  const [twC, setTwC] = useState(20);
  const [isCEmptying, setIsCEmptying] = useState(true);

  // Tool 2: CI - SI Difference state
  const [ciP, setCiP] = useState(15000);
  const [ciR, setCiR] = useState(8);

  // Tool 3: Train speed state
  const [t1Len, setT1Len] = useState(180);
  const [t2Len, setT2Len] = useState(120);
  const [t1Speed, setT1Speed] = useState(72); // km/h
  const [t2Speed, setT2Speed] = useState(54); // km/h
  const [tDir, setTDir] = useState('opposite'); // 'opposite' or 'same'

  // Tool 4: Dishonest Dealer state
  const [trueWeight, setTrueWeight] = useState(1000);
  const [falseWeight, setFalseWeight] = useState(900);
  const [markupPercent, setMarkupPercent] = useState(0);

  // Calculations:
  // 1. Time & Work calculations
  const totalCapacity = lcmThree(Number(twA) || 1, Number(twB) || 1, Number(twC) || 1);
  const effA = totalCapacity / (Number(twA) || 1);
  const effB = totalCapacity / (Number(twB) || 1);
  const effC = (totalCapacity / (Number(twC) || 1)) * (isCEmptying ? -1 : 1);
  const netEff = effA + effB + effC;
  const netDays = netEff > 0 ? (totalCapacity / netEff).toFixed(2) : 'Never (Leak > Inflow)';

  // 2. CI-SI Difference calculations
  const rDecimal = (Number(ciR) || 0) / 100;
  const d2 = (Number(ciP) || 0) * Math.pow(rDecimal, 2);
  const d3 = (Number(ciP) || 0) * Math.pow(rDecimal, 2) * ((300 + Number(ciR)) / 100);
  const si2 = (Number(ciP) || 0) * rDecimal * 2;
  const ci2 = (Number(ciP) || 0) * (Math.pow(1 + rDecimal, 2) - 1);

  // 3. Train Calculations
  const totalDist = Number(t1Len) + Number(t2Len);
  const relSpeedKmh = tDir === 'opposite' ? Number(t1Speed) + Number(t2Speed) : Math.abs(Number(t1Speed) - Number(t2Speed));
  const relSpeedMs = relSpeedKmh * (5 / 18);
  const crossingSecs = relSpeedMs > 0 ? (totalDist / relSpeedMs).toFixed(2) : 'Never (Speeds Equal)';

  // 4. Dishonest Dealer Calculations
  const errorGrams = Number(trueWeight) - Number(falseWeight);
  const baseProfitPct = Number(falseWeight) > 0 ? (errorGrams / Number(falseWeight)) * 100 : 0;
  const markupMultiplier = 1 + (Number(markupPercent) || 0) / 100;
  const weightMultiplier = Number(trueWeight) / (Number(falseWeight) || 1);
  const totalMultiplier = markupMultiplier * weightMultiplier;
  const netProfitPct = ((totalMultiplier - 1) * 100).toFixed(2);

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/30 mb-2">
            <Zap className="w-3.5 h-3.5" />
            Live Mathematical Engine • Real-Time Solutions
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal-400" />
            Interactive Formula & Shortcut Solver
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test custom exam parameters and see instant step-by-step LCM breakdowns, difference identities, and relative speeds.
          </p>
        </div>

        {/* Solver Tools Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTool('time-work')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'time-work' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Time & Work LCM
          </button>
          <button
            onClick={() => setActiveTool('ci-si')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'ci-si' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            CI–SI 2/3 Yr Diff
          </button>
          <button
            onClick={() => setActiveTool('trains')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'trains' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Train Crossing
          </button>
          <button
            onClick={() => setActiveTool('dishonest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'dishonest' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Faulty Weights
          </button>
        </div>
      </div>

      {/* TOOL 1: TIME & WORK SOLVER */}
      {activeTool === 'time-work' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Input Custom Parameters</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Pipe A (Time):</label>
                <input
                  type="number"
                  value={twA}
                  onChange={(e) => setTwA(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Pipe B (Time):</label>
                <input
                  type="number"
                  value={twB}
                  onChange={(e) => setTwB(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Pipe C (Time):</label>
                <input
                  type="number"
                  value={twC}
                  onChange={(e) => setTwC(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-300">Pipe C Nature:</span>
              <button
                onClick={() => setIsCEmptying(false)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  !isCEmptying ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Inlet (+Filling)
              </button>
              <button
                onClick={() => setIsCEmptying(true)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  isCEmptying ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Outlet (-Emptying)
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wide">
              ⚡ Step-by-Step LCM Solution:
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2 text-slate-300">
              <p>1. Total Capacity = LCM({twA}, {twB}, {twC}) = <strong className="text-emerald-400">{totalCapacity} units</strong></p>
              <p>2. Efficiency A: +{totalCapacity} / {twA} = <strong className="text-slate-100">+{effA} units/hr</strong></p>
              <p>3. Efficiency B: +{totalCapacity} / {twB} = <strong className="text-slate-100">+{effB} units/hr</strong></p>
              <p>4. Efficiency C: {isCEmptying ? '-' : '+'}{totalCapacity} / {twC} = <strong className={isCEmptying ? 'text-rose-400' : 'text-slate-100'}>{effC} units/hr</strong></p>
              <p>5. Net Daily Rate: {effA} + {effB} {isCEmptying ? '-' : '+'} {Math.abs(effC)} = <strong className="text-teal-300">{netEff} units/hr</strong></p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
              <span className="font-bold text-slate-200">Total Completion Time:</span>
              <span className="text-lg font-black text-emerald-400">{netDays} Hours</span>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: CI-SI DIFFERENCE CALCULATOR */}
      {activeTool === 'ci-si' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Enter Loan / Investment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Principal Sum (P in ₹):</label>
                <input
                  type="number"
                  value={ciP}
                  onChange={(e) => setCiP(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Interest Rate (R in %):</label>
                <input
                  type="number"
                  value={ciR}
                  onChange={(e) => setCiR(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide">
              ⚡ Calculated Gap Identities:
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-slate-400">2-Year Gap Identity:</p>
                  <p className="text-slate-200 text-[11px] font-sans">Formula: $$D_2 = P(R/100)^2$$</p>
                </div>
                <span className="text-base font-extrabold text-emerald-400">₹{d2.toFixed(2)}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-slate-400">3-Year Gap Identity:</p>
                  <p className="text-slate-200 text-[11px] font-sans">Formula: $$D_3 = D_2 \times (300 + R)/100$$</p>
                </div>
                <span className="text-base font-extrabold text-teal-400">₹{d3.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: TRAINS CROSSING TIME */}
      {activeTool === 'trains' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Input Train & Platform Parameters</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Train 1 Length (m):</label>
                <input
                  type="number"
                  value={t1Len}
                  onChange={(e) => setT1Len(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 font-mono text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Train 2 / Object Length (m):</label>
                <input
                  type="number"
                  value={t2Len}
                  onChange={(e) => setT2Len(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 font-mono text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Train 1 Speed (km/h):</label>
                <input
                  type="number"
                  value={t1Speed}
                  onChange={(e) => setT1Speed(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 font-mono text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Train 2 Speed (km/h):</label>
                <input
                  type="number"
                  value={t2Speed}
                  onChange={(e) => setT2Speed(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 font-mono text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-300">Relative Direction:</span>
              <button
                onClick={() => setTDir('opposite')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  tDir === 'opposite' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Opposite Directions (S1 + S2)
              </button>
              <button
                onClick={() => setTDir('same')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  tDir === 'same' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Same Direction (|S1 - S2|)
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wide">
              ⚡ Relative Speed Solution:
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300">
              <p>• Total Distance to Cover = {t1Len} + {t2Len} = <strong className="text-white">{totalDist} meters</strong></p>
              <p>• Relative Speed = <strong className="text-white">{relSpeedKmh} km/h</strong></p>
              <p>• Speed in m/s = {relSpeedKmh} × (5/18) = <strong className="text-emerald-400">{relSpeedMs.toFixed(2)} m/s</strong></p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
              <span className="font-bold text-slate-200">Exact Crossing Time:</span>
              <span className="text-lg font-black text-indigo-300">{crossingSecs} Seconds</span>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 4: DISHONEST DEALER */}
      {activeTool === 'dishonest' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Weight & Markup Parameters</h3>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">True Weight (g):</label>
                <input
                  type="number"
                  value={trueWeight}
                  onChange={(e) => setTrueWeight(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 font-mono text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">False Weight (g):</label>
                <input
                  type="number"
                  value={falseWeight}
                  onChange={(e) => setFalseWeight(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 font-mono text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Markup (%):</label>
                <input
                  type="number"
                  value={markupPercent}
                  onChange={(e) => setMarkupPercent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 font-mono text-white"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
              ⚡ Net Cheating Profit:
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300">
              <p>• Weight Error = {trueWeight} - {falseWeight} = <strong className="text-white">{errorGrams} grams</strong></p>
              <p>• Weight multiplier = {trueWeight} / {falseWeight} = <strong className="text-slate-100">{weightMultiplier.toFixed(3)}</strong></p>
              <p>• Markup multiplier = (100 + {markupPercent}) / 100 = <strong className="text-slate-100">{markupMultiplier.toFixed(3)}</strong></p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
              <span className="font-bold text-slate-200">Net Profit Percentage:</span>
              <span className="text-xl font-black text-emerald-400">{netProfitPct}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
