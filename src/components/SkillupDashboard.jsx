import React, { useState } from 'react';
import {
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  BookOpen,
  Scale,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Check
} from 'lucide-react';
import { usePrepLand } from '../context/PrepLandContext';

export default function SkillupDashboard({ setActiveTab }) {
  const { stats, schedule, toggleScheduleTask } = usePrepLand();
  const [activeFilter, setActiveFilter] = useState('in-progress'); // 'in-progress', 'upcoming', 'completed'
  const [selectedDay, setSelectedDay] = useState('Wed');

  const inProgressCards = [
    {
      id: 'card-1',
      title: 'Time & Work — Pipes & Cisterns',
      category: 'Quantitative Aptitude',
      type: 'LCM Efficiency Method',
      progress: '14/20 Solved',
      bgColor: 'bg-[#dce3fc]',
      iconBg: 'bg-[#cad6fa]',
      textColor: 'text-[#1e264f]',
      icon: BookOpen,
      tab: 'aptitude'
    },
    {
      id: 'card-2',
      title: 'DSA: Two Pointers & Arrays',
      category: 'Campus SDE-1 Placement',
      type: 'Amazon & TCS Set',
      progress: `${stats.dsaSolved}/50 Solved`,
      bgColor: 'bg-[#d8ece2]',
      iconBg: 'bg-[#c3e3d2]',
      textColor: 'text-[#1c4731]',
      icon: Zap,
      tab: 'placements'
    },
    {
      id: 'card-3',
      title: 'Indian Polity: Emergency & Writs',
      category: 'Govt Exam Specialist',
      type: 'Articles 32, 226 & 352',
      progress: '18/25 PYQs',
      bgColor: 'bg-[#fcf1cb]',
      iconBg: 'bg-[#f6e4a8]',
      textColor: 'text-[#544510]',
      icon: Scale,
      tab: 'govt-exams'
    }
  ];

  const leaders = [
    { name: 'Rohit Verma', location: 'New Delhi (AIR #28 Track)', percentile: '98.4 %ile', badgeColor: 'bg-[#fcf1cb] text-[#715f16]' },
    { name: 'Priya Nair', location: 'Bengaluru (SDE Amazon Offer)', percentile: '96.8 %ile', badgeColor: 'bg-[#fde2e4] text-[#822b3b]' },
    { name: 'Shreya Banerjee', location: 'Kolkata (IBPS PO Mains)', percentile: '94.2 %ile', badgeColor: 'bg-[#d8ece2] text-[#23583d]' },
    { name: 'Aman Sharma (You)', location: 'New Delhi (AIR #412)', percentile: `${stats.percentile}%ile`, badgeColor: 'bg-[#dce3fc] text-[#334280]' },
  ];

  const weekDays = [
    { day: 'Sun', date: '26' },
    { day: 'Mon', date: '27' },
    { day: 'Tue', date: '28' },
    { day: 'Wed', date: '29', isToday: true },
    { day: 'Thu', date: '30' },
    { day: 'Fri', date: '31' },
    { day: 'Sat', date: '01' },
  ];

  const currentTasks = schedule[selectedDay] || [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-12">
      {/* Left 8 Columns: In Progress + Statistics + Weekly Schedule */}
      <div className="xl:col-span-8 space-y-9">
        {/* SECTION 1: IN PROGRESS STUDY TRACKS */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-7 text-sm font-bold">
              <button
                onClick={() => setActiveFilter('in-progress')}
                className={`transition-colors ${
                  activeFilter === 'in-progress' ? 'text-slate-900 font-extrabold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                In progress
              </button>
              <button
                onClick={() => setActiveFilter('upcoming')}
                className={`transition-colors ${
                  activeFilter === 'upcoming' ? 'text-slate-900 font-extrabold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Upcoming Mocks
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`transition-colors ${
                  activeFilter === 'completed' ? 'text-slate-900 font-extrabold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Mastered Topics
              </button>
            </div>

            <button
              onClick={() => setActiveTab('aptitude')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition"
            >
              View all
            </button>
          </div>

          {/* 3 Pastel Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {inProgressCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveTab(card.tab)}
                  className={`${card.bgColor} rounded-[28px] p-6 flex flex-col justify-between h-52 transition-all hover:scale-[1.02] cursor-pointer shadow-sm relative group`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center text-slate-850 shadow-sm`}>
                      <Icon className="w-5 h-5 text-slate-800" />
                    </div>
                    <button className="text-slate-600 hover:text-slate-900 p-1">
                      <MoreVertical className="w-4 h-4 opacity-60" />
                    </button>
                  </div>

                  <div>
                    <h3 className={`text-base font-bold ${card.textColor} leading-snug mb-3`}>
                      {card.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600/80 pt-2 border-t border-black/5">
                      <span>{card.type}</span>
                      <span className="font-mono">{card.progress}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: PREPARATION STATISTICS (Live synced with Pomodoro) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Preparation Statistics</h3>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Sync Active</span>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left 2 Metrics */}
            <div className="space-y-6 w-full md:w-auto">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#dce3fc] flex items-center justify-center text-indigo-700 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Quantitative Aptitude</p>
                  <p className="text-sm font-extrabold text-slate-850">{stats.quantHours.toFixed(1)} hrs</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#d8ece2] flex items-center justify-center text-emerald-800 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Logical Reasoning & DSA</p>
                  <p className="text-sm font-extrabold text-slate-850">{stats.logicalHours.toFixed(1)} hrs</p>
                </div>
              </div>
            </div>

            {/* Central 3D Glowing Circle (Total Study Hours) */}
            <div className="relative flex items-center justify-center my-4 md:my-0">
              <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-amber-200/40 via-teal-100/60 to-indigo-100/40 blur-2xl pointer-events-none" />

              <div className="w-36 h-36 rounded-full bg-white flex flex-col items-center justify-center text-center glossy-center-glow relative z-10 border border-slate-100/60">
                <span className="text-[11px] font-medium text-slate-400 mb-0.5">Total hours</span>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                  {Math.round(stats.totalHours)}
                </span>
              </div>
            </div>

            {/* Right 2 Metrics */}
            <div className="space-y-6 w-full md:w-auto">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#fcf1cb] flex items-center justify-center text-amber-800 shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Govt GK & Polity PYQs</p>
                  <p className="text-sm font-extrabold text-slate-850">{stats.govtHours.toFixed(1)} hrs</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#fde2e4] flex items-center justify-center text-rose-800 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Technical Interview & STAR</p>
                  <p className="text-sm font-extrabold text-slate-850">{stats.interviewHours.toFixed(1)} hrs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: NEAREST TIMETABLE (Interactive Day Switcher & Checklists) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Weekly Prep Schedule</h3>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-3.5 h-3.5 cursor-pointer hover:text-slate-700" />
                <span>October 26 – Nov 1, 2026</span>
                <ChevronRight className="w-3.5 h-3.5 cursor-pointer hover:text-slate-700" />
              </div>
              <div className="flex items-center gap-1 text-slate-500 cursor-pointer">
                <span>Week</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-7 border border-slate-100 shadow-sm space-y-6">
            {/* Interactive Day Selector Tabs */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold">
              {weekDays.map((w) => {
                const isSelected = selectedDay === w.day;
                return (
                  <button
                    key={w.day}
                    onClick={() => setSelectedDay(w.day)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <span className="text-slate-400 text-[11px] mb-1.5 group-hover:text-slate-700">{w.day}</span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition ${
                        isSelected
                          ? 'bg-[#161618] text-white shadow-md'
                          : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {w.day}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Schedule Blocks for Selected Day */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                <span>Targets for {selectedDay}:</span>
                <span className="text-emerald-600">
                  {currentTasks.filter((t) => t.done).length} / {currentTasks.length} Completed
                </span>
              </div>

              {currentTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleScheduleTask(selectedDay, task.id)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    task.done
                      ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-900'
                      : 'bg-slate-50/80 border-slate-200/70 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                        task.done
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <div>
                      <h4 className={`text-xs font-bold ${task.done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">{task.duration}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 font-semibold">
                    {task.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right 4 Columns: Peer Leaderboard & Weak Zone Recommendation */}
      <div className="xl:col-span-4 space-y-9">
        {/* PEER LEADERBOARD */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-900">Peer Leaderboard</h3>
            <button
              onClick={() => setActiveTab('analytics')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition"
            >
              View all
            </button>
          </div>

          <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm space-y-4">
            {leaders.map((leader, lIdx) => (
              <div key={lIdx} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + lIdx * 10000}?auto=format&fit=crop&q=80&w=128&h=128`}
                      alt={leader.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=128&h=128';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{leader.name}</h4>
                    <p className="text-[10px] text-slate-400">{leader.location}</p>
                  </div>
                </div>

                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${leader.badgeColor}`}>
                  {leader.percentile}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WEAK ZONE REMEDIAL RECOMMENDATION */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900">Recommended for You</h3>
          </div>

          <div
            onClick={() => setActiveTab('solver')}
            className="bg-[#d8ece2] rounded-[32px] p-8 relative overflow-hidden h-[330px] flex flex-col justify-between cursor-pointer transition hover:scale-[1.01] shadow-sm group"
          >
            {/* Concentric Water-Ripple Circular Background Pattern */}
            <div className="absolute top-4 -right-12 pointer-events-none opacity-50">
              <div className="w-56 h-56 rounded-full border border-emerald-600/20 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border border-emerald-600/25 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-emerald-600/30 bg-emerald-600/5" />
                </div>
              </div>
            </div>

            {/* Top Tag */}
            <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Weak Zone Diagnostic (54% Accuracy)
            </span>

            {/* Content at Bottom */}
            <div className="relative z-10 space-y-2">
              <h4 className="text-lg font-extrabold text-slate-900 leading-snug">
                Pipes & Cisterns: 2-Cycle Alternating Leakages
              </h4>
              <p className="text-xs text-slate-600/90 leading-relaxed max-w-xs">
                Your last mock test flagged calculation drag on emptying pipes. Master the LCM unit method to recover ~6 lost marks.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                <span>Launch 15-Min Remedial Drill</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
