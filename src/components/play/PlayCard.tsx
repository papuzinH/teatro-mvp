import { Link } from 'react-router-dom';
import type { Play } from '@/types';
import { formatPriceRange } from '@/lib/formatters';
import Badge from '@/components/ui/Badge';
import RankingBadge from './RankingBadge';

interface PlayCardProps {
  play: Play;
  compact?: boolean;
}

export default function PlayCard({ play, compact = false }: PlayCardProps) {
  return (
    <Link
      to={`/play/${play.id}`}
      className={`block flex-shrink-0 ${compact ? 'w-40' : 'w-full'}`}
    >
      <div className="relative">
        {play.rankingPosition != null && (
          <RankingBadge position={play.rankingPosition} />
        )}
        <img
          src={play.imageUrl}
          alt={play.title}
          className="aspect-[2/3] w-full object-cover rounded-lg bg-teatro-surface"
        />
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="font-display text-sm text-teatro-text-primary leading-tight line-clamp-2">
          {play.title}
        </h3>
        <p className="font-body text-xs text-teatro-text-secondary truncate">
          {play.theater}
        </p>
        <p className="font-body text-xs text-teatro-gold font-semibold">
          {formatPriceRange(play.price.min, play.price.max)}
        </p>
        <Badge variant="genre">{play.genre}</Badge>
      </div>
    </Link>
  );
}
