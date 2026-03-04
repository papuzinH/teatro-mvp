import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'genre' | 'comercial' | 'independiente' | 'default';
  className?: string;
}

const variantClasses: Record<string, string> = {
  genre: 'bg-teatro-burgundy/80 text-teatro-text-primary',
  comercial: 'bg-teatro-gold/90 text-teatro-bg',
  independiente: 'bg-teatro-surface-light text-teatro-text-secondary',
  default: 'bg-teatro-surface-light text-teatro-text-secondary',
};

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
