import type { Play } from '@/types';

interface QuizStepProps {
  plays: Play[];
  selectedIds: string[];
  onToggle: (playId: string) => void;
}

export default function QuizStep({ plays, selectedIds, onToggle }: QuizStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-body text-teatro-text-muted text-center">
        Selecciona las obras que te llamen la atencion para personalizar tus recomendaciones.
      </p>

      <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {plays.map((play) => {
          const isSelected = selectedIds.includes(play.id);
          return (
            <button
              key={play.id}
              type="button"
              onClick={() => onToggle(play.id)}
              className={`relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ring-2 ${
                isSelected
                  ? 'ring-teatro-gold scale-[0.97]'
                  : 'ring-transparent hover:ring-teatro-gold/40'
              }`}
            >
              {/* Poster image */}
              <img
                src={play.imageUrl}
                alt={play.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay + title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute bottom-2 left-2 right-2 text-xs font-body font-medium text-teatro-text-primary leading-tight">
                {play.title}
              </span>

              {/* Checkmark overlay when selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-teatro-gold/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-teatro-gold flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-teatro-bg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedIds.length > 0 && (
        <p className="text-xs font-body text-teatro-text-muted text-center">
          {selectedIds.length} obra{selectedIds.length !== 1 ? 's' : ''} seleccionada{selectedIds.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
