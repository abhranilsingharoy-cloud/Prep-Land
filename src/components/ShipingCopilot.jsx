import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor,
  Mic,
  Camera,
  Code2,
  Sparkles,
  Zap,
  CheckCircle,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  StopCircle,
  Layers,
  ExternalLink,
  ChevronRight,
  Shield,
  Smartphone,
  Eye,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

const SAMPLE_PROBLEMS = [
  {
    title: 'Trapping Rain Water (LeetCode 42)',
    category: 'Monotonic Two Pointers',
    prompt: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    coreInsight: 'Water trapped at index i is determined by min(max_left, max_right) - height[i]. Using two pointers moving inward from both ends avoids maintaining two prefix/suffix arrays.',
    edgeCases: ['Empty array / n < 3: 0 water', 'Monotonically increasing or decreasing heights: 0 water', 'Flat equal heights: 0 water'],
    speakingScript: 'I will start by observing that water trapped on any bar depends on the minimum of the maximum height to its left and right. Instead of a 2-pass O(N) space prefix-suffix array, I can use two pointers moving inward, keeping track of left_max and right_max to solve this in optimal O(N) time and O(1) space.',
    code: {
      python: `def trap(height: list[int]) -> int:
    if not height or len(height) < 3:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water`,
      cpp: `int trap(vector<int>& height) {
    int n = height.size();
    if (n < 3) return 0;
    int left = 0, right = n - 1;
    int left_max = height[left], right_max = height[right];
    int water = 0;
    while (left < right) {
        if (left_max < right_max) {
            left++;
            left_max = max(left_max, height[left]);
            water += left_max - height[left];
        } else {
            right--;
            right_max = max(right_max, height[right]);
            water += right_max - height[right];
        }
    }
    return water;
}`
    }
  },
  {
    title: 'LRU Cache Design (LeetCode 146)',
    category: 'Hash Map + Doubly Linked List',
    prompt: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put operations.',
    timeComplexity: 'get: O(1), put: O(1)',
    spaceComplexity: 'O(Capacity)',
    coreInsight: 'Combine a Hash Map for O(1) key lookups with a Doubly Linked List to maintain recency order (dummy head for most recent, dummy tail for eviction).',
    edgeCases: ['Updating value of existing key without exceeding capacity', 'Evicting when capacity is 1', 'Rapid repeated access of same key'],
    speakingScript: 'To get O(1) time complexity for both get and put operations, standard hash maps alone are not enough because updating recency order takes O(N) in arrays. Therefore, I will combine a Hash Map with a Doubly Linked List using dummy head and tail nodes to achieve constant time node removals and insertions.',
    code: {
      python: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {} # key -> Node
        self.head, self.tail = Node(), Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._add(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
      cpp: `class LRUCache {
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k=0, int v=0) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    int cap;
    unordered_map<int, Node*> map;
    Node *head, *tail;
    
    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    void add(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node(); tail = new Node();
        head->next = tail; tail->prev = head;
    }
    int get(int key) {
        if (map.find(key) == map.end()) return -1;
        Node* node = map[key];
        remove(node); add(node);
        return node->val;
    }
    void put(int key, int value) {
        if (map.find(key) != map.end()) remove(map[key]);
        Node* node = new Node(key, value);
        map[key] = node;
        add(node);
        if (map.size() > cap) {
            Node* lru = tail->prev;
            remove(lru);
            map.erase(lru->key);
            delete lru;
        }
    }
};`
    }
  }
];

export default function ShipingCopilot() {
  const [activeTab, setActiveTab] = useState('screen-solver'); // 'screen-solver', 'dialogue-copilot'
  const [screenInput, setScreenInput] = useState('');
  const [pastedImage, setPastedImage] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState(SAMPLE_PROBLEMS[0]);
  const [codeLang, setCodeLang] = useState('python');
  const [isCopied, setIsCopied] = useState(false);
  const [companionMode, setCompanionMode] = useState(false);

  // Live Dialogue Copilot State
  const [isDialogueListening, setIsDialogueListening] = useState(false);
  const [interviewerSpeech, setInterviewerSpeech] = useState('');
  const [teleprompterCards, setTeleprompterCards] = useState([
    {
      topic: 'Customer Obsession & System Scalability',
      corePoint: 'Prioritize system resilience over immediate cost reduction by decoupling webhook consumers.',
      bullets: [
        'Situation: Black Friday transaction spikes caused synchronous DB connection saturation.',
        'Action: Introduced Redis Pub/Sub queue with worker pooling and backpressure throttling.',
        'Result: Achieved 1,200 req/s throughput with 0 dropped orders and 45ms P99 latency.'
      ],
      keywords: ['Redis Pub/Sub', 'Backpressure', 'Connection Pooling', 'Idempotent Keys'],
      trap: 'Avoid saying "we fixed the server"—explain your exact code/architectural contribution.'
    }
  ]);
  const dialogueRecRef = useRef(null);

  // Handle Clipboard Image Paste
  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          setPastedImage(event.target.result);
          sounds.playCorrect();
        };
        reader.readAsDataURL(file);
        break;
      }
    }
  };

  // Start Real-Time Dialogue Copilot Speech Recognition
  const toggleDialogueListening = () => {
    if (isDialogueListening) {
      if (dialogueRecRef.current) {
        try { dialogueRecRef.current.stop(); } catch (e) {}
      }
      setIsDialogueListening(false);
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech recognition is not supported in this browser. Please use Chrome/Edge.');
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-IN';

      rec.onstart = () => {
        setIsDialogueListening(true);
        sounds.playClick();
      };

      rec.onresult = (event) => {
        let trans = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          trans += event.results[i][0].transcript;
        }
        setInterviewerSpeech(trans);

        // Dynamically match and generate response bullets
        if (trans.toLowerCase().includes('fail') || trans.toLowerCase().includes('risk') || trans.toLowerCase().includes('mistake')) {
          setTeleprompterCards([{
            topic: 'Failure & Calculated Risk Taking',
            corePoint: 'Framed failure as a data-gathering milestone with immediate mitigation and rollback.',
            bullets: [
              'Situation: Early database migration script had unindexed foreign keys causing table lock.',
              'Action: Detected within 90 seconds via Prometheus alerts; executed automated rollback migration.',
              'Result: Added pre-deployment validation checks preventing 100% of future schema lock incidents.'
            ],
            keywords: ['Automated Rollback', 'Schema Migration', 'Prometheus Alerting', 'Post-Mortem'],
            trap: 'Never blame a teammate or management; demonstrate full personal ownership.'
          }]);
        } else if (trans.toLowerCase().includes('scale') || trans.toLowerCase().includes('traffic') || trans.toLowerCase().includes('load')) {
          setTeleprompterCards([{
            topic: 'High Throughput Architecture',
            corePoint: 'Scale horizontally with stateless services, distributed caching, and read-replicas.',
            bullets: [
              'Situation: Monolithic API degraded during 5x traffic flash sale.',
              'Action: Partitioned read queries to Redis cache and secondary replicas; added rate limiting.',
              'Result: Sustained 99.98% uptime with zero database timeouts.'
            ],
            keywords: ['Read Replicas', 'Horizontal Scaling', 'Stateless Architecture', 'Token Bucket'],
            trap: 'Do not simply say "add more RAM"—discuss algorithmic and architectural efficiency.'
          }]);
        }
      };

      rec.onerror = () => setIsDialogueListening(false);
      rec.onend = () => setIsDialogueListening(false);

      dialogueRecRef.current = rec;
      rec.start();
    } catch (e) {
      setIsDialogueListening(false);
    }
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    sounds.playClick();
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`space-y-6 ${companionMode ? 'fixed top-20 right-6 w-96 z-50 shadow-2xl bg-slate-900 border-2 border-indigo-500 rounded-3xl p-5' : ''}`}>
      {/* Top Banner with ooboqoo/shiping Inspiration Badge */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/30 mb-2">
            <Monitor className="w-3.5 h-3.5" />
            Shiping 识屏 AI Screen & Dialogue Assistant
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            AI Interview Copilot
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time screen question solver, dialogue teleprompter, and verbal speaking scripts powered by Shiping.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Companion Mode Switcher */}
          <button
            onClick={() => setCompanionMode(!companionMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
              companionMode
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{companionMode ? 'Floating Teleprompter' : 'Companion Mode'}</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700">
            <button
              onClick={() => { setActiveTab('screen-solver'); sounds.playClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'screen-solver' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Screen Snip Solver
            </button>
            <button
              onClick={() => { setActiveTab('dialogue-copilot'); sounds.playClick(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'dialogue-copilot' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Dialogue Copilot
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: SCREEN SNIP & QUESTION SOLVER */}
      {activeTab === 'screen-solver' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Screen Paste / Input */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onPaste={handlePaste}
              className="p-6 rounded-3xl bg-slate-900 border-2 border-dashed border-slate-700 hover:border-indigo-500/80 transition-all text-center space-y-4"
            >
              {pastedImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-700">
                  <img src={pastedImage} alt="Pasted Screen" className="w-full max-h-56 object-cover" />
                  <button
                    onClick={() => setPastedImage(null)}
                    className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 text-rose-300 text-[11px] font-bold"
                  >
                    Clear Image
                  </button>
                </div>
              ) : (
                <div className="py-6 space-y-2">
                  <Camera className="w-10 h-10 text-indigo-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Press Ctrl+V to Paste Screen Snippet</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Take a snip of any LeetCode problem, SQL schema, or system architecture diagram and paste it here.
                  </p>
                </div>
              )}

              <div className="text-left">
                <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                  Or Paste Question Statement:
                </label>
                <textarea
                  rows={4}
                  value={screenInput}
                  onChange={(e) => setScreenInput(e.target.value)}
                  placeholder="Paste question description, constraints, or interviewer prompt..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              {/* Sample Quick Select */}
              <div className="pt-2 border-t border-slate-800 text-left">
                <span className="text-[11px] text-slate-500 block mb-2 font-semibold">
                  Or Test High-Frequency Interview Problems:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_PROBLEMS.map((prob, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setSelectedSolution(prob); sounds.playClick(); }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                        selectedSolution.title === prob.title
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                      }`}
                    >
                      {prob.title.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Shiping Deep Solution Output */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    {selectedSolution.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">{selectedSolution.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Time: {selectedSolution.timeComplexity}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
                    Space: {selectedSolution.spaceComplexity}
                  </span>
                </div>
              </div>

              {/* Core Insight */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1 text-xs">
                <strong className="text-indigo-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Optimal Algorithmic Intuition:
                </strong>
                <p className="text-slate-200 leading-relaxed">{selectedSolution.coreInsight}</p>
              </div>

              {/* Speaking Script (What to say during interview) */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                <strong className="text-amber-400 flex items-center gap-1.5 font-bold">
                  <Volume2 className="w-3.5 h-3.5" />
                  What to Say to the Interviewer (Verbal Walkthrough):
                </strong>
                <p className="text-slate-300 italic leading-relaxed">
                  "{selectedSolution.speakingScript}"
                </p>
              </div>

              {/* Code Solution with Python & C++ Tabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCodeLang('python')}
                      className={`px-2.5 py-1 rounded-lg font-mono font-semibold ${
                        codeLang === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-800'
                      }`}
                    >
                      Python 3
                    </button>
                    <button
                      onClick={() => setCodeLang('cpp')}
                      className={`px-2.5 py-1 rounded-lg font-mono font-semibold ${
                        codeLang === 'cpp' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-800'
                      }`}
                    >
                      C++ (STL)
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopyCode(selectedSolution.code[codeLang])}
                    className="flex items-center gap-1 text-slate-400 hover:text-white"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed custom-scrollbar">
                  <code>{selectedSolution.code[codeLang]}</code>
                </pre>
              </div>

              {/* Edge Cases */}
              <div className="text-xs space-y-1">
                <strong className="text-rose-400 block font-bold">⚠️ Critical Edge Cases Checklist:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-400">
                  {selectedSolution.edgeCases.map((ec, idx) => (
                    <li key={idx}>{ec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE DIALOGUE COPILOT (CONVERSATION MODE) */}
      {activeTab === 'dialogue-copilot' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mic className="w-5 h-5 text-indigo-400" />
                  Real-Time Interview Dialogue Teleprompter
                </h3>
                <p className="text-xs text-slate-400">
                  Listens to the interviewer question live and displays high-scoring bullet points so you speak naturally.
                </p>
              </div>

              <button
                onClick={toggleDialogueListening}
                className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 transition shadow-lg ${
                  isDialogueListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/20'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                }`}
              >
                {isDialogueListening ? <StopCircle className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isDialogueListening ? 'Listening... (Click to stop)' : '🎙️ Start Real-Time Copilot'}</span>
              </button>
            </div>

            {/* Live Interviewer Speech Transcript */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <span className="text-[11px] text-slate-500 font-semibold block">
                Interviewer Speech Stream:
              </span>
              <p className="text-slate-200 italic font-mono min-h-6">
                {interviewerSpeech || 'Click "Start Real-Time Copilot" and speak a prompt (e.g., "Tell me about a time you handled a failure under pressure" or "How do you scale systems?")...'}
              </p>
            </div>

            {/* Teleprompter Cards */}
            <div className="space-y-4 pt-2">
              {teleprompterCards.map((card, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-850 border border-slate-750 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-teal-400">{card.topic}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      STAR Teleprompter
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <strong className="text-white block mb-0.5">🎯 1-Line Core Takeaway:</strong>
                    <p className="text-slate-300">{card.corePoint}</p>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <strong className="text-emerald-400 block font-bold">📌 Structured Answer Points:</strong>
                    {card.bullets.map((b, bIdx) => (
                      <p key={bIdx} className="text-slate-200 pl-3 border-l-2 border-emerald-500/60 leading-relaxed">
                        {b}
                      </p>
                    ))}
                  </div>

                  {/* Keywords to Drop */}
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 font-semibold mr-1">⚡ Keywords to mention:</span>
                    {card.keywords.map((kw, kwIdx) => (
                      <span key={kwIdx} className="px-2 py-0.5 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 font-mono text-[11px]">
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Pitfall Trap */}
                  <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
                    ⚠️ {card.trap}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
