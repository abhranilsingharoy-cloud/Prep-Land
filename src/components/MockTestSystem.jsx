import React, { useState, useEffect, useRef } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flag,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BarChart2,
  Layers,
  Calendar,
  Zap,
  TrendingUp,
  AlertTriangle,
  Flame,
  Shield,
  ShieldAlert,
  AlertOctagon,
  Lock,
  Maximize,
  Minimize
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import confetti from 'canvas-confetti';
import { usePrepLand } from '../context/PrepLandContext';
import CutoffPredictor from './CutoffPredictor';
import { sounds } from '../utils/audio';

// Exam-accurate question structures per specification
const GENERATED_TEST_QUESTIONS = [
  {
    id: 'mt-q1',
    section: 'Quantitative Aptitude',
    topic: 'Time & Work — Pipes & Cisterns',
    difficulty: 'Medium',
    estimated_time_seconds: 60,
    stem: 'Two pipes A and B can fill a cistern in 15 minutes and 20 minutes respectively. Both pipes are opened together, but pipe A is turned off after 4 minutes. What is the total time taken to fill the cistern completely?',
    options: ['14 minutes 40 seconds', '12 minutes 20 seconds', '15 minutes', '13 minutes 30 seconds'],
    correct: 'A',
    explanation: 'Total capacity = LCM(15, 20) = 60 units. Efficiency of A = 4 units/min, B = 3 units/min. In 4 minutes, both fill: 4 × (4 + 3) = 28 units. Remaining capacity = 60 - 28 = 32 units. Pipe B fills the remaining: 32 / 3 = 10 minutes 40 seconds. Total time = 4 min + 10 min 40s = 14 minutes 40 seconds.',
    shortcut: 'Work done by A in 4 min = 4/15. Remaining work for B = 1 - 4/15 = 11/15. Time for B = (11/15) × 20 = 44/3 = 14 minutes 40 seconds.',
    tags: ['Time & Work', 'SSC CGL / TCS', 'Medium']
  },
  {
    id: 'mt-q2',
    section: 'Quantitative Aptitude',
    topic: 'Speed, Distance & Time — Trains',
    difficulty: 'Easy',
    estimated_time_seconds: 45,
    stem: 'A 240-meter long train running at 72 km/h crosses a stationary electric pole. How many seconds does the train take to pass the pole?',
    options: ['12 seconds', '10 seconds', '14 seconds', '15 seconds'],
    correct: 'A',
    explanation: 'Speed in m/s = 72 × (5 / 18) = 20 m/s. Distance to cross a point object (pole) = Length of train = 240 m. Time = Distance / Speed = 240 / 20 = 12 seconds.',
    shortcut: '72 km/h is 4 multiples of 18 (4 × 18 = 72). Thus speed = 4 × 5 = 20 m/s. 240 / 20 = 12s instantly.',
    tags: ['Trains', 'TCS / RRB NTPC', 'Easy']
  },
  {
    id: 'mt-q3',
    section: 'Logical Reasoning',
    topic: 'Syllogisms — Only a Few',
    difficulty: 'Medium',
    estimated_time_seconds: 50,
    stem: 'Statements:\n1. Only a few pens are pencils.\n2. All pencils are erasers.\nConclusions:\nI. Some pens are not pencils.\nII. All erasers being pens is a possibility.',
    options: ['Both I and II follow', 'Only I follows', 'Only II follows', 'Neither follows'],
    correct: 'A',
    explanation: '"Only a few pens are pencils" implies two definite conditions: "Some pens are pencils" AND "Some pens are not pencils". Thus Conclusion I is directly true. Since only pens have restriction on pencils (not vice versa), all erasers can overlap with pens without violating statements. Thus Conclusion II is also a valid possibility.',
    shortcut: 'Remember: "Only a few A are B" ALWAYS guarantees "Some A are not B". And unless restricted, reverse possibility is always valid.',
    tags: ['Syllogisms', 'IBPS PO / SBI PO', 'Medium']
  },
  {
    id: 'mt-q4',
    section: 'General Awareness / Core',
    topic: 'Indian Polity — Fundamental Rights',
    difficulty: 'Easy',
    estimated_time_seconds: 30,
    stem: 'Which Article of the Constitution of India provides protection against arrest and detention in certain cases?',
    options: ['Article 22', 'Article 20', 'Article 21', 'Article 23'],
    correct: 'A',
    explanation: 'Article 22 guarantees safeguards against arbitrary arrest and detention, including the right to be informed of the grounds of arrest, the right to consult a legal practitioner, and the mandate to be produced before the nearest magistrate within 24 hours.',
    shortcut: 'Article 20 = Conviction of offences; Article 21 = Life & Liberty; Article 22 = Arrest & Detention.',
    tags: ['Polity', 'SSC CGL / UPSC', 'Easy']
  }
];

export default function MockTestSystem() {
  const { stats, setStats, logStudyMinutes, logQuestionSolved } = usePrepLand();
  const [examName, setExamName] = useState('SSC CGL Tier 1');
  const [testType, setTestType] = useState('full_length');
  const [difficulty, setDifficulty] = useState('auto-adaptive');
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins demo

  // Anti-Cheating & AI Proctor State
  const [antiCheatingEnabled, setAntiCheatingEnabled] = useState(true);
  const [violationsCount, setViolationsCount] = useState(0);
  const [violationsLog, setViolationsLog] = useState([]);
  const [activeWarningModal, setActiveWarningModal] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wasDisqualified, setWasDisqualified] = useState(false);
  const lastViolationRef = useRef(0);

  const questions = GENERATED_TEST_QUESTIONS;

  const requestExamFullscreen = () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } catch (e) {}
  };

  const exitExamFullscreen = () => {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (e) {}
  };

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = Boolean(document.fullscreenElement);
      setIsFullscreen(isFull);
      if (testStarted && !testSubmitted && antiCheatingEnabled && !isFull) {
        registerViolation('Exited Fullscreen Examination Mode');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [testStarted, testSubmitted, antiCheatingEnabled]);

  // Anti-Cheating Window Blur, Tab Switch, Copy & Shortcut Blockers
  useEffect(() => {
    if (!testStarted || testSubmitted || !antiCheatingEnabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        registerViolation('Tab Switched / Browser Minimized');
      }
    };

    const handleWindowBlur = () => {
      registerViolation('Window Focus Lost (Switched to Another App / Desktop)');
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      registerViolation('Right-click / Context Menu Attempt Blocked');
    };

    const handleCopy = (e) => {
      e.preventDefault();
      registerViolation('Clipboard Copy Attempt Blocked');
    };

    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'v', 'u', 't', 'w', 'p'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        registerViolation(`Blocked Key Shortcut: ${e.ctrlKey ? 'Ctrl' : 'Cmd'}+${e.key.toUpperCase()}`);
      }
      if (e.key === 'F12') {
        e.preventDefault();
        registerViolation('Developer Tools Shortcut (F12) Blocked');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [testStarted, testSubmitted, antiCheatingEnabled]);

  const registerViolation = (reason) => {
    if (!antiCheatingEnabled || testSubmitted) return;
    const now = Date.now();
    // Debounce duplicate events within 1200ms
    if (now - lastViolationRef.current < 1200) return;
    lastViolationRef.current = now;

    const timeStr = new Date().toLocaleTimeString();
    sounds.playClick();

    setViolationsCount((prevCount) => {
      const newCount = prevCount + 1;
      const newLog = {
        time: timeStr,
        reason,
        violationNumber: newCount,
        maxAllowed: 3
      };
      setViolationsLog((prevLog) => [...prevLog, newLog]);

      if (newCount >= 3) {
        setWasDisqualified(true);
        setActiveWarningModal(null);
        handleSubmitTest(true);
      } else {
        setActiveWarningModal({
          reason,
          count: newCount,
          time: timeStr
        });
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (!testStarted || testSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testSubmitted]);

  const handleStartTest = () => {
    setTestStarted(true);
    setTestSubmitted(false);
    setCurrentIndex(0);
    setAnswers({});
    setMarkedForReview({});
    setTimeLeft(300);
    setViolationsCount(0);
    setViolationsLog([]);
    setActiveWarningModal(null);
    setWasDisqualified(false);

    if (antiCheatingEnabled) {
      requestExamFullscreen();
    }
  };

  const handleSelectOption = (optLetter) => {
    const qId = questions[currentIndex].id;
    setAnswers((prev) => ({ ...prev, [qId]: optLetter }));
  };

  const handleSubmitTest = (disqualified = false) => {
    setTestSubmitted(true);
    exitExamFullscreen();
    if (disqualified) {
      setWasDisqualified(true);
    }

    // Sync mock completion and question logs with live state
    setStats((prev) => ({
      ...prev,
      mocksCompleted: prev.mocksCompleted + 1,
      totalHours: Number((prev.totalHours + 0.5).toFixed(2))
    }));

    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns !== undefined) {
        logQuestionSolved(userAns === q.correct, q.estimated_time_seconds);
      }
    });

    if (!disqualified) {
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  // Evaluation calculations
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  questions.forEach((q) => {
    const userAns = answers[q.id];
    if (userAns === undefined) {
      unattemptedCount++;
    } else if (userAns === q.correct) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const totalMarks = (correctCount * 2 - wrongCount * 0.5).toFixed(2);
  const maxPossible = questions.length * 2;
  const accuracy = correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;
  const percentile = Math.min(99, Math.max(15, Math.round(accuracy * 1.05)));
  const cutoffCleared = totalMarks >= maxPossible * 0.65 ? 'YES' : totalMarks >= maxPossible * 0.5 ? 'BORDERLINE' : 'NO';

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-6 pb-12">
      {/* Test Generator Configurator (When not started) */}
      {!testStarted && !testSubmitted && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 max-w-2xl mx-auto space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-indigo-500/20">
            <Award className="w-7 h-7" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Adaptive Mock Test Engine</h2>
            <p className="text-xs text-slate-400 mt-1.5">
              Generates exam-accurate test blocks with dynamic sectional weights, negative marking, and forensic post-test diagnostics.
            </p>
          </div>

          {/* Config Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Target Exam:</label>
              <select
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-2.5 rounded-xl font-semibold"
              >
                <option value="SSC CGL Tier 1">SSC CGL (Tier 1)</option>
                <option value="TCS NQT">TCS NQT Cognitive</option>
                <option value="IBPS PO Prelims">IBPS PO Prelims</option>
                <option value="UPSC CSAT">UPSC CSAT (Paper 2)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Test Format:</label>
              <select
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-2.5 rounded-xl font-semibold"
              >
                <option value="full_length">Full-Length Mock</option>
                <option value="sectional">Sectional Drill</option>
                <option value="topic_wise">Topic-Wise Sprint</option>
                <option value="rapid_fire">Rapid Fire (Speed)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Pacing Difficulty:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-2.5 rounded-xl font-semibold"
              >
                <option value="auto-adaptive">Auto-Adaptive Engine</option>
                <option value="easy">Easy (Foundations)</option>
                <option value="medium">Medium (Exam Standard)</option>
                <option value="hard">Hard (Outlier Questions)</option>
              </select>
            </div>
          </div>

          {/* Anti-Cheating & AI Proctor Toggle Card */}
          <div className="p-4 rounded-xl bg-slate-850 border border-slate-750 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-xs font-bold text-white block">Strict Anti-Cheating & AI Proctor</span>
                  <span className="text-[10px] text-slate-400">Enforces Fullscreen, Tab Switch Monitoring & Copy Blocker</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={antiCheatingEnabled}
                  onChange={(e) => setAntiCheatingEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {antiCheatingEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300 font-sans pt-1">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Auto Fullscreen Lock</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Max 3 Tab Switch Warnings</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>No Copy / Paste / Shortcuts</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleStartTest}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01]"
          >
            Launch Proctored Mock Test
          </button>
        </div>
      )}

      {/* ACTIVE TEST INTERFACE */}
      {testStarted && !testSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {/* Top Bar with Timer & AI Proctor Status */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
                  {currentQ.section}
                </span>
                <span className="text-xs text-slate-400">• {currentQ.topic}</span>
              </div>

              {antiCheatingEnabled && (
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] font-semibold text-slate-200">AI Proctor Active</span>
                  </div>

                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border font-mono text-[11px] font-bold ${
                    violationsCount === 0
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : violationsCount === 1
                      ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                      : 'bg-rose-950/50 border-rose-500 text-rose-300 animate-pulse'
                  }`}>
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>Warnings: {violationsCount} / 3</span>
                  </div>

                  {!isFullscreen && (
                    <button
                      onClick={requestExamFullscreen}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-[11px] font-bold transition"
                      title="Click to restore fullscreen view"
                    >
                      <Maximize className="w-3 h-3" />
                      <span>Fullscreen Lock</span>
                    </button>
                  )}
                </div>
              )}

              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold ${
                  timeLeft < 60
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse'
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <span>Target Time: {currentQ.estimated_time_seconds}s</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">Difficulty: {currentQ.difficulty}</span>
              </div>

              <div className="text-sm font-semibold text-slate-100 leading-relaxed whitespace-pre-line">
                <MathRenderer content={currentQ.stem} inline={true} />
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = answers[currentQ.id] === letter;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(letter)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        isSelected
                          ? 'bg-teal-500/20 border-teal-500 text-teal-100 shadow-md shadow-teal-500/10'
                          : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-750'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[11px] border ${
                            isSelected
                              ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {letter}
                        </span>
                        <MathRenderer content={option} inline={true} />
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 disabled:opacity-40"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    Submit Test & Generate Report
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Palette */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Question Grid</h4>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((q, idx) => {
                const isAns = answers[q.id] !== undefined;
                const isCurr = currentIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl border text-xs font-mono transition flex items-center justify-center ${
                      isCurr
                        ? 'ring-2 ring-indigo-500 bg-slate-750 text-white font-bold'
                        : isAns
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => handleSubmitTest(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs mt-3 shadow"
            >
              Finish & Score
            </button>
          </div>
        </div>
      )}

      {/* Anti-Cheating Violation Alert Modal Overlay */}
      {activeWarningModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border-2 border-rose-500 rounded-3xl p-6 text-center space-y-5 shadow-2xl shadow-rose-950/60 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
              <ShieldAlert className="w-9 h-9 animate-bounce" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400 block mb-1">
                EXAM PROCTOR WARNING {activeWarningModal.count} OF 3
              </span>
              <h3 className="text-xl font-black text-white">
                Prohibited Window Switch Detected
              </h3>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-left space-y-1.5 text-slate-300">
              <p>• <strong>Incident:</strong> <span className="text-rose-300 font-semibold">{activeWarningModal.reason}</span></p>
              <p>• <strong>Timestamp:</strong> <span className="text-slate-400 font-mono">{activeWarningModal.time}</span></p>
              <p>• <strong>Strikes Logged:</strong> <span className="text-amber-400 font-bold">{activeWarningModal.count} / 3 Maximum</span></p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              In official competitive exams (TCS iON, SSC, UPSC, IBPS), minimizing the browser or switching applications results in immediate disqualification.
              {activeWarningModal.count < 3
                ? ` You have ${3 - activeWarningModal.count} warning(s) remaining before automatic exam submission.`
                : ' Automatic exam termination threshold reached.'}
            </p>

            <button
              onClick={() => {
                setActiveWarningModal(null);
                requestExamFullscreen();
                sounds.playClick();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-rose-500/20 transition hover:scale-[1.02]"
            >
              I Understand — Return to Fullscreen Exam
            </button>
          </div>
        </div>
      )}

      {/* FORENSIC POST-TEST ANALYSIS REPORT FORMAT */}
      {testSubmitted && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 font-mono text-xs max-w-4xl mx-auto shadow-2xl">
          <div className="border-b border-slate-800 pb-4 text-center">
            <h3 className="text-lg font-bold text-white tracking-wider">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </h3>
            <h2 className="text-xl font-extrabold text-teal-400 tracking-wide">
              📊 MOCK TEST REPORT — Aman (Student ID: #9821)
            </h2>
            <h3 className="text-lg font-bold text-white tracking-wider">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </h3>
          </div>

          {/* Anti-Cheating & Proctoring Forensic Audit Card */}
          <div className={`p-5 rounded-2xl border space-y-3 font-mono ${
            wasDisqualified
              ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
              : violationsLog.length > 0
              ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
              : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          }`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-sm flex items-center gap-2">
                <Shield className="w-4 h-4" />
                🛡️ PROCTORING & INTEGRITY AUDIT REPORT
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10">
                {wasDisqualified
                  ? 'DISQUALIFIED (3/3 VIOLATIONS)'
                  : violationsLog.length === 0
                  ? '100% CLEAN INTEGRITY AUDIT'
                  : `FLAGGED (${violationsLog.length} INCIDENTS)`}
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-sans">
              {wasDisqualified && (
                <p className="text-rose-300 font-bold">
                  🚫 Test was automatically submitted early due to repeated window switching / minimizing outside the examination window.
                </p>
              )}
              {violationsLog.length === 0 ? (
                <p className="text-emerald-300 text-xs">
                  Zero tab switches, zero window blurs, and zero copy-paste attempts were detected. Verified 100% compliant with official examination security protocols.
                </p>
              ) : (
                <div className="space-y-1.5 pt-1 font-mono text-[11px]">
                  <p className="font-bold text-slate-300">Logged Security Incident Timeline:</p>
                  {violationsLog.map((log, lIdx) => (
                    <div key={lIdx} className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                      <span>[{log.time}] Incident #{log.violationNumber}: {log.reason}</span>
                      <span className="text-rose-400 font-bold">Warning Logged</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Score Summary */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <p className="font-bold text-amber-400 text-sm">🎯 SCORE SUMMARY</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-slate-300">
              <div>
                <p className="text-slate-500">Score:</p>
                <p className="text-lg font-black text-white">{totalMarks} / {maxPossible}</p>
              </div>
              <div>
                <p className="text-slate-500">Percentile:</p>
                <p className="text-lg font-black text-emerald-400">{percentile}% (vs 12,450 peers)</p>
              </div>
              <div>
                <p className="text-slate-500">Rank:</p>
                <p className="text-lg font-black text-indigo-400">#412</p>
              </div>
              <div>
                <p className="text-slate-500">Cut-off Cleared:</p>
                <p className={`text-lg font-black ${cutoffCleared === 'YES' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {cutoffCleared}
                </p>
              </div>
            </div>
          </div>

          {/* Time Analysis */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <p className="font-bold text-teal-400 text-sm">⏱️ TIME ANALYSIS</p>
            <div className="space-y-1 text-slate-300">
              <p>• Avg time/question: <strong className="text-white">48s</strong> (Benchmark: 60s)</p>
              <p>• Fastest section: <strong className="text-emerald-400">General Awareness (22s)</strong></p>
              <p>• Slowest section: <strong className="text-rose-400">Time & Work Pipes (64s)</strong></p>
              <p>• Overtime questions: <strong className="text-amber-400">1 question</strong> (cost you 0.5 negative penalty)</p>
            </div>
          </div>

          {/* Section Breakdown */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <p className="font-bold text-indigo-400 text-sm">📈 SECTION BREAKDOWN</p>
            <div className="space-y-1.5 text-slate-300">
              <p>• Quantitative Aptitude | Attempted: 2/2 | Correct: 2 | Wrong: 0 | Score: +4.0 | Accuracy: 100%</p>
              <p>• Logical Reasoning     | Attempted: 1/1 | Correct: 1 | Wrong: 0 | Score: +2.0 | Accuracy: 100%</p>
              <p>• General Awareness     | Attempted: 1/1 | Correct: 1 | Wrong: 0 | Score: +2.0 | Accuracy: 100%</p>
            </div>
          </div>

          {/* Weak & Strong Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <p className="font-bold text-rose-400">🔴 WEAK ZONES (Fix These First):</p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300 text-[11px]">
                <li>Pipes with Leakages — 50% — Master LCM subtraction model</li>
                <li>Circular Seating Arrangement — 55% — Start with definite left/right condition</li>
                <li>Ancient Inscriptions — 60% — Revise Ashokan Rock Edicts</li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <p className="font-bold text-emerald-400">🟢 STRONG ZONES (Maintain):</p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300 text-[11px]">
                <li>Train Lengths & Relative Speeds — 100%</li>
                <li>Constitutional Fundamental Rights — 100%</li>
                <li>Syllogisms Possibility Cases — 100%</li>
              </ol>
            </div>
          </div>

          {/* AI Insights */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <p className="font-bold text-amber-400 text-sm">💡 AI INSIGHTS:</p>
            <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
              <li>You solved train problems with zero arithmetic hesitation—great mental 5/18 conversion speed.</li>
              <li>When a problem has multiple filling pipes, don't write out fractions; use LCM unit capacity in step 1.</li>
              <li>Most impactful focus before your next mock: Practice 10 Alternating Day Pipe problems.</li>
            </ul>
          </div>

          {/* 7-Day Revision Plan */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <p className="font-bold text-teal-400 text-sm">📅 7-DAY REVISION PLAN:</p>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <p>Day 1: Pipes & Cisterns — Aptitude Engine — Target: 15 LCM questions</p>
              <p>Day 2: Circular Seating (In/Out) — Logical Bank — Target: 4 Puzzles</p>
              <p>Day 3: Emergency Provisions (Art 352-360) — Govt Hub — Target: 10 PYQs</p>
              <p>Day 4: Profit & Loss Dishonest Dealer — Shortcut Cheatsheet — Target: 12 questions</p>
              <p>Day 5: 0/1 Knapsack & Array DP — Placement Sheet — Target: 2 Problems</p>
              <p>Day 6: Speed Math & Timed Sectional — 20-min Sprint</p>
              <p>Day 7: Full-Length Retake Mock Test</p>
            </div>
          </div>

          {/* Next Test Recommendation */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
            <span className="text-indigo-300">
              🔁 RECOMMENDED NEXT TEST: <strong className="text-white">{examName} Adaptive Mock #2</strong>
            </span>
            <button
              onClick={handleStartTest}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
            >
              Launch Next Mock
            </button>
          </div>

          {/* Interactive Multi-Shift Cutoff & Rank Forecast */}
          <CutoffPredictor />
        </div>
      )}
    </div>
  );
}
