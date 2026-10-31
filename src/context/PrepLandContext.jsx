import React, { createContext, useContext, useState, useEffect } from 'react';

const PrepLandContext = createContext();

const STORAGE_KEYS = {
  PREPLAND_STATE: 'prepland_live_v2'
};

const DEFAULT_SCHEDULE = {
  Sun: [
    { id: 's1', title: 'Full-Length Mock Test Retake', duration: '60 min', tag: 'Assessment', done: true },
    { id: 's2', title: 'Forensic Error Analysis', duration: '30 min', tag: 'Review', done: true }
  ],
  Mon: [
    { id: 'm1', title: 'Pipes & Cisterns LCM Drills', duration: '45 min', tag: 'Quantitative', done: true },
    { id: 'm2', title: 'Two Pointers Array Practice', duration: '45 min', tag: 'DSA', done: true }
  ],
  Tue: [
    { id: 't1', title: 'CI & SI 3-Year Gap Identities', duration: '40 min', tag: 'Cheatsheet', done: true },
    { id: 't2', title: 'Constitutional Emergency PYQs', duration: '40 min', tag: 'Polity', done: true }
  ],
  Wed: [
    { id: 'w1', title: 'Time & Work Leakage Sprint', duration: '45 min', tag: 'Quantitative', done: false },
    { id: 'w2', title: 'Two Pointers LeetCode Amazon Set', duration: '60 min', tag: 'Placement', done: false },
    { id: 'w3', title: 'Adaptive Sectional Mock #5', duration: '40 min', tag: 'Live Exam', done: false }
  ],
  Thu: [
    { id: 'th1', title: 'Syllogisms Possibility Cases', duration: '45 min', tag: 'Logical', done: false },
    { id: 'th2', title: 'Operating Systems Deadlock Viva', duration: '30 min', tag: 'Core CS', done: false }
  ],
  Fri: [
    { id: 'f1', title: 'Trains Relative Speed Speed-Run', duration: '40 min', tag: 'Quantitative', done: false },
    { id: 'f2', title: 'STAR Behavioral Interview Simulation', duration: '45 min', tag: 'HR Prep', done: false }
  ],
  Sat: [
    { id: 'sa1', title: 'Timed Quant + GA Marathon', duration: '60 min', tag: 'Sprint', done: false },
    { id: 'sa2', title: 'Current Affairs Dual-Angle Review', duration: '30 min', tag: 'Govt Hub', done: false }
  ]
};

export function PrepLandProvider({ children }) {
  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREPLAND_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.student) return parsed.student;
      }
    } catch (e) {}
    return {
      name: 'Aman Sharma',
      examGoal: 'SSC CGL & Campus SDE-1',
      examTargetDate: '2026-12-15T09:00:00',
      rankTrack: 'AIR #412',
      readinessScore: 76
    };
  });

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREPLAND_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.stats) return parsed.stats;
      }
    } catch (e) {}
    return {
      totalHours: 289.4,
      quantHours: 102.7,
      logicalHours: 113.25,
      govtHours: 32.5,
      interviewHours: 41.6,
      dsaSolved: 42,
      mocksCompleted: 14,
      avgSpeedSeconds: 52,
      percentile: 88.4,
      streakDays: 14,
      questionsSolvedToday: 16,
      dailyTarget: 20
    };
  });

  const [schedule, setSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREPLAND_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.schedule) return parsed.schedule;
      }
    } catch (e) {}
    return DEFAULT_SCHEDULE;
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREPLAND_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.bookmarks) return parsed.bookmarks;
      }
    } catch (e) {}
    return [];
  });

  const [dsaCompleted, setDsaCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREPLAND_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.dsaCompleted) return parsed.dsaCompleted;
      }
    } catch (e) {}
    return { 'dsa-1': true, 'dsa-2': true, 'dsa-4': true };
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.PREPLAND_STATE,
        JSON.stringify({ student, stats, schedule, bookmarks, dsaCompleted })
      );
    } catch (e) {}
  }, [student, stats, schedule, bookmarks, dsaCompleted]);

  // Real-time actions
  const logStudyMinutes = (minutes, category = 'quant') => {
    const hours = Number((minutes / 60).toFixed(2));
    setStats((prev) => ({
      ...prev,
      totalHours: Number((prev.totalHours + hours).toFixed(2)),
      quantHours: category === 'quant' ? Number((prev.quantHours + hours).toFixed(2)) : prev.quantHours,
      readinessScore: Math.min(99, prev.readinessScore + 1)
    }));
  };

  const logQuestionSolved = (isCorrect, secondsTaken = 45) => {
    setStats((prev) => {
      const newSpeed = Math.round((prev.avgSpeedSeconds * 0.9) + (secondsTaken * 0.1));
      const newScore = isCorrect ? Math.min(99, prev.readinessScore + 0.2) : Math.max(50, prev.readinessScore - 0.1);
      return {
        ...prev,
        questionsSolvedToday: prev.questionsSolvedToday + 1,
        avgSpeedSeconds: newSpeed,
        readinessScore: Math.round(newScore)
      };
    });
  };

  const toggleDsaProblem = (id) => {
    setDsaCompleted((prev) => {
      const isDone = !prev[id];
      const next = { ...prev, [id]: isDone };
      setStats((s) => ({
        ...s,
        dsaSolved: isDone ? s.dsaSolved + 1 : Math.max(0, s.dsaSolved - 1)
      }));
      return next;
    });
  };

  const toggleScheduleTask = (day, taskId) => {
    setSchedule((prev) => {
      const dayTasks = prev[day] || [];
      const updated = dayTasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t));
      return { ...prev, [day]: updated };
    });
  };

  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) return prev.filter((b) => b.id !== item.id);
      return [...prev, { ...item, savedAt: new Date().toLocaleTimeString() }];
    });
  };

  return (
    <PrepLandContext.Provider
      value={{
        student,
        setStudent,
        stats,
        setStats,
        schedule,
        toggleScheduleTask,
        bookmarks,
        toggleBookmark,
        dsaCompleted,
        toggleDsaProblem,
        logStudyMinutes,
        logQuestionSolved
      }}
    >
      {children}
    </PrepLandContext.Provider>
  );
}

export function usePrepLand() {
  const context = useContext(PrepLandContext);
  if (!context) {
    throw new Error('usePrepLand must be used within a PrepLandProvider');
  }
  return context;
}
