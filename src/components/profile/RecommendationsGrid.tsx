import type { Play } from '@/types';
import PlayGrid from '@/components/play/PlayGrid';
import EmptyState from '@/components/ui/EmptyState';

interface RecommendationsGridProps {
  plays: Play[];
}

export default function RecommendationsGrid({ plays }: RecommendationsGridProps) {
  if (plays.length === 0) {
    return (
      <EmptyState
        icon="compass"
        title="Sin recomendaciones"
        message="Completa el quiz de gustos para recibir recomendaciones personalizadas."
      />
    );
  }

  return <PlayGrid plays={plays} />;
}
