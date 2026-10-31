import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';

export default function LiveCountdown({ targetDate = '2026-12-15T09:00:00' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 44, hours: 12, minutes: 30, seconds: 45 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2 font-mono">
      <div className="flex items-center gap-1.5 bg-slate-900 text-white px-2.5 py-1 rounded-xl text-xs font-bold shadow-sm">
        <Clock className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
        <span>{timeLeft.days}d</span>
        <span className="text-slate-500">:</span>
        <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>
        <span className="text-slate-500">:</span>
        <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
        <span className="text-slate-500">:</span>
        <span className="text-emerald-400">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
      </div>
    </div>
  );
}
