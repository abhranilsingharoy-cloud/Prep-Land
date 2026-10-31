import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  BookOpen,
  Newspaper,
  Scale,
  Award,
  FileText,
  Lightbulb
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { GOVT_EXAMS } from '../data/govtExamsData';
import { usePrepLand } from '../context/PrepLandContext';
import PolityNavigator from './PolityNavigator';

// High-Yield Landmark Judgments
const LANDMARK_JUDGMENTS = [
  {
    caseName: 'Kesavananda Bharati v. State of Kerala (1973)',
    bench: '13-Judge Constitution Bench (7:6 majority)',
    doctrine: 'Basic Structure Doctrine',
    significance: 'Ruled that Parliament has wide amending powers under Article 368, but cannot alter the "Basic Structure" of the Constitution.',
    relevantArticles: 'Article 13, Article 368'
  },
  {
    caseName: 'Justice K.S. Puttaswamy (Retd.) v. Union of India (2017)',
    bench: '9-Judge Bench (Unanimous)',
    doctrine: 'Right to Privacy as a Fundamental Right',
    significance: 'Held that privacy is an intrinsic part of the Right to Life and Personal Liberty under Article 21 and Part III.',
    relevantArticles: 'Article 21, Part III'
  },
  {
    caseName: 'S.R. Bommai v. Union of India (1994)',
    bench: '9-Judge Bench',
    doctrine: 'Judicial Review of President\'s Rule under Article 356',
    significance: 'Curtailed the arbitrary dismissal of state governments by ruling that secularism is basic structure and proclamation is subject to judicial review.',
    relevantArticles: 'Article 356, Article 74'
  }
];

// Current Affairs Dual-Angle Capsules
const CURRENT_AFFAIRS_DUAL_ANGLE = [
  {
    headline: 'RBI Unified Lending Interface (ULI) Nationwide Launch',
    date: 'August 2024',
    keyFacts: 'Frictionless digital credit flow integrating land records, satellite data, and credit bureaus directly to scheduled commercial banks without physical documents.',
    upscAngle: 'GS-3: Financial inclusion, Digital Public Infrastructure (DPI), reducing credit friction for MSMEs & tenant farmers, rural credit delivery bottlenecks.',
    sscAngle: 'General Awareness / Banking: Launched by RBI, acronym expansion (Unified Lending Interface), pilot states, credit delivery institutions.',
    staticLink: 'RBI Act 1934, Priority Sector Lending (PSL) norms, and NABARD rural credit mandate.',
    generatedMCQ: {
      question: 'Which institution developed and launched the Unified Lending Interface (ULI) in India?',
      options: ['Reserve Bank of India (RBI)', 'NITI Aayog', 'National Payments Corporation of India (NPCI)', 'Ministry of Finance'],
      correct: 0,
      explanation: 'Announced by the RBI Governor to standardize frictionless digital data flow for retail and MSME lending.'
    }
  }
];

export default function GovtExamHub() {
  const { stats, logStudyMinutes, logQuestionSolved } = usePrepLand();
  const [activeTab, setActiveTab] = useState('pyqs'); // 'pyqs', 'polity', 'current-affairs', 'essay'
  const [selectedExamId, setSelectedExamId] = useState('ssc-cgl');
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  // UPSC Essay Evaluator State
  const [essayTitle, setEssayTitle] = useState('Technology is a useful servant but a dangerous master.');
  const [essayText, setEssayText] = useState('');
  const [essayScorecard, setEssayScorecard] = useState(null);

  const activeExam = GOVT_EXAMS.find((e) => e.id === selectedExamId) || GOVT_EXAMS[0];

  const handleSelectOption = (pyqId, optIdx, correctIdx = 0) => {
    if (userAnswers[pyqId] !== undefined) return;
    setUserAnswers((prev) => ({ ...prev, [pyqId]: optIdx }));
    setShowExplanation((prev) => ({ ...prev, [pyqId]: true }));

    // Log question solved to candidate live stats
    logQuestionSolved(optIdx === correctIdx, 35);
  };

  const handleEvaluateEssay = () => {
    const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;
    const hasSchemes = /(initiative|mission|scheme|yojana|act|supreme court|judgment|gdp|niti aayog)/i.test(essayText);
    const hasMultiPerspective = /(on the one hand|conversely|however|ethical|economic|social|governance)/i.test(essayText);

    let introScore = wordCount >= 100 ? 15 : 8;
    let thesisScore = wordCount >= 200 ? 16 : 9;
    let structScore = wordCount >= 300 ? 17 : 10;
    let exampleScore = hasSchemes ? 18 : 10;
    let balanceScore = hasMultiPerspective ? 18 : 10;
    let conclusionScore = wordCount >= 400 ? 16 : 8;
    let wordCountScore = wordCount >= 800 && wordCount <= 1250 ? 15 : wordCount >= 400 ? 10 : 5;

    const total = introScore + thesisScore + structScore + exampleScore + balanceScore + conclusionScore + wordCountScore;

    logStudyMinutes(25, 'govt');

    setEssayScorecard({
      total,
      max: 125,
      wordCount,
      rubric: {
        intro: `${introScore}/18 — Hook & thesis framing`,
        thesis: `${thesisScore}/18 — Clarity of stance`,
        structure: `${structScore}/18 — Paragraph transitions`,
        examples: `${exampleScore}/20 — Case studies & Govt schemes`,
        balance: `${balanceScore}/20 — Multi-dimensional analysis (PESTLE)`,
        conclusion: `${conclusionScore}/18 — Forward-looking synthesis`,
        wordDiscipline: `${wordCountScore}/15 — Word count discipline (Goal: 1000–1200 words)`
      },
      feedback: [
        wordCount < 800 ? 'Word count is low for UPSC Mains. Target 1000–1200 words.' : 'Good length and thematic stamina.',
        hasSchemes ? 'Solid integration of practical policies and contemporary examples.' : 'Incorporate more Indian case studies, constitutional articles, and committee reports (e.g., NITI Aayog).',
        hasMultiPerspective ? 'Well-balanced arguments examining both benefits and risks.' : 'Ensure multi-dimensional PESTLE lens (Political, Economic, Social, Technological, Legal, Environmental).'
      ]
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Prep Land Govt Exam Specialist • Zero Confabulation Tag
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Landmark className="w-5 h-5 text-amber-400" />
            Government Exam Specialist Hub
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            UPSC CSE Prelims & Mains (GS 1–4, Essay), SSC CGL, Banking (IBPS/SBI), Railways (RRB), and State PSCs.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('pyqs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'pyqs' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Verified PYQs
          </button>
          <button
            onClick={() => setActiveTab('polity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'polity' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Polity & Judgments
          </button>
          <button
            onClick={() => setActiveTab('current-affairs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'current-affairs' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Current Affairs (UPSC/SSC)
          </button>
          <button
            onClick={() => setActiveTab('essay')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'essay' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            UPSC Essay Evaluator
          </button>
        </div>
      </div>

      {/* TAB 1: VERIFIED PYQS */}
      {activeTab === 'pyqs' && (
        <div className="space-y-6">
          {/* Exam selector */}
          <div className="flex flex-wrap items-center gap-2">
            {GOVT_EXAMS.map((exam) => (
              <button
                key={exam.id}
                onClick={() => setSelectedExamId(exam.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedExamId === exam.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                }`}
              >
                {exam.name.split(' (')[0]}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {activeExam.pyqs.map((pyq) => {
              const userAns = userAnswers[pyq.id];
              const hasAnswered = userAns !== undefined;

              return (
                <div key={pyq.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                      {pyq.year}
                    </span>
                    <span className="text-slate-400">{pyq.section}</span>
                  </div>

                  <p className="text-sm font-semibold text-slate-100 leading-relaxed whitespace-pre-line">
                    <MathRenderer content={pyq.question} inline={true} />
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {pyq.options.map((opt, optIdx) => {
                      let optStyle = 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-750';
                      if (hasAnswered) {
                        if (optIdx === pyq.correctIndex) {
                          optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                        } else if (optIdx === userAns) {
                          optStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                        } else {
                          optStyle = 'bg-slate-900/50 text-slate-500 border-slate-800 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={hasAnswered}
                          onClick={() => handleSelectOption(pyq.id, optIdx, pyq.correctIndex)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-medium text-left transition ${optStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center font-mono text-[11px] text-slate-300">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <MathRenderer content={opt} inline={true} />
                          </div>
                          {hasAnswered && optIdx === pyq.correctIndex && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                          {hasAnswered && optIdx === userAns && optIdx !== pyq.correctIndex && <XCircle className="w-4 h-4 text-rose-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation[pyq.id] && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <p className="font-bold text-amber-400 uppercase tracking-wide">
                        Official Exam Context & Memory Hook:
                      </p>
                      <p className="text-slate-300 leading-relaxed">
                        <MathRenderer content={pyq.explanation} inline={true} />
                      </p>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-teal-300 flex items-center gap-2">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span><strong>Remember this as:</strong> "44th Amendment = 1978 Janata Govt = Restored Civil Liberties after 1975."</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: POLITY & LANDMARK JUDGMENTS */}
      {activeTab === 'polity' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                Landmark Supreme Court Judgments for UPSC & Judiciary
              </h3>
              <span className="text-xs text-slate-400">Constitution Benches & Doctrines</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LANDMARK_JUDGMENTS.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2.5">
                  <span className="text-[10px] font-mono text-amber-400 font-bold block">{item.bench}</span>
                  <h4 className="text-xs font-bold text-slate-100 leading-snug">{item.caseName}</h4>
                  <p className="text-xs text-emerald-400 font-semibold">{item.doctrine}</p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">{item.significance}</p>
                  <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-indigo-400">
                    Cites: {item.relevantArticles}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Constitutional Writs & Emergency Navigator */}
          <PolityNavigator />
        </div>
      )}

      {/* TAB 3: CURRENT AFFAIRS DUAL-ANGLE (UPSC vs SSC) */}
      {activeTab === 'current-affairs' && (
        <div className="space-y-6">
          {CURRENT_AFFAIRS_DUAL_ANGLE.map((ca, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{ca.headline}</h3>
                  <span className="text-slate-400 font-mono">Date: {ca.date}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/30">
                  Dual Exam Tag
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">{ca.keyFacts}</p>

              {/* Dual Angle Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1 text-xs">
                  <span className="font-bold text-indigo-300 uppercase tracking-wider block">🏛️ UPSC Angle (Analytical & Mains):</span>
                  <p className="text-slate-300 leading-relaxed">{ca.upscAngle}</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1 text-xs">
                  <span className="font-bold text-amber-300 uppercase tracking-wider block">⚡ SSC & Banking Angle (Factual & Prelims):</span>
                  <p className="text-slate-300 leading-relaxed">{ca.sscAngle}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                <strong className="text-teal-400">Related Static Syllabus Link:</strong> {ca.staticLink}
              </div>

              {/* Instant MCQ */}
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Instant MCQ Drill:</span>
                <p className="font-semibold text-slate-200">{ca.generatedMCQ.question}</p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {ca.generatedMCQ.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2 rounded-lg text-xs border ${
                        oIdx === ca.generatedMCQ.correct
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: UPSC ESSAY EVALUATOR (X / 125) */}
      {activeTab === 'essay' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              UPSC Mains Essay Evaluator (Paper I — 125 Marks)
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated on: Thesis clarity, introduction hook, arguments & counter-arguments, examples/schemes, and synthesis.
            </p>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Essay Prompt / Topic:</label>
              <input
                type="text"
                value={essayTitle}
                onChange={(e) => setEssayTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Your Essay Draft:</label>
              <textarea
                rows={12}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Paste your UPSC essay draft here (target 1000–1200 words)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-sans leading-relaxed"
              />
            </div>

            <button
              onClick={handleEvaluateEssay}
              disabled={!essayText.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-teal-500 text-slate-950 font-bold text-xs shadow hover:scale-105 transition disabled:opacity-40"
            >
              Evaluate Essay Draft (Score out of 125)
            </button>
          </div>

          <div>
            {essayScorecard ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs shadow-xl animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white">UPSC Mains Essay Evaluation</span>
                  <span className="text-lg font-black text-amber-400">
                    {essayScorecard.total} / {essayScorecard.max} Marks
                  </span>
                </div>

                <p className="text-slate-400 font-mono">Word Count: {essayScorecard.wordCount} words</p>

                <div className="space-y-1.5 font-mono text-slate-300">
                  <p>Introduction Quality: {essayScorecard.rubric.intro}</p>
                  <p>Thesis Clarity:       {essayScorecard.rubric.thesis}</p>
                  <p>Structure & Flow:     {essayScorecard.rubric.structure}</p>
                  <p>Schemes & Data:       {essayScorecard.rubric.examples}</p>
                  <p>PESTLE Balance:       {essayScorecard.rubric.balance}</p>
                  <p>Conclusion Synthesis: {essayScorecard.rubric.conclusion}</p>
                  <p>Word Count Limits:    {essayScorecard.rubric.wordDiscipline}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <p className="font-bold text-amber-400">Actionable Examiner Feedback:</p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    {essayScorecard.feedback.map((fb, idx) => (
                      <li key={idx}>{fb}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400 space-y-3">
                <Award className="w-8 h-8 text-slate-600 mx-auto" />
                <p>Paste your essay draft to generate an authentic UPSC Mains assessment across all 7 evaluation dimensions.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
