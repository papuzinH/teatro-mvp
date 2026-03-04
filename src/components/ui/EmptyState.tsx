interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
}

export default function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="text-5xl mb-4" role="img" aria-label={title}>
        {icon}
      </span>
      <h3 className="text-lg font-display font-semibold text-teatro-text-primary mb-2">
        {title}
      </h3>
      <p className="text-sm font-body text-teatro-text-muted max-w-xs">
        {message}
      </p>
    </div>
  );
}
