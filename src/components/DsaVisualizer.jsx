import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  Sparkles,
  Info,
  Code2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function DsaVisualizer() {
  const [activeAlgo, setActiveAlgo] = useState('two-pointers'); // 'two-pointers', 'kadane', 'binary-search'

  // Two Pointers State
  const twoPointerArray = [1, 2, 4, 7, 11, 15];
  const targetSum = 15;
  const [leftPtr, setLeftPtr] = useState(0);
  const [rightPtr, setRightPtr] = useState(twoPointerArray.length - 1);
  const [twoPointerSteps, setTwoPointerSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [foundPair, setFoundPair] = useState(null);

  // Kadane's State
  const kadaneArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  const [kadaneIdx, setKadaneIdx] = useState(0);
  const [currentSum, setCurrentSum] = useState(-2);
  const [maxSum, setMaxSum] = useState(-2);
  const [kadaneHistory, setKadaneHistory] = useState([]);

  // Generate Two Pointers Steps
  useEffect(() => {
    const steps = [];
    let l = 0;
    let r = twoPointerArray.length - 1;
    while (l < r) {
      const sum = twoPointerArray[l] + twoPointerArray[r];
      if (sum === targetSum) {
        steps.push({
          l,
          r,
          sum,
          action: `Target match found! arr[${l}] (${twoPointerArray[l]}) + arr[${r}] (${twoPointerArray[r]}) = ${targetSum}.`,
          match: true
        });
        break;
      } else if (sum < targetSum) {
        steps.push({
          l,
          r,
          sum,
          action: `Sum (${sum}) < target (${targetSum}). Increment left pointer L: ${l} -> ${l + 1}.`,
          match: false
        });
        l++;
      } else {
        steps.push({
          l,
          r,
          sum,
          action: `Sum (${sum}) > target (${targetSum}). Decrement right pointer R: ${r} -> ${r - 1}.`,
          match: false
        });
        r--;
      }
    }
    setTwoPointerSteps(steps);
    setCurrentStepIdx(0);
    setLeftPtr(0);
    setRightPtr(twoPointerArray.length - 1);
    setFoundPair(null);
  }, []);

  // Kadane Step Simulation
  useEffect(() => {
    const steps = [];
    let cur = kadaneArray[0];
    let max = kadaneArray[0];
    steps.push({ idx: 0, cur, max, note: `Initialize: cur_sum = ${cur}, max_so_far = ${max}` });

    for (let i = 1; i < kadaneArray.length; i++) {
      const val = kadaneArray[i];
      cur = Math.max(val, cur + val);
      max = Math.max(max, cur);
      steps.push({
        idx: i,
        cur,
        max,
        note: `At index ${i} (${val}): cur_sum = max(${val}, ${cur - val} + ${val}) = ${cur}; max_so_far = ${max}`
      });
    }
    setKadaneHistory(steps);
  }, []);

  // Auto-play interval for Two Pointers
  useEffect(() => {
    let interval = null;
    if (isPlaying && currentStepIdx < twoPointerSteps.length) {
      interval = setInterval(() => {
        handleStepForward();
      }, 1400);
    } else if (currentStepIdx >= twoPointerSteps.length) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStepIdx, twoPointerSteps]);

  const handleStepForward = () => {
    if (currentStepIdx + 1 < twoPointerSteps.length) {
      const nextStep = twoPointerSteps[currentStepIdx + 1];
      setCurrentStepIdx((idx) => idx + 1);
      setLeftPtr(nextStep.l);
      setRightPtr(nextStep.r);
      sounds.playClick();
      if (nextStep.match) {
        setFoundPair([nextStep.l, nextStep.r]);
        sounds.playCorrect();
        try { confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
      }
    } else {
      setIsPlaying(false);
    }
  };

  const handleResetTwoPointer = () => {
    setCurrentStepIdx(0);
    setLeftPtr(twoPointerSteps[0]?.l || 0);
    setRightPtr(twoPointerSteps[0]?.r || twoPointerArray.length - 1);
    setFoundPair(null);
    setIsPlaying(false);
    sounds.playClick();
  };

  const currentStep = twoPointerSteps[currentStepIdx];

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
      {/* Title & Algorithm Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Interactive Step Visualizer
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            DSA Algorithm Execution Simulator
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => { setActiveAlgo('two-pointers'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeAlgo === 'two-pointers'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Two Pointers (Target Sum)
          </button>
          <button
            onClick={() => { setActiveAlgo('kadane'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeAlgo === 'kadane'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Kadane's (Max Subarray)
          </button>
        </div>
      </div>

      {/* TWO POINTERS VISUALIZER */}
      {activeAlgo === 'two-pointers' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-slate-700">
                Sorted Array: <strong className="font-mono text-slate-900">[1, 2, 4, 7, 11, 15]</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span className="font-semibold text-indigo-800">
                Target Sum: <strong className="font-mono text-indigo-600">{targetSum}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500">
                Time: <strong className="text-emerald-700">O(N)</strong> • Space: <strong className="text-emerald-700">O(1)</strong>
              </span>
            </div>
          </div>

          {/* Array Visual Elements with Animated Pointer Arrows */}
          <div className="py-6 flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto">
            {twoPointerArray.map((val, idx) => {
              const isLeft = leftPtr === idx;
              const isRight = rightPtr === idx;
              const isMatched = foundPair && (foundPair[0] === idx || foundPair[1] === idx);

              let boxStyle = 'bg-white border-slate-200 text-slate-800 shadow-sm';
              if (isMatched) {
                boxStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/30 scale-105';
              } else if (isLeft && isRight) {
                boxStyle = 'bg-purple-600 text-white border-purple-700 shadow-md';
              } else if (isLeft) {
                boxStyle = 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-4 ring-indigo-100';
              } else if (isRight) {
                boxStyle = 'bg-rose-500 text-white border-rose-600 shadow-md ring-4 ring-rose-100';
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  {/* Pointer tag above */}
                  <div className="h-6 flex items-center justify-center">
                    {isLeft && (
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px] animate-bounce">
                        L (L={idx})
                      </span>
                    )}
                    {isRight && !isLeft && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-bold text-[10px] animate-bounce">
                        R (R={idx})
                      </span>
                    )}
                  </div>

                  {/* Array Box */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-extrabold text-lg transition-all duration-300 ${boxStyle}`}>
                    <span>{val}</span>
                    <span className="text-[9px] opacity-70">idx {idx}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Explanation Banner */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-teal-400 font-bold">
                Step {currentStepIdx + 1} of {twoPointerSteps.length}
              </span>
              <span className="font-mono text-slate-400">
                Current Sum: {currentStep ? `${twoPointerArray[currentStep.l]} + ${twoPointerArray[currentStep.r]} = ${currentStep.sum}` : ''}
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {currentStep?.action}
            </p>
          </div>

          {/* Simulation Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
              </button>

              <button
                onClick={handleStepForward}
                disabled={currentStepIdx + 1 >= twoPointerSteps.length}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 shadow-sm disabled:opacity-40 transition"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Next Step</span>
              </button>

              <button
                onClick={handleResetTwoPointer}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-sm transition"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {foundPair && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pair Found: ({twoPointerArray[foundPair[0]]}, {twoPointerArray[foundPair[1]]})</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* KADANE'S ALGORITHM VISUALIZER */}
      {activeAlgo === 'kadane' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs flex items-center justify-between">
            <span className="font-semibold text-teal-900">
              Array: <strong className="font-mono text-slate-800">[-2, 1, -3, 4, -1, 2, 1, -5, 4]</strong>
            </span>
            <span className="font-mono text-slate-500">
              Optimal Subarray: <strong className="text-teal-700">[4, -1, 2, 1] = 6</strong>
            </span>
          </div>

          {/* Kadane Visual Array */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-4">
            {kadaneArray.map((num, i) => {
              const inOptimal = i >= 3 && i <= 6;
              return (
                <div
                  key={i}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm transition-all ${
                    inOptimal
                      ? 'bg-teal-500 text-white border-teal-600 shadow-md scale-105'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span>{num}</span>
                  <span className="text-[9px] opacity-70">i={i}</span>
                </div>
              );
            })}
          </div>

          {/* Kadane Steps Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="p-3">Index / Value</th>
                  <th className="p-3">Calculation</th>
                  <th className="p-3 font-mono">Current Sum</th>
                  <th className="p-3 font-mono">Max Sum So Far</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {kadaneHistory.map((step, idx) => (
                  <tr key={idx} className={idx === 6 ? 'bg-teal-50 font-bold' : 'hover:bg-slate-50/60'}>
                    <td className="p-3">
                      i={step.idx} ({kadaneArray[step.idx]})
                    </td>
                    <td className="p-3 font-sans text-slate-600">{step.note}</td>
                    <td className="p-3 text-indigo-600">{step.cur}</td>
                    <td className="p-3 text-emerald-600">{step.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
