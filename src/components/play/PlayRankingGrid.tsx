import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Play } from '@/types';
import { formatPriceRange } from '@/lib/formatters';
import RankingBadge from './RankingBadge';

interface PlayRankingGridProps {
  plays: Play[];
}

function TopRankCard({ play }: { play: Play }) {
  return (
    <Link to={`/play/${play.id}`} className="relative overflow-hidden rounded-xl block group">
      <div className="relative w-full aspect-16/7">
        <img
          src={play.imageUrl}
          alt={play.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        {play.rankingPosition != null && <RankingBadge position={play.rankingPosition} />}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-white text-lg leading-tight line-clamp-1">{play.title}</h3>
          <p className="font-body text-xs text-white/70 mt-0.5 truncate">{play.theater}</p>
          <p className="font-body text-teatro-gold font-semibold text-sm mt-0.5">
            {formatPriceRange(play.price.min, play.price.max)}
          </p>
        </div>
      </div>
    </Link>
  );
}

function SliderRankCard({ play }: { play: Play }) {
  return (
    <Link to={`/play/${play.id}`} className="relative overflow-hidden rounded-xl block group">
      <div className="relative w-full aspect-2/3">
        <img
          src={play.imageUrl}
          alt={play.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        {play.rankingPosition != null && <RankingBadge position={play.rankingPosition} />}
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="font-display text-white text-sm leading-tight line-clamp-2">{play.title}</h3>
          <p className="font-body text-teatro-gold font-semibold text-xs mt-0.5">
            {formatPriceRange(play.price.min, play.price.max)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function PlayRankingGrid({ plays }: PlayRankingGridProps) {
  const top3 = plays.slice(0, 3);
  const rest = plays.slice(3);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  if (plays.length === 0) return null;

  return (
    <div className="space-y-2">
      {/* Top 3 — uno por fila */}
      {top3.map((play) => (
        <TopRankCard key={play.id} play={play} />
      ))}

      {/* 4-10 — slider */}
      {rest.length > 0 && (
        <div className="mt-1">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {rest.map((play) => (
                <div key={play.id} className="flex-none w-1/2 pr-1.25">
                  <SliderRankCard play={play} />
                </div>
              ))}
            </div>
          </div>
          {scrollSnaps.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-3">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'w-4 bg-teatro-gold'
                      : 'w-1.5 bg-teatro-text-muted/40'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
