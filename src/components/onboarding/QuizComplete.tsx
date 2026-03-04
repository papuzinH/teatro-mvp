import Button from '@/components/ui/Button';

interface QuizCompleteProps {
  selectedCount: number;
  onFinish: () => void;
}

export default function QuizComplete({ selectedCount, onFinish }: QuizCompleteProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center space-y-5">
      {/* Large checkmark icon */}
      <div className="w-16 h-16 rounded-full bg-teatro-gold/20 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 text-teatro-gold"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Congratulations text */}
      <div className="space-y-2">
        <h3 className="text-xl font-display font-semibold text-teatro-text-primary">
          Listo!
        </h3>
        <p className="text-sm font-body text-teatro-text-muted max-w-xs">
          Seleccionaste {selectedCount} obra{selectedCount !== 1 ? 's' : ''}. Vamos a usar tus gustos para
          recomendarte las mejores obras de la cartelera.
        </p>
      </div>

      {/* CTA */}
      <Button onClick={onFinish}>
        Empezar a explorar
      </Button>
    </div>
  );
}
