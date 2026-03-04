import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-teatro-gold text-teatro-bg hover:bg-teatro-gold-light active:bg-teatro-gold-light/90 disabled:bg-teatro-gold/40 disabled:text-teatro-bg/60',
  secondary:
    'border border-teatro-gold text-teatro-gold bg-transparent hover:bg-teatro-gold/10 active:bg-teatro-gold/20 disabled:border-teatro-gold/40 disabled:text-teatro-gold/40',
  ghost:
    'text-teatro-gold bg-transparent hover:bg-teatro-gold/10 active:bg-teatro-gold/20 disabled:text-teatro-gold/40',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-5 py-2.5 text-base rounded-lg',
  lg: 'px-7 py-3.5 text-lg rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  onClick,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-body font-semibold transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
