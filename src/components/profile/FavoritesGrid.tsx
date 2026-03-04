import type { Play } from '@/types';
import PlayGrid from '@/components/play/PlayGrid';
import EmptyState from '@/components/ui/EmptyState';

interface FavoritesGridProps {
  plays: Play[];
  favoritePlayIds: string[];
}

export default function FavoritesGrid({ plays, favoritePlayIds }: FavoritesGridProps) {
  const favoritePlays = plays.filter((play) => favoritePlayIds.includes(play.id));

  if (favoritePlays.length === 0) {
    return (
      <EmptyState
        icon="heart"
        title="Sin favoritos todavia"
        message="Marca obras como favoritas para encontrarlas rapido aca."
      />
    );
  }

  return <PlayGrid plays={favoritePlays} />;
}
