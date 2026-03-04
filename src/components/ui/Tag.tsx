import { type ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-body text-teatro-text-secondary bg-teatro-surface-light/70 ${className}`}
    >
      {children}
    </span>
  );
}
