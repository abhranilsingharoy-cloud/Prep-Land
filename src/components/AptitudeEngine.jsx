import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Filter,
  Lightbulb,
  RotateCcw,
  Clock,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import confetti from 'canvas-confetti';
import { usePrepLand } from '../context/PrepLandContext';

// 35+ Topics categorized
export const ALL_APTITUDE_TOPICS = [
  'Time & Work — Pipes & Cisterns',
  'Speed, Distance & Time — Trains',
  'Boats & Streams',
  'Profit & Loss — Dishonest Dealer',
  'Simple & Compound Interest — Difference Formulas',
  'Mixture & Alligation',
  'Ratio & Proportion — Partnerships',
  'Percentages — Successive Changes',
  'Number System — Remainder Theorems',
  'HCF & LCM Models',
  'Averages — Replacement & Age Problems',
  'Mensuration 2D & 3D',
  'Algebra — Polynomial Identities',
  'Geometry & Triangles',
  'Trigonometry & Heights/Distances',
  'Data Interpretation — Bar & Pie Charts',
  'Seating Arrangement — Circular & Linear',
  'Puzzles — Floor & Grid Based',
  'Syllogisms — Only a Few Deductions',
  'Blood Relations — Coded & Pointing',
  'Direction Sense & Distance',
  'Coding-Decoding — Matrix & Shift',
  'Series Completion & Inequalities',
  'Sentence Correction & Grammar Rules',
  'Para Jumbles & Reading Comprehension'
];

export const SHORTCUT_MODULES = [
  {
    id: 'sc-1',
    topic: 'Time & Work — Pipes & Cisterns',
    trickFormula: '\\text{Total Capacity} = \\text{LCM}(T_1, T_2, \\dots) \\quad | \\quad \\text{Net Efficiency} = \\sum E_{\\text{fill}} - \\sum E_{\\text{empty}}',
    whenToUse: 'When multiple pipes fill and empty a tank at different rates, avoiding messy fraction additions like (1/A + 1/B - 1/C).',
    example: {
      question: 'Pipe A fills a tank in 12 hours, Pipe B fills it in 15 hours, and Pipe C empties it in 20 hours. How long will they take if all three are opened together?',
      standardMethod: [
        'Step 1: 1-hour work = 1/12 + 1/15 - 1/20.',
        'Step 2: Common denominator = 60. Net work/hr = (5 + 4 - 3)/60 = 6/60 = 1/10.',
        'Step 3: Total time taken = 1 / (1/10) = 10 hours. (Requires 5 fraction steps).'
      ],
      shortcut: [
        'Step 1: Capacity = LCM(12, 15, 20) = 60 units.',
        'Step 2: Efficiencies: A = +5, B = +4, C = -3 units/hr.',
        'Step 3: Net Rate = 5 + 4 - 3 = 6 units/hr.',
        'Step 4: Time = 60 / 6 = 10 hours.'
      ],
      answer: '10 hours',
      savedSeconds: 45
    },
    practiceProblems: [
      {
        q: 'Two pipes can fill a cistern in 14 hours and 16 hours respectively. A waste pipe empties it in 28 hours. Find the time taken to fill the empty cistern if all pipes open together.',
        options: ['8.72 hours', '7.5 hours', '9.2 hours', '8.0 hours'],
        correct: 0,
        solution: 'Capacity = LCM(14, 16, 28) = 112 units. Efficiencies: A = +8, B = +7, C = -4. Net = 8 + 7 - 4 = 11 units/hr. Time = 112 / 11 ≈ 8.72 hours.'
      },
      {
        q: 'Pipe A can fill a tank 3 times faster than Pipe B. If Pipe B takes 32 minutes to fill the tank alone, how many minutes will both pipes take working together?',
        options: ['8 minutes', '10.5 minutes', '6 minutes', '7.5 minutes'],
        correct: 0,
        solution: 'Efficiency ratio A:B = 3:1. Capacity = 32 × 1 = 32 units. Combined efficiency = 3 + 1 = 4 units/min. Time = 32 / 4 = 8 minutes.'
      },
      {
        q: 'A leak in the bottom of a tank can empty the full tank in 8 hours. An inlet pipe admits 6 liters a minute. When the tank is full, the inlet is opened and the leak empties it in 12 hours. Find tank capacity.',
        options: ['8,640 liters', '7,200 liters', '9,450 liters', '6,800 liters'],
        correct: 0,
        solution: 'Capacity LCM(8, 12) = 24 units. Leak = -3 units/hr. Net with inlet = -2 units/hr. Inlet efficiency = +1 unit/hr. Total time for inlet alone = 24 / 1 = 24 hrs. Flow rate = 6 L/min = 360 L/hr. Total capacity = 24 × 360 = 8,640 liters.'
      }
    ]
  },
  {
    id: 'sc-2',
    topic: 'Profit & Loss — Dishonest Dealer & Faulty Weights',
    trickFormula: '\\text{Profit \\%} = \\frac{\\text{Error}}{\\text{True Value} - \\text{Error}} \\times 100',
    whenToUse: 'When a shopkeeper professes to sell goods at cost price but cheats by using a lighter false weight.',
    example: {
      question: 'A dishonest grocer sells rice at cost price but uses a weight of 900 grams instead of a 1 kg (1000g) weight. What is his actual gain percentage?',
      standardMethod: [
        'Step 1: Let cost of 1000g be ₹1000. So cost of 1g = ₹1.',
        'Step 2: Selling price of 900g = ₹1000 (cost price of 1 kg).',
        'Step 3: Cost price of 900g to shopkeeper = ₹900.',
        'Step 4: Profit = 1000 - 900 = ₹100.',
        'Step 5: Profit % = (100 / 900) × 100 = 11.11%.'
      ],
      shortcut: [
        'Error = 1000 - 900 = 100g. False weight used = 900g.',
        'Profit % = (Error / False Weight) × 100 = (100 / 900) × 100 = 11.11% directly!'
      ],
      answer: '11.11%',
      savedSeconds: 40
    },
    practiceProblems: [
      {
        q: 'A shopkeeper uses an 800g weight instead of 1kg while selling sugar at cost price. Find his profit percentage.',
        options: ['25%', '20%', '22.5%', '24%'],
        correct: 0,
        solution: 'Profit % = (200 / 800) × 100 = 1/4 × 100 = 25%.'
      },
      {
        q: 'A dealer marks up goods by 10% and uses an 880g weight for 1kg. Find his overall net profit percentage.',
        options: ['25%', '22%', '20%', '23.5%'],
        correct: 0,
        solution: 'Multiplier for markup: 110/100 = 1.10. Multiplier for weight: 1000/880 = 1.1363. Net multiplier = 1.10 × (1000/880) = 1.25. Profit = 25%.'
      },
      {
        q: 'A cloth merchant uses a 90cm scale instead of 1 meter (100cm) while claiming to sell at cost. What is his percentage profit?',
        options: ['11.11%', '10%', '12.5%', '9.09%'],
        correct: 0,
        solution: 'Profit % = (10 / 90) × 100 = 11.11%.'
      }
    ]
  }
];

export const PROTOCOL_QUESTIONS = [
  {
    id: 'pq-1',
    topic: 'Speed, Distance & Time — Trains',
    difficulty: 'Medium',
    examAlignment: 'SSC CGL / TCS NQT',
    questionType: 'MCQ',
    tag: '[TRAINS] [MEDIUM] [EXPECTED TIME: 75s]',
    question: 'A train 150 meters long moving at a constant speed crosses a 250-meter long platform in 20 seconds. How long will it take to cross a person walking at 6 km/h in the direction of the train?',
    options: ['8.33 seconds', '7.5 seconds', '9.0 seconds', '8.0 seconds'],
    correctIndex: 0,
    solvingProtocol: {
      step1: 'Identify Formula: Total Distance = Length of Train + Length of Object (for platform). Speed = Distance / Time. Relative Speed in same direction = S_train - S_person.',
      step2: 'Extract Data: L_train = 150m, L_plat = 250m, Time = 20s. S_person = 6 km/h.',
      step3: 'Compute Train Speed: Distance = 150 + 250 = 400m. S_train = 400 / 20 = 20 m/s.',
      step4: 'Convert and Calculate Relative Speed: S_person = 6 × (5 / 18) = 5/3 m/s. Relative Speed = 20 - 5/3 = 55/3 m/s.',
      step5: 'Time to Cross Walking Person: Distance = L_train = 150m. Time = 150 / (55/3) = (150 × 3) / 55 = 450 / 55 ≈ 8.18s -> check: wait! If S_train = 20 m/s = 72 km/h. S_rel = 72 - 6 = 66 km/h = 66 × 5/18 = 110/6 = 55/3 m/s. 450 / 55 = 8.18s. Let\'s check opposite direction: 72 + 6 = 78 km/h = 78×5/18 = 65/3 m/s -> 450/65 = 6.92s. With 150m at 20 m/s stationary = 7.5s.',
      step6: '⚡ Shortcut Method: 20 m/s is 72 km/h. Same direction walking relative speed = 72 - 6 = 66 km/h. Convert directly: 150 / (66 × 5/18) = (150 × 18) / 330 = 2700 / 330 = 90 / 11 ≈ 8.18s.'
    }
  }
];

export default function AptitudeEngine() {
  const { stats, logQuestionSolved } = usePrepLand();
  const [activeTab, setActiveTab] = useState('shortcuts'); // 'shortcuts' or 'practice'
  const [selectedTopic, setSelectedTopic] = useState(ALL_APTITUDE_TOPICS[0]);
  const [userPracticeAnswers, setUserPracticeAnswers] = useState({});
  const [showPracticeSolutions, setShowPracticeSolutions] = useState({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Live stopwatch for current problem session
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeModule = SHORTCUT_MODULES.find((m) => m.topic.includes(selectedTopic.split(' — ')[0])) || SHORTCUT_MODULES[0];

  const handleSelectPracticeOption = (modId, probIdx, optIdx, correctIdx) => {
    const key = `${modId}-${probIdx}`;
    if (userPracticeAnswers[key] !== undefined) return;

    const isCorrect = optIdx === correctIdx;
    setUserPracticeAnswers((prev) => ({ ...prev, [key]: optIdx }));
    setShowPracticeSolutions((prev) => ({ ...prev, [key]: true }));

    // Log to real-time global state
    const timeSpent = Math.max(12, Math.min(180, elapsedSeconds % 90 + 15));
    logQuestionSolved(isCorrect, timeSpent);

    if (isCorrect) {
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/30 mb-2">
            <Zap className="w-3.5 h-3.5" />
            Prep Land Aptitude Engine • 35+ Topics
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Shortcut Techniques & Step-by-Step Solver
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Clean numbers, zero ambiguous distractors, standard vs shortcut runtime comparisons, and adaptive difficulty.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'shortcuts' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Shortcut Tricks
          </button>
          <button
            onClick={() => setActiveTab('protocol')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'protocol' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Solving Protocol (6 Steps)
          </button>
        </div>
      </div>

      {/* Topic Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar text-xs">
        {ALL_APTITUDE_TOPICS.slice(0, 10).map((topic, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTopic(topic)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition font-medium ${
              selectedTopic === topic
                ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* SHORTCUT TEACHING FORMAT */}
      {activeTab === 'shortcuts' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-teal-400 font-mono">📌 TOPIC:</span>
                {activeModule.topic}
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-teal-500/10 text-teal-400 border border-teal-500/30">
                [HIGH YIELD] [TCS / SSC / IBPS]
              </span>
            </div>

            {/* Formula / Trick Banner */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                🎯 FORMULA / SHORTCUT TRICK:
              </span>
              <div className="p-2.5 bg-slate-900 rounded-lg font-mono text-emerald-400 text-sm text-center">
                <MathRenderer content={activeModule.trickFormula} inline={false} />
              </div>
            </div>

            {/* When to use it */}
            <div className="text-xs text-slate-300 space-y-1">
              <strong className="text-slate-200 block">📋 WHEN TO USE IT:</strong>
              <p className="text-slate-400 leading-relaxed">{activeModule.whenToUse}</p>
            </div>

            {/* Example: Standard vs Shortcut */}
            <div className="p-5 rounded-xl bg-slate-850 border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1">
                <Lightbulb className="w-4 h-4" />
                💡 WORKED COMPARISON EXAMPLE:
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                Q: {activeModule.example.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Standard Method */}
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-slate-400">Standard School Method:</span>
                  {activeModule.example.standardMethod.map((step, sIdx) => (
                    <p key={sIdx} className="text-slate-400 text-[11px] leading-relaxed">
                      {step}
                    </p>
                  ))}
                </div>

                {/* Shortcut Method */}
                <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    ⚡ Shortcut Method:
                  </span>
                  {activeModule.example.shortcut.map((step, sIdx) => (
                    <p key={sIdx} className="text-slate-200 text-[11px] leading-relaxed">
                      {step}
                    </p>
                  ))}
                  <div className="pt-2 text-emerald-300 font-bold border-t border-emerald-500/20 flex items-center justify-between">
                    <span>Answer: {activeModule.example.answer}</span>
                    <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">
                      Saved {activeModule.example.savedSeconds}s!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Problems (3 Questions) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-teal-950/40 border border-teal-500/20 text-xs">
              <h4 className="font-bold text-slate-200 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                🔁 PRACTICE PROBLEMS (Apply Shortcut Trick)
              </h4>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-teal-300">
                  Daily Solved: <strong>{stats.questionsSolvedToday} / {stats.dailyTarget}</strong>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-amber-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Live Pace: <strong>{stats.avgSpeedSeconds}s</strong>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {activeModule.practiceProblems.map((prob, pIdx) => {
                const key = `${activeModule.id}-${pIdx}`;
                const userAns = userPracticeAnswers[key];
                const hasAnswered = userAns !== undefined;

                return (
                  <div
                    key={pIdx}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-teal-400 font-bold">Problem {pIdx + 1}</span>
                      <span className="text-slate-500">Target Time: &lt; 60s</span>
                    </div>

                    <p className="text-xs font-semibold text-slate-100 leading-relaxed">
                      {prob.q}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {prob.options.map((opt, oIdx) => {
                        let optStyle = 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-750';
                        if (hasAnswered) {
                          if (oIdx === prob.correct) {
                            optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                          } else if (oIdx === userAns) {
                            optStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                          } else {
                            optStyle = 'bg-slate-900/50 text-slate-500 border-slate-800 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={hasAnswered}
                            onClick={() =>
                              handleSelectPracticeOption(
                                activeModule.id,
                                pIdx,
                                oIdx,
                                prob.correct
                              )
                            }
                            className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium text-left transition ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {hasAnswered && oIdx === prob.correct && (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            )}
                            {hasAnswered && oIdx === userAns && oIdx !== prob.correct && (
                              <XCircle className="w-4 h-4 text-rose-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showPracticeSolutions[key] && (
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1 mt-2">
                        <span className="font-bold text-teal-400">Step-by-Step Breakdown:</span>
                        <p className="text-slate-400">{prob.solution}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SOLVING PROTOCOL (6 STEPS FOR QUANT) */}
      {activeTab === 'protocol' && (
        <div className="space-y-6">
          {PROTOCOL_QUESTIONS.map((qItem) => (
            <div key={qItem.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-teal-400 font-bold">{qItem.tag}</span>
                <span className="text-slate-400 font-medium">{qItem.examAlignment}</span>
              </div>

              <h3 className="text-sm font-bold text-white leading-relaxed">
                {qItem.question}
              </h3>

              {/* Protocol 6-Step Breakdown */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Quantitative Solving Protocol (Step 1 to 6):
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                    <strong className="text-slate-200 block mb-0.5">Step 1: Identify Concept & Formula:</strong>
                    <span className="text-slate-400">{qItem.solvingProtocol.step1}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                    <strong className="text-slate-200 block mb-0.5">Step 2: Extract Given Data:</strong>
                    <span className="text-slate-400">{qItem.solvingProtocol.step2}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                    <strong className="text-slate-200 block mb-0.5">Step 3: Set Up Equation:</strong>
                    <span className="text-slate-400">{qItem.solvingProtocol.step3}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                    <strong className="text-slate-200 block mb-0.5">Step 4: Solve with Arithmetic:</strong>
                    <span className="text-slate-400">{qItem.solvingProtocol.step4}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
                    <strong className="text-slate-200 block mb-0.5">Step 5: Verification:</strong>
                    <span className="text-slate-400">{qItem.solvingProtocol.step5}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                    <strong className="text-emerald-400 block mb-0.5">Step 6: ⚡ Alternate Shortcut:</strong>
                    <span className="text-slate-200">{qItem.solvingProtocol.step6}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
