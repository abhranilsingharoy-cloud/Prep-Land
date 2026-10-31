# Prep Land — AI Study Coach, Interview Mentor & Competitive Exam Guide

Prep Land is an advanced, real-time preparation platform designed for students and professionals targeting **Campus Engineering Placements** (Amazon, Google, TCS Prime, Infosys SP) and **Indian Competitive Government Examinations** (UPSC CSE, SSC CGL, Banking, Railways).

Featuring a high-end glossy pastel visual architecture inspired by modern productivity dashboards, Prep Land delivers 100% interactive, non-demo tools with real-time state synchronization, audio speech synthesis, microphone voice dictation, and LaTeX mathematical solving.

---

## 🚀 Key Modules & Capabilities

### 1. ⏱️ Aptitude Engine (35+ Quantitative & Reasoning Topics)
* **Shortcut vs Standard Methods:** Demonstrates step-by-step arithmetic along with formula shortcuts (saving 40–50s per question).
* **Live Per-Question Stopwatch:** Real-time ticking stopwatch logging question solves, accuracy, and average pace to the user profile.
* **6-Step Solving Protocol:** Structured quantitative breakdown covering concept identification, data extraction, equation setup, computation, verification, and shortcut alternatives.

### 2. 🧮 Interactive Formula Solver
* **Time & Work / Pipes & Cisterns LCM Calculator:** Computes net efficiency and drain/fill durations.
* **Compound vs Simple Interest Difference:** 2-year ($P = \frac{D \cdot 100^2}{R^2}$) and 3-year gap identity solvers.
* **Train Crossing & Relative Speed Calculator:** Real-time relative speed calculations with automatic $\text{km/h} \leftrightarrow \text{m/s}$ conversion.
* **Dishonest Grocer & Faulty Scale Calculator:** Profit percentage calculator for false weights ($\frac{\text{Error}}{\text{True} - \text{Error}} \times 100$).

### 3. 💻 Placement Engineering Hub
* **Curated DSA Sheet:** Solved problems covering Two Pointers, Sliding Window, DP, and Trees with tabbed Python and C++ code implementations.
* **Company Hiring Funnels:** Structured interview guides for Amazon SDE-1, TCS (Ninja/Digital/Prime), Infosys (DSE/SP), and Accenture.
* **Core CS & SQL Viva Cards:** Concise revision cards for ACID transactions, Deadlock Coffman conditions, OS Paging & Page faults, and TCP handshakes.

### 4. 🏛️ Government Exam Specialist Hub
* **Official Exam PYQs:** Previous year questions for SSC CGL, UPSC Prelims, and Banking with context and memory hooks.
* **Landmark Supreme Court Judgments:** Complete coverage of *Kesavananda Bharati*, *Puttaswamy*, and *Bommai* doctrines.
* **Dual-Angle Current Affairs:** Compares analytical UPSC GS-3 angles with factual SSC/Banking data points.
* **UPSC Mains Essay Evaluator:** Live scoring out of 125 marks across introduction, thesis, structure, examples/schemes, and synthesis.

### 5. 🎙️ AI Interview Coach (Speech-to-Text & Text-to-Speech)
* **Read Aloud:** Uses the browser Web Speech API (`SpeechSynthesis`) to vocalize interview questions for realistic listening comprehension.
* **🎤 Live Voice Dictation:** Real-time speech recognition (`SpeechRecognition`) transcribing spoken answers directly into the editor.
* **6-Dimension Scorecard:** Scores answers on Technical Accuracy, Structure (STAR framework), Depth, Communication, Relevance, and Confidence signals.

### 6. 📄 Resume Optimizer & ATS Scanner
* **Resume Text & File Upload:** Evaluates keyword density against SDE and Analyst roles.
* **Action Verb & Metric Checker:** Ensures outcomes are quantified with percentages and impact figures.
* **Google X-Y-Z Bullet Point Transformer:** Transforms weak passive bullets into high-impact accomplishment statements.
* **Markdown Audit Export:** Download full ATS audit reports with 1 click.

### 7. 📇 AI Notes & Spaced Repetition Flashcards
* **4 Distillation Modes:** Structured Notes, 20/80 Cheat Sheets, 3D Flip Flashcards, and ASCII Mind Maps.

### 8. 📊 Performance Analytics & Live Sync
* **Diagnostic Report:** Personalized weekly review with 3 Wins, 3 Priority Fixes, and daily schedule targets.
* **Central Persistent State:** Study hours, daily questions solved, DSA completions, and timetable items persist across sessions via `localStorage`.

---

## 🛠️ Tech Stack

* **Framework:** React 19 + Vite 8
* **Styling:** Tailwind CSS v4 + Custom Glassmorphism & Glossy Shadows
* **Math Rendering:** KaTeX + `katex/dist/katex.min.css`
* **Icons:** `lucide-react`
* **Audio & Speech:** Browser Web Audio API (acoustic chime synthesizer) + Web Speech API (SpeechSynthesis & SpeechRecognition)
* **Interactivity:** Canvas Confetti

---

## 🏃 Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhranilsingharoy-cloud/Prep-Land.git
   cd Prep-Land
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License
MIT License. Built for students and aspirants aiming for excellence in competitive exams and campus placements.
