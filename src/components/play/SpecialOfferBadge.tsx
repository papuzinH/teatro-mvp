interface SpecialOfferBadgeProps {
  label: string;
  description?: string;
  onClick?: () => void;
}

export default function SpecialOfferBadge({ label, description, onClick }: SpecialOfferBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-teatro-surface border border-teatro-surface-light hover:border-teatro-gold/30 transition-colors text-left"
    >
      <span className="text-lg">🏷️</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-body text-sm text-teatro-text-primary font-medium">
            Oferta especial
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#e91e63] text-white">
            {label}
          </span>
        </div>
        {description && (
          <p className="font-body text-xs text-teatro-text-muted mt-0.5 truncate">
            {description}
          </p>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-teatro-text-muted shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}
