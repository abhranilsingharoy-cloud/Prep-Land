import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Code2, Landmark, Lightbulb, ArrowRight, Monitor, Sparkles } from 'lucide-react';
import { APTITUDE_QUESTIONS, FORMULA_CHEAT_SHEET } from '../data/aptitudeQuestions';
import { DSA_SHEET, CORE_CS_TOPICS } from '../data/placementData';
import { GOVT_EXAMS } from '../data/govtExamsData';

export default function QuickSearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search results aggregation
  const results = [];

  if (q.length >= 2) {
    // Aptitude questions
    APTITUDE_QUESTIONS.forEach((item) => {
      if (item.question.toLowerCase().includes(q) || item.topicName.toLowerCase().includes(q)) {
        results.push({
          type: 'Aptitude Problem',
          title: item.topicName,
          subtitle: item.question.slice(0, 80) + '...',
          tab: 'aptitude',
          icon: BookOpen
        });
      }
    });

    // DSA problems
    DSA_SHEET.forEach((item) => {
      if (item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)) {
        results.push({
          type: 'DSA Problem',
          title: item.title,
          subtitle: `${item.category} • ${item.pattern}`,
          tab: 'placements',
          icon: Code2
        });
      }
    });

    // Formulas
    FORMULA_CHEAT_SHEET.forEach((cat) => {
      cat.formulas.forEach((f) => {
        if (f.name.toLowerCase().includes(q) || cat.topic.toLowerCase().includes(q)) {
          results.push({
            type: 'Formula Cheatsheet',
            title: f.name,
            subtitle: `${cat.topic} shortcut`,
            tab: 'aptitude',
            icon: Lightbulb
          });
        }
      });
    });

    // Govt Exam PYQs
    GOVT_EXAMS.forEach((exam) => {
      exam.pyqs.forEach((pyq) => {
        if (pyq.question.toLowerCase().includes(q) || pyq.section.toLowerCase().includes(q)) {
          results.push({
            type: 'Govt PYQ',
            title: `${exam.name.split(' (')[0]} - ${pyq.section}`,
            subtitle: pyq.question.slice(0, 80) + '...',
            tab: 'govt-exams',
            icon: Landmark
          });
        }
      });
    });

    // Special tools and new features
    if ('cutoff normalization predictor forecast score'.includes(q)) {
      results.push({
        type: 'Interactive Predictor',
        title: 'Score Normalization & Cutoff Calculator',
        subtitle: 'Multi-shift normalization and qualification forecast for SSC CGL & IBPS PO',
        tab: 'cutoff',
        icon: Lightbulb
      });
    }

    if ('visualizer two pointers kadane algorithm simulator'.includes(q)) {
      results.push({
        type: 'Algorithm Visualizer',
        title: 'Interactive DSA Step Simulator',
        subtitle: 'Animated Two Pointers & Kadane algorithm execution',
        tab: 'placements',
        icon: Code2
      });
    }

    if ('writs emergency article 32 226 352 habeas corpus mandamus'.includes(q)) {
      results.push({
        type: 'Polity Law Engine',
        title: '5 Constitutional Writs & Emergency Navigator',
        subtitle: 'Articles 32, 226, 352, 356, 360 drilldown and exam traps',
        tab: 'govt-exams',
        icon: Landmark
      });
    }

    if ('mixture alligation successive discount faulty weights solver'.includes(q)) {
      results.push({
        type: 'Formula Solver',
        title: 'Alligation & Successive Discount Solver',
        subtitle: 'Instant ratio mixing and equivalent discount calculations',
        tab: 'solver',
        icon: BookOpen
      });
    }

    if ('shiping 识屏 screen snip dialogue teleprompter copilot coder'.includes(q)) {
      results.push({
        type: 'AI Interview Copilot',
        title: 'Shiping 识屏 Screen & Dialogue Copilot',
        subtitle: 'Real-time screen question solver & live teleprompter inspired by ooboqoo/shiping',
        tab: 'interview-coach',
        icon: Monitor
      });
    }

    if (
      'genai generative ai llm transformers rag vector hnsw agents embeddings attention awesome'.includes(q) ||
      q.includes('genai') ||
      q.includes('rag') ||
      q.includes('llm') ||
      q.includes('attention') ||
      q.includes('vector')
    ) {
      results.push({
        type: 'Awesome GenAI Hub',
        title: 'GenAI 101-301 Track & RAG Simulator',
        subtitle: 'LLM Foundations, Scaled Dot-Product, Hybrid Vector RAG, and AI Engineer Viva Deck',
        tab: 'genai',
        icon: Sparkles
      });
    }

    if (
      'aigc diffusion stable diffusion dit clip lora qlora dpo kto simpo wethinkin'.includes(q) ||
      q.includes('diffusion') ||
      q.includes('aigc') ||
      q.includes('lora') ||
      q.includes('qlora') ||
      q.includes('dpo')
    ) {
      results.push({
        type: 'AIGC Interview Book',
        title: 'AIGC, Diffusion & PEFT Masterclass (WeThinkIn)',
        subtitle: 'DDPM/DDIM, CFG, Latent Diffusion, QLoRA NF4, and DPO alignment',
        tab: 'genai',
        icon: Sparkles
      });
    }

    if (
      'ml system design recommender two tower fraud detection ad ctr streaming boltzmannentropy interviews.ai'.includes(q) ||
      q.includes('system design') ||
      q.includes('recommender') ||
      q.includes('fraud') ||
      q.includes('two tower')
    ) {
      results.push({
        type: 'ML System Design',
        title: 'Production ML System Design Studio (interviews.ai)',
        subtitle: 'Two-Tower Recommender, Real-time Fraud Stream, and Hybrid Search Ranking',
        tab: 'genai',
        icon: Monitor
      });
    }

    if (
      'kv cache vram calculator pagedattention vllm gpu sizing'.includes(q) ||
      q.includes('kv cache') ||
      q.includes('vram') ||
      q.includes('pagedattention') ||
      q.includes('gpu')
    ) {
      results.push({
        type: 'GPU VRAM Calculator',
        title: 'KV Cache & PagedAttention VRAM Sizing Tool',
        subtitle: 'Dynamic GPU memory estimator for LLaMA 7B-405B with GQA and FP8/INT4',
        tab: 'genai',
        icon: Lightbulb
      });
    }

    if (
      'psi drift concept drift population stability index adamw rmsnorm foundations'.includes(q) ||
      q.includes('psi') ||
      q.includes('drift') ||
      q.includes('adamw') ||
      q.includes('rmsnorm')
    ) {
      results.push({
        type: 'ML / DL Foundations',
        title: 'AdamW, RMSNorm & PSI Drift Evaluator',
        subtitle: 'Decoupled weight decay math, root-mean-square norm, and MLOps PSI monitor',
        tab: 'genai',
        icon: Landmark
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-teal-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a topic, formula, DSA pattern, or exam name..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {q.length < 2 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              Type at least 2 characters to search across aptitude, DSA sheets, formulas, and PYQs...
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching topics found for "{query}". Try "Time and Work", "Two Sum", or "ACID".
            </div>
          ) : (
            results.slice(0, 8).map((res, i) => {
              const Icon = res.icon;
              return (
                <button
                  key={i}
                  onClick={() => {
                    onSelectResult(res.tab);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{res.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {res.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-sm mt-0.5">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })
          )}
        </div>

        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>
            Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">Esc</kbd> to exit
          </span>
          <span className="text-teal-400 font-mono">Prep Land Instant Search</span>
        </div>
      </div>
    </div>
  );
}
