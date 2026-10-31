import React, { useState } from 'react';
import {
  Layers,
  RotateCw,
  CheckCircle,
  AlertCircle,
  Sparkles,
  FileText,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Zap,
  Network,
  Copy,
  Check,
  Filter
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { FLASHCARDS_DATA } from '../data/flashcardsData';

const SAMPLE_RAW_TEXT = `Operating Systems — Deadlock and Concurrency.
A deadlock occurs when a set of concurrent processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.
There are four Coffman conditions that must hold simultaneously for a deadlock to exist: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.
To prevent deadlocks, we can break any one of these four conditions. Banker's Algorithm is used for deadlock avoidance by simulating allocation for each request and checking for a safe state sequence.
Common student mistake: confusing deadlock prevention (static design constraints) with deadlock avoidance (dynamic runtime checking with Banker's algorithm).`;

export default function NotesAndFlashcards() {
  const [activeMode, setActiveMode] = useState('mode-1'); // 'mode-1' (Structured), 'mode-2' (20/80 Cheat Sheet), 'mode-3' (Flashcards), 'mode-4' (Mind Map)
  const [rawInput, setRawInput] = useState(SAMPLE_RAW_TEXT);
  const [targetExam, setTargetExam] = useState('Campus SDE / GATE / SSC');
  const [copied, setCopied] = useState(false);

  // Flashcards state
  const [cards, setCards] = useState(FLASHCARDS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Prep Land Notes AI • Compression = Quality
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Exam-Optimized Notes & Mind Map Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Converts raw textbooks, syllabus transcripts, and lectures into structured notes, 20/80 cheat sheets, and ASCII mind maps.
          </p>
        </div>

        {/* 4 Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveMode('mode-1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeMode === 'mode-1' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mode 1: Structured Notes
          </button>
          <button
            onClick={() => setActiveMode('mode-2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeMode === 'mode-2' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mode 2: 20/80 Cheat Sheet
          </button>
          <button
            onClick={() => setActiveMode('mode-3')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeMode === 'mode-3' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mode 3: Flashcard Deck
          </button>
          <button
            onClick={() => setActiveMode('mode-4')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeMode === 'mode-4' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mode 4: Mind Map
          </button>
        </div>
      </div>

      {/* Input Box for Transformation */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300">Raw Input (Textbook / Transcript / Lecture Notes):</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Shortlist for:</span>
            <input
              type="text"
              value={targetExam}
              onChange={(e) => setTargetExam(e.target.value)}
              className="bg-slate-950 border border-slate-750 px-2.5 py-1 rounded-lg text-slate-200 text-xs"
            />
          </div>
        </div>

        <textarea
          rows={3}
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-sans"
        />
      </div>

      {/* MODE 1: STRUCTURED NOTES OUTPUT */}
      {activeMode === 'mode-1' && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl font-extrabold text-white"># DEADLOCKS & CONCURRENCY CONTROL</h2>
            <p className="text-xs text-slate-400 mt-1">
              <strong>Exam Relevance:</strong> <span className="text-emerald-400 font-bold">High</span> — Most tested in:{' '}
              <span className="text-indigo-400 font-semibold">{targetExam}</span>
            </p>
          </div>

          {/* Key Concepts */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider">Key Concepts</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p>
                1. <strong>Deadlock</strong> — A state where a set of processes are permanently blocked because each holds resources needed by others.
              </p>
              <ul className="list-disc pl-5 text-slate-400 space-y-1">
                <li>Requires 4 Coffman conditions to hold simultaneously.</li>
                <li>Example: Process $P_1$ holds Resource $R_1$ and requests $R_2$, while $P_2$ holds $R_2$ and requests $R_1$.</li>
              </ul>
            </div>
          </div>

          {/* Formulas / Rules Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Formulas & Conditions to Remember</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Condition / Model</th>
                    <th className="p-3">Requirement</th>
                    <th className="p-3">Context / Prevention Remedy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-semibold">Mutual Exclusion</td>
                    <td className="p-3">Non-shareable resources</td>
                    <td className="p-3">Use spooling / shareable read locks</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Hold & Wait</td>
                    <td className="p-3">Process holds one, requests another</td>
                    <td className="p-3">Request all resources simultaneously before starting</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">No Preemption</td>
                    <td className="p-3">Resources cannot be forcibly taken</td>
                    <td className="p-3">Release currently held resources if new request denied</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Circular Wait</td>
                    <td className="p-3">Closed chain of resource dependency</td>
                    <td className="p-3">Impose global linear ordering on all resource IDs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Glossary */}
          <div className="space-y-2 text-xs">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Key Terms Glossary</h3>
            <ul className="space-y-1 text-slate-400">
              <li>• <strong>Banker's Algorithm:</strong> Deadlock avoidance algorithm testing safe sequences before resource allocation.</li>
              <li>• <strong>Resource Allocation Graph (RAG):</strong> Directed graph showing resource assignments and process request dependencies.</li>
              <li>• <strong>Safe State:</strong> Sequence where every process can obtain maximum resources and complete execution.</li>
            </ul>
          </div>

          {/* Must-Remember Points */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5 text-xs">
            <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
              ⭐ Must-Remember Points (High Yield)
            </h4>
            <p className="text-slate-300">⭐ Breaking ANY ONE of the 4 Coffman conditions is 100% sufficient to prevent deadlock.</p>
            <p className="text-slate-300">⭐ If a Resource Allocation Graph contains a cycle AND every resource has only 1 instance, a deadlock DEFINITELY exists.</p>
            <p className="text-slate-300">⭐ If resources have multiple instances, a cycle is a necessary condition, but NOT a sufficient condition.</p>
          </div>

          {/* Common Exam Traps */}
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-slate-300 space-y-1">
            <h4 className="font-bold text-rose-400 flex items-center gap-1.5">
              ⚠️ Common Exam Traps
            </h4>
            <p>Students frequently confuse <strong>Deadlock Prevention</strong> (static design rules that break 1 of 4 conditions before runtime) with <strong>Deadlock Avoidance</strong> (dynamic runtime checks using Banker's Algorithm based on remaining needs).</p>
          </div>

          {/* Connected Topics */}
          <div className="text-xs text-slate-400 border-t border-slate-800 pt-3">
            → <strong>This links to:</strong> Process Synchronization, Semaphores & Mutex, Concurrency Control in DBMS.
          </div>
        </div>
      )}

      {/* MODE 2: 20/80 CHEAT SHEET (MAX 400 WORDS) */}
      {activeMode === 'mode-2' && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 font-mono text-xs max-w-3xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                20/80 Exam Shortlist
              </span>
              <h3 className="text-base font-bold text-white mt-1">Deadlock & Banker's Algorithm (Under 300 Words)</h3>
            </div>
            <button
              onClick={() => handleCopyText('Deadlock 20/80 Cheat Sheet Content')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="space-y-2 text-slate-300">
            <p className="text-emerald-400 font-bold">🔴 5 HIGHEST-YIELD FACTS:</p>
            <p>1. 4 simultaneous conditions for deadlock: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.</p>
            <p>2. Breaking circular wait via linear resource numbering ($R_1 &lt; R_2$) is the most practical prevention method.</p>
            <p>3. Banker's Algorithm uses formula: $\text{Need}[i][j] = \text{Max}[i][j] - \text{Allocation}[i][j]$.</p>
            <p>4. Single-instance RAG cycle $\rightarrow$ 100% Deadlock. Multi-instance cycle $\rightarrow$ May or may not be deadlock.</p>
            <p>5. Safe State guarantees no deadlock. Unsafe state DOES NOT mean deadlock, only that deadlock is possible.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 space-y-1">
            <p className="text-teal-400 font-bold">⚡ CRITICAL FORMULA:</p>
            <p>Minimum resources $R$ required to ensure $N$ processes never deadlock (each needing at most $M$ units):</p>
            <p className="text-white font-bold">$$R \ge N \times (M - 1) + 1$$</p>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-1.5 font-sans">
            <p className="text-amber-400 font-bold text-xs">PRACTICE REINFORCEMENT (3 Questions):</p>
            <p className="text-[11px] text-slate-300">1. If 3 processes each need 4 resource units, what is min resources for zero deadlock? (Ans: $3 \times (4 - 1) + 1 = 10$).</p>
            <p className="text-[11px] text-slate-300">2. Which condition is eliminated by natural spooling of print jobs? (Ans: Mutual Exclusion).</p>
            <p className="text-[11px] text-slate-300">3. Is an unsafe state in Banker's Algorithm synonymous with deadlock? (Ans: No, only unsafe).</p>
          </div>
        </div>
      )}

      {/* MODE 3: FLASHCARD DECK (MIXED FORMATS) */}
      {activeMode === 'mode-3' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Card <strong className="text-white">{currentIndex + 1}</strong> of <strong className="text-white">{cards.length}</strong>
            </span>
            <span className="font-mono text-indigo-400">Deck: {cards[currentIndex].category}</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[240px] p-8 rounded-2xl border cursor-pointer select-none transition-all duration-300 flex flex-col justify-between shadow-2xl relative ${
              isFlipped
                ? 'bg-gradient-to-br from-indigo-950/90 to-slate-900 border-indigo-500/50'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {isFlipped ? 'Back' : 'Front'}
              </span>
              <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                <RotateCw className="w-3.5 h-3.5" /> Tap to flip
              </span>
            </div>

            <div className="py-6 text-center">
              {!isFlipped ? (
                <h3 className="text-lg font-bold text-slate-100">
                  <MathRenderer content={cards[currentIndex].front} inline={true} />
                </h3>
              ) : (
                <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                  <MathRenderer content={cards[currentIndex].back} inline={true} />
                  {cards[currentIndex].tip && (
                    <p className="mt-3 text-xs text-teal-300 italic">💡 {cards[currentIndex].tip}</p>
                  )}
                </div>
              )}
            </div>

            <div className="text-center text-[10px] text-slate-500">
              Tag: [OS] [CS VIVA] [HARD]
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
              }}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-slate-400">Use arrow controls or flip card</span>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex((prev) => (prev + 1) % cards.length);
              }}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 4: MIND MAP STRUCTURE (ASCII TREE) */}
      {activeMode === 'mode-4' && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-indigo-400" />
              Hierarchical Mind Map
            </h3>
            <span className="text-slate-400 text-xs">ASCII Layout</span>
          </div>

          <pre className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 overflow-x-auto leading-relaxed">
{`OPERATING SYSTEM DEADLOCKS
├── 1. Coffman Conditions (All 4 needed)
│   ├── Mutual Exclusion (Non-shareable)
│   ├── Hold and Wait (Holding + requesting)
│   ├── No Preemption (No forced release)
│   └── Circular Wait (Closed loop)
├── 2. Deadlock Handling Strategies
│   ├── Deadlock Ignorance (Ostrich Algorithm)
│   ├── Deadlock Prevention (Break 1 condition)
│   ├── Deadlock Avoidance (Banker's Algorithm)
│   │   ├── Max Matrix
│   │   ├── Allocation Matrix
│   │   └── Need = Max - Allocation
│   └── Deadlock Detection & Recovery
│       ├── Resource Allocation Graph (RAG)
│       ├── Process Termination
│       └── Resource Preemption
└── 3. Critical Exam Formulas
    └── Min Resources: R >= N*(M-1) + 1`}
          </pre>
        </div>
      )}
    </div>
  );
}
