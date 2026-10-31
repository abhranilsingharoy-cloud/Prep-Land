import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Brain,
  Database,
  Layers,
  Network,
  Zap,
  CheckCircle2,
  BookOpen,
  Code2,
  ExternalLink,
  ChevronRight,
  Shield,
  ArrowRight,
  Sliders,
  Terminal,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { sounds } from '../utils/audio';

// 3 Tracks distilled from aishwaryanr/awesome-generative-ai-guide
const GENAI_TRACKS = [
  {
    id: '101',
    name: '101: LLM Foundations & Prompt Engineering',
    badge: 'Foundations',
    color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    topics: [
      {
        title: 'Transformer Architecture & Self-Attention',
        summary: 'How Scaled Dot-Product Attention works under the hood.',
        formula: '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V',
        keyTakeaway: 'The scaling factor 1/√d_k prevents dot-product values from growing extremely large in high dimensions, which would cause the softmax function to have tiny gradients.',
        vivaQ: 'Why do we divide by sqrt(d_k) in Scaled Dot-Product Attention?',
        vivaAns: 'For large values of d_k, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients (vanishing gradient problem). Dividing by sqrt(d_k) stabilizes the variance of the logits to 1.'
      },
      {
        title: 'Context Window & RoPE (Rotary Position Embeddings)',
        summary: 'Encoding positional information without absolute additive vectors.',
        formula: 'R_{\\Theta, m}^d x_m',
        keyTakeaway: 'RoPE applies a complex rotation to query and key vectors so that the inner product between them depends solely on relative distance (m - n), enabling superior context length extrapolation.',
        vivaQ: 'What is the advantage of Rotary Position Embeddings (RoPE) over absolute position encodings?',
        vivaAns: 'RoPE naturally decays attention scores as relative token distance increases, supports relative position decay, and generalizes significantly better to longer context lengths than trained absolute embeddings.'
      },
      {
        title: 'Prompt Engineering Patterns (Zero-Shot, Few-Shot & CoT)',
        summary: 'Eliciting structured reasoning without parameter fine-tuning.',
        formula: '\\text{Input} \\rightarrow \\text{Few-Shot Exemplars} \\rightarrow \\text{Step-by-Step Rationale} \\rightarrow \\text{Final Answer}',
        keyTakeaway: 'Chain-of-Thought (CoT) prompting enables LLMs to decompose complex multi-step reasoning problems into intermediate steps, reducing arithmetic and deduction hallucinations by up to 60%.',
        vivaQ: 'When does Few-Shot prompting fail and require Fine-Tuning?',
        vivaAns: 'Few-shot fails when teaching entirely new domain knowledge, strict latency budgets forbid lengthy exemplar tokens, or the output requires rigid syntax conformity across millions of production calls.'
      }
    ]
  },
  {
    id: '201',
    name: '201: Production RAG & Vector Systems',
    badge: 'Core Architecture',
    color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
    topics: [
      {
        title: 'RAG Pipeline: Chunking & Hybrid Search',
        summary: 'Combining Dense Vector Retrieval with Sparse BM25 Keyword Search.',
        formula: '\\text{Hybrid Score} = \\alpha \\cdot \\text{DenseScore} + (1 - \\alpha) \\cdot \\text{BM25Score}',
        keyTakeaway: 'Dense vector search understands semantics and intent, while BM25 excels at exact keyword matching (part numbers, IDs, legal codes). Reciprocal Rank Fusion (RRF) merges both rankings effectively.',
        vivaQ: 'How do you prevent the "Lost in the Middle" problem in RAG?',
        vivaAns: 'By placing the most relevant retrieved chunks at the very beginning and very end of the prompt context window, using rerankers (like Cohere Rerank / BGE-Reranker), and filtering low-similarity chunks.'
      },
      {
        title: 'Vector Indexing: HNSW vs IVF-PQ',
        summary: 'Hierarchical Navigable Small World graphs vs Inverted File with Product Quantization.',
        formula: '\\text{Similarity} = \\cos(\\theta) = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}',
        keyTakeaway: 'HNSW provides high recall (>98%) and lightning-fast queries at the cost of higher RAM usage. IVF-PQ compresses vector footprints by 80–90% for hundred-million-scale datasets.',
        vivaQ: 'What is the trade-off between Cosine Similarity and Dot Product in vector search?',
        vivaAns: 'If vectors are L2-normalized during embedding generation, Dot Product is mathematically identical to Cosine Similarity but computationally faster because division by vector magnitudes is eliminated.'
      },
      {
        title: 'Advanced RAG: HyDE & Parent Document Retrieval',
        summary: 'Hypothetical Document Embeddings and small-to-big chunk mapping.',
        formula: '\\text{Query} \\xrightarrow{\\text{LLM}} \\text{Hypothetical Doc} \\xrightarrow{\\text{Embed}} \\text{Vector Search}',
        keyTakeaway: 'HyDE generates a hypothetical answer first, then uses that answer to search vector space. This bridges the semantic gap between questions and documentary answers.',
        vivaQ: 'Why use Parent Document Retrieval over simple recursive chunking?',
        vivaAns: 'Small chunks (e.g. 128 tokens) are ideal for fine-grained vector similarity search, but lack context for LLM generation. Parent document retrieval searches small chunks but feeds the larger parent section (1024 tokens) to the model.'
      }
    ]
  },
  {
    id: '301',
    name: '301: AI Agents, Workflows & Production LLMOps',
    badge: 'Advanced & System Design',
    color: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    topics: [
      {
        title: 'Agentic Architectures: ReAct & Plan-and-Solve',
        summary: 'Interleaving Reasoning (Thought), Action (Tool Calling), and Observation.',
        formula: '\\text{Thought} \\rightarrow \\text{Action(Tool, Input)} \\rightarrow \\text{Observation} \\rightarrow \\text{Final Answer}',
        keyTakeaway: 'Autonomous agents maintain state across multiple tool execution loops, self-correcting when an API returns an error or empty result.',
        vivaQ: 'How do you prevent an AI agent from entering an infinite execution loop?',
        vivaAns: 'Enforce strict max-iteration limits (e.g. 6 steps), implement loop detection on duplicate tool inputs, use timeout budgets, and mandate human-in-the-loop checkpoints for state-mutating actions.'
      },
      {
        title: 'Model Quantization: GGUF, AWQ & GPTQ',
        summary: 'Running 70B parameter models on consumer hardware without perplexity degradation.',
        formula: 'W_{\\text{quant}} = \\text{round}\\left(\\frac{W}{\\text{scale}}\\right)',
        keyTakeaway: 'AWQ (Activation-aware Weight Quantization) protects the 1% most salient outlier weights while quantizing the remaining 99% to 4 bits, preserving reasoning capability with 75% VRAM reduction.',
        vivaQ: 'What is the difference between Post-Training Quantization (PTQ) and QLoRA?',
        vivaAns: 'PTQ compresses weights after training without gradient updates. QLoRA quantizes the base model to 4-bit (NF4) and attaches full-precision 16-bit LoRA adapter matrices to train new capabilities with low VRAM.'
      },
      {
        title: 'LLM Evaluation: Ragas, TruLens & LLM-as-a-Judge',
        summary: 'Measuring Faithfulness, Answer Relevance, and Context Precision.',
        formula: '\\text{Faithfulness} = \\frac{\\text{Supported Claims in Answer}}{\\text{Total Claims in Answer}}',
        keyTakeaway: 'Automated evaluation pipelines test generation against retrieved contexts to detect hallucinations before production deployments.',
        vivaQ: 'What are the biases of LLM-as-a-Judge and how do you mitigate them?',
        vivaAns: 'LLM judges suffer from position bias (favoring candidate A over B), verbosity bias (favoring longer answers), and self-enhancement bias. Mitigate by swapping candidate order, using multi-judge consensus, and calibrating against human gold benchmarks.'
      }
    ]
  }
];

export default function GenAiHub({ onAskMentor }) {
  const [activeTab, setActiveTab] = useState('tracks'); // 'tracks', 'rag-visualizer', 'viva-deck'
  const [selectedTrackId, setSelectedTrackId] = useState('201');
  const [ragStep, setRagStep] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const activeTrack = GENAI_TRACKS.find((t) => t.id === selectedTrackId) || GENAI_TRACKS[1];

  const RAG_STEPS = [
    {
      step: 1,
      title: 'Document Ingestion & Cleaning',
      desc: 'Raw PDFs, Markdown docs, and database tables are stripped of HTML tags, sanitized, and normalized.',
      highlight: 'Input: 50-page Employee Handbook PDF'
    },
    {
      step: 2,
      title: 'Smart Recursive Chunking',
      desc: 'Splits text into 512-token segments with 50-token overlap to maintain boundary context.',
      highlight: 'Chunks Created: 42 segments with semantic boundaries'
    },
    {
      step: 3,
      title: 'Vector Embedding Generation',
      desc: 'Chunks are converted into 1536-dimensional dense numerical vectors capturing semantic meaning.',
      highlight: 'Model: text-embedding-3-small (1536-d float array)'
    },
    {
      step: 4,
      title: 'Vector Database Indexing (HNSW)',
      desc: 'Embeddings stored in vector index with metadata filters (department, access level, date).',
      highlight: 'Storage: pgvector / Pinecone / Chroma with HNSW graph'
    },
    {
      step: 5,
      title: 'Query Embedding & Hybrid Retrieval',
      desc: 'User question is embedded and matched using Cosine Similarity combined with BM25 keyword search.',
      highlight: 'Top-3 Chunks Retrieved with Cosine Similarity > 0.84'
    },
    {
      step: 6,
      title: 'Prompt Augmentation & LLM Generation',
      desc: 'Retrieved chunks injected into system prompt as factual context with hallucination guardrails.',
      highlight: 'Prompt: "Answer ONLY using the provided context below. Cite chunk sources."'
    }
  ];

  const handleCopyText = (idx, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    sounds.playClick();
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Awesome Generative AI Guide attribution */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Awesome Generative AI Guide • 101 to 301 Roadmap
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-400" />
            GenAI & AI Engineering Prep Hub
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Master Transformers, RAG Systems, Autonomous Agents, and Production LLMOps for AI Engineer & SDE Interviews.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-2xl border border-slate-700">
          <button
            onClick={() => { setActiveTab('tracks'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'tracks' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Curated Tracks (101-301)
          </button>
          <button
            onClick={() => { setActiveTab('rag-visualizer'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'rag-visualizer' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            RAG Step Visualizer
          </button>
          <button
            onClick={() => { setActiveTab('viva-deck'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'viva-deck' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Interview Viva Deck
          </button>
        </div>
      </div>

      {/* VIEW 1: CURATED TRACKS (101, 201, 301) */}
      {activeTab === 'tracks' && (
        <div className="space-y-6">
          {/* Level Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {GENAI_TRACKS.map((track) => {
              const isSelected = track.id === selectedTrackId;
              return (
                <button
                  key={track.id}
                  onClick={() => { setSelectedTrackId(track.id); sounds.playClick(); }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${track.color}`}>
                    {track.badge}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-2 leading-snug">{track.name}</h4>
                </button>
              );
            })}
          </div>

          {/* Detailed Topic Cards */}
          <div className="space-y-5">
            {activeTrack.topics.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    {t.title}
                  </h3>
                  <span className="text-xs text-slate-400">{t.summary}</span>
                </div>

                {/* Math / Formula Rendering */}
                {t.formula && (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 text-center font-mono text-teal-400 text-sm">
                    <MathRenderer content={t.formula} inline={false} />
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
                  <strong className="text-indigo-300 block mb-0.5">💡 Core Architectural Takeaway:</strong>
                  <p className="leading-relaxed">{t.keyTakeaway}</p>
                </div>

                {/* High-Frequency Interview Viva */}
                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      FAANG / AI Engineer Viva Question:
                    </span>
                    <button
                      onClick={() => handleCopyText(idx, `${t.vivaQ}\n\nAnswer: ${t.vivaAns}`)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy Viva Card'}</span>
                    </button>
                  </div>

                  <p className="font-bold text-white text-xs">{t.vivaQ}</p>
                  <p className="text-slate-300 leading-relaxed font-sans pl-3 border-l-2 border-amber-400/50 pt-0.5">
                    {t.vivaAns}
                  </p>
                  {onAskMentor && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onAskMentor(`Explain the technical concepts behind "${t.title}": ${t.vivaQ} with an architectural code example and trade-off analysis.`)}
                        className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Deep Dive with AI Mentor</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: RAG STEP VISUALIZER */}
      {activeTab === 'rag-visualizer' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold">END-TO-END RAG ARCHITECTURE</span>
              <h3 className="text-lg font-bold text-white">Retrieval-Augmented Generation Step Simulator</h3>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Step {ragStep + 1} of {RAG_STEPS.length}
            </div>
          </div>

          {/* Stepper Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-2">
            {RAG_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => { setRagStep(idx); sounds.playClick(); }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  ragStep === idx
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                    : idx < ragStep
                    ? 'bg-slate-800/80 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold">0{s.step}</span>
                  {idx < ragStep && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <h5 className="text-[11px] font-bold leading-tight line-clamp-2">{s.title.split(' ')[0]}</h5>
              </button>
            ))}
          </div>

          {/* Active Step Showcase Card */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
                Step {RAG_STEPS[ragStep].step}: {RAG_STEPS[ragStep].title}
              </span>
              <span className="text-xs text-slate-500 font-mono">Pipeline Phase</span>
            </div>

            <p className="text-sm font-semibold text-slate-100 leading-relaxed">
              {RAG_STEPS[ragStep].desc}
            </p>

            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 font-mono text-xs flex items-center justify-between">
              <span>{RAG_STEPS[ragStep].highlight}</span>
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                disabled={ragStep === 0}
                onClick={() => { setRagStep((s) => s - 1); sounds.playClick(); }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-30 text-xs font-semibold"
              >
                Previous Step
              </button>

              <button
                disabled={ragStep === RAG_STEPS.length - 1}
                onClick={() => { setRagStep((s) => s + 1); sounds.playClick(); }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs disabled:opacity-30 shadow"
              >
                Next Architecture Step
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: AI INTERVIEW VIVA DECK */}
      {activeTab === 'viva-deck' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              q: 'What is the difference between Fine-Tuning and RAG, and when do you choose which?',
              ans: 'RAG is dynamic, real-time, cites exact sources, and avoids hallucinating changing facts without expensive retraining. Fine-tuning is used for style adaptation, syntax conformity, and teaching new behavioral nuances where factual references do not change frequently.',
              tag: 'System Design',
              level: 'High Yield'
            },
            {
              q: 'Explain Temperature, Top-P (Nucleus Sampling), and Top-K.',
              ans: 'Temperature flattens or sharpens logit probability distributions (lower = deterministic, higher = creative). Top-K restricts sampling to the K most likely tokens. Top-P dynamically samples from the smallest set of tokens whose cumulative probability exceeds P.',
              tag: 'LLM Fundamentals',
              level: 'Standard Viva'
            },
            {
              q: 'What is DPO (Direct Preference Optimization) and why is it replacing RLHF?',
              ans: 'Standard RLHF requires training an independent Reward Model and optimizing via PPO (which is unstable and memory-heavy). DPO mathematically reparameterizes the reward function to optimize policy directly on preference pairs (chosen vs rejected) using simple binary cross-entropy loss.',
              tag: 'Alignment & Training',
              level: 'Advanced'
            },
            {
              q: 'How does FlashAttention optimize Transformer self-attention speed and memory?',
              ans: 'Standard attention writes intermediate N×N attention matrices to slow GPU HBM memory. FlashAttention tiles the Q, K, V matrices into fast GPU SRAM and uses online softmax scaling to compute attention in a single fused GPU kernel without materializing the huge N×N matrix.',
              tag: 'GPU & Performance',
              level: 'Production'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    {item.tag}
                  </span>
                  <span className="text-amber-400 font-bold">{item.level}</span>
                </div>
                <h4 className="text-xs font-bold text-white mb-2 leading-snug">{item.q}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.ans}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                {onAskMentor ? (
                  <button
                    onClick={() => onAskMentor(`Explain the technical interview question: "${item.q}" with production architecture context and follow-up viva traps.`)}
                    className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask Mentor</span>
                  </button>
                ) : <div />}
                <button
                  onClick={() => handleCopyText(idx + 10, `${item.q}\n\n${item.ans}`)}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  {copiedIndex === idx + 10 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === idx + 10 ? 'Copied' : 'Copy Card'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
