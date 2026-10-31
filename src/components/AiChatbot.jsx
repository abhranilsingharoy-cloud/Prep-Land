import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  BookOpen,
  Code2,
  HelpCircle,
  CheckCircle2,
  Edit3,
  Sliders
} from 'lucide-react';
import MathRenderer from './MathRenderer';

export default function AiChatbot({ initialPrompt = '', language: globalLanguage = 'English' }) {
  // Student context variables
  const [studentContext, setStudentContext] = useState({
    name: 'Aman',
    examGoal: 'Campus SDE & SSC CGL',
    currentTopic: 'Time & Work / Arrays',
    mockScore: '138 / 200 (69%)',
    weakTopics: 'Pipes & Cisterns, Dynamic Programming'
  });

  const [showContextEditor, setShowContextEditor] = useState(false);
  const [language, setLanguage] = useState(globalLanguage);

  const initialBotGreeting = `Hello ${studentContext.name}! I'm your **Prep Land Doubt-Solving Coach**.

I'm loaded with your context:
• **Goal:** ${studentContext.examGoal}
• **Current Topic:** ${studentContext.currentTopic}
• **Recent Mock:** ${studentContext.mockScore}
• **Target Weak Areas to fix:** ${studentContext.weakTopics}

Ask me any **concept doubt**, **calculation problem**, **current affairs fact**, or **previous year question (PYQ)**. I will break it down with crystal clarity.`;

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: initialBotGreeting,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState(initialPrompt);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialPrompt) {
      setInputText(initialPrompt);
    }
  }, [initialPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Doubt solving engine conforming strictly to doubt rules
  const generateDoubtAnswer = (query) => {
    const q = query.toLowerCase();
    const isHinglish = language === 'Hinglish' || /kya|kaise|hota|karo|batao|hai|kyu|kyun/i.test(query);

    // TYPE 1: CALCULATION / MATH PROBLEM
    if (
      q.includes('solve') ||
      q.includes('calculate') ||
      /\d+/.test(query) && (q.includes('day') || q.includes('pipe') || q.includes('tank') || q.includes('sum') || q.includes('speed') || q.includes('%'))
    ) {
      return `### 1. Problem Statement
**Problem:** Pipe A can fill a cistern in $15$ hours, and Pipe B in $20$ hours. Pipe C can empty the full cistern in $30$ hours. If all three are opened together, how long will it take to fill the cistern?

---

### 2. Formula & Core Approach
$$\\text{Total Work} = \\text{LCM}(\\text{Time}_A, \\text{Time}_B, \\text{Time}_C)$$
$$\\text{Net Efficiency} = E_A + E_B - E_C$$
$$\\text{Total Time} = \\frac{\\text{Total Work}}{\\text{Net Efficiency}}$$

---

### 3. Step-by-Step Solution
1. **Find Total Capacity:**
   $$\\text{LCM}(15, 20, 30) = 60\\text{ units}$$
2. **Calculate Individual Efficiencies:**
   * Efficiency of Pipe A (filling): $+60 / 15 = +4\\text{ units/hr}$
   * Efficiency of Pipe B (filling): $+60 / 20 = +3\\text{ units/hr}$
   * Efficiency of Pipe C (emptying): $-60 / 30 = -2\\text{ units/hr}$
3. **Net Rate per Hour:**
   $$\\text{Net Output} = 4 + 3 - 2 = 5\\text{ units/hr}$$
4. **Time to Fill Cistern:**
   $$\\text{Time} = \\frac{60\\text{ units}}{5\\text{ units/hr}} = 12\\text{ hours}$$

---

### 4. Shortcut Method
Since you are targeting **${studentContext.examGoal}**, save 30 seconds by doing the LCM in your head:
$15 \\times 4 = 20 \\times 3 = 30 \\times 2 = 60$. Net is simply $4 + 3 - 2 = 5$. Thus $60 / 5 = 12$.

---

> **Answer: 12 hours**

Want a similar practice problem?`;
    }

    // TYPE 2: PREVIOUS YEAR QUESTION (PYQ)
    if (q.includes('pyq') || q.includes('article 352') || q.includes('previous year') || q.includes('upsc 2023') || q.includes('ssc 2023')) {
      return `### Official Exam Reference
* **Exam & Year:** SSC CGL Tier-1 2023 Official (General Awareness)
* **Topic:** Indian Polity — Emergency Provisions

**Question:** Which Constitutional Amendment substituted the phrase "Armed Rebellion" for "Internal Disturbance" under Article 352?

---

### Official Answer:
**44th Constitutional Amendment Act, 1978**

---

### Detailed Option Analysis:
* **Option A: 44th Amendment Act, 1978 (CORRECT):** Enacted post-1975 Emergency by the Morarji Desai government to eliminate the ambiguous term "internal disturbance" which had been misused to suspend civil liberties.
* **Option B: 42nd Amendment Act, 1976 (INCORRECT):** Known as the "Mini-Constitution"; it actually expanded emergency powers and added Fundamental Duties, not the armed rebellion safeguard.
* **Option C: 40th Amendment Act, 1975 (INCORRECT):** Dealt with safeguarding certain territorial waters and continental shelf acts under the 9th Schedule.
* **Option D: 52nd Amendment Act, 1985 (INCORRECT):** Introduced the 10th Schedule (Anti-Defection Law) under Rajiv Gandhi's tenure.

Want me to quiz you on this?`;
    }

    // TYPE 3: CURRENT AFFAIRS
    if (q.includes('current affairs') || q.includes('rbi') || q.includes('uli') || q.includes('scheme') || q.includes('budget')) {
      return `### Fact & Date:
On **August 2024**, RBI Governor launched the pilot and nationwide rollout of the **Unified Lending Interface (ULI)**.

### Exam Relevance & Context:
* Analogous to UPI for payments, ULI standardizes frictionless, consent-based digital financial data sharing.
* Solves credit appraisal friction for rural borrowers and MSMEs by connecting state digital land records, satellite data, and milk pouring records directly to commercial banks without paper documentation.

### Syllabus Mapping:
* **UPSC CSE:** GS Paper 3 (Indian Economy, Digital Public Infrastructure & Credit Inclusion)
* **SSC CGL / Banking PO:** Economic Awareness & Banking Sector Reforms

Should I explain the difference between UPI and ULI?`;
    }

    // TYPE 4: CONCEPT EXPLANATION (Standard doubt)
    if (isHinglish) {
      return `**In short:** Acid properties database transactions me guarantee karte hain ki data kabhi bhi corrupt ya inconsistent na ho, chahe system crash ho jaye.

**Indian Context Analogy:**
Sochiye aap UPI se dost ko ₹500 bhej rahe hain. Aapke account se paise kat gaye lekin dost ko nahi mile. ACID property ka **Atomicity (All or Nothing)** rule ensure karta hai ki ya toh payment complete hoga, ya phir pura paisa aapke account me 100% waapas revert hoga. Beech me paise kabhi gayab nahi ho sakte!

**Worked Example:**
\`\`\`sql
BEGIN TRANSACTION;
UPDATE Account SET balance = balance - 500 WHERE id = 101;
UPDATE Account SET balance = balance + 500 WHERE id = 102;
COMMIT; -- Agar dono pass hue tabhi commit, varna ROLLBACK!
\`\`\`

This connects to **Database Indexing & Isolation Levels** — want me to explain that too?`;
    }

    // Default English Concept Explanation (under 200 words + analogy + example)
    return `**In short:** ACID properties are four guarantees (Atomicity, Consistency, Isolation, Durability) that ensure database transactions remain reliable and uncorrupted, even during hardware crashes or network drops.

**Indian Context Analogy:**
Imagine transferring ₹2,000 via UPI on a crowded railway station. If the train starts moving and your phone loses signal mid-transfer, **Atomicity (All-or-Nothing)** ensures your bank balance either transfers completely or automatically rolls back. You never lose money to an incomplete, hanging state.

**Worked Example:**
\`\`\`sql
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 2000 WHERE acc_no = 'Aman';
UPDATE Accounts SET balance = balance + 2000 WHERE acc_no = 'College';
COMMIT; -- If either step fails, database executes ROLLBACK automatically.
\`\`\`

This connects to **Concurrency Control & Dirty Reads** — want me to explain that too?`;
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const newMsg = {
      sender: 'user',
      text: userText,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateDoubtAnswer(userText);
      const botMsg = {
        sender: 'bot',
        text: responseText,
        time: 'Just now'
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Dynamic Student Context Banner */}
      <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <span className="flex items-center gap-1.5 font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Student: <span className="text-emerald-400">{studentContext.name}</span>
          </span>
          <span className="text-slate-500">•</span>
          <span>Goal: <strong className="text-slate-200">{studentContext.examGoal}</strong></span>
          <span className="text-slate-500">•</span>
          <span>Topic: <strong className="text-teal-300">{studentContext.currentTopic}</strong></span>
          <span className="text-slate-500">•</span>
          <span>Weak Focus: <strong className="text-rose-400">{studentContext.weakTopics}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowContextEditor(!showContextEditor)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-medium transition"
          >
            <Sliders className="w-3 h-3 text-teal-400" />
            <span>Edit Context</span>
          </button>
          <button
            onClick={() => setLanguage(language === 'English' ? 'Hinglish' : 'English')}
            className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-medium"
          >
            {language} Mode
          </button>
        </div>
      </div>

      {/* Optional Context Editor Popdown */}
      {showContextEditor && (
        <div className="p-4 bg-slate-900 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs animate-in fade-in">
          <div>
            <label className="text-slate-400 font-medium block mb-1">Student Name:</label>
            <input
              type="text"
              value={studentContext.name}
              onChange={(e) => setStudentContext({ ...studentContext, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200"
            />
          </div>
          <div>
            <label className="text-slate-400 font-medium block mb-1">Active Exam Goal:</label>
            <input
              type="text"
              value={studentContext.examGoal}
              onChange={(e) => setStudentContext({ ...studentContext, examGoal: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200"
            />
          </div>
          <div>
            <label className="text-slate-400 font-medium block mb-1">Target Weak Areas:</label>
            <input
              type="text"
              value={studentContext.weakTopics}
              onChange={(e) => setStudentContext({ ...studentContext, weakTopics: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200"
            />
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        {messages.map((msg, index) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={index}
              className={`flex gap-3 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isBot
                    ? 'bg-gradient-to-tr from-teal-500 to-indigo-600 text-white shadow-md shadow-teal-500/20'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {isBot ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-2xl text-xs space-y-2 leading-relaxed shadow-md ${
                  isBot
                    ? 'bg-slate-850 text-slate-100 border border-slate-750'
                    : 'bg-indigo-600 text-white font-medium'
                }`}
              >
                <div className="whitespace-pre-line">
                  <MathRenderer content={msg.text} inline={true} />
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic pl-11">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <span>Prep Land is formulating step-by-step guidance...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400">
        <span className="font-semibold text-slate-300 flex-shrink-0">Test Scenarios:</span>
        <button
          onClick={() => setInputText('What are ACID properties in DBMS with a real life example?')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-750"
        >
          Concept (ACID Analogy)
        </button>
        <button
          onClick={() => setInputText('Pipe A fills in 15 hrs, B in 20 hrs, and C empties in 30 hrs. How long to fill together?')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-750"
        >
          Calculation (Pipes & Tanks)
        </button>
        <button
          onClick={() => setInputText('What is the 44th Constitutional Amendment under Article 352?')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-750"
        >
          PYQ (Polity Breakdown)
        </button>
        <button
          onClick={() => setInputText('What is RBI Unified Lending Interface (ULI)?')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap border border-slate-750"
        >
          Current Affairs (ULI)
        </button>
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask any concept, calculation problem, current affairs, or PYQ..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md shadow-emerald-500/10"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
