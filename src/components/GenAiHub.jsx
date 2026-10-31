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
  Check,
  Server,
  Activity,
  HardDrive,
  BarChart3,
  GitBranch,
  Search,
  Filter
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { sounds } from '../utils/audio';
import {
  AIGC_MODULES,
  ML_SYSTEM_DESIGNS,
  ML_DL_FOUNDATIONS,
  VIVA_MASTER_DECK
} from '../data/aigcAndMlData';

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
  const [activeMainTab, setActiveMainTab] = useState('tracks'); // 'tracks', 'aigc-book', 'system-design', 'foundations', 'calculators', 'viva-deck'
  const [selectedTrackId, setSelectedTrackId] = useState('201');
  const [copiedIndex, setCopiedIndex] = useState(null);

  // RAG Simulator State
  const [ragStep, setRagStep] = useState(0);

  // KV Cache Calculator State
  const [modelParams, setModelParams] = useState(70); // in Billion params
  const [contextLength, setContextLength] = useState(8192); // tokens
  const [batchSize, setBatchSize] = useState(8);
  const [precisionBytes, setPrecisionBytes] = useState(2); // 2 = FP16, 1 = FP8, 0.5 = INT4
  const [attentionType, setAttentionType] = useState('GQA'); // 'MHA', 'GQA', 'MQA'

  // PSI Calculator State
  const [expectedDist, setExpectedDist] = useState([20, 20, 20, 20, 20]); // Expected baseline %
  const [actualDist, setActualDist] = useState([12, 18, 25, 27, 18]); // Actual production %

  // Viva Filter
  const [vivaFilter, setVivaFilter] = useState('All');
  const [vivaSearch, setVivaSearch] = useState('');

  // Selected ML System Design
  const [selectedDesignId, setSelectedDesignId] = useState(ML_SYSTEM_DESIGNS[0].id);
  const activeDesign = ML_SYSTEM_DESIGNS.find((d) => d.id === selectedDesignId) || ML_SYSTEM_DESIGNS[0];

  // Selected AIGC Module
  const [selectedAigcId, setSelectedAigcId] = useState(AIGC_MODULES[0].id);
  const activeAigcModule = AIGC_MODULES.find((m) => m.id === selectedAigcId) || AIGC_MODULES[0];

  const activeTrack = GENAI_TRACKS.find((t) => t.id === selectedTrackId) || GENAI_TRACKS[1];

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    sounds.playCorrect();
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // KV Cache & Memory Computation
  // Weight Memory = ModelParams * precisionBytes (GB)
  const weightVramGB = (modelParams * precisionBytes).toFixed(1);

  // Key-Value Cache Formula:
  // For standard LLaMA-like architecture:
  // num_layers ~ 32 for 7B, 80 for 70B
  const numLayers = modelParams >= 70 ? 80 : modelParams >= 13 ? 40 : 32;
  const hiddenDim = modelParams >= 70 ? 8192 : modelParams >= 13 ? 5120 : 4096;
  const numHeads = modelParams >= 70 ? 64 : 32;
  const headDim = hiddenDim / numHeads;
  
  // KV heads factor
  const kvHeadsFactor = attentionType === 'MQA' ? (1 / numHeads) : attentionType === 'GQA' ? (8 / numHeads) : 1;
  const effectiveKvHeads = Math.max(1, Math.round(numHeads * kvHeadsFactor));

  // Bytes = 2 (K+V) * precisionBytes * numLayers * effectiveKvHeads * headDim * batchSize * contextLength
  const kvCacheBytes = 2 * precisionBytes * numLayers * effectiveKvHeads * headDim * batchSize * contextLength;
  const kvCacheGB = (kvCacheBytes / (1024 * 1024 * 1024)).toFixed(2);
  const totalVramGB = (parseFloat(weightVramGB) + parseFloat(kvCacheGB)).toFixed(1);

  // Traditional fragmented VRAM vs PagedAttention
  const fragmentedWasteGB = (parseFloat(kvCacheGB) * 0.65).toFixed(1);
  const pagedVramSavedGB = (parseFloat(kvCacheGB) * 0.61).toFixed(1);

  // GPU Recommendation
  let recommendedGpu = '1x NVIDIA RTX 4090 (24GB VRAM)';
  if (totalVramGB > 320) {
    recommendedGpu = '8x NVIDIA H100 SXM (640GB VRAM Cluster)';
  } else if (totalVramGB > 160) {
    recommendedGpu = '4x NVIDIA H100 / A100 (320GB VRAM Node)';
  } else if (totalVramGB > 80) {
    recommendedGpu = '2x NVIDIA A100 (160GB VRAM)';
  } else if (totalVramGB > 24) {
    recommendedGpu = '1x NVIDIA A100 (80GB VRAM) or 2x RTX 4090';
  }

  // Calculate live PSI
  let calculatedPsi = 0;
  for (let i = 0; i < 5; i++) {
    const act = actualDist[i] / 100;
    const exp = expectedDist[i] / 100;
    if (act > 0 && exp > 0) {
      calculatedPsi += (act - exp) * Math.log(act / exp);
    }
  }
  const formattedPsi = calculatedPsi.toFixed(4);
  let psiStatus = '🟢 Model Stable (PSI < 0.1)';
  let psiBorderColor = 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10';
  if (calculatedPsi >= 0.25) {
    psiStatus = '🔴 Significant Concept Drift — Retraining Triggered (PSI ≥ 0.25)';
    psiBorderColor = 'border-rose-500/40 text-rose-400 bg-rose-500/10';
  } else if (calculatedPsi >= 0.1) {
    psiStatus = '🟡 Moderate Shift Detected — Monitor Closely (0.1 ≤ PSI < 0.25)';
    psiBorderColor = 'border-amber-500/40 text-amber-400 bg-amber-500/10';
  }

  const RAG_STEPS = [
    {
      step: 1,
      title: 'Document Ingestion & Sanitization',
      desc: 'Raw PDFs, Markdown documentation, and relational tables are parsed, stripped of raw styling tags, sanitized, and normalized.',
      highlight: 'Input: 50-page Technical Architecture & Policy PDF'
    },
    {
      step: 2,
      title: 'Smart Recursive Chunking',
      desc: 'Splits text into 512-token segments with a 50-token overlap to maintain semantic continuity across boundaries.',
      highlight: 'Chunks Created: 42 segments with semantic boundaries'
    },
    {
      step: 3,
      title: 'Dense Vector & Sparse Lexical Embedding',
      desc: 'Generates 768-dim dense representations using BGE-Large alongside BM25 sparse inverted keyword indices.',
      highlight: 'Embeddings: 768-dim float32 vectors + BM25 tokens'
    },
    {
      step: 4,
      title: 'Hybrid Indexing & Reciprocal Rank Fusion',
      desc: 'HNSW graph index searches nearest neighbors in cosine space; BM25 catches exact IDs. RRF merges top candidate lists.',
      highlight: 'Retrieved: Top 20 candidate chunks in 12ms'
    },
    {
      step: 5,
      title: 'Cross-Encoder Reranking',
      desc: 'BGE-Reranker processes Query and candidates through full cross-attention to score precise factual alignment.',
      highlight: 'Filtered: Top 3 ultra-high precision chunks selected'
    },
    {
      step: 6,
      title: 'Context Injection & Generation',
      desc: 'Synthesizes grounded final answer with explicit citations and confidence scores, mitigating hallucinations.',
      highlight: 'Output: Fully cited factual answer with zero hallucination'
    }
  ];

  // Filter Viva Cards
  const filteredViva = VIVA_MASTER_DECK.filter((item) => {
    const matchesFilter = vivaFilter === 'All' || item.tag.toLowerCase().includes(vivaFilter.toLowerCase());
    const matchesSearch =
      vivaSearch === '' ||
      item.q.toLowerCase().includes(vivaSearch.toLowerCase()) ||
      item.ans.toLowerCase().includes(vivaSearch.toLowerCase()) ||
      item.company.toLowerCase().includes(vivaSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16 text-slate-100">
      {/* Glossy Header Bar */}
      <div className="p-8 rounded-[32px] bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Engineering & ML Systems
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20">
                AIGC-Interview-Book • interviews.ai
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              AIGC, GenAI & ML System Design Master Hub
            </h1>
            <p className="text-xs lg:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Distilled from premier open-source engineering curricula. Master Transformers, Latent Diffusion, LoRA/QLoRA,
              Direct Preference Optimization (DPO), Two-Tower Recommendations, Real-time Fraud Streaming, and KV Cache math.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onAskMentor && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onAskMentor('Provide a mock AI Systems and AIGC technical interview with 3 challenging questions on KV Cache optimization, DPO vs PPO, and Two-Tower recommendation ranking.');
                }}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
              >
                <Brain className="w-4 h-4 text-teal-200" />
                <span>Simulate AI Tech Interview</span>
              </button>
            )}
          </div>
        </div>

        {/* Multi-Tab Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          {[
            { id: 'tracks', label: '101-301 Curated Tracks', icon: Layers },
            { id: 'aigc-book', label: 'AIGC & Diffusion Masterclass', icon: Sparkles },
            { id: 'system-design', label: 'ML System Design Studio', icon: Network },
            { id: 'foundations', label: 'ML / DL Foundations', icon: Brain },
            { id: 'calculators', label: 'Live Calculators & Simulators', icon: Activity },
            { id: 'viva-deck', label: 'Master Viva Deck (FAANG)', icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeMainTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveMainTab(tab.id);
                  sounds.playClick();
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/40'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: 101-301 CURATED TRACKS (awesome-generative-ai-guide) */}
      {activeMainTab === 'tracks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {GENAI_TRACKS.map((track) => {
              const isSelected = track.id === selectedTrackId;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    setSelectedTrackId(track.id);
                    sounds.playClick();
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
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

                {t.formula && (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 text-center font-mono text-teal-400 text-sm overflow-x-auto">
                    <MathRenderer content={t.formula} inline={false} />
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
                  <strong className="text-indigo-300 block mb-0.5">💡 Core Architectural Takeaway:</strong>
                  <p className="leading-relaxed">{t.keyTakeaway}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      FAANG / AI Engineer Viva Question:
                    </span>
                    <button
                      onClick={() => handleCopyText(idx, `${t.vivaQ}\n\nAnswer: ${t.vivaAns}`)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
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
                        onClick={() => {
                          sounds.playClick();
                          onAskMentor(`Explain the technical concepts behind "${t.title}": ${t.vivaQ} with an architectural code example and trade-off analysis.`);
                        }}
                        className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition cursor-pointer"
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

      {/* TAB 2: AIGC & DIFFUSION MASTERCLASS (WeThinkIn/AIGC-Interview-Book) */}
      {activeMainTab === 'aigc-book' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Module Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider mb-2">
              AIGC Curriculum Modules
            </h3>
            {AIGC_MODULES.map((mod) => {
              const isSelected = mod.id === selectedAigcId;
              return (
                <div
                  key={mod.id}
                  onClick={() => {
                    setSelectedAigcId(mod.id);
                    sounds.playClick();
                  }}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                      : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-teal-400 font-bold uppercase">{mod.category}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {mod.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{mod.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{mod.summary}</p>
                </div>
              );
            })}
          </div>

          {/* Right Module Details */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase">{activeAigcModule.badge}</span>
              <h2 className="text-lg font-bold text-white mt-1">{activeAigcModule.title}</h2>
              <p className="text-xs text-slate-300 mt-1">{activeAigcModule.summary}</p>
            </div>

            {/* Formula Block */}
            {activeAigcModule.formula && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono text-teal-300 text-sm overflow-x-auto shadow-inner">
                <span className="text-[10px] text-slate-500 font-mono block mb-1">GOVERNING MATHEMATICAL EQUATION</span>
                <MathRenderer content={activeAigcModule.formula} inline={false} />
              </div>
            )}

            {/* Core Takeaway */}
            <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/20 text-xs text-slate-200">
              <strong className="text-teal-300 block mb-1">⚡ Architectural Pillar:</strong>
              <p className="leading-relaxed">{activeAigcModule.keyTakeaway}</p>
            </div>

            {/* Technical Sub-sections */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                In-Depth Technical Concepts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeAigcModule.details.map((d, dIdx) => (
                  <div key={dIdx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                    <span className="text-xs font-bold text-indigo-300 block">{d.sub}</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{d.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Yield Viva Box */}
            <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  AIGC Interview Viva Target:
                </span>
                <button
                  onClick={() => handleCopyText('aigc-viva', `${activeAigcModule.viva.q}\n\n${activeAigcModule.viva.ans}`)}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedIndex === 'aigc-viva' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === 'aigc-viva' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-bold text-white text-xs">{activeAigcModule.viva.q}</p>
              <p className="text-slate-300 leading-relaxed font-sans pl-3 border-l-2 border-amber-400/50 pt-0.5">
                {activeAigcModule.viva.ans}
              </p>
              {onAskMentor && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onAskMentor(`Deep dive into AIGC concept: "${activeAigcModule.title}". Specifically explain: ${activeAigcModule.viva.q} with math derivation and practical code.`);
                    }}
                    className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask Mentor to Explain Trade-offs</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ML SYSTEM DESIGN STUDIO (BoltzmannEntropy/interviews.ai) */}
      {activeMainTab === 'system-design' && (
        <div className="space-y-6">
          {/* Design Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ML_SYSTEM_DESIGNS.map((design) => {
              const isSelected = design.id === selectedDesignId;
              return (
                <button
                  key={design.id}
                  onClick={() => {
                    setSelectedDesignId(design.id);
                    sounds.playClick();
                  }}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500 shadow-lg ring-2 ring-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <span className="text-[10px] font-mono text-amber-400 font-bold block">{design.company}</span>
                  <h4 className="text-xs font-bold text-white mt-1 leading-snug">{design.title}</h4>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">{design.scale}</span>
                </button>
              );
            })}
          </div>

          {/* Active System Design Pipeline Canvas */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold">{activeDesign.company} ARCHITECTURE</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{activeDesign.title}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">{activeDesign.scale}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                  Target SLA &lt; 50ms
                </span>
              </div>
            </div>

            {/* Step-by-Step Production Pipeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Multi-Stage Pipeline Execution
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {activeDesign.stages.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                        <span className="text-teal-400 font-bold">STAGE {sIdx + 1}</span>
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                          {st.sla}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white mb-1">{st.name}</h5>
                      <span className="text-[11px] text-amber-300 font-mono block mb-2">{st.engine}</span>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{st.details}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-850 text-[10px] font-mono text-slate-400 space-y-0.5">
                      <div><span className="text-slate-500">In:</span> {st.input}</div>
                      <div><span className="text-slate-500">Out:</span> {st.output}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Highlights & Trade-offs */}
            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
              <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                Production Architecture Highlights & Scalability Strategies
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5">
                {activeDesign.architectureHighlights.map((hl, hlIdx) => (
                  <li key={hlIdx} className="leading-relaxed">{hl}</li>
                ))}
              </ul>
            </div>

            {/* System Design Viva */}
            <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Staff / Senior ML System Design Question:
                </span>
                <button
                  onClick={() => handleCopyText('sys-viva', `${activeDesign.viva.q}\n\n${activeDesign.viva.ans}`)}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedIndex === 'sys-viva' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === 'sys-viva' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-bold text-white text-xs">{activeDesign.viva.q}</p>
              <p className="text-slate-300 leading-relaxed font-sans pl-3 border-l-2 border-amber-400/50 pt-0.5">
                {activeDesign.viva.ans}
              </p>
              {onAskMentor && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onAskMentor(`Act as a FAANG Staff ML Engineer conducting a System Design interview. Ask me to design the full "${activeDesign.title}", evaluate my candidate retrieval, ranking objective, and online A/B testing strategy.`);
                    }}
                    className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run Interactive Mock System Design</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ML / DL FOUNDATIONS (BoltzmannEntropy/interviews.ai) */}
      {activeMainTab === 'foundations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ML_DL_FOUNDATIONS.map((f, fIdx) => (
              <div
                key={fIdx}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-white">{f.topic}</h3>
                    <span className="w-6 h-6 rounded-lg bg-teal-500/10 text-teal-400 font-mono text-xs flex items-center justify-center font-bold">
                      {fIdx + 1}
                    </span>
                  </div>

                  {f.formula && (
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-850 text-center font-mono text-teal-300 text-xs overflow-x-auto">
                      <MathRenderer content={f.formula} inline={false} />
                    </div>
                  )}

                  <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300">
                    <strong className="text-indigo-300 block mb-0.5">Core Theoretical Insight:</strong>
                    <p className="leading-relaxed">{f.takeaway}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    {f.breakdown.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-1.5">
                        <span className="text-teal-400 text-sm leading-none">•</span>
                        <p className="leading-relaxed">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">
                      Oral Exam / Viva Drill:
                    </span>
                    <button
                      onClick={() => handleCopyText(`found-${fIdx}`, `${f.vivaQ}\n\n${f.vivaAns}`)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      {copiedIndex === `found-${fIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === `found-${fIdx}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="font-bold text-white text-xs">{f.vivaQ}</p>
                  <p className="text-slate-300 leading-relaxed font-sans">{f.vivaAns}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: LIVE CALCULATORS & SIMULATORS */}
      {activeMainTab === 'calculators' && (
        <div className="space-y-8">
          {/* CALCULATOR 1: KV CACHE & VRAM SIZING ESTIMATOR */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4" />
                  GPU VRAM & KV Cache Inference Sizing
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  PagedAttention (vLLM) vs Contiguous Allocation Calculator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Calculates exact model parameter weights, runtime KV Cache consumption, and memory saved via PagedAttention.
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs font-bold text-right">
                {recommendedGpu}
              </div>
            </div>

            {/* Input Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
              <div>
                <label className="text-slate-400 font-mono block mb-1">Model Parameters:</label>
                <select
                  value={modelParams}
                  onChange={(e) => setModelParams(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                >
                  <option value={7}>7 Billion (e.g. Mistral 7B)</option>
                  <option value={13}>13 Billion (e.g. LLaMA-2 13B)</option>
                  <option value={70}>70 Billion (e.g. LLaMA-3 70B)</option>
                  <option value={405}>405 Billion (e.g. LLaMA-3.1 405B)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Precision (Weights & KV):</label>
                <select
                  value={precisionBytes}
                  onChange={(e) => setPrecisionBytes(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                >
                  <option value={2}>FP16 / BF16 (2 Bytes/param)</option>
                  <option value={1}>FP8 (1 Byte/param)</option>
                  <option value={0.5}>INT4 (0.5 Bytes/param)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Context Length (Tokens):</label>
                <select
                  value={contextLength}
                  onChange={(e) => setContextLength(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                >
                  <option value={2048}>2,048 (Standard)</option>
                  <option value={4096}>4,096 (Standard Chat)</option>
                  <option value={8192}>8,192 (Long Context)</option>
                  <option value={32768}>32,768 (Document Analysis)</option>
                  <option value={131072}>131,072 (Ultra-Long 128k)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Concurrent Batch Size:</label>
                <select
                  value={batchSize}
                  onChange={(e) => setBatchSize(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                >
                  <option value={1}>Batch = 1 (Single User)</option>
                  <option value={4}>Batch = 4 (Light Server)</option>
                  <option value={8}>Batch = 8 (Production Engine)</option>
                  <option value={16}>Batch = 16 (High Throughput)</option>
                  <option value={32}>Batch = 32 (Enterprise Cluster)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Attention Mechanism:</label>
                <select
                  value={attentionType}
                  onChange={(e) => setAttentionType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                >
                  <option value="GQA">Grouped-Query (GQA - 8 KV heads)</option>
                  <option value="MHA">Multi-Head (MHA - 64 KV heads)</option>
                  <option value="MQA">Multi-Query (MQA - 1 KV head)</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Model Weights VRAM</span>
                <span className="text-2xl font-extrabold text-white mt-1 block">{weightVramGB} <span className="text-sm font-normal text-slate-400">GB</span></span>
                <span className="text-[10px] text-slate-500 font-mono">Parameters in memory</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-teal-400 uppercase block">Runtime KV Cache VRAM</span>
                <span className="text-2xl font-extrabold text-teal-300 mt-1 block">{kvCacheGB} <span className="text-sm font-normal text-slate-400">GB</span></span>
                <span className="text-[10px] text-slate-500 font-mono">{attentionType} with {effectiveKvHeads} KV heads</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-indigo-400 uppercase block">Total Minimum VRAM</span>
                <span className="text-2xl font-extrabold text-indigo-300 mt-1 block">{totalVramGB} <span className="text-sm font-normal text-slate-400">GB</span></span>
                <span className="text-[10px] text-slate-500 font-mono">Excluding CUDA context</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-center">
                <span className="text-[10px] font-mono text-emerald-400 uppercase block">PagedAttention Savings</span>
                <span className="text-2xl font-extrabold text-emerald-300 mt-1 block">~{pagedVramSavedGB} <span className="text-sm font-normal text-slate-400">GB</span></span>
                <span className="text-[10px] text-emerald-400/80 font-mono">Avoids contiguous waste</span>
              </div>
            </div>
          </div>

          {/* CALCULATOR 2: CONCEPT DRIFT & POPULATION STABILITY INDEX (PSI) */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" />
                  MLOps Production Monitor
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Population Stability Index (PSI) Drift Evaluator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Formula: \(\text{PSI} = \sum (A_i - E_i) \times \ln(A_i / E_i)\). Measures distribution shift between baseline test scores and production traffic.
                </p>
              </div>

              <div className={`px-4 py-2 rounded-2xl border font-mono text-xs font-bold ${psiBorderColor}`}>
                {psiStatus}
              </div>
            </div>

            {/* Slider / Value Adjusters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Production Actual Frequency Bins (%):</span>
                <span className="font-mono font-bold text-white">Live PSI Metric = {formattedPsi}</span>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {actualDist.map((val, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-850 space-y-2 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">Bin {idx + 1} (Score {(idx * 20)}-{(idx + 1) * 20})</span>
                    <input
                      type="range"
                      min={5}
                      max={45}
                      value={val}
                      onChange={(e) => {
                        const newDist = [...actualDist];
                        newDist[idx] = Number(e.target.value);
                        setActualDist(newDist);
                      }}
                      className="w-full accent-teal-400 cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">Exp: 20%</span>
                      <span className="text-teal-300 font-bold">Act: {val}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIMULATOR 3: 6-STEP RAG VISUALIZER */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                  END-TO-END RAG ARCHITECTURE
                </span>
                <h3 className="text-lg font-bold text-white">Retrieval-Augmented Generation Step Simulator</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Step through the production retrieval-augmented pipeline step by step.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRagStep(Math.max(0, ragStep - 1));
                    sounds.playClick();
                  }}
                  disabled={ragStep === 0}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Prev Step
                </button>
                <button
                  onClick={() => {
                    setRagStep(Math.min(RAG_STEPS.length - 1, ragStep + 1));
                    sounds.playClick();
                  }}
                  disabled={ragStep === RAG_STEPS.length - 1}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                >
                  Next Step
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {RAG_STEPS.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setRagStep(idx);
                    sounds.playClick();
                  }}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    ragStep === idx
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono block opacity-75">STEP 0{st.step}</span>
                  <span className="text-xs font-bold block mt-1 line-clamp-1">{st.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-teal-400 font-bold">
                  STEP {RAG_STEPS[ragStep].step}: {RAG_STEPS[ragStep].title}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {RAG_STEPS[ragStep].highlight}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{RAG_STEPS[ragStep].desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: MASTER VIVA DECK (FAANG & AI STARTUPS) */}
      {activeMainTab === 'viva-deck' && (
        <div className="space-y-6">
          {/* Search & Filter Header */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {['All', 'Foundations', 'Architecture', 'Inference', 'Fine-Tuning', 'Alignment', 'Diffusion', 'System Design', 'MLOps'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setVivaFilter(cat);
                    sounds.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    vivaFilter === cat
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search question, keyword, company..."
                value={vivaSearch}
                onChange={(e) => setVivaSearch(e.target.value)}
                className="w-72 bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Viva Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredViva.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-md flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                      {item.tag}
                    </span>
                    <span className="text-amber-400 font-bold">{item.company}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-2 leading-snug">{item.q}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.ans}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  {onAskMentor ? (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onAskMentor(`Explain the technical interview question: "${item.q}" with production architecture context, trade-offs, and follow-up viva traps.`);
                      }}
                      className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ask Mentor</span>
                    </button>
                  ) : <div />}
                  <button
                    onClick={() => handleCopyText(`viva-${idx}`, `${item.q}\n\n${item.ans}`)}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copiedIndex === `viva-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === `viva-${idx}` ? 'Copied' : 'Copy Card'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
