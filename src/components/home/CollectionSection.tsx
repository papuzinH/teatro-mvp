import type { Collection, Play } from '@/types';
import PlayCarousel from '@/components/play/PlayCarousel';

interface CollectionSectionProps {
  collection: Collection;
  plays: Play[];
}

export default function CollectionSection({ collection, plays }: CollectionSectionProps) {
  const collectionPlays = plays.filter((p) => collection.playIds.includes(p.id));

  if (collectionPlays.length === 0) return null;

  return (
    <section>
      <div className="mb-3">
        <h2 className="font-display text-xl text-teatro-text-primary">
          {collection.icon ? `${collection.icon} ` : ''}{collection.title}
        </h2>
        {collection.description && (
          <p className="font-body text-sm text-teatro-text-muted mt-0.5">
            {collection.description}
          </p>
        )}
      </div>
      <PlayCarousel plays={collectionPlays} />
    </section>
  );
}
