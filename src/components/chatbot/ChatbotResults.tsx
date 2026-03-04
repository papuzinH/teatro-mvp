import { Play } from '@/types';
import PlayCard from '@/components/play/PlayCard';
import Button from '@/components/ui/Button';

interface ChatbotResultsProps {
  plays: Play[];
  onReset: () => void;
}

export function ChatbotResults({ plays, onReset }: ChatbotResultsProps) {
  return (
    <div className="space-y-4 pt-4">
      {plays.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-teatro-muted text-sm">
            No encontre obras con esos filtros. Proba con otros criterios.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plays.map((play) => (
            <PlayCard key={play.id} play={play} />
          ))}
        </div>
      )}
      <div className="flex justify-center pt-2">
        <Button variant="secondary" onClick={onReset}>
          Buscar de nuevo
        </Button>
      </div>
    </div>
  );
}
