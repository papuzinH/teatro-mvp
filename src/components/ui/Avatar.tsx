interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Avatar({
  src,
  name,
  size = 'md',
  className = '',
}: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-teatro-surface-light text-teatro-gold font-body font-semibold ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            (e.currentTarget.nextElementSibling as HTMLElement | null)?.classList.remove('hidden');
          }}
        />
      ) : null}
      <span className={src ? 'hidden' : ''}>{initials}</span>
    </div>
  );
}
