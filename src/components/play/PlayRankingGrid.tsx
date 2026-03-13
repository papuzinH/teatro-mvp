import { Link } from 'react-router-dom';
import type { Play } from '@/types';
import { formatPriceRange } from '@/lib/formatters';
import RankingBadge from './RankingBadge';

interface PlayRankingGridProps {
  plays: Play[];
}

function RankingCard({ play, size }: { play: Play; size: 'large' | 'medium' | 'small' }) {
  const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1 row-span-2',
    small: 'col-span-1 row-span-1',
  };

  const aspectClasses = {
    large: 'aspect-[3/4]',
    medium: 'aspect-[2/3]',
    small: 'aspect-[3/2]',
  };

  return (
    <Link
      to={`/play/${play.id}`}
      className={`relative overflow-hidden rounded-xl group ${sizeClasses[size]}`}
    >
      <div className={`relative w-full h-full ${size === 'small' ? '' : aspectClasses[size]}`}>
        <img
          src={play.imageUrl}
          alt={play.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {play.rankingPosition != null && (
          <RankingBadge position={play.rankingPosition} />
        )}

        <div className="absolute bottom-2 left-2 right-2">
          <h3 className={`font-display text-white leading-tight line-clamp-2 ${size === 'large' ? 'text-lg' : size === 'medium' ? 'text-sm' : 'text-xs'}`}>
            {play.title}
          </h3>
          {size !== 'small' && (
            <p className="font-body text-xs text-white/70 mt-0.5 truncate">
              {play.theater}
            </p>
          )}
          <p className={`font-body text-teatro-gold font-semibold ${size === 'large' ? 'text-sm' : 'text-xs'}`}>
            {formatPriceRange(play.price.min, play.price.max)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function PlayRankingGrid({ plays }: PlayRankingGridProps) {
  if (plays.length === 0) return null;

  // Layout: position 1 = large, 2-3 = medium, 4-10 = small
  const getSize = (index: number): 'large' | 'medium' | 'small' => {
    if (index === 0) return 'large';
    if (index <= 2) return 'medium';
    return 'small';
  };

  return (
    <div className="grid grid-cols-3 auto-rows-[120px] gap-2">
      {plays.map((play, index) => (
        <RankingCard key={play.id} play={play} size={getSize(index)} />
      ))}
    </div>
  );
}
