import React, { useState } from 'react';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Copy,
  Check,
  Download,
  Upload,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportTextFile } from '../utils/storage';

const ROLE_KEYWORDS = {
  sde: [
    'data structures', 'algorithms', 'python', 'c++', 'java', 'sql', 'react', 'node.js',
    'docker', 'aws', 'rest api', 'git', 'microservices', 'database', 'system design', 'ci/cd',
    'kubernetes', 'redis', 'nosql', 'unit testing'
  ],
  analyst: [
    'sql', 'python', 'excel', 'tableau', 'power bi', 'pandas', 'statistics', 'etl',
    'data visualization', 'metrics', 'machine learning', 'regression', 'hypothesis testing',
    'data cleaning', 'dashboards', 'kpi'
  ],
  govt: [
    'analytical reasoning', 'comprehension', 'quantitative aptitude', 'public administration',
    'governance', 'policy analysis', 'drafting', 'compliance', 'constitutional law', 'fiscal policy'
  ]
};

const SAMPLE_RESUME = `AMAN SHARMA
Email: aman.sharma@example.com | LinkedIn: linkedin.com/in/amansharma | GitHub: github.com/amansharma

EDUCATION
B.Tech in Computer Science and Engineering | CGPA: 8.4 / 10 | 2022 - 2026

TECHNICAL SKILLS
Languages: Python, C++, JavaScript, SQL
Frameworks & Databases: React.js, Node.js, Express, PostgreSQL, Redis, MongoDB
Tools & Cloud: Git, Docker, AWS (S3, EC2), Postman

PROJECTS
• Real-time Collaborative Code Editor: Built a distributed web application in React and Node.js using WebSockets. Reduced document synchronization latency by 35% and handled 800 concurrent connections.
• Campus Placement & Mock Test Engine: Architected a microservices-based student testing portal with MySQL and JWT authentication. Automated scoring for 1,200+ mock tests.

EXPERIENCE & LEADERSHIP
• Technical Lead, College Coding Club: Conducted 12 weekly DSA bootcamps for 250+ juniors and organized annual 36-hour hackathon.`;

export default function ResumeOptimizer() {
  const [resumeText, setResumeText] = useState(SAMPLE_RAW_TEXT_RESUME());
  const [targetRole, setTargetRole] = useState('sde');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [weakBullet, setWeakBullet] = useState('Worked on backend APIs using Node.js and MongoDB for our college project.');
  const [enhancedBullet, setEnhancedBullet] = useState(null);
  const [copied, setCopied] = useState(false);

  function SAMPLE_RAW_TEXT_RESUME() {
    return SAMPLE_RESUME;
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setResumeText(content);
      }
    };
    reader.readAsText(file);
  };

  const analyzeResume = () => {
    const textLower = resumeText.toLowerCase();
    const expectedKeywords = ROLE_KEYWORDS[targetRole] || ROLE_KEYWORDS.sde;

    const matchedKeywords = expectedKeywords.filter((kw) => textLower.includes(kw));
    const missingKeywords = expectedKeywords.filter((kw) => !textLower.includes(kw));

    // Metric check: Look for %, ₹, $, or numbers
    const metricMatches = resumeText.match(/\d+[\s%k+]/gi) || [];
    const hasGoodMetrics = metricMatches.length >= 3;

    // Action verbs check
    const strongVerbs = ['engineered', 'developed', 'architected', 'reduced', 'organized', 'built', 'spearheaded', 'optimized', 'automated', 'scaled'];
    const matchedVerbs = strongVerbs.filter((v) => textLower.includes(v));

    let score = 40;
    score += Math.round((matchedKeywords.length / expectedKeywords.length) * 35);
    score += hasGoodMetrics ? 15 : 5;
    score += matchedVerbs.length >= 3 ? 10 : 5;
    score = Math.min(100, score);

    const result = {
      score,
      matchedKeywords,
      missingKeywords,
      metricCount: metricMatches.length,
      matchedVerbs,
      wordCount: resumeText.trim().split(/\s+/).filter(Boolean).length
    };

    setAnalysisResult(result);

    if (score >= 80) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const handleEnhanceBullet = () => {
    setEnhancedBullet(
      `Architected RESTful microservices in Node.js & MongoDB, reducing database query latency by 34% and scaling endpoint throughput to 850 concurrent requests.`
    );
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;
    const report = `# PREP LAND — ATS RESUME AUDIT REPORT
Target Role: ${targetRole.toUpperCase()}
Generated on: ${new Date().toLocaleDateString()}
Overall Match Score: ${analysisResult.score}/100

## KEYWORD COVERAGE (${analysisResult.matchedKeywords.length} Matched):
${analysisResult.matchedKeywords.map((k) => `• [MATCH] ${k}`).join('\n')}

## CRITICAL MISSING KEYWORDS TO ADD:
${analysisResult.missingKeywords.map((k) => `• [MISSING] ${k}`).join('\n')}

## QUANTIFIABLE IMPACT METRICS:
Total metrics detected: ${analysisResult.metricCount}
Strong action verbs identified: ${analysisResult.matchedVerbs.join(', ')}

## ACTIONABLE RECOMMENDATIONS:
1. Add high-frequency missing keywords naturally into Project descriptions.
2. Ensure every bullet follows Google's X-Y-Z formula: "Accomplished [X], as measured by [Y], by doing [Z]".
3. Keep resume strictly to a single page (under 450 words) with standard ATS-compliant fonts.`;

    exportTextFile(`ATS_Audit_Report_${targetRole}.md`, report);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            Resume & Profile ATS Optimizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real ATS keyword gap analysis, metric scoring, Google X-Y-Z bullet rewrites, and downloadable audit reports.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Target Role:</span>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-semibold focus:outline-none"
          >
            <option value="sde">Software Engineer (SDE-1)</option>
            <option value="analyst">Data / Business Analyst</option>
            <option value="govt">Govt & Administrative Exam</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Text Area */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">Resume Plain Text</h3>
            <div className="flex items-center gap-3">
              <label className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload .txt/.md</span>
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setResumeText(SAMPLE_RESUME)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Reset
              </button>
            </div>
          </div>

          <textarea
            rows={13}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-teal-500 leading-relaxed"
            placeholder="Paste your plain text resume here..."
          />

          <button
            onClick={analyzeResume}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01]"
          >
            Scan ATS Compatibility & Score
          </button>
        </div>

        {/* Right: ATS Analysis Result */}
        <div className="space-y-5">
          {analysisResult ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">ATS Match Score</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Role: {targetRole.toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-2xl font-black ${
                      analysisResult.score >= 80
                        ? 'text-emerald-400'
                        : analysisResult.score >= 60
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {analysisResult.score}/100
                  </span>
                  <button
                    onClick={handleDownloadReport}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700"
                    title="Download ATS Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    analysisResult.score >= 80 ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${analysisResult.score}%` }}
                />
              </div>

              {/* Keyword Badges */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Matched High-Yield Keywords ({analysisResult.matchedKeywords.length}):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              {analysisResult.missingKeywords.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Missing ATS Keywords to Add:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.missingKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">
                Click <strong>"Scan ATS Compatibility & Score"</strong> to see keyword densities, quantifiable metrics, and ATS parse warnings.
              </p>
            </div>
          )}

          {/* Google X-Y-Z Bullet Enhancer */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Google X-Y-Z Bullet Point Enhancer
              </h4>
            </div>
            <p className="text-xs text-slate-400">
              Formula: <em>"Accomplished [X] as measured by [Y] by doing [Z]"</em>
            </p>

            <div className="space-y-2">
              <input
                type="text"
                value={weakBullet}
                onChange={(e) => setWeakBullet(e.target.value)}
                placeholder="Enter weak bullet point..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleEnhanceBullet}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
              >
                Transform Bullet
              </button>
            </div>

            {enhancedBullet && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2 mt-2">
                <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                  <span>Enhanced High-Impact Bullet:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(enhancedBullet);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-white"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  • {enhancedBullet}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
