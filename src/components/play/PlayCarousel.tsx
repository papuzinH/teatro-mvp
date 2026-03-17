import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Play } from '@/types';
import PlayCard from './PlayCard';

interface PlayCarouselProps {
  plays: Play[];
}

export default function PlayCarousel({ plays }: PlayCarouselProps) {
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

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {plays.map((play) => (
            <div key={play.id} className="flex-none w-1/2 pr-[5px]">
              <PlayCard play={play} compact />
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
  );
}
