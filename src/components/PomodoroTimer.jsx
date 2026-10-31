import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Sparkles, CheckCircle2, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePrepLand } from '../context/PrepLandContext';

export default function PomodoroTimer({ onSessionComplete }) {
  const { logStudyMinutes } = usePrepLand();
  const [mode, setMode] = useState('focus'); // 'focus' (25 min), 'shortBreak' (5 min), 'longBreak' (15 min)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(3);

  // Audio tone generator using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            playChime();

            if (mode === 'focus') {
              setSessionsCompleted((s) => s + 1);
              logStudyMinutes(25);
              if (onSessionComplete) onSessionComplete(25);
              try {
                confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
              } catch (e) {}
              setMode('shortBreak');
              return 5 * 60;
            } else {
              setMode('focus');
              return 25 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, mode, onSessionComplete, logStudyMinutes]);

  const switchMode = (newMode, durationMins) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(durationMins * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const totalMins = mode === 'focus' ? 25 : mode === 'shortBreak' ? 5 : 15;
  const progressPercent = ((totalMins * 60 - timeLeft) / (totalMins * 60)) * 100;

  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-2xl">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-200">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Live Focus Timer</span>
        </div>
        <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
          {sessionsCompleted} Sessions Logged
        </span>
      </div>

      {/* Mode Buttons */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl text-xs font-semibold">
        <button
          onClick={() => switchMode('focus', 25)}
          className={`flex-1 py-1.5 rounded-lg transition ${
            mode === 'focus' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Focus (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak', 5)}
          className={`flex-1 py-1.5 rounded-lg transition ${
            mode === 'shortBreak' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Break (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak', 15)}
          className={`flex-1 py-1.5 rounded-lg transition ${
            mode === 'longBreak' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Long (15m)
        </button>
      </div>

      {/* Timer Display */}
      <div className="py-2 text-center space-y-2">
        <div className="text-3xl font-black font-mono tracking-tight text-white">{timeFormatted}</div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              mode === 'focus' ? 'bg-indigo-500' : 'bg-teal-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow ${
            isRunning
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
          }`}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
        </button>
        <button
          onClick={() => switchMode(mode, mode === 'focus' ? 25 : mode === 'shortBreak' ? 5 : 15)}
          className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
          title="Reset Timer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
