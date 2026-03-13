import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // ISO date string e.g. "2025-02-10"
  targetTime?: string; // e.g. "18:00"
}

function parseTarget(date: string, time?: string): number {
  const t = time ? `T${time}:00` : 'T23:59:59';
  return new Date(`${date}${t}`).getTime();
}

export default function CountdownTimer({ targetDate, targetTime }: CountdownTimerProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = parseTarget(targetDate, targetTime);
  const diff = Math.max(0, target - now);

  if (diff <= 0) {
    return (
      <span className="font-body text-xs text-teatro-text-muted font-medium">
        Finalizado
      </span>
    );
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return (
    <div className="flex items-center gap-1.5">
      {days > 0 && (
        <TimeUnit value={days} label="d" />
      )}
      <TimeUnit value={hours} label="h" />
      <TimeUnit value={minutes} label="m" />
      <TimeUnit value={seconds} label="s" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-0.5 font-body text-sm text-teatro-gold font-bold tabular-nums">
      {String(value).padStart(2, '0')}
      <span className="text-xs text-teatro-text-muted font-normal">{label}</span>
    </span>
  );
}
