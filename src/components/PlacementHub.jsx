import React, { useState } from 'react';
import {
  DSA_SHEET,
  COMPANY_PROFILES,
  CORE_CS_TOPICS
} from '../data/placementData';
import {
  Code2,
  Building2,
  Database,
  ExternalLink,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { usePrepLand } from '../context/PrepLandContext';

export default function PlacementHub() {
  const { stats, dsaCompleted, toggleDsaProblem } = usePrepLand();
  const [subTab, setSubTab] = useState('dsa'); // 'dsa', 'companies', 'core-cs'
  const [codeLang, setCodeLang] = useState('python'); // 'python' or 'cpp'
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  const toggleComplete = (id) => {
    toggleDsaProblem(id);
  };

  const handleCopyCode = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            Campus Placement Engineering Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end preparation for Product (Amazon, Google) and Service / R&D (TCS Prime, Infosys SP) hiring funnels.
          </p>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            onClick={() => setSubTab('dsa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'dsa'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DSA Problem Sheet
          </button>
          <button
            onClick={() => setSubTab('companies')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'companies'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Company Funnels
          </button>
          <button
            onClick={() => setSubTab('core-cs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              subTab === 'core-cs'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Core CS & SQL
          </button>
        </div>
      </div>

      {/* SUBTAB 1: DSA PROBLEM SHEET */}
      {subTab === 'dsa' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Live Progress:{' '}
              <strong className="text-emerald-400">
                {Object.values(dsaCompleted).filter(Boolean).length} / {DSA_SHEET.length} Solved
              </strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Code View:</span>
              <button
                onClick={() => setCodeLang('python')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                  codeLang === 'python' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-bold' : 'text-slate-400'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setCodeLang('cpp')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                  codeLang === 'cpp' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-bold' : 'text-slate-400'
                }`}
              >
                C++
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {DSA_SHEET.map((prob) => {
              const isDone = !!dsaCompleted[prob.id];
              const isExpanded = expandedProblem === prob.id;
              const codeSnippet = codeLang === 'python' ? prob.pythonSnippet : prob.cppSnippet;

              return (
                <div
                  key={prob.id}
                  className={`rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-slate-900/60 border-emerald-500/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleComplete(prob.id)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition border ${
                          isDone
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : 'border-slate-600 hover:border-teal-400 bg-slate-800'
                        }`}
                      >
                        {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            className={`text-sm font-bold ${
                              isDone ? 'line-through text-slate-400' : 'text-slate-100'
                            }`}
                          >
                            {prob.title}
                          </h4>
                          <span
                            className={`text-[10px] px-2 py-0.2 rounded-full font-semibold ${
                              prob.difficulty === 'Easy'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {prob.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          <span className="text-indigo-400 font-medium">{prob.category}</span> • Pattern:{' '}
                          <span className="text-slate-300">{prob.pattern}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden md:flex items-center gap-1.5">
                        {prob.companies.map((c, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      {prob.leetcodeUrl && (
                        <a
                          href={prob.leetcodeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                          title="Open LeetCode problem"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => setExpandedProblem(isExpanded ? null : prob.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Solution & Complexity */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-3 bg-slate-950/60 rounded-b-2xl">
                      <p className="text-xs text-slate-300">{prob.description}</p>

                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                        <span>
                          Time:{' '}
                          <span className="text-emerald-400">
                            <MathRenderer content={prob.timeComplexity} inline={true} />
                          </span>
                        </span>
                        <span>
                          Space:{' '}
                          <span className="text-teal-400">
                            <MathRenderer content={prob.spaceComplexity} inline={true} />
                          </span>
                        </span>
                      </div>

                      {/* Code Block with Copy */}
                      <div className="relative rounded-xl overflow-hidden border border-slate-800">
                        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                          <span>{codeLang === 'python' ? 'Solution.py' : 'Solution.cpp'}</span>
                          <button
                            onClick={() => handleCopyCode(prob.id, codeSnippet)}
                            className="flex items-center gap-1 hover:text-white text-slate-400"
                          >
                            {copiedCodeId === prob.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3.5 bg-slate-950 text-xs font-mono text-slate-200 overflow-x-auto">
                          <code>{codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: COMPANY PROFILES */}
      {subTab === 'companies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {COMPANY_PROFILES.map((comp) => (
            <div
              key={comp.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-teal-400" />
                    {comp.name}
                  </h3>
                  <span className="text-xs text-indigo-400 font-medium">{comp.tier}</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {comp.avgPackage}
                </span>
              </div>

              {/* Rounds Breakdown */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiring Rounds:</p>
                {comp.rounds.map((round, rIdx) => (
                  <div key={rIdx} className="p-2.5 rounded-xl bg-slate-850 border border-slate-800 text-xs">
                    <p className="font-semibold text-slate-200">{round.name}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{round.details}</p>
                  </div>
                ))}
              </div>

              {/* Focus Areas */}
              <div className="pt-2 border-t border-slate-800">
                <p className="text-[11px] text-slate-500 mb-1.5 font-semibold">Priority Topics:</p>
                <div className="flex flex-wrap gap-1.5">
                  {comp.topFocusAreas.map((area, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic">
                Eligibility: {comp.cutoffs}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 3: CORE CS & SQL */}
      {subTab === 'core-cs' && (
        <div className="space-y-6">
          {CORE_CS_TOPICS.map((topic, tIdx) => (
            <div key={tIdx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Database className="w-5 h-5 text-teal-400" />
                {topic.subject}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topic.keyConcepts.map((item, cIdx) => (
                  <div key={cIdx} className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-2.5">
                    <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <MathRenderer content={item.explanation} inline={true} />
                    </p>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <p className="text-[11px] text-indigo-400 font-semibold mb-1">
                        Frequent Interview Viva:
                      </p>
                      <p className="text-slate-300 font-medium text-[11px]">{item.interviewQuestion}</p>
                      <p className="text-[11px] text-slate-400 mt-1 italic font-mono">
                        "{item.answerSnippet}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
