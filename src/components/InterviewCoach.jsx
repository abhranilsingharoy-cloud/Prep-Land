import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Award,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  MessageSquare,
  Building2,
  Send,
  RotateCcw,
  User,
  Bot,
  HelpCircle,
  Layers,
  Volume2,
  Mic,
  StopCircle,
  Clock,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePrepLand } from '../context/PrepLandContext';
import { sounds } from '../utils/audio';
import ShipingCopilot from './ShipingCopilot';

const SUPPORTED_COMPANIES = [
  'Amazon SDE-1',
  'Google Software Engineer',
  'Microsoft Software Engineer',
  'TCS (Ninja / Digital / Prime)',
  'Infosys (DSE / Specialist Programmer)',
  'Accenture (ASE / FSE)',
  'Cognizant GenC Next',
  'Wipro Elite / Turbo',
  'Flipkart SDE',
  'Goldman Sachs Analyst',
  'Deloitte Consulting',
  'McKinsey / BCG Associate'
];

const PREP_PACKS = {
  'Amazon SDE-1': {
    difficulty: 'Hard',
    rounds: [
      {
        name: 'Round 1: Online Assessment (OA)',
        questions: [
          { q: 'Two Sum variation with flight duration and buffer minutes', expected: 'HashMap lookup in O(N) time and O(N) space.' },
          { q: 'Critical Connections in a Network (Bridges in a Graph)', expected: 'Tarjan\'s DFS with discovery and low-link array in O(V + E).' },
          { q: 'Reorganize String such that no two adjacent characters match', expected: 'Max-Heap / PriorityQueue greedy placement in O(N log K).' },
          { q: 'Word Ladder shortest transformation sequence', expected: 'Bidirectional BFS traversal with visited set in O(M^2 * N).' },
          { q: 'Work Styles Assessment: Customer Obsession trade-offs', expected: 'Prioritizing customer long-term trust over short-term revenue metric.' }
        ]
      },
      {
        name: 'Round 2: Technical & Low-Level Design',
        questions: [
          { q: 'Design an in-memory Key-Value store with TTL and transactions', expected: 'Hash map with min-heap / priority queue for expiration and undo stack.' },
          { q: 'Serialize and Deserialize a Binary Tree', expected: 'Pre-order traversal with delimiter and null placeholders in O(N).' },
          { q: 'Course Schedule II (Topological Sort)', expected: 'Kahn\'s algorithm (indegree array + queue) or DFS cycle detection.' },
          { q: 'Design an LRU Cache with O(1) get and put', expected: 'Doubly Linked List combined with Hash Map.' },
          { q: 'Median of Two Sorted Arrays in O(log(min(M, N)))', expected: 'Binary search on partition points.' }
        ]
      },
      {
        name: 'Round 3: Bar Raiser & Leadership Principles',
        questions: [
          { q: 'Tell me about a time you took a calculated risk and failed.', expected: 'STAR format with clear ownership (I, not we) and quantified learnings.' },
          { q: 'Give an example of when you had to make a decision with incomplete data.', expected: 'Bias for Action principle, contingency mitigation steps.' },
          { q: 'Describe a time you simplified a complex legacy process.', expected: 'Invent & Simplify principle, measuring time saved for team.' },
          { q: 'Tell me about a time you disagreed with your manager.', expected: 'Have Backbone; Disagree & Commit with objective benchmark data.' },
          { q: 'How do you ensure code scalability under 10x traffic spikes?', expected: 'Horizontally scaled stateless workers + asynchronous message queues.' }
        ]
      }
    ],
    tips: 'Every behavioral answer MUST map to 1 of Amazon\'s 16 Leadership Principles. Never say "we" without defining your personal contribution.'
  },
  'TCS (Ninja / Digital / Prime)': {
    difficulty: 'Medium',
    rounds: [
      {
        name: 'Round 1: TCS NQT Cognitive & Coding',
        questions: [
          { q: 'Time and Work combined rates with alternating working days', expected: 'LCM efficiency method with 2-day work cycle computation.' },
          { q: 'Subarray with maximum sum (Kadane\'s Algorithm)', expected: 'Single pass running sum tracking max_so_far in O(N) time.' },
          { q: 'Syllogisms with "Only a few" deductions', expected: 'Venn diagram checking definite vs possibility overlap.' },
          { q: 'Find prime factors of large integer', expected: 'Trial division up to sqrt(N) after factoring out 2.' },
          { q: 'Sentence correction and active/passive voice transformation', expected: 'Subject-verb agreement and tense consistency.' }
        ]
      },
      {
        name: 'Round 2: Technical Interview',
        questions: [
          { q: 'Explain 4 pillars of OOP with code example in Java/C++', expected: 'Encapsulation, Abstraction, Inheritance, Polymorphism.' },
          { q: 'Difference between clustered and non-clustered index in SQL', expected: 'Physical ordering on disk vs separate lookup pointer tree.' },
          { q: 'What is Paging in OS and what causes a Page Fault?', expected: 'Address translation via page table; fault occurs when page not in RAM.' },
          { q: 'Explain the architecture and tech stack of your final year project', expected: 'Frontend, backend APIs, DB schema, deployment platform.' },
          { q: 'Write SQL query to find 2nd highest salary in Employee table', expected: 'SELECT MAX(salary) FROM Emp WHERE salary < (SELECT MAX(salary) FROM Emp);' }
        ]
      },
      {
        name: 'Round 3: Managerial & HR Round',
        questions: [
          { q: 'Why do you want to join TCS over other IT consulting firms?', expected: 'Highlight stability, training programs, and scale of global projects.' },
          { q: 'Are you comfortable relocating anywhere in India and working rotational shifts?', expected: 'Clear, enthusiastic affirmation with flexibility rationale.' },
          { q: 'How would you handle a project deadline crisis?', expected: 'Prioritization of core features, stakeholder escalation, transparent communication.' },
          { q: 'Where do you see yourself in 3 years at TCS?', expected: 'Technical lead / Specialist track with domain certification.' },
          { q: 'Do you have any questions for the panel?', expected: 'Ask about modern tech stack adoption (Cloud/AI) in upcoming project allocations.' }
        ]
      }
    ],
    tips: 'Prime track requires clean code explanations and O(N) optimizations. Ensure strong basics in SQL Joins and OOP concepts.'
  },
  'AI Engineer & ML Systems (FAANG / OpenAI)': {
    difficulty: 'Hard',
    rounds: [
      {
        name: 'Round 1: GenAI & AIGC Architecture (AIGC-Interview-Book)',
        questions: [
          { q: 'Explain why dividing by √d_k in self-attention prevents vanishing gradients.', expected: 'Normalizes logit variance back to 1 so softmax does not saturate.' },
          { q: 'How does QLoRA achieve 16-bit fine-tuning performance with 4-bit weights?', expected: 'NF4 optimal normal-float quantization + Double Quantization + Paged Optimizers.' },
          { q: 'What is the KV Cache and how does PagedAttention in vLLM eliminate memory fragmentation?', expected: 'Caches Past Key/Values; partitions into non-contiguous physical blocks with virtual page table.' },
          { q: 'Compare DPO and PPO: why does DPO not require an explicit reward model?', expected: 'DPO expresses ground-truth reward analytically in closed-form via policy probabilities.' },
          { q: 'How does Classifier-Free Guidance (CFG) work in Latent Diffusion Models?', expected: 'Interpolates conditional and unconditional noise with scale s > 1 to enhance prompt fidelity.' }
        ]
      },
      {
        name: 'Round 2: Machine Learning System Design (interviews.ai)',
        questions: [
          { q: 'Design a Two-Tower video recommendation system for 100M items and 1B users.', expected: 'Candidate retrieval (DSSM + HNSW) -> Heavy Ranking (DLRM/DeepFM) -> MMR diversity.' },
          { q: 'How do you design a real-time fraud detection pipeline with <50ms authorization SLA?', expected: 'Kafka stream -> Flink stateful velocity features -> Feast Redis lookup -> LightGBM inference.' },
          { q: 'Design an enterprise hybrid search engine combining BM25 and Dense Vector search.', expected: 'Elasticsearch BM25 + Qdrant HNSW merged via Reciprocal Rank Fusion (RRF) -> Cross-Encoder reranker.' },
          { q: 'How do you detect and mitigate Data Drift and Concept Drift in production ML?', expected: 'Population Stability Index (PSI) calculation on score bins; trigger retrain when PSI >= 0.25.' },
          { q: 'How do you optimize an LLM serving cluster to maximize throughput under 200 concurrent users?', expected: 'Continuous batching (Orca) + PagedAttention (vLLM) + Grouped-Query Attention (GQA).' }
        ]
      },
      {
        name: 'Round 3: Deep Learning Math & Foundations (interviews.ai)',
        questions: [
          { q: 'Why did AdamW replace standard Adam for training large Transformers?', expected: 'Decoupled weight decay applies L2 shrinkage directly to weights rather than scaling by 1/√v_t.' },
          { q: 'What is the architectural difference between LayerNorm, BatchNorm, and RMSNorm?', expected: 'RMSNorm drops mean-centering, scaling only by root-mean-square, saving 10-50% memory bandwidth.' },
          { q: 'Why do modern LLMs use Pre-LayerNorm instead of Post-LayerNorm?', expected: 'Keeps main residual highway unobstructed, preventing gradient vanishing in 80+ layer networks.' },
          { q: 'Mathematical formulation of XGBoost leaf weights vs Random Forest bagging.', expected: '2nd-order Taylor expansion w_j* = -Σg / (Σh + λ) vs Bootstrap sample averaging for variance reduction.' },
          { q: 'When would you use Focal Loss over standard Cross-Entropy?', expected: 'Extreme class imbalance (e.g. 1:1000 fraud); dynamically downweights easy negative examples.' }
        ]
      }
    ],
    tips: 'Staff and FAANG panels expect quantitative latency budgets (SLA < 50ms), exact mathematical derivations, and knowledge of modern inference engines (vLLM, TensorRT-LLM).'
  }
};

export const MOCK_INTERVIEW_QUESTIONS = [
  {
    type: 'Behavioral / Intro',
    q: 'Welcome to your mock interview. Let\'s begin: "Tell me about yourself, your technical background, and what makes you a strong fit for this role."'
  },
  {
    type: 'Technical / Core CS',
    q: 'How does an Index in SQL work internally, and why shouldn\'t we index every single column in a database table?'
  },
  {
    type: 'Problem Solving / DSA',
    q: 'Given an array of integers and a target sum, how would you find two numbers that add up to the target in O(N) time? Walk me through your approach.'
  },
  {
    type: 'Situational / Conflict',
    q: 'Tell me about a time you had a strong technical disagreement with a teammate. How did you resolve it?'
  },
  {
    type: 'Behavioral / Failure',
    q: 'Describe a situation where a project or deadline failed or went off track. What was your personal accountability, and what did you learn?'
  }
];

export default function InterviewCoach() {
  const { stats, logStudyMinutes, logQuestionSolved } = usePrepLand();
  const [activeMode, setActiveMode] = useState('mode-1'); // 'mode-1', 'mode-2', 'mode-3'

  // Mode 1: Mock Conductor state
  const [selectedCompany, setSelectedCompany] = useState('Amazon SDE-1');
  const [mockStarted, setMockStarted] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [mockHistory, setMockHistory] = useState([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Live Speech Recognition & Answer Timer
  const [verbalSeconds, setVerbalSeconds] = useState(0);
  const [isRecordingTimer, setIsRecordingTimer] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechNotice, setSpeechNotice] = useState(null);
  const recognitionRef = useRef(null);

  // Mode 2: Standalone Answer Evaluator state
  const [evalQuestion, setEvalQuestion] = useState('Describe a time you faced a major project roadblock and how you resolved it.');
  const [evalAnswer, setEvalAnswer] = useState('');
  const [standaloneScorecard, setStandaloneScorecard] = useState(null);

  // Mode 3: Prep Generator state
  const [prepCompany, setPrepCompany] = useState('Amazon SDE-1');

  useEffect(() => {
    let interval = null;
    if (isRecordingTimer) {
      interval = setInterval(() => {
        setVerbalSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecordingTimer]);

  // Clean up recognition & audio on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Real Speech-to-Text Dictation
  const startVoiceDictation = (setter) => {
    setSpeechNotice(null);
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechNotice('Speech recognition is not supported in this browser. Please use Chrome/Edge or type your answer.');
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setIsRecordingTimer(true);
      };

      recognition.onresult = (event) => {
        let finalTrans = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTrans += event.results[i][0].transcript;
          }
        }
        if (finalTrans) {
          setter((prev) => (prev ? prev + ' ' + finalTrans.trim() : finalTrans.trim()));
        }
      };

      recognition.onerror = (event) => {
        if (event.error !== 'no-speech') {
          setSpeechNotice(`Microphone notice: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setSpeechNotice('Microphone permission or access was denied. Please allow microphone permissions.');
      setIsListening(false);
    }
  };

  const stopVoiceDictation = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const toggleVoiceDictation = (setter) => {
    if (isListening) {
      stopVoiceDictation();
    } else {
      startVoiceDictation(setter);
    }
  };

  // Real Web Speech API reader
  const handleReadAloud = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Evaluator function returning exact scorecard
  const scoreAnswer = (ansText, qText) => {
    const wordCount = ansText.trim().split(/\s+/).filter(Boolean).length;
    const hasNumbers = /\d+%|\d+\s*(req|ms|seconds|days|users|lakh|grade|stars|O\(|N\))/i.test(ansText);
    const hasTechTerms = /(index|b-tree|hashmap|acid|latency|query|lock|thread|ram|cache|queue|sql|dbms|api)/i.test(ansText);
    const hasSTAR = /(situation|task|action|result|when|because|solved|delivered|improved)/i.test(ansText);
    const weCount = (ansText.match(/\bwe\b/gi) || []).length;
    const iCount = (ansText.match(/\b(i|my|me)\b/gi) || []).length;

    let techAcc = Math.min(10, Math.max(4, Math.round((hasTechTerms ? 8 : 5) + (wordCount > 30 ? 1 : 0))));
    let struct = Math.min(10, Math.max(3, Math.round((hasSTAR ? 8 : 5) + (iCount > weCount ? 1 : -1))));
    let depth = Math.min(10, Math.max(4, Math.round((wordCount > 50 ? 8 : 5) + (hasNumbers ? 1 : 0))));
    let comm = Math.min(10, Math.max(5, Math.round(wordCount >= 25 && wordCount <= 180 ? 9 : 6)));
    let relev = Math.min(10, Math.max(5, Math.round(ansText.length > 30 ? 8 : 4)));
    let confid = Math.min(10, Math.max(3, Math.round((hasNumbers ? 9 : 5) + (iCount >= 3 ? 1 : 0))));

    const total = techAcc + struct + depth + comm + relev + confid;
    let grade = 'B';
    if (total >= 50) grade = 'A';
    else if (total < 40 && total >= 30) grade = 'C';
    else if (total < 30) grade = 'D';

    const worked = [
      hasNumbers ? 'Included quantifiable outcomes and metrics.' : 'Clear and straightforward phrasing.',
      iCount >= weCount ? 'Demonstrated personal ownership using "I".' : 'Recognized the context of the problem.',
      hasTechTerms ? 'Leveraged precise technical terminology.' : 'Maintained a professional tone.'
    ];

    const toFix = [];
    if (!hasNumbers) toFix.push('Quantify results (e.g., "% latency reduced", "number of users impacted", "time saved").');
    if (weCount > iCount) toFix.push('Overuse of "we" — interviewers evaluate YOU; specify your exact contribution with "I".');
    if (wordCount < 40) toFix.push('Provide more depth on the specific technical trade-offs and alternative approaches considered.');
    if (toFix.length === 0) toFix.push('Keep practicing delivery within a 90-second conversational window.');

    return {
      scores: {
        techAcc,
        struct,
        depth,
        comm,
        relev,
        confid
      },
      total,
      grade,
      worked,
      toFix,
      sampleRewrite: `In my final semester project, our payment service dropped webhooks under 400 concurrent requests (Situation). As backend lead, my task was to achieve 1,000+ req/sec throughput with zero data loss before the launch deadline (Task). I profiled memory leaks in Node.js, replaced polling with a Redis Pub/Sub queue, and implemented database connection pooling (Action). As a result, throughput increased to 1,250 req/sec with 0% dropped transactions and 35ms average latency (Result).`
    };
  };

  const handleStartMock = () => {
    setMockStarted(true);
    setQuestionIdx(0);
    setStudentAnswer('');
    setMockHistory([]);
    setVerbalSeconds(0);
    setIsRecordingTimer(false);
  };

  const handleSubmitMockAnswer = () => {
    if (!studentAnswer.trim()) return;

    setIsEvaluating(true);
    setIsRecordingTimer(false);
    stopVoiceDictation();
    handleStopSpeaking();

    const currentQ = MOCK_INTERVIEW_QUESTIONS[questionIdx];
    const evaluation = scoreAnswer(studentAnswer, currentQ.q);

    // Real-time synchronization with candidate prep profile
    const duration = Math.max(1, Math.round(verbalSeconds / 60));
    logStudyMinutes(duration, 'interview');
    logQuestionSolved(evaluation.total >= 40, verbalSeconds || 60);

    setTimeout(() => {
      setMockHistory((prev) => [
        ...prev,
        {
          question: currentQ.q,
          type: currentQ.type,
          answer: studentAnswer,
          evaluation,
          spokenDuration: verbalSeconds
        }
      ]);
      setStudentAnswer('');
      setIsEvaluating(false);
      setVerbalSeconds(0);

      if (questionIdx + 1 < MOCK_INTERVIEW_QUESTIONS.length) {
        setQuestionIdx((prev) => prev + 1);
      }

      if (evaluation.total >= 48) {
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        } catch (e) {}
      }
    }, 700);
  };

  const handleStandaloneEvaluate = () => {
    if (!evalAnswer.trim()) return;
    const res = scoreAnswer(evalAnswer, evalQuestion);
    setStandaloneScorecard(res);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Operating Modes */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Prep Land AI Interview Coach • Voice Ready
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Mock Interview & Answer Evaluator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Voice Read Aloud • 6-Dimension Scoring Rubric • Real Speech Timing • STAR Behavioral Coaching
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
          <button
            onClick={() => { setActiveMode('mode-1'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeMode === 'mode-1' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mode 1: Mock Interview
          </button>
          <button
            onClick={() => { setActiveMode('mode-2'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeMode === 'mode-2' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mode 2: Answer Evaluator
          </button>
          <button
            onClick={() => { setActiveMode('mode-3'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeMode === 'mode-3' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mode 3: Company Prep Pack
          </button>
          <button
            onClick={() => { setActiveMode('mode-4'); sounds.playClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeMode === 'mode-4' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-indigo-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-indigo-300" />
            <span>Mode 4: 识屏 Shiping Copilot</span>
          </button>
        </div>
      </div>

      {/* MODE 1: MOCK INTERVIEW CONDUCTOR */}
      {activeMode === 'mode-1' && (
        <div className="space-y-6">
          {!mockStarted ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 max-w-xl mx-auto text-center space-y-5 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center mx-auto text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Select Your Target Company</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Questions are delivered one at a time. Click "Read Aloud" to practice realistic hearing comprehension.
                </p>
              </div>

              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500"
              >
                {SUPPORTED_COMPANIES.map((comp) => (
                  <option key={comp} value={comp} className="bg-slate-900 text-white">
                    {comp}
                  </option>
                ))}
              </select>

              <button
                onClick={handleStartMock}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition hover:scale-105"
              >
                Launch Mock Interview
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Top Banner */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-400">{selectedCompany}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300">Question {questionIdx + 1} of {MOCK_INTERVIEW_QUESTIONS.length}</span>
                </div>
                <button
                  onClick={handleStartMock}
                  className="flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Mock</span>
                </button>
              </div>

              {/* History of Previous Questions & Scorecards */}
              {mockHistory.map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 text-xs space-y-1">
                    <span className="font-mono text-emerald-400 font-semibold">{item.type}</span>
                    <p className="font-bold text-slate-100 text-sm">{item.question}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-400 font-semibold">Your Answer:</span>
                      {item.spokenDuration > 0 && (
                        <span className="text-[10px] font-mono text-slate-400">
                          Spoken time: {item.spokenDuration}s
                        </span>
                      )}
                    </div>
                    <p className="text-slate-200">{item.answer}</p>
                  </div>

                  {/* 6-Dimension Scorecard */}
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-white flex items-center gap-2">
                        📊 ANSWER SCORECARD
                      </span>
                      <span className="font-bold text-emerald-400">
                        OVERALL: {item.evaluation.total}/60 (Grade: {item.evaluation.grade})
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-300">
                      <p>Technical Accuracy:   [{item.evaluation.scores.techAcc}/10] — {item.evaluation.scores.techAcc >= 7 ? 'Solid technical grounding' : 'Requires deeper accuracy'}</p>
                      <p>Structure:            [{item.evaluation.scores.struct}/10] — {item.evaluation.scores.struct >= 7 ? 'Clear STAR framework flow' : 'Clarify Situation vs Action'}</p>
                      <p>Depth:                [{item.evaluation.scores.depth}/10] — {item.evaluation.scores.depth >= 7 ? 'Covers edge cases and choices' : 'Lacks architectural trade-offs'}</p>
                      <p>Communication:        [{item.evaluation.scores.comm}/10] — Concise, professional pacing</p>
                      <p>Relevance:            [{item.evaluation.scores.relev}/10] — Directly answers prompt</p>
                      <p>Confidence:           [{item.evaluation.scores.confid}/10] — Specific ownership and metric delivery</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 font-sans space-y-2">
                      <div>
                        <p className="text-emerald-400 font-bold text-xs mb-1">✅ WHAT WORKED:</p>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-xs">
                          {item.evaluation.worked.map((w, wIdx) => <li key={wIdx}>{w}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="text-amber-400 font-bold text-xs mb-1">🔧 WHAT TO FIX:</p>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-xs">
                          {item.evaluation.toFix.map((f, fIdx) => <li key={fIdx}>{f}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="text-teal-400 font-bold text-xs mb-1">✨ REWRITTEN SAMPLE ANSWER:</p>
                        <p className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed italic">
                          "{item.evaluation.sampleRewrite}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Current Question */}
              {questionIdx < MOCK_INTERVIEW_QUESTIONS.length ? (
                <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      {MOCK_INTERVIEW_QUESTIONS[questionIdx].type}
                    </span>

                    {/* Speech Synthesizer Trigger */}
                    <div className="flex items-center gap-2">
                      {isSpeaking ? (
                        <button
                          onClick={handleStopSpeaking}
                          className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold"
                        >
                          <StopCircle className="w-3.5 h-3.5" />
                          <span>Stop Voice</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReadAloud(MOCK_INTERVIEW_QUESTIONS[questionIdx].q)}
                          className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-semibold"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Read Question Aloud</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">
                    {MOCK_INTERVIEW_QUESTIONS[questionIdx].q}
                  </h4>

                  {/* Verbal timer & Live Mic Voice Input */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleVoiceDictation(setStudentAnswer)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                          isListening
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md animate-pulse'
                            : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isListening ? 'Listening... Speak Answer' : '🎤 Dictate Answer (Live Mic)'}</span>
                      </button>

                      <button
                        onClick={() => setIsRecordingTimer(!isRecordingTimer)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-mono ${
                          isRecordingTimer
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{isRecordingTimer ? `Timer: ${verbalSeconds}s` : 'Start Stopwatch'}</span>
                      </button>

                      {verbalSeconds > 0 && !isRecordingTimer && (
                        <span className="text-[11px] text-emerald-400 font-mono">Logged: {verbalSeconds}s</span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">Benchmark: 60s–90s delivery</span>
                  </div>

                  {speechNotice && (
                    <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{speechNotice}</span>
                    </div>
                  )}

                  <textarea
                    rows={5}
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="Type or dictate your response here using STAR framework (Situation -> Task -> Action -> Result)..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                  />

                  {/* Real-Time Speech Clarity & Filler Word Meter */}
                  {studentAnswer.trim().length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">
                          Words: <strong className="text-white">{studentAnswer.trim().split(/\s+/).filter(Boolean).length}</strong>
                        </span>
                        <span className="text-slate-600">|</span>
                        <span className="text-slate-400">
                          Pace: <strong className={verbalSeconds > 0 && Math.round((studentAnswer.trim().split(/\s+/).filter(Boolean).length / verbalSeconds) * 60) > 165 ? 'text-rose-400' : 'text-emerald-400'}>
                            {verbalSeconds > 0 ? Math.round((studentAnswer.trim().split(/\s+/).filter(Boolean).length / verbalSeconds) * 60) : 0} WPM
                          </strong>
                          <span className="text-[10px] text-slate-500 ml-1">(Ideal: 120-150)</span>
                        </span>
                      </div>

                      {/* Filler detector */}
                      {(studentAnswer.match(/\b(like|basically|actually|um|uh|sort of|you know)\b/gi) || []).length > 0 && (
                        <span className="text-amber-400 font-sans">
                          ⚠️ {(studentAnswer.match(/\b(like|basically|actually|um|uh|sort of|you know)\b/gi) || []).length} filler words detected
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Tip: Use "I" instead of "we" to emphasize personal ownership.
                    </span>
                    <button
                      onClick={handleSubmitMockAnswer}
                      disabled={!studentAnswer.trim() || isEvaluating}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs disabled:opacity-40 shadow transition hover:scale-105"
                    >
                      {isEvaluating ? 'Evaluating Answer...' : 'Submit Answer for Feedback'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-4">
                  <Award className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Mock Interview Completed!</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    You have finished all questions for {selectedCompany}. Review your scorecards above to address low-scoring dimensions before your live round.
                  </p>
                  <button
                    onClick={handleStartMock}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
                  >
                    Start Another Mock Session
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: STANDALONE ANSWER EVALUATOR */}
      {activeMode === 'mode-2' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Paste Any Interview Answer</h3>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Interview Question:</label>
              <input
                type="text"
                value={evalQuestion}
                onChange={(e) => setEvalQuestion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-slate-400">Your Prepared Answer:</label>
                <button
                  onClick={() => toggleVoiceDictation(setEvalAnswer)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition ${
                    isListening
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  }`}
                >
                  <Mic className="w-3 h-3" />
                  <span>{isListening ? 'Listening...' : 'Voice Dictate'}</span>
                </button>
              </div>
              <textarea
                rows={10}
                value={evalAnswer}
                onChange={(e) => setEvalAnswer(e.target.value)}
                placeholder="Paste or speak your STAR or technical answer to receive the 6-dimension evaluation scorecard..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
              />
            </div>
            <button
              onClick={handleStandaloneEvaluate}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow hover:scale-105 transition"
            >
              Evaluate on 6 Dimensions
            </button>
          </div>

          <div>
            {standaloneScorecard ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs shadow-xl animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white flex items-center gap-2">
                    📊 ANSWER SCORECARD
                  </span>
                  <span className="font-bold text-emerald-400">
                    OVERALL: {standaloneScorecard.total}/60 (Grade: {standaloneScorecard.grade})
                  </span>
                </div>

                <div className="space-y-1 text-slate-300">
                  <p>Technical Accuracy:   [{standaloneScorecard.scores.techAcc}/10] — {standaloneScorecard.scores.techAcc >= 7 ? 'Accurate domain knowledge' : 'Improve technical depth'}</p>
                  <p>Structure:            [{standaloneScorecard.scores.struct}/10] — {standaloneScorecard.scores.struct >= 7 ? 'Solid STAR framework' : 'Needs clearer Action/Result'}</p>
                  <p>Depth:                [{standaloneScorecard.scores.depth}/10] — {standaloneScorecard.scores.depth >= 7 ? 'Rich detail on execution' : 'Too surface-level'}</p>
                  <p>Communication:        [{standaloneScorecard.scores.comm}/10] — Professional vocabulary and flow</p>
                  <p>Relevance:            [{standaloneScorecard.scores.relev}/10] — Fully addresses question premise</p>
                  <p>Confidence:           [{standaloneScorecard.scores.confid}/10] — Metrics and individual ownership</p>
                </div>

                <div className="pt-3 border-t border-slate-800 font-sans space-y-3">
                  <div>
                    <p className="text-emerald-400 font-bold text-xs mb-1">✅ WHAT WORKED:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-xs">
                      {standaloneScorecard.worked.map((w, wIdx) => <li key={wIdx}>{w}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-amber-400 font-bold text-xs mb-1">🔧 WHAT TO FIX:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-xs">
                      {standaloneScorecard.toFix.map((f, fIdx) => <li key={fIdx}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-teal-400 font-bold text-xs mb-1">✨ REWRITTEN SAMPLE ANSWER:</p>
                    <p className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed italic">
                      "{standaloneScorecard.sampleRewrite}"
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400 space-y-3">
                <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
                <p>Paste an answer on the left to generate the complete 6-dimension scorecard, strengths, fixes, and model rewrite.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 3: INTERVIEW PREP GENERATOR */}
      {activeMode === 'mode-3' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">Generate Company Prep Pack</h3>
              <p className="text-xs text-slate-400">
                Curated 3 interview rounds, 5 high-yield questions per round with answer outlines and company tips.
              </p>
            </div>

            <select
              value={prepCompany}
              onChange={(e) => setPrepCompany(e.target.value)}
              className="bg-slate-850 border border-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500"
            >
              {Object.keys(PREP_PACKS).map((comp) => (
                <option key={comp} value={comp} className="bg-slate-900 text-white">
                  {comp}
                </option>
              ))}
            </select>
          </div>

          {PREP_PACKS[prepCompany] && (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Target Company: <strong className="text-white">{prepCompany}</strong>
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  Difficulty: {PREP_PACKS[prepCompany].difficulty}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {PREP_PACKS[prepCompany].rounds.map((round, rIdx) => (
                  <div key={rIdx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3.5">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      Round {rIdx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">{round.name}</h4>

                    <div className="space-y-3 pt-2 border-t border-slate-800/80">
                      {round.questions.map((qItem, qIdx) => (
                        <div key={qIdx} className="p-3 rounded-xl bg-slate-850 border border-slate-800 text-xs space-y-1">
                          <p className="font-semibold text-slate-200">
                            {qIdx + 1}. {qItem.q}
                          </p>
                          <p className="text-[11px] text-teal-300 font-mono">
                            Expected: {qItem.expected}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs text-slate-300 flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p>
                  <strong className="text-amber-400">Company-Specific Insider Tip:</strong>{' '}
                  {PREP_PACKS[prepCompany].tips}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 4: 识屏 SHIPING AI SCREEN & DIALOGUE COPILOT */}
      {activeMode === 'mode-4' && (
        <ShipingCopilot />
      )}
    </div>
  );
}
