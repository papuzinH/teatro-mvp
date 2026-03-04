interface ProgressBarProps {
  value: number;
  className?: string;
}

export default function ProgressBar({ value, className = '' }: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div
      className={`w-full h-2 rounded-full bg-teatro-surface-light overflow-hidden ${className}`}
    >
      <div
        className="h-full rounded-full bg-teatro-gold transition-all duration-300 ease-out"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
